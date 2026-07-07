**Exercise 05**

# Code Review Graph Skill

## Competency

09. Code Review - Agent-assisted review and quality risk detection

## Popular Agent Skill Pattern

code review graph

## Your Mission

Use structural graph context to review a large agent-written discount change by call path, ownership, and risk.

## Starter Project

```text
09 Code Review/exercise-05-code-review-graph-skill/starter-react
```

Run the React starter:

```bash
cd "09 Code Review/exercise-05-code-review-graph-skill/starter-react"
npm install
npm run dev
```

## Lab Outcome

Review findings are grounded in diff scope, graph relationships, tests, and NFR checks instead of reading files randomly.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Use the skill pattern as an operating workflow, not as a prompt shortcut.

Practice signals for this exercise:

- Package the repeated workflow into explicit steps, trigger conditions, and evidence checks.
- Keep the agent focused on the smallest useful slice of the domain.
- Verify the skill pattern against code, tests, traces, or review artifacts.
- Record the decisions future humans or agents need to continue safely.

Common mistake to avoid: Treating the skill name as magic and skipping the engineering control loop around it.

Mastery signal: The skill pattern changes how the work is planned, executed, verified, and handed off.

## Hands-On Scope

- Ask a fresh agent or session for graph-assisted review.
- Review the diff yourself before accepting findings.
- Patch at least one confirmed blocker.
- Run a re-review or focused check on the patched area.

## Required Working Deliverables

- Graph-guided review report.
- Confirmed blocker fix in React code.
- Regression test or script check.
- Triage table for every finding.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Review starts from diff and issue list, then uses graph paths for risk expansion.
- Findings are severity-ranked with file references and reproduction steps.
- NFR pass covers security, accessibility, performance, and maintainability where relevant.
- Accepted, deferred, and dismissed findings are triaged with rationale.

## Leadership Review

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
