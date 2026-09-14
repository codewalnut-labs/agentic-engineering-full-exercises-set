# Queue summary request

Add a status parameter to summarizeQueue(cases, status), defaulting to "all".

- For "all", include every case. Otherwise include only cases matching the status.
- Return the included cases as items, ordered by descending riskScore.
- Return count equal to the number of included items, including zero for an empty result.
- Preserve the caller's case-array order and objects; another dashboard view reuses the input.
- Keep the change local to the summary function. Do not change routing rules or add dependencies.
