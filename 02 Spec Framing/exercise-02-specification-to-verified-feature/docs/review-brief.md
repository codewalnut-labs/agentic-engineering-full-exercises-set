# Independent delivery review

Review the implementation commit supplied by the author against the approved INV-01 through INV-08 specification, initial design, and implementation plan. Use the starting and reviewed Git commits to inspect actual changes.

Check requirement coverage, policy enforcement, identity handling, expiry boundaries, single-use transitions, unchanged inputs and rejected state, service/UI wiring, and meaningful tests. Inspect the retained TDD sequence and compare claimed results with command output. Do not assume passing tests prove every requirement.

Return JSON with a findings array. Each finding needs a unique id, severity (Critical/Important/Minor), location (file and line), and concern. Return an empty array only when your review finds no actionable issues; explain what you examined in the surrounding response.

Include the reviewed commit and the JSON verbatim in your response. The author saves the JSON as evidence/review.json and retains your actual session output. Do not implement fixes during the review; the author records and verifies each resolution.
