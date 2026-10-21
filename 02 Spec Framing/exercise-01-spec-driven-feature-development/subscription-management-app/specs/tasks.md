# Implementation Tasks

## TASK-001: Add per-action permission helpers

Implement role-based gating that distinguishes cancellation from other management actions.

- References: REQ-001, AC-001, AC-002
- Add `canManageSubscription(role)` and `canCancelSubscription(role)` helpers in subscription service
- Conditionally render upgrade, downgrade, seat, and cancel controls based on role

## TASK-002: Build upgrade and seat increase flow with billing preview

Implement immediate upgrade and seat increase with provider preview integration.

- References: REQ-002, REQ-004, AC-004, AC-006
- Add plan and seat selection UI
- Call billing provider preview endpoint before confirmation
- Submit confirmed upgrade with proration

## TASK-003: Build end-of-term downgrade and cancellation flow

Implement scheduled downgrade and cancellation with effective-date communication.

- References: REQ-003, AC-003, AC-005
- Add downgrade action with effective-date preview
- Add cancel action restricted to account_owner
- Schedule changes for end of billing term via provider API

## TASK-004: Enforce single pending request and display pending state

Block conflicting submissions and show pending request status.

- References: REQ-005, AC-007
- Check `pendingChange` on account before enabling change controls
- Disable submission and show existing pending state when a request is in flight
- Handle provider conflict response for duplicate submissions

## TASK-005: Implement request lifecycle states and safe error recovery

Handle asynchronous results, idempotent retries, and error translation.

- References: REQ-006, AC-008
- Track pending, succeeded, rejected, and failed states per request
- Store idempotency key and reuse on retry
- Translate provider errors to safe customer-facing messages

## TASK-006: Document out-of-scope boundaries in UI

Ensure enterprise approval and other excluded features are not surfaced.

- References: REQ-007, AC-009
- Omit approval workflow steps from all change flows
- Add out-of-scope note for enterprise approval in management UI
