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

1. Ask your coding agent to scan the exercise folder and starter app. It should report the project overview, tech stack, important files, existing npm scripts, coding conventions, security concerns, accessibility concerns, generated artifacts, and likely forbidden paths.
2. Review the scan yourself. Remove guesses, vague advice, one-time task notes, and anything not supported by files in the repo.
3. Ask the coding agent to create an exercise-level `AGENTS.md` next to this README using the reviewed scan. If you are using Claude Code, also create `CLAUDE.md` with the same stable rules.
4. Review the generated `AGENTS.md` or `CLAUDE.md` as if it will guide future agents. Check that it is short, specific, repo-grounded, and includes setup commands, allowed checks, security expectations, accessibility expectations, forbidden paths, generated-artifact cleanup, and evidence expectations.
5. Write a change request for your coding agent with the missing or incorrect rules from your review. Ask it to update the agent rules file without adding task-specific instructions.
6. Add or update lightweight verification in `starter-react` so the rules can be tested. At minimum, make sure `npm run agent:check` works and add checks for rule size, required sections, and forbidden-path guidance.
7. Test the rules with a fresh-agent handoff. Start a new agent session or clean context, point it only at this exercise folder, and ask it to explain the project, name the safe commands, identify forbidden paths, and run the verification gate.
8. Fix any rule or script gaps found during the fresh-agent test, then rerun the verification gate.
9. Keep an evidence note with the original scan, your review changes, final rules file, commands run, pass/fail output, and remaining risks.

## Deliver

- Exercise-level `AGENTS.md`, plus `CLAUDE.md` if using Claude Code.
- A reviewed and revised rules file, not the first draft from the agent.
- `starter-react` verification updates for rule quality, forbidden paths, and `agent:check`.
- Fresh-agent handoff evidence showing the rules were understandable without extra context.
- Final command output from install, app smoke test, and verification.

Do not commit generated artifacts such as `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Run from the repository root:

```bash
cd "01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react"
npm test
npm run agent:check
```

Also run the rule-quality commands you added, for example:

```bash
npm run rules:size
npm run guard:forbidden-paths
```

Done when:
- The rules file is based on a real repo scan, not generic advice.
- Human review changed or tightened the first agent draft.
- The final rules cover overview, commands, conventions, security, accessibility, forbidden paths, cleanup, and evidence.
- A fresh agent can follow the rules and choose the right checks without additional prompting.
- `agent:check` and your rule-quality checks pass.
- The evidence note lists commands run, pass/fail results, changed behavior, final file list, and residual risk.

A README-only answer is not enough; the exercise is complete only when the rules, verification updates, and evidence are in place.
