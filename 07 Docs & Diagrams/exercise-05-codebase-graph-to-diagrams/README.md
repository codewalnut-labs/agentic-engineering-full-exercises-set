**Exercise 05**

# Codebase Graph to Diagrams

**Goal:** Convert a codebase graph snapshot into verified C4 and sequence diagrams, then use those diagrams to guide a safe change.

**Outcome:** Architecture diagrams are generated from actual code relationships and verified by implementing one small notification workflow change.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [07. Docs & Diagrams practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#07-docs-diagrams)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `graph-to-diagram`
- [C4 model](https://c4model.com/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/graph-snapshot.md` and `docs/diagram-requests.md`, then validate the graph against current starter files before generating diagrams.
2. Review the graph and mark stale, inferred, and verified edges so diagrams do not inherit false relationships.
3. Have the agent generate C4-style and sequence diagrams only from verified graph edges plus cited code files.
4. Use the diagrams to identify the notification workflow change path, then implement the smallest safe change.
5. Ask the agent to update graph and diagram artifacts after implementation and explain which edge changed.
6. Run a clean-context review where a new agent checks whether the diagram still predicts the changed workflow.

## Deliver

- Verified graph snapshot with stale and inferred edges called out.
- C4-style and sequence diagram sources generated from the graph.
- Notification workflow change guided by the diagrams.
- Evidence note linking graph edges, diagram elements, code files, and checks.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Diagrams are derived from verified graph edges, not unreviewed graph output.
- The implemented workflow change follows the diagrammed path and updates affected artifacts.
- Stale or inferred edges are visible so future agents do not trust them blindly.
- A fresh agent can use the graph and diagrams together to explain impact.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
