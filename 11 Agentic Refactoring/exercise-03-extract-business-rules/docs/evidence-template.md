# Evidence instructions and template

Keep the evidence short and tied to actual source and command output. Use the phase order in [setup](./setup.md).

## Before, after, and comparison

Create `evidence/before.md` and `evidence/after.md` with headings `Conditions`, `Findings`, and `Proof`.

Under Conditions, include an exact line `Starting commit: <40-character SHA>`. Add `Implementation commit: <40-character SHA>` to after.md. Record your agent/model, skill revision, settings, and any human corrections or retries honestly. Under Findings, describe what changed and what stayed stable. Under Proof, cite source and captured checks.

Create `evidence/comparison.md` with headings `Changes`, `Verified`, and `Remaining questions`. This compares observed starter and final behavior; two independent agent implementations and patch files are not required.

## Challenge artifacts

All paths below are inside `evidence/`.

- `refactor-plan.md`: headings `Steps` and `Checks`; commit the skill-assisted plan before production work.
- `contract-before.json` and `contract-after.json`: generated from actual participant-test observations by the snapshot commands.
- `refactor-map.md`: headings `Ownership` and `Preserved contract`. Map lookup, validation, construction, and persistence across `WorkflowService` and `DecisionPolicy`.
- `rollback.md`: headings `Revert` and `Recheck`. Explain how to revert the policy/service extraction and rerun the contract checks without changing repository behavior.
- `history.json`: full `characterizationSha` and `refactorSha`.

Keep report terms concrete and cite test names and results. The contract in `api-refactor-app/evidence-contract.json` lists required output paths and headings.

## Skill use

Create `evidence/skill-use.md` with this section:

```text
## writing-plans
Source: https://github.com/obra/superpowers/tree/main/skills/writing-plans
Revision: <installed 40-character upstream SHA or 64-character SKILL.md SHA-256>
Invocation: <what you actually asked the agent to do using the skill>
Proof: evidence/skill-session.txt:L<first-line>-L<last-line>
```

Keep the real invocation, relevant decisions, and tool results in `evidence/skill-session.txt`. Do not substitute a summary written as if it were a session. A reviewer assesses how the skill was used.

## Source audit and commands

Create `evidence/source-audit.json` with `claims` covering `policy-boundary`, `side-effect-order`, `http-client-parity`. Each claim contains a unique `id`, `topic`, `status` (`supported`, `contradicted`, or `unresolved`), `reason`, `artifact: {path, line, excerpt}`, and `sources: [{path, line, excerpt}]`.

Use exercise-relative paths, one-based line numbers, and exact excerpts. The artifact must be a required output. Support it with source code, tests, protected inputs, or raw captured checks; another submitted report cannot act as its own evidence.

Retain `evidence/commands/baseline.txt`, `characterization.txt`, and `implementation.txt`. Both characterization and implementation captures must pass. Final sealing adds `evidence/manifest.json` and `evidence/commands/verify.txt`.

A passing verifier checks snapshots, phases, citations, and required behavior. The reviewer still judges whether the refactor improves the structure and whether the explanation follows from the proof.
