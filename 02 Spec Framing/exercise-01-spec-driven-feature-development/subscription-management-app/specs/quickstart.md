# Quickstart Validation: Self-Service Subscription Management

## Purpose

Validate the planned feature end to end without embedding implementation code.
Use the contract in
[`contracts/subscription-management.openapi.yaml`](./contracts/subscription-management.openapi.yaml)
and the states in [`data-model.md`](./data-model.md) as the source of truth.

## Prerequisites

- Supported Node.js and npm versions for the repository
- Subscription command service or contract-compatible mock
- Test accounts for `account_owner`, `billing_admin`, and `viewer`
- No pre-existing pending request unless the scenario requires one

## Local checks

```powershell
npm install
npm run lint
npm run test
npm run format
npm run typecheck
npm run build
npm run dev
```

Expected: all automated checks pass and the subscription overview loads without
regression before management scenarios begin.

## Scenario 1: Plan and seat change

1. Open an active account as `account_owner`.
2. Select an eligible plan or valid seat increase.
3. Request a quote and verify current/proposed state, amount, effective date,
   renewal date, and expiry.
4. Confirm once, then repeat the confirmation with the same idempotency key.

Expected: one request reference is returned, the duplicate returns the same
result, and at most one billing effect occurs.

## Scenario 2: Role boundaries

1. Open the same account as `billing_admin`; verify plan, seat, and cadence
   actions are available while cancellation is not.
2. Open as `viewer`; verify all mutation actions are unavailable.
3. Attempt forbidden confirmations directly through the contract.

Expected: every forbidden attempt returns `403`, subscription version and state
remain unchanged, and a rejection audit event exists.

## Scenario 3: Scheduled cadence change

1. Request a monthly-to-annual or annual-to-monthly quote.
2. Confirm it while the quote is current.

Expected: the request is `scheduled`, current access remains unchanged, and the
effective date is the renewal date.

## Scenario 4: Cancellation and withdrawal

1. As `account_owner`, review cancellation consequences and confirm.
2. Verify access remains active through the paid term.
3. Withdraw before the irreversible cutoff.

Expected: the cancellation moves from `scheduled` to `withdrawn`, renewal
continues, and both actions are audited.

## Scenario 5: Conflict and stale quote

1. Obtain a quote, then change the subscription version through another session.
2. Confirm the old quote.
3. Create a pending request and attempt a second mutation.

Expected: stale confirmation and conflicting mutation return `409`; the UI
refreshes authoritative state and no second request is created.

## Scenario 6: Timeout and safe retry

1. Submit confirmation and interrupt the response after the service accepts it.
2. Query status using the same request key before retrying.

Expected: the UI reports an indeterminate outcome, recovers the original request,
and never generates a new billing effect.

## Scenario 7: Accessibility

Complete quote, confirmation, error recovery, and withdrawal using only the
keyboard and a screen reader.

Expected: focus order is logical, controls have accessible names, validation is
associated with fields, and quote/request status changes are announced.

## Exit criteria

- All functional requirements have at least one passing automated or contract
  scenario.
- All role, conflict, idempotency, stale-state, and cancellation checks pass.
- Existing subscription overview behavior still passes regression checks.
- No browser bundle contains billing-provider credentials or privileged logic.
