# Routing Measurement Contract

The protected `evals/recorded-runs.json` contains 36 response-bound benchmark observations. They are curated synthetic inputs for reproducible offline scoring, not production-provider telemetry. Create `evidence/routing-measurements.json` with one entry for every observation. Preserve its sample key, response hash, input/output tokens, latency, quality score, and safety result, then calculate `callCostUsd` from `evals/pricing.json`.

Create `evidence/measurement-run.json` with `schemaVersion: 1`, `packId: "routing-measurements-v1"`, `packSha256` (SHA-256 of the pack text with LF line endings), `runsPerLane: 3`, `scorerVersion: 1`, and `sourceSha` (the final router implementation commit). The repository pins LF line endings for these inputs.

For each observation, calculate `callCostUsd = (inputTokens * inputRate + outputTokens * outputRate) / 1_000_000`, rounded to ten decimal places. Rates come from the matching tier in `pricing.json`; they are practice prices, not a live price list.

The scorer prices every first call and adds the cost and latency of one additional attempt when it misses its quality floor or safety check. Fast escalates to balanced, balanced to reasoning, and reasoning retries once on reasoning. Run N is paired with run N in the next tier. A reasoning retry reuses its observation as a simulation assumption, not an independently recorded call. Results are the mean of three runs. The all-reasoning comparator follows the same rule. Do not edit the generated cost model.

Adoption requires correct routes, complete reconciled measurements, each case's first-call mean quality floor, no failed retry quality checks, no safety failures in attempted calls, and at least 25% expected savings. Latency and quality range are reported for judgment; this fixture does not define a latency SLA. No safety failure can be hidden by averaging. Completing a valid evaluation and correctly rejecting a policy satisfies the challenge; do not change the protected data to obtain an adoption result.

This pack makes cost results deterministic and free to run. A bring-your-own-key experiment may be documented separately, but it is outside verification.
