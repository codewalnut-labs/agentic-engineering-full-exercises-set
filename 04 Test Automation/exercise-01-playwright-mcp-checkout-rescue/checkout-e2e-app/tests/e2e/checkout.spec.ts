import { expect, test } from "./fixtures/checkout.fixture";

test("completes checkout after deterministic tax and payment boundaries", async ({
  page,
  boundaryCalls,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
  await expect(page.getByText("Canvas Backpack")).toBeVisible();

  await page.getByLabel("Full name").fill("Maya Chen");
  await page.getByLabel("Postal code").fill("10001");
  await page.getByLabel("Card number").fill("4242 4242 4242 4242");

  await page.getByRole("button", { name: "Calculate tax" }).click();
  await expect(page.getByText("Tax $8.00")).toBeVisible();
  await expect(page.getByText("Total $108.00")).toBeVisible();

  await page.getByRole("button", { name: "Place order" }).click();
  const confirmation = page.getByRole("region", { name: "Order confirmation" });
  await expect(confirmation).toContainText("ORDER-1042");
  await expect(confirmation).toContainText("$108.00");

  expect(boundaryCalls.tax).toEqual([{ postalCode: "10001" }]);
  expect(boundaryCalls.payments).toEqual([
    {
      amount: 108,
      cardNumber: "4242 4242 4242 4242",
      customerName: "Maya Chen",
    },
  ]);
});
