# Release Notes Skill Verification

## Scope

- Skill package: `.agents/skills/release-notes-skill-factory/`
- Input fixture: 5 changes mapped to 5 files in `v2.3.0...v2.4.0`
- Output: `evidence/RELEASE_NOTES.md`
- Trigger smoke cases: 2 positive and 2 negative prompts evaluated against the
  packaged `SKILL.md` trigger description

## Seeded risk coverage

- Internal refactor `RN-105` is omitted from customer-facing notes.
- Breaking change `RN-102` is elevated above regular change groups and includes
  migration, rollout, and rollback guidance.
- Missing-evidence fix `RN-104` appears only under `Not ready for publication`.
- Every published item has an owner, changed-file mapping, and evidence command.

## Verification command

Run `npm run agent:check` from `release-notes-app/`. The gate generates the
notes, checks the snapshot against the deterministic renderer, compares all
change mappings with the diff manifest, runs trigger smoke cases, and completes
the app lint, format, typecheck, and production build.
