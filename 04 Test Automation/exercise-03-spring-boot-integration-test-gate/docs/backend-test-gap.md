# Backend Test Gap

This is a seeded lab input for Spring Boot Integration Test Gate. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

React smoke path backed by Spring Boot transition rules

## Concrete Inputs

- workflow transition
- audit log
- backend fixture
- browser smoke test

## Seeded Risks

- backend accepts invalid transition
- audit log is not written on blocked status
- frontend smoke uses a mocked API after integration exists

## Verification Expectations

- Spring integration tests
- role locator smoke
- trace/report capture
- deterministic backend fixture

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the accountable engineer.
