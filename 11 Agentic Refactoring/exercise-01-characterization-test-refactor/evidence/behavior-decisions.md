# Renewal Behavior Decisions

The golden observations describe the public behavior of `evaluateRenewalEligibility`; they are not a statement of preferred product policy. This exercise authorizes a structural refactor only. Every observed result below is therefore classified as **preserve**, even when it is also recorded as a **suspected bug** for a separately approved change.

| Observation | Decision | Reason |
| --- | --- | --- |
| An enterprise account becomes eligible at exactly 12 months with fewer than two late payments. | Preserve | The 12-month boundary and `< 2` comparison are public behavior. |
| An enterprise account with exactly two late payments receives `manual-review` and `payment-history`. | Preserve | Changing the threshold or exact reason string would change callers' observable result. |
| An enterprise account below 12 months receives `ineligible` and `plan-not-supported`. | Preserve | No more specific tenure reason exists in the legacy contract. |
| A negative late-payment count qualifies for the enterprise discount. | Preserve; suspected bug | Input validation is missing, but adding validation is outside this refactor. |
| A clean pro account becomes eligible at exactly six months. | Preserve | The six-month boundary, 10 percent discount, and `pro-tenure` reason are protected. |
| A pro account below six months receives `plan-not-supported`. | Preserve | The default result is observable behavior. |
| A mature pro account with one late payment still receives `plan-not-supported`. | Preserve; suspected bug | A more descriptive payment-history outcome might be desirable, but it is not authorized here. |
| A support override makes a new starter eligible with a zero discount. | Preserve; suspected bug | The override bypasses tier, tenure, and arrears checks and does not assign a discount. |
| A support override wins over enterprise arrears. | Preserve; suspected bug | Support override precedence must remain ahead of the enterprise payment-history branch. |
| An ordinary starter remains unsupported even after 18 months. | Preserve | Unsupported tiers fall through to the exact default result. |

The refactor must preserve the exported function name, accepted input shape, returned fields, exact status and reason strings, discount values, validation gaps, and decision precedence. Potential policy improvements will be proposed separately so they can receive product requirements and dedicated tests.
