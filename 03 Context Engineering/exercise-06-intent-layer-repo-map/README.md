**Exercise 06**

# Intent Layer Repo Map

**Goal:** Add folder-level intent context so agents understand ownership, constraints, and traps before editing an incident workflow.

**Outcome:** The repo gets a compact intent layer that guides future agents to the right modules, commands, and review boundaries.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "03 Context Engineering/exercise-06-intent-layer-repo-map/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/context-smells.md](./docs/context-smells.md)
- [docs/folder-map.md](./docs/folder-map.md)

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `intent-layer / zoom-out`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Zoom out to map folders and boundaries.
4. Write compact intent notes at the smallest useful scope.
5. Ask a fresh agent plan to use the intent layer.
6. Implement one incident workflow fix and update stale context.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Folder intent notes or context map.
- Working React fix for escalation or severity behavior.
- Evidence that the agent used the context layer.
- Before and after notes for any corrected context.

## Verify

Run at least:

```bash
cd "03 Context Engineering/exercise-06-intent-layer-repo-map/starter-react" && npm test
cd "03 Context Engineering/exercise-06-intent-layer-repo-map/starter-react" && npm run agent:check
```

Done when:
- Intent notes explain module purpose, ownership, traps, and safe commands.
- Context stays compact enough for every session.
- A future bugfix plan cites intent notes before choosing files.
- One real workflow bug is fixed using the new context layer.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
