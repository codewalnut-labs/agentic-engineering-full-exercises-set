# Repository Critique â€” Agentic Engineering Full Exercises Set

*Reviewer pass: structure, exercise quality, developer experience, code quality, learning effectiveness, and professional standards. Based on a full read of the 12 module folders, 52 exercises, 7 root documents, the shared project scaffolds, and git history.*

## Snapshot

| Metric | Value |
|---|---|
| Modules (competencies) | 12 |
| Exercises | 52 |
| Tracked files (excl. `.git`) | ~1,484 |
| Project stacks | Node app repositories (primary); Java 21 API repositories (3 exercises) |
| Root guidance docs | 7 (README, rubric, practice guide, matrix, skill map, AGENTS.md, research sources) |
| Reference solutions | 0 |
| CI / LICENSE / CONTRIBUTING | None |
| Real test frameworks | 3 exercises (Vitest / Playwright / Testing Library); rest use hand-rolled `.mjs` checks |

**Headline:** This is a genuinely well-designed curriculum â€” coherent thesis, unusually consistent structure, real-world scenarios, and per-exercise machine-readable contracts. It reads like the work of someone who has actually run agents in production. The gaps are almost entirely at the *repository engineering* layer (no CI, no license, simulated tooling, no reference solutions), not the *pedagogy* layer.

---

## 1. Repository Structure

**What works**

The two-level hierarchy â€” `NN Competency Name/exercise-NN-kebab-slug/` â€” is clean and predictable. Every exercise folder holds the same skeleton: `README.md`, a seed folder when needed, and a named project repository such as `payment-workflow-app/`. A reader can navigate any exercise blind and know where things live. The root `README.md` index table maps exercises to their project repositories, and `EXERCISE_MATRIX.md` gives one-line summaries â€” good wayfinding.

**Issues**

*Spaces in top-level folder names* (`01 Toolchain Setup`, `07 Docs & Diagrams`). Every `cd`, script path, and glob now requires quoting, and `&` in `07 Docs & Diagrams` is a shell metacharacter. This bit me repeatedly while reviewing (`grep` over the tree word-split on the spaces). It will bite learners and any automation the same way.
- *Why it's a problem:* fragile in shells, CI, and cross-platform checkouts; encourages copy-paste errors.
- *Fix:* rename to hyphenated slugs â€” `01-toolchain-setup`, `07-docs-and-diagrams` â€” and keep the pretty title inside the module `README.md` heading.

*Naming drift between folder and title.* Keep exercise slugs, titles, and index entries aligned whenever a lab is replaced. Pick one vocabulary so search and the index agree.

*Scaffold duplication at scale.* The same component skeleton (`ActionComposer`, `ActivityFeed`, `DetailPanel`, `WorkQueue`, `scoring.ts`, `filters.ts`â€¦) recurs across most of the ~1,484 files. Each `package.json` is unique (53 distinct hashes), so these are deliberate per-exercise variants rather than blind copies â€” but a change to the shared pattern must now be made ~50 times by hand.
- *Why it's a problem:* maintainability and drift. Without CI, nothing detects when one copy diverges or breaks.
- *Fix:* either extract a shared `starter-template/` and document per-exercise deltas, or (lighter touch) add a script that regenerates each starter from a template + a small per-exercise patch. At minimum, add CI that builds/type-checks all project repositories so drift is caught.

---

## 2. Exercise Quality

**What works â€” this is the repo's strongest dimension.**

Every exercise README now uses the compact approved section spine: **Your Mission -> Project -> How To Go About It -> Evidence**. The format is short enough to read quickly while still naming the repository, challenge, and evidence request.

Scenarios are convincingly real: bulk-refund specs, flaky checkout E2E, RBAC design, contract-first scheduling APIs, incident-workflow portals, discount rules engines. The seeded antipatterns are authentic â€” e.g. the flaky Playwright starter genuinely ships the two things you're meant to fix:

```ts
await page.waitForTimeout(500);          // fixed sleep
await page.locator(".queue-item").first().click();  // brittle CSS locator
```

