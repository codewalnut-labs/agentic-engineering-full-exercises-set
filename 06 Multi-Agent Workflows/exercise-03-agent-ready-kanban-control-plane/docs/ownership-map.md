# Ownership and Isolation Map

| Card | State | Owner | Reserved paths | Collision rule |
|---|---|---|---|---|
| ESC-118 | needs-info | Support escalation owner | schedule ordering after reproduction | Cannot edit shared schema concurrently |
| ESC-119 | ready-for-human | Content design | approved copy catalog | Human approval before agent work |
| ESC-120 | ready-for-agent | Severity agent | `escalationSeverity.ts` and test | No schema/UI edits |
| ESC-121 | blocked | Export service owner | export service files after trace | Measurement required first |
| Integration | active | Accountable main thread | board UI, docs, evidence, dependencies | Sole merge/conflict authority |

Shared escalation types are integration-owned. A card needing them must be
serialized behind the current merge queue rather than launched in parallel.
