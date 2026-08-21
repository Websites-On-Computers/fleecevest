---
name: fleecevest-strategy
description: >
  Strategy one-pager, roadmap prioritization, metrics tree, and the not-doing
  list. Use when the user says "product strategy", "roadmap", "prioritize
  these", "north star", or invokes /fleecevest-strategy.
---

# fleecevest-strategy

Load: `references/strategy.md`, `references/prioritization.md`, `references/metrics.md`.

Toolchain: if a declaration exists (`docs/product/toolchain.md`, else
`~/.claude/fleecevest-toolchain.md`), apply its strategy row — stage rigor
(draft advisory, final enforced), end with the `route: <stage> → <destination>`
footer, offer push when the destination's connector is live (never push
unasked), else name the known connector from `references/connectors.md` once
per session. No declaration → skip all of this.

A strategy that doesn't say no to anything is a wishlist. The **Not doing**
section is mandatory and load-bearing.

## Output — `docs/product/strategy-<slug>.md`

    # Strategy: <name>
    **Winning means** — one sentence, falsifiable, dated.
    **North star** — the one metric, current baseline, and the 2-3 input
    metrics that feed it (tree, not list).
    **Bets** — max 3, each: bet, why now, evidence, kill criteria.
    **Prioritized backlog** — impact/effort scored; RICE only to break ties.
    **Not doing** — named things stakeholders expect, with the one-line reason.
    **Revisit when** — the signals that reopen this strategy.

Rules:
- More than 3 concurrent bets is a wishlist; force ranking.
- Every bet inherits the ladder: evidence or ASSUMPTION, metric, kill criteria.
- "Not doing" entries name real things people asked for — an empty or
  strawman list means the strategy decided nothing.

End with the standard output pattern: cut / assuming / validate next.
