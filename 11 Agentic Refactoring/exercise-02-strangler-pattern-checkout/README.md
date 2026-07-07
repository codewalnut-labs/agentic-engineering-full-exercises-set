**Exercise 02**

# Strangler Pattern Checkout

**Goal:** Replace one path of a tangled checkout workflow with a new module while preserving external behavior.

**Outcome:** One branch of a tangled checkout workflow is replaced safely behind an adapter or flag.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "11 Agentic Refactoring/exercise-02-strangler-pattern-checkout/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/checkout-legacy-map.md](./docs/checkout-legacy-map.md)

## Use These Practices

- [11. Agentic Refactoring practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#11-agentic-refactoring)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Characterize the existing checkout path with tests and sample outputs.
4. Build the new module behind an adapter, flag, or routing seam.
5. Compare old and new outputs for preserved cases.
6. Roll out only one branch of behavior, leaving the rest untouched.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- New checkout module and adapter/flag wiring.
- Comparison tests for old vs new behavior.
- Updated app behavior for the selected branch.
- Rollback and residual-risk evidence.

## Verify

Run at least:

```bash
cd "11 Agentic Refactoring/exercise-02-strangler-pattern-checkout/starter-react" && npm test
cd "11 Agentic Refactoring/exercise-02-strangler-pattern-checkout/starter-react" && npm run agent:check
```

Done when:
- old/new comparison
- adapter contract test
- flag rollback test
- golden screenshot/output
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
