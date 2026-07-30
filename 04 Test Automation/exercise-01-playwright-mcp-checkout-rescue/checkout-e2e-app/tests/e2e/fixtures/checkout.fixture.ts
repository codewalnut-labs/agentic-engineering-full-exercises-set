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

interface CheckoutOptions {
  paymentOutcome: "approved" | "declined";
}

export const test = base.extend<CheckoutFixtures & CheckoutOptions>({
  paymentOutcome: ["approved", { option: true }],
  boundaryCalls: async ({ page, paymentOutcome }, use) => {
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
        json:
          paymentOutcome === "approved"
            ? {
                status: "approved",
                orderId: "ORDER-1042",
              }
            : {
                status: "declined",
                reason: "Card was declined",
              },
        status: 200,
      });
    });

    await use(boundaryCalls);
  },
});

export { expect };
