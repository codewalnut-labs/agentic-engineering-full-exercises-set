# Review Prompt Regression Eval Design

## Goal

Measure whether a code-review prompt catches known behavior regressions before adopting it.

## Evaluation set

- Partial-search regression: owner/note fields are removed and substring matching becomes prefix-only.
- Status/risk regression: blocked work disappears and due-today blocked risk is reduced.
- Queue truncation regression: the UI silently hides items after the fifth row.
- Clean control: an explicit button type is added without behavior loss; the reviewer must not invent a blocker.

## Measurement

Promptfoo runs the baseline and improved prompts against the same four cases through a deterministic local review provider. Case assertions grade natural-language behavior findings, while the clean control requires `NO_BLOCKERS`. Expected finding phrases are absent from the prompts, and the provider detects changed expressions without reading case names. The provider only enables a review check when the prompt explicitly asks for that behavior class, making prompt coverage observable and avoiding external model/API variance.

## Success criteria

- Baseline score is recorded before prompt changes.
- Improved prompt reaches 100% case accuracy.
- The clean control continues to pass.
- Project verification and a human review confirm that cases, assertions, and provider logic are not keyed to case names.
