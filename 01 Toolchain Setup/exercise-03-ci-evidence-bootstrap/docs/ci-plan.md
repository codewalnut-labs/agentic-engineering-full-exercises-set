# Ci Plan

This is a seeded lab input for Agent Check Bootstrap. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Agent-safe local toolchain gate before CI evidence exists

## Concrete Inputs

- AGENTS.md rule set
- agent:check script
- CLI allowlist
- hook policy

## Seeded Risks

- agent can run build without typecheck
- rules file names a stale test command
- no hook blocks access to local secrets

## Verification Expectations

- agent:check
- rules command audit
- hook simulator
- CLI/MCP allowlist check

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the accountable engineer.
