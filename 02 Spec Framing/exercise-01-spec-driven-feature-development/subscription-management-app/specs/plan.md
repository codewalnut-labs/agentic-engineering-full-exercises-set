# Technical Plan

## PLAN-001: Authorization and role-gated controls

Implement per-action permission checks based on `ownerRole`. Reference REQ-001, REQ-007.

- Add permission helpers distinguishing viewer, billing_admin, and account_owner capabilities
- Disable all change controls for viewers
- Allow billing_admin to upgrade, downgrade, and change seats but restrict cancel to account_owner only
- Document enterprise approval as out of scope in UI copy

## PLAN-002: Billing change workflow with preview and scheduling

Build the core subscription change flow integrating provider preview and scheduling APIs. Reference REQ-002, REQ-003, REQ-004.

- Call billing provider preview endpoint before confirming charged changes
- Apply upgrades and seat increases immediately with proration
- Schedule downgrades and cancellations for end of current billing term
- Display effective date and price impact before confirmation

## PLAN-003: Pending request guard and state display

Prevent conflicting requests and surface pending state. Reference REQ-005.

- Check for existing `pendingChange` before enabling submission
- Block new requests when a pending request exists
- Display pending state text and status in subscription summary
- Handle provider conflict response on duplicate submission

## PLAN-004: Failure recovery and safe error handling

Handle asynchronous results, retries, and provider errors. Reference REQ-006.

- Track request lifecycle states: pending, succeeded, rejected, failed
- Store and reuse idempotency keys across retries
- Translate provider error details into safe customer-facing messages
- Offer retry action that reuses the same idempotency key
