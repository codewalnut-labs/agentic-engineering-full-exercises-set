# Tool Inventory

This is a seeded senior-lab input for Guardrailed CLI Workshop. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Runtime command guardrails for agent-driven maintenance

## Concrete Inputs

- command policy
- PreToolUse simulator
- secret path denylist
- CLI allowlist

## Seeded Risks

- recursive delete is allowed outside the exercise folder
- .env.local read is warned instead of blocked
- gh workflow dispatch is allowed without a branch guard

## Verification Expectations

- guardrail unit cases
- denylist simulation
- allowed command smoke
- policy diff review

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the senior engineer.
