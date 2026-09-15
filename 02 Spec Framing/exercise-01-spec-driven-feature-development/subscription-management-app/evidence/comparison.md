# Spec Framing Comparison

## Fair Comparison

Both sessions used the same conditions. The only intended difference is that the after session had `specs/clarifications.md`.

| Condition | Before | After | Same? |
|---|---|---|---|
| Starting commit | fb48d936ec2e6e205478614a4af4d2550662f650 | fb48d936ec2e6e205478614a4af4d2550662f650 | Yes |
| Product request | Allow users to manage their subscriptions. | Allow users to manage their subscriptions. | Yes |
| Agent and model | Cursor Grok 4.6 | Cursor Grok 4.6 | Yes |
| Tools and permissions | Read, Write, Glob, Grep, Shell; workspace read and write | Read, Write, Glob, Grep, Shell; workspace read and write | Yes |
| Time limit | 30 minutes | 30 minutes | Yes |
| Human hints | 0 | 0 | Yes |
| Attempts | 1 | 1 | Yes |

## Results

| Metric | Before | After |
|---|---|---|
| Invented decisions | 4 | 0 (2 explicit assumptions recorded) |
| Missed questions | 5 | 0 |
| Testable acceptance criteria | 7 | 9 |
| Traceability gaps | 0 | 0 |
| Validation result | Not run | `npm run spec:verify` pass |

## Improvements

### Improvement 1: Cancellation is owner-only

Q1 recorded the Security conflict instead of granting every billing admin cancel rights. REQ-001 and AC-002 restrict cancellation to `account_owner`. Affected file: `specs/spec.md`.

### Improvement 2: Downgrades and cancellations wait until term end

Q2 resolved the Finance vs Support disagreement using provider constraints. REQ-003 and AC-005 schedule those changes for the end of the billing term instead of inventing immediate credits and refunds. Affected file: `specs/spec.md`.

### Improvement 3: One pending request at a time

Q3 cited the provider conflict response and seeded ACCT-1188 data. REQ-005 and AC-007 block a second submission instead of inventing a multi-item queue. Affected file: `specs/spec.md`.

### Improvement 4: Safe failure recovery

Q4 required lifecycle states, idempotent retries, and translated errors. REQ-006 and AC-008 replace raw provider messages and blind 60-second auto-retry. Affected file: `specs/spec.md`.

### Improvement 5: Explicit scope boundary

Q5 recorded enterprise approval as an assumption, not silent product design. REQ-007 and AC-009 keep that workflow out of scope. Affected file: `specs/spec.md`.

## Proof

`evidence/before.patch` and `evidence/after.patch` are the Git diffs from the shared starting commit to each implementation commit. After adds `specs/clarifications.md` and replaces invented billing, pending-queue, and error behavior with Q1–Q5 decisions traced into REQ-001, REQ-003, REQ-005, REQ-006, and REQ-007.

## Conclusion

Clarification made the specification safer to implement. The before session converted guesses into confident requirements for immediate refunds, multiple queued changes, and raw provider errors. The after session records five evidence-based decisions, three confirmed and two explicit assumptions, and traces authorization, billing timing, pending changes, failure recovery, and out-of-scope behavior into plan items and tasks.
