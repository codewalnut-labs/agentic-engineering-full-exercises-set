**Exercise 06**

# Excalidraw Diagram Generator Lab

**Goal:** Use an Excalidraw diagram generator skill to convert a messy workflow request into a valid, readable `.excalidraw` file that matches the starter app and can be opened directly in Excalidraw.

**Outcome:** The final diagram is a real Excalidraw JSON artifact with readable layout, bounded scope, consistent styling, and evidence that each node and arrow reflects the implementation.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "07 Docs & Diagrams/exercise-06-excalidraw-diagram-generator-lab/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/diagram-requests.md](./docs/diagram-requests.md)
- [docs/excalidraw-validation-notes.md](./docs/excalidraw-validation-notes.md)

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `Excalidraw diagram generator`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)
- [Excalidraw diagram generator skill](https://github.com/github/awesome-copilot/blob/main/skills/excalidraw-diagram-generator/SKILL.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Classify the request as flowchart, architecture, sequence, DFD, or swimlane before generating.
4. Extract entities, steps, and relationships from the starter app and seeded notes.
5. Generate a `.excalidraw` file under `docs/diagrams/`.
6. Add a validation script or test for JSON structure, IDs, text font, and element count.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Valid `.excalidraw` file.
- Diagram validation script or test.
- Evidence note linking diagram elements to source files.
- Small docs or code fix for one verified mismatch.

## Verify

Run at least:

```bash
cd "07 Docs & Diagrams/exercise-06-excalidraw-diagram-generator-lab/starter-react" && npm test
cd "07 Docs & Diagrams/exercise-06-excalidraw-diagram-generator-lab/starter-react" && npm run agent:check
```

Done when:
- Excalidraw JSON parses and contains the expected root fields.
- Every text element uses `fontFamily: 5` and readable font size.
- Element count stays below 20 or the split is justified.
- Diagram arrows and labels are verified against source files or trace output.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
