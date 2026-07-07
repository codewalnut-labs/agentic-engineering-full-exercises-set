# Shared Foundation Risks

This is a seeded senior-lab input for Conflict-Tolerant Migration Board. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Migration board for parallel agent component upgrades

## Concrete Inputs

- migration batch
- shared foundation
- conflict marker
- merge window

## Seeded Risks

- batch edits shared button styles from two lanes
- migration order ignores dependency on token update
- conflict detection does not inspect generated diffs

## Verification Expectations

- migration board validation
- overlap detector
- slice verification
- integration smoke

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the senior engineer.
