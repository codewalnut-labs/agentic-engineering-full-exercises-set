# Exercise 03 : Assign Agent Work Without Ownership Conflicts

## Your Mission

Your team uses a task board to assign coding agents. One card lacks reproduction steps, two cards reserve the same file, and a cancelled card still owns a path. Starting every listed task would cause conflicting edits and force agents to invent requirements.

Your mission is to establish which work can start, assign only the ready card, and keep ownership and review records consistent through integration. Use **[subagent-driven-development](https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development)** for a bounded implementer task followed by an independent review.

The duration for this challenge is 45 min or less after setup; agent runs may take longer.

## Project

[agent-task-board-app](./agent-task-board-app) contains an incident queue, an invalid board, and protected checks. The [incoming issues](./docs/incoming-issues.md), [card contract](./docs/card-schema.md), and [ownership map](./docs/ownership-map.md) provide the starting facts.

Only ESC-120 has enough evidence to implement: a child incident loses its inherited Critical severity. ESC-118 needs a reproduction, ESC-122 needs a product rule, and ESC-121 remains cancelled. This exercise has its own starter and requires no previous challenge.

## How To Go About It

1. Record the baseline commit, card states, reservation collisions, and initial checks in `evidence/before.md`.
2. Review readiness before dispatch. Release invalid reservations in the assignment plan, keep unresolved and cancelled cards visible, and record why each withheld card cannot start.
3. Load the skill. Give a fresh implementer only ESC-120, its acceptance criteria, exclusive owned paths, and focused command. Use an isolated branch, add a regression test, and return one inspectable implementation commit.
4. Send that exact commit to a separate reviewer. Check both the card requirements and code quality; accept only the verified result. Integrate it with a merge that preserves the reviewed content.
5. Synchronize both JSON boards, the rendered board, ownership map, and integration log. Release completed reservations. Record the final result in `evidence/after.md` and compare assignment safety, history, and remaining blockers in `evidence/comparison.md`.

## Evidence

Submit the ESC-120 change and test, assignment decisions, actual implementer and reviewer sessions, review, focused outputs, and updated board records. Preserve the lane, merge, and control-update history.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `agent-task-board-app/` before raising a focused PR.

## Completion Criteria

Only ready work reaches an implementer. Active ownership never overlaps; unclear, blocked, cancelled, and completed cards hold no reservations. ESC-120 preserves inherited severity, passes independent review and verification, and integrates without hidden edits. Every board mirror agrees, unresolved work retains its history, and final verification passes.
