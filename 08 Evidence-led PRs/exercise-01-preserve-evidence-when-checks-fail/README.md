# Exercise 01 : Give Reviewers Complete Evidence When Checks Fail

## Your Mission

A pull request looks ready to merge because its summary lists passing tests. A required checkout check failed, but its result and screenshot are missing from the review.

Your challenge is to build an evidence pack that includes every check, including failures, and remains available when the CI job fails. A reviewer must be able to see what happened, which code version was checked, and what to do next.

Use the **[verification-before-completion skill](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** to connect each claim to fresh command output.

The duration for this challenge is 60 min or less after setup.

## Project

[failed-check-evidence-app](./failed-check-evidence-app) contains the starter and verification harness. The supplied [check results](./fixtures/check-results.json) include passing tests, a failed checkout check, and a screenshot.

This exercise is standalone. The fixture represents a failed run; fixing checkout is outside this challenge.

## How To Go About It

1. Inspect the results and artifacts. Record the starting commit, missing proof, and initial findings in `evidence/before.md`.
2. Build the evidence generator described in the [output contract](./docs/evidence-contract.md). Preserve every command, result, exit code, artifact, risk, reviewer action, and rollback. Copy the artifacts and calculate their SHA-256 digests.
3. Add the repository-root workflow in the [PR brief](./docs/pr-brief.md). Evidence verification and upload must run after generation fails, while the job keeps its failed status.
4. Commit the implementation. Generate the pack from that exact commit and verify passing, single-failure, multiple-failure, and invalid-input cases.
5. Write a reviewer summary explaining why the PR is blocked and how to reproduce the result. Record the outcome in `evidence/after.md` and the changes and remaining uncertainty in `evidence/comparison.md`.

## Evidence

Submit the generator, workflow, generated pack and copied artifacts, reviewer summary, and `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`.

Include actual skill use, source citations, sealed evidence, and captured verification output. Follow the [setup and verification instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `failed-check-evidence-app/` before raising a focused PR from your fork.

## Completion Criteria

Every check and artifact remains visible, failures retain their original exit codes, and the workflow uploads evidence without making a failed job green. The reviewer can identify the tested commit, reproduce the result, and understand the risk and next action. Final verification passes.
