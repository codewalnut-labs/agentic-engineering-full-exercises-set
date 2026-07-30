# Review Gauntlet Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reproduce, detect, patch, and verify the three confirmed blockers in `pr/review-target.diff`.

**Architecture:** Semgrep rules detect unsafe React rendering and non-semantic clickable containers. React component tests exercise safe note preview, keyboard-operable queue selection, explicit status submission, and note validation. Review evidence separates fixed blockers from dismissed or deferred observations.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, Semgrep.

## Global Constraints

- Reviewer-entered notes are untrusted text.
- Queue selection remains a native button interaction.
- Notes never override explicit workflow status.
- Run one final `npm run agent:check` after focused regressions pass.

---

### Task 1: Reproduce and statically detect the generated risks

**Files:**
- Create: `review-gauntlet-app/semgrep.yml`
- Create: `evidence/static-check-before.txt`

- [ ] Apply `pr/review-target.diff` to the app.
- [ ] Add rules for `dangerouslySetInnerHTML` and clickable non-interactive containers.
- [ ] Run Semgrep and save the findings as pre-fix evidence.

### Task 2: Add regression tests and patch blockers

**Files:**
- Modify: `review-gauntlet-app/src/components/ActionComposer.tsx`
- Modify: `review-gauntlet-app/src/components/WorkQueue.tsx`
- Create: `review-gauntlet-app/src/components/ActionComposer.test.tsx`
- Create: `review-gauntlet-app/src/components/WorkQueue.test.tsx`
- Modify: `review-gauntlet-app/package.json`

- [ ] Write tests proving HTML is displayed as text, explicit status is submitted, short notes stay blocked, and queue rows are buttons.
- [ ] Run the focused tests and confirm they fail against the generated diff.
- [ ] Replace HTML interpretation with text rendering, remove status inference, restore validation, and restore native button semantics.
- [ ] Run the focused tests and confirm they pass.

### Task 3: Produce review evidence and verify

**Files:**
- Create: `docs/severity-ranked-findings.md`
- Create: `evidence/static-check-after.txt`
- Create: `evidence/verification-output.txt`

- [ ] Run Semgrep after the patch and capture zero project-rule findings.
- [ ] Record fix/defer/dismiss decisions and rationale.
- [ ] Run `npm run agent:check` once and capture the output.
- [ ] Perform one fresh scoped review of the final diff.
