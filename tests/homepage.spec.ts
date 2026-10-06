import { test, expect } from "@playwright/test";

for (const prefix of ["", "/en"]) {
  test("homepage uses real work photos and carries staffing inquiries in " + (prefix ? "English" : "German"), async ({ page }) => {
    await page.goto(prefix + "/");
    await expect(page.locator('main img[src*="/images/generated/"]')).toHaveCount(0);
    const inquiry = page.locator(".hero .button").first();
    await inquiry.click();
    await expect(page).toHaveURL(new RegExp(prefix + "/kontakt/\\?anfrage=personal#anfrage"));
    await expect(page.locator("#inquiry")).toHaveValue("personal");
  });
}

test("homepage remains readable without JavaScript and with reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/en/");
  await expect(page.locator("h1")).toBeVisible();
  for (const heading of await page.locator("main h2").all()) {
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }
  expect(await page.locator(".hero").evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await expect(page.locator(".hero .button").first()).toHaveAttribute("href", "/en/kontakt/?anfrage=personal#anfrage");
  await context.close();
});

test("service cards animate on scroll and stop when reduced motion is enabled", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const cards = page.locator(".home-service-card");
  await cards.first().evaluate(element => {
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - window.innerHeight * .7, behavior: "instant" });
  });
  await expect.poll(() => cards.first().evaluate(element => element.getAnimations().some(animation => animation.id === "scroll-reveal" && animation.playState === "running"))).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => cards.first().evaluate(element => element.getAnimations().filter(animation => animation.id === "scroll-reveal").length)).toBe(0);
  await expect(cards.first()).toBeVisible();
  expect(await cards.first().evaluate(element => getComputedStyle(element).opacity)).toBe("1");
});
