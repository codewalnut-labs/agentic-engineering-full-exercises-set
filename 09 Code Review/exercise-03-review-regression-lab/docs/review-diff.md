# Review Diff Brief

Review `pr/review-target.diff` for subtle behavior regressions. The change claims to make the warehouse exception queue easier to scan by simplifying filters, risk scoring, and queue length.

Verify these areas:

- Search behavior for owner names, notes, and partial queries.
- Status filtering, especially whether blocked work disappears.
- Risk score thresholds for due-today and blocked items.
- Queue truncation, empty states, and missing tests around hidden high-risk work.
