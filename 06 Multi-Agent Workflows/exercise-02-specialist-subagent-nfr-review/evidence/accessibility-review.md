# Accessibility Review

Scope: `nfr-swarm-app` only  
Review type: source inspection; no application-code changes or broad verification

## Summary

- High: 0
- Medium: 2
- Low: 1
- Dismissed / no-current-impact observations: 4

## Scope note

`src/App.tsx` currently mounts a static lab-contract page; it does not import
the workflow service or any component in `src/components/`. Therefore the
findings below are source-level, forward-looking issues in the supplied
workflow UI rather than failures reachable from the currently mounted page.
They should be fixed before that UI is connected to `App`.

## Actionable findings

### A11Y-01 — Medium — Selection and asynchronous changes are not announced

**Evidence:** `src/components/WorkQueue.tsx:16-29` communicates the selected
item solely through the `active` class (`:17`), without an `aria-current`,
`aria-pressed`, `aria-selected`, or a listbox/radiogroup selection model.
`src/components/EvidencePanel.tsx:18-26` replaces its empty message with a
list after collection without a live status. `src/components/ActionComposer.tsx:17-23`
and `:45-46` start and finish a save without an `aria-live`/`role="status"`
message or `aria-busy` state on the updated region.

**User impact:** A keyboard and screen-reader user can activate a queue item,
Collect, or Save draft yet receive no reliable confirmation of which record is
selected, whether work is in progress, or whether it completed. The visual
border change is not a sufficient programmatic status.

**Recommended fix:** Choose semantics that match the design. If the queue is a
single-selection chooser, implement a labelled `listbox` with `option`
children and `aria-selected`, including Arrow-key navigation; otherwise retain
native buttons and expose the selected item with `aria-pressed` or
`aria-current="true"`. Add a dedicated, persistent `role="status"`
(`aria-live="polite"`) message for selection, evidence success, and save
success; set `aria-busy="true"` while a request is pending. Do not move focus
on routine successful saves.

**Verification:** With only a keyboard, Tab to a queue control and activate it
with Enter and Space; verify the selected state is exposed in browser
accessibility inspection and the detail heading changes. Trigger Collect and
Save and verify a screen reader announces the pending/completed status once.
In a component test (for example, React Testing Library), activate a queue
item with `userEvent.keyboard('{Enter}')`, assert its selected state, resolve
the mocked promise, and assert `getByRole('status')` contains the matching
completion message.

### A11Y-02 — Medium — Save failures have no perceivable error feedback

**Evidence:** `src/components/ActionComposer.tsx:17-23` handles `onSave` only
with `try`/`finally`; rejection is not caught or rendered. The supplied
service can reject with `"Work item was not found"` at
`src/services/workflowApi.ts:13-16`. There is no error message, alert, or
field-level error in the rendered component (`ActionComposer.tsx:26-48`).

**User impact:** If saving fails, a nonvisual user gets neither confirmation
nor an error explanation. Focus remains on a button that reverts from
“Saving...” to “Save draft”, which is indistinguishable from a successful
completion and prevents recovery.

**Recommended fix:** Catch rejected saves, preserve the entered values, and
render a concise, actionable error in a persistent `role="alert"` (or assertive
live region). Keep focus on the Save button for a request-level error; use
`aria-invalid` and `aria-describedby` only if validation identifies an
individual field. Clear or replace the alert on a later successful save.

**Verification:** Mock `onSave` to reject, focus the Save button using Tab,
and activate it with Enter. Verify the focus remains predictable, an element
with `role="alert"` exposes the error text, and the owner/status/note values
are retained. Add a component test that rejects the promise and asserts
`getByRole('alert')`, the retained textarea value, and that no success status
is announced.

### A11Y-03 — Low — The disabled save action gives no programmatic reason

**Evidence:** `src/components/ActionComposer.tsx:41-46` disables Save draft
when the reviewer note has fewer than eight non-whitespace characters, but the
Reviewer note label (`:41-43`) does not state that requirement and the button
has no associated explanatory text. The native disabled button is skipped in
the Tab sequence.

**User impact:** A keyboard user can finish editing the note, Tab past the
unavailable action, and have no way to discover why saving is unavailable or
how much input is required. This is particularly confusing when the button is
the primary next step.

