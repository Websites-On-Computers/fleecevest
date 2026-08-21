# Example: Account settings & first-load performance

## Before (how it usually goes)

Backlog, pasted straight into the sprint:

1. Build settings page
2. Add change-email flow
3. Add password reset
4. Make it fast
5. Fix login bugs
6. Improve onboarding
7. Redesign nav
8. Support SSO
9. Clean up old code
10. Add analytics events
11. Write tests
12. Ship it

No owner, no acceptance criteria, no order. "Make it fast" and "fix login
bugs" sit next to "build settings page" like they're the same size. Half of
these don't trace back to anything a user asked for.

## After (fleecevest)

# Tickets: Account settings & first-load performance

### Epic: Users manage their own account without filing a support ticket

#### Change email address
Story: As a user who wants to change my email, I want to update it myself in settings so that I don't have to email support and wait a day.
Acceptance:
- Given I'm logged in on Settings / When I enter a new email and confirm my password / Then I get a verification link at the new address, and the change applies only after I click it.
Depends on: none
Ready: yes

#### Reset password without an active session
Story: As a user who's locked out, I want to request a password reset from the login screen so that I can get back in without contacting support.
Acceptance:
- Given I'm on the login screen / When I click "forgot password" and enter my email / Then I receive a reset link valid for 1 hour.
Depends on: none
Ready: yes

### Epic: First page load feels instant on mobile

#### Lazy-load feed images below the fold
Story: As a mobile user on a slow connection, I want images below the fold to load as I scroll so that the first screen renders fast.
Acceptance:
- Given I open the app on 3G / When the feed renders / Then only above-the-fold images load in the first request; the rest load on scroll.
Depends on: none
Ready: yes

#### Cut first-load payload under 200KB
Story: As a mobile user, I want the initial bundle small so that the app is usable before the spinner finishes.
Acceptance:
- Given a cold load on 3G / When the app requests its first bundle / Then total payload is under 200KB.
Depends on: none
Ready: no — current payload size isn't measured, so the cut can't be sized.

Tickets: Account settings & first-load performance → cut: nav redesign, SSO,
and the analytics/tests/cleanup line items — none trace to either epic.
assuming: "make it fast" meant first-load payload, not a specific known
bottleneck. validate next: measure current first-load payload size before
sizing the perf epic further.

## What changed
- Cut: nav redesign, SSO, and the miscellaneous cleanup/tests/analytics items — none traced to a named user outcome.
- Sharpened: "make it fast" became a measured payload target with acceptance criteria, and got marked `Ready: no` until baseline exists.
- Added: two outcome-named epics so "settings page" and "fast" have a reason to exist instead of being tasks for their own sake.
