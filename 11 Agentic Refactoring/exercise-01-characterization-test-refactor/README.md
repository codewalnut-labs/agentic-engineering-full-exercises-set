**Exercise 01**

# Characterization Test Refactor

**Goal:** Characterize the messy rules module, then refactor it into clearer decision, validation, scoring, and formatting pieces without changing preserved behavior.

**Outcome:** Must-preserve behavior is locked by tests before refactoring, and every refactor step stays green.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [11. Agentic Refactoring practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#11-agentic-refactoring)
- [Characterization tests by Michael Feathers](https://michaelfeathers.silvrback.com/characterization-testing)
- [Refactoring catalog by Martin Fowler](https://refactoring.com/catalog/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/legacy-behavior-notes.md`, existing tests, and the messy rules module, then list current behaviors before suggesting structure changes.
2. Review the list and classify each behavior as must preserve, intentionally change, suspected bug, or unknown.
3. Write characterization tests for must-preserve and suspected-bug cases, then get a green baseline.
4. Refactor in one small step at a time, keeping I/O, validation, scoring, and UI formatting changes separate.
5. Run the characterization suite after each step and update the preserve/change/bug table only when evidence changes.
6. Capture before/after verification output.
7. Run a clean-context review where a new agent compares final code to the behavior table without seeing the original refactor plan.

## Deliver

- Preserve, intentionally-change, suspected-bug, and unknown behavior table.
- Characterization tests proving the green baseline.
- Refactored rules code with behavior-preserving step notes.
- Evidence note showing test results after each refactor step and final command output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- A green characterization baseline exists before structural changes begin.
- Refactor steps stay small enough to explain and revert.
- Must-preserve behavior has tests or explicit manual evidence.
- A fresh agent can compare the final code to the behavior table and understand what changed intentionally.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
