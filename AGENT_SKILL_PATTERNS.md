# Agent Skill Pattern Map

This map captures popular agent skill patterns that are useful for advanced agentic engineering practice. The exercises do not require installing any one third-party skill; they teach the workflow patterns behind them.

| Pattern | Practice Value | Added Exercise |
|---|---|---|
| grill-me / grill-with-docs | Stress-test ambiguous plans through a decision-tree interview before implementation. | 02 Spec Framing / Exercise 04 |
| to-prd / to-issues | Convert conversation into PRDs and independently grabbable vertical slices. | 02 Spec Framing / Exercise 05 |
| graphify | Build durable codebase graphs that reduce repeated raw-file scanning. | 03 Context Engineering / Exercise 05 |
| intent-layer / zoom-out | Add folder-level intent notes and architecture maps agents can use repeatedly. | 03 Context Engineering / Exercise 06 |
| tdd | Keep agents in a red-green-refactor loop instead of broad speculative rewrites. | 04 Test Automation / Exercise 04 |
| skill evals / skill optimizer | Measure trigger accuracy, process adherence, output shape, and regressions. | 05 Skill Packaging / Exercise 04 |
| cross-agent skill standardization | Make team skills portable across Codex, Claude Code, Cursor, Gemini CLI, and similar agents. | 05 Skill Packaging / Exercise 05 |
| triage / to-issues / kanban board | Turn noisy work into isolated, reviewable agent cards with merge ownership. | 06 Multi-Agent Workflows / Exercise 04 |
| graph-to-diagram | Generate diagrams from graph context, then verify them against code. | 07 Docs & Diagrams / Exercise 05 |
| Excalidraw diagram generator | Produce editable `.excalidraw` JSON diagrams with validation, readable layout, and source verification. | 07 Docs & Diagrams / Exercise 06 |
| code review graph | Review large diffs by structural call paths and ownership boundaries. | 09 Code Review / Exercise 05 |
| Ponytail minimal-diff ladder | External minimal-diff skill pattern: skip, reuse, or use platform features before writing new code while preserving safety checks. | 10 Token Economics / Exercise 04 |
| trace-backed skill optimizer | Turn failed traces into durable skill, rule, hook, or eval improvements. | 12 Agentic Retrospective / Exercise 04 |

## Selection Notes

- Skills should encode repeatable engineering behavior, not just a clever prompt.
- Good skill exercises include trigger criteria, non-use cases, concrete artifacts, and measurable checks.
- An experienced team should be able to adapt these patterns to its own repo, review rules, release process, and agent surfaces.
