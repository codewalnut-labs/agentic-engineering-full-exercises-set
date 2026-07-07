# Exercise Matrix

## 01. Toolchain Setup

New sessions need almost no re-explaining, checks are discoverable, and sensitive tools or paths are guarded.

- Exercise 01: Reproducible Agent Workstation - Turn a fragile local setup into a repeatable agent-ready workstation that a new engineer can run in under 30 minutes.
- Exercise 02: Guardrailed CLI Workshop - Design the safety rails for an agent that can inspect code, run checks, and collect logs without touching secrets or destructive commands.
- Exercise 03: Agent Check Bootstrap - Turn a fragile manual setup into a repeatable agent-safe local gate with rules, hooks, allowed tools, and clear verification commands.

## 02. Spec Framing

The implementation starts from clear acceptance criteria, concrete examples, non-goals, and reviewable slices.

- Exercise 01: Ambiguous Bulk Refund Spec - Convert a vague product request for bulk refunds into a testable spec before touching the React implementation.
- Exercise 02: Contract-First Scheduling API - Frame the contract between a scheduling UI and a Spring Boot availability API before implementation begins.
- Exercise 03: Risk-First RBAC Design Doc - Create a design doc for role-based access without overbuilding permissions or leaving privacy risks implicit.
- Exercise 04: Grill-Me Decision Tree Spec - Use a grill-me style interview to turn a vague entitlement redesign into a testable implementation contract before coding.
- Exercise 05: PRD to Issues Vertical Slicer - Turn a messy growth experiment conversation into a PRD and independently grabbable vertical slice issues.

## 03. Context Engineering

Architecture, commands, conventions, and repeated corrections live in versioned project context, not only in chat.

- Exercise 01: Repo Context Pack for Bugfix Agents - Build a compact context layer so future bugfix agents understand ownership, commands, and safe inspection paths.
- Exercise 02: Token-Budgeted Feature Delivery - Implement a small UI change while staying inside a strict context budget and documenting every file included.
- Exercise 03: MCP Context Server for Product Data - Expose product rules and fixtures through a tiny TypeScript context server so agents stop pasting giant JSON into prompts.
- Exercise 04: Context-First NFR X-Ray - Build the context layer a fresh agent needs before it audits the production workflow portal. Use the audit to prove the context pack is useful, then fix the highest-value findings.
- Exercise 05: Graphify Knowledge Graph Lab - Create and verify a codebase knowledge graph before asking an agent to make a cross-cutting billing analytics change.
- Exercise 06: Intent Layer Repo Map - Add folder-level intent context so agents understand ownership, constraints, and traps before editing an incident workflow.

## 04. Test Automation

Tests fail for real regressions, use resilient locators, run independently, and produce debugging evidence.

- Exercise 01: Flaky Checkout E2E Rescue - Replace brittle checkout tests with a reliable Playwright suite that uses user-facing locators and web-first assertions.
- Exercise 02: Component Tests With Network Boundaries - Backfill useful React component tests around loading, empty, error, and filtered states without coupling to implementation details.
- Exercise 03: Spring Boot Integration Test Gate - Create an integration test gate for a React task board backed by a Spring Boot API whose persistence workflow mocks keep missing.
- Exercise 04: TDD Skill Red-Green Refactor - Use a TDD-style skill loop to implement invoice retry rules without letting the agent jump straight to a broad rewrite.

## 05. Skill Packaging

Repeated workflows become focused, versioned skills that trigger correctly and produce consistent output.

- Exercise 01: Review Checklist Skill Pack - Package a repeated code review checklist into a focused skill and use it against the provided React change.
- Exercise 02: Release Notes Skill Factory - Turn a messy release-note prompt into a reusable skill that reads changes, groups them, and flags missing evidence.
- Exercise 03: Migration Playbook Skill - Package a migration workflow for converting legacy components to typed React modules with tests and review notes.
- Exercise 04: Skill Trigger Eval Harness - Build an eval harness that scores whether team skills trigger, run the right steps, and produce the expected output shape.
- Exercise 05: Cross-Agent Skill Portability Pack - Package a compliance review workflow so it works cleanly across Codex, Claude Code, Cursor, Gemini CLI, and other skill-aware agents.

## 06. Multi-Agent Workflows

Independent tasks run side by side in isolated branches or worktrees, with the main thread owning integration.

