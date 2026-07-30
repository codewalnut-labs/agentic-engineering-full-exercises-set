import { expect, test } from "@playwright/test";

const browserCases = [
  {
    id: "case-atlas",
    name: "Atlas Co",
    priority: "High",
    status: "Blocked",
    score: 91,
    summary: "Contract review is waiting on supporting evidence.",
    note: "Request the missing ownership document.",
    owner: "Maya Chen",
    dueInDays: 1,
    tags: ["review", "evidence"],
  },
  {
    id: "case-cedar",
    name: "Cedar Labs",
    priority: "Low",
    status: "Ready",
    score: 34,
    summary: "Routine renewal is ready for approval.",
    note: "Confirm the standard renewal terms.",
    owner: "Jon Bell",
    dueInDays: 5,
    tags: ["renewal"],
  },
];

test("loads and filters the network-backed case queue", async ({ page }) => {
  await page.route("**/api/cases", async (route) => {
    await route.fulfill({ json: browserCases });
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Case dashboard" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Case queue" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Atlas Co" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cedar Labs" })).toBeVisible();

  await page.getByRole("combobox", { name: "Priority" }).selectOption("High");

  await expect(page.getByRole("heading", { name: "Atlas Co" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cedar Labs" })).toBeHidden();
  await expect(page.getByText("1 case", { exact: true })).toBeVisible();

  await page.screenshot({
    path: "evidence/browser/case-dashboard-filtered.png",
    fullPage: true,
  });
});
