import assert from "node:assert/strict";
import { routeCheckout } from "./checkoutRouter.mjs";

const request = {
  orderId: "ord-participant",
  paymentType: "card",
  subtotalCents: 1001,
  taxRateBps: 825,
  paymentToken: "tok-participant",
};
const paid = { orderId: request.orderId, status: "paid", totalCents: 1084, errorCode: null };
const unknown = {
  orderId: request.orderId,
  status: "failed",
  totalCents: 1084,
  errorCode: "PAYMENT_STATE_UNKNOWN",
};

function dependencies(cardBehavior = async () => paid) {
  const calls = { legacy: 0, card: 0 };
  return {
    calls,
    implementations: {
      legacy: async () => { calls.legacy += 1; return paid; },
      card: async (received) => { calls.card += 1; return cardBehavior(received); },
      cardSliceEnabled: true,
    },
  };
}

const enabled = dependencies();
assert.deepEqual(await routeCheckout(request, enabled.implementations), paid);
assert.deepEqual(enabled.calls, { legacy: 0, card: 1 }, "enabled card must use only the new slice");

for (const paymentType of ["gift-card", "invoice", "unknown"]) {
  const compatible = dependencies();
  await routeCheckout({ ...request, paymentType }, compatible.implementations);
  assert.deepEqual(compatible.calls, { legacy: 1, card: 0 }, `${paymentType} must stay on legacy`);
}

for (const flag of [false, "true", 1, {}, null, undefined]) {
  const disabled = dependencies();
  disabled.implementations.cardSliceEnabled = flag;
  await routeCheckout(request, disabled.implementations);
  assert.deepEqual(disabled.calls, { legacy: 1, card: 0 }, "only literal true may enable the card slice");
}

const safe = dependencies(async () => { throw { authorizationCreated: false }; });
assert.deepEqual(await routeCheckout(request, safe.implementations), paid);
assert.deepEqual(safe.calls, { legacy: 1, card: 1 }, "own pre-authorization proof falls back once");

const inheritedProof = Object.create({ authorizationCreated: false });
const inherited = dependencies(async () => { throw inheritedProof; });
assert.deepEqual(await routeCheckout(request, inherited.implementations), unknown);
assert.deepEqual(inherited.calls, { legacy: 0, card: 1 }, "inherited fallback state is not explicit proof");

const functionFailure = Object.assign(() => {}, { authorizationCreated: false });
const nonObject = dependencies(async () => { throw functionFailure; });
assert.deepEqual(await routeCheckout(request, nonObject.implementations), unknown);
assert.deepEqual(nonObject.calls, { legacy: 0, card: 1 }, "a thrown function is not an object proof");

const declined = {
  orderId: request.orderId,
  status: "failed",
  totalCents: 1084,
  errorCode: "PAYMENT_DECLINED",
};
for (const result of [paid, declined, unknown]) {
  const validFailure = dependencies(async () => {
    throw { authorizationCreated: true, result };
  });
  assert.deepEqual(await routeCheckout(request, validFailure.implementations), result);
  assert.deepEqual(validFailure.calls, { legacy: 0, card: 1 });
}

const prototypedResult = Object.assign(Object.create({ secret: "inherited" }), declined);
const canonicalFailure = dependencies(async () => {
  throw { authorizationCreated: true, result: prototypedResult };
});
const canonicalResult = await routeCheckout(request, canonicalFailure.implementations);
assert.deepEqual(canonicalResult, declined);
assert.equal(Object.getPrototypeOf(canonicalResult), Object.prototype, "valid results must be canonical plain objects");
assert.notEqual(canonicalResult, prototypedResult, "the router must not expose the thrown object by reference");

for (const result of [
  { ...declined, orderId: "wrong" },
  { ...declined, totalCents: 1 },
  { ...declined, status: "banana" },
  { ...declined, errorCode: {} },
  { ...paid, errorCode: "PAYMENT_DECLINED" },
  { ...declined, errorCode: null },
  { ...declined, errorCode: "OTHER_ERROR" },
  { ...declined, secret: "leak" },
  { orderId: request.orderId, status: "failed", totalCents: 1084 },
]) {
  const malformed = dependencies(async () => {
    throw { authorizationCreated: true, result };
  });
  assert.deepEqual(await routeCheckout(request, malformed.implementations), unknown);
  assert.deepEqual(malformed.calls, { legacy: 0, card: 1 }, "malformed results must not retry legacy");
}

for (const failure of [{ authorizationCreated: true }, {}, "ambiguous"]) {
  const unsafe = dependencies(async () => { throw failure; });
  assert.deepEqual(await routeCheckout(request, unsafe.implementations), unknown);
  assert.deepEqual(unsafe.calls, { legacy: 0, card: 1 }, "uncertain authorization must not retry legacy");
}

console.log("PASS participant card routing, strict fallback proof, and public result checks");
