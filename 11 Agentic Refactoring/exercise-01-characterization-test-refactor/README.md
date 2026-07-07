**Exercise 01**

# Characterization Test Refactor

**Goal:** Capture existing behavior around a messy rules module before refactoring it into clearer pieces.

**Outcome:** Legacy behavior is characterized before structure changes, then refactored in small green steps.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/legacy-behavior-notes.md](./docs/legacy-behavior-notes.md)

From the repository root, open the main starter:

```bash
cd "11 Agentic Refactoring/exercise-01-characterization-test-refactor/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [11. Agentic Refactoring practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#11-agentic-refactoring)
- [Characterization tests by Michael Feathers](https://michaelfeathers.silvrback.com/characterization-testing)
- [Refactoring catalog by Martin Fowler](https://refactoring.com/catalog/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/legacy-behavior-notes.md`, existing tests, and the messy rules module, then list current behaviors before suggesting structure changes.
2. Review the list and classify each behavior as must preserve, intentionally change, suspected bug, or unknown.
3. Have the agent write characterization tests for the must-preserve and suspected-bug cases and get a green baseline.
4. Refactor in one small step at a time, keeping I/O, validation, scoring, and UI formatting changes separate.
5. Ask the agent to run the characterization suite after each step and update the preserve/change/bug table only when evidence changes.
6. Run a clean-context review where a new agent compares before and after behavior without seeing the original refactor plan.

## Deliver

- Preserve, change, bug, and unknown behavior table.
- Characterization tests proving the green baseline.
- Refactored rules code with behavior-preserving commits or notes.
- Evidence note showing test results after each refactor step.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- A green characterization baseline exists before structural changes begin.
- Refactor steps stay small enough to explain and revert.
- Must-preserve behavior has tests or explicit manual evidence.
- A fresh agent can compare the final code to the behavior table and understand what changed intentionally.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
