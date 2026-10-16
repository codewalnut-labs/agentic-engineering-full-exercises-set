# Evidence instructions and template

## Before, after, and comparison

Create evidence/before.md and evidence/after.md with level-two Markdown headings: `## Conditions`, `## Findings`, and `## Proof`. Include an exact line `Starting commit: <40-character SHA>` in both; add `Implementation commit: <40-character SHA>` in after.md. Record agent/model, installed skill revision, settings, and human corrections honestly.

Create evidence/comparison.md with level-two Markdown headings: `## Changes`, `## Verified`, and `## Remaining questions`. Explain the dependency changes, independent testability, HTTP compatibility and limitations. Source excerpts and command results must support the claims. Two independent implementations are not required.

## Challenge artifacts

- evidence/architecture-review.html: copy the real skill-generated report from temporary storage. Its presence does not prove the recommendation is good; the reviewer assesses its reasoning and the recorded discussion.
- evidence/design-decision.md: headings Chosen design, Alternatives, Test surface, Dependencies. Identify the selected recommendation, trade-offs, rejected alternatives, injected dependencies and why the module's interface is sufficient. Record any proposed glossary/ADR edits here.
- evidence/refactor-map.md: headings Before, After, Production wiring. Include plain-text dependency diagrams and source citations; explain how existing callers reach the new module and both adapter implementations.
- evidence/contract-before.json and evidence/contract-after.json: actual snapshots from the provided commands. Results, errors, stored items and ordered events must match.
- evidence/history.json: full characterizationSha and refactorSha.
- workflow-refactor-app/src/decisionWorkflow.characterization.test.mjs: precommitted public test that passes before and after and fails when the public function is broken.

## Skill use

Create evidence/skill-use.md with:

```text
## improve-codebase-architecture
Source: https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md
Revision: <actual installed upstream 40-character SHA>
Invocation: <actual scoped request>
Proof: evidence/skill-session.txt:L<first-line>-L<last-line>
```

Retain the real invocation, report output, candidate selection, design discussion, explorer results and implementation handoff in evidence/skill-session.txt. Summaries written as if they were sessions do not count. Also record versions of related skills. Automated checks validate source, revision format and referenced transcript lines; a human reviews whether the skill was actually applied.

## Source audit and phase proof

Create evidence/source-audit.json with claims covering module-design, independent-tests, production-wiring and behavior-parity. Each claim needs a unique id, topic, status (supported, contradicted or unresolved), reason, artifact {path,line,excerpt}, and sources [{path,line,excerpt}]. Use exercise-relative paths and one-based lines with exact excerpts. Artifacts must be declared outputs; authoritative sources must be code, protected inputs, captured checks or the actual skill transcript, not another submitted report.

Keep evidence/commands/baseline.txt, characterization.txt and implementation.txt generated at their recorded commits. All three must pass. Commit artifacts, seal them, then capture evidence/commands/verify.txt and commit it with evidence/manifest.json. Follow [setup](./setup.md). The final verification regenerates observations and replays history without modifying repository state.
