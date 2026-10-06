import { test, expect } from "@playwright/test";

for (const prefix of ["", "/en"]) {
  test("contact data cannot be entered before hydration in " + (prefix ? "English" : "German"), async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(prefix + "/kontakt/?anfrage=pflasterkolonnen#anfrage");
    await expect(page.locator('#name')).toBeDisabled();
    await expect(page.locator('#email')).toBeDisabled();
    await expect(page.locator('#message')).toBeDisabled();
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    await expect(page.locator('.form-fallback a[href="mailto:info@alfa66bau.de"]')).toBeVisible();
    expect(await page.locator('form').evaluate(form => Array.from(new FormData(form as HTMLFormElement).entries()))).toEqual([]);
    await context.close();
  });

  test("mobile navigation works without JavaScript in " + (prefix ? "English" : "German"), async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(prefix + "/");
    await expect(page.locator('#navigation')).toBeVisible();
    await page.locator('#navigation a').first().click();
    await expect(page).toHaveURL(new RegExp(prefix + '/leistungen/$'));
    await expect(page.locator('h1')).toBeVisible();
    await context.close();
  });
}

// At these widths, both the hero and any nearby cards select the 640px image.
// A 1280px request is therefore wasted, rather than a legitimate second placement.
for (const width of [390, 1024]) {
  test("the hero downloads one image variant at " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.waitForFunction(() => {
      const image = document.querySelector<HTMLImageElement>('.hero img');
      return image?.complete && image.naturalWidth > 0;
    });
    await page.waitForLoadState('networkidle');
    const requests = await page.evaluate(() => performance.getEntriesByType('resource')
      .filter(entry => /\/paved-path(?:-640)?\.webp$/.test(new URL(entry.name).pathname)).map(entry => entry.name));
    expect(requests).toHaveLength(1);
  });
}

test("canonical metadata identifies the public domain and duplicate project routes", async ({ page }) => {
  for (const [route, canonical] of [
    ['/', 'https://alfa66bau.de/'],
    ['/en/kontakt/', 'https://alfa66bau.de/en/kontakt/'],
    ['/projekte/', 'https://alfa66bau.de/referenzen/'],
    ['/en/projekte/', 'https://alfa66bau.de/en/referenzen/'],
  ]) {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
  }
});

test("search discovery lists working canonical German and English pages", async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap: https://alfa66bau.de/sitemap.xml');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  expect(urls).toHaveLength(36);
  expect(urls).toContain('https://alfa66bau.de/leistungen/pflasterkolonnen/');
  expect(urls).toContain('https://alfa66bau.de/en/leistungen/pflasterkolonnen/');
  expect(urls.some(url => new URL(url).pathname.includes('/projekte/'))).toBe(false);
  for (const url of urls) expect((await request.get(new URL(url).pathname)).status(), url).toBe(200);
});
