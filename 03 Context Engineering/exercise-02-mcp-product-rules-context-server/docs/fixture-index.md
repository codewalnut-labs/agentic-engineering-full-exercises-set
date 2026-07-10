# Fixture Index

This is a seeded lab input for MCP Product Rules Context Server. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Queryable product-rule server for agent sessions

## Concrete Inputs

- product rule
- fixture
- MCP-style query
- access boundary

## Seeded Risks

- server returns full fixture dumps instead of focused answers
- eligibility rule has no version metadata
- agent prompt duplicates product rules manually

## Verification Expectations

- query contract test
- access-boundary test
- fixture version check
- integration smoke

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the accountable engineer.
