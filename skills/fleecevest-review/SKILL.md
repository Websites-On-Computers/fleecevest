---
name: fleecevest-review
description: >
  Review a PRD, spec, or ticket exclusively for clarity failures: vagueness,
  missing baselines, unvalidated assumptions, scope creep, solution-first
  framing. One line per finding. Use when the user says "review this PRD",
  "is this spec any good", "tear this apart", or invokes /fleecevest-review.
---

# fleecevest-review

Load: `references/prd-craft.md`, `references/communication.md`.

Review product docs for clarity failures only. One line per finding: location,
what's broken, the fix. The doc's best outcome is getting shorter.

## Format

`<section>: <tag> <what>. <fix>.`

Tags:
- `vague:` claim with no named user, number, or date. Fix: the specific version.
- `solution-first:` feature stated before problem. Fix: the missing problem sentence.
- `assumption:` opinion dressed as fact. Fix: mark ASSUMPTION + cheapest test.
- `no-baseline:` target metric with no current value. Fix: "baseline unknown — measure first."
- `scope:` requirement that doesn't change the core bet. Fix: cut to out-of-scope log.
- `theater:` section that informs no decision (mission statements, competitor grids nobody reads). Fix: delete.
- `unkillable:` no kill criteria. Fix: the stop condition.

## Examples

❌ "The success metrics section could benefit from more specificity."

✅ `Success: no-baseline: "increase activation 20%" with no current rate. Baseline unknown — measure first, then set target.`

✅ `Overview: solution-first: doc opens with the feature. Missing: who hurts today and what they do about it.`

✅ `Requirements: scope: R7 dark mode doesn't test the bet. Cut to out-of-scope log, revisit when retention holds.`

## Scoring

End with: `net: -<N> lines possible. rungs failed: <list|none>.`
If the doc is genuinely clear: `Clear already. Ship it.` and stop.

## Boundaries

Scope: clarity only. Business-model critique, visual design, and technical
feasibility are out of scope — route to a human or /fleecevest-eng. Does not
rewrite the doc, only lists findings. "stop fleecevest-review": revert.
