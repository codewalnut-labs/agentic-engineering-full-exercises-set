# Pact Workflow Contract Gate Design

## Goal

Create a local consumer-driven contract gate between `workflow-gate-app` and
`workflow-rules-api`, with a committed Pact artifact and verification evidence
from both repositories.

## Selected approach

Use Pact JS V4 in the consumer and Pact JVM JUnit 5 in the provider.

- The consumer contract exercises the production API client, not a test-only
  request helper.
- It covers `GET /api/workflows` and
  `POST /api/workflows/{id}/decisions`.
- The client maps the UI draft field `note` to the provider field
  `evidenceNote` and maps the provider workflow representation into the UI
  model.
- Pact JS writes the generated contract to the exercise-level `pacts/`
  directory.
- Spring Boot provider verification loads that artifact from disk and replays
  it against a random-port application.
- Provider states name the deterministic fixture assumptions.

## Alternatives considered

1. **Broker-backed workflow:** closest to production, but broker setup would
   consume the exercise timebox and add unrelated infrastructure.
2. **Provider-only schema test:** faster, but not consumer-driven and would not
   prove the UI client's actual request mapping.
3. **Selected local artifact gate:** smallest complete Pact workflow and easy to
   run in CI or locally.

## Contract

Provider: `workflow-rules-api`. Consumer: `workflow-gate-app`.

The list interaction requires a JSON array containing workflow records with
`id`, `customer`, `status`, `score`, `owner`, and `note`. The decision
interaction requires `status`, `owner`, and `evidenceNote`, returns HTTP 202,
and yields the updated workflow record.

## Verification

- Consumer: Pact test passes and generates the committed JSON contract.
- Provider: JUnit Pact verifier replays every interaction successfully.
- Existing UI and provider checks remain green.
- Evidence records exact commands and results from both sides.
