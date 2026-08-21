# Fleecevest Toolchain Awareness (v0.4.0) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fleecevest reads a team toolchain declaration and routes artifacts through it — stage-aware rigor (draft/final/promote), tracker-ready tickets with policy fields and dependency sequencing, offer-then-push with live connectors — without owning a single connector.

**Architecture:** Pure markdown on the existing machinery. One new skill (`/fleecevest-toolchain`, the interview that writes the declaration), one new reference (`connectors.md`, the name-it-once map), a Stages section added to the persona's three sync surfaces, ~3 routing lines per artifact skill, and a policy/dependency upgrade to `fleecevest-tickets`. `npm run build` carries everything to the platform matrix (26 → 28 files).

**Tech Stack:** Markdown skills; no new JS beyond a one-regex test tweak and one build-script map entry.

## Global Constraints

- No new JS logic. Only touched code files: `tests/structure.test.js` (one regex), `scripts/build-platform-copies.js` (one map entry), `scripts/check-rule-copies.js` (one invariant string).
- Persona text lives in exactly three surfaces — `skills/fleecevest/SKILL.md`, `AGENTS.md`, `hooks/fleecevest-instructions.js` — updated together or not at all; AGENTS.md body stays byte-identical to SKILL.md body minus frontmatter.
- Generated platform files are never hand-edited; after any canonical change, run `node scripts/build-platform-copies.js` and commit the regenerated copies. End state: 28 files in sync.
- Zero-toolchain behavior must remain byte-identical to 0.3.0 (spec success criterion): every new behavior is gated on a declaration existing.
- Declaration paths, verbatim everywhere: project `docs/product/toolchain.md`, user fallback `~/.claude/fleecevest-toolchain.md`; project wins wholesale.
- No banned words in authored content: "synergy", "circle back", "double-click", "elite".
- Run tests with explicit file paths (`node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js tests/benchmark.test.js` = 11 tests), never the bare directory.
- Commit at the end of every task; all commits end with: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

---

### Task 1: /fleecevest-toolchain skill + connectors reference + matrix entry

**Files:**
- Create: `skills/fleecevest-toolchain/SKILL.md`, `commands/fleecevest-toolchain.toml`, `references/connectors.md`
- Modify: `tests/structure.test.js` (reference-stamp regex), `scripts/build-platform-copies.js` (OPENCLAW_DESCRIPTIONS entry)
- Generated: `.openclaw/skills/fleecevest-toolchain/SKILL.md`, `.opencode/command/fleecevest-toolchain.md`

**Interfaces:**
- Consumes: build-script `OPENCLAW_DESCRIPTIONS` map and `outputs()` (Phase 2).
- Produces: the declaration file FORMAT (table + optional `## Ticket policy — <Tracker>` section) that Tasks 2–4 reference; `references/connectors.md` that Tasks 2–3 name.

- [ ] **Step 1: Write `references/connectors.md`** (complete content):

```markdown
# Known connectors

> curated: 2026-08-21

Tool → well-known MCP connector. Used for the one-line nudge when a declared
tool has no live connector in the session. Name it once, then drop it —
fleecevest does not install, configure, or troubleshoot connectors.

| tool | connector |
|---|---|
| Jira, Confluence | Atlassian MCP server |
| Google Docs, Google Drive | Google Drive MCP server |
| Slack | Slack MCP server |
| Linear | Linear MCP server |
| Notion | Notion MCP server |
| Asana | Asana MCP server |
| GitHub Issues | GitHub MCP server (the `gh` CLI covers it too) |
```

- [ ] **Step 2: Run tests to see the stamp check fail**

Run: `node --test tests/structure.test.js`
Expected: FAIL — `references are distilled-stamped and within budget` rejects `connectors.md` (its stamp is `curated:`, not `distilled: …, corpus @ …`).

- [ ] **Step 3: Widen the stamp regex.** In `tests/structure.test.js`, replace the assertion line inside the references test:

```js
    assert.match(src.split('\n')[2] ?? src, /(distilled: \d{4}-\d{2}-\d{2}, corpus @ [0-9a-f]{7})|(curated: \d{4}-\d{2}-\d{2})/, `${f}: no distilled/curated stamp`);
```

Run: `node --test tests/structure.test.js` → 6/6 pass.

- [ ] **Step 4: Write `skills/fleecevest-toolchain/SKILL.md`** (complete content):

