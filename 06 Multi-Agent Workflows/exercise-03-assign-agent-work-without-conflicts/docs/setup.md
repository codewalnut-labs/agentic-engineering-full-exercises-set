# Safe agent assignment workflow setup

## What you are doing

You are the coordinator. Check four tasks, assign only ESC-120 to an implementation agent, and ask a different agent to review its change. The goal is to prevent agents from starting unclear work or editing the same files.

A card is one task. A reservation gives that task exclusive permission to edit listed files while it is active. A lane is the agent's implementation branch. The control commit is the later commit that updates the board and work records. A SHA is a Git commit ID identifying an exact code version.

## Runtime and skill setup

Use an agent runtime that supports separate sessions, subagents, and Git worktrees. Set up Node 22.12 or a supported newer version below 25 and run `npm ci` in the application. Each linked implementation worktree needs its own dependencies.

Install the [Superpowers skills](https://github.com/obra/superpowers) using its [Codex setup](https://github.com/obra/superpowers#codex-app) or your runtime's documented skill installer. Record the installed revision or file hash; research for this revamp used revision `8ca22dba9a94f28898bbce59f2537ff4d87c747d` on October 4, 2026. Use the relevant skills explicitly and retain the actual invocation in `evidence/skill-session.txt`.

For Codex, explicitly request delegation and give each worker its checkout path and bounded prompt. Native subagents share a filesystem unless you create and select separate worktrees; a role name alone does not isolate edits. See [official subagent guidance](https://learn.chatgpt.com/docs/agent-configuration/subagents), [Codex worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees), and [Git worktree documentation](https://git-scm.com/docs/git-worktree). [Claude Code subagents](https://code.claude.com/docs/en/sub-agents) are also suitable. Record actual runtime behavior and limits.

Keep worker context limited to the task, source commit, scope, acceptance criteria, and command. Preserve each exact prompt and raw session export. Keep temporary skill orchestration files outside the submitted application and preserve relevant decisions in evidence afterward. The exercise's fixed ownership and history contracts govern the submission.

## Skill and readiness

Use [subagent-driven-development](https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development) for the ready card: bounded implementation, independent task review for requirements and quality, then final integration review. There is only one implementation task. Do not dispatch unresolved cards to invent missing answers.

As coordinator, audit the supplied board at the base SHA. Record the proposed safe reservation state in `evidence/assignment.json` before dispatch: ESC-120 alone owns its three paths. Retain ESC-118, ESC-122, and ESC-121 with specific withheld reasons. The published board is synchronized after integration; the assignment record proves the dispatch decision.

Create `lane/esc-120-inherited-severity` from the clean base. Give its implementer ESC-120, the acceptance criteria, `src/utils/scoring.ts`, `src/components/SeverityBadge.tsx`, `tests/esc-120/`, and `npm run feature:verify`. Use one commit parented directly by the base, with subject prefix `esc-120:` and trailers `Card: ESC-120` and `Base-SHA: <base>`.

After implementation, use a fresh reviewer acting as `risk-owner` on that exact commit. Preserve a raw reviewer session separate from the implementer. Review both requirements and quality. Summarize the final independent review in `evidence/completed-lane.md`; include both review outcomes, final integration review, remaining risks, and rollback.

## Focused command capture

Use the supplied recorder from the application. It runs a whitelisted npm script and writes the actual source SHA, timestamps, stdout/stderr, and exit status. It requires committed source and cannot overwrite the final `verify.txt` capture.

```text
npm run workflow:capture -- --command <script-name> --out ../evidence/commands/<file>.txt
```

To run against a linked worktree, add `--cwd <absolute-path-to-that-worktree-app>`. Run the recorder in the coordinator's app so evidence stays in the coordinator checkout. Keep the worker checkout at its handed-off commit. A failed baseline check returns nonzero and still preserves its capture. Do not manually add a SHA or success status.

Capture `feature:verify` to `esc-120.txt` at the lane commit. Merge into `integration/kanban-control` from the base with `--no-ff`. Create one following control commit updating exactly both JSON boards, the Markdown board, ownership map, and integration log. Capture `board:verify` to `board.txt` at that control commit.

## Final control state

Keep ESC-118 needs-info, ESC-122 blocked by RULE-ESC-122, and ESC-121 cancelled with history intact. ESC-120 progresses through in-progress and in-review to merged. Remove every active reservation after integration. Only evidence commits follow the control commit.

A merge rollback uses `git revert -m 1 <merge-SHA>`; a plain revert of a merge needs a mainline selection. Product and assignment review remain accountable to the coordinator.

## Finish and verify

The before and after reports describe baseline and completed workflow outcomes. This is not a matched two-agent experiment: no `before.patch` or `after.patch` is required.

1. Finish product commits and retain required lane branches and merge history. Complete actual session records, decisions, reports, and focused captures.
2. Commit the requested evidence files on the integration/submission branch. Hash the final bytes when filling JSON records. No product changes may follow the recorded final product commit; later commits contain only evidence.
3. From the app, run `npm run evidence:seal`. It binds committed outputs and the full exercise source tree to the current commit.
4. At that same commit, run `npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify`.
5. Commit the generated manifest and capture, then run `npm run verify:exercise`. This final command is read-only and checks implementation, workflow history, evidence freshness, and successful capture.

If evidence verification fails, retain the real failure. Correct the evidence, commit, reseal, and capture again. If a product defect is discovered after integration, preserve the failed attempt and start a fresh lane/integration attempt; the accepted history still follows the fixed contract. Preserve previous attempts outside the current required capture paths; do not fabricate a passing run. A learner PR must preserve the required Git graph. Squashing or rebasing the exercise submission destroys its lane proof.

Automation validates record structure, timestamps, hashes, source commits, paths, and captured command status. A reviewer still inspects actual delegation, role separation, runtime events, semantic correctness, and whether prompts leaked coordinator history. Timestamps alone do not establish parallel execution or speed improvement.
