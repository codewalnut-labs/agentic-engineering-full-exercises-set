**Exercise 01**

# ADR for Architecture Change

**Goal:** Write an ADR for moving workflow state out of React-only local state into a service boundary.

**Outcome:** An architecture decision is implemented, tested, and documented while context is fresh.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "07 Docs & Diagrams/exercise-01-adr-for-architecture-change/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/adr-template.md](./docs/adr-template.md)
- [docs/architecture-change-brief.md](./docs/architecture-change-brief.md)

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Move workflow state or another meaningful boundary out of an overgrown component into a service/module.
4. Add tests proving the new boundary preserves behavior.
5. Write the ADR after implementation evidence exists, including alternatives and trade-offs.
6. Update a diagram only where it explains the non-obvious system change.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Implemented architecture change.
- Tests for the changed boundary.
- ADR tied to code and test evidence.
- Verified diagram or dependency map.

## Verify

Run at least:

```bash
cd "07 Docs & Diagrams/exercise-01-adr-for-architecture-change/starter-react" && npm test
cd "07 Docs & Diagrams/exercise-01-adr-for-architecture-change/starter-react" && npm run agent:check
```

Done when:
- boundary behavior test
- ADR completeness check
- diagram verification
- architecture smoke
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
