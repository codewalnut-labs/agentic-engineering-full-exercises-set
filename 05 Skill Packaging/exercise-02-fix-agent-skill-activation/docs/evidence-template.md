# Skill Activation Evidence

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

## evidence/before-results.json and evidence/after-results.json

Use this schema for each condition:

```json
{
  "schema_version": 1,
  "skill_name": "change-review",
  "description_sha256": "64-character description hash",
  "environment": {
    "provider": "provider name",
    "agent": "agent and version",
    "model": "model and version",
    "runtime": "client and version",
    "settings": {"temperature": "actual value or runtime default"},
    "repository_commit": "40-character fixed task/catalog base"
  },
  "cases": [
    {
      "id": "protected case ID",
      "prompt": "Exact protected request",
      "decisions": [
        {
          "run": 1,
          "timestamp": "2026-01-01T10:00:00.000Z",
          "selected_skills": ["change-review"],
          "triggered": true,
          "raw_response": "Exact unedited native routing record excerpt",
          "response_sha256": "SHA-256 of that exact UTF-8 string",
          "observation": "evidence/routing/before/case-id/run-1.txt:L1-L12"
        }
      ]
    }
  ]
}
```

Include decisions 1, 2, and 3 for every protected case, including errors resolved as separate retained attempts. Use a separate completed-session file for each of the 120 evaluated decisions. The cited range must exactly reproduce `raw_response`; retain the full underlying session. Record actual activated skills, not the skills the model says it would choose. The schema example is not a routing result.

Keep the environment identical. The only intended catalog change is the candidate description; describe and retain hashes of runtime-installed copies. Failed sessions cannot count as non-activation.

## Training analysis and adoption

Write `evidence/trigger-analysis.md` with training false positives, false negatives, the missing boundary, and the description correction. Exclude reserved wording from tuning.

In the comparison, include before and after training and held-out accuracy, precision, recall, specificity, unanimous rate, failure IDs, adoption decision, and why the comparison is fair.

Create `evidence/decision.json` with `decision` (`adopt` or `reject`) and a substantive measured `reason`. Adopt when the candidate meets all thresholds and improves reserved accuracy. A candidate meeting the thresholds without improving a baseline already at least 7/8 must be rejected. A candidate below the thresholds, or failing to improve a weaker baseline, needs further work with a fresh reserved set rather than an unsupported success claim.
