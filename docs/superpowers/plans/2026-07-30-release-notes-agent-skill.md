# Release Notes Agent Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and exercise a deterministic release-notes Agent Skill.

**Architecture:** A concise `SKILL.md` delegates extraction and verification to
repository-local Node scripts. A JSON fixture models the diff and evidence;
generated Markdown and verification notes provide reviewable evidence.

**Tech Stack:** Agent Skills Markdown, Node.js ES modules, JSON fixtures.

## Global Constraints

- Keep the workflow runnable without new runtime dependencies.
- Do not publish customer-facing items without verification evidence.
- Elevate breaking changes and exclude internal-only refactors.

---

### Task 1: Package the reusable skill

**Files:**
- Modify: `.agents/skills/release-notes-skill-factory/SKILL.md`
- Modify: `.agents/skills/release-notes-skill-factory/references/release-note-taxonomy.md`
- Create: `.agents/skills/release-notes-skill-factory/fixtures/release-changes.json`

**Interfaces:**
- Consumes: structured release change records.
- Produces: instructions and fixture schema used by the generator.

- [ ] Replace exercise-only triggering text with reusable release-note triggers.
- [ ] Define evidence, grouping, breaking-change, and publication rules.
- [ ] Add a fixture that covers publishable, internal, breaking, and blocked work.

### Task 2: Generate and verify release notes

**Files:**
- Create: `.agents/skills/release-notes-skill-factory/scripts/generate-release-notes.mjs`
- Create: `.agents/skills/release-notes-skill-factory/scripts/verify-release-notes.mjs`
- Modify: `release-notes-app/package.json`

**Interfaces:**
- Consumes: fixture JSON and trigger cases.
- Produces: deterministic release-note Markdown and verification status.

- [ ] Implement deterministic grouping and publication blocking.
- [ ] Verify fixture coverage, output snapshot, and trigger behavior.
- [ ] Wire one generation command and one verification command into the app gate.

### Task 3: Produce exercise evidence

**Files:**
- Create: `evidence/RELEASE_NOTES.md`
- Create: `evidence/verification-notes.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: completed generator and verifier.
- Produces: reviewer-facing artifacts and run instructions.

- [ ] Generate notes from the fixture.
- [ ] Record the covered risks and verification command.
- [ ] Run the complete project gate once and commit the evidence.
