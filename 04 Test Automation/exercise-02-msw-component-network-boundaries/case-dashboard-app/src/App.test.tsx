import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import App from "./App";
import { casesEndpoint, delayedCasesHandler } from "./test/handlers";
import { server } from "./test/server";

describe("case dashboard network states", () => {
  it("shows a loading status while cases are in flight, then renders the queue", async () => {
    server.use(delayedCasesHandler());

    render(<App />);

    expect(screen.getByRole("status", { name: /loading cases/i })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "Atlas Co" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cedar Labs" })).toBeInTheDocument();
    expect(screen.queryByRole("status", { name: /loading cases/i })).not.toBeInTheDocument();
  });

  it("renders an empty queue returned by the server", async () => {
    server.use(http.get(casesEndpoint, () => HttpResponse.json([])));

    render(<App />);

    expect(await screen.findByText(/no cases are currently assigned/i)).toBeInTheDocument();
  });

  it("renders successful case data returned by the server", async () => {
    render(<App />);

    expect(await screen.findByRole("heading", { name: "Atlas Co" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cedar Labs" })).toBeInTheDocument();
    expect(screen.getByText("2 cases")).toBeInTheDocument();
  });

  it("filters the loaded cases and distinguishes a no-match result", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { name: "Atlas Co" });

    await user.selectOptions(screen.getByRole("combobox", { name: "Priority" }), "High");

    expect(screen.getByRole("heading", { name: "Atlas Co" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Cedar Labs" })).not.toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: "Search" }), "unassigned account");

    expect(screen.getByText(/no cases match the current filters/i)).toBeInTheDocument();
    expect(screen.queryByText(/no cases are currently assigned/i)).not.toBeInTheDocument();
  });

  it("shows a request error and recovers when the user retries", async () => {
    const user = userEvent.setup();
    server.use(
      http.get(casesEndpoint, () => {
        return HttpResponse.json({ message: "Service unavailable" }, { status: 503 });
      }),
    );

    render(<App />);

    const error = await screen.findByRole("alert");
    expect(error).toHaveTextContent(/cases could not be loaded/i);
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();

    server.use(delayedCasesHandler());
    await user.click(screen.getByRole("button", { name: "Retry" }));

    expect(screen.getByRole("status", { name: /loading cases/i })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "Atlas Co" })).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
