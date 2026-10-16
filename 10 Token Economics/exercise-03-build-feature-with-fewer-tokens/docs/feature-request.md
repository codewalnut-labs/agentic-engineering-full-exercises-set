# Export the currently filtered records

Implement exportFiltered(records, filters) in src/feature/exportFiltered.mjs. It returns an object with filename "filtered-records.csv", mimeType "text/csv;charset=utf-8", and content containing UTF-8 CSV text. This is the export service function; browser download wiring is outside this ticket.

The existing list filters and CSV serializer in src/lib are the current behavior contracts. Support status (default "All") and a case-insensitive, trimmed title query (default empty). Preserve matching input order, leave the caller's records unchanged, and export only matching records. Columns are id, title, status. Empty results contain the header and final CRLF. Preserve CSV quoting, embedded quotes/newlines, and spreadsheet-formula protection already implemented in the serializer.

Complete the whole ticket, add relevant behavioral tests under tests/, and run them. Existing src/lib files are shared and must stay unchanged. New dependencies and changes outside src/feature/ and tests/ are outside this ticket. Do not invent additional export formats, configuration systems, pagination, or unrelated product features. Explain what you implemented, verified, and left uncertain.

Work only in this disposable trial directory. The same request, starter, tools, model, effort, permissions, and limits are used for every trial. Do not consult results from another trial. Do not edit any external scorer or acceptance checks.
