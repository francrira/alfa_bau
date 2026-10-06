import { test, expect } from "@playwright/test";
import english from "../lib/translations/en.json";

const routes = ["", "leistungen", "personal", "einsatzteams", "referenzen", "projekte", "unternehmen", "karriere", "kleinprojekte", "kontakt", ...["tiefbaukolonnen", "maschinenfuehrer", "pflasterkolonnen", "rohrleitungskolonnen", "baustellenpersonal", "flexible-einsatzteams", "gartenbau", "tiefbau", "landschaftsbau"].map(slug => "leistungen/" + slug)];

test("all English pages render translated content and working localized links", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const links = new Set<string>();
  for (const route of routes) {
    const response = await page.goto("/en/" + (route ? route + "/" : ""));
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toBeVisible();
    const content = (await page.locator("main").innerText()).replace(/\s+/g, " ");
    for (const [german, translated] of Object.entries(english)) {
      if (german.length > 20 && german !== translated) expect(content, route).not.toContain(german);
    }
    for (const href of await page.locator('main a[href^="/"], .navigation a[href^="/"], .footer a[href^="/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("href")!))) {
      expect(href, route).toMatch(/^\/en(?:\/|$)/);
      links.add(href.split(/[?#]/)[0]);
    }
  }
  for (const href of links) expect((await request.get(href.endsWith("/") ? href : href + "/")).status(), href).toBe(200);
  expect(errors).toEqual([]);
});

test("English content is present before JavaScript runs", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toContainText("Building together.");
  await expect(page.locator(".navigation")).toContainText("Services");
  await expect(page).toHaveTitle(/Skilled people/);
  await expect(page.locator('link[hreflang="de"]')).toHaveAttribute("href", "https://alfa66bau.de/");
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", "https://alfa66bau.de/en/");
  await context.close();
});

test("switching languages preserves the page, topic, and anchor", async ({ page }) => {
  await page.goto("/leistungen/pflasterkolonnen/");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/leistungen\/pflasterkolonnen\/$/);
  await expect(page.locator("h1")).toHaveText("Paving crews");
  await expect(page.locator('.navigation a[aria-current="page"]')).toHaveText("Services");
  await page.goto("/kontakt/?anfrage=pflasterkolonnen#anfrage");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/kontakt\/\?anfrage=pflasterkolonnen#anfrage$/);
  await expect(page.locator("#inquiry")).toHaveValue("pflasterkolonnen");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "Auf Deutsch wechseln" }).click();
  await expect(page).toHaveURL(/\/kontakt\/\?anfrage=pflasterkolonnen#anfrage$/);
  await expect(page.locator("#inquiry")).toHaveValue("pflasterkolonnen");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
});

test("English project filters and email drafts work", async ({ page }) => {
  await page.goto("/en/referenzen/");
  await page.getByRole("button", { name: "Utility works", exact: true }).click();
  await expect(page.locator(".project-grid .photo-card")).toHaveCount(1);
  await expect(page.locator(".card-category")).toHaveText("Utility works");
  await page.goto("/en/kontakt/?anfrage=pflasterkolonnen#anfrage");
  await page.locator("#name").fill("   ");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#message").fill("We need a paving crew.");
  await page.getByRole("button", { name: "Open enquiry in email" }).click();
  await expect(page.locator("#name")).toBeFocused();
  expect(await page.locator("#name").evaluate((input: HTMLInputElement) => input.validationMessage)).toBe("Please complete this field.");
  await page.locator("#name").fill("Test User");
  await page.getByRole("button", { name: "Open enquiry in email" }).click();
  await expect(page.getByRole("status")).toContainText("Your enquiry is ready.");
  const href = await page.getByRole("link", { name: "open the draft again" }).getAttribute("href");
  expect(decodeURIComponent(href!)).toContain("Enquiry: Paving crews");
  expect(decodeURIComponent(href!)).toContain("Phone:");
  expect(decodeURIComponent(href!)).not.toContain("Anfrage:");
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test("English pages fit a " + width + "px viewport", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/en/", "/en/leistungen/", "/en/personal/", "/en/referenzen/", "/en/kontakt/"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBeLessThanOrEqual(width + 1);
    }
    if (width === 390) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Personnel", exact: true }).click();
      await expect(page).toHaveURL(/\/en\/personal\/$/);
      await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeHidden();
    }
    await page.goto("/en/");
    await page.locator(".hero").evaluate(async element => {
      await document.fonts.ready;
      await Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {})));
    });
    await page.screenshot({ path: "test-results/english-" + width + ".png" });
  });
}
