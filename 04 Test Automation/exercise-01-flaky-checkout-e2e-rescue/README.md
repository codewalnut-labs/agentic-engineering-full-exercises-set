**Exercise 01**

# Flaky Checkout E2E Rescue

**Goal:** Diagnose the flaky checkout flow and replace the brittle Playwright tests with reliable happy-path and failure-path E2E coverage.

**Outcome:** The checkout suite uses user-facing locators, deterministic setup, web-first assertions, and repeat-run evidence so it can protect future refactors.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/flaky-test-notes.md](./docs/flaky-test-notes.md)

From the repository root, open the main starter:

```bash
cd "04 Test Automation/exercise-01-flaky-checkout-e2e-rescue/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- [Matt Pocock skills](https://github.com/mattpocock/skills) - install `diagnosing-bugs`
- [Diagnosing bugs skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs)
- [Playwright best practices](https://playwright.dev/docs/best-practices)
- [Playwright locators](https://playwright.dev/docs/locators)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public debugging skill first. Run `npx skills@latest add mattpocock/skills`, select `diagnosing-bugs`, and run `/setup-matt-pocock-skills` if your agent installed it. If your tool cannot install skills, use the linked skill file as the workflow.
2. Ask your coding agent to invoke `/diagnosing-bugs` while inspecting `docs/flaky-test-notes.md`, the checkout tests, and the checkout UI accessibility tree before rewriting anything.
3. Review the diagnosis and classify each failure as locator brittleness, timing, shared state, test data, or product bug.
4. Have the agent replace brittle selectors with role or label locators and web-first assertions for checkout success, payment failure, and confirmation state.
5. Remove fixed sleeps and shared mutable state; add deterministic setup for cart, payment, and confirmation data.
6. Ask the agent to run or document a repeat-run strategy that would expose the old flake and validate the new suite.
7. Review traces or failure artifacts and keep only evidence that helps debug future checkout regressions.

## Deliver

- Refactored checkout Playwright tests for success and failure paths.
- Flake diagnosis table with root cause, fix, and old selector or timing issue.
- Repeat-run or trace evidence for the rescued checkout flow.
- Evidence note explaining removed brittle behavior, final command output, and remaining manual checks.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Checkout tests use role, text, label, or test id locators deliberately, with roles preferred where possible.
- Assertions wait for user-visible checkout state instead of sleeping.
- The suite can run repeatedly without depending on order or previous state.
- A future checkout failure leaves enough trace or log evidence to debug quickly.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
