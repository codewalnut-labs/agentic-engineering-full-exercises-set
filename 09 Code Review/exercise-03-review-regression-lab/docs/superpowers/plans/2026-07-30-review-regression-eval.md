# Review Prompt Regression Eval Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and run a Promptfoo harness that proves an improved review prompt catches historical regressions without false positives.

**Architecture:** File-based prompts and diff fixtures feed a deterministic custom JavaScript provider. Promptfoo `contains` assertions score required finding IDs, and a summary script extracts per-prompt accuracy from JSON output.

**Tech Stack:** Promptfoo, Node.js ESM, YAML, React project verification.

## Global Constraints

- Evaluate baseline and improved prompts against identical cases.
- Include at least one clean negative/control diff.
- Provider detection must inspect prompt text and diff content, not case descriptions.
- Preserve raw Promptfoo JSON plus a concise score summary.

---

### Task 1: Add regression fixtures and baseline harness

- [ ] Create three bad-diff fixtures and one clean control.
- [ ] Create the baseline prompt and deterministic provider.
- [ ] Create Promptfoo configuration with explicit assertions.
- [ ] Run the baseline evaluation and record its score.

### Task 2: Improve only the review prompt

- [ ] Add explicit search, status/risk, hidden-work, and evidence requirements.
- [ ] Run the same evaluation cases with the improved prompt.
- [ ] Verify accuracy improves while the clean control remains passing.

### Task 3: Package evidence and verify

- [ ] Save raw before/after results and a human-readable score comparison.
- [ ] Document residual limitations and verification notes.
- [ ] Run `npm run agent:check` once.
- [ ] Request a final scoped review of the harness.
