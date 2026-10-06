import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const exportRoot = path.resolve(process.argv[2] || 'out');
const hashes = new Set();
let pageCount = 0;

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(filename);
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      pageCount++;
      const html = await readFile(filename, 'utf8');
      for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
        if (/\bsrc\s*=/i.test(match[1]) || !match[2].trim()) continue;
        const digest = createHash('sha256').update(match[2], 'utf8').digest('base64');
        hashes.add("'sha256-" + digest + "'");
      }
    }
  }
}

await collect(exportRoot);
if (!pageCount) throw new Error('No exported HTML found. Run next build before preparing the deployment.');
const template = await readFile(new URL('../deployment/apache.htaccess', import.meta.url), 'utf8');
const config = template.replace('__SCRIPT_HASHES__', Array.from(hashes).sort().join(' '));
await writeFile(path.join(exportRoot, '.htaccess'), config);
console.log('Prepared Apache configuration for ' + pageCount + ' HTML files with ' + hashes.size + ' inline script hashes.');
