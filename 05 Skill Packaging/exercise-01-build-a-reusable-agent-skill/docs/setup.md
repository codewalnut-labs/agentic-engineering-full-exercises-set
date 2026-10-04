# Reusable Skill Setup

## Prerequisites and skill

Use Git, Node.js 22.12–24.x, npm, and an agent that can load local skills and export its actual session. Run `npm ci` and `npm run agent:check` from the application folder. Dependency setup is outside the challenge time.

Use the Anthropic [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator). Install that folder into your agent's skill location, or load its `SKILL.md` explicitly with access to its supporting resources. Keep the source checkout outside the exercise submission. On Claude Code, copy the complete `skills/skill-creator/` directory to `~/.claude/skills/skill-creator/` and invoke `/skill-creator`. On Codex, use `$skill-installer` for that repository folder, then invoke `$skill-creator` and confirm which implementation loaded if a built-in skill shares the name.

The reviewed source revision is `8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4` (October 4, 2026). Record the revision and hash you actually use. Keep skill-creator in the authoring session; performance and routing runs use only the evaluated skill configuration.

The old factory skill is retained under `fixtures/legacy-release-notes-skill/` as source material. It is not in an automatic discovery folder, so it cannot silently affect baseline or candidate sessions.

## Workflow and fixture

Use skill-creator to draft the skill, evaluate realistic outputs, review failures, and revise. Create the learner skill at `release-notes-app/.agents/skills/release-notes/`; do not replace the authoring skill. Claude Code users can install a copy in an isolated workspace's `.claude/skills/release-notes/`; record the copy's hash and keep it synchronized with the submitted package.

Materialize the protected Git bundle outside the curriculum checkout:

```text
npm run fixture:smoke
npm run fixture:materialize -- <absolute-temporary-directory>
```

The materializer creates the repository at that target. Use identical fixture state for baseline and candidate runs. Work on one submission branch; fresh sessions provide isolation. Retain earlier attempts when revising.

Use this full-release request for baseline and candidate:

> Create customer release notes for `exercise-base..origin/exercise-head`. Trace every published item to Git, identify breaking and migration impact, report missing verification evidence, and exclude internal-only work.

Supply the monolithic draft to the baseline. Supply the installed release-notes skill to the candidate. Keep the agent, model, enabled tools, permissions, task prompt, fixture commit, and session time limit comparable. The curriculum implementation commits naturally differ; record the fixture commit separately.

## Package and evaluation boundary

The required package contains `SKILL.md`, publication/evidence/migration references, `scripts/extract-release.mjs`, and `evals/evals.json` with three quality scenarios. Define the trigger clearly in metadata; repeated trigger optimization belongs to a separate challenge.

Use `npm run skill:validate` and `npm run skill:test-extractor`. The extractor prints JSON with `range: {base, head}`, ordered `commits: [{sha, subject, files}]`, and sorted `changedFiles`, derived from Git. Document `--repo`, `--base`, and `--head`. The verifier checks all supplied ranges and a generated unrelated repository.

For each scenario, save the real resource-read transcript and output. Measure only skill guidance actually read:

```text
npm run context:measure -- ../docs/monolithic-skill-draft.md
npm run context:measure -- .agents/skills/release-notes/SKILL.md .agents/skills/release-notes/references/publication-policy.md
npm run release:verify -- <fixture-repository> ../evidence/after-output.md
```

The second command illustrates an internal-only read set; use each session's actual files. Guidance bytes are a context-size proxy, not total input tokens or provider cost. Scripts count as context only if their source was read. Record such reads as well.

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
