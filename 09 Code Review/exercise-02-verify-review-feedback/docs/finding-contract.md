# Fresh Review Evidence Contract

Record the independent conditions in `evidence/reviewer-session.json`: a unique session ID, tool or model, start time, `contextMode: "fresh"`, the exact provided files, and excluded context.

Use `schemaVersion: 1`, `sessionId`, `tool`, `startedAt` (ISO format), and `promptSha256` (SHA-256 of the original prompt with LF newlines). `providedFiles` must contain exactly `docs/review-brief.md`, `fixtures/manifest.json`, and `pr/review-target.diff`. `excludedContext` must list `instructor answer key`, `earlier reviews`, `expected finding IDs`, and `implementation chat`. The reviewer may inspect the protected source in a separate clone; the coordinator retains this metadata outside that review workspace.

Set `reviewerSessionId` in `review.json` to this actual session ID. Preserve the original response before the coordinator reads the earlier claim or uses receiving-code-review to triage it.

Create `evidence/review.json` with `schemaVersion: 1`, protected base/head/comparison values, the source commit SHA, `mergeDecision: "request-changes"`, and all required findings.

Each finding needs its stable ID, classification, severity, confidence, file, a short exact code `anchor` copied from the protected diff, scenario, impact, and evidence. A blocker also needs its focused fix and a learner test under `tests/`. An unsupported claim needs `dismissalProof` describing the inspected path and reproduction result.

Use the full 40-character commit containing only the focused source fixes and learner tests as `sourceSha`. Later commits may add evidence only. Keep `review.md` consistent with the structured review.

Name at least one regression for each confirmed finding with the finding ID in square brackets, for example `[CACHE-7] preserves saved state`. Run `npm run test:regression-proof`. The verifier reads structured Vitest results, requires every named finding test to fail on the protected risky head, rejects collection or import failures, and requires the same tests to pass on the remediation.
