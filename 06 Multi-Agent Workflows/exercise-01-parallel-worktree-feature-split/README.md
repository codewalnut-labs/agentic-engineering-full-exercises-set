**Exercise 01**

# Parallel Worktree Feature Split

**Goal:** Split three independent improvements across worktrees or subagents and integrate them without overlapping file edits.

**Outcome:** Independent changes run in parallel lanes and integrate cleanly under one accountable owner.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/file-ownership-map.md](./docs/file-ownership-map.md)
- [docs/task-board.md](./docs/task-board.md)

From the repository root, open the main starter:

```bash
cd "06 Multi-Agent Workflows/exercise-01-parallel-worktree-feature-split/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [06. Multi-Agent Workflows practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#06-multi-agent-workflows)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: project purpose, domain behavior, important files, existing commands, risks, expected outputs, and likely files to change.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Three isolated change slices with ownership notes.
- Working integrated code in the starter.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- File ownership is clear enough for parallel agents to avoid overlap.
- Each lane has a short verification report.
- The merge-order simulation exposes conflicts before the final integration.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
