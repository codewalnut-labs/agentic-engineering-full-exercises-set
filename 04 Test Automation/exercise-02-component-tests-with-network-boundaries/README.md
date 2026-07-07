**Exercise 02**

# Component Tests With Network Boundaries

**Goal:** Backfill useful React component tests around loading, empty, error, and filtered states without coupling to implementation details.

**Outcome:** Component tests prove user-visible behavior while isolating flaky network boundaries.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "04 Test Automation/exercise-02-component-tests-with-network-boundaries/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/test-plan.md](./docs/test-plan.md)

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Add Testing Library tests for loading, empty, error, filtered, and successful states using user-facing queries.
4. Use MSW or equivalent mocks at the network boundary, not implementation internals.
5. Add a browser-level smoke or Playwright component flow using role locators and auto-waiting assertions.
6. Prove stability with repeated runs and trace/report settings for failures.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Component tests using user-facing queries.
- Network boundary mocks and fixtures.
- Code fixes required to make the UI testable and accessible.
- Test command evidence.

## Verify

Run at least:

```bash
cd "04 Test Automation/exercise-02-component-tests-with-network-boundaries/starter-react" && npm test
cd "04 Test Automation/exercise-02-component-tests-with-network-boundaries/starter-react" && npm run agent:check
```

Done when:
- Testing Library tests
- MSW network boundary
- role locator browser smoke
- repeated stability run
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
