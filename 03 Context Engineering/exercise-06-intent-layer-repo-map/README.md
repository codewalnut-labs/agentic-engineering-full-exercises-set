**Exercise 06**

# Intent Layer Repo Map

**Goal:** Add folder-level intent notes for the incident workflow, then use those notes to make one incident-handling change in the right module.

**Outcome:** Future agents can choose the right folder, avoid known traps, and run the right checks before editing the incident workflow.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [Codex AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md)
- [Claude Code memory docs](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/folder-map.md`, `docs/context-smells.md`, and the starter folders to find where folder intent is missing or misleading.
2. Review each proposed note and reject anything that restates filenames, predicts future work, or belongs in a one-time task plan.
3. Have the agent add folder-level intent notes that explain ownership, domain role, allowed changes, known traps, and related checks.
4. Ask the agent to use those notes to implement one incident workflow change in the correct folder.
5. Update the intent layer only where the change proves a durable rule future agents need.
6. Check that the notes stay small and link to deeper docs rather than becoming an architecture dump.
7. Start a clean-context handoff where a new agent chooses the right folder for an incident change and names one path it should avoid.

## Deliver

- Folder-level intent notes or repo map update.
- Incident workflow change that demonstrates the map is usable.
- Review note showing which proposed intent notes were rejected as noise.
- Evidence note from checks and clean-context folder-selection test.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Intent notes explain why folders exist, who owns them, and what agents must preserve.
- The map is compact and links out instead of copying whole docs.
- The incident change follows the mapped ownership and check guidance.
- A fresh agent can locate the right module and avoid at least one known trap.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
