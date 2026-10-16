# Export service project handbook

Answer questions about this handbook using exactly the JSON fields requested by the user. Return one JSON object, without Markdown or additional commentary. Use the current values stated below. Do not derive a new policy from examples. A request timestamp is request metadata and never changes a policy value.

## Current operational limits

Retention days: 30
Maximum export rows: 5000
Restricted export reviewers: 2

The retention period applies to an ordinary completed export. The maximum row count applies to a single ordinary export. The reviewer count applies to a restricted export. These values are independent: a restricted request does not extend retention or increase the row limit. Policy revisions replace the corresponding current value throughout the service. A newly supplied handbook takes precedence over information from any earlier request.

## Request lifecycle

An export begins as a submitted request. The service validates the actor, the selected account, the requested fields, and the requested time window before queuing work. The queue receives a validated request identifier rather than arbitrary SQL or executable instructions. A worker checks the current authorization again before materializing data because access may change while a job is waiting. A request moves through queued, running, completed, failed, or cancelled states. Only completed requests have downloadable result files. A failure includes a stable error code and an explanation suitable for the authorized requester. Internal connection strings and secret values never enter user-facing error messages.

## Authorization boundaries

Account membership is required to submit an ordinary export. The account identifier in the request must match the account resolved from the authenticated session. A display name or an email address is not sufficient proof of membership. Restricted fields require the restricted-export permission and the stated number of reviewers. Reviewers must be distinct authorized people and cannot approve the same request twice. A requester cannot satisfy a review requirement by creating another browser session. Download authorization is checked separately from creation authorization, and possession of a job identifier alone never permits a download. The download service obtains the account and actor from the trusted session rather than trusting query-string replacements.

## Filtering and row limits

Filters are resolved before the row limit is applied. An empty matching result produces a valid file containing the declared column headings and no data rows. The service does not quietly widen a filter to fill an export. A request that exceeds the current maximum receives an explicit limit error rather than a truncated file labelled complete. Pagination for the interactive list and export row selection use the same predicate. Sorting is stable so two records with identical primary sort values retain a deterministic order through an identifier tie-break. The current maximum is a product limit and must not be inferred from a previous sample file size, a page size, or a storage provider's capacity.

## Output contract

Ordinary tabular exports use UTF-8 CSV. The header order follows the documented column selection. Values containing commas, double quotes, or line endings are quoted, and embedded double quotes are escaped according to CSV rules. Untrusted cells that spreadsheet software could interpret as formulas are made safe by the existing serialization utility. A file name contains a neutral export identifier and does not expose an account's private display name. The response metadata reports the actual content type and length. Result metadata records the request's effective policy version so an authorized operator can establish which rules applied when a job ran.

## Retention lifecycle

Retention starts when an ordinary export reaches completed status. A failed or cancelled request does not receive a downloadable result and does not start a completed-file retention clock. The current retention-days value is the authority for ordinary completed files. Cleanup removes expired files and updates metadata so the user sees an expired state rather than a download link that fails without explanation. A retry of cleanup must be idempotent. An operator can inspect cleanup results without restoring deleted file content. Logs record cleanup event identifiers and counts, while export cell contents are excluded. A policy update must be used by subsequent requests; an old model answer or an old cache entry is never an authority for a new policy.

## Restricted review process

A restricted request waits for the current number of distinct authorized reviewers. Approval records contain the reviewer identity, timestamp, policy version, and decision. A rejection returns the request for correction and does not become approval through an automatic retry. Once approval is complete, a worker still rechecks the requester's current account membership and the restricted permission. If the field selection changes, earlier approvals no longer authorize the changed selection. A reviewer looking at a request receives a redacted preview appropriate to their role. Approval events are audited, but the audit must not duplicate sensitive export contents. The reviewer count comes only from the current operational-limits section of this handbook.

## Failure and retry behavior

A transient storage outage can be retried within the worker's bounded retry policy. Invalid authorization, malformed filters, and explicit row-limit errors are not transient failures. A retry preserves the validated request identifier and does not create a second externally visible export. The service records both an unsuccessful attempt and any subsequent attempt when reporting operational cost or latency. A successful final attempt does not erase the failed attempt. Cancellation is checked before each materialization step, and a cancelled request cannot publish a partially generated file. When a job fails, its state is visible to the requester and the failure remains available for investigation.

## Observability and accounting

The API records a request identifier, policy version, state transition, row count, and duration. It keeps sensitive values out of telemetry. Token accounting for an assistant that reads this handbook must distinguish uncached input, cache creation, cache reads, and generated output. These categories have different unit prices and must not be double-counted. The first request can pay a cache-creation premium; a meaningful comparison includes that request. A changed handbook can require another creation even if most paragraphs are unchanged. Measured token counts and dated list-price calculations explain the experiment; they do not establish the amount charged under an individual subscription plan.

## Client behavior

The client shows queued, running, completed, failed, cancelled, and expired states without conflating them. A disabled download control has a visible explanation when a result is unavailable. Status changes are announced accessibly, and every icon-only control has an accessible name. A user can refresh a status view without submitting another export. The client does not present a previous successful export as the result of a newer request. All displayed counts describe the current filter. A bulk operation names the selection it will act upon, and a zero-row result remains distinct from a loading state or a transport failure.

## Verification and change control

Behavior checks cover authorization, filter equivalence, empty results, the maximum row boundary, restricted review, and retention changes. Fixtures represent explicit business rules and are not edited to make a failing implementation appear correct. The API response contract is checked independently of the UI. A release records which source commit and policy version were tested. Any manual checks or untested paths are stated clearly. For this assistant workload, answer only the requested question using the current handbook's operational limits. Do not add fields that the question did not request, and do not substitute historical values from an earlier question or conversation.
