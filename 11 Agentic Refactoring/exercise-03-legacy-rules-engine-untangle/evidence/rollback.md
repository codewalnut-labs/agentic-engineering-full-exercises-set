# Rollback

The focused production change is commit 730d1e4196def7b53b399fcd53f100d0cc147268. To roll back only the extraction, run `git revert 730d1e4196def7b53b399fcd53f100d0cc147268` on the exercise branch. That revert removes `DecisionPolicy` and restores the Ready validation inside `WorkflowService`; it does not modify the repository, controller, HTTP contract, React client, participant characterization test, or contract snapshot.

After the revert, run the participant characterization test alone to confirm the legacy behavior still passes. The protected full suite will intentionally be red on its two architecture checks because `DecisionPolicy` no longer exists; lookup precedence, exact exception text, the 12-character boundary, unknown-status acceptance, rejection immutability, and repository save counts should remain behaviorally unchanged.

If rollback is prompted by a contract regression rather than deployment mechanics, compare `contract-before.json` with a fresh observation before reverting evidence commits. Do not revert or edit the repository data model, HTTP error mapping, client parser, or protected tests as part of this rollback.
