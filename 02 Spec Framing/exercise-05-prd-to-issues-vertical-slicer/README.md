**Exercise 05**

# PRD to Issues Vertical Slicer

**Goal:** Turn a messy growth experiment conversation into a PRD and independently grabbable vertical slice issues.

**Outcome:** A broad experiment idea becomes a PRD, dependency graph, and issue set that multiple agents can implement without stepping on each other.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/product-conversation.md](./docs/product-conversation.md)
- [docs/slice-board.md](./docs/slice-board.md)

From the repository root, open the main starter:

```bash
cd "02 Spec Framing/exercise-05-prd-to-issues-vertical-slicer/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `to-prd / to-issues`
- [GitHub issue planning concepts](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to extract goals, users, constraints, metrics, risks, and open questions from `docs/product-conversation.md` without creating issues yet.
2. Review the extraction and decide what belongs in the PRD, what is an assumption, and what must be left out of scope.
3. Have the agent draft a PRD with success metric, release guardrail, non-goals, and acceptance criteria that can be tested in the starter.
4. Convert the PRD into vertical issues using `docs/slice-board.md`: each card should have independent files, checks, dependencies, and review evidence.
5. Ask the agent to implement or dry-run one thin slice so the issue format is proven by real work, not only planning.
6. Run a handoff review where a fresh agent chooses the next safe issue and explains why it can be worked independently.

## Deliver

- PRD grounded in the product conversation with explicit non-goals and open questions.
- Vertical slice issue board with owners, dependencies, acceptance criteria, and checks.
- One proven slice or dry-run showing the issue format is actionable.
- Evidence note documenting assumption changes and any issue that is not independently grabbable yet.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The PRD separates user value, metric, scope, and release risk clearly.
- Each issue can be implemented and reviewed without requiring a hidden shared rewrite.
- Dependencies are shown explicitly instead of buried in prose.
- A fresh agent can pick a card and name the files and checks before editing.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