```markdown
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
```

- [ ] **Step 5: Write `commands/fleecevest-toolchain.toml`**:

```toml
description = "Declare the team's PM toolchain and tracker ticket policy"
prompt = "Use the fleecevest-toolchain skill on: {{args}}. Read any existing declaration first and ask only about what's changing. Interview one question at a time: tracker, doc draft/final homes, comms channel, then ticket policy (interview, or distill a pointed-at policy doc inline with Source and date). Ask project vs user placement last, write the file, show it."
```

- [ ] **Step 6: Add the OpenClaw description.** In `scripts/build-platform-copies.js`, add to `OPENCLAW_DESCRIPTIONS` (after the `'fleecevest-comms'` entry, before `'fleecevest-help'`):

```js
  'fleecevest-toolchain':
    'Declare the team PM toolchain: tracker, doc tools, comms, per-stage routing, and tracker ticket policy. Re-runnable to edit.',
```

- [ ] **Step 7: Regenerate and verify**

```bash
node scripts/build-platform-copies.js       # expect 28 "wrote" lines
node scripts/check-rule-copies.js           # "Platform copies in sync (28 files); 6 invariants..."
node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js tests/benchmark.test.js  # 11/11
```

- [ ] **Step 8: Commit**

```bash
git add skills/fleecevest-toolchain/ commands/fleecevest-toolchain.toml references/connectors.md tests/structure.test.js scripts/build-platform-copies.js .openclaw/ .opencode/
git commit -m "feat: /fleecevest-toolchain — declaration interview + known-connectors reference"
```

---

### Task 2: Stage semantics in the persona (3-surface sync)

**Files:**
- Modify: `skills/fleecevest/SKILL.md`, `AGENTS.md`, `hooks/fleecevest-instructions.js`, `scripts/check-rule-copies.js` (one invariant)
- Generated: the 6 rule copies (body changes)

**Interfaces:**
- Consumes: declaration paths from Task 1's format.
- Produces: the stage vocabulary (`draft`, `final`, `promote`, `route:` footer, "never push unasked") that Tasks 3–4 reference verbatim.

- [ ] **Step 1: Add the Stages section to `skills/fleecevest/SKILL.md`** — insert between the `## Intensity` table and `## When NOT to be ruthless`:

```markdown
## Stages

When a toolchain declaration exists (`docs/product/toolchain.md`, else
`~/.claude/fleecevest-toolchain.md`), artifacts move through stages:

- **draft** — ladder advisory: thinking out loud is legal, OPEN QUESTIONs
  everywhere, no kill-criteria gate yet.
- **final** — ladder enforced in full. No artifact claims its final
  destination until rungs 1–5 pass.
- **promote** — "promote this" / "finalize this" re-runs the ladder as the
  gate. Failures come back as findings, not a silent rewrite.

Route every artifact: end with `route: <stage> → <destination>` from the
declaration. Live connector for the destination → offer to push, never push
unasked. No connector → name the known one from `references/connectors.md`
once per session, then drop it. No declaration → no routing, full rigor,
today's behavior.
```

- [ ] **Step 2: Mirror in `AGENTS.md`** — identical insertion at the identical position (body must stay byte-identical to SKILL.md body minus frontmatter).

- [ ] **Step 3: Add the condensed version to `hooks/fleecevest-instructions.js`** — insert into the `CORE` template string, between the `## Output` block and `## When NOT to be ruthless`:

```
## Stages

When a toolchain declaration exists (docs/product/toolchain.md, else
~/.claude/fleecevest-toolchain.md): draft = ladder advisory (open questions
legal, no kill-criteria gate). final = ladder enforced; no artifact claims
its final destination until rungs 1-5 pass. "promote"/"finalize" re-runs the
ladder as the gate. End artifacts with route: <stage> → <destination>. Live
connector → offer to push, never push unasked. No declaration → full rigor,
today's behavior.
```

(The embed drops the `references/connectors.md` mention deliberately — it
injects into arbitrary repos where that path doesn't exist; same precedent as
the Phase 1 condensation.)

- [ ] **Step 4: Add the invariant.** In `scripts/check-rule-copies.js`, append to `INVARIANTS`:

```js
  'never push unasked',
```

- [ ] **Step 5: Regenerate and verify**

