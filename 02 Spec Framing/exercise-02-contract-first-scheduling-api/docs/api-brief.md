# Api Brief

This is a seeded senior-lab input for Contract-First Scheduling API. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Scheduling slots and booking holds across time zones

## Concrete Inputs

- slot
- booking hold
- clinician calendar
- conflict response

## Seeded Risks

- hold expiration is not enforced
- duplicate holds return success instead of conflict
- invalid time zone is accepted

## Verification Expectations

- OpenAPI contract check
- Spring integration tests
- frontend state smoke
- timezone validation test

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the senior engineer.
