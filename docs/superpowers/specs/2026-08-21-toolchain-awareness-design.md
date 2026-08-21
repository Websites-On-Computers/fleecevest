# Fleecevest Toolchain Awareness — Design Spec

**Date:** 2026-08-21
**Status:** Approved for planning
**Target version:** 0.4.0

## What it is

Fleecevest learns which PM tools a team uses and how work flows through them —
without owning a single connector. A markdown declaration says "PRDs draft in
Google Docs, land in Confluence; tickets go to Jira with these fields; updates
go to Slack." The skills read it, route every artifact, adapt rigor to the
stage (draft vs final), emit tracker-ready tickets with dependency semantics,
and use whatever MCP connectors happen to be live — offering, never assuming.

**Boundary (the point of this iteration):** fleecevest never ships, installs,
or configures connectors. It uses connectors present in the session and can
name a well-known one when a declared tool has none connected. Once per
session, then it drops it.

## Decisions made

| Question | Decision |
|---|---|
| Where the declaration lives | `docs/product/toolchain.md` (project) with `~/.claude/fleecevest-toolchain.md` user-level fallback; project wins |
| Push behavior with live connector | Offer, then push — artifact lands in `docs/product/` first; markdown stays source of truth; never pushes unasked |
| No connector for a declared tool | Name the known MCP server in one line, once per session, from a curated reference; never walk through installation |
| Setup UX | `/fleecevest-toolchain` interview command, re-runnable; format also documented for hand-editing |
| Stage semantics | Yes — draft = advisory ladder, final = full enforcement; "promote" re-runs the ladder as the gate |
| Ticket policy | Inlined per-tracker section in the declaration; filled by interview OR distilled from an existing policy doc with source + date cited |
| Dependencies | `Depends on:` / `Blocks:` per ticket, Sequencing waves per doc, external blockers with owner+date, mapped to Jira issue links on push |
| Architecture | Approach A: pure markdown — new skill + command + reference + light edits to existing skills; no JS |

## Section 1 — The declaration file

`docs/product/toolchain.md` (project) or `~/.claude/fleecevest-toolchain.md`
(user fallback). Format:

```markdown
# Toolchain

| artifact | draft | review | final |
|---|---|---|---|
| prd | Google Docs | Confluence (comments) | Confluence /Product/PRDs |
| tickets | — | — | Jira (PROJ board) |
| strategy | Google Docs | — | Confluence |
| comms | — | — | Slack #product-updates |

Notes: <freeform — naming conventions, spaces, who approves promotes>
```

Rules:
- `—` means that stage doesn't exist for that artifact.
- Artifact types not listed, or no file at all → current behavior
  (`docs/product/`, no routing). The whole feature is opt-in and degrades
  cleanly to today's behavior.
- Project file wins over user file wholesale (no per-row merging — merging
  two toolchains is a bug factory).

### Ticket policy (optional per-tracker section, same file)

```markdown
## Ticket policy — Jira (PROJ)

- Issue types: Epic > Story > Sub-task; bugs filed as Bug, never Story
- Required fields: Fix Version, Component, Story Points (Fibonacci)
- Labels: `q3-bet`, team labels auto-applied
- Definition of ready: AC in Given/When/Then, pointed, no unresolved OPEN QUESTIONs
- Epic naming: outcome-phrased ("Users recover accounts alone")
Source: inferred from Confluence "Eng Ticket Standards" page, 2026-08-21
```

Policy is INLINED, never merely pointed at — the skills read this file, not
the policy doc it came from. The `Source:` line records provenance and date so
a re-run can refresh it.

## Section 2 — /fleecevest-toolchain

New skill (`skills/fleecevest-toolchain/SKILL.md`) + command toml. Behavior:

1. Interview, one question at a time, ladder style: which tracker? which doc
   tool for drafting? final home for docs? where do status updates go?
2. Ticket policy: "Does your tracker have required fields or structural
   conventions? Interview, or point me at a policy doc to infer from." A
   pointed-at doc (repo file, pasted content, or connector-fetched page) gets
   distilled into the inline policy section with `Source:` + date.
3. Asks placement last: this project (`docs/product/toolchain.md`) or
   everywhere (`~/.claude/fleecevest-toolchain.md`).
4. Writes the file, shows it. Re-runnable to edit: reads the existing file
   and asks only about what's changing.

## Section 3 — references/connectors.md

