# Example: PRD excerpt teardown

## Before (how it usually goes)

Excerpt from the Overview section of `docs/product/prd-dark-mode.md`:

> We're building dark mode because elite products already have it in 2026.
> We will leverage synergies between design and engineering to delight
> users at scale. Our goal is to increase engagement and increase
> retention through a more modern, personalized experience. We'll ship a
> comprehensive theming system — dark mode, high-contrast mode, and fully
> custom themes — over the next two quarters, starting with a design
> system audit. Success looks like happier, more engaged users.

## After (fleecevest)

Overview: solution-first: opens with "we're building dark mode" before any named user or pain. Fix: lead with who hurts today and what they do about it now.

Overview: vague: "leverage synergies between design and engineering to delight users at scale" names no user, number, or date. Fix: state the specific capability and who gets it.

Overview: no-baseline: "increase engagement and increase retention" has no current rate. Fix: baseline unknown — measure first, then set a target.

Overview: scope: high-contrast mode and fully custom themes are bundled in with dark mode but don't test the same bet. Fix: cut both to the out-of-scope log, revisit if dark mode's retention bet lands.

Overview: theater: "starting with a design system audit" informs no ship/no-ship decision. Fix: delete, or replace with the smallest testable slice.

Overview: unkillable: doc ends on "happier, more engaged users" with no stop condition anywhere. Fix: name the metric and the date it gets killed if it doesn't move.

net: -4 lines possible. rungs failed: 2 (problem), 3 (evidence), 4 (scope), 5 (kill criteria).

## What changed
- Cut: the buzzword paragraph collapses from a 6-line excerpt to one findable problem statement.
- Sharpened: "increase engagement and retention" becomes "baseline unknown — measure first."
- Added: an explicit kill condition, which the excerpt never had.
