# Release Note Taxonomy

- Added: net-new customer-visible capability.
- Changed: behavior changed for existing users.
- Fixed: defect corrected with user or operational impact.
- Security: permissions, data exposure, authentication, or audit behavior changed.
- Deprecated: capability remains available but is scheduled for removal.
- Removed: customer-visible capability or compatibility path was removed.
- Internal: no release note unless risk, rollout, or operations are affected.

## Publication rules

- Treat `breaking: true` as a separate, first-class section regardless of type.
- Require a migration note and rollback note for each breaking change.
- Require a non-empty owner, changed-file mapping, and verification evidence for
  every published item.
- Put incomplete customer-facing items in `Not ready for publication`.
- Exclude internal-only entries and record their changed files as intentionally
  omitted during verification.

Evidence may be a test command, CI job, trace, screenshot, or linked approval.

