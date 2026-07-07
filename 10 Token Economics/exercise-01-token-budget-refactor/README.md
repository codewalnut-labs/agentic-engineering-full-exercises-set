**Exercise 01**

# Token Budget Refactor

**Goal:** Plan a refactor with a token budget, choosing context, model effort, and automation deliberately.

**Outcome:** A refactor is planned and executed with expensive reasoning reserved for judgment-heavy work.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "10 Token Economics/exercise-01-token-budget-refactor/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/large-doc-pack.md](./docs/large-doc-pack.md)
- [docs/usage-log.md](./docs/usage-log.md)

## Use These Practices

- [10. Token Economics practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#10-token-economics)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Create a context and model/effort budget before touching code.
4. Move deterministic edits into a script or small helper where appropriate.
5. Implement the refactor and tests without loading unrelated files.
6. Compare planned vs actual context, commands, and verification effort.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Working refactor in the starter.
- Tests proving behavior.
- Context/model budget ledger.
- Automation for any repeated deterministic work.

## Verify

Run at least:

```bash
cd "10 Token Economics/exercise-01-token-budget-refactor/starter-react" && npm test
cd "10 Token Economics/exercise-01-token-budget-refactor/starter-react" && npm run agent:check
```

Done when:
- context manifest
- model routing log
- refactor test
- automation savings estimate
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
