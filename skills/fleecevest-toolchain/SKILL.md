---
name: fleecevest-toolchain
description: >
  Declare the team's PM toolchain: which tracker, doc tools, and comms
  channels artifacts route to per stage (draft/review/final), plus the
  tracker's ticket policy. Use when the user says "set up my toolchain",
  "we use Jira", "configure my tools", "toolchain", or invokes
  /fleecevest-toolchain. Re-runnable to edit an existing declaration.
---

# fleecevest-toolchain

Load: `references/connectors.md`.

Writes the toolchain declaration. If one exists (project
`docs/product/toolchain.md`, else user `~/.claude/fleecevest-toolchain.md`),
read it first and ask only about what's changing.

## Interview

One question at a time, only what's missing:

1. Where do tickets live? (tracker + project/board)
2. Where do docs draft, and where do they land when final? Review stop
   between?
3. Where do status updates and launch comms go?
4. Ticket policy: "Does your tracker have required fields or structural
   conventions? Tell me, or point me at a policy doc to infer from." A
   pointed-at doc (repo file, pasted content, or connector-fetched page)
   gets distilled into the inline policy section — never just linked. Cite
   `Source: <doc>, <date>`. If fetching needs a connector that isn't live,
   fall back to interview and mark `Source: pending`.
5. Placement, last: this project (`docs/product/toolchain.md`) or everywhere
   (`~/.claude/fleecevest-toolchain.md`)?

## Output format

    # Toolchain

    | artifact | draft | review | final |
    |---|---|---|---|
    | prd | Google Docs | Confluence (comments) | Confluence /Product/PRDs |
    | tickets | — | — | Jira (PROJ board) |
    | comms | — | — | Slack #product-updates |

    Notes: <freeform — naming conventions, spaces, who approves promotes>

    ## Ticket policy — <Tracker> (<project>)

    - Issue types: <hierarchy and when each is used>
    - Required fields: <each field + its convention>
    - Labels: <conventions>
    - Definition of ready: <the team's bar>
    - Epic naming: <convention>
    Source: <where this came from>, <date>

Rules:
- `—` = that stage doesn't exist for the artifact.
- Skip the policy section entirely when the team has no conventions — an
  empty policy is noise.
- Project file wins over user file wholesale; never merge rows across the
  two.

Show the finished file. Done — no tour of what each line means.
