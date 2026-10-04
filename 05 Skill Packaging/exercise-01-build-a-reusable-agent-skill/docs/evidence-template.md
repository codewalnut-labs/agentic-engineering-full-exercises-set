# Reusable Skill Evidence

## before.md, after.md, and comparison.md

Use `## Conditions`, `## Findings`, and `## Proof` in both run reports. Record the starting task state, agent/model/runtime, enabled tools, permissions, session limit, attempt, candidate or baseline hash, actual inputs, results, commands, exit codes, and links to saved sessions. Keep unsuccessful attempts and explain any changed conditions.

Use `## Changes`, `## Verified`, and `## Remaining questions` in `evidence/comparison.md`. Connect each claimed improvement to a saved output, score, or actual session observation. Record remaining uncertainty.

## evidence/skill-use.md and evidence/skill-session.txt

Save the complete authoring session in `evidence/skill-session.txt`. Record actual skill use:

```text
## skill-creator
- Source: https://github.com/anthropics/skills/tree/main/skills/skill-creator
- Revision: <40-character source revision>
- Installed path: <path ending in skill-creator/SKILL.md>
- SHA-256: <64-character hash of the installed SKILL.md>
- Installation: <actual method>
- Invocation: <actual invocation>
- Proof: evidence/skill-session.txt:L<first>-L<last>
- Agent: <agent and version>
- Model: <model and version>
- Tools: <enabled tools>
- Permissions: <mode>
- Time limit: <session limit>
- Repository commit: <starting task commit>
```

The proof range must show the skill being used and its contribution to the work. Hashes and line references establish location and freshness; a reviewer must assess what the session demonstrates.

## Commit and capture

Follow [setup](./setup.md). Commit required source artifacts, run `npm run evidence:seal`, capture `npm run evidence:verify` at that commit, then commit the manifest and capture. Submit `evidence/manifest.json` and `evidence/commands/verify.txt`.

The final verifier checks committed artifacts, the complete exercise source snapshot, actual session references, and capture freshness. It does not generate learner results. Each exercise uses one submission branch. The baseline and final reports describe observed work; separate `before.patch` and `after.patch` files are not required.

## Release outputs and primary conditions

Submit `evidence/before-output.md`, `evidence/after-output.md`, `evidence/hotfix-output.md`, and `evidence/internal-output.md`. Store raw evaluation sessions in `evidence/release-sessions/`, including unsuccessful attempts.

In `before.md` and `after.md`, include these exact field labels:

```text
- Agent: <name and version>
- Model: <name and version>
- Other tools: <enabled tools>
- Permissions: <mode>
- Time limit: <limit>
- Prompt: <exact full-release request from setup>
- Repository commit: <fixed fixture commit, 40 characters>
- Attempt: <actual positive attempt number>
- Release-notes skill: <disabled before; enabled after>
- Input context: <monolithic-skill-draft.md before; .agents/skills/release-notes/SKILL.md after>
- Context bytes: <measured guidance bytes>
- Output: <saved output path>
```

Record files read, commands executed, verification, and each exit code. Compare the same prompt, same agent, same model, same tools, same permissions, and same time limit. Explain why the runs are comparable, including authoring revisions between them.

## evidence/resource-usage.json

Include full-release, hotfix-only, and internal-only objects in `scenarios`:

```json
{
  "scenarios": [
    {
      "id": "internal-only",
      "prompt": "Exact scenario request",
      "resources_read": ["references/publication-policy.md"],
      "context_files": ["SKILL.md", "references/publication-policy.md"],
      "context_bytes": {"SKILL.md": 1000, "references/publication-policy.md": 500},
      "total_context_bytes": 1500,
      "scripts_run": ["scripts/extract-release.mjs"],
      "reason": "Explain why the observed reads were necessary for this range.",
      "output": "evidence/internal-output.md",
      "session": "evidence/release-sessions/internal-only.txt"
    }
  ]
}
```

The numbers above illustrate the schema. Replace them with measured bytes. Use skill-relative paths and link observed reads to session lines. Full release needs publication, evidence, and migration references; hotfix needs publication and evidence; internal-only needs publication. Keep those orders in `context_files`. If the agent also reads extractor source, append that script and include its bytes. Execution alone is not a context read.

## evidence/eval-results.json

Provide `quality` with four results: full-release `without_skill`, plus full-release, hotfix-only, and internal-only `with_skill`. Each result needs `id`, `configuration`, `passed`, `total`, `output`, and an `evidence` string for every expectation in the corresponding quality definition. All three candidate outputs must pass their expectations.

Explain Git range selection, customer accuracy, breaking migration, missing evidence, internal exclusions, resource selection, script reuse, verification, and guidance bytes in the comparison. Trigger-evaluation artifacts are not required.
