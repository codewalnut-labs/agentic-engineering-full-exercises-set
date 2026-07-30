import { expect, test as base } from "@playwright/test";

interface TaxRequest {
  postalCode: string;
}

interface PaymentRequest {
  amount: number;
  cardNumber: string;
  customerName: string;
}

interface BoundaryCalls {
  tax: TaxRequest[];
  payments: PaymentRequest[];
}

interface CheckoutFixtures {
  boundaryCalls: BoundaryCalls;
}

export const test = base.extend<CheckoutFixtures>({
  boundaryCalls: async ({ page }, use) => {
    const boundaryCalls: BoundaryCalls = {
      tax: [],
      payments: [],
    };

    await page.route("**/api/tax-quote", async (route) => {
      const request = route.request().postDataJSON() as TaxRequest;
      boundaryCalls.tax.push(request);
      await route.fulfill({
        contentType: "application/json",
        json: {
          postalCode: request.postalCode,
          tax: 8,
          total: 108,
        },
        status: 200,
      });
    });

    await page.route("**/api/payments/authorize", async (route) => {
      const request = route.request().postDataJSON() as PaymentRequest;
      boundaryCalls.payments.push(request);
      await route.fulfill({
        contentType: "application/json",
        json: {
          status: "approved",
          orderId: "ORDER-1042",
        },
        status: 200,
      });
    });

    await use(boundaryCalls);
  },
});

export { expect };
