**Exercise 01**

# Session Waste Retro From Logs

**Goal:** Analyze the provided session logs, quantify the biggest agent-waste pattern, and implement one durable fix that would prevent it next time.

**Outcome:** Repeated reads, retries, stale context, or failed-command loops become measurable and one selected root cause is reduced by a rule, script, hook, context note, or skill update.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/session-log.md](./docs/session-log.md)
- [docs/usage-summary.md](./docs/usage-summary.md)

From the repository root, open the main starter:

```bash
cd "12 Agentic Retrospective/exercise-01-session-waste-retro-from-logs/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [12. Agentic Retrospective practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#12-agentic-retrospective)
- [OpenAI prompt caching guide](https://platform.openai.com/docs/guides/prompt-caching)
- [Anthropic prompt caching guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to parse `docs/session-log.md` and `docs/usage-summary.md` for repeated file reads, abandoned plans, re-prompts, failed commands, context reloads, and commands rerun without new evidence.
2. Review the extracted events and group them by root cause: missing rule, missing context, weak skill, flaky check, or human decision delay.
3. Calculate simple waste metrics such as repeated reads, retry loops, stale context loaded, and failed commands repeated unchanged.
4. Pick the highest-value root cause and implement one durable fix: rule, context note, hook, script, or skill update.
5. Rerun the log analysis as a simulated after state and estimate which events the fix would have prevented.
6. Capture a before/after waste table.
7. Run a clean-context retro review where a new agent reads the fix and predicts which session behavior should improve.

## Deliver

- Session waste analysis with grouped root causes and simple metrics.
- One implemented durable fix for the highest-value waste pattern.
- Before/after estimate showing which waste events the fix addresses.
- Evidence note with remaining waste patterns, final check output, and next retro candidate.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Waste metrics are derived from the provided logs, not guessed from memory.
- The implemented fix targets a repeated root cause rather than one isolated annoyance.
- Before/after reasoning explains how future sessions should spend less time or context.
- A fresh agent can read the fix and understand the behavior it is meant to change.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
