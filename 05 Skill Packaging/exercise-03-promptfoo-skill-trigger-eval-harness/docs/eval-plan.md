# Eval Plan

# Eval Plan

The harness uses Promptfoo with a local JavaScript provider so it runs without
API keys and produces repeatable CI evidence.

## Checks

- Selection: `selectedSkill` equals the expected skill or `none`.
- Output: the response contains a rationale, inspected-file list, ready status,
  and schema version.
- Coverage: eight cases include positive, negative, and ambiguous prompts.
- Regression: v1 and v2 catalogs run against the identical case set.

## Weakest description

The v1 `release-notes` description, "Summarize changes and PRs for teams and
leadership," overlaps incident PR summaries and unrelated creation work.
The improved description names release evidence and explicitly excludes
incidents, postmortems, outages, conceptual explanations, and general PR
summaries.

## Acceptance

- Baseline preserves at least one failing collision.
- Improved run passes all trigger and output assertions.
- No external model or network call is required during evaluation.
