**Exercise 01**

# Reproducible Agent Workstation

**Goal:** Turn a fragile local setup into a repeatable agent-ready workstation that a new engineer can run in under 30 minutes.

**Outcome:** A new accountable engineer can clone the starter, give it to Codex/Claude Code/Cursor, and get safe, repeatable setup plus checks without a private briefing.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/agent-rules.md](./docs/agent-rules.md)
- [docs/setup-health.md](./docs/setup-health.md)

## Use These Practices

- [01. Toolchain Setup practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#01-toolchain-setup)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Add a lean in-exercise `AGENTS.md` or `CLAUDE.md` that teaches the agent only stable project rules, commands, forbidden paths, and review expectations.
4. Implement a runnable setup or doctor command in `starter-react` that verifies Node version, package manager, required scripts, and fixture availability.
5. Wire package scripts so an agent can run `format`, `lint`, `typecheck`, `test`, and a one-command `agent:check` gate.
6. Seed at least one failing setup condition and make the doctor script report it clearly.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Working `starter-react` package scripts for setup and verification.
- A doctor/check script that exits non-zero on a real missing prerequisite.
- Agent rules file plus a short evidence note showing a fresh-agent handoff.
- Command output from install, typecheck/build/test, and the doctor script.

## Verify

Run at least:

```bash
cd "01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react" && npm test
cd "01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react" && npm run agent:check
```

Done when:
- agent:check
- doctor:setup
- rules-size-check
- forbidden-path simulation
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
