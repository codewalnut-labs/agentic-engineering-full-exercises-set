# Competency Practice Guide

This guide captures the 12 agentic engineering competencies used by the exercise set. It is written as a working curriculum reference: definition, practice behaviors, common mistake, and mastery signal.

## 01. Toolchain Setup

Set up the agent like a new teammate: house rules, guardrails, and only the keys it needs.

### In Practice

- Write tight AGENTS.md or CLAUDE.md project rules with scripts, conventions, and forbidden paths.
- Keep always-on rules lean and split deep workflow detail into skills.
- Run in safe auto mode with approval on risky operations.
- Add deny rules and PreToolUse-style hooks for secrets, destructive commands, and unsafe paths.
- Wire only the CLIs and MCP servers needed for the task.
- Codify repeated corrections back into durable rules.

### Common Mistake

YOLO mode can leak secrets, damage branches, or let a stray command do real harm.

### Mastery Signal

New sessions need little re-explaining, checks run without prompting, and the agent never reaches for tools or paths it was not granted.


## 02. Spec Framing

Do not hand the agent a vague ticket. Hand it a contract it can test.

### In Practice

- Have the agent interview the ticket for gaps, assumptions, and product questions before code planning.
- Decompose work into PR-sized chunks that are independent, testable, and reviewable.
- Write acceptance criteria with expected behavior, boundaries, failure states, and done conditions.
- Include concrete inputs, outputs, UI states, API responses, and error messages.
- Brainstorm edge cases around limits, auth, concurrency, and failures before implementation.
- Add non-goals so the agent stops guessing at scope.
- Keep the spec as a file the agent reads each session.

### Common Mistake

A spec the agent cannot test is not useful; vague improvement language invites invention.

### Mastery Signal

The first diff matches intent, acceptance criteria are clear, and each chunk can merge on its own.


## 03. Context Engineering

Build the project context layer the agent needs before it starts changing code.

### In Practice

- Create a project context file with overview, architecture, module map, commands, conventions, and do-not-touch areas.
- Keep always-on rules lean while linking deeper architecture, domain, API, data-flow, and ADR references.
- Write a repo map covering owners, entry points, test locations, and common change paths.
- Capture project-specific rules for naming, errors, logging, auth, flags, migrations, and deployment checks.
- Keep task state in spec, plan, todo, or scratchpad files so it survives compaction and handoff.
- Refresh context when the agent repeats a mistake or misses a project rule.

### Common Mistake

Architecture and rules kept only in chat make every session start from zero.

### Mastery Signal

New sessions understand the repo shape, durable context replaces repeated corrections, and architecture lives in versioned files.


## 04. Test Automation

Agents can write tests quickly; your job is to make those tests reliable.

### In Practice

- Test real user flows and behavior users notice.
- Use role-based locators rather than brittle CSS or XPath selectors.
- Make every test independent so suites run in parallel without cascading failures.
- Use auto-waiting assertions instead of fixed sleeps.
- Record then refine generated tests into maintainable suites.
- Mock flaky boundaries like third-party APIs, payments, and clocks without mocking away the behavior under test.

### Common Mistake

Flaky tests train teams to ignore red; green means little when the suite never fails for real regressions.

### Mastery Signal

Tests fail for regressions, stay green across repeated CI runs, and are trusted enough to refactor behind.


## 05. Skill Packaging

If a workflow works, package it once so the whole team can use it.

### In Practice

- Notice repeated prompts and turn them into focused skills.
- Write a SKILL.md with a precise use-when description that can trigger correctly.
- Keep the skill body lean and push long detail into references.
- Include when-to-use, when-not-to-use, and a concrete example.
- Ship team skills in the repo so they version with the codebase.
- Refine skills as real sessions reveal gaps.

### Common Mistake

A vague description means the agent never loads the skill or loads it at the wrong time.

### Mastery Signal

The agent invokes the right skill on its own and teammates get consistent workflow output across machines.


## 06. Multi-Agent Workflows

Run independent work in parallel, with each agent in its own lane.

### In Practice

- Split work into isolated tasks before parallelizing.
- Give independent tasks separate worktrees and branches.
- Treat each agent result like a separate PR: review, test, and merge deliberately.
- Use subagents for focused search, repo review, research, and NFR checks inside one main task.
- Keep the main thread accountable for the plan, integration, and final diff.
- Limit parallelism to what you can actually review.

### Common Mistake

Parallel agents editing overlapping files do not go faster; they create conflict cleanup.

### Mastery Signal

