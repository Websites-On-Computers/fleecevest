# Example: Dark mode

## Before (how it usually goes)

# Dark Mode Vision Doc

### Executive Summary
Dark mode is a strategic opportunity to create real synergy across our
platform's aesthetic and delight our most elite power users. Doubling down
on personalization cements our position as an industry leader in
user-centric design.

### Vision
We envision a product that adapts to every user, every time of day, every
mood. Dark mode isn't just a color scheme — it's a statement about who we
are as a company.

### Market Landscape
Competitor A shipped dark mode in 2019. Competitor B followed in 2021.
Rumor has it Competitor C is building it now. We risk looking dated.

### Goals
- Increase engagement
- Increase delight
- Increase retention
- Reduce churn
- Modernize our visual identity
- Improve accessibility (eventually)

### Proposed Approach
Build a full theming system: light, dark, high-contrast, and user-defined
custom palettes. Include a settings panel, OS-level sync, per-page
overrides, scheduled auto-switching, and a public theming API so partners
can build on top of it. Roll out over two quarters, starting with a design
system audit.

## After (fleecevest)

# PRD: Dark mode

**Problem** — Users who work at night (40% of sessions start after 10pm)
get eye strain on the current all-white UI and work around it with a
browser dark-mode extension that breaks our layout.

**Evidence**
- 40% of sessions start after 10pm (product analytics, Aug 2026).
- 40 support tickets in the last 90 days ask for dark mode by name.
- ASSUMPTION: night-session users churn at a higher rate than day users —
  cheapest test: pull 90-day retention by session-start-hour cohort before
  building anything.

**Bet** — A single dark palette toggle in Settings, applied to the three
highest-traffic screens (dashboard, feed, settings itself). Out:
system-theme auto-detect, per-page overrides, custom palettes, a public
theming API.

**Success** — Metric: night-session (10pm–6am) 30-day retention. Baseline:
38% (Aug 2026 cohort). Target: 42%. Kill: if retention hasn't moved 2pts
after 6 weeks live, revert the toggle default and shelve custom palettes.

**Requirements**
1. Toggle in Settings persists per-user. Traces to: today's workaround
   (browser extension) doesn't persist across devices.
2. Dark palette covers dashboard, feed, settings. Traces to: these are the
   three screens with the highest night-session traffic.
3. Toggle state syncs across devices via existing account settings sync.
   Traces to: users switch between phone and desktop at night.

**Open questions**
- Does the dark palette meet WCAG AA contrast on the feed's status colors?
  Owner: design, by 2026-08-27.
- Do we need an off-ramp message for users on the browser-extension
  workaround? Owner: support, by 2026-08-25.

PRD: Dark mode → cut: system-theme auto-detect, per-page overrides,
theming API. assuming: night-session users churn more than day users.
validate next: pull 90-day retention by session-start-hour cohort before
building.

## What changed
- Cut: the theming API, per-page overrides, and auto-detect — none of them test the retention bet.
- Sharpened: "increase engagement" became a specific retention delta with a 38% baseline and a 6-week kill date.
- Added: the browser-extension workaround as the real point of comparison, not "no dark mode."
