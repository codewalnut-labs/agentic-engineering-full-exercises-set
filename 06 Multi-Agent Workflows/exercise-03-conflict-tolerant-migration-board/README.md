**Exercise 03**

# Conflict-Tolerant Migration Board

**Goal:** Plan and execute a batched UI migration where agents must avoid editing shared foundations at the same time.

**Outcome:** A migration board prevents parallel agents from colliding on shared foundations.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "06 Multi-Agent Workflows/exercise-03-conflict-tolerant-migration-board/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/migration-board.md](./docs/migration-board.md)
- [docs/shared-foundation-risks.md](./docs/shared-foundation-risks.md)

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Create a migration board that assigns files, dependencies, and merge order.
4. Implement at least two migration slices in non-overlapping areas.
5. Add an integration check that detects shared-file edits or ordering mistakes.
6. Run final tests after merging slices.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Migration board with ownership and dependency rules.
- Two completed migration slices in code.
- Conflict detection script or checklist backed by actual file changes.
- Integration verification evidence.

## Verify

Run at least:

```bash
cd "06 Multi-Agent Workflows/exercise-03-conflict-tolerant-migration-board/starter-react" && npm test
cd "06 Multi-Agent Workflows/exercise-03-conflict-tolerant-migration-board/starter-react" && npm run agent:check
```

Done when:
- migration board validation
- overlap detector
- slice verification
- integration smoke
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
