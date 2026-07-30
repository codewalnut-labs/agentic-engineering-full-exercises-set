# jscodeshift Migration Playbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Package and prove one safe jscodeshift migration slice.

**Architecture:** A concise Agent Skill owns workflow guidance; a narrow
jscodeshift transform owns deterministic edits; fixtures and behavior tests
prove safety.

**Tech Stack:** Agent Skills, jscodeshift 17.4.0, React 19, Vitest, Node test.

## Global Constraints

- Process one explicitly named component in the first batch.
- Preserve visible and accessibility behavior.
- Stop before shared foundations, routing, global styles, or public API changes.

---

### Task 1: Package the skill and transform

**Files:**
- Modify: `.agents/skills/migration-playbook-skill/SKILL.md`
- Create: `.agents/skills/migration-playbook-skill/transforms/readonly-component-props.cjs`
- Create: `.agents/skills/migration-playbook-skill/fixtures/*.tsx`

- [ ] Define inventory, characterization, dry-run, apply, verify, and stop phases.
- [ ] Implement the explicit-interface readonly transform.
- [ ] Add changed and unchanged fixtures.

### Task 2: Prove and apply one slice

**Files:**
- Modify: `migration-playbook-app/src/components/PageHeader.tsx`
- Create: `migration-playbook-app/tests/codemod.test.mjs`
- Create: `migration-playbook-app/tests/PageHeader.test.tsx`

- [ ] Test expected output, idempotence, and unrelated input.
- [ ] Dry-run and apply the transform to `PageHeader.tsx`.
- [ ] Verify rendered content, controls, and ARIA behavior.

### Task 3: Capture evidence

**Files:**
- Modify: `docs/migration-notes.md`
- Create: `evidence/verification-output.txt`

- [ ] Record the applied boundary and stop condition.
- [ ] Run the complete project gate once.
- [ ] Commit the skill, migrated slice, tests, and evidence.
