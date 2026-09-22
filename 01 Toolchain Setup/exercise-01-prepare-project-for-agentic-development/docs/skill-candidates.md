# Engineering skill candidates

Choose a coherent collection that covers requirements questioning, research, TDD, and review. These are reference options, not a required bundle. One skill may cover multiple capabilities; supporting skills may cover none directly. Install dependencies and referenced resources, not just SKILL.md files. Explain the selection and any adaptation in your setup document.

The following upstream sources were reviewed on 2026-09-14. Their default branches can change; record the revision and file hashes actually installed.

| Candidate | Purpose and integration considerations |
|---|---|
| [setup-matt-pocock-skills](https://github.com/mattpocock/skills/tree/main/skills/engineering/setup-matt-pocock-skills) | Establishes issue-tracker and domain-document conventions. This configures that skill collection; it does not install Node or replace repository inspection. Local Markdown issues can keep the exercise self-contained. |
| [grill-with-docs](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs) | Composes `grilling` and `domain-modeling`; both must be available. The upstream entry is explicitly user-invoked. A clarification session needs human participation; unresolved decisions can remain open in this exercise. |
| [research](https://github.com/mattpocock/skills/tree/main/skills/engineering/research) | Investigates primary sources and writes cited findings. The reviewed version uses a background agent; choose a runtime supporting that or a compatible alternative and record the difference. |
| [tdd](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) | Works through behavioural tests at agreed public interfaces. Includes supporting references and conditionally invokes `codebase-design` when interface design needs investigation. |
| [code-review](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review) | Reviews a non-empty Git diff against standards and a spec, using parallel specialist agents. Requires issue-tracker conventions. The supplied temporary review repository provides the fixed comparison and local spec. |

Inspect the selected versions for additional dependencies. If you adapt a skill for your runtime, retain attribution and license, record the upstream revision and changes, and prove the adapted workflow works. Do not claim an unsupported workflow succeeded.

Installation and discovery references: [skills CLI](https://github.com/vercel-labs/skills), [Codex skills](https://developers.openai.com/codex/skills), [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Claude Code skills](https://code.claude.com/docs/en/skills), [Claude Code memory](https://code.claude.com/docs/en/memory). Native loading mechanisms differ. A Claude Code setup must explicitly load the canonical AGENTS.md through its supported instruction mechanism; its presence alone is insufficient.
