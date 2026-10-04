# Skill Distribution Setup

## Prerequisites and skill

Use Git, Node.js 22.12–24.x, npm, and an agent that can load local skills and export its actual session. Run `npm ci` and `npm run agent:check` from the application folder. Dependency setup is outside the challenge time.

Use the Anthropic [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator). Install that folder into your agent's skill location, or load its `SKILL.md` explicitly with access to its supporting resources. Keep the source checkout outside the exercise submission. On Claude Code, copy the complete `skills/skill-creator/` directory to `~/.claude/skills/skill-creator/` and invoke `/skill-creator`. On Codex, use `$skill-installer` for that repository folder, then invoke `$skill-creator` and confirm which implementation loaded if a built-in skill shares the name.

The reviewed source revision is `8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4` (October 4, 2026). Record the revision and hash you actually use. Keep skill-creator in the authoring session; performance and routing runs use only the evaluated skill configuration.

Python 3.11 or later and an agent runtime exposing real token usage and elapsed time are also required. If the runtime cannot export those measurements, use one that can before starting. Do not estimate provider usage.

## Evaluation workflow

Use skill-creator's evaluate, review, revise workflow. Keep the candidate in `skill-benchmark-app/skills/incident-summary/`. Install a copy into the evaluated runtime's local skill directory when needed, and verify that copy matches the measured tree hash.

```text
npm run eval:fixtures
npm run skill:validate
```

For each of four protected prompts, run three fresh sessions in each configuration:

- `without_skill`: no incident-summary skill; supply only the task and raw incident inputs.
- `starter_skill`: install the exact protected starter, not the candidate.
- `with_skill`: install the frozen candidate.

Keep agent, model, runtime, tools, permissions, prompt, fixture repository base, and per-session limit comparable. Exclude previous outputs, grading expectations, and authoring advice from run context. Finish and preserve both baselines before improving the skill. Use only tasks marked training to guide changes; reserve the other tasks for the final decision.

Save each output, runtime transcript, and measurement in the workspace layout from [the evidence template](./evidence-template.md). Record tokens from the runtime's usage result and duration from actual elapsed time. Generate grades:

```text
npm run eval:grade -- <eval-id> <output-path> <grading-path>
npm run benchmark:aggregate
```

Review source attribution and uncertainty alongside numerical grades. Keyword-based assertions can miss misleading prose; identify such limits in the analysis. Keep unsuccessful iterations in a separately named directory and use one complete frozen iteration as `benchmark-workspace/`.

## Distribution decision

Read [the benchmark gate](./benchmark-gate.md). If any common check fails or the comparison proves no added value, record `reject` and submit no archive. A complete, evidence-based rejection is a valid outcome. For later improvement, use training evidence and a fresh reserved set after examining reserved failures.

For a passing candidate:

```text
npm run package:skill
npm run package:verify
```

The generated `dist/incident-summary.skill` is a ZIP with a single skill root, intended for runtimes accepting that format. It is not a universal Codex plugin or automatic installation. A recipient can extract the verified folder into the supported skill location. Packaging and distribution outside the repository are separate actions.

`benchmark:aggregate` generates the reports; verification checks them without rewriting them. Recompute and repackage after any candidate change.

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
