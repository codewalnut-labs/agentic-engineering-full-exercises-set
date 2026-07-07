**Exercise 06**

# Excalidraw Diagram Generator Lab

## Competency

07. Docs & Diagrams - Visual system explanation with editable diagram artifacts

## Popular Agent Skill Pattern

Excalidraw diagram generator

## Your Mission

Use an Excalidraw diagram generator skill to convert a messy workflow request into a valid, readable `.excalidraw` file that matches the starter app and can be opened directly in Excalidraw.

## Starter Project

```text
07 Docs & Diagrams/exercise-06-excalidraw-diagram-generator-lab/starter-react
```

Run the React starter:

```bash
cd "07 Docs & Diagrams/exercise-06-excalidraw-diagram-generator-lab/starter-react"
npm install
npm run dev
```

## Lab Outcome

The final diagram is a real Excalidraw JSON artifact with readable layout, bounded scope, consistent styling, and evidence that each node and arrow reflects the implementation.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Use the skill pattern as an operating workflow, not as a prompt shortcut.

Practice signals for this exercise:

- Choose the correct diagram type from the request before generating JSON.
- Extract entities, steps, relationships, and data flows from code and docs.
- Generate `.excalidraw` JSON with unique IDs, readable coordinates, arrows, and `fontFamily: 5` for text.
- Validate the diagram as JSON and verify the layout against the app workflow.

Common mistake to avoid: A diagram file that opens but misstates the workflow is still a bug.

Mastery signal: Reviewers can open the `.excalidraw` file, inspect it visually, and trace every important element back to code.

## Hands-On Scope

- Read the diagram request and choose flowchart, architecture, sequence, DFD, or swimlane format.
- Generate one `.excalidraw` file under `docs/diagrams/`.
- Add a validation script or test that checks valid JSON, Excalidraw root fields, unique element IDs, readable text, and `fontFamily: 5`.
- Fix one mismatch between the starter app, source notes, and generated diagram.

## Required Working Deliverables

- One valid `.excalidraw` file.
- Diagram validation script or test.
- Evidence note linking diagram elements to source files.
- Small docs or code fix for any verified mismatch.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- `.excalidraw` JSON parses and has `type: "excalidraw"`, `version`, `elements`, `appState`, and `files`.
- Every text element uses `fontFamily: 5` and has readable size.
- Element count stays below 20 unless the exercise note explains the split.
- Diagram arrows and labels are verified against source files or trace output.

## Review Bar

Could a reviewer open the generated file and trust it as an editable system diagram?
