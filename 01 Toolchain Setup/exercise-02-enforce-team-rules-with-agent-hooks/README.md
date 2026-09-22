# Exercise 02 : Enforce Team Engineering Rules with Agent Hooks

## Your Mission

Your team uses coding agents to make changes in a project. Agents sometimes modify protected files, skip checks after edits, or finish with unresolved failures. Each developer handles these problems differently.

Your mission is to configure shared agent hooks that apply the team's engineering rules automatically. Protected actions should be blocked, relevant changes checked, and failures surfaced without repeated reminders.

The duration for this challenge is 60 min or less after the base tools and application dependencies are ready.

## Project

[agent-hooks-app](./agent-hooks-app) is a release-workflow application with a small development task, existing checks, and a protected configuration fixture. The [team rules and scenarios](./docs/guardrail-contract.md) supply everything needed for this standalone challenge.

Configure your chosen coding agent using `PreToolUse`, `PostToolUse`, and a completion hook such as `Stop`. Handle failures using the events supported by that agent. You choose the implementation and supporting files.

## How To Go About It

1. Assess the repository and supplied team rules. Record which actions need prevention, which changes need automatic checks, and what must be verified before finishing in `evidence/before.md`.
2. Configure native hooks that block protected changes, allow normal development, run checks after relevant edits, and return useful failure feedback to the agent.
3. Exercise the supplied scenarios: an allowed edit, protected edits through editing and shell tools, a failing check, and recovery. Show that a new edit makes an earlier passing result outdated.
4. Start a fresh agent session and complete the supplied development task. Demonstrate that hooks run automatically and request follow-up when verification is missing or failing, without creating an endless retry loop.
5. Document how another developer enables the setup. Record observed results in `evidence/after.md` and explain the differences and remaining limitations in `evidence/comparison.md`.

## Evidence

Submit the native hook configuration, handler code, setup instructions, fresh-session transcript, hook execution records, and before/after comparison. Include results for the supplied scenarios and verification of the completed development task.

Follow the [setup instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `agent-hooks-app/` before raising a focused PR. Configuration files alone do not demonstrate that hooks work.

## Completion Criteria

The challenge is complete when a fresh agent session allows normal development, blocks the supplied protected actions before execution, automatically checks relevant changes, surfaces failures, and verifies the final code state. Another developer can reproduce the setup, its tool coverage and limitations are documented, and the exercise checks pass.
