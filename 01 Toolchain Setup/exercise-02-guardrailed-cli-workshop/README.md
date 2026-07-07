**Exercise 02**

# Guardrailed CLI Workshop

## Competency

01. Toolchain Setup - Project rules, hooks, guardrails, and CLI or MCP wiring

## Your Mission

Design the safety rails for an agent that can inspect code, run checks, and collect logs without touching secrets or destructive commands.

## Starter Project

```text
01 Toolchain Setup/exercise-02-guardrailed-cli-workshop/starter-react
```

Run the React starter:

```bash
cd "01 Toolchain Setup/exercise-02-guardrailed-cli-workshop/starter-react"
npm install
npm run dev
```

## Lab Outcome

The agent has useful autonomy, but dangerous paths and tools are blocked by executable guardrails rather than tribal warnings.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Set up the agent like a new teammate: house rules, guardrails, and only the keys it needs.

Practice signals for this exercise:

- Write tight AGENTS.md or CLAUDE.md project rules with scripts, conventions, and forbidden paths.
- Keep always-on rules lean and split deep workflow detail into skills.
- Run in safe auto mode with approval on risky operations.
- Add deny rules and PreToolUse-style hooks for secrets, destructive commands, and unsafe paths.

Common mistake to avoid: YOLO mode can leak secrets, damage branches, or let a stray command do real harm.

Mastery signal: New sessions need little re-explaining, checks run without prompting, and the agent never reaches for tools or paths it was not granted.

## Hands-On Scope

- Create a guardrail policy for secrets, destructive git operations, generated artifacts, and external CLIs.
- Implement a local hook simulator or PreToolUse-style script that blocks `.env`, secret manager paths, force pushes, recursive deletes outside the exercise, and unapproved CLIs.
- Add tests or table-driven cases for allowed, warned, and blocked commands.
- Wire the guardrail into `agent:check` so it can run before an agent session.

## Required Working Deliverables

- Executable guardrail script and policy config.
- Automated guardrail test cases.
- Updated starter scripts invoking the guardrail.
- Evidence showing blocked and allowed examples.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Review Bar

Does the policy preserve velocity while making the cost of a bad agent command unacceptable?
