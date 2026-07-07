# Excalidraw Validation Notes

The generated `.excalidraw` file should be treated as a testable artifact.

Minimum validation:

- JSON parses.
- Root object has `type`, `version`, `source`, `elements`, `appState`, and `files`.
- `type` is `excalidraw`.
- Every element has a unique `id`.
- Every text element has `fontFamily: 5`.
- Text size is readable, preferably 16 or greater.
- Element count is below 20 unless a split diagram decision is recorded.
- Arrows connect logical workflow steps and have labels when they cross teams.

Manual review prompt:

Open the file in Excalidraw and check that no text overlaps, the flow direction is clear, and the diagram can be edited without cleanup.
