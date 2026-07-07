**Exercise 01**

# Session Waste Retro From Logs

**Goal:** Analyze provided agent session logs to find retry loops, redundant file reads, and context waste.

**Outcome:** Agent session waste becomes measurable, then one waste pattern is eliminated with a system fix.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "12 Agentic Retrospective/exercise-01-session-waste-retro-from-logs/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/session-log.md](./docs/session-log.md)
- [docs/usage-summary.md](./docs/usage-summary.md)

## Use These Practices

- [12. Agentic Retrospective practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#12-agentic-retrospective)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Parse the provided session logs for retry loops, repeated reads, abandoned turns, tool failures, and context bloat.
4. Build a small metrics script rather than hand-counting.
5. Implement one rule, hook, skill, or workflow change that targets the top waste source.
6. Re-run the seed scenario or simulation to show expected reduction.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Session log analyzer script.
- Waste metrics report.
- Implemented system fix in rules, hook, or skill.
- Before/after comparison evidence.

## Verify

Run at least:

```bash
cd "12 Agentic Retrospective/exercise-01-session-waste-retro-from-logs/starter-react" && npm test
cd "12 Agentic Retrospective/exercise-01-session-waste-retro-from-logs/starter-react" && npm run agent:check
```

Done when:
- log parser test
- waste metric report
- rule/hook/skill fix
- before/after simulation
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
