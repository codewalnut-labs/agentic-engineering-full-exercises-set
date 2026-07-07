# Hidden Conventions

This is a seeded senior-lab input for Repo Context Pack for Bugfix Agents. It gives the learner concrete constraints to inspect, implement, test, and verify.

## Operating Context

Bugfix handoff context for a customer escalation queue

## Concrete Inputs

- repo map
- bug report
- module owner
- safe inspection path

## Seeded Risks

- fresh agent reads unrelated billing modules first
- module ownership is missing for escalation routing
- bugfix plan loses task state after compaction

## Verification Expectations

- context-pack check
- regression test
- fresh-agent handoff simulation
- do-not-touch path audit

## Agent Workflow Constraint

The learner must use an agent to inspect and plan, but the final implementation, review, and verification remain owned by the senior engineer.
