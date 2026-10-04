# Exercise 02 : Resolve Release Risks with Specialist Reviews

## Your Mission

An access-approval change is approaching release. Notes render unsafe content, keyboard users cannot select review rows, repeated calculations slow the queue, and approval relies on UI state. Several risks meet at the same service boundary, so collecting separate review comments is not enough.

Your mission is to use independent specialists to find the risks, resolve supported blockers, and prove the repaired change is ready for review. Use **[dispatching-parallel-agents](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents)** for bounded, review-only investigations; one owner makes remediation decisions.

The duration for this challenge is 75 min or less after setup; repeated reviews may take longer.

## Project

[specialist-review-app](./specialist-review-app) supplies an independent access-review workflow and protected checks. The [specialist prompts](./docs/specialist-prompts.md), [risk scope](./docs/nfr-risk-seeds.md), and [remediation contract](./docs/remediation-contract.md) define security, accessibility, performance, and testability outcomes.

A supplied specialist recommendation is an external claim. Verify whether its suggested fix protects the actual service boundary.

## How To Go About It

1. Record the baseline commit, risky behavior, and review conditions in `evidence/before.md`. Keep the application unchanged during the baseline reviews.
2. Load the skill and dispatch four fresh specialists against that same commit. Give each its role, focused check, and report format. Run independent reviews concurrently within your runtime's capacity and preserve their actual sessions.
3. Verify findings against source and reproductions. Combine overlapping concerns, triage every finding and the supplied recommendation, and explain how security and testability interact.
4. As remediation owner, fix supported blockers in source and participant tests. Commit the repaired change, measure performance under the same inputs, and send four fresh specialists to recheck that exact commit.
5. Make the release decision from passing checks and rechecks. Record the verified result in `evidence/after.md` and compare findings, decisions, performance, and remaining risks in `evidence/comparison.md`.

## Evidence

Submit the remediation, eight specialist reports and sessions, baseline and final focused outputs, comparable performance measurements, decision log, and integration review. Every review must identify its source commit; every finding must have a recorded disposition.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `specialist-review-app/` before raising a focused PR.

## Completion Criteria

The four specialties independently review the baseline and recheck the repaired commit. All supported blockers are resolved, the unsupported recommendation is dismissed with source evidence, and the shared boundary receives both relevant rechecks. Comparable performance improves by at least 75 percent while preserving results. Final verification passes and the release decision remains traceable to the actual reviews.
