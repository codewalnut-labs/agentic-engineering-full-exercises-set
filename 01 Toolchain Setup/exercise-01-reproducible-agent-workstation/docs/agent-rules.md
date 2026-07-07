# Agent Rules

This is a seeded senior-lab input for Reproducible Agent Workstation. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Agent workstation bootstrap for a regulated billing portal

## Concrete Inputs

- AGENTS.md contract
- doctor command
- CLI allowlist
- forbidden paths

## Seeded Risks

- doctor command does not detect missing Node major version
- agent rules omit the generated-artifact cleanup command
- CLI allowlist grants deploy access before local checks pass

## Verification Expectations

- agent:check
- doctor:setup
- rules-size-check
- forbidden-path simulation

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the senior engineer.
