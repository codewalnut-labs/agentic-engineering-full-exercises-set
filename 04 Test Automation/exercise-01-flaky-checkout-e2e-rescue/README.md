**Exercise 01**

# Flaky Checkout E2E Rescue

**Goal:** Replace brittle checkout tests with a reliable Playwright suite that uses user-facing locators and web-first assertions.

**Outcome:** The checkout suite becomes trustworthy enough to protect a refactor.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- [Matt Pocock skills](https://github.com/mattpocock/skills) - install `diagnosing-bugs`
- [Diagnosing bugs skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs)
- [Playwright best practices](https://playwright.dev/docs/best-practices)
- [Playwright locators](https://playwright.dev/docs/locators)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public debugging skill first. Run `npx skills@latest add mattpocock/skills`, select `diagnosing-bugs`, and run `/setup-matt-pocock-skills` if your agent installed it. If your tool cannot install skills, use the linked skill file as the workflow.
2. Ask your coding agent to invoke `/diagnosing-bugs` while inspecting `docs/flaky-test-notes.md`, existing checkout tests, and the UI accessibility tree before rewriting anything.
3. Review the flake diagnosis and classify each failure as locator brittleness, timing, shared state, test data, or product bug.
4. Have the agent replace brittle selectors with role or label locators and web-first assertions for the checkout happy path and failure path.
5. Remove fixed sleeps and shared mutable test state; add deterministic setup for cart, payment, and confirmation state.
6. Ask the agent to run or document a repeated-run strategy that would expose the old flake and validate the new suite.
7. Review traces or failure artifacts and keep only evidence that helps debug future regressions.

## Deliver

- Refactored Playwright checkout tests using user-facing locators.
- Flake diagnosis table with root cause and fix for each unstable test.
- Repeat-run or trace evidence for the rescued checkout flow.
- Evidence note explaining what was removed because it was brittle.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Tests use role, text, label, or test id locators deliberately, with roles preferred where possible.
- Assertions wait for user-visible state instead of sleeping.
- The checkout suite can run repeatedly without depending on order or previous state.
- A future failure would leave enough trace or log evidence to debug quickly.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