Independent work runs side by side, worktrees prevent collisions, and the senior owner integrates rather than babysits.


## 07. Docs & Diagrams

Use agents to capture decisions while the context is still fresh.

### In Practice

- Record decisions as ADRs with what, why, alternatives, and trade-offs.
- Generate flowcharts, sequence diagrams, state diagrams, and C4 diagrams from code.
- Make architecture-change ADRs part of normal PR flow.
- Verify generated diagrams against code before trusting them.
- Keep docs close to code so they are versioned and discoverable.
- Write for humans and the next agent, while avoiding self-evident over-documentation.

### Common Mistake

A generated diagram that is slightly wrong is worse than none because people trust it.

### Mastery Signal

The why behind decisions is committed, docs evolve with code, and newcomers or agents can onboard from the repo.


## 08. Evidence-led PRs

Do not ask reviewers to trust agent-written code. Put the proof in the PR.

### In Practice

- Treat quality gates as deliverables with commands, location, risk, and approval evidence.
- Write the PR so reviewers understand intent before reading the diff.
- Attach test results, coverage, screenshots, outputs, traces, and profiles where useful.
- Let CI produce evidence automatically while humans keep judgment calls.
- Climb the evidence ladder from pre-commit to CI and review.
- Confirm boundaries explicitly: no secrets, no PII, flags wired, rollback documented.
- Pass diffs and issue lists into review, not whole files.

### Common Mistake

A green checkmark without visible evidence still makes reviewers reconstruct the work.

### Mastery Signal

Reviewers stop asking whether it was tested, evidence is mostly automated, and merge confidence comes from proof.


## 09. Code Review

AI code can look clean and still be wrong. Review proves it is safe to merge.

### In Practice

- Review with a fresh agent or different model to catch what the implementer missed.
- Use specialist checks for security, accessibility, performance, and other NFRs when needed.
- Make NFRs explicit because agents often defer them unless asked.
- Read the diff yourself and be able to explain every meaningful change.
- Use review tools for conventions and structure as well as bugs.
- Triage findings into fix, defer, or dismiss with reasons, then re-review.

### Common Mistake

Looks right is the trap; clean-looking agent code is not the same as correct code.

### Mastery Signal

Fresh review adds signal, security and accessibility are explicit checks, and the owner can explain why the merge is safe.


## 10. Token Economics

Spend expensive tokens on judgment. Do not use them for routine edits.

### In Practice

- Use stronger models for planning, architecture, and review; use cheaper models for routine implementation.
- Match effort to task difficulty instead of defaulting to max effort.
- Keep always-on context small with lean rules, few skills, and only needed tools.
- Use one task per session and compact or resume from summaries to avoid rebilling stale context.
- Index repo context so the agent reads pointers before raw files.
- Do not churn the cache mid-task by changing model, effort, rules, or tools.
- Move repeated deterministic work into scripts or hooks.

### Common Mistake

Using the strongest model on simple edits spends expensive tokens on work that never needed them.

### Mastery Signal

Model and effort are chosen on purpose, cost tracks task difficulty, and routine work runs cheap.


## 11. Agentic Refactoring

Before the agent cleans up old code, make it prove behavior stays the same.

### In Practice

- Generate a behavior spec from current code before changing structure.
- Add characterization tests and get a green baseline first.
- Mark behavior as must-preserve, intentionally-changing, or actually-a-bug.
- Refactor in small chunks while isolating I/O, validation, side effects, and conditionals.
- Keep the suite green at every step.
- Preserve external contracts and compare before/after outputs, schemas, logs, and screenshots.
- Do not patch a test just to make the refactor pass.

### Common Mistake

A clean-looking rewrite that changes behavior is still a bug.

### Mastery Signal

A green baseline exists before refactoring, every chunk stays green, and behavior is identical where it must be.


## 12. Agentic Retrospective

Review how you worked with the agent, then turn the lessons into better rules.

### In Practice

- Review agent sessions every one to two weeks like a sprint retro.
- Analyze wrong turns, re-prompts, steers, abandoned chats, and redone work.
- Track retry loops, oversized context, repeated file reads, cost, and tool failures.
- Diff agent output against final commits to find what was rewritten by hand.
- Turn findings into rules, context updates, skills, hooks, or habit changes.
- Use session tracking to watch rework and cost trend down over time.

### Common Mistake

Repeated mistakes are often setup problems, not just model failures.

### Mastery Signal

The same mistake stops recurring, rules and skills grow from evidence, and cost and rework trend down.
