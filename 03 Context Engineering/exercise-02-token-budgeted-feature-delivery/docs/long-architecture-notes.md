# Long Architecture Notes

This is a seeded lab input for Token-Budgeted Feature Delivery. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Context-bounded feature delivery for an account health widget

## Concrete Inputs

- context manifest
- architecture map
- feature slice
- task scratchpad

## Seeded Risks

- context manifest omits the owning component
- feature plan reads raw fixture dumps before repo pointers
- task state is only kept in chat

## Verification Expectations

- context file check
- repo-map coverage check
- feature test
- context budget check

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the accountable engineer.
