# Agent-Ready Kanban Board

## ESC-118 - Reproduce escalation order after schedule override

- State: `needs-info`
- Owner: Support escalation owner
- Area: schedule ordering
- Goal: Preserve a reproducible escalation order after an override.
- Missing input: account-safe fixture, original schedule, override payload,
  expected order, observed order, and timestamp/time-zone data.
- Isolation: no worktree until reproduction is attached.
- Exit criteria: reproduction fails deterministically and expected order is
  approved by the escalation owner.

## ESC-119 - Rewrite escalation copy

- State: `ready-for-human`
- Owner: Content design
- Area: customer-visible escalation copy
- Goal: Approve tone, terminology, localization scope, and legal language.
- Agent boundary: an agent may inventory strings but may not choose final copy.
- Files: copy catalog only after human approval; no shared schema edits.
- Exit criteria: approved copy matrix and named reviewer.

## ESC-120 - Correct inherited-incident severity

- State: `ready-for-agent` (implementation lane completed)
- Owner: Severity agent; reviewer: escalation domain owner
- Branch/worktree: `lane/esc-120-severity` / `wt-kanban-lane-esc120`
- Reproduction: an inherited incident with parent severity `critical` and local
  severity `medium` currently resolves to `medium`.
- Expected: inherited incidents use the higher of parent and local severity;
  non-inherited incidents retain local severity.
- Owned files: `src/escalationSeverity.ts`,
  `src/escalationSeverity.test.ts`.
- Command: `npm exec --yes vitest@3.2.4 run src/escalationSeverity.test.ts`
- Acceptance: critical > high > medium > low; inherited chooses the higher;
  non-inherited keeps local; invalid values are impossible through the type.
- Merge criteria: focused tests pass, diff contains only owned files, integration
  owner accepts the commit.

## ESC-121 - Export timeout for large accounts

- State: `blocked`
- Owner: Export service owner
- Area: export transport and pagination
- Missing input: sanitized account size, trace, timeout boundary, payload size,
  backend ownership, and target SLO.
- Isolation: reserve `src/services/export*`; do not edit shared escalation
  schema or UI until the bottleneck is measured.
- Exit criteria: trace identifies client, network, or server bottleneck and the
  service owner approves a measurable acceptance threshold.

## Merge queue

1. ESC-120 severity utility - integration owner reviews and cherry-picks.
2. ESC-118 only after reproduction and schema-collision review.
3. ESC-119 only after human copy approval.
4. ESC-121 only after measurement and service-owner approval.

The integration owner resolves cross-card conflicts and may reject any lane
that exceeds its owned paths.
