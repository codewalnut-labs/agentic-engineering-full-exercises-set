**Exercise 06**

# Intent Layer Repo Map

**Goal:** Add folder-level intent context so agents understand ownership, constraints, and traps before editing an incident workflow.

**Outcome:** The repo gets a compact intent layer that guides future agents to the right modules, commands, and review boundaries.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/context-smells.md](./docs/context-smells.md)
- [docs/folder-map.md](./docs/folder-map.md)

From the repository root, open the main starter:

```bash
cd "03 Context Engineering/exercise-06-intent-layer-repo-map/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [Codex AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md)
- [Claude Code memory docs](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/folder-map.md`, `docs/context-smells.md`, and the starter folders to find where intent is missing or misleading.
2. Review each proposed intent note and reject anything that restates filenames, predicts future work, or belongs in a one-time task plan.
3. Have the agent add folder-level intent notes that explain ownership, domain role, allowed changes, risky traps, and related checks.
4. Ask the agent to use those notes to make the incident workflow change, then update the map only where the change proves a durable rule.
5. Check that the intent layer stays small and links to deeper docs rather than becoming a dumped architecture essay.
6. Start a clean-context handoff where a new agent chooses the right folder for an incident change and names one path it should avoid.

## Deliver

- Folder-level intent layer or repo map update.
- Incident workflow change that demonstrates the map is usable.
- Short review note showing which proposed notes were rejected as noise.
- Evidence note from the clean-context folder-selection test.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Intent notes explain why folders exist and what agents must preserve.
- The map is compact and links out instead of copying whole docs.
- The incident change follows the mapped ownership and check guidance.
- A fresh agent can locate the right module and avoid at least one known trap.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
