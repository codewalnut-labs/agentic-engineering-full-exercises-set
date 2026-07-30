# Promptfoo Score Comparison

| Prompt | Passed | Failed | Accuracy |
|---|---:|---:|---:|
| Baseline | 1 | 3 | 25% |
| Improved | 4 | 0 | 100% |

Score change: **+75 percentage points**.

## Case-level result

| Regression case | Baseline | Improved |
|---|---|---|
| Lost owner/note partial search | Missed | Owner/note and partial-search regression detected |
| Blocked filtering and risk downgrade | Missed | Blocked visibility and due-today risk regression detected |
| Silent queue truncation | Missed | Hidden-after-fifth regression detected |
| Safe explicit button type | Correctly no blocker | Correctly `NO_BLOCKERS` |

Raw Promptfoo exports are preserved in `promptfoo-before.json` and
`promptfoo-after.json`.
