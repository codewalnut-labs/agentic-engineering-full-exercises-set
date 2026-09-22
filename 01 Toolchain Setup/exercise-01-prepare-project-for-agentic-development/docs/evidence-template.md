# Evidence instructions and template

All submitted paths are relative to this exercise folder. Use the commit order in [setup.md](./setup.md). This exercise compares initial readiness with the verified setup. It does not require two implementations, `before.patch`, `after.patch`, or a claim that the first attempt failed.

## Observations

Create `evidence/before.md` and `evidence/after.md` with `## Conditions`, `## Findings`, and `## Proof`. Record source commit, agent/model (or unavailable), runtime version, tools and permissions, inherited instructions/skills, elapsed time, and human input or corrections. Before records the initial gaps; after records demonstrated capabilities and remaining limitations. Link to raw evidence.

Use `## Changes`, `## Verified`, and `## Remaining questions` in `evidence/comparison.md`. Distinguish installation, discovery, and observed skill use. Record an already-working capability honestly.

## Setup outputs

- `agent-setup-app/AGENTS.md`: your repository-specific guidance, with exact working commands and links to supporting project documents.
- `agent-setup-app/docs/agent-setup.md`: how another developer reproduces and invokes the setup, dependency decisions, sources, and limitations.
- The installed project skills and supporting configuration/resources. Include any runtime adapter needed to load AGENTS.md. Do not submit secrets, caches, dependencies, home-directory symlinks, or prewritten readiness answers as agent guidance.

## Skill inventory

Write `evidence/skills.json` with this structure. Replace the descriptive angle-bracket values with real values; this example is not an installed skill.

```json
{
  "version": 1,
  "configurationFiles": ["agent-setup-app/AGENTS.md", "agent-setup-app/docs/agent-setup.md"],
  "skills": [{
    "name": "<installed skill name>",
    "source": "https://<upstream skill source>",
    "revision": "<full upstream commit SHA, or unavailable>",
    "root": "agent-setup-app/.agents/skills/<skill-folder>",
    "entry": "agent-setup-app/.agents/skills/<skill-folder>/SKILL.md",
    "capabilities": ["requirements"],
    "dependsOn": [],
    "files": [{"path": "agent-setup-app/.agents/skills/<skill-folder>/SKILL.md", "sha256": "<64-character SHA-256>"}]
  }]
}
```

Cover `requirements`, `research`, `tdd`, and `review` across the collection. Supporting skills can use an empty capabilities array. Every declared dependency must be present; explain conditional dependencies, unavailable upstream revisions, and adaptations in the setup document. Entries must be real SKILL.md files with name and description metadata. Each skill's files list must cover every file under its root, including references, scripts, and license files. Hash UTF-8 content with CRLF normalized to LF, matching the evidence manifest. Use text-only skill packages for this challenge. Other native skill directory names are allowed inside the application if supported by your runtime and documented.

List all additional instruction/configuration/support files in configurationFiles. Skills and configuration must exist unchanged at the recorded setup commit. Final sealing includes all these files. Symlinks and overlapping skill roots are rejected so the setup remains portable; use the installer's copy option where available.

If a demonstrated skill produces project knowledge documents, add an optional `generatedFiles` array to skills.json with their exercise-relative paths. These may be `agent-setup-app/CONTEXT.md` or files under `agent-setup-app/docs/`, such as ADRs. They are scenario outputs, not setup instructions: they need not exist at the setup commit, but must be committed before sealing and are included in the evidence manifest. They cannot replace configuration, installed skill resources, or protected inputs. Do not place scenario answers in AGENTS.md or other instructions loaded before the session.

## Fresh-session evidence

Submit the actual transcript as `evidence/session.txt`, including discovery, skill invocations, relevant tool output, and human exchanges. Redact secrets only; do not replace it with a reconstructed narrative. If a skill uses other agents, include their relevant invocation and output in the exported transcript, retaining provenance.

Write `evidence/readiness.json`:

```json
{
  "version": 1,
  "session": {
    "agent": "<agent>", "version": "<runtime version>", "model": "<model or unavailable>",
    "setupCommit": "<full SHA>", "startedAt": "<ISO timestamp>", "fresh": true,
    "launchDirectory": "agent-setup-app",
    "inheritedConfiguration": "<global instructions and skills, or none>",
    "interventions": []
  },
  "discovery": {"firstLine": 1, "lastLine": 10},
  "scenarios": [{
    "id": "requirements",
    "skills": ["<installed skill with this capability>"],
    "invocation": "<actual prompt or command>",
    "proof": {"firstLine": 11, "lastLine": 20}
  }]
}
```

Include exactly one scenario for each of `requirements`, `research`, `tdd`, and `review`. Transcript line numbers are one-based and inclusive. Each proof must contain the recorded invocation and the resulting work. Discovery must mention AGENTS.md and all installed skill names. Explicit invocation is valid. Record human input/corrections in interventions; distinguish intended interview answers from corrective hints in the narrative. A fresh-session declaration is checked for consistency, not independently authenticated.

## Scenario reports

- `evidence/requirements.md`: headings `## Known facts`, `## Questions`, `## Unresolved decisions`. Cite existing code and distinguish product decisions from implementation. An unanswered product question is an appropriate outcome.
- `evidence/research.md`: headings `## Recommendation`, `## Sources`, `## Limitations`. Link at least two relevant primary-source pages and the current component. Report what sources establish and what you infer.
- `evidence/tdd.md`: headings `## Interface`, `## Existing assertion`, `## Next test`, `## Baseline`, `## Limits`. Reference an existing test by file and line, explain an expected outcome for the next test and what makes it fail, and link `evidence/commands/baseline.txt`. This is readiness evidence, not proof of a red/green cycle.
- `evidence/review.md`: headings `## Requirements`, `## Standards`, `## Findings`, `## Remaining uncertainty`. Cite the supplied spec, standards, and changed code. Explain observed consequences; report clean areas honestly.

## Source audit

Submit `evidence/source-audit.json` with a `claims` array. Each entry contains a unique `id`, `topic`, `status` (`supported`, `contradicted`, or `unresolved`), `reason`, `artifact`, and non-empty `sources` array. Artifact and source references are `{ "path": "<exercise-relative file>", "line": <one-based line>, "excerpt": "<exact complete line(s)>" }`.

Cover the topics `commands`, `boundaries`, `requirements`, `research`, `tdd`, `review`. Cite important AGENTS.md claims against package scripts, code, or project notes. Cite each scenario's findings against supplied sources; for research, also link external primary pages in the report. The audit checks the local component reference, not the web page's truth. Artifacts are AGENTS.md, docs/agent-setup.md, or the four reports. Sources must be supplied application code/docs/tests/package.json or fixtures/review files. A generated output cannot justify itself.

## Verification

`evidence/commands/baseline.txt` must capture `npm run test:behavior` at session.setupCommit with a successful exit code. `evidence/manifest.json` and `evidence/commands/verify.txt` follow the setup guide's commit/seal/capture sequence. Never type successful results or edit hashes to conceal changes.

Automated checks establish consistency, protected inputs, installed-file completeness, declared dependency closure, scenario coverage, real citation locations, and committed/captured evidence. They cannot establish that an agent obeyed instructions or that a research/review conclusion is correct. Reviewers inspect the raw session and may replay a new request. Do not equate a green verifier with proof of every workflow behaviour.
