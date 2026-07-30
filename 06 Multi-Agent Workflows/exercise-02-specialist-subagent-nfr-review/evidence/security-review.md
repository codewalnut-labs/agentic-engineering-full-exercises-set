# Security and Privacy Review

Scope: `nfr-swarm-app` only  
Review type: source inspection; no application code changes or broad verification

## Summary

- High: 0
- Medium: 0
- Low: 1
- Dismissed plausible risks: 3

## Actionable findings

### SEC-01 — Low — No production security-header baseline

**Evidence:** `index.html:3-11` defines document metadata and loads the module
entry point but establishes no Content Security Policy. `vite.config.ts:4-8`
only configures the development server and provides no deployment-header
policy.

**Failure scenario:** The current page has no known script-injection sink, so
this is defense in depth rather than an immediately exploitable vulnerability.
If a future dependency or UI change introduces an injection sink, the browser
has no CSP containment. A deployment without `frame-ancestors` protection can
also allow the dashboard to be embedded in an attacker-controlled page.

**Recommended fix:** Define production response headers at the hosting layer,
including a CSP starting from `default-src 'self'`, `script-src 'self'`,
`object-src 'none'`, `base-uri 'none'`, and `frame-ancestors 'none'`. Also set
`X-Content-Type-Options: nosniff`, a restrictive `Referrer-Policy`, and an
appropriate `Permissions-Policy`. Keep this in deployment configuration rather
than relying solely on a CSP meta element, because `frame-ancestors` must be
delivered as an HTTP header.

**Verification:** Deploy or locally serve the production build through the
intended host, inspect `curl -I` output for every header, and load the
application with browser console CSP reporting enabled. Add an automated
response-header check to the deployment smoke gate.

## Dismissed plausible risks

### DIS-01 — Rendered notes do not create a current XSS sink

`src/components/DetailPanel.tsx:40`,
`src/components/EvidencePanel.tsx:27-29`, and the other components render
strings through normal React interpolation. There is no
`dangerouslySetInnerHTML`, direct `innerHTML`, `eval`, or dynamic script
construction. React escapes these values, so note, owner, tag, and activity
text cannot currently inject markup. Revisit this dismissal if rich-text or
HTML rendering is added.

### DIS-02 — No current CSRF or unauthorized write endpoint

`src/services/workflowApi.ts:6-24` simulates reads and writes against an
in-memory fixture and makes no HTTP request. `src/App.tsx:1-6` does not import
or mount that workflow service or its editing components. Consequently there
is no present network mutation for an attacker to forge. If the dormant
workflow UI is connected to a backend, require server-side authorization and
CSRF protection appropriate to the chosen authentication mechanism.

### DIS-03 — Internal fixture records are not presently exposed by the mounted app

`src/data/workItems.ts:3-132` contains synthetic customer, owner, note, and
`internal`-tagged fixture records, but the mounted `src/App.tsx:1-69` renders
only the lab contract and does not import the fixture or workflow components.
Normal Vite tree-shaking should therefore omit these records from the
production bundle. This is not a current privacy disclosure. If the workflow
dashboard is mounted later, do not send all records to the browser and rely on
client-side filtering; enforce record-level authorization and data
minimization on the server. Verify the current dismissal by searching the
production bundle for representative fixture strings such as
`Security exception pending`.

## Review limitation

Dependency vulnerability status was not assessed because the requested review
excluded broad verification. No conclusion about transitive package
vulnerabilities should be inferred from this source review.
