**Exercise 01**

# Flaky Checkout E2E Rescue

**Goal:** Replace brittle checkout tests with a reliable Playwright suite that uses user-facing locators and web-first assertions.

**Outcome:** The checkout suite becomes trustworthy enough to protect a refactor.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "04 Test Automation/exercise-01-flaky-checkout-e2e-rescue/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/flaky-test-notes.md](./docs/flaky-test-notes.md)

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Replace brittle selectors and fixed waits with role locators and web-first assertions.
4. Mock payment, tax, clock, or third-party boundaries without mocking away checkout behavior.
5. Make every test independent and parallel-safe.
6. Run repeated local passes and preserve traces or reports for failures.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Playwright tests for the main checkout flows.
- Deterministic mocks and fixtures.
- Any app accessibility/testability fixes required for role locators.
- Repeated-run evidence and trace/report configuration.

## Verify

Run at least:

```bash
cd "04 Test Automation/exercise-01-flaky-checkout-e2e-rescue/starter-react" && npm test
cd "04 Test Automation/exercise-01-flaky-checkout-e2e-rescue/starter-react" && npm run agent:check
```

Done when:
- role locator audit
- parallel repeat run
- trace capture
- payment boundary fixture
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
