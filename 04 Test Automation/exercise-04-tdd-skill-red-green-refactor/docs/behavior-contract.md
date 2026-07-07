# Retry Behavior Contract

- Expired payment methods stop automatic retries and ask for card update.
- Enterprise accounts use account-manager copy after the first failed retry.
- Recovered invoices clear account holds within the same visible workflow.
- Retry windows are 1 day, 3 days, and 7 days from the original failure.
