# Exercise 02 : Repair Broken UI States with Test-First Development

## Your Mission

Your team's dashboard has a passing test, yet users cannot tell when data is loading, see the wrong empty message, and cannot recover after a failed request.

Your mission is to use the **[TDD skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd)** to repair these behaviors through separate failing-test and passing-test cycles. The resulting tests must observe the interface and its network boundary.

The duration for this challenge is 60 min or less after dependencies and the agent skill are ready.

## Project

[case-dashboard-app](./case-dashboard-app) contains the dashboard, a weak happy-path test, MSW request handlers, and protected acceptance tests. Its [network contract](./docs/network-contract.md) defines loading, success, server-empty, filtered-empty, request error, and retry recovery.

This standalone challenge supplies its own requirements. Repair the dashboard and test setup while preserving those requirements and the acceptance tests.

## How To Go About It

1. Run the weak test and acceptance checks. Record what passes, what fails, and what the weak test misses in `evidence/before.md`.
2. Load the TDD skill and confirm the agreed test boundary: the rendered dashboard and `GET /api/cases`, intercepted with MSW.
3. Complete one red-green cycle for loading, then filtered-empty, then retry. Capture a learner-written test failing on the missing behavior before changing production code, then capture the same test passing after the fix.
4. Add independent tests for success, server-empty, and request error. Make unexpected requests fail and reset runtime handlers after every test. Prove filtering makes no new request and Retry makes exactly one.
5. Run acceptance checks and the full suite in shuffled orders. Review the tests for behavior coverage, record the final result in `evidence/after.md`, and explain the changes in `evidence/comparison.md`.

## Evidence

Submit the repaired dashboard, strict MSW setup, learner-written tests, actual skill-use session, three recorded red-green cycles, coverage mapping, and captured baseline and final results.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `case-dashboard-app/` before raising a focused PR.

## Completion Criteria

All six states behave as specified and have independent tests through the real request boundary. Each required regression fails before its production fix and passes afterward. The suite remains stable in shuffled orders, with strict request handling and no mocks of fetch, React state, or component internals. Another engineer can inspect the recorded cycles and reproduce the final checks.
