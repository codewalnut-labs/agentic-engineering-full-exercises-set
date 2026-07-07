# Graph Snapshot

- CampaignTrigger -> TemplateRenderer -> ChannelRouter -> DeliveryAttempt.
- ChannelRouter -> ConsentCheck before SMS and email.
- DeliveryAttempt -> AuditEvent after provider response.
- BatchTrigger is asynchronous and writes queued attempts.

One edge in the starter UI is intentionally stale.
