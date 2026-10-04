# Specialist review workflow setup

## What you are doing

You coordinate two rounds of review: four agents inspect the starting code, you fix the confirmed problems, and four new agents check the fixes. Reviewers report findings; you own the code changes and final decision.

The four roles are security (permissions and unsafe input), accessibility (keyboard use), performance (speed), and testability (reliable automated tests). A SHA is a Git commit ID: it identifies the exact code version a reviewer must inspect. "Baseline" means the starting version; "remediation" means the version containing your fixes.

## Runtime and skill setup

Use an agent runtime that supports separate sessions, subagents, and Git worktrees. Set up Node 22.12 or a supported newer version below 25 and run `npm ci` in the application. Each linked implementation worktree needs its own dependencies.

Install the [Superpowers skills](https://github.com/obra/superpowers) using its [Codex setup](https://github.com/obra/superpowers#codex-app) or your runtime's documented skill installer. Record the installed revision or file hash; research for this revamp used revision `8ca22dba9a94f28898bbce59f2537ff4d87c747d` on October 4, 2026. Use the relevant skills explicitly and retain the actual invocation in `evidence/skill-session.txt`.

For Codex, explicitly request delegation and give each worker its checkout path and bounded prompt. Native subagents share a filesystem unless you create and select separate worktrees; a role name alone does not isolate edits. See [official subagent guidance](https://learn.chatgpt.com/docs/agent-configuration/subagents), [Codex worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees), and [Git worktree documentation](https://git-scm.com/docs/git-worktree). [Claude Code subagents](https://code.claude.com/docs/en/sub-agents) are also suitable. Record actual runtime behavior and limits.

Keep worker context limited to the task, source commit, scope, acceptance criteria, and command. Preserve each exact prompt and raw session export. Keep temporary skill orchestration files outside the submitted application and preserve relevant decisions in evidence afterward. The exercise's fixed ownership and history contracts govern the submission.

## Skill and review cycle

Use [dispatching-parallel-agents](https://github.com/obra/superpowers/tree/main/skills/dispatching-parallel-agents) for four bounded investigations. Reviewers inspect source and run checks; they never implement fixes. Use read-only permissions where the runtime allows them, or an isolated review checkout, and retain any permission limits.

Record a clean baseline SHA. Give security, accessibility, performance, and testability fresh contexts with the matching [role prompt](./specialist-prompts.md), SHA, command, and [report format](./specialist-report-template.md). Four roles may run in waves if your concurrency cap is below four; at least two reviews must overlap in each phase. Finish baseline review before starting remediation/rechecks.

Every required problem gets a finding ID and a recorded decision: `fix`, `defer` (postpone), or `dismiss`. The required problems must all be fixed. The protected scope assigns SEC-01/SEC-02, A11Y-01, PERF-01, and TEST-01; additional supported findings are allowed. These IDs identify outcomes, not prewritten findings. Verify CLAIM-01 and explain the shared SEC-02/TEST-01 service boundary in the decision log.

Implement the [remediation contract](./remediation-contract.md) in source and participant tests only. Use a source-only remediation commit directly after the baseline; evidence is committed later. If you iterate locally, retain attempts and commit the accepted source state once. Afterward, use four fresh review sessions at that exact remediation SHA, not a moving working tree.

## Focused command capture

Use the supplied recorder from the application. It runs a whitelisted npm script and writes the actual source SHA, timestamps, stdout/stderr, and exit status. It requires committed source and cannot overwrite the final `verify.txt` capture.

```text
npm run workflow:capture -- --command <script-name> --out ../evidence/commands/<file>.txt
```

To run against a linked worktree, add `--cwd <absolute-path-to-that-worktree-app>`. Run the recorder in the coordinator's app so evidence stays in the coordinator checkout. Keep the worker checkout at its handed-off commit. A failed baseline check returns nonzero and still preserves its capture. Do not manually add a SHA or success status.

Capture all `review:security`, `review:accessibility`, `review:performance`, and `review:testability` scripts twice to `<role>-before.txt` and `<role>-after.txt`. Each baseline capture must contain the protected failure with exit 1; each final capture must pass with exit 0. Use the baseline review checkout for before commands and the repaired checkout for after commands.

## Comparable performance

Run `npm run measure:performance -- --ref <baseline-SHA> --out ../evidence/performance-before.json` and the equivalent remediation command to `performance-after.json`. Use the same machine, sample size 200, iterations 5, and portfolio-risk scenario. Preserve result 41 and reduce duration by at least 75 percent. Record noisy measurements honestly; timing reports are not agent speed comparisons.

## Finish and verify

The before and after reports describe baseline and completed workflow outcomes. This is not a matched two-agent experiment: no `before.patch` or `after.patch` is required.

1. Finish product commits and retain required lane branches and merge history. Complete actual session records, decisions, reports, and focused captures.
2. Commit the requested evidence files on the integration/submission branch. Hash the final bytes when filling JSON records. No product changes may follow the recorded final product commit; later commits contain only evidence.
3. From the app, run `npm run evidence:seal`. It binds committed outputs and the full exercise source tree to the current commit.
4. At that same commit, run `npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify`.
5. Commit the generated manifest and capture, then run `npm run verify:exercise`. This final command is read-only and checks implementation, workflow history, evidence freshness, and successful capture.

If evidence verification fails, retain the real failure. Correct the evidence, commit, reseal, and capture again. If a product defect is discovered after integration, preserve the failed attempt and start a fresh lane/integration attempt; the accepted history still follows the fixed contract. Preserve previous attempts outside the current required capture paths; do not fabricate a passing run. A learner PR must preserve the required Git graph. Squashing or rebasing the exercise submission destroys its lane proof.

Automation validates record structure, timestamps, hashes, source commits, paths, and captured command status. A reviewer still inspects actual delegation, role separation, runtime events, semantic correctness, and whether prompts leaked coordinator history. Timestamps alone do not establish parallel execution or speed improvement.
