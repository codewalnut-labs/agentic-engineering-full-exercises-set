# Exercise 03 : Assign Agent Work Without Ownership Conflicts

## Your Mission

Your team has four tasks on a board and wants agents to work on them. Some tasks are missing information, two ask to change the same file, and one has been cancelled. Assigning all four could cause agents to overwrite each other's work or guess missing requirements.

Your challenge is to decide which task can start, give its agent clear file ownership, and have another agent review the result. File ownership means only the assigned agent may edit those files while the task is active.

Use **[subagent-driven-development](https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development)**. You coordinate the work; one agent implements the ready task and a different agent checks it.

The duration for this challenge is 45 min or less after setup; agent runs may take longer.

## Project

[agent-task-board-app](./agent-task-board-app) provides an incident queue, task board, and checks. Each board card represents one task:

- **ESC-118:** wait for steps that reproduce the reported bug.
- **ESC-120:** ready to start; a child incident incorrectly shows Low severity instead of its parent's Critical severity.
- **ESC-122:** wait for an approved rule explaining how severity should increase.
- **ESC-121:** cancelled; keep its record and assign no work.

Use the [task details](./docs/incoming-issues.md), [board rules](./docs/card-schema.md), and [file ownership map](./docs/ownership-map.md). This challenge is independent of the other exercises.

## How To Go About It

1. Record the starting Git commit, task states, and files claimed by more than one task in `evidence/before.md`.
2. Plan the assignment: reserve files only for ESC-120 and record why the other tasks must wait or remain cancelled.
3. Give a fresh agent ESC-120, its requirements, allowed files, and check command. Have it add a regression test and commit the implementation on its own branch.
4. Ask a different agent to review that exact commit for requirements and code quality. Merge the accepted change while preserving its history.
5. Update the board files, ownership map, and work log so they agree. Release ESC-120's files after completion. Record the final state in `evidence/after.md` and the changes and remaining questions in `evidence/comparison.md`.

## Evidence

Submit the fix and test, assignment decisions, actual implementation and review sessions, check results, and updated board records.

Follow the [setup and workflow instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `agent-task-board-app/` before raising a focused PR.

## Completion Criteria

Only ESC-120 is implemented. It displays inherited severity correctly and passes independent review and verification. No two active tasks claim the same file. Waiting, cancelled, and completed tasks reserve no files. All board records agree, task history is retained, and final verification passes.
