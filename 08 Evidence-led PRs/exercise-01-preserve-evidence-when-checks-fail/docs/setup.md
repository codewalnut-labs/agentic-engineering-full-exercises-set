# Setup and verification

## What you are doing

The pack must truthfully report the fixture's failed checkout check. A passing pack verifier means the evidence is correct; it does not mean checkout passed.

A **SHA** is a Git commit ID. The starting commit describes the inspected starter. The implementation commit contains the finished code; generated proof names that commit. The sealed commit contains the submitted evidence; the final verification capture names that later commit.

## Prepare

Read the supplied draft and reviewer comment in the [PR review brief](./pr-review-brief.md). Your submission must correct the PR description and answer that comment using generated proof.

Use the repository's `.nvmrc` version (Node 22.12 or newer within the supported range). From `failed-check-evidence-app/`, run:

```text
npm ci
npm run agent:check
```

Install **[verification-before-completion](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** using the [upstream installation instructions](https://github.com/obra/superpowers#installation) for your coding agent. Record the actual installed revision or skill hash. Ask the agent to use it when checking each PR claim, and retain the actual invocation and command results.

The generator does not exist yet. `npm run pack:verify` should fail until the implementation and generated pack exist.

Create `scripts/generate-pr-evidence.mjs` in the starter app and `.github/workflows/evidence-led-pr-01.yml` at the repository root, following the [output contract](./evidence-contract.md) and [PR brief](./pr-brief.md). Keep the supplied action pins; they are fixed exercise inputs.

The main fixture intentionally produces generator exit code `1`. That is a correct result: the pack must still be complete. The all-passing fixture returns `0`; the multiple-failure fixture returns the first failing exit code.

The workflow uses `npm run pack:verify` to validate its newly generated pack. It must not run the full learner submission check, which requires local skill records and sealed evidence.

On GitHub, `github.sha` for a pull-request run identifies the tested merge commit. That workflow-generated pack and your local implementation pack may therefore identify different commits. Label each accurately and link the actual run and artifact in the PR body; keep the local submitted pack unchanged.

The exercise workflow is expected to remain red because checkout failed. A green local `pack:verify` proves the failed result was preserved, not that the failed product check was fixed.

## Finish and submit

1. Record the starting commit with `git rev-parse HEAD`, inspect the problem, and write `evidence/before.md`.
2. Implement and check the change. Commit the implementation, then obtain its full SHA with `git rev-parse HEAD`. At this point all subsequent repository changes must be evidence only.
3. Replace `<implementation-sha>` below with that SHA and generate the proof:

```text
npm run evidence:generate -- --sha <implementation-sha>
```

4. Draft `evidence/pr-summary.md` following the [evidence template](./evidence-template.md). Use the verification skill and capture the focused checks at the implementation commit:

```text
npm run proof:capture
```

This runs `npm run pack:verify` and records its actual output, code version, timestamps, and exit code in `evidence/commands/checks.txt`. Preserve failed attempts before recapturing; do not type the output by hand.

5. Finish the corrected PR title and body, Evidence map, and `evidence/review-response.md` using the captured results. Complete the observations, source audit, and skill record. Commit all evidence artifacts. Seal that committed evidence, then capture final verification:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

6. Commit `evidence/manifest.json` and `evidence/commands/verify.txt`. Run `npm run verify:exercise`. This final check reads the submitted evidence and uses temporary directories for reproduction.
7. Follow the [PR review brief](./pr-review-brief.md) to open one focused PR with the corrected title and body. Keep it in draft and add the actual failed Actions run and uploaded artifact links. Check the final diff and accessible links. Approval and merging are not required.

If a check reveals a product change is needed, preserve the failed attempt, commit the repaired implementation, and regenerate all code-bound proof. Do not reuse old proof after changing source. Exclude `node_modules/`, build output, and unrelated changes from the PR.

## Sources

- [GitHub Actions status expressions](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#always): use an explicit status expression for evidence steps after failure.
- [GitHub pull-request events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request): the default checkout and SHA use the pull-request merge ref.
- [Artifact upload](https://github.com/actions/upload-artifact): upload the stable evidence directory.
- [GitHub Actions security guidance](https://docs.github.com/en/actions/reference/security/secure-use): review read-only permissions and immutable action references.
