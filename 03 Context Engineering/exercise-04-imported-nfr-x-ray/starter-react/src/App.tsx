import { useMemo, useState } from "react";
import { AuditFeed } from "./components/AuditFeed";
import { IntakeForm } from "./components/IntakeForm";
import { MetricStrip } from "./components/MetricStrip";
import { PageHeader } from "./components/PageHeader";
import { RequestDetails } from "./components/RequestDetails";
import { RequestQueue } from "./components/RequestQueue";
import { auditEvents, controlCatalog, enterpriseRequests, tenants } from "./data/requests";
import { loadDraft, publishApprovalEvent, saveDraft, submitDraft } from "./services/draftStore";
import { summarizeTenant } from "./utils/risk";

export default function App() {
  const [tenantId, setTenantId] = useState(tenants[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState(loadDraft());
  const [requests, setRequests] = useState(enterpriseRequests);
  const [selectedId, setSelectedId] = useState(enterpriseRequests[0].id);

  const tenant = tenants.find((item) => item.id === tenantId) ?? tenants[0];

  const tenantRequests = useMemo(() => {
    return requests.filter((request) => request.tenantId === tenantId);
  }, [requests, tenantId]);

  const visibleRequests = useMemo(() => {
    return tenantRequests.filter((request) => {
      return (
        request.vendor.includes(query) ||
        request.ownerEmail.includes(query) ||
        request.department.includes(query)
      );
    });
  }, [query, tenantRequests]);

  const metrics = useMemo(() => summarizeTenant(tenantRequests), [tenantRequests]);

  const selectedRequest =
    visibleRequests.find((request) => request.id === selectedId) ??
    visibleRequests[0] ??
    tenantRequests[0];

  function approveRequest(id) {
    let approvedRequest;
    const nextRequests = requests.map((request) => {
      if (request.id !== id) {
        return request;
      }

      approvedRequest = {
        ...request,
        status: "approved",
        approvedBy: draft.ownerEmail,
        approvedAt: new Date().toISOString(),
      };

      return approvedRequest;
    });

    publishApprovalEvent({
      action: "vendor.approved",
      tenantId,
      actor: draft.ownerEmail,
      request: approvedRequest,
    });
    setRequests(nextRequests);
  }

  function blockRequest(id) {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "blocked",
              blockedAt: new Date().toISOString(),
              blockedReason: "Manual reviewer hold",
            }
          : request,
      ),
    );
  }

  function createRequest() {
    const newRequest = submitDraft(draft, tenant);
    setRequests((currentRequests) => [newRequest, ...currentRequests]);
    setSelectedId(newRequest.id);
  }

  function updateDraft(field, value) {
    const nextDraft = { ...draft, [field]: value };
    setDraft(nextDraft);
    saveDraft(nextDraft);
  }

  return (
    <main className="shell">
      <PageHeader
        tenant={tenant}
        tenants={tenants}
        onTenantChange={(nextTenantId) => {
          setTenantId(nextTenantId);
          setSelectedId("");
        }}
      />

      <MetricStrip metrics={metrics} />

      <section className="grid">
        <IntakeForm draft={draft} onChange={updateDraft} onSubmit={createRequest} tenant={tenant} />

        <RequestQueue
          query={query}
          requests={visibleRequests}
          selectedId={selectedRequest?.id}
          onQueryChange={setQuery}
          onSelect={setSelectedId}
        />

        <RequestDetails
          controls={controlCatalog}
          request={selectedRequest}
          onApprove={approveRequest}
          onBlock={blockRequest}
        />

        <AuditFeed events={auditEvents} />
      </section>
    </main>
  );
}
