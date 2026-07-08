**Exercise 01**

# Reproducible Agent Workstation

**Goal:** Create and test an exercise-level `AGENTS.md` for this React starter so a fresh coding agent can understand the app, run checks, and avoid unsafe files without extra chat instructions.

**Scenario:** The React starter runs, but a fresh agent does not yet know the project overview, commands, conventions, security expectations, accessibility expectations, forbidden paths, or evidence rules.

**Outcome:** A new Codex, Claude Code, Cursor, or similar agent can enter this folder, explain the starter app, name safe commands and forbidden paths, and complete a small change using only checked-in rules.

## Start Here

Starter folder:
- [starter-react](./starter-react)

Seed files:
- [docs/agent-rules.md](./docs/agent-rules.md)
- [docs/setup-health.md](./docs/setup-health.md)

From the repository root:

```bash
cd "01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then create and validate the agent-facing project context.

## Use These Practices

- [01. Toolchain Setup practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#01-toolchain-setup)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)
- Focus on project overview, commands, conventions, security, accessibility, generated-artifact cleanup, forbidden paths, and verification gates.

## Do This

1. Ask your coding agent to scan this exercise folder and `starter-react`, then report the project purpose, tech stack, important files, npm scripts, conventions, security expectations, accessibility expectations, generated artifacts, and paths it should not touch.
2. Review the scan yourself. Delete guesses, one-time task advice, and anything not supported by files in this repo.
3. Ask the agent to create `AGENTS.md` next to this README with stable rules for future agents. If you use Claude Code, also create `CLAUDE.md` with the same durable rules.
4. Review the generated rules as if a different agent will use them next week. Require setup commands, safe checks, forbidden paths, cleanup rules, evidence expectations, and security/accessibility expectations.
5. Give the agent your review notes and ask it to update only the rules file, not add task-specific instructions.
6. Run the setup and check commands named in the rules file, then start a fresh-agent or clean-context test with only this exercise folder as context.
7. Ask the fresh agent to explain the project, name safe commands, identify forbidden paths, and choose the right verification gate. Record what it got right and what you fixed.

## Deliver

- Exercise-level `AGENTS.md`, plus `CLAUDE.md` if you use Claude Code.
- Review note showing what you removed or tightened after the first agent draft.
- Fresh-agent handoff note proving the rules worked without extra context.
- Evidence note with commands run, pass/fail results, final files changed, and remaining risks.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The rules are based on a real scan of this exercise and `starter-react`, not generic agent advice.
- Human review changed or tightened the first draft.
- A fresh agent can explain the app, commands, forbidden paths, cleanup rules, and evidence expectations.
- The commands named in the rules file were run or clearly marked as not applicable.
- The evidence note lists commands, pass/fail results, changed files, and residual risk.

A README-only answer is not enough; the exercise is complete only when the rules and evidence are in place.
