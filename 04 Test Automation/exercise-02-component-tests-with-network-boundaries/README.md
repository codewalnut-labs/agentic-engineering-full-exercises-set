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
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: current test behavior, flaky points, boundaries, fixtures, commands, and likely regression risks.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Component tests using user-facing queries.
- Network boundary mocks and fixtures.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Testing Library tests cover the important component states.
- MSW or equivalent mocks keep network behavior inside the test boundary.
- Browser smoke testing uses accessible role locators.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
