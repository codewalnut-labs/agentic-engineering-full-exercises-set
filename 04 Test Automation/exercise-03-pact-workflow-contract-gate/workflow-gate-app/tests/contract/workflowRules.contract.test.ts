import path from "node:path"
import {
  Matchers,
  Pact,
  SpecificationVersion,
} from "@pact-foundation/pact"
import { describe, expect, it } from "vitest"
import { fetchWorkItems, saveAction } from "../../src/services/workflowApi"

const pact = new Pact({
  consumer: "workflow-gate-app",
  provider: "workflow-rules-api",
  dir: path.resolve(process.cwd(), "../pacts"),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
})

const providerItem = {
  id: Matchers.like("wf-101"),
  customer: Matchers.like("Atlas Co"),
  status: Matchers.regex(
    "^(Queued|Ready|In Review|Blocked|Escalated)$",
    "Blocked",
  ),
  score: Matchers.like(91),
  owner: Matchers.like("Asha"),
  note: Matchers.like("Evidence missing"),
}

describe("workflow rules API contract", () => {
  it("loads workflows through the production client", async () => {
    await pact
      .addInteraction()
      .given("workflows exist")
      .uponReceiving("a request for workflows")
      .withRequest("GET", "/api/workflows", (request) => {
        request.headers({ Accept: "application/json" })
      })
      .willRespondWith(200, (response) => {
        response.headers({ "Content-Type": "application/json" })
        response.jsonBody(Matchers.eachLike(providerItem))
      })
      .executeTest(async (mockServer) => {
        const items = await fetchWorkItems(mockServer.url)

        expect(items[0]).toMatchObject({
          id: "wf-101",
          name: "Atlas Co",
          status: "Blocked",
          score: 91,
          owner: "Asha",
          note: "Evidence missing",
        })
      })
  })

  it("submits the UI decision shape as the provider contract", async () => {
    await pact
      .addInteraction()
      .given("workflow wf-102 exists")
      .uponReceiving("a decision for workflow wf-102")
      .withRequest("POST", "/api/workflows/wf-102/decisions", (request) => {
        request.headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        })
        request.jsonBody({
          status: "Blocked",
          owner: "Rina",
          evidenceNote: "Waiting for signed approval",
        })
      })
      .willRespondWith(202, (response) => {
        response.headers({ "Content-Type": "application/json" })
        response.jsonBody({
          ...providerItem,
          id: Matchers.like("wf-102"),
          customer: Matchers.like("Brightline"),
          status: "Blocked",
          owner: Matchers.like("Rina"),
          note: Matchers.like("Waiting for signed approval"),
        })
      })
      .executeTest(async (mockServer) => {
        const item = await saveAction(
          "wf-102",
          {
            status: "Blocked",
            owner: "Rina",
            note: "Waiting for signed approval",
          },
          mockServer.url,
        )

        expect(item).toMatchObject({
          id: "wf-102",
          name: "Brightline",
          status: "Blocked",
          owner: "Rina",
          note: "Waiting for signed approval",
        })
      })
  })
})
