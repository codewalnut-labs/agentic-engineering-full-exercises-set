# Evidence instructions and template

Record the actual starting state and measured result. These are observations from one challenge; separate implementation branches and before/after patch files are not required.

## Observation reports

Use this structure in `evidence/before.md` and `evidence/after.md`:

```markdown
## Conditions
Starting commit: <full initial SHA in before.md>
Implementation commit: <full measured SHA in after.md>
Agent and model: <actual conditions>
Tools and permissions: <actual conditions>

## Findings
<Observed gaps before; verified behavior or review metrics after.>

## Proof
<Exact commands, exit codes, and links to raw results.>
```

Use `## Changes`, `## Verified`, and `## Remaining questions` in `evidence/comparison.md`. Report retries and assistance honestly. For the measured review batches, keep the adapter, model, tools, permissions, and time limit identical; preserve earlier batches when revising the skill.

## Evaluation report

Keep all six runner-generated files in `evidence/runs/<before|after>/<case-id>.json`, their matching prompts in `evidence/prompts/<before|after>/`, and raw responses in `evidence/transcripts/`. The `schemaVersion: 3` records identify actual commits, prompt/diff/adapter hashes, and unique session IDs and nonces.

Generate `evidence/scorecard.json` with `npm run eval:score`. In `evidence/review-eval.md`, use `## Baseline`, `## Skill-assisted`, `## Coverage`, `## Precision`, `## Clean control`, `## Decision`, and `## Limitations`.

Explain which acceptance rules were missed or covered, which findings lack support, and whether the safe change was blocked. Include the actual adapter command and how it provided the skill. Cite individual run records and raw responses. Explain any preserved batches under `evidence/attempts/`.

The completion decision is `adopt` only when every protected gate passes. Reaching that decision on three cases does not prove broad reliability. The scorer checks structure and rule coverage; a reviewer must assess whether the reported reproductions and recommendations are correct.

Capture `evidence/commands/eval-verify.txt` through the documented recorder.

## Source citations

Write `evidence/source-audit.json` with a `claims` array covering `defect-coverage`, `false-alarms`, `scope-limits`. Each claim cites an exact statement in a contract-listed output and source or raw proof lines:

```json
{
  "claims": [{
    "id": "claim-1",
    "topic": "defect-coverage",
    "status": "supported",
    "reason": "<explain why this source supports this statement>",
    "artifact": {"path": "evidence/review-eval.md", "line": 1, "excerpt": "<exact statement>"},
    "sources": [{"path": "<source or raw proof>", "line": 1, "excerpt": "<exact source text>"}]
  }]
}
```

Use `supported`, `contradicted`, or `unresolved` honestly. Outputs cannot cite themselves as proof. Accepted source paths and sealed artifacts are listed in the app's `evidence-contract.json`.

## Skill use and final verification

Keep the actual authoring session in `evidence/skill-session.txt`. In `evidence/skill-use.md`, record:

```markdown
## writing-skills
Source: https://github.com/obra/superpowers/tree/main/skills/writing-skills
Revision: <installed 40-character revision, or use SHA-256: with the skill-file hash>
Invocation: <actual invocation>
Proof: evidence/skill-session.txt:L<first>-L<last>
```

The lines must show actual skill use. Well-formed metadata cannot establish independence or agent behavior by itself; reviewers inspect the raw sessions.

Commit the required evidence, seal it in `evidence/manifest.json`, then capture `evidence/commands/verify.txt`. The final capture is produced after sealing and is not sealed into itself. Commit both final files before the read-only `npm run verify:exercise`.
