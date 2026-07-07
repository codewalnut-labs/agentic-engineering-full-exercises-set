import { useMemo, useState } from "react";
import { ApprovalDrawer } from "./components/ApprovalDrawer";
import { RenewalDashboard } from "./components/RenewalDashboard";
import { RenewalFilters } from "./components/RenewalFilters";
import { RenewalTable } from "./components/RenewalTable";
import { renewals } from "./data/renewals";
import { canApproveRenewal } from "./permissions";
import { projectedTotal, summarizePortfolio } from "./pricing";
import { recordApproval } from "./services/auditLog";

const currentUser = {
  email: "taylor.manager@example.com",
  role: "sales-manager",
  region: "US",
  approvalLimit: 250000,
  teams: ["enterprise", "strategic"],
};

export default function App() {
  const [renewalRows, setRenewalRows] = useState(renewals);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [segment, setSegment] = useState("all");
  const [selectedId, setSelectedId] = useState(renewals[0].id);

  const visibleRenewals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return renewalRows.filter((renewal) => {
      const matchesQuery =
        renewal.customer.toLowerCase().includes(normalizedQuery) ||
        renewal.ownerEmail.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status === "all" || renewal.status === status;
      const matchesSegment = segment === "all" || renewal.segment === segment;
      return matchesQuery && matchesStatus && matchesSegment;
    });
  }, [query, renewalRows, segment, status]);

  const selectedRenewal =
    renewalRows.find((renewal) => renewal.id === selectedId) ?? visibleRenewals[0] ?? renewalRows[0];

  const portfolio = useMemo(() => summarizePortfolio(visibleRenewals), [visibleRenewals]);

  function approveRenewal(id) {
    setRenewalRows((currentRows) =>
      currentRows.map((renewal) => {
        if (renewal.id !== id || !canApproveRenewal(currentUser, renewal)) {
          return renewal;
        }

        const approved = {
          ...renewal,
          status: "approved",
          approvedBy: currentUser.email,
          approvedAt: new Date().toISOString(),
        };
        recordApproval(currentUser, approved);
        return approved;
      }),
    );
  }

  function requestException(id) {
    setRenewalRows((currentRows) =>
      currentRows.map((renewal) =>
        renewal.id === id && renewal.status !== "approved"
          ? { ...renewal, status: "exception-requested", exceptionRequestedBy: currentUser.email }
          : renewal,
      ),
    );
  }

  return (
    <main className="shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Exercise 02</p>
          <h1>Renewal Approval PR</h1>
          <p>Review this PR for regressions, anti-patterns, security issues, and missing checks.</p>
        </div>
      </header>

      <RenewalDashboard portfolio={portfolio} />

      <section className="workspace">
        <div className="main-column">
          <RenewalFilters
            query={query}
            segment={segment}
            status={status}
            onQueryChange={setQuery}
            onSegmentChange={setSegment}
            onStatusChange={setStatus}
          />

          <RenewalTable
            currentUser={currentUser}
            renewals={visibleRenewals}
            selectedId={selectedRenewal?.id}
            onApprove={approveRenewal}
            onRequestException={requestException}
            onSelect={setSelectedId}
            projectedTotal={projectedTotal}
          />
        </div>

        <ApprovalDrawer
          currentUser={currentUser}
          renewal={selectedRenewal}
          onApprove={approveRenewal}
          onRequestException={requestException}
          projectedTotal={projectedTotal}
        />
      </section>
    </main>
  );
}
