---
name: release-notes-skill-factory
description: Generate or review customer-facing release notes from commits, pull requests, diffs, changelogs, and verification evidence. Use when asked to group changes by impact, identify breaking changes, exclude internal-only work, add rollout or rollback guidance, or flag release items that lack evidence.
---

# Release Notes Skill Factory

## Workflow

1. Read `references/release-note-taxonomy.md`.
2. Collect the compare range, changed files, commit or PR summaries, owner, rollout
   notes, rollback notes, and verification evidence.
3. Normalize the inputs to the schema demonstrated in
   `fixtures/release-changes.json`.
4. Run `node scripts/generate-release-notes.mjs <input.json> <output.md>`.
5. Review every generated item against the diff. Do not infer features from a
   filename or commit subject when the evidence is incomplete.
6. Run `node scripts/verify-release-notes.mjs <input.json> <output.md>
   evals/trigger-cases.json`.
7. Return the generated notes plus any publication blockers.

## Output Contract

- Put breaking changes first and include migration and rollback guidance.
- Group publishable items as Added, Changed, Fixed, Security, Deprecated, or Removed.
- Write one concise, customer-focused entry per change with owner and evidence.
- Exclude `Internal` items unless they have operational or customer impact.
- Put changes without evidence in `Not ready for publication`; do not duplicate
  them in published sections.
- Preserve source change IDs so verification can trace notes back to the diff.
