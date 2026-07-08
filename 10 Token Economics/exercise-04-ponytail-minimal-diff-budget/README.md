**Exercise 04**

# Ponytail Minimal-Diff Budget

**Goal:** Use Ponytail to complete the design-system migration slice with the smallest safe diff after considering skip, reuse, platform behavior, and dependency options.

**Outcome:** The final diff is smaller than the overbuilt plan while preserving validation, accessibility, error handling, and data-loss protection.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/ponytail-ladder-ledger.md](./docs/ponytail-ladder-ledger.md)
- [docs/session-transcript.md](./docs/session-transcript.md)

From the repository root, open the main starter:

```bash
cd "10 Token Economics/exercise-04-ponytail-minimal-diff-budget/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [10. Token Economics practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#10-token-economics)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `Ponytail minimal-diff ladder`
- [Ponytail skill](https://github.com/DietrichGebert/ponytail)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open Ponytail first. For Codex, run `codex plugin marketplace add DietrichGebert/ponytail`, restart Codex, open `/plugins`, install Ponytail, then review and trust its `/hooks`. For Claude Code, use the plugin commands from the linked Ponytail repo.
2. Ask your coding agent to read `docs/session-transcript.md`, `docs/ponytail-ladder-ledger.md`, and the migration target, then identify what the overbuilt plan wanted to add.
3. Review the plan and force the Ponytail ladder in order: skip, reuse existing code, use platform behavior, add a dependency only if justified, then write new code last.
4. Fill the ladder ledger with accepted and rejected rungs before editing the starter.
5. Implement the design-system migration slice using the smallest safe diff while preserving validation, accessibility, error handling, and data-loss protection.
6. Compare the final diff against the overbuilt plan by changed files, new code, deleted code, and risk accepted.
7. Run a clean-context review where a new agent challenges whether any new code could have been avoided safely.

## Deliver

- Completed Ponytail ladder ledger with evidence for each rung.
- Minimal-diff design-system migration slice in the React starter.
- Diff budget comparison against the overbuilt plan.
- Evidence note covering safety exceptions, final checks, and residual risk.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The ledger proves skip, reuse, platform, and dependency options were considered before new code.
- The final diff is smaller than the overbuilt plan without dropping required behavior.
- Safety-critical behavior is preserved or explicitly protected by checks.
- A fresh agent can explain why the remaining new code is necessary.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
