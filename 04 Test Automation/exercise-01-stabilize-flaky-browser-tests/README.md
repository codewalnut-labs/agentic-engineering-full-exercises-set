# Exercise 01 : Stabilize Flaky Browser Tests

## Your Mission

Your team's checkout tests pass once and fail on the next run. Fixed waits, fragile selectors, and shared server state make a green result unreliable.

Your mission is to use **[Playwright MCP](https://github.com/microsoft/playwright-mcp)** to investigate the running checkout and turn its flaky tests into reliable automated coverage. Another engineer should be able to repeat the suite in parallel and trust what it proves.

The duration for this challenge is 60 min or less after dependencies, Chromium, and the MCP connection are ready.

## Project

[checkout-e2e-app](./checkout-e2e-app) supplies a working checkout, delayed tax calculation, a payment API fixture, and weak browser tests. The [checkout contract](./docs/checkout-contract.md) defines approval, decline, retry, duplicate submission, and request payloads.

This standalone challenge is about test reliability. Preserve application behavior and the API fixture while replacing the unreliable coverage.

## How To Go About It

1. Run the supplied smoke and repeated tests. Record the actual starting result and suspected reliability problems in `evidence/before.md`.
2. Use Playwright MCP to inspect the live checkout before editing tests. Capture readiness states, tax and authorization requests, approval, decline, and recovery.
3. Build independent tests using user-facing locators and observable readiness. Give every test its own server session and assert both the request contract and the visible result.
4. Prove a retry succeeds after a decline and a second submission during authorization sends no extra request. Map each requirement to a test and assertion.
5. Run the complete suite twenty times with two workers and zero retries. Inspect a passing trace, record the final result in `evidence/after.md`, and explain the changes in `evidence/comparison.md`.

## Evidence

Submit the repaired tests and fixtures, actual MCP session and observations, requirement-to-test mapping, captured baseline and final commands, repeated-run report, and a trace from the repaired suite.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `checkout-e2e-app/` before raising a focused PR.

## Completion Criteria

The tests cover the agreed behavior without fixed waits, generated-class selectors, hidden retries, or shared server state. The repeated parallel run passes, and MCP observations explain meaningful test decisions. Evidence distinguishes a test that happened to pass from coverage that checks the required behavior; repetition alone is not proof of complete coverage.
