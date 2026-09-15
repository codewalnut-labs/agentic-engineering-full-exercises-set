# Clarifications

Evidence-based decisions that block safe implementation of subscription self-service management.

## Q1: Who may cancel a subscription?

- Category: Authorization
- Repository evidence: `docs/stakeholder-notes.md` (Security) states it is unclear whether every billing admin may cancel an account or whether cancellation is restricted to the account owner. `docs/stakeholder-notes.md` (Product) says account owners and billing admins should manage plans. `src/types.ts` defines `OwnerRole` as `account_owner`, `billing_admin`, or `viewer` without per-action permissions.
- Status: Assumption
- Decision: Only `account_owner` may cancel a subscription. `billing_admin` may upgrade, downgrade, and change seats but cannot cancel.
- Consequence: Authorization requirements and acceptance criteria must distinguish cancellation from other management actions. The UI must hide or disable cancel controls for billing admins.

## Q2: When do downgrades and cancellations take effect?

- Category: Billing
- Repository evidence: `docs/stakeholder-notes.md` (Finance) says downgrades and cancellations should take effect at the next renewal date. `docs/stakeholder-notes.md` (Support) says some customers expect downgrades or cancellations to take effect immediately. This is an unresolved conflict between Finance and Support. `docs/billing-constraints.md` confirms the provider can schedule downgrades and cancellations for the end of the current billing term and does not support automatic immediate cancellation refunds.
- Status: Confirmed
- Decision: Downgrades and cancellations are scheduled for the end of the current billing term. They do not take effect immediately and no immediate refund is issued.
- Consequence: Acceptance criteria must test end-of-term scheduling. The UI must communicate the effective date before confirmation so Support can set customer expectations.

## Q3: What happens when a pending plan-change request already exists?

- Category: Billing, Failure
- Repository evidence: `docs/billing-constraints.md` states only one plan-change request may be pending per account and a second request returns a conflict response. `docs/stakeholder-notes.md` (Support) says a customer with an existing pending request must not accidentally create a conflicting second request. `src/data/subscriptions.ts` seeds account ACCT-1188 with `pendingChange: "seat increase requested by procurement"`.
- Status: Confirmed
- Decision: When a pending request exists, block all new change submissions and display the current pending state with its status.
- Consequence: Requirements must cover conflict prevention, pending-state display, and disabled change controls while a request is in flight.

## Q4: How should provider failures and asynchronous results be handled?

- Category: Failure
- Repository evidence: `docs/billing-constraints.md` states a request can be accepted before its final result arrives through a webhook, retrying without the same idempotency key can create a duplicate charge, and provider errors include internal details that must be translated into a safe customer message. `docs/stakeholder-notes.md` (Support) says agents need a clear state when a change is pending, rejected, or fails after submission.
- Status: Confirmed
- Decision: Show explicit states of pending, succeeded, rejected, and failed. Retries must reuse the same idempotency key. Provider errors are translated to safe customer-facing messages without internal details.
- Consequence: Requirements must define observable recovery behavior, idempotent retry rules, and error message safety for both the UI and API integration layer.

## Q5: Is an enterprise approval workflow included in the first release?

- Category: Scope
- Repository evidence: `docs/stakeholder-notes.md` (Product) says enterprise customers may need an approval workflow but this has not been decided, and the first release should feel complete even if some subscription actions remain out of scope. `docs/feature-request.md` lists upgrades, downgrades, cancellations, and seat changes as the requested actions with no approved acceptance criteria.
- Status: Assumption
- Decision: Enterprise approval workflows are out of scope for the first release. Self-service actions proceed without an internal approval step.
- Consequence: The specification must list enterprise approval as explicitly out of scope and avoid designing approval gates, routing, or notification flows in v1 tasks.
