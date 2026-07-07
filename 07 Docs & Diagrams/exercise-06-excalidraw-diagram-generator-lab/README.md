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
- [Excalidraw diagram generator skill](https://github.com/github/awesome-copilot/blob/main/skills/excalidraw-diagram-generator/SKILL.md)
- [Excalidraw scene format](https://docs.excalidraw.com/docs/codebase/json-schema)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public skill first. Run `npx skills add https://github.com/github/awesome-copilot --skill excalidraw-diagram-generator`, or keep the linked `SKILL.md` open if your agent cannot install skills.
2. Ask your coding agent to read `docs/diagram-requests.md`, `docs/excalidraw-validation-notes.md`, and the starter workflow before generating JSON.
3. Review the requested diagram scope and remove branches that would make the Excalidraw scene too dense to read.
4. Have the agent use the Excalidraw generator pattern to create a `.excalidraw` scene with bounded element count, readable text, and clear arrows.
5. Ask the agent to validate the JSON schema, root fields, font choices, element positions, and arrow bindings.
6. Compare every text node and connector against source files or observed UI behavior, then rename or delete anything unsupported.
7. Run a clean-context opening test where a new agent loads the file, explains the diagram, and identifies one source-backed node.

## Deliver

- Valid `.excalidraw` scene file for the workflow.
- Validation script or checklist for JSON structure, font, element count, and bindings.
- Source trace mapping diagram elements to files or UI actions.
- Evidence note with readability fixes made after validation.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The `.excalidraw` file parses and contains expected scene root fields.
- Text is readable and uses the required font guidance from the exercise notes.
- Element count and layout stay understandable or the split into multiple diagrams is justified.
- A fresh agent can open the file and map diagram elements back to code or UI behavior.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
