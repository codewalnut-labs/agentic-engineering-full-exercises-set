import assert from "node:assert/strict";
import { routeCheckout } from "../src/checkout/checkoutRouter.mjs";
for (const paymentType of ["card", "gift-card", "invoice", "unknown"]) {
  const calls = [];
  await routeCheckout({ orderId: "baseline", paymentType, subtotalCents: 100, taxRateBps: 0 }, {
    cardSliceEnabled: true,
    legacy: async () => { calls.push("legacy"); return {}; },
    card: async () => { calls.push("card"); return {}; },
  });
  assert.deepEqual(calls, ["legacy"]);
  console.log(paymentType + ": legacy called once; card slice not called");
}
console.log("PASS supplied router sends every payment type to legacy");