**Recommended fix:** State “At least 8 characters required” in visible helper
text associated with the textarea via `aria-describedby`. Expose the current
validation state (for example `aria-invalid` after interaction and an
associated error message). Retaining a native disabled button is acceptable
once the requirement is clearly available; alternatively use an enabled
button and validate on submit.

**Verification:** Starting with a seven-character note, use Tab through the
form and confirm the helper text is read with the textarea and the disabled
state/reason is understandable. Enter an eighth non-whitespace character and
confirm Save becomes keyboard-focusable and operable with Space. In a
component test, assert the description is associated with the textarea, the
button is disabled below the threshold, then becomes enabled at the threshold.

## Dismissed / no-current-impact observations

1. **Current page keyboard access:** the mounted `src/App.tsx:9-72` has no
   interactive controls. Its primary content is under one `main` landmark and
   uses an `h1` followed by `h2` headings (`:10-71`), so a skip link is not
   required for its present shape.
2. **Form labels:** the dormant workflow controls are correctly wrapped by
   native `<label>` elements in `FilterBar.tsx:14-43` and
   `ActionComposer.tsx:29-43`; placeholders are supplemental rather than the
   only labels.
3. **Focus styling:** `src/styles.css:22-32` does not suppress browser focus
   outlines. There is no current source evidence of an invisible keyboard
   focus indicator; retain this behaviour or replace it with an equally
   prominent `:focus-visible` style if custom focus CSS is added.
4. **Contrast:** the standard text pairs are sufficient on their declared
   backgrounds: `#182033` / `#f5f7fb` (`styles.css:1-3`), muted `#657086` /
   white (`:120-125`), and the three risk-pill foreground/background pairs
   (`:198-218`) meet normal-text contrast. The disabled button’s white text on
   `#a8b1c2` (`:294-296`) is below normal-text contrast but is exempt while
   the control is genuinely disabled; do not reuse that treatment for an
   enabled control.

## Review limitation

No browser + screen-reader session, automated accessibility scan, or component
test suite was run. The verification steps above should be completed once the
workflow components are mounted.

## Post-fix recheck

Scope: `src/App.tsx`, `src/components/ActionComposer.tsx`,
`src/components/WorkQueue.tsx`, and `src/components/EvidencePanel.tsx`, plus
candidate component-test discovery. No full suite was run.

| Finding | Verdict | Recheck evidence | Residual risk |
| --- | --- | --- | --- |
| A11Y-01 — selection and asynchronous changes | **Partial** | The workflow is now mounted in `src/App.tsx:59-72`. Queue buttons expose their selected state with `aria-pressed` in `WorkQueue.tsx:16-21`; save exposes `aria-busy` and a success status in `ActionComposer.tsx:42-46,73`; evidence changes are inside a polite status region in `EvidencePanel.tsx:18-28`. | Evidence collection has no pending/busy state, explicit “evidence collected” completion text, or error feedback. The live region instead announces the changed list, which may be verbose and browser/screen-reader dependent. Add a concise persistent status and an `aria-busy` state around collection, then keyboard + screen-reader test it. |
| A11Y-02 — save failures | **Addressed** | `ActionComposer.tsx:27-38` catches rejected saves while retaining field state; `:74` renders the message in `role="alert"`; `:73` gives successful saves a status message. | No component test currently demonstrates a rejected save, retained values, focus behavior, and alert announcement. Add that targeted test before relying on this behaviour. |
| A11Y-03 — unavailable Save explanation | **Addressed** | `ActionComposer.tsx:60-70` associates the Reviewer note with visible minimum-length help through `aria-describedby="reviewer-note-help"`; the button continues to become enabled only at the eight-character threshold. | The component does not expose an interacted-with invalid state or character feedback. This is not required for the stated threshold, but would improve recovery if the requirement later becomes more complex. |

### Targeted-test check

No `*.test.*` or `*.spec.*` files were found in `nfr-swarm-app`, so no
component or keyboard test exists to validate the repaired behaviours. The
source recheck does not replace a manual keyboard/screen-reader pass or the
targeted tests specified in the original findings.
