# Move One Checkout Route Out of Legacy Code

## Your Mission

Card checkout needs to move out of a shared legacy implementation. Gift-card, invoice, and unknown payment types must keep working, and an uncertain payment failure must never trigger a second authorization.

Move only the card route behind a switch that can restore the legacy path. Prove both compatibility and the boundary for safe fallback.

## Project

[checkout-migration-app](./checkout-migration-app) contains an all-legacy router and protected route tests. The [checkout contract](./docs/checkout-contract.md) defines public fields, rounding, injected dependencies, and authorization safety.

This is a local simulation; no payment provider account is required. Use the [setup instructions](./docs/setup.md). Time box: 60 minutes.

## How To Go About It

1. Inspect the existing router and record which requests use legacy checkout in `evidence/before.md`.
2. Use **[test-driven-development](https://github.com/obra/superpowers/tree/main/skills/test-driven-development)** to write a public-router test for the proposed boundary. Observe a meaningful behavior failure, then commit the test before production changes.
3. Introduce `cardCheckout.mjs` and update `checkoutRouter.mjs`. Only enabled card requests should reach the new slice; the legacy implementation stays available.
4. Exercise failures as well as successful payments. Fallback is allowed only when an error explicitly proves no authorization was created. Ambiguous or completed authorizations must never retry through legacy.
5. Run the unchanged participant test and protected suite. Demonstrate the switch-off route, exact result fields and rounding, and call counts that rule out duplicate authorization.

## Evidence

Submit the router, card slice, precommitted regression test, route matrix, public-contract comparison, and rollback explanation. Include `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, and proof of skill use.

Follow the [evidence instructions and template](./docs/evidence-template.md) to capture checks, cite sources, and seal the evidence. Open one focused PR using the [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

- Only enabled card requests use the new slice.
- Other payment types and switch-off requests retain legacy behavior.
- Public values are preserved, dependencies are injectable, and safe fallback happens once.
- Uncertain or completed authorizations never trigger a legacy retry.
- The same test fails before implementation and passes afterward; `npm run verify:exercise` passes.
