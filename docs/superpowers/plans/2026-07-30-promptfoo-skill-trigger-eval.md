# Promptfoo Skill Trigger Eval Harness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a repeatable before/after Promptfoo gate for Agent Skill selection.

**Architecture:** A deterministic file provider loads versioned skill catalogs,
selects a skill, and returns a JSON contract. Promptfoo runs one shared case set
against both versions.

**Tech Stack:** Node.js, Promptfoo, YAML, Agent Skills

## Global Constraints

- Run without external API keys.
- Preserve baseline failures as evidence.
- Improve only the weakest skill description.

### Task 1: Selector contract

- [x] Write failing unit tests for release, incident, no-trigger, and schema behavior.
- [x] Implement the minimal deterministic selector and provider.

### Task 2: Promptfoo regression matrix

- [x] Add eight positive, negative, and ambiguous cases.
- [x] Run the v1 baseline and preserve its JSON result.
- [x] Improve the release-notes description and run v2.

### Task 3: Evidence and packaging

- [x] Package the improved description as `release-notes/SKILL.md`.
- [x] Record verification output and learner-facing commands.
