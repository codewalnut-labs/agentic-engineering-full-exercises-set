# Comparison

## Same conditions

Both genuine first attempts started from e134b7e7b3163db395144bfb163a06d24ad06507 and used the identical request, Codex CLI with gpt-5.6-sol at medium reasoning, workspace-write shell permissions, model-service network access, a 15-minute limit, zero human hints, and zero retries. The after run alone had the documented characterization intervention in its run base.

## Before

The unconstrained attempt extracted the Ready rule into a repository-free `DecisionPolicy` and delegated from `WorkflowService`. Its 11 Maven tests and standalone client contract passed, but it had no participant characterization test or pre-committed snapshot proving the lookup, boundary, legacy status gap, mutation, and save-count behavior before production edits.

## After

The controlled attempt began at characterization commit dade0e6904ed84d81d0abecaf7f93cc43f9000a6. Four participant tests already proved missing-ID lookup precedence, the 11/12-character Ready boundary, exact exception text, accepted unknown statuses, rejected-state immutability, protected fields, and zero/one save counts. The agent then changed only `DecisionPolicy.java` and `WorkflowService.java`; all 15 Maven tests and protected backend, HTTP, and React client checks passed.

## Proof

`contract-before.json` and `contract-after.json` are byte-identical and match `docs/contract-observations.json`. Success remains HTTP 202 with exactly `id`, `customer`, `status`, `score`, `owner`, and `note`; invalid Ready remains HTTP 400 with the exact error; missing workflow remains HTTP 404. Both source patches have the same 28 additions and 3 removals across the same two production files. Their behavior is the same; only the new policy's explanatory Javadoc wording differs. The raw full-index patches are bound to implementation commits by SHA-256.

## Conclusion

Both agents reached the same minimal architecture and preserved behavior. The after path supplies the missing proof: a green-on-starter characterization suite and contract snapshot committed before production edits, a directly following two-file refactor, and evidence-only history afterward. No legacy validation gap was silently closed.
