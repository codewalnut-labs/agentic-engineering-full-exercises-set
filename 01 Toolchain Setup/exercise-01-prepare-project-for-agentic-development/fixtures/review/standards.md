# Queue module standards

- Public functions document their input and output contract.
- Pure query helpers must not mutate caller-owned arrays or objects.
- Keep data selection and its reported summary consistent.
- Prefer explicit, readable transformations. Avoid unrelated cleanup.

Judge the diff against both these standards and the supplied spec. A clean result on one axis does not establish correctness on the other.
