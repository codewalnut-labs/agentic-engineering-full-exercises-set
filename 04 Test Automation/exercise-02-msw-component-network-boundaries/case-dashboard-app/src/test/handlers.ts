import { delay, http, HttpResponse } from "msw";
import { caseFixtures } from "./caseFixtures";

export const casesEndpoint = "*/api/cases";

export const successHandler = http.get(casesEndpoint, () => {
  return HttpResponse.json(caseFixtures);
});

export const handlers = [successHandler];

export function delayedCasesHandler(duration = 100) {
  return http.get(casesEndpoint, async () => {
    await delay(duration);
    return HttpResponse.json(caseFixtures);
  });
}