Each exercise also carries a `lab-contract.json` â€” a machine-readable spec listing `seededDefects`, `verificationGates`, `agentWorkflow`, `workingDeliverables`, and `masterySignals`. This is a genuinely good idea: it doubles as an answer key for the check scripts and as a precise definition of done.

**Issues**

*No explicit difficulty or time signal.* All 52 READMEs are ~350â€“480 words with no "beginner/intermediate/advanced" tag and no time estimate (only one lab-contract mission mentions "under 30 minutes"). Progression exists only implicitly in module order.
- *Why it's a problem:* a learner can't plan a session or pick an on-ramp; the "beginner â†’ advanced" ramp the curriculum implies is invisible at the exercise level.
- *Fix:* add a small front-matter block to every README:
  ```
  **Level:** Intermediate Â· **Est. time:** 45â€“60 min Â· **Prereqs:** Module 03 Ex 01
  ```

*Header inconsistency.* `**Scenario:**` appears in only 1 of 52 READMEs even though it materially helps framing. Standardize the front-matter (Goal / Scenario / Outcome) across all exercises or drop Scenario deliberately.

*Assumed vocabulary.* Exercises freely use "hooks," "MCP server," "subagent swarm," "worktree control plane," "PreToolUse" without a shared glossary. Fine for the stated audience (experienced engineers), but even they will hit tool-specific terms. A one-page `GLOSSARY.md` linked from the root README would remove friction.

---

## 3. Developer Experience

**What works**

The root `README.md` is strong: curriculum rule, how-to-use steps, a requirements list (Node 20+, Java 21 + Maven, an agent), and a full index. Setup per project repository is the conventional `npm install && npm run dev`. `AGENTS.md` gives agents a tight house-rules file. Onboarding to *reading* the repo is easy.

**Issues â€” this is the weakest dimension.**

*No reference solutions, expected outputs, or worked examples anywhere (0 solution directories).* The only feedback a learner gets is the "Verify" checklist and the thin check scripts.
- *Why it's a problem:* self-directed learners cannot confirm whether their `AGENTS.md`, their spec, or their ADR is actually *good*. "Done when the rules are based on a real repo scan" is a judgment call with no exemplar. This caps the repo's usefulness for anyone without a mentor.
- *Fix:* add a `solution/` (or `reference/`) folder per exercise â€” even one worked example per module â€” kept out of the default view via a branch or a collapsible note. Pair it with a short "what a strong answer looks like" paragraph in the README.

*Prerequisites live only at the root.* Java 21 + Maven is required by 3 exercises but a learner discovers that only after opening them. Per-exercise prereqs (see Â§2 fix) solve this.

*External-dependency fragility.* Several exercises route through third-party skills/tools: `npx skills@latest add mattpocock/skills`, Graphify, Ponytail, the Excalidraw skill. These are great for real-world relevance but are outside the repo's control.
- *Why it's a problem:* link rot and API drift will silently break exercises; a learner can't tell whether the failure is theirs.
- *Fix:* for each external dependency, vendor a fallback (a copy of the skill file, already linked in one case) and add a dated "verified working as of YYYY-MM" note. `RESEARCH_SOURCES.md` is a good start; extend the same discipline to the runnable dependencies.

---

## 4. Code Quality

**What works**

Project code is clean, modern, and readable. Types are explicit; functions are small and pure (e.g. `scoring.ts` â€” `calculateRisk`, `riskLabel`, `summarizePortfolio` are tidy and easy to reason about). React 19 / TS 5.9 / Vite 7 is current. Seeded defects are intentional and documented in `lab-contract.json` rather than being accidental sloppiness. The API repository is properly layered (controller / service / repository / exception handler) with real JUnit tests.

**Issues**

