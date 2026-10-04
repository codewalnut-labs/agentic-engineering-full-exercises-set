# Exercise 01 : Integrate Features Built by Parallel Agents

## Your Mission

Your team needs saved filters, a due-today risk indicator, and an evidence export. Three agents can build them at the same time, but two changes need shared types that no worker owns. Unchecked handoffs can leave you with passing individual changes and a broken integration.

Your mission is to coordinate isolated implementation, verify every handoff, and deliver all three features without overlapping edits or losing their history. Use **[dispatching-parallel-agents](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents)** and **[using-git-worktrees](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees)**.

The duration for this challenge is 75 min or less after setup; agent runs may take longer.

## Project

[parallel-feature-app](./parallel-feature-app) provides the starter and protected acceptance tests. The [task board](./docs/task-board.md), [ownership map](./docs/file-ownership-map.md), and [integration contract](./docs/integration-contract.md) define three independent implementation lanes and one integration owner.

A supplied handoff claims it is ready to merge. Check its claims against Git and captured output.

## How To Go About It

1. Record the starting commit, missing behavior, ownership boundaries, and initial checks in `evidence/before.md`.
2. Load the two skills. Give three fresh agents separate worktrees from the same base, bounded lane prompts, owned paths, and focused checks. Run the lanes concurrently and retain actual sessions.
3. Each agent adds a regression test, passes its lane check, commits only owned files, and returns a handoff. Shared types remain local until integration; workers request promotion instead of editing `src/types.ts`.
4. Verify the supplied handoff and all three real handoffs. Integrate accepted commits in B, A, C order with merges that preserve history, then promote the shared types once.
5. Check the combined behavior, retain the lane branches, and remove completed worktrees. Record the verified result in `evidence/after.md` and explain ownership, integration decisions, conflicts, and remaining risks in `evidence/comparison.md`.

## Evidence

Submit the implementation, lane-owned tests, handoffs, integration review, worktree captures, actual agent sessions, and focused command output. Preserve the branch history so a reviewer can inspect what each agent produced.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `parallel-feature-app/` before raising a focused PR.

## Completion Criteria

All three features work together. Each worker stays within its ownership boundary and passes its focused check independently. Git history preserves the reviewed lane content, ordered merges, and one shared-type integration. The unsupported handoff is rejected with proof. Session evidence shows concurrent work, final verification passes, and completed worktrees are cleaned up.
