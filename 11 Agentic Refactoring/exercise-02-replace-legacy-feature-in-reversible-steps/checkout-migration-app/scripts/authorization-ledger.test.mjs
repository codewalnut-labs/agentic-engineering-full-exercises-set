import test from 'node:test';
import assert from 'node:assert/strict';
import { gateway, observeMigration } from './authorization-ledger.mjs';
test('faults distinguish a safe pre-dispatch failure from an uncertain authorization', async () => {
  const before = gateway('before-dispatch'); await assert.rejects(before.authorize({}), e => e.authorizationCreated === false);
  assert.equal(before.authorizations.length, 0); await before.authorize({}); assert.equal(before.authorizations.length, 1);
  const after = gateway('after-authorization'); await assert.rejects(after.authorize({}), e => e.authorizationCreated === true);
  assert.equal(after.authorizations.length, 1);
});
test('ledger rejects a router that silently drops the new route', async () => {
  await assert.rejects(observeMigration({ createCardCheckout: () => async () => ({}), routeCheckout: (r, d) => d.legacy(r) }), /unsafe fallback/);
});
test('ledger rejects a second authorization hidden inside the card implementation', async () => {
  await assert.rejects(observeMigration({ createCardCheckout: ({ authorize }) => async r => {
    await authorize({ orderId: r.orderId, amountCents: 1084, paymentToken: r.paymentToken });
    await authorize({ orderId: r.orderId, amountCents: 1084, paymentToken: r.paymentToken });
    return { orderId: r.orderId, status: 'paid', totalCents: 1084, errorCode: null };
  }, routeCheckout: (r, d) => d.card(r) }), /duplicate provider calls/);
});
