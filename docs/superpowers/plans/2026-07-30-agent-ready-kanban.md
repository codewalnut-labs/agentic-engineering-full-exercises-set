# Agent-Ready Kanban Control Plane Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development for the isolated implementation card.

**Goal:** Build an explicit Kanban control plane and complete ESC-120 safely.

**Architecture:** Documentation and UI encode the control plane. ESC-120 owns a
pure utility/test pair in a separate worktree; the main thread owns integration.

**Tech Stack:** Git worktrees, React, TypeScript, Vitest, Vite

## Global Constraints

- Only cards with reproduction, ownership, paths, commands, and acceptance can run.
- Shared schema and integration files belong to the main thread.
- One completed lane must be independently tested and cherry-picked.

### Task 1: Control-plane cards

- [x] Triage four incoming issues into explicit states.
- [x] Record ownership, collision rules, review gates, and merge order.

### Task 2: ESC-120 lane

- [ ] Implement typed inherited-severity resolution and focused tests.
- [ ] Commit only the owned utility/test pair.

### Task 3: Integration

- [ ] Cherry-pick the lane, update the UI/card state, and capture evidence.
- [ ] Run the complete project gate once.
