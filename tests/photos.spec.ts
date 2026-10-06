import { test, expect } from "@playwright/test";

const routes = ["/", "/leistungen/", "/personal/", "/einsatzteams/", "/referenzen/", "/unternehmen/", "/karriere/", "/kleinprojekte/", ...["tiefbaukolonnen", "maschinenfuehrer", "pflasterkolonnen", "rohrleitungskolonnen", "baustellenpersonal", "flexible-einsatzteams", "gartenbau", "tiefbau", "landschaftsbau"].map(slug => "/leistungen/" + slug + "/")];
for (const prefix of ["", "/en"]) {
  test("website photos load without placeholders in " + (prefix ? "English" : "German"), async ({ page }) => {
    for (const route of routes) {
      await page.goto(prefix + route);
      await expect(page.locator(".media-placeholder:not(.has-photo)"), route).toHaveCount(0);
      const images = page.locator("main img");
      expect(await images.count(), route).toBeGreaterThan(0);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image, route).toHaveJSProperty("complete", true);
        expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth), route).toBeGreaterThan(0);
        const decorative = await image.evaluate(element => !!element.closest(".cta-media"));
        if (decorative) expect(await image.getAttribute("alt"), route).toBe("");
        else expect(await image.getAttribute("alt"), route).toBeTruthy();
      }
    }
  });
}
test("only illustrative personnel images are labelled AI-generated", async ({ page }) => {
  await page.goto("/en/personal/");
  await expect(page.locator(".media-disclosure")).toHaveCount(2);
  await expect(page.locator(".media-disclosure").first()).toHaveText("AI-generated illustration");
  await page.goto("/en/referenzen/");
  await expect(page.locator(".media-disclosure")).toHaveCount(0);
});
