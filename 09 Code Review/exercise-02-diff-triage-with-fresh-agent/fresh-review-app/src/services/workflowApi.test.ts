import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { workItems } from "../data/workItems";
import { collectEvidence, fetchWorkItems, saveAction } from "./workflowApi";

const cacheKey = "workflow-items";

async function settle<T>(promise: Promise<T>): Promise<T> {
  await vi.runAllTimersAsync();
  return promise;
}

beforeEach(() => {
  vi.useFakeTimers();
  window.localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("workflow cache boundaries", () => {
  it("falls back to fresh items when cached JSON is malformed", async () => {
    window.localStorage.setItem(cacheKey, "{not-json");

    const result = await settle(fetchWorkItems());

    expect(result).toHaveLength(workItems.length);
    expect(window.localStorage.getItem(cacheKey)).toBeNull();
  });

  it("does not mutate the shared fixture while ordering fallback items", async () => {
    Object.freeze(workItems);

    const result = await settle(fetchWorkItems());

    expect(result).not.toBe(workItems);
    expect(result.map((item) => item.dueInDays)).toEqual(
      [...result].map((item) => item.dueInDays).sort((left, right) => left - right),
    );
  });

  it("writes a successful save through to the cached collection", async () => {
    window.localStorage.setItem(cacheKey, JSON.stringify(workItems));
    const draft = { owner: "Mira", note: "Evidence verified", status: "Ready" as const };

    const saved = await settle(saveAction(workItems[0].id, draft));
    const cached = JSON.parse(window.localStorage.getItem(cacheKey) ?? "[]") as typeof workItems;

    expect(saved).toMatchObject(draft);
    expect(cached.find((item) => item.id === workItems[0].id)).toMatchObject(draft);
  });

  it("keeps canonical ordering after save and reload", async () => {
    await settle(
      saveAction(workItems[0].id, {
        owner: "Mira",
        note: "Evidence verified",
        status: "Ready",
      }),
    );

    const reloaded = await settle(fetchWorkItems());

    expect(reloaded.map((item) => item.dueInDays)).toEqual(
      [...reloaded].map((item) => item.dueInDays).sort((left, right) => left - right),
    );
  });

  it("keeps evidence collection read-only", async () => {
    const edited = workItems.map((item) =>
      item.id === workItems[0].id ? { ...item, owner: "Persisted owner" } : item,
    );
    window.localStorage.setItem(cacheKey, JSON.stringify(edited));

    await settle(collectEvidence(edited[0]));

    expect(JSON.parse(window.localStorage.getItem(cacheKey) ?? "[]")).toEqual(edited);
  });

  it("falls back when storage reads fail", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("blocked");
    });

    await expect(settle(fetchWorkItems())).resolves.toHaveLength(workItems.length);
  });

  it("does not hide persistence failures during save", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("quota exceeded");
    });

    const saving = saveAction(workItems[0].id, {
      owner: "Mira",
      note: "Evidence verified",
      status: "Ready",
    });
    const rejection = expect(saving).rejects.toThrow("could not be persisted");

    await vi.runAllTimersAsync();
    await rejection;
  });

  it("recovers even when invalid cache cannot be removed", async () => {
    window.localStorage.setItem(cacheKey, "{not-json");
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new DOMException("blocked");
    });

    await expect(settle(fetchWorkItems())).resolves.toHaveLength(workItems.length);
  });
});
