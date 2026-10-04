# Setup and verification

Use the Node version in the repository's `.nvmrc`. Install the named skill using its [upstream instructions](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering#installation) for your agent. Keep its full directory and referenced resources; record the installed revision or file hash. Complete this challenge independently of the other exercises.

## Policy and measurement

Run `npm ci` and `npm run agent:check` from `model-routing-eval-app/`. Record `git rev-parse HEAD` as `Starting commit: <full SHA>` in `evidence/before.md`, then run `npm run proof:capture -- baseline`.

Use **[evaluation](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/tree/main/skills/evaluation)** to examine the provided comparison and its limits. Keep the protected cases, prices, recorded responses, and grading unchanged.

Implement `src/routing/routeTask.mjs` and `tests/route-task.test.mjs`. Use task fields, not case IDs or fixture text. The protected `dispatchTasks.mjs` consumer must skip model execution for clarification routes. You may iterate and commit focused changes.

At the final implementation commit, produce the measurements and `measurement-run.json` described in the [measurement contract](./measurement-contract.md), using that full `sourceSha`. Then run:

```text
npm run routing:score
npm run proof:capture -- implementation
```

Scoring writes `evidence/cost-model.json`; do not hand-edit it. A valid evaluation exits successfully whether the policy is adopted or rejected; malformed measurements or incorrect routes fail verification. The capture reruns protected routing checks and recomputes the submitted scorecard. Explain all failed gates in your adoption decision.

The all-reasoning cost comparator covers the same executable cases as the policy. Clarification-only cases have no recorded model runs and are excluded from that cost comparison; their safe handling is checked separately. Latency is reported, not gated by a supplied production SLA.

## Seal and submit

A SHA is a Git commit ID. The starting SHA identifies the supplied starter, the implementation SHA identifies your final source, and the manifest SHA identifies the later evidence commit.

1. Finish the reports, `evidence/skill-use.md`, `evidence/skill-session.txt`, and `evidence/source-audit.json` using the [evidence template](./evidence-template.md).
2. Commit all evidence artifacts. After the final implementation commit, keep subsequent commits limited to evidence.
3. From the app directory, run:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

4. Commit `evidence/manifest.json` and `evidence/commands/verify.txt`, then run `npm run verify:exercise`. This final check is read-only.
5. Open one focused PR from your fork with the change, decision, and accessible evidence links. Approval and merging are not required.

Capture tools retain actual output, timestamps, commit IDs, and exit codes. Preserve failed captures under `evidence/attempts/` before recapturing. If you fix source after measurement, commit the fix, update the implementation SHA, regenerate affected proof, then recommit and reseal the evidence.

## Why this workflow

[Anthropic's routing workflow](https://www.anthropic.com/engineering/building-effective-agents) describes directing different tasks to appropriate models. This challenge applies that idea to a fixed offline benchmark so quality and cost can be checked without provider access.
