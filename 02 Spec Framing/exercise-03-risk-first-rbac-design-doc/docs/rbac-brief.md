# Rbac Brief

This is a seeded lab input for Risk-First RBAC Design Doc. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

RBAC for customer data exports and privileged approvals

## Concrete Inputs

- role
- resource
- privileged action
- audit event

## Seeded Risks

- billing analyst can export PII without audit reason
- team admin can grant owner role
- denied actions do not emit audit events

## Verification Expectations

- product-question log
- acceptance criteria tests
- permission matrix tests
- non-goal boundary check

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the accountable engineer.
