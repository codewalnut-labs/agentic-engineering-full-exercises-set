# Exercise 02 : Prove a Feature Can Be Switched Off Safely

## Your Mission

Your team wants to release a new invoice preview behind a feature flag. Turning the flag off should restore the existing experience, but the starter still calls the new service and sends preview telemetry.

Your challenge is to repair that boundary and give reviewers proof that one configuration command can disable the feature safely, without a code deployment. A flag is a configuration switch that decides whether someone receives the new behavior.

Use the **[verification-before-completion skill](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** to verify each state and the rollback command before claiming the rollout is safe.

The duration for this challenge is 75 min or less after setup.

## Project

[feature-rollback-app](./feature-rollback-app) contains the faulty flag boundary, local configuration, and protected scenarios. Use the [flag brief](./docs/flag-brief.md) and [rollback requirements](./docs/rollback-contract.md).

This exercise is standalone. All drills use a temporary local configuration.

## How To Go About It

1. Run the scenario checks and record the starting commit, failures, and unexpected service calls in `evidence/before.md`.
2. Repair the boundary. Only an enabled, valid target may receive the preview and send its telemetry. Disabled flags, provider errors, invalid context, and API failures must return the existing experience according to the flag brief.
3. Create the rollback command. Validate inputs, reject stale configuration revisions, disable the flag, clear targeting, and record who changed it and why. An interrupted update must preserve the original file; two overlapping commands must not both replace the same revision.
4. Commit the implementation. Use the supplied capture and rollback drill to generate proof from that exact code version.
5. Write a reviewer summary with the release decision, state results, rollback command, and remaining risks. Record the verified outcome in `evidence/after.md` and explain the changes in `evidence/comparison.md`.

## Evidence

Submit the boundary fix, rollback command, generated scenario results and rollback drill, reviewer summary, and `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`.

Include actual skill use, source citations, sealed evidence, and captured verification output. Follow the [setup and verification instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `feature-rollback-app/` before raising a focused PR from your fork.

## Completion Criteria

The flag checks pass, disabled and provider-error paths make no preview calls or telemetry, and the rollback drill proves a validated, atomic change with an audit record. Invalid input, interruption, and overlapping updates cannot corrupt the configuration. The successful rollback meets the supplied timing objective, and final verification passes.
