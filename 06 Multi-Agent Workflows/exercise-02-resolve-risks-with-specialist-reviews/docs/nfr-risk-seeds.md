# Problems to Investigate

The app has five known problems. The IDs below connect each problem to its review, decision, fix, and recheck. These checks are protected exercise inputs.

| ID | Specialist | Risk to investigate | Required proof |
|---|---|---|---|
| `SEC-01` | Security | Request notes reach dynamic HTML rendering. | Render a hostile note and inspect the output. |
| `SEC-02` | Security | The approval service accepts privileged requests without authorization or complete evidence. | Call the service directly, bypassing the UI. |
| `A11Y-01` | Accessibility | Queue rows are clickable `div` elements. | Complete selection using keyboard-native controls. |
| `PERF-01` | Performance | Portfolio risk repeats expensive work on every render. | Compare the protected benchmark at both SHAs. |
| `TEST-01` | Testability | Approval timing and failures are not deterministic outside a browser. | Test success and failure without real timers or `window`. |

Fix all five required problems. Reviewers may report additional issues, but each needs code evidence and a recorded decision: fix it, postpone it, or dismiss it with a reason.
