---
name: fleecevest-prd
description: "Write a PRD by interrogating until the clarity ladder passes: named user, evidence, smallest bet, metric and kill criteria. One page."
homepage: https://github.com/matthewlittlehale/fleecevest
license: MIT
---

# fleecevest-prd

Load: `references/prd-craft.md`, `references/discovery.md`, `references/metrics.md`.

No PRD until ladder rungs 1–5 pass. Interrogate one question at a time, in
ladder order. If rung 1 or 2 fails after honest questioning, output a one-line
kill recommendation instead of a PRD — that is a success, not a failure.

## Interrogation

Ask only what the ladder needs, one question per message:
1. Who exactly has this problem, and what do they do about it today?
2. What's the evidence? (quote / data / ticket — or we mark ASSUMPTION)
3. What's the smallest version that tests the bet?
4. What metric moves, from what baseline, and when do we kill it?

Skip any question the user's input already answers. Never ask all four as a list.

## Output — `docs/product/prd-<slug>.md`

One page, these headings, this order:

    # PRD: <name>
    **Problem** — one sentence: user, pain, today's alternative.
    **Evidence** — quotes/data, or ASSUMPTION blocks with cheapest test.
    **Bet** — smallest scope that tests it. What's deliberately out.
    **Success** — metric, baseline, target, kill criteria.
    **Requirements** — numbered; each traceable to the Problem.
    **Open questions** — owner and date on each.

At full level, appendices allowed AFTER the one-pager: edge cases, out-of-scope
log, rollout. At ultra, the one-pager is the whole document.

End with the standard output pattern: cut / assuming / validate next.
