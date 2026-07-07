**Exercise 01**

# Characterization Test Refactor

**Goal:** Capture existing behavior around a messy rules module before refactoring it into clearer pieces.

**Outcome:** Legacy behavior is characterized before structure changes, then refactored in small green steps.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "11 Agentic Refactoring/exercise-01-characterization-test-refactor/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/legacy-behavior-notes.md](./docs/legacy-behavior-notes.md)

## Use These Practices

- [11. Agentic Refactoring practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#11-agentic-refactoring)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Generate a behavior spec from the current code and mark preserve/change/bug categories.
4. Add characterization tests that pass against the current behavior.
5. Refactor the messy module without changing preserved behavior.
6. Keep the suite green after each logical step.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Characterization tests.
- Refactored production code.
- Behavior category notes tied to tests.
- Before/after verification evidence.

## Verify

Run at least:

```bash
cd "11 Agentic Refactoring/exercise-01-characterization-test-refactor/starter-react" && npm test
cd "11 Agentic Refactoring/exercise-01-characterization-test-refactor/starter-react" && npm run agent:check
```

Done when:
- green baseline
- golden case tests
- preserve/change/bug table
- stepwise refactor proof
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
