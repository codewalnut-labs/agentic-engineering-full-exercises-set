# Readiness scenarios

These tasks test the setup before development begins. Use the same fresh session after committing the setup. You may explicitly invoke your selected skills and answer their questions. Record all input; do not invent product-owner answers or hide unsuccessful attempts. Save the actual transcript as `evidence/session.txt`.

## requirements

Product request:

> Add a Needs Attention filter for important cases. Support should see the cases they need to act on first.

Use your requirements-questioning workflow to establish what the repository already tells you and what still needs a product decision. Save the questions, source-backed observations, and unresolved decisions in `evidence/requirements.md`. Stop before implementation. The existing routing policy is evidence of current behaviour; it does not settle every meaning in this new request.

## research

Engineering question:

> In this React application, should a filtered case list and its displayed count be stored separately in state, synchronized with an Effect, or derived from the current inputs? Does useMemo change the correctness guarantees?

Use your research workflow. Save a recommendation in `evidence/research.md`, supported by at least two relevant primary-source pages and a reference to the current component. Distinguish the documented behaviour from your recommendation. Record unresolved questions and retrieval failures; do not invent citations. Research is the skill demonstration, not a request to optimize the application.

## tdd

Use your TDD workflow to identify an existing public behaviour and the interface where a future change should be tested. Agree the proposed interface with the learner acting as the engineer; record that exchange if your skill requires it. Run `npm run test:behavior` and capture its output using the setup guide.

Save the chosen interface, an existing assertion, a proposed next behavioural test, and the observed baseline in `evidence/tdd.md`. Explain what would make the proposed test fail and what the existing suite does not prove. No implementation or new test is required: this demonstrates TDD readiness, not a completed red/green cycle.

## review

Review the supplied change in `fixtures/review/` against `spec.md` and `standards.md` using your selected review skill. Save findings with source locations, requirement or standard references, and concrete impact in `evidence/review.md`. Record both requirements and standards coverage, including any clean findings or uncertainty. Do not repair the fixture.

If your skill requires a Git comparison, `npm run setup:review` materializes the exact supplied before/after files as two commits in a temporary repository, with the spec and standards included. Pass the printed repository path, base commit, and spec path to the skill. Run Git commands with that explicit repository path; do not change the main session's working directory or start an unconfigured agent there. Record the printed metadata in the transcript. The fixture can be reconstructed later; its temporary path is not part of the submitted setup.

## Discovery and limits

Before these tasks, record how the selected runtime discovers the project instructions and skill entries. Demonstrate that the relevant instructions were loaded, including dependent skills when used. A skill's presence in a menu is only discovery evidence; scenario transcripts must show its invocation and resulting work.

These are readiness observations, not a controlled before/after model experiment. Initial success is valid. The checks validate files, references, hashes, capability coverage, and captured results. A reviewer assesses whether the skills actually guided the work, whether clarification is useful, whether research sources support the recommendation, and whether review findings are correct.
