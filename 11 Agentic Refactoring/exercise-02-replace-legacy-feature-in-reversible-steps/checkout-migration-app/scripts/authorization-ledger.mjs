import assert from 'node:assert/strict';
import { createLegacyCheckout } from '../src/checkout/legacyCheckout.mjs';

const request = { orderId: 'ord-ledger', paymentType: 'card', subtotalCents: 1001, taxRateBps: 825, paymentToken: 'tok-local' };
const totalCents = 1084;
export function gateway(mode) {
  const calls = [], authorizations = [];
  return {
    calls, authorizations,
    async authorize(input) {
      calls.push(structuredClone(input));
      if (mode === 'before-dispatch' && calls.length === 1) throw { authorizationCreated: false };
      authorizations.push({ id: 'auth-' + authorizations.length, ...input });
      if (mode === 'after-authorization') throw { authorizationCreated: true };
      if (mode === 'unknown-outcome') throw new Error('connection lost after dispatch');
      return { approved: mode !== 'declined' };
    },
  };
}
export async function observeMigration(implementations) {
  if (!implementations) {
    const { createCardCheckout } = await import('../src/checkout/cardCheckout.mjs');
    const { routeCheckout } = await import('../src/checkout/checkoutRouter.mjs');
    implementations = { createCardCheckout, routeCheckout };
  }
  const rows = [];
  for (const mode of ['approved', 'declined', 'before-dispatch', 'after-authorization', 'unknown-outcome']) {
    const provider = gateway(mode), routes = [];
    const legacy = createLegacyCheckout(provider), card = implementations.createCardCheckout(provider);
    const result = await implementations.routeCheckout(structuredClone(request), {
      legacy: input => { routes.push('legacy'); return legacy(input); },
      card: input => { routes.push('card'); return card(input); }, cardSliceEnabled: true,
    });
    const unknown = ['after-authorization', 'unknown-outcome'].includes(mode);
    assert.deepEqual(result, { orderId: request.orderId, status: unknown || mode === 'declined' ? 'failed' : 'paid', totalCents,
      errorCode: unknown ? 'PAYMENT_STATE_UNKNOWN' : mode === 'declined' ? 'PAYMENT_DECLINED' : null }, mode);
    assert.deepEqual(routes, mode === 'before-dispatch' ? ['card', 'legacy'] : ['card'], mode + ': unsafe fallback');
    assert.equal(provider.calls.length, mode === 'before-dispatch' ? 2 : 1, mode + ': duplicate provider calls');
    assert.equal(provider.authorizations.length, 1, mode + ': duplicate authorization');
    for (const call of provider.calls) assert.deepEqual(call, { orderId: request.orderId, amountCents: totalCents, paymentToken: request.paymentToken });
    rows.push({ mode, routes, calls: provider.calls, authorizations: provider.authorizations, result });
  }
  // Same wired implementations survive enable -> disable -> enable without recreating the router.
  const provider = gateway('approved'), legacy = createLegacyCheckout(provider), card = implementations.createCardCheckout(provider);
  const rollback = [];
  for (const enabled of [true, false, true]) {
    const routes = [];
    const result = await implementations.routeCheckout(request, { cardSliceEnabled: enabled,
      legacy: input => { routes.push('legacy'); return legacy(input); }, card: input => { routes.push('card'); return card(input); } });
    assert.deepEqual(routes, enabled ? ['card'] : ['legacy']);
    assert.equal(result.status, 'paid'); rollback.push({ enabled, routes, result });
  }
  assert.equal(provider.authorizations.length, 3, 'one authorization per separate request');
  return { schemaVersion: 1, rows, rollback };
}
