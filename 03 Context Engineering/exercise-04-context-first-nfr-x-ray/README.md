**Exercise 04**

# Context-First NFR X-Ray

**Goal:** Build the context layer a fresh agent needs before it audits the production workflow portal, then use that audit to fix the highest-value findings.

**Outcome:** The NFR review produces prioritized fixes and verification, not a report that stops before engineering work begins.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "03 Context Engineering/exercise-04-context-first-nfr-x-ray/starter-react"
npm install
npm run dev
```

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter so the agent can inspect real UI behavior.
2. Ask your coding agent for a short plan that names files, checks, and NFR risks before it edits.
3. Build a context pack first: repo map, architecture notes, module owners, safe paths, commands, and NFR checklist.
4. Use that context pack to run an agent-assisted security, accessibility, performance, reliability, and testability audit.
5. Choose the top two material findings, implement fixes, and update the context pack with any repeated correction.
6. Add or update checks that would catch those regressions in a future agent session.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- At least two code/config/test fixes for high-value NFR gaps.
- Automated checks for the fixed risks.
- Severity-ranked audit with evidence from changed files.
- Before/after command evidence.

## Verify

Run at least:

```bash
cd "03 Context Engineering/exercise-04-context-first-nfr-x-ray/starter-react" && npm test
cd "03 Context Engineering/exercise-04-context-first-nfr-x-ray/starter-react" && npm run agent:check
```

Done when:
- The context pack lets a fresh agent understand the repo shape using only checked-in context.
- The NFR audit cites concrete files, behavior, and severity.
- The top findings are fixed with checks.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
