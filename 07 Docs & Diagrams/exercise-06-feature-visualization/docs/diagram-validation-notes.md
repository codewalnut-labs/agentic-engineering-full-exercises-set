# Diagram Validation Notes

Validate each diagram file before calling the challenge complete.

Required files:

- `diagrams/payment-architecture.excalidraw`
- `diagrams/payment-process-flow.excalidraw`
- `diagrams/payment-sequence.excalidraw`
- `diagrams/payment-er.excalidraw`

Minimum checks for each file:

- JSON parses.
- Root object has `type`, `version`, `source`, `elements`, `appState`, and `files`.
- `type` is `excalidraw`.
- Every element has a unique `id`.
- Text is readable and does not overlap.
- Arrows point in the same direction as the source workflow.
- Major nodes map to `src/payment/` or `docs/payment-feature-brief.md`.

Manual check:

Open each file in Excalidraw or the VS Code extension and confirm it can be edited without cleanup.
