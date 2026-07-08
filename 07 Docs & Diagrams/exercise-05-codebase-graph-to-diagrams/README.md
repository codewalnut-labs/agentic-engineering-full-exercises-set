**Exercise 05**

# Codebase Graph to Diagrams

**Goal:** Convert the supplied codebase graph snapshot into verified C4 and sequence diagrams, then use them to implement one notification workflow change.

**Outcome:** The graph, diagrams, code change, and evidence all agree on the notification workflow path.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/diagram-requests.md](./docs/diagram-requests.md)
- [docs/graph-snapshot.md](./docs/graph-snapshot.md)

From the repository root, open the main starter:

```bash
cd "07 Docs & Diagrams/exercise-05-codebase-graph-to-diagrams/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `graph-to-diagram`
- [Graphify](https://graphify.net/) - optional source for the graph snapshot
- [Excalidraw diagram generator skill](https://github.com/github/awesome-copilot/blob/main/skills/excalidraw-diagram-generator/SKILL.md) - optional editable diagram output
- [C4 model](https://c4model.com/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Optional tool setup: install Graphify with `pip install graphifyy && graphify install` if you want a fresh graph, or install the Excalidraw skill with `npx skills add https://github.com/github/awesome-copilot --skill excalidraw-diagram-generator` if you want editable `.excalidraw` output.
2. Ask your coding agent to read `docs/graph-snapshot.md` and `docs/diagram-requests.md`, then validate the graph against current starter files before generating diagrams.
3. Review the graph and mark stale, inferred, and verified edges so diagrams do not inherit false relationships.
4. Generate C4-style and sequence diagrams only from verified graph edges plus cited code files.
5. Use the diagrams to identify the notification workflow change path, then implement the smallest safe change.
6. Update graph and diagram artifacts after implementation and explain which edge changed.
7. Run a clean-context review where a new agent checks whether the diagrams still predict the changed workflow.

## Deliver

- Verified graph snapshot with stale, inferred, and verified edges called out.
- C4-style and sequence diagram sources generated from verified graph edges.
- Notification workflow change guided by the diagrams.
- Evidence note linking graph edges, diagram elements, code files, checks, and changed edge.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Diagrams are derived from verified graph edges, not unreviewed graph output.
- The notification change follows the diagrammed path and updates affected artifacts.
- Stale or inferred edges are visible so future agents do not trust them blindly.
- A fresh agent can use the graph and diagrams together to explain impact.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
