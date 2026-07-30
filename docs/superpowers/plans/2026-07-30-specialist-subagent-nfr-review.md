# Specialist Subagent NFR Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development for independent review passes.

**Goal:** Produce four specialist reviews and implement the adjudicated top NFR fixes.

**Architecture:** Four read-only specialists write structured reports. The main
thread owns triage, test-first implementation, integrated verification, and the
residual-risk record.

**Tech Stack:** React, TypeScript, Vitest, Superpowers review workflow

## Global Constraints

- Specialists review only; they do not merge fixes.
- Every finding receives fix, defer, or dismiss status and evidence.
- Accessibility verification includes a keyboard-relevant assertion.
- Performance findings include a measurable verification method.

### Task 1: Specialist reviews

- [ ] Run security, accessibility, performance, and testability passes.
- [ ] Preserve each structured report.

### Task 2: Decision log

- [ ] Consolidate findings and assign fix/defer/dismiss with rationale.
- [ ] Select the smallest set of high-value fixes.

### Task 3: Test-first fixes

- [ ] Add failing coverage for each selected risk.
- [ ] Implement the minimal fixes and record results.

### Task 4: Integration evidence

- [ ] Run the complete project gate once.
- [ ] Record residual risk and post-fix specialist recheck.
