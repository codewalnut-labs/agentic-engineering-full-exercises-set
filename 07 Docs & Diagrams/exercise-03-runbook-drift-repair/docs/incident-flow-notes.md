# Incident Flow Notes

This is a seeded senior-lab input for Runbook Drift Repair. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Incident runbook drift for delayed workflow processing

## Concrete Inputs

- incident step
- support command
- status page update
- runbook diagram

## Seeded Risks

- runbook command references a deleted script
- current app retries twice but docs claim five retries
- incident smoke lacks the degraded-state branch

## Verification Expectations

- runbook command smoke
- incident reproduction script
- diagram drift check
- support handoff review

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the senior engineer.
