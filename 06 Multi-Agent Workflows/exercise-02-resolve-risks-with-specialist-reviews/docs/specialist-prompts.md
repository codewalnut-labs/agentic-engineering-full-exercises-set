# Specialist Prompts

Start one separate agent session per role. Give all four the same starting Git commit ID and tell them to review without editing the app. Save their findings using the [report template](./specialist-report-template.md).

## Security

Check how request notes are displayed and whether the approval function checks permission itself. Run `npm run review:security`. Show how unsafe input or an unauthorized approval can reach the app, including a direct call to the approval function. Recommend a fix supported by that evidence.

## Accessibility

Check whether a person can select a request using only the keyboard. Run `npm run review:accessibility`. Report the interaction that fails, how you checked it, and what needs to change.

## Performance

Check whether the risk calculation repeats unnecessary work when the screen updates. Run the starting performance measurement and `npm run review:performance`. Record the inputs, calculation result, and time taken so they can be compared with the repaired version.

## Testability

Check whether tests can reliably cover successful and failed approvals without `window` or real delays. Run `npm run review:testability`. Explain what prevents repeatable tests and recommend the smallest change that would make them reliable.

You, as coordinator, check the reports, decide what to fix, and make the code changes. Afterward, start four new sessions with these same roles to review the repaired commit.
