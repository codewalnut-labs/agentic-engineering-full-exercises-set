# Delivery evidence

All paths below are relative to the exercise directory. Keep evidence in `evidence/`; native Superpowers artifacts remain in `team-collaboration-app/docs/superpowers/`.

## Reports

Use Conditions, Findings, and Proof headings in `evidence/before.md` and `evidence/after.md`. Before records the actual unfinished starter. After records the delivered behavior and checks. Use Changes, Verified, and Remaining questions in `evidence/comparison.md`; explain requirement coverage, design adjustments, debugging, and limitations.

Keep the real `evidence/author-session.txt` and `evidence/review-session.txt`. Additional implementation sessions go under `evidence/sessions/<name>.txt`. Include session IDs, tool calls/results, approvals, and corrections. Identify credential redactions without changing outcomes.

## Workflow record

Create `evidence/workflow.json` with these fields:

- `superpowersRevision`: full installed upstream commit; `authorSessionId`.
- `design`: exercise-relative `path`, committed `commit`, `approvedAt`, and `approvalProof` from the author transcript showing real human approval.
- `plan`: exercise-relative `path` and committed `commit`. Both initial artifacts must cover INV-01 through INV-08 and precede production changes.
- `skills`: actual invocation records with `name` (for example brainstorming), `revision`, `invocation`, `sessionId`, ISO `at`, and `proof`. Include brainstorming, writing-plans, test-driven-development, requesting-code-review, verification-before-completion, and the selected execution skill. Record supporting skills as well.
- `runs`: baseline, red, green, and final, each pointing to a capture JSON produced by delivery:capture. Do not create these records by hand.
- `review`: independent `sessionId`, reviewed `commit`, `startedAt`, `finishedAt`, transcript `proof`, and `resolutions` described below.
- `ui`: demonstrated source `commit` and author-transcript `proof` for actual browser actions. It must represent the same source as final verification.
- `coverage`: eight records, one for each INV-01 through INV-08. Each has `id`, an `implementation` citation into source, and a `verification` citation into a test or ui.md.

Every citation has `path`, one-based `line`, and an exact `excerpt` of at least eight characters. Skill proof must include the actual invocation, and its transcript must include that session's ID. Use real event times. The reviewer checks that citations support the claimed behavior.

## Review and interface evidence

The reviewer returns `evidence/review.json` with `findings`: records containing unique `id`, `severity` (Critical/Important/Minor), `location` (file and line), and `concern`. A genuine clean review may return an empty findings array. Preserve the JSON verbatim in the review transcript, alongside the reviewed commit.

In workflow.review.resolutions, give every finding its matching `id`, `status` (Addressed/Rejected/Deferred), `reason`, and supporting `proof`. Addressed findings also name an exercise-relative `changedFile`; it must actually differ from the reviewed commit. Only Minor findings may be deferred, with `owner` and `nextStep`. Rejections need evidence, not an unsupported dismissal.

Create `evidence/ui.md` with Create and accept, Revoke, and Reject without mutation headings. Record starting state, actual user actions, and observed results for each. Include errors and recovery; screenshots are useful but optional.

## Source audit and sealing

Create `evidence/source-audit.json` with claims covering `requirements`, `testing`, and `review`. Each claim has unique `id`, `topic`, `status` (supported/contradicted/unresolved), explanatory `reason`, an `artifact` citation into a submitted report, and `sources` citations into the approved specification, supplied notes/tests, real sessions, or command captures.

Commit all documents, sessions, captures, source, and tests before sealing. The seal includes the initial design/plan, all captured run files, session transcripts, and final source/test inventory. Follow setup.md to produce `evidence/manifest.json` and `evidence/commands/verify.txt`.

Keep the initial learner regression unchanged between the selected red, green, and final captures. Additional tests may be added. Do not present expected results, invented sessions, or simulated outputs as learner evidence.
