**Exercise 06**

# Excalidraw Diagram Generator Lab

**Goal:** Use an Excalidraw diagram generator skill to convert a messy workflow request into a valid, readable `.excalidraw` file that matches the starter app and can be opened directly in Excalidraw.

**Outcome:** The final diagram is a real Excalidraw JSON artifact with readable layout, bounded scope, consistent styling, and evidence that each node and arrow reflects the implementation.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/diagram-requests.md](./docs/diagram-requests.md)
- [docs/excalidraw-validation-notes.md](./docs/excalidraw-validation-notes.md)

From the repository root, open the main starter:

```bash
cd "07 Docs & Diagrams/exercise-06-excalidraw-diagram-generator-lab/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `Excalidraw diagram generator`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)
- [Excalidraw diagram generator skill](https://github.com/github/awesome-copilot/blob/main/skills/excalidraw-diagram-generator/SKILL.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: workflow, architecture, source files, existing docs, drift risks, and diagram or doc outputs.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Valid `.excalidraw` file.
- Diagram validation script or test.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Excalidraw JSON parses and contains the expected root fields.
- Every text element uses `fontFamily: 5` and readable font size.
- Element count stays below 20 or the split is justified.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
