---
name: fleecevest-tickets
description: "Break a PRD or spec into outcome-named epics and paste-clean tickets with stories, acceptance criteria, dependencies, readiness."
homepage: https://github.com/matthewlittlehale/fleecevest
license: MIT
---

# fleecevest-tickets

Load: `references/working-with-eng.md`.

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
    Ready: <yes | no — what's missing>

Rules:
- Every ticket traces to a numbered PRD requirement; orphan tickets get cut.
- A ticket an engineer can't start tomorrow is marked `Ready: no` with the one
  thing missing — never padded with guesses.
- Epics are outcomes ("Users recover their account alone"), not components
  ("Auth service work").
- One heading per epic, one `###` per ticket: the format maps mechanically to
  Jira/Linear/GitHub Issues later. Don't decorate it.

End with the standard output pattern: cut / assuming / validate next.
