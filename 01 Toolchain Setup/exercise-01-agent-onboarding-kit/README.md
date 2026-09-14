# Exercise 01 : Prepare a Project for Agentic Development

## Your Mission

Your team is about to use coding agents on a support application. Each developer relies on personal prompts and locally installed skills. Agents start implementing unclear requests, guess repository conventions, and review changes without checking the original requirements.

Your mission is to prepare a shared project setup: a useful `AGENTS.md` and a coherent collection of engineering skills. Another developer must be able to reproduce it and start work without receiving your conversation history.

The duration for this challenge is 45 min or less after the base tools and application dependencies are ready. Selecting and configuring skills is part of the challenge.

## Project

[agent-onboarding-app](./agent-onboarding-app) is a React and TypeScript support case-routing application with basic notes and a working baseline. The [readiness scenarios](./docs/readiness-scenarios.md) include an unclear upcoming request, a technical research question, a testing task, and a supplied change to review.

Prepare the agent before feature development starts. Application code and supplied fixtures remain unchanged. You choose the instruction structure, skills, supporting files, and setup approach.

## How To Go About It

1. Assess the repository and record what a fresh agent needs, what is already available, and what is missing in `evidence/before.md`.
2. Create `agent-onboarding-app/AGENTS.md` and configure a reproducible skill collection for requirements questioning, research, test-driven development, and code review. Resolve the selected skills' dependencies and project conventions.
3. Commit the setup, then start a fresh agent session in the application directory. Demonstrate discovery of the instructions and skills, and exercise the supplied readiness scenarios. Explicit skill invocation is allowed; record human input and corrections.
4. Keep the real session output and verification results. Explain why the skills fit the project, how they were used, and which gaps remain. Record the verified setup in `evidence/after.md` and compare it in `evidence/comparison.md`.
5. Submit a setup another developer can reproduce. A reviewer may use it with a different request without allowing you to rewrite the instructions first.

## Evidence

Submit `AGENTS.md`, the installed skills and supporting files, `docs/agent-setup.md`, `evidence/skills.json`, `evidence/readiness.json`, the four scenario reports, the fresh-session transcript, and `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`. Include source citations, a sealed artifact record, and captured command output as specified in the [evidence instructions and template](./docs/evidence-template.md).

Follow the [setup and verification instructions](./docs/setup.md) and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `agent-onboarding-app/` before raising a focused PR from your fork.

## Completion Criteria

The challenge is complete when a fresh agent discovers the submitted instructions and skills, surfaces unresolved requirements, produces source-backed research, identifies a meaningful test interface and runs its baseline, and reviews the supplied change against its requirements and standards. The setup is reproducible, important guidance agrees with the repository, skill dependencies are satisfied, and the checks pass. File presence alone does not demonstrate agent behaviour.
