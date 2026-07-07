**Exercise 01**

# Parallel Worktree Feature Split

**Goal:** Split three independent improvements across worktrees or subagents and integrate them without overlapping file edits.

**Outcome:** Independent changes run in parallel lanes and integrate cleanly under one accountable owner.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "06 Multi-Agent Workflows/exercise-01-parallel-worktree-feature-split/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/file-ownership-map.md](./docs/file-ownership-map.md)
- [docs/task-board.md](./docs/task-board.md)

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Split the requested work into three non-overlapping slices with explicit file ownership.
4. Use separate branches/worktrees or simulated agent lanes for implementation.
5. Integrate results deliberately, resolving conflicts instead of hiding them.
6. Run the full verification gate after integration.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Three isolated change slices with ownership notes.
- Working integrated code in the starter.
- Conflict/risk log and final verification output.
- Main-thread integration summary.

## Verify

Run at least:

```bash
cd "06 Multi-Agent Workflows/exercise-01-parallel-worktree-feature-split/starter-react" && npm test
cd "06 Multi-Agent Workflows/exercise-01-parallel-worktree-feature-split/starter-react" && npm run agent:check
```

Done when:
- file ownership audit
- lane verification reports
- merge-order simulation
- final integration check
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
