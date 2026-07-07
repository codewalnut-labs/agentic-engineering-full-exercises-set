**Exercise 01**

# Reproducible Agent Workstation

**Goal:** Create project rules that let a coding agent work safely in this starter without repeated verbal setup.

**Scenario:** The React starter runs, but a fresh agent does not yet know the project overview, commands, conventions, security expectations, accessibility expectations, forbidden paths, or evidence rules.

**Outcome:** A fresh Codex, Claude Code, Cursor, or similar coding agent can read the checked-in rules, understand the project, run the right checks, and avoid unsafe edits.

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

Use the running app only as a smoke test. The exercise is about creating and validating agent-facing project context.

## Use These Practices

- [01. Toolchain Setup practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#01-toolchain-setup)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)
- Focus on project overview, commands, conventions, security, accessibility, generated-artifact cleanup, forbidden paths, and verification gates.

## Do This

1. Ask your coding agent to scan this exercise and summarize:
   project purpose, tech stack, commands, code conventions, security notes, accessibility notes, and files it should not touch.
2. Review that summary yourself. Remove guesses and anything not proven by files in the repo.
3. Ask the agent to create `AGENTS.md` next to this README. If you use Claude Code, create `CLAUDE.md` too.
4. Review the rules file. Tell the agent what to fix, then have it update the file.
5. Run the existing checks. If you want an extra guard, add a small `rules:check` script that proves the rules file has the sections future agents need.
6. Test with a fresh agent or clean context. Give it only this exercise folder and ask what the project is, which commands to run, and which paths to avoid.
7. Save a short evidence note with the scan, your review notes, final rules, commands run, and remaining risks.

## Deliver

- `AGENTS.md`, and `CLAUDE.md` if you use Claude Code.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent test note: what the new agent understood correctly and what you fixed.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Run from the repository root:

```bash
cd "01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react"
npm test
npm run agent:check
```

If you added a rules check, run it too:

```bash
npm run rules:check
```

Done when:
- Rules are based on a real repo scan.
- You reviewed and improved the agent's first draft.
- A fresh agent can explain the project, commands, and forbidden paths.
- `agent:check` passes, and any rules check you added passes.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the rules and evidence are in place.
