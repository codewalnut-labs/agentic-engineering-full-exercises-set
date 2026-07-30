# Severity-Ranked Review Findings

Review target: `pr/review-target.diff`

| Severity | Finding | Decision | Resolution |
|---|---|---|---|
| Critical | Reviewer-controlled `note` reached `dangerouslySetInnerHTML`, enabling stored XSS in the application origin. | Fix | Preview now uses React text rendering; regression asserts an event-handler payload creates no image element. |
| Critical | A high-priority note containing `approved` silently forced `Ready`, including blocked/escalated work and negated text such as `not approved`. | Fix | Removed note-derived transitions; the explicitly selected status is submitted unchanged. |
| Important | Clickable queue rows changed from buttons to `div` elements, removing focus, semantics, and Enter/Space activation. | Fix | Restored native `button type="button"` rows and a keyboard activation test. |
| Important | Note-length validation and explicit button type were removed. | Fix | Restored the eight-character trimmed minimum and `type="button"`. |
| Important | The existing test command had no component behavior coverage. | Fix | Added Vitest, Testing Library, four focused regressions, and wired them into `npm test`. |
| Minor | Rich-text note preview could be preserved with an HTML sanitizer. | Dismiss | Rich text is not required by the exercise; text rendering is safer and smaller. |
| Minor | Transition rules could be duplicated in the client for earlier feedback. | Defer | Authoritative workflow enforcement belongs at the API boundary; the supplied mock API has no policy/evidence model. |

## Fresh re-review scope

The final pass checks the two changed components, regression tests, Semgrep configuration, dependency audit, and project verification gate. No accepted Critical or Important finding is left open.
