**Exercise 02**

# Diff Triage With Fresh Agent

**Goal:** Use a fresh review pass to find what the implementing agent missed, then decide which findings are merge blockers.

**Outcome:** A fresh agent review produces signal, and the accountable owner decides what actually blocks merge.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/implementer-notes.md](./docs/implementer-notes.md)
- [docs/review-diff.md](./docs/review-diff.md)
- [pr/review-target.diff](./pr/review-target.diff)

From the repository root, open the main starter:

```bash
cd "09 Code Review/exercise-02-diff-triage-with-fresh-agent/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- [Matt Pocock skills](https://github.com/mattpocock/skills) - install `code-review`
- [Code review skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review)
- [GitHub pull request review docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open the public review skill first. Run `npx skills@latest add mattpocock/skills`, select `code-review`, and run `/setup-matt-pocock-skills` if your agent installed it. If your tool cannot install skills, use the linked skill file as the workflow.
2. Ask a fresh coding agent to invoke `/code-review` on `docs/review-diff.md` without reading `docs/implementer-notes.md` first, so it is not anchored by the original implementation story.
3. Review the fresh findings, then compare them with the implementer notes to identify missed assumptions, false positives, and real blockers.
4. Ask the agent to verify each likely blocker against surrounding source code instead of treating the diff alone as truth.
5. Triage findings into block merge, fix before merge, defer with issue, or dismiss with reason.
6. Have the agent implement the most important accepted fix and add the narrowest check that proves it.
7. Run a second clean-context review focused only on the fixed area to confirm the blocker is gone.

## Deliver

- Fresh-agent review findings before implementer-note comparison.
- Triage table with blocker, defer, and dismiss reasons.
- Patch and verification for the top accepted finding.
- Evidence note comparing first review, owner decision, and second review.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Fresh review findings are verified against surrounding code before they become blockers.
- The accountable owner explains why each finding blocks, defers, or is dismissed.
- The accepted top finding is fixed with evidence.
- A second review pass does not repeat the same accepted blocker.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
