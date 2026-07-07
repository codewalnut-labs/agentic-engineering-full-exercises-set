# Agentic Engineering Full Exercises Set

This project turns 12 agentic engineering competencies into hands-on engineering labs. Each competency has multiple medium-sized exercises with starter code, working deliverables, verification evidence, and a review bar.

Each lab follows a consistent structure: a short exercise README, a starter codebase, a focused agent workflow, and a working change kept inside the exercise folder.

## Curriculum Rule

These exercises are for experienced software engineers and engineering leaders learning to master Codex, Claude Code, Cursor, and similar coding agents. They are not Markdown-only writing drills.

Every exercise requires a working change in code, tests, automation, configuration, skills, hooks, CI, or team operating workflow. Markdown artifacts are used only to frame intent, preserve evidence, and make review easier.

See [COMPETENCY_PRACTICE_GUIDE.md](./COMPETENCY_PRACTICE_GUIDE.md) for the competency definitions and practice behaviors, [AGENT_SKILL_PATTERNS.md](./AGENT_SKILL_PATTERNS.md) for the popular skill pattern map, and [AGENTIC_ENGINEERING_RUBRIC.md](./AGENTIC_ENGINEERING_RUBRIC.md) for the shared completion bar.

## How Learners Should Use This Repo

1. Pick one competency folder.
2. Pick one exercise.
3. Work only inside that exercise folder.
4. Use your coding agent to inspect, plan, implement, verify, review, and improve the system around the work.
5. Do not stop at a Markdown artifact; ship the working change and the evidence that proves it.
6. Commit your solution as if opening a PR for review.

## Requirements

- Node.js 20+ for React starter projects.
- npm or pnpm.
- Java 21 and Maven for the Spring Boot starter projects.
- Claude Code, Codex, Cursor, or another AI coding agent.

## Exercise Index

Use the index below to choose a lab, then read the local exercise README for the scenario, workflow, deliverables, and evidence gate.

