# Setup and verification

Use the Node version in `.nvmrc`. Install **[evaluation](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/tree/main/skills/evaluation)** using the [upstream instructions](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering#installation). Record its revision and actual use.

## Prepare the experiment

Run `npm ci` and `npm run agent:check` from `workflow-eval-app/`. Record the untouched workflow commit as `baselineSha` in `evidence/history.json`. Keep the [thresholds](./benchmark-contract.md) fixed. Use the [failure traces](./failure-traces.json) to form a hypothesis before reading evaluation outcomes.

Create `evidence/runner.json` with these fields:

```json
{
  "command": "<absolute executable path>",
  "args": ["<absolute adapter script path>"],
  "agent": "<agent name and version>",
  "model": "<exact model>",
  "settingsHash": "<hash of fixed model settings>",
  "toolsHash": "<hash of fixed tools>",
  "permissionsHash": "<hash of fixed permissions>",
  "timeLimitMinutes": 5
}
```

Use an adapter outside the exercise source tree. For example, `command` can be your Node executable and `args` a provider adapter script. Keep credentials in the environment, never in evidence. The adapter receives one JSON object on stdin: `workflow`, `request`, and `responseSchema`. It must start a fresh agent/provider session for each invocation and return one JSON object on stdout with `sessionId`, `tokens`, `metricsSource`, and `response`. The response follows [action-schema.md](./action-schema.md); `tokens` comes from actual session usage and `metricsSource` identifies that session. Send adapter diagnostics to stderr. No provider-specific adapter is supplied.

## Run and decide

1. At `baselineSha`, run `npm run workflow:run -- baseline`. The runner sends only case requests, workflow text, and the response schema. It does not send assertion answers. It records all 24 raw outputs, timestamps, elapsed durations, hashes, and run metadata.
2. Change only `workflow/instructions.md` in one candidate commit directly after `baselineSha`. Keep held-out requests and results out of the candidate-authoring session; use the supplied failure traces to support the change. Record it as `candidateSha` in history. Keep analysis and run files uncommitted until after this source commit.
3. At `candidateSha`, run `npm run workflow:run -- candidate` with the same runner configuration. Do not tune on held-out outcomes or retry selected failures.
4. Run `npm run workflow:score`, then `npm run evidence:patches`. These generate the benchmark and Git-bound patches. A valid benchmark may reject the candidate. In `evidence/adoption.md`, write exactly `Decision: adopt` or `Decision: reject` to match `benchmark.adopt`, and explain each failed gate.
5. Run `npm run proof:capture -- implementation` to capture the benchmark/history check at the candidate commit. Retain every raw run even when it fails a quality check.

An interrupted or invalid batch is not usable evidence. Archive the whole attempt before starting a complete replacement batch under the same frozen conditions. After seeing held-out outcomes, further tuning needs new unseen cases; that follow-up is outside this challenge.

## Finish and verify

Use the [evidence template](./evidence-template.md) to complete the reports, `evidence/skill-use.md`, `evidence/skill-session.txt`, and `evidence/source-audit.json`. Commit all required evidence after the final source commit. From the app directory, run:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

Commit the manifest and final capture, then run `npm run verify:exercise`. This last command reads existing evidence without generating it. Open one focused PR with proof links; approval and merging are not required. Archive failed captures under `evidence/attempts/` before regenerating them and resealing.

## Research reference

[Anthropic's evaluation guidance](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) distinguishes tasks, repeated trials, transcripts, and graders. This small replay benchmark is evidence for a local workflow decision, not a broad reliability guarantee.
