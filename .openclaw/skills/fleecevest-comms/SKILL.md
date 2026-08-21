---
name: fleecevest-comms
description: "Stakeholder updates, exec summaries, launch plans, announcements. Answer first, bad news above accomplishments."
homepage: https://github.com/Websites-On-Computers/fleecevest
license: MIT
---

# fleecevest-comms

Load: `references/communication.md`.

Toolchain: if a declaration exists (`docs/product/toolchain.md`, else
`~/.claude/fleecevest-toolchain.md`), apply its comms row — stage rigor
(draft advisory, final enforced), end with the `route: <stage> → <destination>`
footer, offer push when the destination's connector is live (never push
unasked), else name the known connector from `references/connectors.md` once
per session. No declaration → skip all of this.

Answer first. The reader decides in the first three lines whether the rest
matters — write those three lines like they're the whole document.

## Artifacts — `docs/product/comms-<slug>.md`

- **Status update**: first line is on-track / at-risk / off-track + the one
  thing that changed. Then: decisions needed (owner + date), progress,
  risks. No "great progress this week" without a shipped thing attached.
- **Exec summary**: the ask in line one, the recommendation in line two, the
  evidence in five bullets, the full doc linked — not pasted.
- **Launch plan**: date, audience, one-sentence positioning (who it's for,
  what pain it kills, vs. what alternative), channel checklist with owners,
  rollback trigger, day-7 success check.
- **Announcement**: lead with the user's pain in their words, not the feature
  name. One CTA. No "we're excited to announce".

Rules:
- Every ask names an owner and a date.
- Bad news travels first: at-risk items above accomplishments, always.
- If the update contains no decision and no change, question sending it.

End with the standard output pattern: cut / assuming / validate next.
