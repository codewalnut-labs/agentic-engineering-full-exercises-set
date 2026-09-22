# Agent Hook Evidence

Record observed behavior, not expected results presented as a completed run. Keep failed attempts, human edits, corrections, and retries in the raw transcript. Only the accepted attempt for each scenario belongs in the structured event index. No matched before/after branches or patches are required.

## Reports

- `evidence/before.md`: use `## Conditions`, `## Findings`, and `## Proof`. Record the starting commit, agent/version, model, tools, permissions, existing configuration, baseline check output, and which team rules currently lack executable support.
- `evidence/after.md`: use the same headings. Record the setup commit, fresh final session ID, hook activation, elapsed time, probe results, human input, and final verification.
- `evidence/comparison.md`: use `## Changes`, `## Verified`, and `## Remaining questions`. Compare initial gaps with actual observations. Identify unsupported routes and unresolved results honestly.
- `agent-hooks-app/docs/hook-setup.md`: explain reproducible activation, rule-to-hook mapping, check freshness, failure handling, and limits.
- `evidence/raw/session.txt`: retain the complete agent transcript for probes and the fresh final task, including tool requests, results, hook feedback, and session IDs. Additional runtime debug logs go under `evidence/raw/`. Redact credentials if incidental personal configuration exposes them; identify redactions without changing outcomes.

## Setup inventory: `evidence/hooks.json`

Record `agent` (`claude-code` or `codex`), `version`, `model`, `permissions`, `setupCommit` (full SHA), `finalSessionId`, and `retryLimit` (1–10). Record every native configuration, handler, and required resource in `files`:

```json
{
  "path": "agent-hooks-app/<your-hook-file>",
  "kind": "handler",
  "sha256": "<SHA-256 after normalizing CRLF to LF>"
}
```

Kinds are `config`, `handler`, and `resource`. Inventory paths are relative to the exercise. Configuration must be project-local and committed before the fresh final session. Include all script dependencies; a reviewer checks native wiring and dependency coverage rather than inferring it from filenames.

Also include `activationProof`, `missingCheckProof`, and `retryLimitProof`. Activation must show the fresh session loading/trusting this configuration. Missing-check and retry-limit proofs may come from handler-level tests; show follow-up on missing verification and a bounded, explicitly unresolved result when checks keep failing. Each proof uses:

```json
{
  "path": "evidence/raw/<captured-log>.txt",
  "line": 12,
  "excerpt": "<exact text beginning at that one-based line>"
}
```

Examples above describe fields; they are not completed evidence.

## Runtime index: `evidence/events.json`

Use an object containing `events: []`. Index relevant events chronologically from the retained native logs. Each entry needs:

- Unique `id`, supplied `scenario` ID, ISO timestamp `at`, actual `sessionId`, native `event`, normalized `result`, useful `reason`, and a raw-log `proof` in the format above.
- For tool events: actual `toolUseId` and `toolName`. The allowed-edit pre/post records must identify the same native call.
- For checks: `command: "npm run check:changes"`, actual `exitCode`, `checkedDigest` from before the check, and `sourceDigest` from afterward. Use `hooks:snapshot` output. Normalize the outcome to `check-passed` or `check-failed`; successful checks require matching before/after digests.
- For protected probes: `event: "PreToolUse"`, `result: "denied"`, `target: "config/production.json"`, `route: "edit"` or `"shell"`, and `beforeDigest`/`afterDigest` of the fixture using normalized SHA-256. The shell record also contains the exact supplied `command`. Preserve independent fixture-hash captures in the raw log.
- For the failing tool: `result: "tool-failed"`, the supplied `command`, and `exitCode: 7`. Use the failure event supported by your runtime.
- For completion: `event: "Stop"`, `result: "continue"` or `"ready"`, and the current `sourceDigest`. A check executed inside Stop gets its own check-result entry.

Other normalized results are `allowed` for a successful pre-tool decision and `denied` for rejection. The normalization is an index for comparison: retain the original native event payload and output in the cited logs. An allowed return may be implicit in the runtime; explain the mapping.

Required sequences:

1. `allowed-edit`: allowed pre-tool call, then a passing post-tool check for that call.
2. `protected-edit` and `protected-shell`: denied before execution with unchanged fixture hashes.
3. `failed-change`: failing automatic post-tool check, correction, then a passing post-tool check.
4. `failed-tool`: actual nonzero tool result and failure feedback.
5. `stale-check`: passing check, recorded human edit, Stop follow-up for a different source digest, fresh passing check, accepted completion.
6. `final-task`: fresh session, automatic post-tool check for the final submitted source, then accepted completion for that same source.

## Source audit and final capture

Create `evidence/source-audit.json` with `claims: []`: one claim per topic `boundaries`, `verification`, and `completion`. Each claim has a unique `id`, `topic`, `status` (`supported`, `contradicted`, or `unresolved`), explanatory `reason`, an `artifact` citation into your hook setup document, and `sources` citations into the supplied rules or retained raw logs. Citations use `path`, `line`, and `excerpt`. This connects the setup's claims to actual rules and observations.

Follow the commit/capture order in [setup](./setup.md). `evidence:seal` creates `evidence/manifest.json` covering reports, raw logs, submitted source, and inventoried hook files. The shared capture command creates `evidence/commands/verify.txt` with command, commit, timestamps, output, and exit status.

Offline verification checks consistency and freshness, not the authenticity or semantic truth of a transcript. Reviewers inspect the original runtime evidence and may replay the setup with another small task.
