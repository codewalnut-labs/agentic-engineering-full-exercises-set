# Architecture

Single package: `com.codewalnut.support`. Small set of records plus a few
behaviour classes — no framework, no DI container.

## Domain model

- `CaseItem(id, workspace, status, openedAt)` — a support case, scoped to
  one workspace.
- `Membership(user, workspace, active)` — whether a user currently belongs
  to a workspace. Membership can be inactive without being removed.
- `Repository(cases, memberships)` — the in-memory store. Its constructor
  copies both lists (`List.copyOf`) so nothing outside the record can
  mutate stored state after construction.

## The customer-facing boundary: `CaseService`

`CaseService` is the access boundary for anything customer-facing. Every
read method must confirm the requesting user has an **active** membership
in the requested workspace before returning data, and must throw
`SecurityException` when they don't — including when the user has access
to a *different* workspace. `visibleCases` is the reference implementation
of this pattern. Any new customer-facing read belongs behind the same kind
of check, not behind a direct `Repository` read.

## `ReportController`

Wraps `CaseService` and takes a constructor-injected `java.time.Clock`.
Reporting/summary features that need "now" belong here, using the injected
clock — never `Instant.now()` — so behaviour stays deterministic in tests.
New reporting operations should reuse `CaseService` for access-checked data
rather than reading `Repository` directly.

## The legacy exception: `LegacyExport`

`LegacyExport` is an older support-admin utility, kept for internal
investigations. It predates customer workspaces and workspace-scoped
access: it reads the entire `Repository` directly and does not check
membership. It is intentionally exempt from the `CaseService` boundary —
it is not a pattern to copy. When adding customer-facing behaviour, do not
route it through `LegacyExport`, and do not use its unchecked,
repository-wide read style as a model for new code. If a task asks you to
touch it, treat it as internal-only tooling, not a customer surface.
