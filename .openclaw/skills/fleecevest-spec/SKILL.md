---
name: fleecevest-spec
description: "Write a project spec: context, hard constraints, demo-able milestones with owners, one decider, risks with tripwires, kill criteria."
homepage: https://github.com/matthewlittlehale/fleecevest
license: MIT
---

# fleecevest-spec

Load: `references/prd-craft.md`, `references/prioritization.md`.

Run the clarity ladder first (a project is a bet too). Then write:

## Output — `docs/product/spec-<slug>.md`

    # Spec: <name>
    **Context** — why now, in three sentences or fewer.
    **Constraints** — hard limits: dates, budget, headcount, compliance.
    **Milestones** — each: name, date, demo-able outcome, owner. No milestone
    without something demo-able.
    **Ownership** — who decides, who builds, who's consulted. One decider.
    **Risks** — each: risk, likelihood (H/M/L), mitigation, tripwire signal.
    **Kill criteria** — the condition under which this project stops, and who
    pulls that trigger.
    **Open questions** — owner and date on each.

Rules:
- "Q3" is not a date. Milestones get real dates or `date: unset — OPEN QUESTION`.
- Exactly one decider. A committee in the Ownership section gets sent back.
- Risks without tripwires are worries, not risks. Cut or instrument them.

End with the standard output pattern: cut / assuming / validate next.
