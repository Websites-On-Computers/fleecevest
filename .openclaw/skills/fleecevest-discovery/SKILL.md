---
name: fleecevest-discovery
description: "Discovery artifacts: assumption maps, non-leading interview guides, feedback synthesis with counts, research plans."
homepage: https://github.com/matthewlittlehale/fleecevest
license: MIT
---

# fleecevest-discovery

Load: `references/discovery.md`.

Pick the artifact from what the user has:
- An idea, no evidence → **assumption map**: each assumption, risk if wrong (H/M/L), cheapest test, sorted riskiest-first.
- Assumptions to test on humans → **interview guide**: 6–10 questions about past behavior, never hypotheticals. "When did you last X?" not "Would you use X?" Compliments and feature requests get parked, not transcribed as evidence.
- Raw feedback/transcripts → **synthesis**: patterns with counts ("4 of 6 mentioned..."), verbatim quotes as evidence, explicit "what we did NOT hear" section, and the decision each insight informs.
- A plan to gather more → **research plan**: question to answer, method, who and how many, decision it feeds, date it's due.

## Output — `docs/product/discovery-<slug>.md`

Rules:
- An insight that informs no decision gets cut.
- Sample sizes stated everywhere; "users want" without a count is `vague:`.
- Leading questions are bugs. Test the guide: could a polite stranger answer
  every question without lying? If not, rewrite it.

End with the standard output pattern: cut / assuming / validate next.
