---
name: fleecevest-strategy
description: "Strategy one-pager: falsifiable definition of winning, metric tree, max 3 bets with kill criteria, and a real not-doing list."
homepage: https://github.com/matthewlittlehale/fleecevest
license: MIT
---

# fleecevest-strategy

Load: `references/strategy.md`, `references/prioritization.md`, `references/metrics.md`.

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
