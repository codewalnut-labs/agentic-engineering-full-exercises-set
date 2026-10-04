# Evidence instructions and template

Keep evidence concise and based on actual files and command output. Complete this exercise on its own branch. Use the capture and sealing order in [setup](./setup.md).

## Before, after, and comparison

Create `evidence/before.md` and `evidence/after.md` with headings `Conditions`, `Findings`, and `Proof`.

Under Conditions, use a line exactly `Starting commit: <40-character SHA>`. Add `Implementation commit: <40-character SHA>` in after.md. Record agent/model, skill revision, relevant settings, and any retries or human corrections honestly; iteration is allowed. Under Findings, summarize what was observed. Under Proof, cite the relevant captured command and specific source.

Create `evidence/comparison.md` with headings `Changes`, `Verified`, and `Remaining questions`. Separate measured results from assumptions. This is an observed starter-to-implementation comparison; it does not require two independent coding attempts.

## Challenge artifacts

- `evidence/context-plan.json` and `context-plan.md`: the committed pre-change choices from the [ledger contract](./ledger-contract.md).
- `evidence/context-ledger.json`: the exact final selector result with `planSha` and `sourceSha`.
- `evidence/decision.md`: headings `Context decisions`, `Correctness`, `Cost and limits`; explain required guidance, omitted material, preserved behavior, and any change from the plan.

In both before.md and after.md include this exact table row with the appropriate measured integer: `| Total UTF-8 bytes | N |`. Before uses the entire protected catalog; after uses the reproduced selection. Document bytes exclude skill instructions, conversation history, code, and tool output. Do not describe this comparison as two matched model runs.

The machine-readable output paths and required headings are listed in `context-budget-app/evidence-contract.json`. Keep implementation and test files separate from evidence commits.

## Skill use

Create `evidence/skill-use.md` with one section:

```text
## context-optimization
Source: https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/tree/main/skills/context-optimization
Revision: <installed upstream 40-character commit SHA or 64-character SKILL.md SHA-256>
Invocation: <what you actually asked the agent to do with this skill>
Proof: evidence/skill-session.txt:L<first-line>-L<last-line>
```

Keep the real invocation and relevant agent/tool exchange in `evidence/skill-session.txt`. Include the decisions or checks the skill helped produce. A skill name pasted into a report is insufficient; a reviewer must inspect the session. Do not fabricate transcripts or provider usage.

## Source audit

Create `evidence/source-audit.json` with `claims`. Cover these topics: `required-rules`, `context-reduction`, `adapter-correctness`.

Each claim has a unique `id`, `topic`, `status` (`supported`, `contradicted`, or `unresolved`), `reason`, `artifact: {path, line, excerpt}`, and `sources: [{path, line, excerpt}]`. Paths are relative to the exercise; line numbers are one-based and excerpts must match exactly.

The artifact must be one of the contract's outputs. Use source code, tests, protected inputs, or captured checks as support; another submitted report cannot support itself. The verifier checks citations and snapshots, while a reviewer assesses whether the sources actually justify the claim.

## Captures and final result

Retain `evidence/commands/baseline.txt`, `evidence/commands/implementation.txt`. The capture tool records real stdout, stderr, timestamps, and the matching commit. Baseline runs at the starting commit; implementation checks run at the source SHA recorded in `evidence/context-ledger.json`.

Commit the artifacts before `npm run evidence:seal`. Then capture the documented `evidence:verify` command, commit `evidence/manifest.json` and `evidence/commands/verify.txt`, and run `npm run verify:exercise`. Final verification consumes existing evidence and does not regenerate it.
