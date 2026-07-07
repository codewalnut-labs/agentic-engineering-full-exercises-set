**Exercise 01**

# Flaky Checkout E2E Rescue

## Competency

04. Test Automation - Reliable E2E test generation

## Your Mission

Replace brittle checkout tests with a reliable Playwright suite that uses user-facing locators and web-first assertions.

## Starter Project

```text
04 Test Automation/exercise-01-flaky-checkout-e2e-rescue/starter-react
```

Run the React starter:

```bash
cd "04 Test Automation/exercise-01-flaky-checkout-e2e-rescue/starter-react"
npm install
npm run dev
```

## Lab Outcome

The checkout suite becomes trustworthy enough to protect a refactor.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Agents can write tests quickly; your job is to make those tests reliable.

Practice signals for this exercise:

- Test real user flows and behavior users notice.
- Use role-based locators rather than brittle CSS or XPath selectors.
- Make every test independent so suites run in parallel without cascading failures.
- Use auto-waiting assertions instead of fixed sleeps.

Common mistake to avoid: Flaky tests train teams to ignore red; green means little when the suite never fails for real regressions.

Mastery signal: Tests fail for regressions, stay green across repeated CI runs, and are trusted enough to refactor behind.

## Hands-On Scope

- Replace brittle selectors and fixed waits with role locators and web-first assertions.
- Mock payment, tax, clock, or third-party boundaries without mocking away checkout behavior.
- Make every test independent and parallel-safe.
- Run repeated local passes and preserve traces or reports for failures.

## Required Working Deliverables

- Playwright tests for the main checkout flows.
- Deterministic mocks and fixtures.
- Any app accessibility/testability fixes required for role locators.
- Repeated-run evidence and trace/report configuration.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Review Bar

Would you trust this suite before letting an agent refactor checkout?
