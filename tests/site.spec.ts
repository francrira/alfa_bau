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

test("service inquiry preselects the form, validates and sends the enquiry", async ({ page }) => {
  const sent: Record<string, unknown>[] = [];
  await page.route("**/api/contact.php", async route => {
    sent.push(route.request().postDataJSON());
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/leistungen/pflasterkolonnen/");
  await page.getByRole("link", { name: "Pflasterkolonnen anfragen", exact: true }).click();
  await expect(page.locator("#inquiry")).toHaveValue("pflasterkolonnen");
  await page.getByRole("button", { name: "Anfrage senden" }).click();
  await expect(page.locator("#name")).toBeFocused();
  await page.locator("#name").fill("   ");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#message").fill("Testnachricht");
  await page.getByRole("button", { name: "Anfrage senden" }).click();
  await expect(page.locator("#name")).toBeFocused();
  expect(sent).toHaveLength(0);
  await page.locator("#name").fill("Test User");
  await page.locator("#phone").fill("0123456");
  await page.waitForTimeout(3000); // The endpoint ignores forms submitted faster than a person can type.
  await page.getByRole("button", { name: "Anfrage senden" }).click();
  await expect(page.getByRole("status")).toContainText("Ihre Anfrage ist bei uns angekommen");
  expect(sent).toHaveLength(1);
  expect(sent[0]).toMatchObject({ name: "Test User", email: "test@example.com", phone: "0123456", inquiry: "Pflasterkolonnen", message: "Testnachricht", website: "", language: "de" });
  expect(sent[0].elapsed).toBeGreaterThanOrEqual(3000);
  await expect(page.locator("#name")).toHaveValue("");
});

test("a failed send offers the email draft and phone instead", async ({ page }) => {
  await page.route("**/api/contact.php", route => route.fulfill({ status: 502, json: { ok: false, error: "delivery" } }));
  await page.goto("/kontakt/?anfrage=karriere#anfrage");
  await page.locator("#name").fill("Test User");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#message").fill("Bewerbung");
  await page.getByRole("button", { name: "Anfrage senden" }).click();
  await expect(page.locator(".form-status-error")).toContainText("konnte gerade nicht gesendet werden");
  const href = decodeURIComponent((await page.getByRole("link", { name: "öffnen Sie sie als E-Mail" }).getAttribute("href"))!);
  expect(href).toContain("mailto:info@alfa66bau.de");
  expect(href).toContain("Anfrage: Bewerbung / Karriere");
  await expect(page.locator(".form-status-error").getByRole("link", { name: "+49 160 96341086" })).toHaveAttribute("href", "tel:+4916096341086");
  await expect(page.locator("#name")).toHaveValue("Test User");
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

test("inquiry links on the contact page switch the preselected topic", async ({ page }) => {
  await page.goto("/kontakt/?anfrage=karriere#anfrage");
  await expect(page.locator("#inquiry")).toHaveValue("karriere");
  await page.locator("header").getByRole("link", { name: "Projekt anfragen" }).click();
  await expect(page).toHaveURL(/anfrage=projekt/);
  await expect(page.locator("#inquiry")).toHaveValue("projekt");
  await page.goBack();
  await expect(page.locator("#inquiry")).toHaveValue("karriere");
});

test("pages carry social previews and business structured data", async ({ page, request }) => {
  await page.goto("/leistungen/tiefbau/");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Tiefbau | ALFA66");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://alfa66bau.de/images/og.jpg");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  expect((await request.get("/images/og.jpg")).status()).toBe(200);
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}");
  expect(data).toMatchObject({ "@type": "GeneralContractor", name: "Alfa66Bau GmbH", email: "info@alfa66bau.de", address: { postalCode: "20537", addressLocality: "Hamburg" } });
  await page.goto("/en/kontakt/");
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_GB");
});
