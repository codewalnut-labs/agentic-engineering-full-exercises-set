**Exercise 02**

# C4 and Sequence Diagram From Code

## Competency

07. Docs & Diagrams - Diagrams and architecture decision records

## Your Mission

Reverse engineer the feature and create C4-style and sequence diagrams that match the actual code paths.

## Starter Project

```text
07 Docs & Diagrams/exercise-02-c4-and-sequence-diagram-from-code/starter-react
```

Run the React starter:

```bash
cd "07 Docs & Diagrams/exercise-02-c4-and-sequence-diagram-from-code/starter-react"
npm install
npm run dev
```

## Lab Outcome

Diagrams are generated from real code paths and verified by a trace or test.

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

- Trace the feature from UI event through state, service, and persistence/mock boundaries.
- Create C4-style and sequence diagrams from that trace.
- Add a small script, test, or trace artifact that proves diagram steps still exist in code.
- Fix any diagram-code mismatch you discover.

## Required Working Deliverables

- C4 and sequence diagrams.
- Trace/test artifact validating diagram accuracy.
- Any code or docs fixes needed to remove drift.
- Review note explaining verified and intentionally omitted paths.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Would a future agent onboard from these diagrams without learning the wrong system?
