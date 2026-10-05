# Evidence instructions and template

Keep evidence concise and based on actual files and command output. Complete this exercise on its own branch. Use the capture and sealing order in [setup](./setup.md).

## Before, after, and comparison

Create `evidence/before.md` and `evidence/after.md` with headings `Conditions`, `Findings`, and `Proof`.

Under Conditions, use a line exactly `Starting commit: <40-character SHA>`. Add `Implementation commit: <40-character SHA>` in after.md. Record agent/model, skill revision, relevant settings, and any retries or human corrections honestly; iteration is allowed. Under Findings, summarize what was observed. Under Proof, cite the relevant captured command and specific source.

Create `evidence/comparison.md` with headings `Changes`, `Verified`, and `Remaining questions`. Separate measured results from assumptions. This is an observed starter-to-implementation comparison; it does not require two independent coding attempts.

## Challenge artifacts

- `evidence/scope-plan.json`: `schemaVersion: 1`, `maximumFiles: 2`, `maximumChangedLines: 30`, `allowedSourceFiles` (the two exercise-relative paths in the contract), and `excludedPaths: ["src/components", "src/styles.css", "package.json"]`.
- `evidence/scope-plan.md`: why those two files are sufficient and which shared behavior is excluded.
- `evidence/scope-budget.json`: `schemaVersion: 1`, `planSha`, `sourceSha`, `planned: {files: 2, changedLines: 30}`, and `actual: {files, additions, deletions, changedLines}`. From the app directory, derive counts with `git diff --numstat <planSha> <sourceSha> -- src/migration/exportButton.mjs tests/export-button.test.mjs`. Add `lineJustification` if the total exceeds 20 lines.
- `evidence/avoided-work.json`: `entries` for `scope-budget-app/src/migration/actionButtons.mjs`, `scope-budget-app/src/components`, `scope-budget-app/src/styles.css`, and `scope-budget-app/package.json`. Each needs `path`, `status: "unchanged"`, `temptation`, and `reason`.
- `evidence/verification.md`: headings `Behavior`, `Scope`, `Cost and limits`; explain the observed export change, preserved legacy cases, budget result, and measurement limits.

Before records current behavior and scope risk; after records the final behavior and actual diff. An unchanged baseline has no implementation patch or invented line savings. Include real red/green output in your skill transcript and the automatic regression replay in `evidence/commands/regression.txt`.

The machine-readable output paths and required headings are listed in `scope-budget-app/evidence-contract.json`. Keep implementation and test files separate from evidence commits.

## Skill use

Create `evidence/skill-use.md` with one section:

```text
## test-driven-development
Source: https://github.com/obra/superpowers/tree/main/skills/test-driven-development
Revision: <installed upstream 40-character commit SHA or 64-character SKILL.md SHA-256>
Invocation: <what you actually asked the agent to do with this skill>
Proof: evidence/skill-session.txt:L<first-line>-L<last-line>
```

Keep the real invocation and relevant agent/tool exchange in `evidence/skill-session.txt`. Include the decisions or checks the skill helped produce. A skill name pasted into a report is insufficient; a reviewer must inspect the session. Do not fabricate transcripts or provider usage.

## Source audit

Create `evidence/source-audit.json` with `claims`. Cover these topics: `export-change`, `legacy-preservation`, `scope-budget`.

Each claim has a unique `id`, `topic`, `status` (`supported`, `contradicted`, or `unresolved`), `reason`, `artifact: {path, line, excerpt}`, and `sources: [{path, line, excerpt}]`. Paths are relative to the exercise; line numbers are one-based and excerpts must match exactly.

The artifact must be one of the contract's outputs. Use source code, tests, protected inputs, or captured checks as support; another submitted report cannot support itself. The verifier checks citations and snapshots, while a reviewer assesses whether the sources actually justify the claim.

## Captures and final result

Retain `evidence/commands/baseline.txt`, `evidence/commands/implementation.txt`, and `evidence/commands/regression.txt`. The capture tool records real stdout, stderr, timestamps, and the matching commit. Baseline runs at the starting commit; implementation checks run at the source SHA recorded in `evidence/scope-budget.json`.

Commit the artifacts before `npm run evidence:seal`. Then capture the documented `evidence:verify` command, commit `evidence/manifest.json` and `evidence/commands/verify.txt`, and run `npm run verify:exercise`. Final verification consumes existing evidence and does not regenerate it.
