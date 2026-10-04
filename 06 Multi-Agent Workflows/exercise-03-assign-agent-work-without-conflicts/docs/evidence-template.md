# Assign Agent Work Without Ownership Conflicts Evidence

Use 40-character Git SHAs, paths relative to `agent-task-board-app`, exact commands, and captured outputs.

## control-plane.json

```json
{
  "schema_version": 1,
  "base_sha": "40-character SHA",
  "lane": {
    "card_id": "ESC-120",
    "agent": "agent identity",
    "session_id": "actual implementer session ID",
    "branch": "lane/esc-120-inherited-severity",
    "base_sha": "same base SHA",
    "commit_sha": "lane commit SHA",
    "owned_paths": ["src/utils/scoring.ts", "src/components/SeverityBadge.tsx", "tests/esc-120/"],
    "changed_paths": ["exact paths from Git"],
    "verification": {
      "command": "npm run feature:verify",
      "exit_code": 0,
      "output_path": "evidence/commands/esc-120.txt",
      "output_sha256": "SHA-256"
    },
    "reviewer": "risk-owner",
    "review_session_id": "actual independent reviewer session ID",
    "review_decision": "accept",
    "review_path": "evidence/completed-lane.md",
    "review_sha256": "SHA-256",
    "rollback": "git revert -m 1 <merge commit SHA>"
  },
  "integration": {
    "branch": "integration/kanban-control",
    "merge_commit_sha": "no-ff merge commit SHA",
    "control_commit_sha": "following control commit SHA",
    "board_verification": {
      "command": "npm run board:verify",
      "exit_code": 0,
      "output_path": "evidence/commands/board.txt",
      "output_sha256": "SHA-256"
    },
    "decision": "accept"
  }
}
```

`completed-lane.md` records the base and lane SHAs, ownership review, changed paths, focused result, reviewer decision, integration SHA, rollback, and remaining risk.

The feature commit contains only the owned source and test paths. Board, ownership, integration, and evidence updates come after the merge.

## Assignment record and roles

Use exactly `implementer` and `reviewer`. The implementer reviews `base_sha` and names the accepted lane `result_sha`; the reviewer inspects that lane commit after implementation finishes. Match their IDs to `lane.session_id` and `lane.review_session_id`. Record both requirements and quality in the completed-lane review.

Before dispatch, create `evidence/assignment.json` with `schema_version: 1`, `base_sha`, and `assignments` containing only `{ card_id: "ESC-120", session_id: <implementer-ID>, state: "ready-for-agent", reserved_paths: <the three owned paths>, blocked_by: [] }`. Add `withheld` records for ESC-118, ESC-121, and ESC-122, each with `card_id` and a concrete `reason`. Retain the actual coordinator triage in the skill session before dispatch.

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