*"lint," "test," and "format" are simulated.* 49 exercises' `npm run lint/test/format` map to hand-rolled `.mjs` scripts. `lint-check.mjs` greps a source file for weak phrases ("placeholder", "TODO:"); `agent-check.mjs` validates that `lab-contract.json` has â‰¥3 entries per array. Only 3 exercises use real ESLint/Prettier/Vitest/Playwright.
- *Why it's a problem:* it's pedagogically ironic that **Module 01 is "Toolchain Setup"** yet the toolchain is faux. A learner running `npm run lint` believes they linted; they ran a phrase-grep. It also means the project repositories teach nothing about configuring the real tools the curriculum name promises.
- *Trade-off acknowledged:* the fake scripts keep the repo dependency-light and deterministic, which has real value. But at least the Toolchain, Test Automation, and Code Review modules should use the genuine tools they're teaching, with the custom scripts reserved for contract-validation only. Rename the custom ones to `contract-check` so nobody mistakes them for linting.

*Real test frameworks appear in only 3 of 52 exercises.* For a curriculum this centered on verification and evidence, more exercises could ship a real (failing) test to anchor the work.

*Error handling in project repositories is minimal by design* â€” acceptable, but a couple of exercises would teach more if the starter modeled a realistic error/loading/empty state rather than a happy path.

---

## 5. Learning Effectiveness

**What works**

The conceptual scaffolding is excellent and mutually reinforcing: `COMPETENCY_PRACTICE_GUIDE.md` (definition / in-practice / common mistake / mastery signal per competency), `AGENTIC_ENGINEERING_RUBRIC.md` (the shared completion bar), and per-exercise `masterySignals`. The core thesis â€” *"agents replace typing, not thinking; the accountable engineer sets the contract, directs, verifies, and improves the system"* â€” is stated once and then consistently operationalized. The "no exercise is complete with only Markdown" rule is the right forcing function and is enforced by the check scripts.

**Gaps**

- *No feedback loop.* Tied to Â§3: without exemplars or richer automated checks, the learner's self-assessment is unanchored. The check scripts verify *shape* (array lengths, absence of TODO), not *quality*.
- *No capstone or progress tracking.* 52 exercises with no suggested path, no "if you only do 6, do these," and no capstone that combines competencies (e.g. spec â†’ context â†’ tests â†’ evidence PR on one feature). A capstone would convert isolated drills into an end-to-end habit.
- *Progression is asserted, not scaffolded.* The modules are ordered sensibly, but nothing stops a learner starting at Module 12 with no grounding. Explicit prereq links (see Â§2) would create the intended ramp.
- *Where to add explanation:* each module README could carry a 3â€“4 sentence "why this competency, why now, what you'll be able to do after" intro. Today they jump straight to "What Mastery Looks Like" + exercise links.

---

## 6. Professional Repository Standards

**What works**

Documentation formatting is consistent and clean. `.gitignore` is sensible for Node/Java. Git history is curated and readable (15 commits, descriptive messages, evidence of iterative review â€” "Polish exercise wording after review," "Prepare exercises for public release"). `AGENTS.md` and `RESEARCH_SOURCES.md` show unusual care.

**Issues â€” several table-stakes items are missing, some ironically.**

*No `LICENSE`.* For a repo whose history says "Prepare exercises for public release," this is the most important omission: without a license, default copyright applies and others cannot legally reuse, fork, or run it in training.
- *Fix:* add an OSI license (MIT/Apache-2.0) or an explicit "all rights reserved / internal use" note if that's the intent.

*No CI/CD.* There is no `.github/workflows`. Nothing verifies that the project repositories install, type-check, or build.
- *Why it's a problem:* with this much duplicated scaffolding and zero automated checks, silent drift is nearly guaranteed. It's also ironic that Module 01 teaches agent guardrails and Module 08 teaches evidence-led PRs, yet the repo itself has no check and no evidence gate.
- *Fix:* a matrix workflow that runs `npm ci && npm run build && npm run typecheck` for every `*-app` repository and `mvn test` for every `*-api` repository, plus a markdown-lint / link-checker job.

*No `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue/PR templates, or `CHANGELOG.md`.* Module 08 literally teaches PR evidence packs and links GitHub's PR-template docs â€” the repo should model what it teaches with a `.github/pull_request_template.md`.

*Lockfiles are git-ignored* (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` in `.gitignore`).
- *Why it's a problem:* this directly undercuts exercises that expect repeatable setup. Reproducible installs need committed lockfiles; ignoring them means two learners can resolve different dependency trees.
- *Fix:* commit lockfiles (at least for the exercises that emphasize reproducibility), or pin exact versions and document the intent.

