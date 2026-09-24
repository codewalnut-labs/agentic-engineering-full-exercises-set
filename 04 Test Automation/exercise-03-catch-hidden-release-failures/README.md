# Exercise 03 : Build a Release Check That Catches Hidden Failures

## Your Mission

Your team has declared a release ready because one focused test passed. The client still accepts invalid data, the provider returns an incomplete response, and an unsupported transition can be saved.

Your mission is to use **[Verification Before Completion](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** to challenge that claim, repair the hidden failures, and build one release command that checks every required surface and stops when anything fails.

The duration for this challenge is 60 min or less after Node.js, Java, Maven dependencies, and the agent skill are ready.

## Project

[workflow-gate-app](./workflow-gate-app) supplies the React client and client checks. [workflow-rules-api](./workflow-rules-api) supplies the Spring API and provider checks. The exercise includes a previous release claim and an incomplete verification script.

This standalone challenge supplies its own [release requirements](./docs/release-requirements.md). Your task is to establish trustworthy release evidence across the client, provider, builds, and verification command.

## How To Go About It

1. Reproduce the previous focused check and run the omitted checks. Record the actual results in `evidence/before.md` and explain why the original green result did not prove release readiness.
2. Load Verification Before Completion. Before editing, map every release requirement to a command and observable expected result.
3. Repair client validation and provider behavior. Add regression coverage while preserving the supplied acceptance tests.
4. Complete the release gate so it runs all required surfaces once, stops on the first failed or unstarted process, and preserves a non-zero result. Exercise its success and failure paths.
5. Run the complete gate against the final committed implementation. Read the output before making a completion claim, record the result in `evidence/after.md`, and explain the improvement in `evidence/comparison.md`.

## Evidence

Submit the client and provider fixes, regression tests, working release gate, actual skill-use session, audit of the old claim, requirement-to-command plan, and captured baseline and final results tied to the verified code.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `workflow-gate-app/` before raising a focused PR.

## Completion Criteria

One command proves the client contract, client quality and build, complete provider tests and build, and the gate's failure handling. Invalid responses and unsupported transitions are rejected. Completion is supported by fresh output from the final implementation, with no omitted checks or unresolved failures hidden behind a partial pass.
