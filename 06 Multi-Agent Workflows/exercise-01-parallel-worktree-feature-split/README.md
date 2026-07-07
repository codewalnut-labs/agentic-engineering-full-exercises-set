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
- [git worktree documentation](https://git-scm.com/docs/git-worktree)
- [GitHub pull request review docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/task-board.md`, `docs/file-ownership-map.md`, and the starter to identify three independent lanes with non-overlapping write sets.
2. Review the split and reject any lane that touches shared foundations without an explicit integration owner.
3. Have the agent create lane briefs with branch or worktree name, owned files, forbidden files, checks, and expected evidence.
4. Execute the lanes with separate agents, separate worktrees, or simulated lane folders, keeping the main thread responsible for integration.
5. Merge or reconcile lane results in the planned order and record conflicts, skipped changes, and verification per lane.
6. Run a clean-context integration review where a new agent reads the lane briefs and explains the merge order and risk.

## Deliver

- Three lane briefs with ownership, checks, and forbidden overlap.
- Implemented or simulated lane outputs with separate evidence notes.
- Integration log showing merge order, conflicts, and resolution decisions.
- Final evidence note proving the combined result works after integration.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- No two lanes claim the same source file unless the integration plan calls it out.
- Each lane can be reviewed like a small PR with its own checks and evidence.
- The main thread records integration decisions instead of silently accepting all agent output.
- A fresh agent can understand lane ownership and avoid conflicting edits.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
