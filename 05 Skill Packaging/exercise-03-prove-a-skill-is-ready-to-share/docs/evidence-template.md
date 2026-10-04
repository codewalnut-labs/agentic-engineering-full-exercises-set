# Skill Distribution Evidence

## before.md, after.md, and comparison.md

Use `## Conditions`, `## Findings`, and `## Proof` in both run reports. Record the starting task state, agent/model/runtime, enabled tools, permissions, session limit, attempt, candidate or baseline hash, actual inputs, results, commands, exit codes, and links to saved sessions. Keep unsuccessful attempts and explain any changed conditions.

Use `## Changes`, `## Verified`, and `## Remaining questions` in `evidence/comparison.md`. Connect each claimed improvement to a saved output, score, or actual session observation. Record remaining uncertainty.

## evidence/skill-use.md and evidence/skill-session.txt

Save the complete authoring session in `evidence/skill-session.txt`. Record actual skill use:

```text
## skill-creator
- Source: https://github.com/anthropics/skills/tree/main/skills/skill-creator
- Revision: <40-character source revision>
- Installed path: <path ending in skill-creator/SKILL.md>
- SHA-256: <64-character hash of the installed SKILL.md>
- Installation: <actual method>
- Invocation: <actual invocation>
- Proof: evidence/skill-session.txt:L<first>-L<last>
- Agent: <agent and version>
- Model: <model and version>
- Tools: <enabled tools>
- Permissions: <mode>
- Time limit: <session limit>
- Repository commit: <starting task commit>
```

The proof range must show the skill being used and its contribution to the work. Hashes and line references establish location and freshness; a reviewer must assess what the session demonstrates.

## Commit and capture

Follow [setup](./setup.md). Commit required source artifacts, run `npm run evidence:seal`, capture `npm run evidence:verify` at that commit, then commit the manifest and capture. Submit `evidence/manifest.json` and `evidence/commands/verify.txt`.

The final verifier checks committed artifacts, the complete exercise source snapshot, actual session references, and capture freshness. It does not generate learner results. Each exercise uses one submission branch. The baseline and final reports describe observed work; separate `before.patch` and `after.patch` files are not required.

## Benchmark workspace

For evals 1–4, configurations `without_skill`, `starter_skill`, and `with_skill`, and runs 1–3, create:

```text
benchmark-workspace/eval-1/without_skill/run-1/
  outputs/incident-summary.md
  session.txt
  timing.json
  grading.json
```

Retain the complete agent session and the runtime's actual usage result in `session.txt`. Preserve unsuccessful iterations separately. Grade each saved output with `npm run eval:grade -- <eval-id> <output-path> <grading-path>`; do not edit generated grades.

## timing.json

```json
{
  "eval_id": 1,
  "configuration": "without_skill",
  "run_number": 1,
  "agent": "agent and version",
  "model": "model and version",
  "runtime": "runtime and version",
  "tools": ["enabled tool names"],
  "permissions": "mode",
  "repository_commit": "40-character fixed task base",
  "time_limit_minutes": 10,
  "attempt": 1,
  "skill_tree_sha256": null,
  "total_tokens": 1000,
  "duration_ms": 30000,
  "total_duration_seconds": 30
}
```

Use measured values, not the illustrative numbers. Document how runtime input/output/cache usage was counted, using the same convention across lanes. If a runtime has no token telemetry, change runtimes before evaluating. Use `null` for no-skill, the printed protected starter hash for `starter_skill`, and the validated candidate hash for `with_skill`.

## Reports and decision

Generate `evidence/benchmark.json` and `evidence/benchmark.md` with `npm run benchmark:aggregate`. Write `evidence/analysis.md` covering training failures, held-out quality, critical errors, variance, tokens, elapsed time, outliers, limits of automated grading, and adoption.

Create `evidence/decision.json`:

```json
{
  "schema_version": 1,
  "decision": "package",
  "benchmark_sha256": "SHA-256 printed by aggregation",
  "reason": "Measured decision tied to the published gate."
}
```

Use `package` only for a passing gate. Use `reject` when any gate fails, including critical errors, cost limits, or lack of added value. Explain what failed and the implication for distribution. A rejected candidate must have neither `dist/incident-summary.skill` nor `evidence/package-manifest.json`.

For a passing candidate, generate both with `npm run package:skill`, verify them, and force-add the archive before sealing. The archive, manifest, candidate files, complete workspace, sessions, and reports are all bound to the committed snapshot. Any later package change invalidates the seal.
