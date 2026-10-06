import { test, expect } from '@playwright/test';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawnSync } from 'node:child_process';

test('exported CSP runs generated scripts and blocks an unapproved inline script', async ({ page }) => {
  const directory = await mkdtemp(path.join(tmpdir(), 'alfa-export-policy-'));
  let server: http.Server | undefined;
  try {
    const approvedScript = 'window.exportedScriptRan = true;';
    const html = '<!doctype html><html><head></head><body><script>' + approvedScript + '</script><script src="/asset.js"></script></body></html>';
    await writeFile(path.join(directory, 'index.html'), html);
    const result = spawnSync(process.execPath, [path.resolve('scripts/prepare-export.mjs'), directory], { encoding: 'utf8' });
    expect(result.status, result.stderr).toBe(0);
    const config = await readFile(path.join(directory, '.htaccess'), 'utf8');
    const csp = config.match(/^Header always set Content-Security-Policy "([^"]+)"$/m)?.[1];
    expect(csp).toBeTruthy();
    server = http.createServer((request, response) => {
      response.setHeader('Content-Security-Policy', csp!);
      if (request.url === '/asset.js') {
        response.setHeader('Content-Type', 'text/javascript');
        response.end('window.externalScriptRan = true;');
      } else {
        response.setHeader('Content-Type', 'text/html');
        response.end(html.replace('</body>', '<script>window.unapprovedScriptRan = true;</script></body>'));
      }
    });
    await new Promise<void>(resolve => server!.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Missing test server port');
    await page.goto('http://127.0.0.1:' + address.port);
    expect(await page.evaluate(() => ({
      approved: (window as unknown as Record<string, unknown>).exportedScriptRan,
      external: (window as unknown as Record<string, unknown>).externalScriptRan,
      unapproved: (window as unknown as Record<string, unknown>).unapprovedScriptRan,
    }))).toEqual({ approved: true, external: true, unapproved: undefined });
  } finally {
    if (server) await new Promise<void>((resolve, reject) => server!.close(error => error ? reject(error) : resolve()));
    await rm(directory, { recursive: true, force: true });
  }
});
