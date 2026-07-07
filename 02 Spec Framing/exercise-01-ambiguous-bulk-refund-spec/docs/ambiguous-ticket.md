# Ambiguous Ticket

This is a seeded lab input for Ambiguous Bulk Refund Spec. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Bulk refund operations for marketplace orders

## Concrete Inputs

- order
- payment capture
- refund policy
- support agent role

## Seeded Risks

- partial refunds ignore already-refunded line items
- high-value refunds skip manager approval
- failure state does not preserve selected orders

## Verification Expectations

- eligibility test
- approval boundary test
- failure-state smoke
- session-readable spec check

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the accountable engineer.
