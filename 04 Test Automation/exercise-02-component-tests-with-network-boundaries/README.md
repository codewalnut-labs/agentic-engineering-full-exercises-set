**Exercise 02**

# Component Tests With Network Boundaries

**Goal:** Add React component tests for the starter dashboard's loading, empty, success, error, and filtered states while mocking only the network boundary.

**Outcome:** User-visible dashboard behavior is protected by Testing Library tests and realistic MSW or equivalent network responses.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [04. Test Automation practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#04-test-automation)
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles)
- [Mock Service Worker docs](https://mswjs.io/docs/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/test-plan.md`, the data-fetching path, and the visible dashboard states before choosing test cases.
2. Review the proposed cases and require each one to assert user-visible behavior instead of component internals.
3. Have the agent create network-boundary mocks for loading, empty, success, server error, and filtered data responses.
4. Add component tests that drive the UI through roles, labels, and text while keeping API details inside the mock layer.
5. Include one regression case that would pass if the component were mocked but fail when the network response shape is wrong.
6. Run the component tests and fix brittle timing or over-mocking.
7. Review the final test names and assertions so a future agent can add another network state by copying the pattern.

## Deliver

- Component tests for dashboard loading, empty, success, server error, and filtered states.
- Network mock setup with realistic response bodies, latency or loading behavior, and failure codes.
- Test-plan update explaining why the network boundary is mocked there.
- Evidence note showing covered UI risks, final command output, and remaining manual risks.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Tests read like user behavior, not component implementation snapshots.
- Network responses are mocked at the boundary instead of replacing the component under test.
- Error, empty, loading, success, and filtered states are all covered deliberately.
- A fresh agent can add one more network state by following the test pattern.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
