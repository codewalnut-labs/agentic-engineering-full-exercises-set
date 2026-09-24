import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";

test("the documented checkout workflow is mounted and reachable", async ({ page, request }) => {
  const headers = { "x-checkout-session": randomUUID() };
  await page.setExtraHTTPHeaders(headers);
  await request.post("/api/testing/reset", { headers });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Complete checkout" })).toBeVisible();
  await expect(page.getByText("$7.92")).toBeVisible();
  await page.getByRole("button", { name: /Pay/ }).click();
  await expect(page.getByRole("heading", { name: "Order confirmed" })).toBeVisible();
});
