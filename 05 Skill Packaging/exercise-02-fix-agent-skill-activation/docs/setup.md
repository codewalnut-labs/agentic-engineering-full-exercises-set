# Skill Activation Setup

## Prerequisites and skill

Use Git, Node.js 22.12–24.x, npm, and an agent that can load local skills and export its actual session. Run `npm ci` and `npm run agent:check` from the application folder. Dependency setup is outside the challenge time.

Use the Anthropic [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator). Install that folder into your agent's skill location, or load its `SKILL.md` explicitly with access to its supporting resources. Keep the source checkout outside the exercise submission. On Claude Code, copy the complete `skills/skill-creator/` directory to `~/.claude/skills/skill-creator/` and invoke `/skill-creator`. On Codex, use `$skill-installer` for that repository folder, then invoke `$skill-creator` and confirm which implementation loaded if a built-in skill shares the name.

The reviewed source revision is `8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4` (October 4, 2026). Record the revision and hash you actually use. Keep skill-creator in the authoring session; performance and routing runs use only the evaluated skill configuration.

## Native routing workflow

Use skill-creator's description-evaluation guidance. Keep the submitted catalog in `skill-trigger-app/skills/`. For Claude Code, copy all three skill folders into a fresh evaluation workspace's `.claude/skills/`. For Codex, copy them into `.agents/skills/`. Confirm discovery and record the catalog hashes. Keep the authoring skill and unrelated project/user skills out of the evaluation catalog, or record any unavoidable host skills consistently in both conditions.

Submit each protected prompt as written in a new session. Do not explicitly invoke `change-review`, ask which skill the model would choose, or replace activation with keyword matching. Observe the host's actual Skill invocation or read of the target `SKILL.md` from the complete exported session. A completed session with no such event is non-activation; a timeout or runtime error is a failed attempt to retain and resolve, not a negative decision.

The upstream description helper is runtime-specific and may use command metadata as a proxy. Its report alone does not demonstrate native activation of this three-skill catalog. Use actual catalog sessions for this challenge's final evidence.

## Training and reserved requests

`evals/trigger-evals.json` contains 12 training and 8 reserved requests. Keep expected labels out of agent inputs. Run every baseline request three times, retain results, and inspect only training errors while tuning. Preserve the original description in the protected snapshot.

```text
npm run eval:fixtures
npm run eval:score -- ../evidence/before-results.json --split train
npm run skill:validate
```

Freeze and commit the candidate description before examining reserved scores. Run the candidate requests three times under the same settings, with no corrective hints or selective reruns. Then score:

```text
npm run eval:score -- ../evidence/after-results.json --split train
npm run eval:score -- ../evidence/after-results.json --split held-out
npm run test:submission
```

Each condition has 60 decisions; both total 120. Store exact responses, UTC times, activation observations, and hashes using the schema in the evidence template. The starting repository commit in the two environment records identifies the fixed task/catalog base; record candidate commits separately in the report.

The candidate must meet the thresholds even if the baseline is strong. Below 7/8 reserved accuracy, require improvement. At or above that baseline, adopt only an improvement; a candidate meeting the thresholds without improving is a documented rejection. Do not tune against reserved failures. Further experiments need a fresh reserved set and fall outside this submission.

## Finish and verify

Keep all attempts and raw session records. Do not claim an unobserved skill read, estimate tokens, or substitute a model's opinion for a runtime activation event. Source excerpts, grades, and hashes support review; they do not establish agent identity or semantic correctness by themselves.

1. Generate the exercise-specific results and write the evidence documents described in [the template](./evidence-template.md).
2. Commit the candidate and all source evidence, including session records. For a passing distribution candidate, use `git add -f` for the required archive under the ignored `dist/` directory.
3. Run `npm run evidence:seal` from the application. This binds required artifacts to the current commit.
4. Run `npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify`. Keep the manifest and capture uncommitted until this finishes at the sealed commit.
5. Commit those two evidence files, then run `npm run verify:exercise`. Changing a candidate or recorded output requires regeneration, a new source commit, resealing, and a new capture.

## Research references

- [Agent Skills specification](https://agentskills.io/specification): metadata, optional resources, and progressive disclosure.
- [Official OpenAI skill guidance](https://learn.chatgpt.com/docs/build-skills): local discovery, explicit use, and description-based selection.
- [Claude Code skills](https://code.claude.com/docs/en/skills): native discovery and activation.
- [Anthropic skill-creator](https://github.com/anthropics/skills/tree/8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4/skills/skill-creator): drafting, evaluation, description optimization, and packaging.

These sources informed the challenge design. The protected fixture contracts define this exercise's acceptance requirements; its size limits and numerical thresholds are local challenge choices.
