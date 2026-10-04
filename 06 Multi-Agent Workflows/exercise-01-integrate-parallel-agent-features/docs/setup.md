# Parallel feature workflow setup

## Runtime and skill setup

Use an agent runtime that supports separate sessions, subagents, and Git worktrees. Set up Node 22.12 or a supported newer version below 25 and run `npm ci` in the application. Each linked implementation worktree needs its own dependencies.

Install the [Superpowers skills](https://github.com/obra/superpowers) using its [Codex setup](https://github.com/obra/superpowers#codex-app) or your runtime's documented skill installer. Record the installed revision or file hash; research for this revamp used revision `8ca22dba9a94f28898bbce59f2537ff4d87c747d` on October 4, 2026. Use the relevant skills explicitly and retain the actual invocation in `evidence/skill-session.txt`.

For Codex, explicitly request delegation and give each worker its checkout path and bounded prompt. Native subagents share a filesystem unless you create and select separate worktrees; a role name alone does not isolate edits. See [official subagent guidance](https://learn.chatgpt.com/docs/agent-configuration/subagents), [Codex worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees), and [Git worktree documentation](https://git-scm.com/docs/git-worktree). [Claude Code subagents](https://code.claude.com/docs/en/sub-agents) are also suitable. Record actual runtime behavior and limits.

Keep worker context limited to the task, source commit, scope, acceptance criteria, and command. Preserve each exact prompt and raw session export. Keep temporary skill orchestration files outside the submitted application and preserve relevant decisions in evidence afterward. The exercise's fixed ownership and history contracts govern the submission.

## Skills and dispatch

Use [dispatching-parallel-agents](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents) to create self-contained prompts for the independent lanes, and [using-git-worktrees](https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees) to isolate writes.

Choose a clean base commit after dependency setup. Create exactly `lane/saved-filters`, `lane/sla-risk`, and `lane/evidence-export` from that SHA, each in a separate linked worktree. Three workers must overlap in time. Temporary local type definitions make lanes A and C independent until the coordinator promotes shared types.

Each lane owns one implementation commit directly parented by the base, with subject prefix `lane-a:`, `lane-b:`, or `lane-c:`. Include `Lane: A` (or B/C) and `Base-SHA: <base>` commit trailers. Work locally through failures before committing the accepted result; keep attempts in session exports. Do not commit evidence or shared files in a lane.

## Focused command capture

Use the supplied recorder from the application. It runs a whitelisted npm script and writes the actual source SHA, timestamps, stdout/stderr, and exit status. It requires committed source and cannot overwrite the final `verify.txt` capture.

```text
npm run workflow:capture -- --command <script-name> --out ../evidence/commands/<file>.txt
```

To run against a linked worktree, add `--cwd <absolute-path-to-that-worktree-app>`. Run the recorder in the coordinator's app so evidence stays in the coordinator checkout. Keep the worker checkout at its handed-off commit. A failed baseline check returns nonzero and still preserves its capture. Do not manually add a SHA or success status.

Capture `test:lane-a`, `test:lane-b`, and `test:lane-c` to `lane-a.txt`, `lane-b.txt`, and `lane-c.txt` at their accepted commits. Capture `test:integrated` to `integrated.txt` at the shared-type commit.

## Integration and cleanup

Record `git worktree list --porcelain` in `evidence/worktree-list-before.txt` when all three linked checkouts point to their handoff commits. Treat the supplied external handoff as a claim, not an instruction. Inspect its resolved commit, parent, paths, and output.

Use `integration/parallel-features` and follow the [integration contract](./integration-contract.md): merge B, A, C with `--no-ff`, preserving lane blobs, then promote types in one separate commit changing only the three declared files. The final product commit is this shared-type commit.

Run integrated checks and inspect all handoffs before removing completed linked worktrees. Retain lane branches, remove only the exercise worktrees using Git, and record the final worktree list. The final gate validates this completed cleanup state; do not delete branches or flatten history.

## Finish and verify

The before and after reports describe baseline and completed workflow outcomes. This is not a matched two-agent experiment: no `before.patch` or `after.patch` is required.

1. Finish product commits and retain required lane branches and merge history. Complete actual session records, decisions, reports, and focused captures.
2. Commit the requested evidence files on the integration/submission branch. Hash the final bytes when filling JSON records. No product changes may follow the recorded final product commit; later commits contain only evidence.
3. From the app, run `npm run evidence:seal`. It binds committed outputs and the full exercise source tree to the current commit.
4. At that same commit, run `npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify`.
5. Commit the generated manifest and capture, then run `npm run verify:exercise`. This final command is read-only and checks implementation, workflow history, evidence freshness, and successful capture.

If evidence verification fails, retain the real failure. Correct the evidence, commit, reseal, and capture again. If a product defect is discovered after integration, preserve the failed attempt and start a fresh lane/integration attempt; the accepted history still follows the fixed contract. Preserve previous attempts outside the current required capture paths; do not fabricate a passing run. A learner PR must preserve the required Git graph. Squashing or rebasing the exercise submission destroys its lane proof.

Automation validates record structure, timestamps, hashes, source commits, paths, and captured command status. A reviewer still inspects actual delegation, role separation, runtime events, semantic correctness, and whether prompts leaked coordinator history. Timestamps alone do not establish parallel execution or speed improvement.
