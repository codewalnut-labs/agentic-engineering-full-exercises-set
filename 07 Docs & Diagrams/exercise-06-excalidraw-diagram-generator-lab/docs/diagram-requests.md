# Excalidraw Diagram Request

Create one editable Excalidraw diagram for the incident access workflow in the starter app.

The product owner asked for "everything": request intake, entitlement check, policy check, manager approval, security approval, provisioning, notification, and audit. The skill user must reduce this to a readable diagram instead of drawing every field and log line.

Required constraints:

- Choose one diagram type and justify it.
- Keep the main diagram under 20 elements.
- Use readable text and `fontFamily: 5` for all text elements.
- Include arrows with labels for cross-team handoffs.
- Save the artifact under `docs/diagrams/incident-access-workflow.excalidraw`.
- Add a script or test that parses the file and validates root fields, unique IDs, text font, and element count.

Known drift to verify:

- Notes say rejected requests notify the requester before audit.
- Starter behavior records audit before notification on rejected requests.
- The generated diagram must match the verified behavior or include a docs/code fix.
