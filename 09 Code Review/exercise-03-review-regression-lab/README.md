**Exercise 03**

# Review Regression Lab

## Competency

09. Code Review - Code quality and risk review for merge confidence

## Your Mission

Find subtle regressions in a large agent-written UI diff that appears clean at first glance.

## Starter Project

```text
09 Code Review/exercise-03-review-regression-lab/starter-react
```

Run the React starter:

```bash
cd "09 Code Review/exercise-03-review-regression-lab/starter-react"
npm install
npm run dev
```

## PR To Review

```text
09 Code Review/exercise-03-review-regression-lab/pr/review-target.diff
```

## Lab Outcome

Subtle clean-looking regressions are caught by behavior tests and review discipline.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

AI code can look clean and still be wrong. Review proves it is safe to merge.

Practice signals for this exercise:

- Review with a fresh agent or different model to catch what the implementer missed.
- Use specialist checks for security, accessibility, performance, and other NFRs when needed.
- Make NFRs explicit because agents often defer them unless asked.
- Read the diff yourself and be able to explain every meaningful change.

Common mistake to avoid: Looks right is the trap; clean-looking agent code is not the same as correct code.

Mastery signal: Fresh review adds signal, security and accessibility are explicit checks, and the owner can explain why the merge is safe.

## Hands-On Scope

- Ask a fresh model or session to review the supplied diff for behavior drift and NFR risk.
- Verify each finding yourself against filtering, sorting, risk scoring, permissions, empty states, accessibility, and performance.
- Write tests that fail on the true regressions, then patch the implementation to restore intended behavior.
- Triage every finding as fix, defer, or dismiss with evidence, then re-review after the patch.

## Required Working Deliverables

- Failing-then-passing regression tests.
- Code fixes for the regressions.
- Review summary with severity and evidence.
- Residual risk notes for anything deferred.

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

Would this review stop a large agent PR that merely looks clean?
