# Evidence instructions and template

Keep the evidence short and tied to actual source and command output. Use the phase order in [setup](./setup.md).

## Before, after, and comparison

Create `evidence/before.md` and `evidence/after.md` with headings `Conditions`, `Findings`, and `Proof`.

Under Conditions, include an exact line `Starting commit: <40-character SHA>`. Add `Implementation commit: <40-character SHA>` to after.md. Record your agent/model, skill revision, settings, and any human corrections or retries honestly. Under Findings, describe what changed and what stayed stable. Under Proof, cite source and captured checks.

Create `evidence/comparison.md` with headings `Changes`, `Verified`, and `Remaining questions`. This compares observed starter and final behavior; two independent agent implementations and patch files are not required.

## Challenge artifacts

All paths below are inside `evidence/`.

- `route-matrix.md`: headings `Routes` and `Failure handling`. Cover card/new slice, gift-card, invoice, unknown, flag off/legacy, pre-authorization fallback, and ambiguous failures with no fallback.
- `contract-comparison.md`: headings `Public contract` and `Checks`. Cover `orderId`, `status`, `totalCents`, `errorCode`, rounding, and approved/declined results.
- `rollback.md`: headings `Switch off` and `Authorization safety`. Explain `cardSliceEnabled: false`, legacy routing, `authorizationCreated`, and how no duplicate authorization is guaranteed.
- `history.json`: full `characterizationSha` and `sourceSha`.

Keep report terms concrete and cite test names and results. The contract in `checkout-migration-app/evidence-contract.json` lists required output paths and headings.

## Skill use

Create `evidence/skill-use.md` with this section:

```text
## test-driven-development
Source: https://github.com/obra/superpowers/tree/main/skills/test-driven-development
Revision: <installed 40-character upstream SHA or 64-character SKILL.md SHA-256>
Invocation: <what you actually asked the agent to do using the skill>
Proof: evidence/skill-session.txt:L<first-line>-L<last-line>
```

Keep the real invocation, relevant decisions, and tool results in `evidence/skill-session.txt`. Do not substitute a summary written as if it were a session. A reviewer assesses how the skill was used.

## Source audit and commands

Create `evidence/source-audit.json` with `claims` covering `card-only-routing`, `safe-fallback`, `rollback`. Each claim contains a unique `id`, `topic`, `status` (`supported`, `contradicted`, or `unresolved`), `reason`, `artifact: {path, line, excerpt}`, and `sources: [{path, line, excerpt}]`.

Use exercise-relative paths, one-based line numbers, and exact excerpts. The artifact must be a required output. Support it with source code, tests, protected inputs, or raw captured checks; another submitted report cannot act as its own evidence.

Retain `evidence/commands/baseline.txt`, `characterization.txt`, and `implementation.txt`. The characterization capture has the expected behavior failure (exit code 1); the final implementation capture must pass. Final sealing adds `evidence/manifest.json` and `evidence/commands/verify.txt`.

A passing verifier checks snapshots, phases, citations, and required behavior. The reviewer still judges whether the refactor improves the structure and whether the explanation follows from the proof.
