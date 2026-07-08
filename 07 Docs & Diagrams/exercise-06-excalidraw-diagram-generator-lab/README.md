**Exercise 06**

# Excalidraw Diagram Generator Lab

**Goal:** Use the Excalidraw diagram generator skill to create architecture and user-flow `.excalidraw` diagrams for the provided starter project.

**Outcome:** The repo contains readable architecture and flow diagrams that open in Excalidraw and trace every node and arrow back to source files or observed UI behavior.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `Excalidraw diagram generator`
- [Excalidraw diagram generator skill](https://github.com/github/awesome-copilot/blob/main/skills/excalidraw-diagram-generator/SKILL.md)
- [Excalidraw scene format](https://docs.excalidraw.com/docs/codebase/json-schema)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public skill first. Run `npx skills add https://github.com/github/awesome-copilot --skill excalidraw-diagram-generator`, or keep the linked `SKILL.md` open if your agent cannot install skills.
2. Ask your coding agent to read `docs/diagram-requests.md`, `docs/excalidraw-validation-notes.md`, and the starter code before generating JSON.
3. Have the agent scan the starter and list the architecture elements, user actions, state changes, and evidence panels that must appear in the diagrams.
4. Review the list and choose two outputs: one architecture diagram and one user-flow diagram. Remove branches that would make either scene too dense.
5. Use the Excalidraw generator pattern to create `architecture.excalidraw` and `user-flow.excalidraw` with readable text, bounded element count, and clear arrows.
6. Validate JSON schema, root fields, font choices, element positions, arrow bindings, and openability in Excalidraw.
7. Compare every text node and connector against source files or observed UI behavior, then rename or delete anything unsupported.
8. Run a clean-context opening test where a new agent loads both files, explains the diagrams, and identifies source-backed nodes.

## Deliver

- Valid `architecture.excalidraw` scene for the starter project.
- Valid `user-flow.excalidraw` scene for the main workflow.
- Validation script or checklist for JSON structure, font, element count, bindings, and openability.
- Source trace mapping diagram elements to files, functions, UI actions, or observed behavior.
- Evidence note with readability fixes and final validation output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Both `.excalidraw` files parse and contain expected scene root fields.
- Text is readable and uses the required font guidance from the exercise notes.
- Architecture and flow diagrams stay understandable as separate scenes.
- Every node and arrow maps to code, UI behavior, or an explicitly marked external actor.
- A fresh agent can open both files and map diagram elements back to source evidence.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
