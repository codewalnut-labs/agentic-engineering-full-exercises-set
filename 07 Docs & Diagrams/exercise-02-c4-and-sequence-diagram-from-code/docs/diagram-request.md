# Diagram Request

This is a seeded lab input for C4 and Sequence Diagram From Code. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Verified diagrams generated from actual workflow code

## Concrete Inputs

- C4 container
- sequence step
- trace artifact
- service boundary

## Seeded Risks

- diagram includes a queue service not present in code
- sequence skips the error branch
- trace artifact is not tied to files

## Verification Expectations

- diagram step trace
- file-reference check
- error branch verification
- diagram drift test

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the accountable engineer.
