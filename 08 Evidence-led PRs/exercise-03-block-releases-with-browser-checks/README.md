# Exercise 03 : Block a Release That Fails Browser Quality Checks

## Your Mission

A dashboard PR asks for approval using a screenshot and an average score. The dashboard loads slowly, an icon button has no accessible name, and the evidence does not justify the release recommendation.

Your challenge is to fix the defects and prepare a PR whose decision is supported by current browser measurements. One bad run must block release even when other runs pass. Evidence must cover the final code changes.

Use the **[verification-before-completion skill](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** before claiming the PR meets its quality budgets.

The duration for this challenge is 75 min or less after setup; audits may take longer.

## Project

[browser-quality-app](./browser-quality-app) contains the dashboard and capture harness. Use the [quality requirements](./docs/quality-gate-brief.md), [gate contract](./docs/gate-cli-contract.md), and supplied description and reviewer comment in the [PR review brief](./docs/pr-review-brief.md).

This exercise is standalone. Baseline examples are reference data, not measurements from your machine.

## How To Go About It

1. Inspect the draft, startup delay, button, and reports. Record unsupported claims and measurement gaps in `evidence/before.md`.
2. Fix the defects without changing dashboard behavior.
3. Configure three production-build Lighthouse runs and create the gate. Decide using the lowest scores, highest loading time, and every axe violation.
4. Commit the implementation and capture raw Lighthouse and axe reports from that commit.
5. Prove that one deliberately failing Lighthouse result and one accessibility violation each block release.
6. Write `evidence/pr-summary.md` with a corrected title, evidence map, measured decision, and remaining manual checks. Answer the reviewer in `evidence/review-response.md`. Record `evidence/after.md` and `evidence/comparison.md`, then open the focused PR after verification.

## Evidence

Submit the fixes, configuration, gate, raw reports, generated quality report, corrected PR description, reviewer response, and `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`.

Include actual skill use, source citations, sealed evidence, and captured output. Follow the [setup and verification instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `browser-quality-app/` before opening the PR. Regenerate proof and update its description after any source change.

## Completion Criteria

The PR links current reports to the measured commit, build, route, and browser. All runs meet the budgets; both failure controls block release. The reviewer response explains the decision and remaining accessibility checks without unsupported comparisons. Local verification passes. Approval and merging are not required.
