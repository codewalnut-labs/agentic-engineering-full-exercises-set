**Exercise 04**

# Skill Optimizer From Traces

**Goal:** Analyze failed agent traces and turn repeated skill mistakes into a measured skill improvement, hook, or team rule.

**Outcome:** A broken alert-triage skill improves because trace evidence reveals trigger misses, repeated reads, skipped checks, and weak output contracts.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "12 Agentic Retrospective/exercise-04-skill-optimizer-from-traces/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/skill-regression.md](./docs/skill-regression.md)
- [docs/trace-samples.md](./docs/trace-samples.md)

## Use These Practices

- [12. Agentic Retrospective practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#12-agentic-retrospective)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `skill optimizer and trace retro`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Read traces and group mistakes by cause.
4. Choose skill, rule, hook, or habit as the corrective mechanism.
5. Patch the smallest durable artifact.
6. Add an eval or check so the same mistake is visible next time.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Trace retro with ranked waste and failure patterns.
- Patched skill or team rule.
- Regression case from a real trace.
- Before and after evidence for the improvement.

## Verify

Run at least:

```bash
cd "12 Agentic Retrospective/exercise-04-skill-optimizer-from-traces/starter-react" && npm test
cd "12 Agentic Retrospective/exercise-04-skill-optimizer-from-traces/starter-react" && npm run agent:check
```

Done when:
- Trace analysis identifies repeated reads, retry loops, skipped checks, and trigger misses.
- At least one skill patch is backed by a failing trace case.
- A hook or rule is added only when it prevents a repeated mistake.
- Post-change eval shows fewer misses or a clearer remaining risk.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