| Competency | # | Exercise | Starter |
|---|---:|---|---|
| 01. Toolchain Setup | 01 | [Reproducible Agent Workstation](./01%20Toolchain%20Setup/exercise-01-reproducible-agent-workstation/README.md) | React + TypeScript |
| 01. Toolchain Setup | 02 | [Guardrailed CLI Workshop](./01%20Toolchain%20Setup/exercise-02-guardrailed-cli-workshop/README.md) | React + TypeScript |
| 01. Toolchain Setup | 03 | [Agent Check Bootstrap](./01%20Toolchain%20Setup/exercise-03-ci-evidence-bootstrap/README.md) | React + TypeScript |
| 02. Spec Framing | 01 | [Ambiguous Bulk Refund Spec](./02%20Spec%20Framing/exercise-01-ambiguous-bulk-refund-spec/README.md) | React + TypeScript |
| 02. Spec Framing | 02 | [Contract-First Scheduling API](./02%20Spec%20Framing/exercise-02-contract-first-scheduling-api/README.md) | React + TypeScript, Spring Boot |
| 02. Spec Framing | 03 | [Risk-First RBAC Design Doc](./02%20Spec%20Framing/exercise-03-risk-first-rbac-design-doc/README.md) | React + TypeScript |
| 02. Spec Framing | 04 | [Grill-Me Decision Tree Spec](./02%20Spec%20Framing/exercise-04-grill-me-decision-tree-spec/README.md) | React + TypeScript |
| 02. Spec Framing | 05 | [PRD to Issues Vertical Slicer](./02%20Spec%20Framing/exercise-05-prd-to-issues-vertical-slicer/README.md) | React + TypeScript |
| 03. Context Engineering | 01 | [Repo Context Pack for Bugfix Agents](./03%20Context%20Engineering/exercise-01-repo-context-pack-for-bugfix-agents/README.md) | React + TypeScript |
| 03. Context Engineering | 02 | [Token-Budgeted Feature Delivery](./03%20Context%20Engineering/exercise-02-token-budgeted-feature-delivery/README.md) | React + TypeScript |
| 03. Context Engineering | 03 | [MCP Context Server for Product Data](./03%20Context%20Engineering/exercise-03-mcp-context-server-for-product-data/README.md) | React + TypeScript |
| 03. Context Engineering | 04 | [Context-First NFR X-Ray](./03%20Context%20Engineering/exercise-04-context-first-nfr-x-ray/README.md) | React + TypeScript |
| 03. Context Engineering | 05 | [Graphify Knowledge Graph Lab](./03%20Context%20Engineering/exercise-05-graphify-knowledge-graph-lab/README.md) | React + TypeScript |
| 03. Context Engineering | 06 | [Intent Layer Repo Map](./03%20Context%20Engineering/exercise-06-intent-layer-repo-map/README.md) | React + TypeScript |
| 04. Test Automation | 01 | [Flaky Checkout E2E Rescue](./04%20Test%20Automation/exercise-01-flaky-checkout-e2e-rescue/README.md) | React + TypeScript |
| 04. Test Automation | 02 | [Component Tests With Network Boundaries](./04%20Test%20Automation/exercise-02-component-tests-with-network-boundaries/README.md) | React + TypeScript |
| 04. Test Automation | 03 | [Spring Boot Integration Test Gate](./04%20Test%20Automation/exercise-03-spring-boot-integration-test-gate/README.md) | React + TypeScript, Spring Boot |
| 04. Test Automation | 04 | [TDD Skill Red-Green Refactor](./04%20Test%20Automation/exercise-04-tdd-skill-red-green-refactor/README.md) | React + TypeScript |
| 05. Skill Packaging | 01 | [Review Checklist Skill Pack](./05%20Skill%20Packaging/exercise-01-review-checklist-skill-pack/README.md) | React + TypeScript |
| 05. Skill Packaging | 02 | [Release Notes Skill Factory](./05%20Skill%20Packaging/exercise-02-release-notes-skill-factory/README.md) | React + TypeScript |
| 05. Skill Packaging | 03 | [Migration Playbook Skill](./05%20Skill%20Packaging/exercise-03-migration-playbook-skill/README.md) | React + TypeScript |
| 05. Skill Packaging | 04 | [Skill Trigger Eval Harness](./05%20Skill%20Packaging/exercise-04-skill-trigger-eval-harness/README.md) | React + TypeScript |
| 05. Skill Packaging | 05 | [Cross-Agent Skill Portability Pack](./05%20Skill%20Packaging/exercise-05-cross-agent-skill-portability-pack/README.md) | React + TypeScript |
| 06. Multi-Agent Workflows | 01 | [Parallel Worktree Feature Split](./06%20Multi-Agent%20Workflows/exercise-01-parallel-worktree-feature-split/README.md) | React + TypeScript |
| 06. Multi-Agent Workflows | 02 | [Subagent NFR Swarm](./06%20Multi-Agent%20Workflows/exercise-02-subagent-nfr-swarm/README.md) | React + TypeScript |
| 06. Multi-Agent Workflows | 03 | [Conflict-Tolerant Migration Board](./06%20Multi-Agent%20Workflows/exercise-03-conflict-tolerant-migration-board/README.md) | React + TypeScript |
| 06. Multi-Agent Workflows | 04 | [Kanban Triage Worktree Control Plane](./06%20Multi-Agent%20Workflows/exercise-04-kanban-triage-worktree-control-plane/README.md) | React + TypeScript |
| 07. Docs & Diagrams | 01 | [ADR for Architecture Change](./07%20Docs%20&%20Diagrams/exercise-01-adr-for-architecture-change/README.md) | React + TypeScript |
| 07. Docs & Diagrams | 02 | [C4 and Sequence Diagram From Code](./07%20Docs%20&%20Diagrams/exercise-02-c4-and-sequence-diagram-from-code/README.md) | React + TypeScript |
| 07. Docs & Diagrams | 03 | [Runbook Drift Repair](./07%20Docs%20&%20Diagrams/exercise-03-runbook-drift-repair/README.md) | React + TypeScript |
| 07. Docs & Diagrams | 04 | [Workflow Diagram Reconstruction](./07%20Docs%20&%20Diagrams/exercise-04-workflow-diagram-reconstruction/README.md) | React + TypeScript |
| 07. Docs & Diagrams | 05 | [Codebase Graph to Diagrams](./07%20Docs%20&%20Diagrams/exercise-05-codebase-graph-to-diagrams/README.md) | React + TypeScript |
| 07. Docs & Diagrams | 06 | [Excalidraw Diagram Generator Lab](./07%20Docs%20&%20Diagrams/exercise-06-excalidraw-diagram-generator-lab/README.md) | React + TypeScript |
| 08. Evidence-led PRs | 01 | [PR Evidence Pack Automation](./08%20Evidence-led%20PRs/exercise-01-pr-evidence-pack-automation/README.md) | React + TypeScript |
| 08. Evidence-led PRs | 02 | [Feature Flag Rollback Proof](./08%20Evidence-led%20PRs/exercise-02-feature-flag-rollback-proof/README.md) | React + TypeScript |
| 08. Evidence-led PRs | 03 | [Performance and A11y Evidence Gate](./08%20Evidence-led%20PRs/exercise-03-performance-and-a11y-evidence-gate/README.md) | React + TypeScript |
| 09. Code Review | 01 | [Security and A11y Review Gauntlet](./09%20Code%20Review/exercise-01-security-and-a11y-review-gauntlet/README.md) | React + TypeScript |
| 09. Code Review | 02 | [Diff Triage With Fresh Agent](./09%20Code%20Review/exercise-02-diff-triage-with-fresh-agent/README.md) | React + TypeScript |
| 09. Code Review | 03 | [Review Regression Lab](./09%20Code%20Review/exercise-03-review-regression-lab/README.md) | React + TypeScript |
| 09. Code Review | 04 | [PR Diff Review](./09%20Code%20Review/exercise-04-pr-diff-review/README.md) | React + TypeScript |
| 09. Code Review | 05 | [Code Review Graph Skill](./09%20Code%20Review/exercise-05-code-review-graph-skill/README.md) | React + TypeScript |
| 10. Token Economics | 01 | [Token Budget Refactor](./10%20Token%20Economics/exercise-01-token-budget-refactor/README.md) | React + TypeScript |
| 10. Token Economics | 02 | [Context Cache Hygiene Challenge](./10%20Token%20Economics/exercise-02-context-cache-hygiene-challenge/README.md) | React + TypeScript |
| 10. Token Economics | 03 | [Model Routing Cost Planner](./10%20Token%20Economics/exercise-03-model-routing-cost-planner/README.md) | React + TypeScript |
| 10. Token Economics | 04 | [Ponytail Minimal-Diff Budget](./10%20Token%20Economics/exercise-04-ponytail-minimal-diff-budget/README.md) | React + TypeScript |
| 11. Agentic Refactoring | 01 | [Characterization Test Refactor](./11%20Agentic%20Refactoring/exercise-01-characterization-test-refactor/README.md) | React + TypeScript |
| 11. Agentic Refactoring | 02 | [Strangler Pattern Checkout](./11%20Agentic%20Refactoring/exercise-02-strangler-pattern-checkout/README.md) | React + TypeScript |
| 11. Agentic Refactoring | 03 | [Legacy Rules Engine Untangle](./11%20Agentic%20Refactoring/exercise-03-legacy-rules-engine-untangle/README.md) | React + TypeScript, Spring Boot |
| 12. Agentic Retrospective | 01 | [Session Waste Retro From Logs](./12%20Agentic%20Retrospective/exercise-01-session-waste-retro-from-logs/README.md) | React + TypeScript |
| 12. Agentic Retrospective | 02 | [Rule Hardening From Repeated Mistakes](./12%20Agentic%20Retrospective/exercise-02-rule-hardening-from-repeated-mistakes/README.md) | React + TypeScript |
| 12. Agentic Retrospective | 03 | [Skill and Hook Improvement Loop](./12%20Agentic%20Retrospective/exercise-03-skill-and-hook-improvement-loop/README.md) | React + TypeScript |
| 12. Agentic Retrospective | 04 | [Skill Optimizer From Traces](./12%20Agentic%20Retrospective/exercise-04-skill-optimizer-from-traces/README.md) | React + TypeScript |

## Repository Rule

Keep solutions scoped to the selected exercise. Do not change unrelated exercise folders.
