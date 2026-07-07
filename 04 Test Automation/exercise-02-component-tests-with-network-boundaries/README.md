**Exercise 02**

# Component Tests With Network Boundaries

## Competency

04. Test Automation - Reliable E2E test generation

## Your Mission

Backfill useful React component tests around loading, empty, error, and filtered states without coupling to implementation details.

## Starter Project

```text
04 Test Automation/exercise-02-component-tests-with-network-boundaries/starter-react
```

Run the React starter:

```bash
cd "04 Test Automation/exercise-02-component-tests-with-network-boundaries/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

Component tests prove user-visible behavior while isolating flaky network boundaries.

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

- Add Testing Library tests for loading, empty, error, filtered, and successful states using user-facing queries.
- Use MSW or equivalent mocks at the network boundary, not implementation internals.
- Add a browser-level smoke or Playwright component flow using role locators and auto-waiting assertions.
- Prove stability with repeated runs and trace/report settings for failures.

## Required Working Deliverables

- Component tests using user-facing queries.
- Network boundary mocks and fixtures.
- Code fixes required to make the UI testable and accessible.
- Test command evidence.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one senior owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Do the tests assert behavior a user or reviewer actually cares about?
