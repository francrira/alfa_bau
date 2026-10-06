import { test, expect } from "@playwright/test";

const routes = ["/", "/leistungen/", "/personal/", "/einsatzteams/", "/referenzen/", "/projekte/", "/unternehmen/", "/karriere/", "/kleinprojekte/", "/kontakt/", "/leistungen/tiefbaukolonnen/", "/leistungen/maschinenfuehrer/", "/leistungen/pflasterkolonnen/", "/leistungen/rohrleitungskolonnen/", "/leistungen/baustellenpersonal/", "/leistungen/flexible-einsatzteams/", "/leistungen/gartenbau/", "/leistungen/tiefbau/", "/leistungen/landschaftsbau/"];
test("every page loads without runtime errors or broken internal links", async ({ page, request }) => {
  const errors: string[] = [];
  const links = new Set<string>();
  page.on("pageerror", error => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    for (const href of await page.locator('a[href^="/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("href")!))) links.add(href.split(/[?#]/)[0]);
  }
  for (const href of links) expect((await request.get(href.endsWith("/") ? href : href + "/")).status(), href).toBe(200);
  expect(errors).toEqual([]);
});

test("project filters show only matching categories", async ({ page }) => {
  await page.goto("/referenzen/");
  await expect(page.locator(".project-grid .photo-card")).toHaveCount(5);
  await page.getByRole("button", { name: "Leitungsbau", exact: true }).click();
  await expect(page.locator(".project-grid .photo-card")).toHaveCount(1);
  await expect(page.locator(".card-category")).toHaveText("Leitungsbau");
  await expect(page.getByRole("button", { name: "Leitungsbau", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Alle", exact: true }).click();
  await expect(page.locator(".project-grid .photo-card")).toHaveCount(5);
});

test("mobile menu supports Escape and closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menü öffnen" });
  await expect(page.getByRole("navigation", { name: "Hauptnavigation" })).toBeHidden();
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Hauptnavigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.getByRole("navigation", { name: "Hauptnavigation" }).getByRole("link", { name: "Personal", exact: true }).click();
  await expect(page).toHaveURL(/\/personal\//);
  await expect(page.getByRole("navigation", { name: "Hauptnavigation" })).toBeHidden();
});

test("service inquiry preselects the form and validates required fields", async ({ page }) => {
  await page.goto("/leistungen/pflasterkolonnen/");
  await page.getByRole("link", { name: "Pflasterkolonnen anfragen", exact: true }).click();
  await expect(page.locator("#inquiry")).toHaveValue("pflasterkolonnen");
  await page.getByRole("button", { name: "Anfrage als E-Mail öffnen" }).click();
  await expect(page.locator("#name")).toBeFocused();
  await expect(page.locator(".form-status")).toHaveCount(0);
  await page.locator("#name").fill("   ");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#message").fill("Testnachricht");
  await page.getByRole("button", { name: "Anfrage als E-Mail öffnen" }).click();
  await expect(page.locator("#name")).toBeFocused();
  await expect(page.locator(".form-status")).toHaveCount(0);
  await page.locator("#name").fill("Test User");
  await page.locator("#phone").fill("0123456");
  await page.getByRole("button", { name: "Anfrage als E-Mail öffnen" }).click();
  await expect(page.locator(".form-status")).toBeVisible();
  const href = await page.getByRole("link", { name: "öffnen Sie den Entwurf erneut" }).getAttribute("href");
  expect(decodeURIComponent(href!)).toContain("Anfrage: Pflasterkolonnen");
  expect(decodeURIComponent(href!)).toContain("Name: Test User");
  expect(decodeURIComponent(href!)).toContain("Testnachricht");
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test("layouts stay within the viewport at " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/leistungen/", "/personal/", "/referenzen/", "/unternehmen/", "/kontakt/"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const sizes = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
      if (sizes.content > sizes.viewport + 1) console.log(await page.locator("body *").evaluateAll(nodes => nodes.map(node => ({ tag: node.tagName, className: node.className, right: node.getBoundingClientRect().right })).filter(node => node.right > window.innerWidth + 1)));
      expect(sizes.content, route).toBeLessThanOrEqual(sizes.viewport + 1);
    }
    await page.goto("/");
    await page.locator(".hero").evaluate(async element => {
      await document.fonts.ready;
      await Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {})));
    });
    await page.screenshot({ path: "test-results/home-viewport-" + width + ".png" });
    await page.screenshot({ path: "test-results/home-" + width + ".png", fullPage: true });
  });
}
