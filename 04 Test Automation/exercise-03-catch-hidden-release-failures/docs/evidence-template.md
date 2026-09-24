# Evidence instructions and template

This is one standalone challenge. Compare the supplied starter with your final result; a second agent attempt without the tool or skill is not required. Keep the README concise and put proof here.

## Starting and final observations

Write `evidence/before.md` before changing the implementation or tests. Use headings **Starting point**, **Observed result**, and **Gaps**, formatted as level-two Markdown headings. Identify the baseline commit, commands, actual exit codes, and the behaviors not established by the starter checks.

Write `evidence/after.md` with headings **Changes**, **Verified result**, and **Limitations**. Reference the final capture, tests or commands that establish each claim, and any uncertainty. In `evidence/comparison.md`, use **Coverage**, **Reliability**, and **Remaining risks** to compare the starter with the finished work. Do not claim that this single exercise proves one agent or tool is universally better.

## Actual tool or skill use

Export your actual agent/tool session to `evidence/sessions/`. In `evidence/tool-record.md`, record these fields as Markdown bullets:

- Agent: agent application used
- Model: actual model used
- Source: https://github.com/obra/superpowers/tree/main/skills/verification-before-completion
- Version: installed version or revision
- Installed path: actual local tool configuration or SKILL.md path
- Invocation: how the agent invoked the tool or loaded the skill
- Transcript: evidence/sessions/session.txt:1-20

Replace the sample values and line range with real evidence. For skills, also record `Source commit` (40 hexadecimal characters) and `SKILL.md SHA-256` (64 hexadecimal characters). Include linked references when installing a skill. A link to a skill or a claim that it was installed is not evidence of its use. Keep the raw session export available for review; structural checks cannot authenticate an agent or prove an observation is accurate.

## Captured commands

Use the commands in [setup.md](./setup.md). Commit code and tests before each capture; the helper rejects uncommitted exercise inputs. It executes fixed commands and writes numbered attempts under `evidence/runs/`, preserving stdout, stderr, exit status, commit, and the complete exercise file snapshot. Preserve failed attempts; select the completed workflow in `evidence/runs.json`:

```json
{
  "baseline": "baseline-1.json",
  "final": "final-1.json"
}
```

Use the actual attempt numbers. The baseline is the supplied starter, not another solution. A red capture must fail on the intended assertion. A final capture must pass, include every required command, and match the final code. Evidence-only commits may follow; code or test changes require a new final capture. Do not handwrite process logs, hashes, or snapshots. Their hashes detect accidental edits, not forgery; reviewers must inspect raw output and rerun the checks.

## Exercise-specific proof

In `evidence/claim-audit.md`, use **Previous claim** and **Missing proof** headings. Cite the old command and its output, then identify omitted client validation, complete provider behavior, builds, and gate failure handling.

In `evidence/verification-plan.md`, use **Requirements** and **Failure handling** headings. Before editing, map each requirement to the command, expected result, and test assertion. Cover gate success, non-zero status, process error, and termination. Cite the actual skill session where this plan was formed.

In the final result, identify all four gate surfaces and the provider test summary. Explain how regression tests establish the fixes, rather than reporting only a green exit code. Read the complete captured output before making the final release claim.

## Submission

Commit the implementation, tests, evidence documents, selected captures, and session exports. Run `npm run verify:exercise` from the application folder, read the entire output, then submit a focused PR following the [submission standard](../../../docs/SUBMISSION_STANDARD.md). This exercise's starter-versus-final evidence replaces the standard's matched-attempt experiment. Before/after patch files are not required; the captured commits and PR diff show the changes.
