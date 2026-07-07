# Finding Schema

```json
{
  "severity": "P1",
  "category": "security",
  "file": "src/components/ActionComposer.tsx:22",
  "finding": "Reviewer notes are rendered as HTML.",
  "why_it_matters": "A malicious note can execute script in a privileged review session.",
  "suggested_fix": "Render the note as text or sanitize with an approved policy.",
  "test_gap": "Add a regression test for script-like reviewer notes."
}
```

