# Graph Extract

| Node | Type | Edges | Risk |
|---|---|---|---|
| RevenueDashboard | React route | reads MetricDefinition, AccountFilter | high |
| billing_events | warehouse table | feeds RevenueDashboard, RetentionJob | high |
| IngestBillingEvents | scheduled job | writes billing_events | high |
| finance-metrics.md | doc | defines gross revenue copy | medium |
| support-dashboard.md | doc | defines net revenue copy | medium |

The extract is intentionally incomplete. Learners must repair missing owner and terminology edges.
