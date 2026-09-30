# Engineering Workflow

1. Scope: confirm what is in scope before editing. Do not touch unrequested code. Record any explicit exclusion. If a choice is destructive and genuinely unresolved, stop and clarify with the requester first.
2. Authority: when references disagree, treat the current one as authoritative. Record a contradiction with a stale source instead of silently picking.
3. Context: select only the reference that resolves the decision. Do not load everything. If context conflicts or is insufficient, record that as a context need.
4. Verify: after editing, run one fresh, complete verification covering everything touched. Record its exact exit code. Cover every affected surface.
5. Stop: if verification failed, stop editing and stop verifying. Claim completion only with a fresh passing verification as evidence. If the request needs a protected change, don't make it -- report a blocker naming it and note a safe path instead.

Report each step tersely: a few words per field, no restated instructions, no extra narration.
