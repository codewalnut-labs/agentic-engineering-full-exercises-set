# Evidence instructions and template

Keep reports short and specific. Follow the phase order in [setup](./setup.md).

## Before, after, and comparison

Create `evidence/before.md` and `evidence/after.md` with headings `Conditions`, `Findings`, and `Proof`. Include an exact line `Starting commit: <full SHA>` in both and `Implementation commit: <full SHA>` in after.md. Record the agent/model, configuration, skill revision, and actual human corrections honestly.

Create `evidence/comparison.md` with headings `Changes`, `Verified`, and `Remaining questions`. Link conclusions to exact observations and disclose what was not demonstrated.

## Challenge artifacts

All paths here are inside `evidence/`.

- `rule-map.md`: headings `Repeated corrections`, `Guidance`, and `Exceptions`. Cover every correction from COR-101 through COR-106. Group by `identity-vs-presentation`, `canonical-enum-storage`, and `ambient-time`; map each to at least two distinct events, an exact AGENTS.md or persistence.md rule line, and `test:persistence`. Explain allowed UI, export, and log uses.
- `before.patch` and `after.patch`: exact, unedited Git diffs from each run base to its agent implementation.
- `before-session.txt` and `after-session.txt`: complete original session exports including prompts, session IDs, and responses.
- `before-metadata.json` and `after-metadata.json`: each contains `agent`, `model`, `settingsHash`, `toolsHash`, `permissionsHash`, `promptHash`, `timeLimitMinutes`, `sessionId`, `repositorySha`, `firstAttempt: true`, `edited: false`, `patchSha256`, and `sessionSha256`.
- `history.json`: full `baselineSha`, `rulesSha`, `agentImplementationSha`, and `implementationSha`.
- `checks/implementation.txt`: capture from `npm run proof:capture -- implementation`.

Use SHA-256 over exact patch and session bytes. `promptHash` is `sha256:` followed by the supplied task's SHA-256 after normalizing LF. Settings, tools, and permissions hashes represent the same configuration in both sessions. Use positive integer minutes. Repository SHAs identify the baseline and guidance-only run bases.

Both before.md and after.md also need exact fields: `Run base commit`, `Implementation commit`, `Agent and model`, `Tools and permissions`, `Time limit`, `Human hints: 0`, `Retries: 0`, and `Patch SHA-256`. The after implementation field is `agentImplementationSha`, not the later test commit. The before implementation SHA must remain available on the baseline branch.

In comparison.md explain the same task, same agent, same model, same conditions, original first attempt before and after, baseline defect count, each rule's effect, and verification. Include a proof-based conclusion. Use `defect-improvement` for fewer defects or `ceiling-no-regression` for an already-correct baseline. Matching correct patches are allowed; never invent a failed baseline.

## Skill use

Create `evidence/skill-use.md`:

```text
## evaluation
Source: https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/tree/main/skills/evaluation
Revision: <installed 40-character upstream SHA or 64-character SKILL.md SHA-256>
Invocation: <what you actually asked the agent to do with the skill>
Proof: evidence/skill-session.txt:L<first-line>-L<last-line>
```

Preserve the real invocation, decisions, and relevant tool output in `evidence/skill-session.txt`. A retrospective written afterward is not a substitute for a session record.

## Source audit and final capture

Create `evidence/source-audit.json` with `claims` covering `repeated-corrections`, `guidance-routing`, `measured-effect`. Each claim has a unique `id`, `topic`, `status` (`supported`, `contradicted`, or `unresolved`), `reason`, `artifact: {path, line, excerpt}`, and `sources: [{path, line, excerpt}]`.

Use exercise-relative paths, one-based lines, and exact excerpts. The artifact must be a required report; sources must be code, protected inputs, or original captured proof. Another written report cannot support its own claim.

Commit the required evidence before sealing. The final steps add `evidence/manifest.json` and `evidence/commands/verify.txt`. The verifier checks consistency and protected behavior; a reviewer judges the quality of your diagnosis and whether conclusions follow from the evidence.
