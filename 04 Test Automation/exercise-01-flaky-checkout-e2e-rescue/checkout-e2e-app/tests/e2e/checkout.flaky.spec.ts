import { expect, test } from "@playwright/test";

test("starter flaky example to replace", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(500);
  await page.locator(".queue-item").first().click();
  await expect(page.locator(".detail-panel h2")).toBeVisible();
});
