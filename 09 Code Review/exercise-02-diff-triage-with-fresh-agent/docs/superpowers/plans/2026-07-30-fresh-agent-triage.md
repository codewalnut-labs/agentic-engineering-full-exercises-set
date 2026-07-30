# Fresh-Agent Diff Triage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reproduce, triage, fix, and verify the cache/state blockers in the supplied implementation diff.

**Architecture:** A small workflow-cache module owns validation, immutable ordering, and write-through persistence. The API consumes that module; React filter effects do not mutate persistence.

**Tech Stack:** React 19, TypeScript, Vitest, jsdom.

## Global Constraints

- Do not mutate `workItems`.
- Do not erase workflow persistence when filters change.
- Cache reads must tolerate malformed and invalid JSON.
- Saves update both the returned item and cache.
- Evidence collection is read-only.

---

### Task 1: Fresh review and triage

- [ ] Give a fresh agent the target diff, base/head context, and surrounding code.
- [ ] Verify each finding manually and classify it as fix, defer, or dismiss.
- [ ] Save the review report with exact file references and impact.

### Task 2: Regression coverage

**Files:**
- Create: `fresh-review-app/src/services/workflowApi.test.ts`
- Modify: `fresh-review-app/package.json`
- Create: `fresh-review-app/vitest.config.ts`

- [ ] Test immutable fetch ordering, malformed-cache fallback, cache write-through on save, and read-only evidence collection.
- [ ] Apply the supplied diff and run the focused suite to confirm the accepted blockers fail.

### Task 3: Blocker fixes

**Files:**
- Create: `fresh-review-app/src/services/workflowCache.ts`
- Modify: `fresh-review-app/src/services/workflowApi.ts`
- Modify: `fresh-review-app/src/App.tsx`

- [ ] Implement validated cache reads and immutable fallback sorting.
- [ ] Persist the updated collection after save.
- [ ] Remove filter-triggered cache deletion and evidence-triggered fixture writes.
- [ ] Run the focused suite to confirm it passes.

### Task 4: Evidence and final verification

- [ ] Record red/green output and the final triage table.
- [ ] Run `npm run agent:check` once.
- [ ] Request a fresh re-review of the final diff.
