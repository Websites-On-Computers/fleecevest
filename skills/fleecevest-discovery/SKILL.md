---
name: fleecevest-discovery
description: >
  Customer discovery artifacts: non-leading interview guides, assumption maps,
  research plans, synthesis of raw feedback. Use when the user says "interview
  guide", "user research", "validate this idea", "synthesize this feedback",
  or invokes /fleecevest-discovery.
---

# fleecevest-discovery

Load: `references/discovery.md`.

Toolchain: if a declaration exists (`docs/product/toolchain.md`, else
`~/.claude/fleecevest-toolchain.md`), apply its discovery row — stage rigor
(draft advisory, final enforced), end with the `route: <stage> → <destination>`
footer, offer push when the destination's connector is live (never push
unasked), else name the known connector from `references/connectors.md` once
per session. No declaration → skip all of this.

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
