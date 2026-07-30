# Release Notes Agent Skill Design

## Goal

Package the exercise's release-note workflow as a repository-local Agent Skill
that turns structured diff evidence into consistent, customer-facing notes.

## Design

Keep the skill instructions concise and put deterministic work in Node scripts.
The generator reads a release fixture containing changed files, change metadata,
owners, rollout/rollback details, and verification evidence. It publishes only
customer-facing, evidenced items; elevates breaking changes; suppresses internal
refactors; and lists incomplete work under a publication blocker section.

The verifier compares the generated notes with the fixture diff manifest,
checks the output snapshot and seeded risks, and runs trigger-positive and
trigger-negative smoke cases. Evidence is committed beside the exercise.

## Acceptance

- Agent Skill package under `.agents/skills/`.
- Generated release notes are deterministic and grouped by impact.
- Breaking changes are prominent and include rollback guidance.
- Missing-evidence changes are blocked from published sections.
- Internal-only changes are excluded.
- Trigger smoke cases and verification notes are present.
