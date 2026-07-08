**Exercise 05**

# PRD to Issues Vertical Slicer

**Goal:** Use `to-prd` and `to-issues` to turn the messy growth experiment conversation into a PRD and an issue board with one implementable vertical slice.

**Outcome:** The repo contains a PRD, a dependency-aware issue board, and one proven slice that a future agent can pick up without hidden context.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [02. Spec Framing practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#02-spec-framing)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `to-prd / to-issues`
- [Matt Pocock skills](https://github.com/mattpocock/skills) - install `to-prd` and `to-issues`
- [to-prd guide](https://www.aihero.dev/skills-to-prd)
- [to-issues guide](https://www.aihero.dev/skills-to-issues)
- [GitHub issue planning concepts](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public skills first. Run `npx skills@latest add mattpocock/skills`, select `to-prd`, `to-issues`, and `/setup-matt-pocock-skills`, then run `/setup-matt-pocock-skills` if your agent installed it. If your tool cannot install skills, use the linked guides as the workflow.
2. Ask your coding agent to extract goals, target users, constraints, metrics, risks, and open questions from `docs/product-conversation.md` without creating issues yet.
3. Review the extraction and decide what belongs in the PRD, what is only an assumption, and what is out of scope for the experiment.
4. Invoke `/to-prd` or have the agent follow the linked guide to draft a PRD with success metric, guardrail metric, non-goals, and acceptance criteria that can be tested in the starter.
5. Invoke `/to-issues` or have the agent follow the linked guide to convert the PRD into vertical issues using `docs/slice-board.md`; each card must name files, checks, dependencies, and review evidence.
6. Implement or dry-run the smallest issue card so the board format is proven by real starter work.
7. Run a handoff review where a fresh agent chooses the next safe issue and explains why it can be worked independently.

## Deliver

- PRD grounded in the product conversation with success metric, guardrail, non-goals, and open questions.
- Vertical slice issue board with files, dependencies, acceptance criteria, checks, and review evidence.
- One implemented or dry-run issue proving the board is actionable.
- Evidence note documenting assumption changes, final command output, and any issue that is not independently grabbable yet.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The PRD separates user value, metric, scope, guardrail, and release risk clearly.
- Each issue can be implemented and reviewed without requiring a hidden shared rewrite.
- Dependencies are shown explicitly instead of buried in prose.
- A fresh agent can pick one card and name the files, checks, and review evidence before editing.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
