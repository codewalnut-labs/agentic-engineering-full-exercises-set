**Exercise 04**

# Ponytail Minimal-Diff Budget

**Goal:** Use the Ponytail ladder to finish a design-system migration slice with the smallest safe diff: skip what is not needed, reuse what exists, prefer platform features, and write new code only after the cheaper rungs fail.

**Outcome:** A migration task ships with less new code, less context churn, and no hidden loss of validation, accessibility, or error handling.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "10 Token Economics/exercise-04-ponytail-minimal-diff-budget/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/ponytail-ladder-ledger.md](./docs/ponytail-ladder-ledger.md)
- [docs/session-transcript.md](./docs/session-transcript.md)

## Use These Practices

- [10. Token Economics practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#10-token-economics)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `Ponytail minimal-diff ladder`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)
- [Ponytail skill](https://github.com/DietrichGebert/ponytail)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Audit the session transcript and starter code for overbuilt migration ideas.
4. Create a Ponytail ladder ledger showing which rung was accepted or rejected for each proposed change.
5. Implement one design-system migration task by deleting, reusing, or using native behavior before adding new code.
6. Add the smallest check that would fail if the chosen shortcut broke behavior.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Ponytail ladder ledger with accepted and rejected rungs.
- Working React migration slice.
- One focused runnable check for non-trivial logic.
- Short impact note comparing avoided code, changed files, commands, and residual risks.

## Verify

Run at least:

```bash
cd "10 Token Economics/exercise-04-ponytail-minimal-diff-budget/starter-react" && npm test
cd "10 Token Economics/exercise-04-ponytail-minimal-diff-budget/starter-react" && npm run agent:check
```

Done when:
- Ladder ledger proves skip/reuse/platform/dependency options were considered before new code.
- Final diff changes fewer files than the overbuilt starter plan while preserving required behavior.
- Safety exceptions are explicit for validation, accessibility, error handling, and data-loss protection.
- One focused check proves the implemented migration slice.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
