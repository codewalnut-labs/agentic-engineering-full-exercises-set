# Exercise 01 : Give Reviewers Complete Evidence When Checks Fail

## Your Mission

A pull request lists passing tests but leaves out a failed checkout check and its screenshot. Its description says the change is ready to merge.

Your challenge is to correct that PR and automate a complete evidence pack. Reviewers must see the failure, identify the tested code, and understand why merging is blocked. The evidence must remain available when CI fails.

Use the **[verification-before-completion skill](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** to connect PR claims to fresh command output.

The duration for this challenge is 60 min or less after setup.

## Project

[failed-check-evidence-app](./failed-check-evidence-app) contains the starter and harness. The supplied [check results](./fixtures/check-results.json) include passing tests, a failed checkout check, and a screenshot.

Start with the misleading description and reviewer comment in the [PR review brief](./docs/pr-review-brief.md). This exercise is standalone; fixing checkout is outside its scope.

## How To Go About It

1. Inspect the draft, results, and artifacts. Record the starting commit, unsupported PR claims, and missing proof in `evidence/before.md`.
2. Build the generator using the [output contract](./docs/evidence-contract.md). Preserve every check, exit code, artifact, risk, reviewer action, and rollback.
3. Add the workflow in the [PR brief](./docs/pr-brief.md). Verification and upload must run after generation fails while the job remains failed.
4. Commit the implementation, generate proof for that commit, and verify the passing, failing, and invalid-input cases.
5. Write `evidence/pr-summary.md` with a corrected title, evidence links, and a blocked merge recommendation. Respond to the supplied reviewer comment in `evidence/review-response.md`.
6. Record the result in `evidence/after.md` and changes in `evidence/comparison.md`. After local verification, open a draft PR and add its actual failed CI run and uploaded artifact links.

## Evidence

Submit the generator, workflow, generated pack, corrected PR description, reviewer response, and `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`.

Include actual skill use, source citations, sealed evidence, and captured output. Follow the [setup and verification instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `failed-check-evidence-app/` before opening the focused PR.

## Completion Criteria

The PR exposes every check and artifact, preserves failing exit codes, and gives a supported response to the reviewer. Uploaded evidence remains accessible while the job stays failed. A reviewer can reproduce the result and see why merging remains blocked. Local verification passes; merging is not required.
