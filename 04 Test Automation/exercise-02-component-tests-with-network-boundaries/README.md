**Exercise 02**

# Component Tests With Network Boundaries

**Goal:** Backfill useful React component tests around loading, empty, error, and filtered states without coupling to implementation details.

**Outcome:** Component tests prove user-visible behavior while isolating flaky network boundaries.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/test-plan.md](./docs/test-plan.md)

From the repository root, open the main starter:

```bash
cd "04 Test Automation/exercise-02-component-tests-with-network-boundaries/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles)
- [Mock Service Worker docs](https://mswjs.io/docs/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/test-plan.md`, the data-fetching path, and visible UI states before choosing test cases.
2. Review the proposed cases and require each one to assert user-visible behavior rather than component internals.
3. Have the agent create network-boundary mocks for loading, empty, success, server error, and filtered data states.
4. Add component tests that drive the UI through roles, labels, and text while keeping API details inside the mock layer.
5. Ask the agent to include one regression case that would have passed with a mocked component but fails when network behavior is wrong.
6. Review the final tests for over-mocking, brittle timing, and assertions that only prove implementation details.

## Deliver

- React component tests for loading, empty, success, error, and filtered states.
- Network mock setup with realistic response bodies and failure codes.
- Test-plan update explaining why each boundary is mocked there.
- Evidence note showing which UI risks are covered and which remain manual.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Tests read like user behavior, not component implementation snapshots.
- Network responses are mocked at the boundary instead of replacing the component under test.
- Error and empty states are covered as deliberately as the happy path.
- A fresh agent can add one more state by following the test pattern.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
