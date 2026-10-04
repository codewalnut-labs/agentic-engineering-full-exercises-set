# Exercise 02 : Prove a Feature Can Be Switched Off Safely

## Your Mission

A feature rollout PR claims a new invoice preview is safe because it has a feature flag. The reviewer asks for rollback proof, but turning the flag off still calls the new service and sends telemetry.

Your challenge is to repair the boundary and prepare a PR that proves the feature can be disabled through configuration, without a code deployment. Explain the rollout scope, rollback procedure, and limits of the local proof.

Use the **[verification-before-completion skill](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** before making safety claims in the PR.

The duration for this challenge is 75 min or less after setup.

## Project

[feature-rollback-app](./feature-rollback-app) contains the faulty boundary, configuration, and scenarios. Use the [flag brief](./docs/flag-brief.md), [rollback requirements](./docs/rollback-contract.md), and supplied description and reviewer comment in the [PR review brief](./docs/pr-review-brief.md).

This exercise is standalone. Drills use temporary local configuration.

## How To Go About It

1. Inspect the draft and run the scenario checks. Record unsupported claims, failures, and unexpected service calls in `evidence/before.md`.
2. Repair the boundary so only an enabled, valid target receives the preview. Verify disabled, provider-error, invalid-context, and API-error behavior.
3. Create the validated rollback command. It must disable the flag, clear targeting, record an audit trail, and survive interrupted or overlapping updates.
4. Commit the implementation and generate scenario and rollback proof from that exact commit.
5. Write `evidence/pr-summary.md` with a clear title, claim-to-evidence map, rollout scope, rollback command, operator, and trigger. Answer the supplied comment in `evidence/review-response.md`.
6. Record the outcome in `evidence/after.md` and changes in `evidence/comparison.md`. After local verification, open a focused PR with accessible proof links.

## Evidence

Submit the fix, rollback command, generated scenario results and drill, corrected PR description, reviewer response, and `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`.

Include actual skill use, source citations, sealed evidence, and captured output. Follow the [setup and verification instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `feature-rollback-app/` before opening the PR.

## Completion Criteria

The checks and rollback drill pass. The PR lets a reviewer verify the state behavior and run the local rollback procedure. Its response addresses the safety concern without claiming untested production behavior. Remaining risks are explicit, and the successful rollback meets the supplied timing budget. Approval and merging are not required.
