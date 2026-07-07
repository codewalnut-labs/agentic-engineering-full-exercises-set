**Exercise 04**

# Skill Optimizer From Traces

**Goal:** Analyze failed agent traces and turn repeated skill mistakes into a measured skill improvement, hook, or team rule.

**Outcome:** A broken alert-triage skill improves because trace evidence reveals trigger misses, repeated reads, skipped checks, and weak output contracts.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/skill-regression.md](./docs/skill-regression.md)
- [docs/trace-samples.md](./docs/trace-samples.md)

From the repository root, open the main starter:

```bash
cd "12 Agentic Retrospective/exercise-04-skill-optimizer-from-traces/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [12. Agentic Retrospective practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#12-agentic-retrospective)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `trace-backed skill optimizer`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: skill pattern, trigger conditions, source files, expected artifact, checks, and likely failure modes.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Trace retro with ranked waste and failure patterns.
- Patched skill or team rule.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Trace analysis identifies repeated reads, retry loops, skipped checks, and trigger misses.
- At least one skill patch is backed by a failing trace case.
- A hook or rule is added only when it prevents a repeated mistake.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
