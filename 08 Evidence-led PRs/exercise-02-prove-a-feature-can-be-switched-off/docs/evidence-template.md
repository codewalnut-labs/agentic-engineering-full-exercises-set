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
Title: <clear problem or outcome for the PR>
Source SHA: <implementation SHA>

## Change
<Problem, change, and affected behavior.>

## Checks
<Commands, results, artifact links, and failed checks.>
Reproduce: <exact commands from the starter app directory>

## Evidence map
| PR claim | Changed file or diff | Exact check and exit code | Raw proof |
| --- | --- | --- | --- |
| <Important claim> | <Link and relevant lines> | <Command and observed exit code> | <Artifact link and relevant lines> |

## Decision
Decision: READY FOR REVIEW
<Why this evidence supports that recommendation.>

## Risk and rollback
<Residual risks, reviewer action, and the concrete rollback or recovery step.>
```

Use the title for your PR and paste the remaining summary into its body. Link important claims to the implementation diff and raw proof in the Evidence map. See the [PR review brief](./pr-review-brief.md) for the supplied draft to correct.

## Reviewer response

Write `evidence/review-response.md` for the supplied comment:

```markdown
Reviewed implementation commit: <same full implementation SHA as the summary>
Reviewer comment: ROLLBACK-01
PR decision: READY FOR REVIEW

## Reviewer comment
<Summarize the supplied comment accurately.>

## Response
<What you corrected in the PR description or implementation, and why.>

## Evidence
<Links to the changed files, exact checks, and raw proof that address the comment.>

## PR decision
<Why the PR stays blocked or is ready for review, including unresolved limitations.>
```

This is a response to the supplied review scenario; no additional reviewer or agent session is required. Keep actual skill-use records separate from this response.

After local verification, open the PR and add accessible branch or Actions links. Keep post-opening URLs and discussion updates in the hosted body or comments. Local checks verify structure, commit binding, and sealed files; a reviewer checks the actual PR title, body, links, draft status, and whether its claims are justified.

## Proof to explain

- Include enabled, disabled, provider-error, invalid-context, and API-error behavior. Cite generated scenario documents and the protected test output.
- Disabled, provider-error, and invalid-context paths have zero preview calls and telemetry.
- An API error occurs after one attempted call; it returns legacy and emits zero preview telemetry. Do not claim it made no API call.
- Cite the drill's successful replacement, invalid-input rejection, interruption, concurrency results, and audit metadata.
- Report actual timing. The 1000 ms budget measures only the successful rollback command.
- Describe the proposed rollout scope, who operates rollback, its trigger, exact command, and how to verify recovery.
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
