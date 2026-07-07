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
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `intent-layer / zoom-out`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: project purpose, domain behavior, important files, existing commands, risks, expected outputs, and likely files to change.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Folder intent notes or context map.
- Working React fix for escalation or severity behavior.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Intent notes explain module purpose, ownership, traps, and safe commands.
- Context stays compact enough for every session.
- A future bugfix plan cites intent notes before choosing files.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
