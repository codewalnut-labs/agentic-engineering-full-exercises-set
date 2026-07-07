**Exercise 03**

# Runbook Drift Repair

## Competency

07. Docs & Diagrams - Diagrams and architecture decision records

## Your Mission

Update stale support docs and diagrams after verifying how the current app actually handles incidents.

## Starter Project

```text
07 Docs & Diagrams/exercise-03-runbook-drift-repair/starter-react
```

Run the React starter:

```bash
cd "07 Docs & Diagrams/exercise-03-runbook-drift-repair/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

A stale runbook is repaired by changing code, checks, and docs together.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Use agents to capture decisions while the context is still fresh.

Practice signals for this exercise:

- Record decisions as ADRs with what, why, alternatives, and trade-offs.
- Generate flowcharts, sequence diagrams, state diagrams, and C4 diagrams from code.
- Make architecture-change ADRs part of normal PR flow.
- Verify generated diagrams against code before trusting them.

Common mistake to avoid: A generated diagram that is slightly wrong is worse than none because people trust it.

Mastery signal: The why behind decisions is committed, docs evolve with code, and newcomers or agents can onboard from the repo.

## Hands-On Scope

- Compare the runbook against actual incident handling code and current app behavior.
- Fix drift in code, scripts, or docs where the current behavior is wrong or unclear.
- Add an incident smoke test or scripted reproduction.
- Update diagrams only after the verified behavior is known.

## Required Working Deliverables

- Runbook update grounded in actual code behavior.
- Code/config fixes for discovered drift where needed.
- Incident smoke test or reproduction script.
- Verification evidence for the support path.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one senior owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Would on-call trust this runbook during an incident?
