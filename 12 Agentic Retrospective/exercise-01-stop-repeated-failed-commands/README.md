# Exercise 01 : Stop an Agent from Repeating Failed Commands

## Your Mission

An agent keeps rerunning the same failed command without investigating. Your team's session report also labels useful reads and first failures as waste, so it cannot explain what needs to change.

Your challenge is to fix the measurement, add an executable retry check, and show whether it prevents avoidable work while preserving final verification. Support your diagnosis with events from the supplied trace.

The duration for this challenge is 60 min or less.

## Project

[retry-policy-app](./retry-policy-app) contains a seeded analyzer. The [metric contract](./docs/metric-contract.md), [baseline events](./docs/session-events.json), and [retry contract](./docs/preflight-contract.md) define the problem.

The [replay brief](./tasks/policy-217-replay.md) describes a simulated task. Its original application is not included. This challenge stands alone; its replay demonstrates the policy in a controlled simulation.

## How To Go About It

1. Follow the [setup](./docs/setup.md). Use **systematic-debugging** to separate useful work from repeated failures and identify their root cause.
2. Correct the analyzer. A first read, a changed-file reread, and a diagnosed retry must remain useful work. Add tests for the distinctions.
3. Implement a retry check that blocks an identical failed command at the same revision until diagnosis or a workspace change.
4. Construct a fresh replay from the brief with the retry check applied. Derive both sets of metrics using the corrected analyzer and explain the remaining waste.
5. Capture checks and submit one focused PR with your retrospective and evidence.

## Evidence

Submit the analyzer, retry policy, tests, raw replay events, generated metrics, and a short explanation linking the diagnosis to the change.

Include actual skill-use records, source citations, `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, and captured verification using the [evidence instructions and template](./docs/evidence-template.md).

Follow the repository [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

The challenge is complete when:

- Useful work is classified correctly and the retry policy passes its behavioral checks.
- The replay has zero unchanged failed-command retries and at least two fewer preventable calls.
- Final verification passes after the last write.
- The evidence clearly identifies the replay as simulated and `npm run verify:exercise` passes.
