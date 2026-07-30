---
name: skill-trigger-eval-harness
description: Build and run deterministic Promptfoo evaluations for Agent Skill selection, trigger precision, positive and negative cases, ambiguous prompts, process steps, output schemas, and before/after regressions. Use when skill descriptions overlap or implicit skill selection is inconsistent; do not use for ordinary application tests or general prompt writing.
---

## Workflow

1. Read the candidate SKILL.md and list its intended trigger conditions.
2. Create positive, negative, and ambiguous prompts before editing the skill.
3. Record the baseline config and result before editing the weakest description.
4. Score selection, process behavior, output shape, file hygiene, and efficiency.
5. Patch only the description or instructions implicated by a failing case.
6. Re-run the same cases and produce versioned before/after results.

## Output Contract

- Preserve the baseline and improved skill text.
- Include positive, negative, and ambiguous cases.
- Report pass/fail counts and the remaining risk.
- Keep providers deterministic unless model variability is the subject of the eval.
