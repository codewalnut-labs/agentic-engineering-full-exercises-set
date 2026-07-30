# Parallel Worktree Feature Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement the independent tasks.

**Goal:** Integrate three independently verified UI improvements from isolated worktrees.

**Architecture:** Three agents own disjoint component/test pairs. The primary
agent owns shared wiring, dependency scripts, evidence, and integration.

**Tech Stack:** Git worktrees, React, TypeScript, Vitest, Vite

## Global Constraints

- No lane may edit `App.tsx`, `package.json`, documentation, or another lane's files.
- Each lane must commit its focused change and record its verification command.
- The integration owner runs the complete gate after all cherry-picks.

### Task 1: Filter reset lane

- [ ] Add a reset button to `FilterBar` and a focused rendering test.
- [ ] Commit on `lane/filter-reset`.

### Task 2: Due-label lane

- [ ] Add consistent Today/1 day/N days presentation and focused tests.
- [ ] Commit on `lane/due-label`.

### Task 3: Activity lane

- [ ] Add an empty state and semantic time rendering with focused tests.
- [ ] Commit on `lane/activity-empty-state`.

### Task 4: Integration

- [ ] Cherry-pick all lane commits, wire the dashboard, and add the shared test gate.
- [ ] Capture ownership, worktree, merge-order, and final verification evidence.
