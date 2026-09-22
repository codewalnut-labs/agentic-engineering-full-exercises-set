# Before evaluation

- Starting commit: `5c099d27fa4c530dee5a76190aff64e6975f7441`
- Implementation commit: `99f47788c0f7015720a8e6a8f1342c44cbb6ae05`
- Agent and model: Codex, GPT-5.6 Sol
- Tools and permissions: identical nonce-bound read-only review adapter and protected evaluation cases
- Time limit: 9 minutes per case
- Human hints: 0
- Retries: 0
- Patch SHA-256: `b2567957d92a3bf994933909c8f6854cc76ce501366f81d1e17e528695cfaf9d`

Three independent baseline sessions reviewed the historical regression, security regression, and clean control without loading the reusable skill. The baseline identified all seven supported defect rules and approved the clean control. It reported nine blocking findings for those seven rules: two additional findings duplicated supported root causes within the historical case (search matching versus omitted search fields, and due-today urgency versus blocked-item weighting). The recorded precision of `0.7777777778` therefore reflects duplicate blocker reporting, not two proven false positives or a measured false-positive rate. The implementation commit records the immutable session index used for this comparison.
