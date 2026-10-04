# Setup and verification

Install the named skill using the [upstream installation instructions](https://github.com/obra/superpowers#installation) for your agent. Record its installed revision or file hash and actual use. Use the repository's supported Node version from `.nvmrc`.

## Prepare the evaluation

Run `npm ci` and `npm run agent:check` from `review-skill-app/`. The framework checks should pass while the short starter skill is still inadequate for submission.

Prepare one Node adapter outside the repository using the [adapter contract](./evaluation-contract.md). It must start a real fresh agent session for every invocation, read the supplied prompt from stdin, and return that agent's unchanged JSON response. In the assisted lane it makes `REVIEW_SKILL_PATH` available to the agent; in the baseline lane it exposes no review skill. Keep provider credentials and diagnostics out of stdout. The scorer runs locally, but the adapter uses your configured agent and its normal access requirements.

Record `git rev-parse HEAD` as the starting commit in `evidence/before.md`. At this commit run each case once without the skill:

```text
npm run eval:run -- --lane before --case <case-id> --agent <agent> --model <model> --tools <tools> --permissions <permissions> --time-limit <minutes> --adapter <absolute-adapter-path>
```

Use the three IDs in `eval/cases.json`: `historical-regression`, `security-regression`, and `clean-control`. Baseline runs are captured before editing the skill. Keep their prompts, run JSON, and raw responses. The runner refuses to overwrite an existing attempt.

## Improve and measure

Use **[writing-skills](https://github.com/obra/superpowers/tree/main/skills/writing-skills)** in the authoring session to improve the supplied `regression-review` skill from the observed misses. Its prerequisite is familiarity with the test-driven-development cycle. Keep authoring guidance and baseline results out of the measured reviewer sessions.

Commit only `skills/regression-review/`. Do not change the app, case diffs, acceptance rules, adapter, or scorer. Record this SHA as the implementation commit.

Run all three cases again with `--lane after` and otherwise identical options. Each invocation starts a new session. Do not edit an agent response or selectively replace a weak result. Run:

```text
npm run eval:score
```

Inspect coverage, precision, the safe change, and the adoption decision. If improving again, preserve the complete assisted batch under `evidence/attempts/`, commit a new skill revision, and rerun all three assisted cases. Keep the original baseline. Explain every iteration and any remaining uncertainty.

Write `evidence/review-eval.md`, `before.md`, and `after.md` before capturing the evaluation check at the final skill commit:

```text
npm run proof:capture -- evaluation
```

The runner records prompts and raw adapter responses, not proof that an agent used a skill. Retain actual agent session exports when available and record the adapter's real command in the report. A human assesses review quality and whether the method generalizes beyond these three cases.

## Seal and submit

A SHA is a Git commit ID. The starting commit records the initial state; the implementation commit contains the measured fixes or skill. Subsequent commits contain evidence only.

1. Finish the reports, `evidence/skill-use.md`, `evidence/skill-session.txt`, and `evidence/source-audit.json` using the [evidence template](./evidence-template.md).
2. Commit all evidence artifacts before sealing them.
3. From the app directory, run:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

4. Commit `evidence/manifest.json` and `evidence/commands/verify.txt`, then run `npm run verify:exercise`. This final check is read-only.
5. Open one focused PR from your fork with the change, review findings, and accessible proof links. Approval and merging are not required.

Capture tools record actual stdout, stderr, exit codes, and commits. Preserve failed attempts before recapturing. If source changes after measurement, commit the repair and regenerate the affected proof and recheck. Keep dependencies, build output, unrelated work, and credentials out of the PR.

## References

- [writing-skills](https://github.com/obra/superpowers/tree/main/skills/writing-skills): the required workflow for this challenge.
