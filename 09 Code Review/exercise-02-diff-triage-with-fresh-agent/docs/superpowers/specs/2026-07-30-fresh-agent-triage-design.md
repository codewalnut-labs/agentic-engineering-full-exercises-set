# Fresh-Agent Diff Triage Remediation Design

## Goal

Use a reviewer with no implementation context to identify risks in `pr/review-target.diff`, verify each claim against the app, and patch only confirmed merge blockers.

## Design boundary

- Cached workflow items must be parsed and structurally validated; malformed or stale cache falls back safely to fresh fixtures.
- Sorting must operate on a copy so shared fixtures retain canonical order.
- Successful saves must update the cached collection immediately.
- Filter changes must never delete persisted workflow state.
- Evidence collection must remain read-only and must not overwrite newer cached work with fixtures.

## Verification

Apply the supplied implementation diff, add service-level regressions that fail for each accepted blocker, implement a focused cache adapter, and run the focused suite before one complete project gate. The review report records fresh-agent findings plus the accountable owner's fix/defer/dismiss decision.
