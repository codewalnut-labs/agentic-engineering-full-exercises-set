# Integration Note

Date: 2026-07-30  
Integration owner: accountable main thread

## Accepted

- ESC-120 lane commit `acab4d0` was accepted and cherry-picked as `b5d186a`.
- Owned-file audit: only `src/escalationSeverity.ts` and its test.
- Lane verification: one test file, three tests passed.
- The control-plane UI and documentation were accepted from the integration
  branch because those shared files are integration-owned.

## Revised

- ESC-118 was revised from a vague customer report to `needs-info` with a
  required sanitized reproduction and expected-order approval.
- ESC-119 was moved to `ready-for-human`; an agent may inventory strings but
  cannot approve customer-facing copy.
- ESC-121 was moved to `blocked` until a trace and target SLO identify the
  bottleneck.

## Rejected

- Parallel lanes that edit the shared escalation schema were rejected.
- Premature agent assignment for ESC-118 and ESC-121 was rejected because
  reproduction/measurement gates are not satisfied.
- Autonomous final-copy decisions for ESC-119 were rejected.

## Merge order

ESC-120 is first and complete. Remaining cards stay outside the merge queue
until their exit criteria are satisfied. The integration owner is the sole
authority for shared-file conflicts.
