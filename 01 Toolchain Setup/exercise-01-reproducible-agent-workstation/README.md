**Exercise 01**

# Reproducible Agent Workstation

**Goal:** Make this starter safe for a new contributor or coding agent to set up, inspect, and verify without extra explanation.

**Scenario:** The React starter runs, but the workstation contract is incomplete. A fresh agent cannot yet prove the Node version, package manager, setup health, allowed commands, forbidden paths, or cleanup rules before it starts editing.

**Outcome:** A contributor can clone the exercise, read checked-in context, run one verification command, and know whether the workstation is ready for agent-assisted development.

## Start Here

Starter folder:
- [starter-react](./starter-react)

Seed files:
- [docs/agent-rules.md](./docs/agent-rules.md) - requirements for agent rules, command allowlists, and forbidden paths.
- [docs/setup-health.md](./docs/setup-health.md) - requirements for setup checks and failure reporting.

From the repository root:

```bash
cd "01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react"
npm install
npm run dev
```

Use the app only as a smoke test. The main work is in scripts, package commands, and agent-facing setup context.

## Use These Practices

- [01. Toolchain Setup practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#01-toolchain-setup)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)
- Focus on project rules, doctor scripts, command allowlists, forbidden paths, generated-artifact cleanup, and one-command verification.

## Do This

1. Read both seed files and turn their risks into concrete acceptance checks.
2. Ask your coding agent for a short plan that names files, commands, failure cases, and rollback risks before it edits.
3. Add an exercise-level `AGENTS.md` or `CLAUDE.md` next to this README. Keep it lean: stable rules, allowed commands, forbidden paths, generated-artifact cleanup, and review expectations only.
4. Add `npm run doctor:setup` in `starter-react`. It must verify the Node major version, package manager, required npm scripts, and required fixture/docs files.
5. Add a rules-size check such as `npm run rules:size`. It must fail if the agent rules file becomes too large or starts carrying task-specific instructions.
6. Add a forbidden-path simulation such as `npm run guard:forbidden-paths`. It must prove generated or sensitive paths like `node_modules`, `dist`, cache files, and local env files are not part of the intended commit.
7. Update `npm run agent:check` so it runs `lint`, `test`, `format`, `typecheck`, `build`, `doctor:setup`, `rules:size`, and `guard:forbidden-paths`.
8. Seed one real failing setup condition, watch the new doctor or guard command fail clearly, then fix the condition and keep the before/after output for your evidence note.
9. Do a fresh-agent handoff: start a new agent session or clean context, point it only at this exercise folder, and confirm it can identify the setup command, rules file, checks, and forbidden paths.

## Deliver

- `starter-react/package.json` scripts for `doctor:setup`, `rules:size`, `guard:forbidden-paths`, and updated `agent:check`.
- Script implementations under `starter-react/scripts/`.
- Exercise-level `AGENTS.md` or `CLAUDE.md`.
- A short evidence note with commands run, failing-condition output, fixed-condition output, changed files, and residual risks.
- No generated artifacts in the final diff: do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Run from the repository root:

```bash
cd "01 Toolchain Setup/exercise-01-reproducible-agent-workstation/starter-react"
npm test
npm run doctor:setup
npm run rules:size
npm run guard:forbidden-paths
npm run agent:check
```

Done when:
- `doctor:setup` fails clearly for a missing prerequisite and passes after the fix.
- `rules:size` keeps the agent rules file small and stable.
- `guard:forbidden-paths` proves generated and sensitive paths are excluded.
- `agent:check` runs every required local gate in one command.
- A fresh agent can understand the workstation contract using only checked-in context.
- The evidence note lists commands run, pass/fail results, changed behavior, final file list, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working scripts, rules file, and evidence are in place.
