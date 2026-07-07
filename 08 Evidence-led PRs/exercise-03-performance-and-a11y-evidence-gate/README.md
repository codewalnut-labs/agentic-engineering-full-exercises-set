**Exercise 03**

# Performance and A11y Evidence Gate

## Competency

08. Evidence-led PRs - PR gate evidence and handoff

## Your Mission

Attach performance and accessibility evidence to a UI change so reviewers can judge risk quickly.

## Starter Project

```text
08 Evidence-led PRs/exercise-03-performance-and-a11y-evidence-gate/starter-react
```

Run the React starter:

```bash
cd "08 Evidence-led PRs/exercise-03-performance-and-a11y-evidence-gate/starter-react"
npm install
npm run dev
```

## Lab Outcome

Performance and accessibility are measured and improved before review.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Do not ask reviewers to trust agent-written code. Put the proof in the PR.

Practice signals for this exercise:

- Treat quality gates as deliverables with commands, location, risk, and approval evidence.
- Write the PR so reviewers understand intent before reading the diff.
- Attach test results, coverage, screenshots, outputs, traces, and profiles where useful.
- Let CI produce evidence automatically while humans keep judgment calls.

Common mistake to avoid: A green checkmark without visible evidence still makes reviewers reconstruct the work.

Mastery signal: Reviewers stop asking whether it was tested, evidence is mostly automated, and merge confidence comes from proof.

## Hands-On Scope

- Run or add automated performance and accessibility checks relevant to the starter.
- Fix at least one real issue discovered by those checks.
- Capture before/after evidence.
- Fail the gate when regressions exceed the chosen threshold.

## Required Working Deliverables

- Performance/a11y check configuration.
- Code fixes for measured issues.
- Before/after reports or screenshots.
- Thresholds documented in the PR evidence pack.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Review Bar

Are NFRs visible enough that reviewers cannot accidentally ignore them?
