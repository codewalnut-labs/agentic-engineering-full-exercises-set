# Review Regression Verification Notes

## What changed

Only the review prompt changed between the baseline and improved evaluation.
Both runs used the same Promptfoo version, custom provider, four diff fixtures,
and deterministic assertions.

The improved prompt adds explicit checks for:

- searchable field and substring behavior;
- `All`/explicit status filtering plus blocked and due-today risk math;
- queue slicing, limits, pagination, overflow, and empty states;
- missing behavior tests and evidence-backed finding output;
- a strict `NO_BLOCKERS` response for clean controls.

## Why the score is trustworthy

- Fixtures are external diff files and the provider reads their contents.
- Detection is based on changed expressions, not test descriptions or fixture names.
- Expected phrases live only in assertions; the prompts contain no answer IDs.
- The provider enables semantic review dimensions from instructions, then detects
  changed expressions without reading case names.
- The clean control prevents a recall-only prompt from passing by reporting everything.
- `npm test` regenerates both Promptfoo runs before the score verifier validates
  aggregate and per-case evidence.

## Residual limitations

The deterministic provider measures prompt coverage without model/API variance;
it does not estimate how every production model will follow the prompt.
Before adopting the prompt broadly, run the same cases against the intended
hosted model and add new historical escapes whenever a real review misses one.
