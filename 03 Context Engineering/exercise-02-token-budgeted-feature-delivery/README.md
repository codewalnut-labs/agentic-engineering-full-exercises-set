**Exercise 02**

# Token-Budgeted Feature Delivery

**Goal:** Implement a small UI change while staying inside a strict context budget and documenting every file included.

**Outcome:** A feature ships under an explicit context budget, with the agent reading the right files and no more.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "03 Context Engineering/exercise-02-token-budgeted-feature-delivery/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/long-architecture-notes.md](./docs/long-architecture-notes.md)
- [docs/token-budget-worksheet.md](./docs/token-budget-worksheet.md)

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Create a project context file with overview, module map, ownership, commands, conventions, and do-not-touch areas.
4. Implement the requested UI behavior using only files justified by that context layer.
5. Keep task state in a session-readable spec/plan/scratchpad so a fresh agent can resume after compaction.
6. Add tests for the changed behavior and update context when the agent misses a project rule.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Working feature change in the starter.
- Focused tests for the feature.
- Context manifest and budget check.
- Evidence that build/typecheck/tests pass.

## Verify

Run at least:

```bash
cd "03 Context Engineering/exercise-02-token-budgeted-feature-delivery/starter-react" && npm test
cd "03 Context Engineering/exercise-02-token-budgeted-feature-delivery/starter-react" && npm run agent:check
```

Done when:
- context file check
- repo-map coverage check
- feature test
- context budget check
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
