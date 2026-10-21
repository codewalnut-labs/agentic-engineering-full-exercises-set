# Agent guidance

Java 21 support-case app for customer workspaces. A customer-facing case
service and an older internal export tool live in the same package — they
follow different rules. Read the task-specific file below before changing
code; each is short and scoped to one concern.

## Where to look

- **Touching domain model, access control, or the legacy export?**
  Read [.agent/architecture.md](.agent/architecture.md) first.
- **Writing or changing Java code?**
  Read [.agent/conventions.md](.agent/conventions.md) for the patterns this
  codebase already uses.
- **Adding or running tests?**
  Read [.agent/testing.md](.agent/testing.md) — there is no JUnit/Maven here.
- **Running commands or preparing a change for verification?**
  Read [.agent/workflow.md](.agent/workflow.md).

Also read [docs/maintenance-notes.md](docs/maintenance-notes.md) — it
records constraints (deterministic time, no mutation of stored records,
existing integrations) that apply to any change in this repository.

## Ground rules

- Preserve existing public behaviour and signatures unless a change request
  says otherwise; other code depends on them.
- Never mutate data held by `Repository` — construct new values instead.
- Don't model new customer-facing code on `LegacyExport`; see
  [.agent/architecture.md](.agent/architecture.md) for why.
- Keep documentation changes (this file and anything under `.agent/`) in
  their own commit, separate from behaviour changes.
