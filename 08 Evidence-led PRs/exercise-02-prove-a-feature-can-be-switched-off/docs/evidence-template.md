# Evidence instructions and template

This is one challenge, not two competing agent attempts. `before.md` records the observed starting state; `after.md` records the implemented result. Report failures and uncertainty as well as passes.

The review decision covers the tested local flag boundary and drill. The exercise does not prove propagation through a live flag provider.

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

- Include enabled, disabled, provider-error, invalid-context, and API-error behavior. Cite generated scenario documents and the protected test output.
- Disabled, provider-error, and invalid-context paths have zero preview calls and telemetry.
- An API error occurs after one attempted call; it returns legacy and emits zero preview telemetry. Do not claim it made no API call.
- Cite the drill's successful replacement, invalid-input rejection, interruption, concurrency results, and audit metadata.
- Report actual timing. The 1000 ms budget measures only the successful rollback command.
- Explain remaining production concerns such as provider propagation, monitoring, and removing the flag later.

## Source citations

Write `evidence/source-audit.json` with a `claims` array. Cover each topic: `flag-boundary`, `side-effects`, `atomic-rollback`. Each claim cites an exact line in `evidence/pr-summary.md` and one or more authoritative source or raw proof lines:

```json
{
  "claims": [
    {
      "id": "claim-1",
      "topic": "flag-boundary",
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
