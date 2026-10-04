# Evidence instructions and template

This is one challenge, not two competing agent attempts. `before.md` records the observed starting state; `after.md` records the implemented result. Report failures and uncertainty as well as passes.

The current browser measurements determine the decision. The protected baseline is illustrative reference data; do not claim matching environments or a measured improvement without an actual comparable baseline run.

## Observation reports

Use these headings in both `evidence/before.md` and `evidence/after.md`:

```markdown
## Conditions
Starting commit: <full initial SHA>
Implementation commit: <full measured SHA, in after.md>
Agent and model: <actual runtime>
Tools and permissions: <actual conditions>

## Findings
<Observed gaps before, or verified behavior after.>

## Proof
<Exact commands, exit codes, and links to the actual artifacts.>
```

Use `## Changes`, `## Verified`, and `## Remaining questions` in `evidence/comparison.md`. Explain which problems changed, what the evidence establishes, and what remains unverified. There is no first-attempt or zero-retry requirement.

## Reviewer summary

Write `evidence/pr-summary.md` using:

```markdown
Source SHA: <implementation SHA>

## Change
<Problem, change, and affected behavior.>

## Checks
<Commands, results, artifact links, and failed checks.>
Reproduce: <exact commands from the starter app directory>

## Decision
Decision: READY FOR REVIEW
<Why this evidence supports that recommendation.>

## Risk and rollback
<Residual risks, reviewer action, and the concrete rollback or recovery step.>
```

Paste this summary into the focused PR body and add links to the actual hosted evidence where available. The automated contract checks structure and code binding; reviewers assess whether the claims and recommendation are justified.

## Proof to explain

- Report all three Lighthouse scores and LCP values, the worst value for each metric, and the axe violation count.
- Cite raw reports for browser-measurements and code or observed browser output for accessible-action.
- Cite the actual `quality:verify` capture for failure-controls; it executes separate protected Lighthouse and axe mutations on temporary copies.
- Keep `quality-report.md` generated. Use `comparison.md` for your explanation and uncertainties.
- State that the supplied baseline is reference data, not a fresh measurement on your machine.
- Record manual keyboard, screen-reader, zoom, or usability checks that remain; zero automated violations does not establish complete accessibility.

## Source citations

Write `evidence/source-audit.json` with a `claims` array. Cover each topic: `browser-measurements`, `accessible-action`, `failure-controls`. Each claim cites an exact line in `evidence/pr-summary.md` and one or more authoritative source or raw proof lines:

```json
{
  "claims": [
    {
      "id": "claim-1",
      "topic": "browser-measurements",
      "status": "supported",
      "reason": "Explain how the referenced source supports the summary statement.",
      "artifact": { "path": "evidence/pr-summary.md", "line": 1, "excerpt": "<exact statement>" },
      "sources": [{ "path": "<source or raw proof path>", "line": 1, "excerpt": "<exact source text>" }]
    }
  ]
}
```

Use `supported`, `contradicted`, or `unresolved` honestly. Outputs cannot cite themselves as source proof. The artifact manifest seals the contract-listed files; command captures are actual process results, not manually written summaries.

## Skill use and final verification

Keep the actual session in `evidence/skill-session.txt`. In `evidence/skill-use.md`, include exactly one section:

```markdown
## verification-before-completion
Source: https://github.com/obra/superpowers/tree/main/skills/verification-before-completion
Revision: <installed 40-character revision, or use SHA-256: with the 64-character skill-file hash>
Invocation: <actual invocation>
Proof: evidence/skill-session.txt:L<first>-L<last>
```

The cited lines must show the skill being used to run, read, and report verification. A well-formed record alone does not prove agent behavior.

Follow [setup.md](./setup.md) to capture `evidence/commands/checks.txt`, commit the proof, generate `evidence/manifest.json`, and capture `evidence/commands/verify.txt`. Do not include the final capture in the sealed artifact list: it is produced after sealing. Commit both final files before `npm run verify:exercise`.