Curated map of common PM tools → well-known MCP connectors: Jira/Confluence →
Atlassian MCP; Google Docs/Drive → Google Drive MCP; Slack → Slack MCP;
Linear → Linear MCP; Notion → Notion MCP; Asana → Asana MCP. Carries a
`curated: <date>` stamp like the Lenny references. Used ONLY for the
name-it-once line; fleecevest never walks through connector setup.

## Section 4 — Stage semantics (persona rule)

New short section in `skills/fleecevest/SKILL.md` (and its two sync surfaces):

- **draft** — ladder advisory (lite-level rigor): thinking out loud is legal,
  OPEN QUESTIONs everywhere, no kill-criteria gate. The route footer marks it
  `draft`.
- **final** — full enforcement: the artifact cannot claim its final
  destination until rungs 1–5 pass.
- **promote** — "promote this" / "finalize this" re-runs the ladder as the
  gate. Failures come back as review-style findings, not a silent rewrite.
- No toolchain file → everything is final-stage (today's behavior).

## Section 5 — Routing behavior (artifact skills)

Each of the 8 artifact skills gains ~3 lines:

- Read the toolchain declaration (project → user fallback) if present.
- End every artifact with a route footer:
  `route: draft → Google Docs · final → Confluence /Product/PRDs` (only
  stages that exist; `stage: draft|final` marked).
- Destination has a live connector → after the artifact lands in
  `docs/product/`, offer: "Confluence connector detected — push?" Push only
  on yes.
- Destination has no connector → one line naming the known server from
  `references/connectors.md`, once per session.

## Section 6 — Tickets: policy fields + dependencies

`skills/fleecevest-tickets/SKILL.md` upgrades:

- **Policy-aware output**: when a ticket policy exists, each ticket carries
  the policy's fields explicitly (issue type, required fields as lines,
  labels), and `Ready:` honors the policy's definition of ready. No policy →
  current format unchanged.
- **Dependencies**: per ticket, `Depends on:` (needs first) and `Blocks:`
  (what it holds up), referencing ticket titles in the same doc.
  `Blocked by (external): <thing> — owner, date` for cross-team/vendor/
  decision blockers.
- **Sequencing section** ends every tickets doc: ordered delivery waves
  derived from the dependency graph (`Wave 1: A, B (parallel) → Wave 2: C
  (needs A)`), critical path marked. A dependency cycle is reported as a bug
  in the breakdown, not silently linearized.
- **On push** (live tracker connector, user said yes): `Depends on:`/`Blocks:`
  map to the tracker's issue links (Jira "blocks"/"is blocked by").

## Section 7 — Mechanics

- No JS. New skill dir + toml; one new reference; edits to
  `skills/fleecevest/SKILL.md`, `AGENTS.md`, and `hooks/fleecevest-instructions.js`
  (three-surface sync rule holds — stage semantics is persona text).
- `npm run build` regenerates the platform matrix (26 → 28 files: new
  OpenClaw skill + OpenCode command). Drift guard unchanged in design,
  extended by one invariant phrase for the stage rule.
- OpenClaw description map gains a `fleecevest-toolchain` entry.
- Version 0.4.0 across root, plugin.json, fleecevest-mcp.
- Tests: structure tests pick up the new skill/toml automatically; add the
  stage-rule invariant to `check-rule-copies.js`.

## Error handling & edge cases

- **Malformed toolchain file**: skills treat unparseable rows as absent and
  say so in one line — never guess a destination.
- **Conflicting project + user files**: project wins wholesale; the route
  footer notes `(project toolchain)` so the override is visible.
- **Connector present but push fails**: report the connector's error and the
  artifact's local path; never retry-loop into a team tool.
- **Policy doc fetch needs a connector that isn't live**: fall back to
  interview for that section; note the doc as `Source: pending`.
- **Promote on an artifact with no final destination declared**: run the
  ladder gate anyway; artifact stays local — promotion is about rigor first,
  routing second.

## Success criteria

- With no toolchain file, all 0.3.0 behavior is byte-identical (benchmark
  unaffected).
- `/fleecevest-toolchain` interview produces a valid declaration; re-run
  edits it.
- With a declaration: artifacts carry accurate route footers; a draft-stage
  PRD skips the kill-criteria gate; promote enforces it.
- With a ticket policy: tickets carry the policy fields; sequencing section
  present with correct wave ordering on a doc with dependencies.
- With a live connector (any MCP that can write to the declared tool): push
  happens only after an explicit yes; without one, the known-connector line
  appears exactly once per session.
- `npm run check` passes at 28 files; `npm test` green.
