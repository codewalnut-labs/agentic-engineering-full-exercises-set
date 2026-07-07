**Exercise 01**

# Reproducible Agent Workstation

## Competency

01. Toolchain Setup - Project rules, hooks, guardrails, and CLI or MCP wiring

## Your Mission

Turn a fragile local setup into a repeatable agent-ready workstation that a new engineer can run in under 30 minutes.

## Starter Project

```text
01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react
```

Run the React starter:

```bash
cd "01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react"
npm install
npm run dev
```

## Lab Outcome

A new accountable engineer can clone the starter, give it to Codex/Claude Code/Cursor, and get safe, repeatable setup plus checks without a private briefing.

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

- Add a lean in-exercise `AGENTS.md` or `CLAUDE.md` that teaches the agent only stable project rules, commands, forbidden paths, and review expectations.
- Implement a runnable setup or doctor command in `starter-react` that verifies Node version, package manager, required scripts, and fixture availability.
- Wire package scripts so an agent can run `format`, `lint`, `typecheck`, `test`, and a one-command `agent:check` gate.
- Seed at least one failing setup condition and make the doctor script report it clearly.

## Required Working Deliverables

- Working `starter-react` package scripts for setup and verification.
- A doctor/check script that exits non-zero on a real missing prerequisite.
- Agent rules file plus a short evidence note showing a fresh-agent handoff.
- Command output from install, typecheck/build/test, and the doctor script.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Could this be adopted as the default onboarding and agent-safety setup for a team without you sitting beside every engineer?
