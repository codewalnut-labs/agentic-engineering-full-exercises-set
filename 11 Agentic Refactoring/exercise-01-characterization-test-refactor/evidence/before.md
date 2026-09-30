# Before: unconstrained refactor

- Starting commit: `e134b7e7b3163db395144bfb163a06d24ad06507`
- Run base commit: `e134b7e7b3163db395144bfb163a06d24ad06507`
- Implementation commit: `73e06dbbf1726c3b57ca3e4c47f7f4d83ed5dfd0`
- Agent and model: Codex CLI, `gpt-5.6-sol`, medium reasoning
- Tools and permissions: fresh ephemeral session, workspace-write sandbox, shell and repository tools
- Time limit: 45 minutes
- Human hints: 0
- Retries: 0
- Patch: `evidence/before.patch`
- Patch SHA-256: `d4f60388b158b3c801c90ce6fd1b030789989da2dd253d39745025e188689d72`
- Oracle exit code: 0
- Output SHA-256: `9485e152e5d4da6a7085fdb5f7f7cd444c100a68b039667cfebd373fc5089b6b`
- Changed cases: 0 of 12 protected observations
- Changed files: 1
- Lines added and removed: +16 / -21

The first attempt simplified the production rule directly. It preserved the oracle output, public export, reason strings, validation gaps, and decision order, but produced no participant-owned characterization test or pre-refactor snapshot before editing production.
