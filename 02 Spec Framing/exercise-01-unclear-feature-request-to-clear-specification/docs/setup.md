# Spec Kit setup and workflow

## Before timing

Use Node.js 22.12 to 24, npm, Git, Python/uv as required by Specify CLI, and a supported coding agent. Run `npm ci` and `npm run agent:check` from `subscription-management-app/`. No previous exercise or separately assembled skill collection is required.

This exercise targets **Spec Kit v1.0.6**. Install the pinned CLI using the [official installation instructions](https://github.com/github/spec-kit/blob/v1.0.6/README.md):

```sh
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.0.6
```

From the **exercise directory**, initialize the integration for your agent, for example:

```sh
specify init --here --integration claude
```

Use the integration's platform options for your shell. Keep configuration local to this exercise, preserve the existing Git repository, and do not initialize Spec Kit at the curriculum root. Record the actual CLI version, integration, installed command files, and local adjustments in `evidence/workflow.json`. Run the installed constitution command once, using [workflow principles](./workflow-principles.md); it establishes process rules, not answers to product questions.

## Fix the feature location

All sessions run from the exercise directory. Set these variables in the environment used to launch the agent:

```powershell
$env:SPECIFY_INIT_DIR = (Get-Location).Path
$env:SPECIFY_FEATURE_DIRECTORY = 'specs/subscription-management'
```

On POSIX shells use `export SPECIFY_INIT_DIR="$PWD"` and `export SPECIFY_FEATURE_DIRECTORY="specs/subscription-management"`. Ask specify to honor that directory. Verify `.specify/feature.json` resolves there. Keep the existing working branch; this exercise does not require a branch-creation extension.

The native feature specification and checklists stay in `specs/subscription-management/`. Do not create a second, reformatted specification elsewhere.

## Checklist prerequisite adapter

In v1.0.6, the checklist prompt treats plan.md as optional, but its shared prerequisite script requires that file. This exercise deliberately stops before technical planning.

In the installed **checklist command only**, replace its prerequisite invocation with:

```sh
node subscription-management-app/scripts/speckit-checklist-inputs.mjs
```

The supplied adapter validates the exercise's feature selection, reads the installed default checklist template, and returns FEATURE_DIR, AVAILABLE_DOCS, and TEMPLATE_CONTENT. Keep the rest of the upstream checklist workflow intact. Record the adjusted command file and its hash in the workflow inventory. Other extensions and template presets are outside the supported setup.

Sources: [upstream prerequisite](https://github.com/github/spec-kit/blob/v1.0.6/scripts/powershell/check-prerequisites.ps1), [checklist command](https://github.com/github/spec-kit/blob/v1.0.6/templates/commands/checklist.md). This is a documented exercise adaptation, not unmodified upstream behavior.

## Run the challenge

Use your installed integration's spelling. Common prompt commands are `/speckit.specify`, `/speckit.clarify`, and `/speckit.checklist`; skills-mode integrations may expose `$speckit-specify`, `$speckit-clarify`, and `$speckit-checklist`. Inspect the actual files instead of assuming a spelling.

1. Invoke specify with the supplied request, repository paths, and workflow principles. From the application run `npm run workflow:capture -- specify` immediately afterward.
2. Invoke clarify. Retain real questions and answers, update the native spec, and record the decision ledger. Capture with `npm run workflow:capture -- clarify`.
3. Invoke checklist for a **requirements-quality review**, requesting the output `checklists/spec-review.md`. It must contain unchecked CHK items. Capture with `npm run workflow:capture -- checklist`.
4. Commit the feature documents and stage captures. Run `npm run review:freeze`, then start a fresh agent session with [review brief](./review-brief.md). It evaluates a copy of the frozen checklist and returns findings; it does not alter the frozen files.
5. Address findings, update the native spec, and record dispositions and item assessments. Finish all reports, workflow metadata, transcripts, and source audit; commit them.
6. Run `npm run evidence:seal`, then at the same commit `npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify`.
7. Commit the manifest and verification capture, run `npm run verify:exercise`, and raise a focused PR.

Capture helpers write only evidence and refuse overwriting an accepted stage. If an attempt fails, retain its transcript and nominate a successful sequence for capture. If revisiting an already captured stage, retain the old evidence separately and record the replacement sequence explicitly. Do not silently rewrite provenance.

## What the checks prove

- `agent:check`: supplied files/source inventory, lightweight lint/format, typecheck, and temporary build.
- `spec:verify`: native specification structure, decision dependencies, checklist evaluations, and review dispositions.
- `test:challenge`: maintainer regression tests.
- `verify:submission`: stage order, command inventory, preserved draft, source citations, and sealed evidence.
- `verify:exercise`: read-only final verification. Learner documents and real agent transcripts are required to pass.

Do not run plan, tasks, analyze, or implement for this challenge. The curriculum's `verify:implementation` command validates the specification. Offline checks cannot authenticate an agent transcript or judge whether a business decision is justified; reviewer inspection remains necessary.
