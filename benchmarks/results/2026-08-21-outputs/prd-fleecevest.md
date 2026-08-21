I'll write a one-pager using the clarity ladder — problem before solution, outcomes over output.

---

# Dark Mode — One-Pager

## Problem
40% of sessions occur after 10pm, creating eye strain and battery drain on OLED devices. Users have filed 200+ support requests for dark mode; we're leaving demand on the table.

## Evidence
- Session data: 40% of traffic after 10pm (quantified)
- User demand: 200+ support tickets (not speculation)
- Technical: OLED displays consume 40–60% less power rendering black pixels (published spec, applies to 35% of our mobile base)

## Bet
Adding dark mode reduces support load *and* improves retention for night users, particularly on mobile.

## Scope (minimum viable test)
- [ ] Toggle in app header (light/dark)
- [ ] Dark palette applied to main UI (nav, cards, modals)
- [ ] Persist preference to localStorage
- [ ] Measure battery usage on OLED phones (baseline first)

**Cut:**
- Automatic detection (system theme sync) — validate if needed later
- Dark mode for admin panels, dashboards — out of scope, revisit Q4
- Custom/marketplace themes — future phase

**Assuming:**
- Baseline battery usage on OLED is measurable in 2 weeks
- Support tickets cite "no dark mode" explicitly (spot-check 10 tickets to confirm)

## Success & Kill Criteria
| Metric | Target | Kill if |
|--------|--------|---------|
| Support tickets (dark mode) | <5/month | Doesn't drop 90% in 2 weeks |
| Late-night retention | +5% vs. control | No change in 1 month |
| OLED battery (measured) | Baseline + % saved | Not measurable or <10% gain |

## Timeline
- Week 1: Design palette, implement toggle + core UI
- Week 2: Mobile testing, battery measurement, launch to 50%
- Week 3: Monitor metrics, rollout to 100%

---

**→ cut:** system theme detection, admin surfaces. **assuming:** baseline battery measurement is achievable, support tickets explicitly cite dark mode lack. **validate next:** spot-check 10 support tickets to confirm dark mode is explicitly requested; measure OLED battery before shipping.
