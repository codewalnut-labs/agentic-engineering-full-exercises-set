# Query Guide

How to install, query, and refresh the Graphify knowledge graph for this exercise
(`graphify-out/graph.json`). Written after building and querying the graph once —
see [evidence/commands/graphify.txt](../evidence/commands/graphify.txt) for the
full unedited transcript this guide is based on.

## Setup

The graph is built by [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify),
distributed as the PyPI package `graphifyy`. Nothing about the graph or this guide
requires a paid API key.

1. Install the CLI (Python 3.10+ and [uv](https://docs.astral.sh/uv/) required):
   ```bash
   uv tool install graphifyy==0.9.4
   ```
2. Install the skill for your coding agent (writes a global skill file, not a
   project file - every teammate who wants the `/graphify` slash command needs
   to run this once on their own machine):
   ```bash
   graphify install --platform claude
   ```
   This writes `~/.claude/skills/graphify/SKILL.md` and registers a short
   section in your user-level `CLAUDE.md`. It does not touch this repository.
3. Confirm the version:
   ```bash
   graphify --version   # graphify 0.9.4
   ```
4. From the **exercise root** (not `billing-graph-app/`), create `.graphifyignore`
   so `evidence/` is excluded (Graphify already skips `node_modules/`, `.git/`,
   and its own `graphify-out/` by default - `.graphifyignore` only needs to add
   what Graphify doesn't already know about):
   ```
   node_modules/
   .git/
   evidence/
   graphify-out/
   ```
5. Build the graph. Open your coding agent in the exercise root and run:
   ```
   /graphify .
   ```
   This indexes `billing-graph-app/src/**` (app source), `billing-graph-app/scripts/run-*.mjs`
   (tests), `docs/**` (supplied docs), plus configuration files (`package.json`,
   `tsconfig.json`, `vite.config.ts`, `incidents/REV-482.md`, `README.md`).
   Code is parsed locally via AST (no LLM, no API key). The 11 document files
   need semantic extraction; with no `GEMINI_API_KEY`/`GOOGLE_API_KEY` set,
   Graphify falls back to the host agent itself, which dispatches a
   `general-purpose` subagent to do the extraction - this is expected, not an
   error, and needs no key.
   Outputs land in `graphify-out/`: `graph.json`, `GRAPH_REPORT.md`, `graph.html`
   (open directly in a browser, no server needed), `manifest.json`, `cost.json`.

## Agent use

If you are an agent picking up this repository cold:

1. Check whether `graphify-out/graph.json` already exists before doing anything
   else. If it does and you have a natural-language question about the
   codebase, skip straight to querying - do not rebuild.
2. Query with the CLI directly, from the exercise root:
   ```bash
   graphify query "<question>" --graph graphify-out/graph.json
   graphify explain "<node name>" --graph graphify-out/graph.json
   graphify path "<node A>" "<node B>" --graph graphify-out/graph.json
   graphify affected "<node name>" --depth 3 --graph graphify-out/graph.json
   ```
3. **Disambiguate before trusting a bare-name match.** This graph has both a
   real code node and a doc concept node with nearly the same label for
   several symbols (e.g. `loadRevenueDashboard()` in
   `billing-graph-app/src/dashboard/loadRevenueDashboard.ts` vs. the plain
   `loadRevenueDashboard` concept extracted from `docs/setup.md`'s own query
   examples). A bare-name `graphify path` between two such names can print
   `No path found` with an "ambiguous match" warning even though a real path
   exists. When that happens, look up the exact node `id` (e.g. via `graphify
   query` or by reading `graphify-out/graph.json`) and re-run with the exact
   ID instead of the label. See `evidence/commands/graphify.txt` for a worked
   example (`loadRevenueDashboard` / `recognizedRevenueByAccount`).
4. **Rephrase before trusting an empty or off-topic BFS.** `graphify query`
   expands your question against the graph's own vocabulary; a phrase that
   collapses to a single generic word (e.g. "shared calculation and account
   mapping **dependencies**") can match the wrong node entirely (npm's
   `dependencies` object in `package.json`, in this graph). If the result
   looks off-topic, rephrase using the domain's own nouns (e.g. "tenant to
   billing account mapping") rather than trusting the first answer.
2. Use `graphify affected "<node>"` for change-impact questions ("what breaks
   if I change X") - it does reverse traversal for you, so you don't have to
   manually chase `explain` backwards.
3. **Cross-check every `INFERRED` edge against source before repeating it as
   fact.** `graphify explain`/`query` output marks each edge `[EXTRACTED]` or
   `[INFERRED]` (an `[AMBIGUOUS]` tier exists too). An `INFERRED
   conceptually_related_to` edge means the extraction subagent judged two
   nodes topically related while reading them side by side - it is not a
   verified causal or current-state claim. This graph has a concrete example:
   `docs/current-metric-contract.md`'s recognized-revenue formula node is
   `INFERRED`-linked to `incidents/REV-482.md`'s "credits still counted" and
   "refunds increase total" bug nodes, purely because the subagent read both
   files together. Reading the actual source (`recognizedRevenue.ts` and
   `npm run test:billing`) shows the current code does **not** reproduce
   those bugs, even though the incident is still marked "Status: Open" - the
   graph surfaces the connection, it does not resolve the contradiction.
4. Known real gap in this graph: AST extraction only sees static imports/calls.
   `billing-graph-app/scripts/run-billing-tests.mjs` loads billing modules via
   `vite.ssrLoadModule("/src/billing/recognizedRevenue.ts")` - a runtime string
   path - so `graphify affected recognizedRevenueByAccount()` does **not** list
   this test file, even though it is the only test covering that function.
   Before answering a "what tests cover X" question, also grep the corpus for
   dynamic `import()`/`ssrLoadModule()`/`require()` calls the AST parser
   cannot see.

## Human use

Open `graphify-out/graph.html` directly in a browser (no server required) to
click through communities and nodes interactively. Or run the same CLI
commands an agent would, from the exercise root:

```bash
graphify query "recognized revenue" --graph graphify-out/graph.json
graphify explain "recognizedRevenueByAccount" --graph graphify-out/graph.json
graphify path "loadRevenueDashboard" "recognizedRevenueByAccount" --graph graphify-out/graph.json
```

Read `graphify-out/GRAPH_REPORT.md` for a human-oriented summary: God Nodes
(the most-connected symbols - a fast way to find the core abstractions),
Surprising Connections, community list with plain-language labels, and a
Knowledge Gaps section listing isolated nodes that may be under-documented.

Every `graphify path`/`explain`/`affected` result names its `source_file` (and
often a line number) - open that file and read the cited line before repeating
the graph's answer as fact. This is exactly the discipline behind
[evidence/commands/graphify.txt](../evidence/commands/graphify.txt) and
[evidence/answers.md](../evidence/answers.md) in this exercise.

## Refresh

**After changing code only** (no doc changes), re-run an incremental update -
this re-extracts only new/changed files and needs no LLM:
```bash
graphify graphify-out/.graphify_root  # or the same path used to build, e.g. "."
graphify <path> --update
```
(equivalently, `/graphify <path> --update` through the agent skill).

**After changing docs**, a full or `--update` rebuild is needed so the
semantic-extraction subagent re-reads the changed document; expect it to
re-dispatch a subagent for the changed doc files only (cached files are
skipped, per `graphify-out/cache/`).

**Checking for stale or inferred edges after a refresh:**
- Run the read-only health check any time:
  ```bash
  graphify diagnose multigraph --graph graphify-out/graph.json
  ```
  It reports dangling/missing-endpoint edges, self-loops, and collapsed edges
  without ever modifying the graph. In this build, 29 dangling-endpoint edges
  are expected and benign (external npm/Node dependencies, a script that
  imports a file outside the exercise root, and one AST id-format edge case -
  see `evidence/commands/graphify.txt` for the full breakdown). A **new**
  dangling edge after a refresh, pointing at a file that genuinely exists in
  the corpus, is the real warning sign to investigate.
- `graphify check-update <path>` reports whether a `needs_update` flag is
  pending (useful in CI/cron - see `graphify hook install` for an automatic
  post-commit rebuild).
- Re-read `GRAPH_REPORT.md`'s "Extraction" line (`EXTRACTED` / `INFERRED` /
  `AMBIGUOUS` percentages) after every rebuild - a rising `INFERRED`/`AMBIGUOUS`
  share is a signal that recent changes are outrunning what static extraction
  can verify, and more of the graph's claims need manual source verification
  before being trusted.
- Never treat an `INFERRED` edge as equivalent to an `EXTRACTED` one just
  because a rebuild finished cleanly - re-verify it against the current source
  the same way this exercise's `evidence/answers.md` does, since refactors can
  silently invalidate an old `INFERRED` relationship without producing any
  health-check warning at all.
