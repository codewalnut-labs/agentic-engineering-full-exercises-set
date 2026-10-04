# Exercise 03 : Block a Release That Fails Browser Quality Checks

## Your Mission

A dashboard looks correct in a screenshot, but it loads slowly and an icon button has no name a screen reader can announce. The team has reports, yet nothing stops a release when one browser run fails.

Your challenge is to fix the defects and build a release check backed by actual browser reports. One bad run must block the release even when the other runs pass.

Use the **[verification-before-completion skill](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** to verify the raw results and failure behavior before writing the PR's release recommendation.

The duration for this challenge is 75 min or less after setup; browser audits may take longer.

## Project

[browser-quality-app](./browser-quality-app) contains the dashboard, browser capture harness, and supplied baseline examples. Use the [quality requirements](./docs/quality-gate-brief.md) and [gate output contract](./docs/gate-cli-contract.md).

This exercise is standalone. The baseline examples are reference data, not measurements from your machine.

## How To Go About It

1. Inspect the startup delay, icon action, and supplied reports. Record what is known and what still needs measurement in `evidence/before.md`.
2. Fix the delayed render and accessible name while preserving dashboard behavior.
3. Configure three Lighthouse runs against the production build and create the quality-gate command. Use the lowest performance and accessibility scores, the highest loading time, and every axe violation to decide whether release is allowed.
4. Commit the implementation. Capture three raw Lighthouse reports and one axe scan from that exact commit using the supplied browser harness.
5. Run the protected verification checks. Prove that one deliberately failing Lighthouse result and one injected accessibility violation each produce a failed decision and non-zero exit.
6. Write the reviewer summary. Record the final measurements in `evidence/after.md` and explain the change and measurement limits in `evidence/comparison.md`.

## Evidence

Submit the fixes, configuration, gate command, raw browser reports, generated quality report, reviewer summary, and `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`.

Include actual skill use, source citations, sealed evidence, and captured verification output. Follow the [setup and verification instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `browser-quality-app/` before raising a focused PR from your fork.

## Completion Criteria

All three runs meet the supplied budgets, axe reports zero violations, and both deliberate failure checks block release. Reports identify the same code version, production build, route, and browser environment. Reviewers can reproduce the decision and see remaining manual accessibility checks. Final verification passes.
