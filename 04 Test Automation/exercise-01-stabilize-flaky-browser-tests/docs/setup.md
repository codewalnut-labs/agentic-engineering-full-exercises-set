# Setup and workflow

Use Node.js 22.12–24 and an agent that supports MCP. From `checkout-e2e-app/`, run `npm ci`, `npm run setup:browser`, and `npm run setup:check` before starting the challenge. The smoke check should pass; it does not establish reliable checkout coverage.

Configure the official [Playwright MCP server](https://github.com/microsoft/playwright-mcp) using its instructions for your agent. The package version reviewed for this challenge is `@playwright/mcp@0.0.82`. Use an isolated browser profile and session recording (`--isolated --save-session`). Record the actual package version and client configuration in `evidence/tool-record.md`. Keep credentials out of exported configuration. Start `npm run dev` in a separate terminal, open `http://127.0.0.1:5173` through MCP, and confirm that the agent can inspect the accessibility snapshot and network activity. A terminal Playwright test run alone is not MCP investigation.

Commit the exercise's starting files, then capture the supplied tests before editing:

```text
npm run evidence:capture -- baseline
```

The capture runs smoke and repeated starter tests and retains their actual results. The flaky suite is expected to fail, but a coincidental pass is valid evidence: report it honestly and explain the risks found in the tests. Do not introduce a failure to manufacture a comparison.

Use MCP to explore approval, decline, recovery, and duplicate submission. Save the actual tool session before replacing the tests. Inspect request bodies through the tools available in your installed MCP version; tool names may differ. Connect observations to the test design, using the [checkout contract](./checkout-contract.md) as the authority for expected values.

After repairing the tests, commit their final form and run:

```text
npm run evidence:capture -- final
npm run verify:exercise
```

The final capture runs the full browser suite twenty times with two workers and **zero retries**, saves the JSON report and one passing trace, and checks application quality. The verifier reruns the same gate into temporary output directories. Every test must use its own server session, including the supplied smoke test. Do not share an already running development server during verification; the test runner starts its own server.

Capture files are append-only: use a new numbered attempt if a run fails, retain the failed attempt, fix the problem, commit, and capture again. Evidence documents can be committed afterward; any subsequent code or test change requires a new final capture. Follow the [evidence template](./evidence-template.md).

## Research basis

Reviewed 2026-09-24: [Playwright best practices](https://playwright.dev/docs/best-practices) support user-visible locators, independent tests, and observable readiness. [Playwright MCP](https://github.com/microsoft/playwright-mcp) supplies interactive browser observations; [Trace Viewer](https://playwright.dev/docs/trace-viewer) supports inspection of recorded actions. These inform the challenge, not a prewritten solution.
