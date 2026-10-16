# Replace a Legacy Feature in Small, Reversible Steps

## Your Mission

Card checkout must move out of a shared legacy implementation while other payment flows keep working. A failed migration can leave an authorization completed even when the caller receives an error.

Replace only the card feature through a shared routing boundary and a reversible switch. Demonstrate compatibility, safe fallback, and rollback without producing duplicate authorizations.

## Project

[checkout-migration-app](./checkout-migration-app) contains an all-legacy router, the current checkout implementation, and protected contract checks. A local fake provider records calls and authorizations and injects failures before dispatch and after authorization.

No payment account is required. Use the [setup instructions](./docs/setup.md). Time box: 60 minutes after setup.

## How To Go About It

1. Inspect the legacy path and record the migration boundary and current routing in `evidence/before.md`.
2. Apply **[Branch by Abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html)**: keep one caller interface while old and new implementations coexist. Use an agent to plan small migration steps and an immediate rollback.
3. Add a public-router test using injected implementations. Observe a meaningful assertion failure and commit the test before production edits.
4. Introduce the card implementation and switch only enabled card requests to it. Preserve public fields, rounding, declines, and other payment types. Permit legacy fallback only when no authorization was created.
5. Run the unchanged test, protected comparisons, and authorization ledger. Exercise failures before and after dispatch, then enable, disable, and re-enable the feature. Compare implementations with isolated fake dependencies; each routed payment executes once.

## Evidence

Submit the router, card implementation, precommitted test, route matrix, public-contract comparison, generated authorization ledger, and rollback explanation. Include `evidence/before.md`, `evidence/after.md`, and `evidence/comparison.md`.

Follow the [evidence instructions and template](./docs/evidence-template.md) to capture actual checks and seal source-linked proof. Run `npm run verify:exercise` from `checkout-migration-app/` and open a focused PR using the [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

Only enabled card requests use the replacement. Other routes and switch-off requests retain legacy behavior. Public outputs stay compatible, safe fallback occurs once, and uncertain outcomes never trigger another authorization. The ledger demonstrates failure handling and reversible routing. The frozen test fails before implementation, passes afterward, and final verification succeeds.
