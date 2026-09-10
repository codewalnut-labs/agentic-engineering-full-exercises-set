# After: characterization-first refactor

- Starting commit: `e134b7e7b3163db395144bfb163a06d24ad06507`
- Run base commit: `3598a35f896b521a64425318b4919edfb6831276`
- Implementation commit: `22d89ee89ea56c799c267beaed0b74d5919e0434`
- Agent and model: Codex CLI, `gpt-5.6-sol`, medium reasoning
- Tools and permissions: fresh ephemeral session, workspace-write sandbox, shell and repository tools
- Time limit: 45 minutes
- Human hints: 0
- Retries: 0
- Patch: `evidence/after.patch`
- Patch SHA-256: `4a910424ec77f2947661e4a6e719d6b0bd2a33045e36bc38ae1a4da9efcc7be3`
- Oracle exit code: 0
- Output SHA-256: `9485e152e5d4da6a7085fdb5f7f7cd444c100a68b039667cfebd373fc5089b6b`
- Changed cases: 0 of 12 protected observations
- Changed files: 1 production file
- Lines added and removed: +27 / -21

The run base contains only the public characterization test and the complete before output. The fresh agent then changed only `legacyEligibility.mjs`. Both protected and participant checks pass, and the before/after JSON files are byte-identical.