```bash
node scripts/build-platform-copies.js       # 28 wrote (6 rule copies now carry Stages)
node scripts/check-rule-copies.js           # "in sync (28 files); 7 invariants present in all 3 persona surfaces."
node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js tests/benchmark.test.js  # 11/11
```

Also verify the AGENTS.md sync by construction: `diff <(sed '1,/^---$/d;1,/^---$/d' skills/fleecevest/SKILL.md 2>/dev/null || tail -n +12 skills/fleecevest/SKILL.md) <(tail -n +3 AGENTS.md)` — simplest reliable form: strip SKILL.md's frontmatter (first two `---` lines and between), strip AGENTS.md's comment line + blank, expect empty diff. (The drift guard's byte-compare of the 6 rule copies against AGENTS.md is the authoritative check — if it passes and SKILL.md was edited identically, all three agree.)

- [ ] **Step 6: Commit**

```bash
git add skills/fleecevest/SKILL.md AGENTS.md hooks/fleecevest-instructions.js scripts/check-rule-copies.js .cursor/ .windsurf/ .clinerules/ .agents/ .github/ .kiro/ .openclaw/
git commit -m "feat: stage semantics — draft/final/promote in all three persona surfaces"
```

---

### Task 3: Routing lines in the artifact skills (except tickets)

**Files:**
- Modify: `skills/fleecevest-prd/SKILL.md`, `skills/fleecevest-spec/SKILL.md`, `skills/fleecevest-strategy/SKILL.md`, `skills/fleecevest-discovery/SKILL.md`, `skills/fleecevest-comms/SKILL.md`, `skills/fleecevest-review/SKILL.md`, `skills/fleecevest-eng/SKILL.md`
- Generated: the 7 corresponding `.openclaw/skills/*/SKILL.md`

**Interfaces:**
- Consumes: stage vocabulary from Task 2 (`route:` footer, draft/final, name-once).
- Produces: nothing later tasks need.

- [ ] **Step 1: Add the routing block to the five doc-producing skills** (`fleecevest-prd`, `fleecevest-spec`, `fleecevest-strategy`, `fleecevest-discovery`, `fleecevest-comms`). In each, insert directly after the `Load:` line, substituting the artifact word (prd / spec / strategy / discovery / comms):

```markdown
Toolchain: if a declaration exists (`docs/product/toolchain.md`, else
`~/.claude/fleecevest-toolchain.md`), apply its <artifact> row — stage rigor
(draft advisory, final enforced), end with the `route: <stage> → <destination>`
footer, offer push when the destination's connector is live (never push
unasked), else name the known connector from `references/connectors.md` once
per session. No declaration → skip all of this.
```

- [ ] **Step 2: Add the stage-aware line to `fleecevest-review`** — after its `Load:` line:

```markdown
Toolchain: a doc marked `stage: draft` gets advisory review — rungs still
checked, but findings that only bite at promote time (missing kill criteria,
unbaselined targets) are tagged `at-promote:` instead of counting against it.
Final-stage and undeclared docs get the full treatment.
```

- [ ] **Step 3: Add the stage-aware line to `fleecevest-eng`** — after its `Load:` line:

```markdown
Toolchain: when the proposal is staged `draft`, aim the questions at what
must be true before promote — evidence to gather, spikes to run — not at
polish the draft doesn't owe yet.
```

- [ ] **Step 4: Regenerate and verify**

```bash
node scripts/build-platform-copies.js && node scripts/check-rule-copies.js   # in sync (28 files)
node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js tests/benchmark.test.js  # 11/11
```

- [ ] **Step 5: Commit**

```bash
git add skills/ .openclaw/
git commit -m "feat: toolchain routing and stage-awareness in artifact skills"
```

---

### Task 4: Tickets — policy fields, dependencies, sequencing

**Files:**
- Modify: `skills/fleecevest-tickets/SKILL.md`
- Generated: `.openclaw/skills/fleecevest-tickets/SKILL.md`

**Interfaces:**
- Consumes: `## Ticket policy — <Tracker>` declaration format (Task 1); stage vocabulary (Task 2).
- Produces: the final ticket format the spec's Jira-push mapping relies on.

- [ ] **Step 1: Add the routing block** (same as Task 3 Step 1's block with artifact word `tickets`), directly after the `Load:` line.

- [ ] **Step 2: Extend the ticket format.** In the output template block, add one line after the `Depends on:` line:

```
    Blocks: <ticket title | none>
```

- [ ] **Step 3: Append two sections** after the existing `Rules:` list, before the closing output-pattern line:

```markdown
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
```

- [ ] **Step 4: Regenerate and verify**

```bash
node scripts/build-platform-copies.js && node scripts/check-rule-copies.js   # in sync (28 files)
node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js tests/benchmark.test.js  # 11/11
```

- [ ] **Step 5: Commit**

```bash
git add skills/fleecevest-tickets/ .openclaw/
git commit -m "feat: tickets — policy fields, Blocks/external blockers, sequencing waves"
```

---

### Task 5: Wiring — versions, README, live smoke

**Files:**
- Modify: `package.json`, `.claude-plugin/plugin.json`, `fleecevest-mcp/package.json` (+ lock via `npm install --package-lock-only`), `README.md`

**Interfaces:**
- Consumes: everything.

- [ ] **Step 1: Bump versions** to `0.4.0` in all three manifests; regenerate the mcp lock with `cd fleecevest-mcp && npm install --package-lock-only && cd ..`.

- [ ] **Step 2: Update `README.md`**:
  - Commands table: add the row `| /fleecevest-toolchain | Declare your team's tools, routing, and ticket policy |` (11 rows total).
  - New section after "What it does", ~12 lines, persona voice: `## Your tools, your routing` — the declaration file (both paths, project wins), stages in one line each (draft = thinking allowed, final = ladder-gated, promote = the gate), the boundary sentence ("fleecevest doesn't ship connectors — it uses the ones you have and can name the well-known one when you don't"), and offer-then-push ("markdown stays the source of truth; it never pushes unasked").

- [ ] **Step 3: Full verification**

```bash
node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js tests/benchmark.test.js  # 11/11
npm run check                   # in sync (28 files); 7 invariants
claude plugin validate .        # Validation passed
```

- [ ] **Step 4: Live smoke — stage behavior end-to-end.** In a temp dir, create `docs/product/toolchain.md` containing the Task 1 format with a prd row (`draft: Google Docs`, `final: Confluence /Product/PRDs`), then:

```bash
cd $(mktemp -d) && mkdir -p docs/product   # write the toolchain.md here
claude -p --model haiku --safe-mode --append-system-prompt "$(node -e 'process.stdout.write(require("/Users/matthewlittlehale/Sites/fleecevest/hooks/fleecevest-instructions.js").getFleecevestInstructions("full"))')" "Draft a PRD (draft stage) for CSV export. Our toolchain declaration: prd drafts in Google Docs, final lands in Confluence /Product/PRDs." | tail -5
```

Expected: output ends with a `route:` footer mentioning draft → Google Docs; kill-criteria gate not enforced (it's a draft). If the one-shot output is close but the footer wording drifts, that's haiku noise — report what appeared; only a missing route concept entirely is a failure. Report DONE_WITH_CONCERNS naming anything unverified.

- [ ] **Step 5: Commit**

```bash
git add package.json .claude-plugin/plugin.json fleecevest-mcp/ README.md
git commit -m "feat: version 0.4.0 — toolchain awareness documented"
```

---

## Self-review notes

- **Spec coverage:** S1 declaration format → Task 1 (format lives in the toolchain skill's Output format section); S2 interview → Task 1; S3 connectors reference → Task 1; S4 stages → Task 2; S5 routing → Task 3; S6 tickets policy/deps/sequencing → Task 4; S7 mechanics (28 files, invariant, versions) → Tasks 1–5; error-handling bullets are encoded in the skill texts (malformed rows → "skip all of this" gate + toolchain skill rules; push failure handling is offer-then-push prose; promote-without-destination is in the Stages text "promotion is about rigor first" — covered by "final = ladder enforced" + "No declaration → full rigor"). Success criteria all verifiable via Task 5's checks + the zero-toolchain gate ("No declaration → skip all of this" in every touched skill).
- **Type consistency:** stage vocabulary (`draft`/`final`/`promote`, `route: <stage> → <destination>`, "never push unasked") defined in Task 2 and used verbatim in Tasks 3–4; declaration paths identical in all insertions; invariant string in Task 2 Step 4 appears verbatim in all three surface insertions.
- **Placeholder scan:** clean — every insertion carries its full text; `<artifact>` in Task 3 Step 1 is an explicit substitution instruction with the five words enumerated.
