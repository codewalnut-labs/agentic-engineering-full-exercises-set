# Stale Context

This is a seeded senior-lab input for Context Cache Hygiene Challenge. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Always-on context cleanup for lower-cost agent sessions

## Concrete Inputs

- AGENTS.md
- reference file
- context budget
- stale rule

## Seeded Risks

- always-on rules include long migration instructions
- stale command stays in context after scripts change
- cache is churned by changing tool setup mid-task

## Verification Expectations

- context-size check
- stale command check
- handoff simulation
- cache-churn prevention note

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the senior engineer.
