# Implementation Plan: Self-Service Subscription Management

**Branch**: `codex/exercise-01-spec-driven-feature-development` | **Date**: 2026-07-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/spec.md`

## Summary

Extend the existing subscription dashboard with role-aware plan, seat, cadence,
and cancellation flows. Keep billing authority server-side behind a typed
gateway: the client requests eligible options and version-bound quotes, shows
the full impact, and confirms changes using an idempotency key. Add explicit
pending-request states, stale-quote handling, accessible confirmations, and
test coverage without implementing provider credentials or billing logic in the
browser.

## Technical Context

**Language/Version**: TypeScript 5.9

**Primary Dependencies**: React 19.2, React DOM 19.2, Vite 7.1; add Vitest,
Testing Library, and jsdom as development-only test dependencies

**Storage**: Authoritative subscription, quote, request, and audit persistence
belongs to the external subscription command service; the app stores only
ephemeral form/quote state

**Testing**: Vitest for domain/service tests and React Testing Library for
role, keyboard, error, and user-flow tests; existing repository checks remain

**Target Platform**: Modern evergreen desktop and mobile web browsers

**Project Type**: Single-page web application consuming an authoritative
subscription-management HTTP service

**Performance Goals**: Show quote and request results within 3 seconds for at
least 95% of normal test runs; update local interaction states within 100 ms

**Constraints**: No billing-provider credentials or authority in the browser;
one pending mutation per subscription; server reauthorizes every mutation;
WCAG 2.2 AA interaction patterns; no application implementation in this PR

**Scale/Scope**: Three account roles, four mutation types, two cadences, one
active subscription per account, and one pending mutation per subscription

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Gate | Result |
| --- | --- | --- |
| Spec Before Code | Specification, plan, design artifacts, and tasks exist before source changes | PASS |
| Testable and Traceable Requirements | FR/SC identifiers, independent stories, tests, and exact task paths | PASS |
| Billing and Permission Safety | Server authority, roles, quotes, versions, idempotency, audit, and failure states | PASS |
| Independent Delivery | Three story phases with independent test criteria | PASS |
| Simplicity and Repository Fit | Existing stack retained; only test tooling added; native `fetch` used | PASS |

Post-design re-check: PASS. The contract, data model, and validation guide
preserve all five principles. No complexity exception is required.

## Project Structure

### Documentation (this feature)

```text
specs/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── subscription-management.openapi.yaml
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── App.tsx
├── types.ts
├── components/
│   ├── SubscriptionActions.tsx
│   ├── ChangeQuotePanel.tsx
│   └── PendingChangePanel.tsx
├── data/
│   └── subscriptions.ts
├── services/
│   ├── subscriptionGateway.ts
│   └── subscriptionService.ts
└── styles.css

tests/
├── contract/
│   └── subscriptionGateway.contract.test.ts
├── integration/
│   └── subscriptionManagement.test.tsx
└── unit/
    └── subscriptionService.test.ts
```

**Structure Decision**: Preserve the current single Vite/React project.
Introduce three focused UI components, one provider-neutral gateway, and tests
at repository root. Do not add a browser-side billing engine or a second
application. The external command service is defined by the OpenAPI contract
and remains a deployment prerequisite.

## Technical Approach

### Domain and state

- Expand `src/types.ts` with plan option, quote, request, audit-safe error, and
  mutation input types matching `data-model.md`.
- Treat the subscription version returned by the service as the concurrency
  token. A quote captures that version and expires after the server-defined
  interval.
- Represent request lifecycle explicitly: `scheduled`, `processing`, `applied`,
  `failed`, or `withdrawn`.
- Keep form state local to each account card; refresh authoritative
  subscription and pending-request state after every terminal response.

### Service boundary

- Add `src/services/subscriptionGateway.ts` as the only HTTP boundary. It maps
  contract responses into domain types and returns typed errors for forbidden,
  stale, expired, conflicting, invalid, and indeterminate outcomes.
- Keep permission, pricing, proration, cutoff, idempotency, and audit decisions
  authoritative on the server. Client checks improve usability only.
- Refactor `src/services/subscriptionService.ts` into pure helpers for role
  capabilities, mutation validation, display summaries, and safe retry advice.

### UI flow

1. `SubscriptionActions` shows only operations relevant to current role and
   subscription state while leaving disabled actions explainable.
2. Selection requests a version-bound quote from the gateway.
3. `ChangeQuotePanel` presents current/proposed state, monetary impact,
   effective date, expiry, and consequences before confirmation.
4. Confirmation sends quote ID, expected version, and a client-generated
   idempotency key exactly once; repeat attempts reuse that key.
5. `PendingChangePanel` shows request state and withdrawal when permitted.
6. Focus moves to the result heading, and status changes use an accessible live
   region without relying on color alone.

### Error and recovery

- `403`: refresh role and explain the permission boundary.
- `409`: refresh subscription/pending request; invalidate current quote.
- `410`: mark quote expired and offer a fresh quote.
- `422`: keep user input and show field-level validation.
- Timeout/indeterminate: retain the idempotency key, query request status, and
  do not invite a new confirmation until the outcome is known.
- Other failures: preserve current state, show a retry-safe message, and emit
  no success confirmation.

## Test Strategy

- **Unit**: capability matrix, effective-date display, seat validation, stale
  quote detection, safe-retry advice, and request status summaries.
- **Contract**: request/response/error mapping against
  `contracts/subscription-management.openapi.yaml`.
- **Integration**: plan/seat happy path, cadence scheduling, cancellation and
  withdrawal, pending conflict, role changes, duplicate submission, stale quote,
  timeout recovery, keyboard completion, focus, and live announcements.
- **Regression**: existing overview summaries and renewal-risk display remain
  correct for starter accounts.

## Delivery Boundaries

- This feature PR may change only the client, tests, and dependency metadata
  listed in the task plan.
- Production billing-provider implementation, credentials, taxes, payment
  methods, invoices, refunds outside quoted proration, coupons, trials, and
  account ownership transfer are external or out of scope.
- Release is blocked until the authoritative service passes the contract,
  authorization, idempotency, concurrency, and audit acceptance checks.

## Complexity Tracking

No constitution violations or complexity exceptions.
