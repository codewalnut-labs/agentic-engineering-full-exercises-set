# Specialist Subagent NFR Review Design

## Goal

Use independent security, accessibility, performance, and testability reviews
to find hidden non-functional risks, then let one accountable integration
owner adjudicate and implement the highest-value fixes.

## Review contract

Each specialist reports severity, exact evidence, impact, recommendation, and a
verification method. Specialists do not edit production code. The main thread
records every finding as fix, defer, or dismiss with rationale.

## Implementation boundary

Only findings supported by the starter and suitable for deterministic local
tests are fixed in this exercise. Deferred risks require an owner and follow-up
condition; dismissed risks retain evidence explaining why no change is needed.
