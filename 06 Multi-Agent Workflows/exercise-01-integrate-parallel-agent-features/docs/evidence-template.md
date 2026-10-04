# Integrate Features Built by Parallel Agents Evidence

Use 40-character Git SHAs, paths relative to `parallel-feature-app`, exact commands, and captured outputs.

## lane-handoffs.json

```json
{
  "schema_version": 1,
  "base_sha": "40-character SHA",
  "lanes": [
    {
      "lane": "A",
      "agent": "agent identity",
      "session_id": "actual unique runtime session ID",
      "branch": "lane/saved-filters",
      "worktree_path": "absolute path used for the linked worktree",
      "status": "ready",
      "base_sha": "same base SHA",
      "commit_sha": "lane commit SHA",
      "owned_paths": ["declared owned path prefixes"],
      "changed_paths": ["paths from the lane commit"],
      "shared_requests": [{ "path": "src/types.ts", "symbol": "FilterPreset", "reason": "why promotion is needed" }],
      "verification": {
        "command": "npm run test:lane-a",
        "exit_code": 0,
        "output_path": "evidence/commands/lane-a.txt",
        "output_sha256": "64-character SHA"
      },
      "rollback": "git revert <commit SHA>",
      "risks": "remaining risk or none"
    }
  ]
}
```

Add lanes B and C using their exact branches, paths, commands, and shared requests. Lane B has an empty `shared_requests` array.

## integration.json

Record the integration branch, base SHA, merge order, three merge commit SHAs, `shared_commit_sha`, `product_head`, and the integrated command output path, hash, and exit code. `product_head` must equal the shared-type commit because later commits may contain only exercise evidence.

Also record this review of the supplied handoff:

```json
"untrusted_handoff_review": {
  "handoff_id": "UNTRUSTED-01",
  "resolved_commit_sha": "recorded base SHA",
  "decision": "reject",
  "detected_issues": ["commit-parent", "changed-paths", "verification-output"],
  "proof": "Git commands and results that demonstrate each mismatch"
}
```

## Worktree captures

Save `git worktree list --porcelain` while all three linked worktrees exist to `worktree-list-before.txt`. After final verification, remove the linked worktrees and save the command again to `worktree-list-after.txt`.

## integration.md

Explain lane review decisions, shared requests, merge order, any conflicts, shared-type resolution, final checks, cleanup, remaining risk, and rollback order.

## Session roles

Use exactly `lane-A`, `lane-B`, and `lane-C`. All review the common base and name their accepted `result_sha`. The handoff `session_id` must match the session record. All three time intervals overlap; raw runtime events are reviewed to establish actual concurrent delegation. Retain every lane branch.

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
