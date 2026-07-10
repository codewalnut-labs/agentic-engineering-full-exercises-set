# Changelog Fixtures

This is a seeded lab input for Release Notes Agent Skill Factory. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Release-note skill backed by commit parsing and evidence checks

## Concrete Inputs

- commit log
- change group
- breaking change
- missing evidence flag

## Seeded Risks

- internal refactors appear as customer-facing changes
- breaking change is buried under fixes
- release note includes items with no verification evidence

## Verification Expectations

- parser fixture test
- snapshot output
- missing evidence check
- skill trigger eval

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the accountable engineer.
