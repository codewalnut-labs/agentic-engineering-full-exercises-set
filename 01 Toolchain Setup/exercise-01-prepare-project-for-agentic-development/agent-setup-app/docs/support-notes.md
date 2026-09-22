# Support Router Notes

This app was built by several teams. Case status labels come from customer support, but ownership labels come from engineering teams.

Run `npm run agent:check` while developing. Run `npm run test:behavior` for the existing routing assertions, and `npm run verify:exercise` for the final exercise check before opening a PR. Run these commands inside this application directory.

The component owns display state. Routing and ownership decisions live in `src/services/caseRouter.ts`; example cases and the configured policy live in `src/data/cases.ts`. Existing implementation patterns can have limitations. Verify what the code does before turning an observation into a working rule.

For this preparation exercise, application code, sample data, and supplied tests are fixed inputs. Record suspected defects or missing coverage in the readiness evidence. A future feature request needs its own clarified acceptance criteria; the current UI text does not supply those criteria automatically.
