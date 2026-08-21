# Behavior Benchmark

**What this measures:** Does the fleecevest persona actually change output for the better? We run three fixed product prompts — a PRD, a spec, a prioritization — through Claude Haiku twice: baseline (no persona) vs. fleecevest mode (with instructions). Both outputs are scored against the same five deterministic checks: Does the problem show up first? Are kill criteria named? Are assumptions marked? Is the baseline acknowledged? Does it fit one page?

**How to run:**
```bash
npm run bench
```

Requires an authenticated `claude` CLI and ~5 minutes. Makes 6 Haiku calls (3 prompts × 2 arms). Outputs a markdown table to stdout and saves results to `benchmarks/results/<date>.md`.

**Gate semantics:** The script exits with code 1 if the fleecevest arm doesn't beat baseline. A regression — when the persona delivers equal or worse output — is fatal. We don't tune the checks to flatter the persona; if you lose, that's a finding, not a regex bug.

**What we're not measuring:** We're not running an LLM judge, surveying real users, or testing every edge case. This is a regression gate. A passing benchmark proves the persona measurably tightens thinking; a failing one demands investigation.