*No `.editorconfig` / shared Prettier / ESLint config at root.* Formatting consistency currently relies on discipline, not tooling.

---

## Overall Rating: 7 / 10

A strong, thoughtfully constructed curriculum that is clearly above the typical "exercise repo." It earns the 7 on pedagogy, consistency, and real-world framing. It's held back from 8â€“9 by repository-engineering gaps that are, tellingly, the very practices it teaches: no CI/evidence gate, no license, simulated tooling in a toolchain course, ignored lockfiles in a reproducibility lab, and â€” most importantly for learners â€” no reference solutions or real feedback loop.

### Top 5 Strengths

1. **Rigorously consistent exercise format** - the same compact Your Mission / Project / How To Go About It / Evidence spine across all 52 exercises.
2. **A coherent, well-articulated thesis** ("agents replace typing, not thinking") reinforced by a rubric, a practice guide, and per-exercise mastery signals.
3. **Machine-readable `lab-contract.json` per exercise** â€” seeded defects, verification gates, and mastery signals that double as a precise definition of done.
4. **Authentic, real-world scenarios and antipatterns** (genuinely flaky Playwright tests, layered Spring Boot service, RBAC/refund/scheduling domains) with references to authoritative external sources.
5. **Clean, modern, readable project code** on a current stack (React 19 / TS 5.9 / Vite 7), with intentional rather than accidental defects.

### Top 5 Improvements Needed

1. **Add reference solutions / worked examples and a real feedback loop** â€” the single biggest lift for learning value.
2. **Add CI** that builds and type-checks every project repository (plus markdown/link lint) â€” catch drift and model the evidence gate the repo teaches.
3. **Add `LICENSE`, `CONTRIBUTING.md`, and PR/issue templates** â€” table stakes for a public release, and the repo teaches PR hygiene anyway.
4. **Use real tooling where the module name promises it** (ESLint/Prettier/Vitest/Playwright in Toolchain, Test Automation, Code Review); rename the custom `.mjs` scripts to `contract-check`.
5. **Fix structural friction** â€” hyphenate folder names (drop spaces/`&`), commit lockfiles for reproducibility exercises, and add per-exercise level/time/prereq front-matter.

---

## Prioritized Action Plan (to production quality)

**Phase 1 â€” Correctness & legality (Â½ day, do first)**
1. Add a `LICENSE`.
2. Rename top-level folders to hyphenated slugs; update the index table and internal links.
3. Keep exercise slugs, titles, and root index entries synchronized after rewrites.
4. Commit lockfiles for reproducibility-critical exercises (or pin + document).

**Phase 2 â€” Automation & drift protection (1â€“2 days)**
5. Add a GitHub Actions matrix: `npm ci && npm run build && npm run typecheck` per app repository, `mvn test` per API repository.
6. Add markdown-lint + a link checker (protects the many external references).
7. Add `.editorconfig` and a shared Prettier/ESLint config; convert the fake `lint`/`format` scripts to real tools in at least Modules 01, 04, 09. Rename remaining custom checks to `contract-check`.

**Phase 3 â€” Learning value (largest lift, highest payoff)**
8. Add a `solution/` per exercise (behind a branch or clearly separated), starting with one exemplar per module.
9. Add per-exercise front-matter: **Level**, **Est. time**, **Prereqs** (with links to build the intended ramp).
10. Add a `GLOSSARY.md` and a 3â€“4 sentence "why this competency" intro to each module README.

**Phase 4 â€” Polish & community (ongoing)**
11. Add `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `.github/pull_request_template.md` (model Module 08).
12. Add a capstone that chains competencies on one feature (spec â†’ context â†’ tests â†’ evidence PR â†’ review â†’ retro).
13. Vendor fallbacks and "verified as of" dates for external skill dependencies.
14. Standardize the README front-matter (Goal / Scenario / Outcome) across all 52 exercises.

Executing Phases 1â€“2 alone moves this from a 7 to a solid 8; Phase 3 is what takes it to a 9 as a self-serve learning product.
