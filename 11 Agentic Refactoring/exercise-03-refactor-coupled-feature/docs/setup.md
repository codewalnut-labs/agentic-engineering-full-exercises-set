# Setup and verification

Use the Node version in .nvmrc (22.12–24). Run `npm ci` from workflow-refactor-app/. Java, Maven and live provider accounts are not needed. Tests start HTTP fixtures on ephemeral loopback ports, and close them afterward.

## Prepare the skill before timing

Install Matt Pocock's improve-codebase-architecture skill and the related skills it references:

```text
npx skills add mattpocock/skills --skill improve-codebase-architecture --global
npx skills add mattpocock/skills --skill codebase-design --global
npx skills add mattpocock/skills --skill grilling --global
npx skills add mattpocock/skills --skill domain-modeling --global
```

Upstream was reviewed at revision `49dd158d1076134a641b33efb035946536778336`. Record the actual installed revision. Sources: [architecture](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md), [codebase-design](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/SKILL.md), [grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md), [domain-modeling](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/SKILL.md).

Run a session scoped to this exercise's workflow. The architecture skill investigates and produces a visual HTML report, then discusses a candidate with you. It does not implement the refactor. Participate in that discussion and record the design decision, including alternative interfaces and test surface. The supplied GLOSSARY.md defines the domain. Keep proposed glossary/ADR changes in evidence/design-decision.md so the baseline remains frozen.

Copy the actual generated report from the OS temporary directory to evidence/architecture-review.html without rewriting it. Diagrams may depend on the upstream report's CDNs. Put a plain-text before/after dependency diagram in evidence/refactor-map.md so reviewers can also inspect the design offline.

## Observe and freeze

Run `npm run agent:check`. Record `git rev-parse HEAD` as `Starting commit: <full SHA>` in evidence/before.md, then `npm run proof:capture -- baseline`. The starter is functional through HTTP. Its independent module check is intentionally unfinished.

Create src/decisionWorkflow.characterization.test.mjs, importing the public submitDecision and using the provided withServices fixture. Assert actual public behavior for acceptance and rejection; include exact output/error and relevant effects. It must run directly with Node, without npm-only imports. The same test will be replayed against both historical implementations and a broken-workflow mutant.

Run `npm run test:characterization` and `npm run snapshot:before`. Commit only that test and evidence/contract-before.json together. Record its SHA as characterizationSha in evidence/history.json, then run `npm run proof:capture -- characterization`. Other planning reports can be committed in earlier evidence-only commits.

## Implement and compare

Edit only src/workflow.mjs, src/decisionWorkflow.mjs and src/adapters/http.mjs. Keep the test, original modules, fixtures, and baseline snapshot unchanged. Implement the selected design with your coding agent, then run `npm run verify:implementation`. Check the eight independent scenarios and the eight HTTP scenarios; neither passing suite replaces the other.

Commit production changes, record the final refactorSha, run `npm run snapshot:after` and `npm run proof:capture -- implementation`. Multiple focused source commits are allowed.

## Seal and submit

Finish the reports and source audit using the [evidence template](./evidence-template.md). Commit all requested artifacts after source, then run:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

Commit the generated manifest and capture, then run `npm run verify:exercise`. It is read-only. Open a focused PR using the submission standard. Keep failed attempts under evidence/attempts/ before recapturing. If source changes again, update the final SHA and regenerate affected proof; never alter frozen characterization evidence.
