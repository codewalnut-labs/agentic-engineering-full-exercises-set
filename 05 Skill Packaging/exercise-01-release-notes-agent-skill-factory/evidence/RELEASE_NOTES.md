# Product release dashboard 2.4.0

Release date: 2026-07-30  
Compare: v2.3.0...v2.4.0

## Breaking changes

### RN-102 - Changed

Workflow responses now use the v2 status values.

- Owner: Mateo
- Evidence: npm test -- workflow-v2-contract
- Rollout: Deploy API compatibility monitoring before enabling v2.
- Migration: Replace queued_pending with queued before upgrading.
- Rollback: Restore the v1 response adapter.

## Added

### RN-101

Export filtered release results as CSV from the dashboard.

- Owner: Priya
- Evidence: npm test -- export-csv
- Rollout: Available to all dashboard users.
- Rollback: Disable the release-export feature flag.

## Security

### RN-103

Permission changes now produce an immutable audit event.

- Owner: Asha
- Evidence: npm test -- permission-audit
- Rollout: Enabled with the standard audit pipeline.
- Rollback: Revert the audit writer deployment.

## Not ready for publication

- **RN-104:** Release table filters remain selected after refresh. Missing verification evidence.

## Internal changes excluded

1 internal-only change was excluded from customer-facing notes.
