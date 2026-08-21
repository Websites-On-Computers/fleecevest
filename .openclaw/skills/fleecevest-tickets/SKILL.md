---
name: fleecevest-tickets
description: "Break a PRD or spec into outcome-named epics and paste-clean tickets with stories, acceptance criteria, dependencies, readiness."
homepage: https://github.com/Websites-On-Computers/fleecevest
license: MIT
---

# fleecevest-tickets

Load: `references/working-with-eng.md`.

Toolchain: if a declaration exists (`docs/product/toolchain.md`, else
`~/.claude/fleecevest-toolchain.md`), apply its tickets row — stage rigor
(draft advisory, final enforced), end with the `route: <stage> → <destination>`
footer, offer push when the destination's connector is live (never push
unasked), else name the known connector from `references/connectors.md` once
per session. No declaration → skip all of this.

Input: a PRD/spec path or pasted content. No source doc → ask for it, don't
fabricate. Read the **Bet** and **Requirements** sections; everything else is
context.

## Output — `docs/product/tickets-<slug>.md`

    # Tickets: <name>
    ## Epic: <outcome-named, not feature-named>
    ### <ticket title — verb first>
    Story: As <user from the PRD Problem>, I want <capability> so that <pain relief>.
    Acceptance:
    - Given <context> / When <action> / Then <observable result>
    Depends on: <ticket title | none>
    Blocks: <ticket title | none>
    Ready: <yes | no — what's missing>

Rules:
- Every ticket traces to a numbered PRD requirement; orphan tickets get cut.
- A ticket an engineer can't start tomorrow is marked `Ready: no` with the one
  thing missing — never padded with guesses.
- Epics are outcomes ("Users recover their account alone"), not components
  ("Auth service work").
- One heading per epic, one `###` per ticket: the format maps mechanically to
  Jira/Linear/GitHub Issues later. Don't decorate it.

## Ticket policy

When the toolchain declaration carries a `## Ticket policy` section: each
ticket also carries the policy's fields explicitly (issue type line, each
required field as its own line, labels), and `Ready:` honors the policy's
definition of ready. No policy → the format above, unchanged.

## Dependencies & sequencing

- `Depends on:` = needs first. `Blocks:` = what this ticket holds up. Both
  reference ticket titles in this doc.
- `Blocked by (external): <thing> — owner, date` for cross-team, vendor, or
  decision blockers. An external blocker is an OPEN QUESTION with teeth.
- End every tickets doc with a **Sequencing** section: delivery waves derived
  from the dependency graph — `Wave 1: A, B (parallel) → Wave 2: C (needs A)`
  — with the critical path marked. A dependency cycle is a bug in the
  breakdown: report it, don't silently linearize.
- On push to a live tracker connector (only after an explicit yes),
  `Depends on:`/`Blocks:` become the tracker's issue links (Jira
  "blocks"/"is blocked by").

End with the standard output pattern: cut / assuming / validate next.
