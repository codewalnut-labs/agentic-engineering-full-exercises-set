**Exercise 01**

# Repo Context Pack for Bugfix Agents

**Goal:** Build a compact context layer so future bugfix agents understand ownership, commands, and safe inspection paths.

**Outcome:** A fresh agent can fix a seeded bug using project context files instead of chat paste.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "03 Context Engineering/exercise-01-repo-context-pack-for-bugfix-agents/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/hidden-conventions.md](./docs/hidden-conventions.md)
- [docs/repo-map-starter.md](./docs/repo-map-starter.md)

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Create a compact repo map, architecture/context file, command list, and do-not-touch list.
4. Seed or use the provided bug report, then have the context guide a real code fix in the starter.
5. Add a regression test proving the bug is fixed.
6. Keep deep detail linked, not stuffed into the always-on file.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Versioned context layer under the exercise.
- Actual bug fix in the React starter.
- Regression test or smoke check.
- Fresh-agent handoff note showing what context was loaded and why.

## Verify

Run at least:

```bash
cd "03 Context Engineering/exercise-01-repo-context-pack-for-bugfix-agents/starter-react" && npm test
cd "03 Context Engineering/exercise-01-repo-context-pack-for-bugfix-agents/starter-react" && npm run agent:check
```

Done when:
- context-pack check
- regression test
- fresh-agent handoff simulation
- do-not-touch path audit
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
