# Before run

- Starting commit: e134b7e7b3163db395144bfb163a06d24ad06507
- Implementation commit: 19e90236af0a3b9f3ad81297202c1249789e7665
- Agent and model: Codex gpt-5.6-sol with medium reasoning; POLICY-217 simulated profile is simulated-coding-agent / simulated-standard-reasoning.
- Tools and permissions: Codex exec, repository tools, workspace-write sandbox, no network escalation.
- Time limit: 45 minutes for implementation; 20 minutes for the POLICY-217 constructed replay profile.
- Human hints: 0
- Retries: 0
- Patch SHA-256: adfb9e7eefcabf322d01a22476bb76a6a3b01cdd8ed45147365ad85af72f8dd5
- Patch path: `evidence/before.patch`
- Raw event file: `docs/session-events.json`
- Raw event SHA-256: 1a9196d0bd6e3821f4cb712617f9aac1aac8cce2582474db70a3bf143b6386b7
- Duplicate reads: 1, sequence 2 repeats the sequence 1 target and content version.
- Unchanged failed-command retries: 2, sequences 6 and 7 repeat the failed sequence 5 command before diagnosis or change.
- Oversized context loads: 1, sequence 3 loads 12,400 bytes.
- Total preventable calls: 4.
- Final verification position and result: none after the sequence 10 write; correctness false.
- Files changed: `analyzeSession.mjs`, `analyzeSession.test.mjs`, and `preflightPolicy.mjs` only.
- Lines added and removed: 169 added, 7 removed.

POLICY-217 evidence is a constructed replay exercise, not an exported provider trace. The simulated profile is distinct from the Codex implementation run recorded above.
