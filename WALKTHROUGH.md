# Walkthrough

One PM, one feature, end to end. The product is Fresco, a meal-planning app.
The feature idea is *pantry scan* — point your camera at the shelf, get
recipes from what you already own. Sounds great. Fleecevest's job is to find
out whether it is.

Everything below is what you type and what comes back, abbreviated. Install
first (two commands, [README](README.md#install)), then follow along.

## 1. Declare your toolchain

```
/fleecevest-toolchain
```

> Where do tickets live?

`Jira, board FRSC`

> Where do docs draft, and where do they land when final?

`We think in Google Docs, finished PRDs live in Confluence /Product/PRDs`

> Where do status updates go?

`Slack #product`

> Does Jira have required fields or conventions? Tell me, or point me at a
> policy doc.

`Paste: [the team's ticket standards doc]`

Fleecevest distills the pasted doc and writes the file:

```markdown
# Toolchain

| artifact | draft | review | final |
|---|---|---|---|
| prd | Google Docs | — | Confluence /Product/PRDs |
| tickets | — | — | Jira (FRSC board) |
| comms | — | — | Slack #product |

## Ticket policy — Jira (FRSC)

- Issue types: Epic > Story; bugs are Bug, never Story
- Required fields: Fix Version, Component, Story Points (Fibonacci)
- Definition of ready: AC in Given/When/Then, pointed, no open questions
Source: pasted ticket standards doc, 2026-08-21
```

Do this once per project. Re-run it when the stack changes.

## 2. Draft the PRD

```
/fleecevest-prd pantry scan — draft stage
```

Draft stage means the ladder is advisory: thinking out loud is legal. It
still asks before it writes:

> Who exactly has this problem, and what do they do about it today?

`Meal planners who already own half the ingredients — they re-buy stuff they
have. Today they check the shelf by hand, or don't.`

One question at a time, then the draft — with the unknowns marked instead of
papered over:

```markdown
# PRD: Pantry scan
**Problem** — Fresco planners re-buy ingredients they already own because
checking the shelf is manual and skipped.
**Evidence** — ASSUMPTION: duplicate-purchase pain is real at scale.
Cheapest test: search support tickets for "already had".
**Success** — baseline unknown — measure first. OPEN QUESTION: metric owner
— Matt, by Fri.
...
route: draft → Google Docs
```

No kill-criteria gate yet. That's the point of a draft.

## 3. Test the assumptions

```
/fleecevest-discovery test the pantry scan assumptions
```

You get an assumption map, riskiest first — camera permission rates, scan
accuracy expectations, whether anyone actually re-buys — each with the
cheapest test. Six user interviews later, the interview guide's
past-behavior questions ("When did you last buy something you already had?")
turn one ASSUMPTION into evidence and kill another: nobody wants to scan
weekly; they want it once, at onboarding.

Scope just got smaller. That's discovery working.

## 4. Promote

```
promote the pantry scan PRD
```

Promotion re-runs the ladder as a gate. It fails honestly:

```
rung 5: no kill criteria. What makes us stop?
```

`If scan-at-onboarding adoption is under 20% at day 30, we pull it.`

Gate passes. The PRD tightens to one page, the footer flips:

```
route: final → Confluence /Product/PRDs
```

If an Atlassian connector is live in your session, it offers — once — to
push. It never pushes unasked. No connector? It names the known one and
drops the subject.

## 5. Cut tickets

```
/fleecevest-tickets docs/product/prd-pantry-scan.md
```

Policy-aware, dependency-honest:

```markdown
## Epic: Planners stop re-buying what they own

### Scan shelf at onboarding
Story: As a new Fresco planner, I want to scan my pantry once during setup
so that my first plan uses what I already have.
Acceptance:
- Given camera permission granted / When the shelf is scanned / Then
  recognized items appear in the pantry list for confirmation
Issue type: Story · Fix Version: 24.9 · Component: onboarding · Points: 5
Depends on: none
Blocks: Generate first plan from pantry
Ready: yes

### Generate first plan from pantry
...
Ready: no — recognition accuracy target unset. OPEN QUESTION: eng, by Wed.

## Sequencing
Wave 1: Scan shelf at onboarding, Pantry item confirmation UI (parallel)
Wave 2: Generate first plan from pantry (needs both) ← critical path
```

Live Jira connector → it offers to create the epic, stories, and the
"blocks" links. `Ready: no` goes in as-is. Honesty survives the push.

## 6. Prep for the eng conversation

```
/fleecevest-eng the pantry scan proposal
```

Ten questions to ask, three you should expect back — with the answers you
should already have. The one that earns its keep:

```
Which decisions here are one-way doors? (On-device recognition vs cloud
changes the privacy story permanently.)
```

## 7. Ship the update

```
/fleecevest-comms status update on pantry scan
```

Answer first, bad news above accomplishments:

```markdown
**At risk** — recognition accuracy target still unset; blocks Wave 2.
Decision needed: eng owner by Wed.
Shipped: onboarding scan behind a flag. Kill criteria live: <20% adoption
at day 30 pulls it.
route: final → Slack #product
```

## 8. The teardown, for inherited docs

Someone hands you a 14-page PRD from last year:

```
/fleecevest-review docs/legacy/smart-fridge-prd.md
```

```
Overview: solution-first: doc opens with the feature. Missing: who hurts
today and what they do about it.
Success: no-baseline: "increase engagement 30%" with no current rate.
Requirements: scope: R12 recipe sharing doesn't test the bet. Cut.
net: -220 lines possible. rungs failed: 2, 3, 5.
```

## Knobs

- `/fleecevest lite` when you want flags, not gates. `/fleecevest ultra`
  when one page is the maximum. Full is the default.
- "take off the vest" turns it all off.
- No toolchain file? Everything above still works — artifacts just stay in
  `docs/product/` and the ladder runs at full rigor everywhere.

The clearest doc that ships is the right doc.
