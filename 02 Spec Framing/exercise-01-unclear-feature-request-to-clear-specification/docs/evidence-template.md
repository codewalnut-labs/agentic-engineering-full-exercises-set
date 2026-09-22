# Spec Kit workflow evidence

Use real stage invocations and retained outputs. A manually written spec or a command name in a report is not proof of Spec Kit use.

## Reports and sessions

Use Conditions, Findings, and Proof headings in `evidence/before.md` and `evidence/after.md`. Use Changes, Verified, and Remaining questions in `evidence/comparison.md`. Record starting/reviewed commits, author/reviewer session IDs, tool versions, actual questions/answers, stage outcomes, review dispositions, and final readiness.

Keep `evidence/author-session.txt` and `evidence/review-session.txt` as actual transcripts, including tool requests/results and human intervention. Session IDs must occur in their transcripts. Preserve review.md and reviewed-checklist.md verbatim in the review transcript, and the original checklist-results.json in a JSON code block. Later results may add a resolution field; preserve the original assessment. Identify any credential redactions without changing outcomes.

## Stage capture

After each required Spec Kit command, run the documented workflow:capture helper. It creates:
- `evidence/workflow/specified.md`
- `evidence/workflow/clarified.md`
- `evidence/workflow/generated-checklist.md`
- `evidence/stage-captures.json`, recording stage order, source paths, timestamps, and hashes.

These are captured outputs, not independently regenerated documents. Before review, the clarified snapshot must match the spec being frozen and the generated checklist must match the custom checklist being frozen.

## Workflow inventory

Create `evidence/workflow.json` with:
- `version: "v1.0.6"`, `integration`, and `featureDirectory: "specs/subscription-management"`.
- `files`: every project-local Spec Kit command, template, script, constitution, configuration, or dependency needed for the three stages. Each entry has exercise-relative `path` and normalized-LF `sha256`. Include the installed checklist command with its prerequisite adapter change. Do not inventory caches, credentials, or global settings.
- `stages`: exactly specify, clarify, checklist, in order. Each record has `stage`, actual `invocation`, author `sessionId`, `startedAt`, `finishedAt`, `commandFile` from the inventory, and a transcript `proof`.
- `setupProof`: transcript citation showing the installed version/integration and constitution setup.
- `adaptation`: explain the checklist prerequisite replacement.

A proof has `path`, one-based `line`, and exact `excerpt`. Stage/setup proofs cite `evidence/author-session.txt`. Preserve the actual installed files so a reviewer can inspect and replay the integration.

## Frozen inputs and review metadata

After committing the feature files and stage captures, run `review:freeze`. It records the reviewed commit and preserves four inputs in `evidence/reviewed/`; do not edit these copies.

Create `evidence/review-session.json` with authorSessionId, distinct reviewerSessionId, agent, model, startedAt, finishedAt, authorProof, inputProof, and reviewProof. Author proof cites the author transcript; review proofs cite the review transcript. Show that the fresh session read the frozen files and evaluated the checklist.

Commit final feature documents, raw sessions, stage captures, inventory, review inputs, metadata, and reports before sealing.

## Source audit and final verification

Create `evidence/source-audit.json` with claims covering clarification, acceptance, and review. Each claim has unique id, topic, status (supported/contradicted/unresolved), explanatory reason, an artifact citation into a submitted feature document, and source citations into supplied application docs/code, raw sessions, or frozen inputs. Citations use path, line, and exact excerpt.

Follow setup.md to produce `evidence/manifest.json` and `evidence/commands/verify.txt`. The seal includes inventory files and native outputs. Offline verification checks consistency, source freshness, provenance, and recorded workflow order; reviewers assess semantic correctness and session authenticity.