- Exercise 01: Parallel Worktree Feature Split - Split three independent improvements across worktrees or subagents and integrate them without overlapping file edits.
- Exercise 02: Subagent NFR Swarm - Use specialist subagents for security, accessibility, performance, and testability review while one main thread owns the decision log.
- Exercise 03: Conflict-Tolerant Migration Board - Plan and execute a batched UI migration where agents must avoid editing shared foundations at the same time.
- Exercise 04: Kanban Triage Worktree Control Plane - Turn a noisy backlog into agent-ready cards, isolated worktrees, review queues, and integration ownership.

## 07. Docs & Diagrams

Decisions, diagrams, and non-obvious system behavior are recorded while context is fresh and verified against code.

- Exercise 01: ADR for Architecture Change - Write an ADR for moving workflow state out of React-only local state into a service boundary.
- Exercise 02: C4 and Sequence Diagram From Code - Reverse engineer the feature and create C4-style and sequence diagrams that match the actual code paths.
- Exercise 03: Runbook Drift Repair - Update stale support docs and diagrams after verifying how the current app actually handles incidents.
- Exercise 04: Workflow Diagram Reconstruction - Reverse engineer the feature workflow in the starter app and create diagrams that match the actual implementation, not the intended story in your head.
- Exercise 05: Codebase Graph to Diagrams - Convert a codebase graph snapshot into verified C4 and sequence diagrams, then use those diagrams to guide a safe change.
- Exercise 06: Excalidraw Diagram Generator Lab - Generate a valid editable Excalidraw workflow diagram, validate its JSON, and verify every important element against the starter app.

## 08. Evidence-led PRs

Reviewers see intent, checks, artifacts, risks, and rollback notes without reconstructing the work.

- Exercise 01: PR Evidence Pack Automation - Create a PR evidence pack that automatically gathers test output, build proof, screenshots, and residual risks.
- Exercise 02: Feature Flag Rollback Proof - Prove that a risky UI feature is gated, observable, and reversible before a reviewer sees the PR.
- Exercise 03: Performance and A11y Evidence Gate - Attach performance and accessibility evidence to a UI change so reviewers can judge risk quickly.

## 09. Code Review

Clean-looking code is checked for behavior, security, accessibility, performance, tests, and maintainability.

- Exercise 01: Security and A11y Review Gauntlet - Review a generated React change for security, accessibility, and behavioral regressions before approving it.
- Exercise 02: Diff Triage With Fresh Agent - Use a fresh review pass to find what the implementing agent missed, then decide which findings are merge blockers.
- Exercise 03: Review Regression Lab - Find subtle regressions in a large agent-written UI diff that appears clean at first glance.
- Exercise 04: PR Diff Review - Review the supplied PR diff in five focused minutes, then verify the agent's findings against the surrounding code before deciding what blocks merge.
- Exercise 05: Code Review Graph Skill - Use structural graph context to review a large agent-written discount change by call path, ownership, and risk.

## 10. Token Economics

Expensive context and reasoning are reserved for judgment-heavy work, while deterministic work moves to scripts, hooks, or smaller models.

- Exercise 01: Token Budget Refactor - Plan a refactor with a token budget, choosing context, model effort, and automation deliberately.
- Exercise 02: Context Cache Hygiene Challenge - Clean up stale instructions and oversized always-on context so future sessions stop rebilling irrelevant information.
- Exercise 03: Model Routing Cost Planner - Design a model and effort routing policy for a team using agents across planning, coding, reviews, and retros.
- Exercise 04: Ponytail Minimal-Diff Budget - Practice the Ponytail minimal-diff ladder on a design-system migration slice while preserving checks and safety exceptions.

## 11. Agentic Refactoring

Behavior is characterized before structure changes, and each refactor step leaves the suite green.

- Exercise 01: Characterization Test Refactor - Capture existing behavior around a messy rules module before refactoring it into clearer pieces.
- Exercise 02: Strangler Pattern Checkout - Replace one path of a tangled checkout workflow with a new module while preserving external behavior.
- Exercise 03: Legacy Rules Engine Untangle - Refactor a Spring Boot rules endpoint and React UI adapter without changing the contract clients depend on.

## 12. Agentic Retrospective

Repeated mistakes become rule, context, skill, or hook improvements, and waste trends down over time.

- Exercise 01: Session Waste Retro From Logs - Analyze provided agent session logs to find retry loops, redundant file reads, and context waste.
- Exercise 02: Rule Hardening From Repeated Mistakes - Turn repeated agent corrections into durable AGENTS.md rules, skills, or hooks with clear trigger criteria.
- Exercise 03: Skill and Hook Improvement Loop - Run a mini retro on a flawed team skill and hook setup, then revise both to reduce future rework.
- Exercise 04: Skill Optimizer From Traces - Analyze failed agent traces and turn repeated skill mistakes into a measured skill improvement, hook, or team rule.
