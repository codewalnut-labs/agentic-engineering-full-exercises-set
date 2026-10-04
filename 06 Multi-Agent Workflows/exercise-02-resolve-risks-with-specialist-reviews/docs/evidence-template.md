# Resolve Release Risks with Specialist Reviews Evidence

Use 40-character Git SHAs, repository-relative source paths, exact commands, and captured outputs.

## review-cycle.json

```json
{
  "schema_version": 1,
  "baseline_sha": "40-character SHA",
  "remediation_sha": "40-character SHA",
  "performance": {
    "before_path": "evidence/performance-before.json",
    "before_sha256": "SHA-256",
    "after_path": "evidence/performance-after.json",
    "after_sha256": "SHA-256"
  },
  "specialists": [
    {
      "specialist": "security",
      "before": {
        "agent": "agent name",
        "session_id": "unique session ID",
        "reviewed_sha": "baseline SHA",
        "report_path": "evidence/specialists/security-before.md",
        "report_sha256": "SHA-256",
        "command": "npm run review:security",
        "exit_code": 1,
        "output_path": "evidence/commands/security-before.txt",
        "output_sha256": "SHA-256",
        "findings": [
          {
            "id": "SEC-01",
            "severity": "blocker",
            "path": "specialist-review-app/src/components/ReviewNote.tsx",
            "line": 1,
            "reproduction": "what was executed or inspected",
            "impact": "concrete user or system impact",
            "recommendation": "smallest verifiable fix"
          }
        ]
      },
      "after": {
        "agent": "agent name",
        "session_id": "new session ID",
        "reviewed_sha": "remediation SHA",
        "report_path": "evidence/specialists/security-after.md",
        "report_sha256": "SHA-256",
        "command": "npm run review:security",
        "exit_code": 0,
        "output_path": "evidence/commands/security-after.txt",
        "output_sha256": "SHA-256",
        "result": "pass"
      }
    }
  ]
}
```

Add accessibility, performance, and testability using their exact commands and paths. Before outputs must show the protected failure at the baseline SHA; after outputs must show a pass at the remediation SHA.

## decision-log.json

Record one decision per unique baseline finding and supplied `CLAIM-01` with `finding_id`, `decision`, `owner`, `rationale`, `verification`, and `residual_risk`. Also record `merge_decision`, `rollback`, the two SHAs, and the exact remediation paths relative to `specialist-review-app`.

Record the shared security-testability boundary in this form:

```json
"interactions": [
  {
    "finding_ids": ["SEC-02", "TEST-01"],
    "shared_path": "src/services/accessReviewApi.ts",
    "resolution": "how one boundary change addresses both findings",
    "verification_commands": ["npm run review:security", "npm run review:testability"],
    "residual_risk": "remaining interaction risk or none"
  }
]
```

## Performance

Run `npm run measure:performance -- --ref <SHA> --out <path>` at the baseline and remediation SHAs. Do not change sample size or iterations between measurements.

## Session roles

Use exactly `security-before`, `accessibility-before`, `performance-before`, `testability-before`, and the four matching `-after` roles. Session IDs must match the review cycle. Before roles inspect `baseline_sha`; after roles inspect `remediation_sha`. Every phase includes concurrent reviews and all baseline reviews finish before rechecks.

## Baseline and completed observations

This exercise compares the starting workflow with the verified result. It does not require matched model runs or before/after patches.

- `evidence/before.md`: use `## Conditions`, `## Findings`, and `## Proof`. Record the clean base/baseline SHA, runtime, model, tools, permissions, starting defects, role scope, and exact initial results.
- `evidence/after.md`: use the same headings. Record final product/control/remediation SHAs, verified behavior, accepted decisions, command references, and remaining risks.
- `evidence/comparison.md`: use `## Changes`, `## Verified`, and `## Remaining questions`. Explain what improved, what the proof establishes, and what still needs human judgment.

## Skill use

Include `evidence/skill-use.md` and the actual coordinator invocation/session in `evidence/skill-session.txt`. Create one `## <skill-name>` section per required skill, with `Source:`, `Revision:` (40-character Git SHA) or `SHA-256:`, `Invocation:`, and `Proof: evidence/skill-session.txt:L<first>-L<last>`. Record installed path, installation method, runtime/version, model, tools, and permissions. Cite the actual invocation and its use, not a statement that the skill exists.

## Actual agent sessions

Use `evidence/agent-sessions.json`:

```json
{
  "schema_version": 1,
  "sessions": [
    {
      "role": "required role for this exercise",
      "session_id": "actual unique runtime session ID",
      "agent": "runtime and agent identity",
      "model": "actual model",
      "tools": "available tools",
      "permissions": "actual permissions",
      "reviewed_sha": "full source SHA given to this agent",
      "result_sha": "accepted implementation SHA, for implementers only",
      "started_at": "ISO timestamp from the runtime",
      "finished_at": "ISO timestamp from the runtime",
      "prompt_path": "evidence/prompts/role.md",
      "transcript_path": "evidence/sessions/role.txt",
      "proof": "evidence/sessions/role.txt:L1-L10"
    }
  ]
}
```

Every role has its own retained prompt and raw session export. Include the task SHA in the prompt and transcript; preserve runtime/tool events, scope, commands, results, and returned handoff or review. Export actual records, using one clock/timebase across sessions. Do not replace raw transcripts with reports or invented agent messages. The cited line range must show meaningful work.

## Capture and seal

Use `workflow:capture` for focused commands and the exact capture paths listed above. Hash the recorded final bytes for handoffs and reviews. All required artifacts, prompts, and raw sessions must be committed before `evidence:seal`.

The seal binds the full source tree and committed artifacts. Run `evidence:capture` at that same commit, commit the generated `evidence/manifest.json` and `evidence/commands/verify.txt`, and then run the read-only `verify:exercise` gate. See [setup](./setup.md) for exact commands and history rules.

A valid record does not independently prove agent identity, isolation, parallel execution, or review quality. A reviewer checks the referenced actual sessions and product behavior. Keep discrepancies and remaining uncertainty visible.
