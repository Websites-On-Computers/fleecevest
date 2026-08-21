# Fleecevest Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Platform matrix (Cursor, Windsurf, Copilot, Cline, Kiro, agents, OpenCode, OpenClaw) generated from canonical sources by a build script with a drift guard, plus the fleecevest MCP server.

**Architecture:** Ponytail's canonical-source pattern. One build script (`scripts/build-platform-copies.js`) renders every platform file from three canonical sources: rule copies from `AGENTS.md`'s body (per-platform frontmatter + identical body), OpenClaw skills from `skills/*/SKILL.md` bodies (short re-written descriptions), OpenCode commands from `commands/*.toml`. `scripts/check-rule-copies.js` re-renders everything in memory and byte-compares against committed files, then asserts load-bearing rule phrases survive in all three persona surfaces (SKILL.md, AGENTS.md, hooks embed). The MCP server (`fleecevest-mcp/`) is a self-contained ESM package that reuses the hooks' instruction builder so every host emits identical rules.

**Tech Stack:** Node ≥18, zero root dependencies; `fleecevest-mcp/` has its own package.json with `@modelcontextprotocol/sdk` + `zod` (mirrors ponytail-mcp).

## Global Constraints

- Root package stays zero-dependency; only `fleecevest-mcp/package.json` may declare dependencies (`@modelcontextprotocol/sdk`, `zod`).
- Generated files (`.cursor/`, `.windsurf/`, `.clinerules/`, `.agents/`, `.github/copilot-instructions.md`, `.kiro/`, `.openclaw/`, `.opencode/`) are NEVER hand-edited — only regenerated via `node scripts/build-platform-copies.js`.
- Canonical sources: `AGENTS.md` (rule copies), `skills/*/SKILL.md` (OpenClaw), `commands/*.toml` (OpenCode). Persona text still lives in exactly SKILL.md + AGENTS.md + `hooks/fleecevest-instructions.js`.
- No banned words in any authored content: "synergy", "circle back", "double-click", "elite" (buzzword-tax rule line exempt).
- Run tests as `node --test <explicit files>` (bare directory form is flaky in this environment).
- Commit at the end of every task with the message given; all commits end with: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- `ponytail-ref/` (gitignored) is the read-only reference; `lenny-ref/` stays untouched.

---

### Task 1: Build script (rule copies) + drift guard

**Files:**
- Create: `scripts/build-platform-copies.js`, `scripts/check-rule-copies.js`, `tests/platform.test.js`
- Generated (committed): `.cursor/rules/fleecevest.mdc`, `.windsurf/rules/fleecevest.md`, `.clinerules/fleecevest.md`, `.agents/rules/fleecevest.md`, `.github/copilot-instructions.md`, `.kiro/steering/fleecevest.md`

**Interfaces:**
- Consumes: `AGENTS.md` (Phase 1) — body after the `<!-- generated: ... -->` first line.
- Produces: `outputs()` export from `build-platform-copies.js` returning `{ [relPath]: content }` — Task 2 extends this same function with OpenClaw + OpenCode entries; `check-rule-copies.js` and `tests/platform.test.js` consume it unchanged.

- [ ] **Step 1: Write the failing test**

```js
// tests/platform.test.js
const { test } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

test('platform copies in sync with canonical sources', () => {
  const out = execFileSync(
    'node',
    [path.join(__dirname, '..', 'scripts', 'check-rule-copies.js')],
    { encoding: 'utf8' }
  );
  assert.match(out, /in sync/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/platform.test.js`
Expected: FAIL — check-rule-copies.js doesn't exist (spawn ENOENT / non-zero exit).

- [ ] **Step 3: Write the build script** (complete content — the OpenClaw/OpenCode sections arrive in Task 2, structure them in now as empty stubs is NOT allowed; write only what this task ships):

```js
#!/usr/bin/env node
// Generate platform copies from canonical sources.
//   rule copies <- AGENTS.md body (generated-comment first line stripped)
// Run: node scripts/build-platform-copies.js
// scripts/check-rule-copies.js fails if the committed copies are stale.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const read = (rel) =>
  fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');

// Canonical rule body: AGENTS.md minus its sync-comment first line.
function ruleBody() {
  return read('AGENTS.md').replace(/^<!--[\s\S]*?-->\n+/, '').trim() + '\n';
}

// Per-platform frontmatter; body is identical everywhere.
const RULE_COPIES = {
  '.cursor/rules/fleecevest.mdc':
    '---\ndescription: Fleecevest, fleece-vested PM mode. Ruthless clarity on product work.\nglobs:\nalwaysApply: true\n---\n\n',
  '.windsurf/rules/fleecevest.md': '',
  '.clinerules/fleecevest.md': '',
  '.agents/rules/fleecevest.md': '',
  '.github/copilot-instructions.md': '',
  '.kiro/steering/fleecevest.md':
    '---\ntitle: Fleecevest, fleece-vested PM mode\ninclusion: always\n---\n\n',
};

function outputs() {
  const out = {};
  const body = ruleBody();
  for (const [rel, frontmatter] of Object.entries(RULE_COPIES)) {
    out[rel] = frontmatter + body;
  }
  return out;
}

module.exports = { outputs, ruleBody, read, ROOT };

if (require.main === module) {
  for (const [rel, content] of Object.entries(outputs())) {
    const p = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
    console.log('wrote', rel);
  }
}
```

- [ ] **Step 4: Write the drift guard** (complete content):

```js
#!/usr/bin/env node
// Drift guard: re-render every platform copy from canonical sources and
// byte-compare against the committed files; then assert load-bearing rule
// phrases survive in all three persona surfaces. Non-zero exit on any drift.

const { outputs, read } = require('./build-platform-copies');

let failed = false;

const rendered = outputs();
for (const [rel, expected] of Object.entries(rendered)) {
  let actual;
  try {
    actual = read(rel);
  } catch {
    console.error(`${rel} missing — run: node scripts/build-platform-copies.js`);
    failed = true;
    continue;
  }
  if (actual !== expected) {
    console.error(`${rel} drifted — run: node scripts/build-platform-copies.js`);
    failed = true;
  }
}

// Load-bearing phrases that must survive verbatim in every persona surface.
// Changing a rule's wording trips this — that's the reminder to propagate it.
const INVARIANTS = [
  'Should this exist at all?',
  'kill criteria',
  'baseline unknown — measure first',
  'Buzzword tax',
  'OPEN QUESTION',
  'The clearest doc that ships is the right doc',
];
const SURFACES = [
  'skills/fleecevest/SKILL.md',
  'AGENTS.md',
  'hooks/fleecevest-instructions.js',
];
for (const rel of SURFACES) {
  const text = read(rel);
  for (const phrase of INVARIANTS) {
    if (!text.includes(phrase)) {
      console.error(`${rel} is missing rule invariant: "${phrase}"`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log(
  `Platform copies in sync (${Object.keys(rendered).length} files); ` +
  `${INVARIANTS.length} invariants present in all ${SURFACES.length} persona surfaces.`
);
```

- [ ] **Step 5: Generate and verify**

```bash
node scripts/build-platform-copies.js       # expect 6 "wrote" lines
node scripts/check-rule-copies.js           # expect "Platform copies in sync (6 files); 6 invariants..."
node --test tests/platform.test.js          # expect 1/1 pass
node --test tests/structure.test.js         # expect 6/6 pass (unchanged)
```

Spot-check one copy: `head -8 .cursor/rules/fleecevest.mdc` shows the cursor frontmatter then `# Fleecevest`.

- [ ] **Step 6: Commit**

```bash
git add scripts/ tests/platform.test.js .cursor/ .windsurf/ .clinerules/ .agents/ .github/ .kiro/
git commit -m "feat: platform rule copies generated from AGENTS.md with drift guard"
```

---

### Task 2: OpenClaw skills + OpenCode commands generation

**Files:**
- Modify: `scripts/build-platform-copies.js` (extend `outputs()`)
- Generated (committed): `.openclaw/skills/<name>/SKILL.md` (10 files), `.opencode/command/<name>.md` (10 files)

**Interfaces:**
- Consumes: `outputs()`/`read`/`ROOT` from Task 1; `skills/*/SKILL.md` and `commands/*.toml` from Phase 1.
- Produces: extended `outputs()` covering 26 files total; drift guard and test pick this up with zero changes.

- [ ] **Step 1: Verify current state passes**

Run: `node --test tests/platform.test.js` → 1/1 pass.

- [ ] **Step 2: Extend the build script.** In `scripts/build-platform-copies.js`, insert between the `RULE_COPIES` block and `function outputs()`:

```js
// --- OpenClaw skills ---------------------------------------------------
// Same SKILL.md format, but description must be one line under 160 chars
// (canonical descriptions are long, tuned for Claude's skill picker).
// Body is copied verbatim from skills/<name>/SKILL.md so rules never drift.
const HOMEPAGE = 'https://github.com/matthewlittlehale/fleecevest';

const OPENCLAW_DESCRIPTIONS = {
  'fleecevest':
    'Fleece-vested PM mode for product work: problem before solution, one-page PRDs, kill criteria on everything. Not for code style.',
  'fleecevest-prd':
    'Write a PRD by interrogating until the clarity ladder passes: named user, evidence, smallest bet, metric and kill criteria. One page.',
  'fleecevest-tickets':
    'Break a PRD or spec into outcome-named epics and paste-clean tickets with stories, acceptance criteria, dependencies, readiness.',
  'fleecevest-spec':
    'Write a project spec: context, hard constraints, demo-able milestones with owners, one decider, risks with tripwires, kill criteria.',
  'fleecevest-eng':
    'Generate the questions a PM should ask engineers about a proposal, plus the questions engineers will ask back.',
  'fleecevest-review':
    'Review a PRD, spec, or ticket for clarity failures: vagueness, missing baselines, assumptions, scope creep. One line per finding.',
  'fleecevest-discovery':
    'Discovery artifacts: assumption maps, non-leading interview guides, feedback synthesis with counts, research plans.',
  'fleecevest-strategy':
    'Strategy one-pager: falsifiable definition of winning, metric tree, max 3 bets with kill criteria, and a real not-doing list.',
  'fleecevest-comms':
    'Stakeholder updates, exec summaries, launch plans, announcements. Answer first, bad news above accomplishments.',
  'fleecevest-help':
    'Quick reference for fleecevest: the clarity ladder, commands, intensity levels, and the off switch. One-shot display.',
};

function skillBody(name) {
  const src = read(`skills/${name}/SKILL.md`);
  const fm = src.match(/^---\n[\s\S]*?\n---\n?/);
  if (!fm) throw new Error(`skills/${name}/SKILL.md has no frontmatter`);
  return src.slice(fm[0].length);
}

function renderOpenclaw(name) {
  const desc = OPENCLAW_DESCRIPTIONS[name];
  if (desc.length > 160 || desc.includes('\n') || desc.includes('"')) {
    throw new Error(`description for ${name} must be one line, no quotes, under 160 chars`);
  }
  return (
    `---\nname: ${name}\ndescription: "${desc}"\nhomepage: ${HOMEPAGE}\nlicense: MIT\n---\n` +
    skillBody(name)
  );
}

// --- OpenCode commands -------------------------------------------------
// commands/*.toml are two simple `key = "value"` lines; render to OpenCode's
// markdown command format ({{args}} becomes $ARGUMENTS).
function renderOpencode(name) {
  const src = read(`commands/${name}.toml`);
  const desc = src.match(/^description = "(.*)"$/m)?.[1];
  const prompt = src.match(/^prompt = "(.*)"$/m)?.[1];
  if (!desc || !prompt) {
    throw new Error(`commands/${name}.toml missing description or prompt`);
  }
  return `---\ndescription: ${desc}\n---\n\n${prompt.replaceAll('{{args}}', '$ARGUMENTS')}\n`;
}

function commandNames() {
  return fs
    .readdirSync(path.join(ROOT, 'commands'))
    .filter((f) => f.endsWith('.toml'))
    .map((f) => f.slice(0, -5))
    .sort();
}
```

Replace `function outputs()` with:

```js
function outputs() {
  const out = {};
  const body = ruleBody();
  for (const [rel, frontmatter] of Object.entries(RULE_COPIES)) {
    out[rel] = frontmatter + body;
  }
  for (const name of Object.keys(OPENCLAW_DESCRIPTIONS)) {
    out[`.openclaw/skills/${name}/SKILL.md`] = renderOpenclaw(name);
  }
  for (const name of commandNames()) {
    out[`.opencode/command/${name}.md`] = renderOpencode(name);
  }
  return out;
}
```

Update the file's header comment to list all three generation targets.

- [ ] **Step 3: Generate and verify**

```bash
node scripts/build-platform-copies.js       # expect 26 "wrote" lines (6 rules + 10 openclaw + 10 opencode)
node scripts/check-rule-copies.js           # expect "Platform copies in sync (26 files); ..."
node --test tests/platform.test.js tests/structure.test.js   # expect 7/7 pass
```

Spot-checks:
- `head -7 .openclaw/skills/fleecevest-prd/SKILL.md` → openclaw frontmatter (one-line quoted description) then the prd skill body.
- `cat .opencode/command/fleecevest-prd.md` → description frontmatter + prompt with `$ARGUMENTS` (no `{{args}}` remains: `grep -r '{{args}}' .opencode/` is empty).

- [ ] **Step 4: Drift-guard sanity check (negative test)**

```bash
echo x >> .opencode/command/fleecevest.md && node scripts/check-rule-copies.js; git checkout -- .opencode/
```
Expected: `drifted` error + exit 1, then restored.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-platform-copies.js .openclaw/ .opencode/
git commit -m "feat: generate OpenClaw skills and OpenCode commands from canonical sources"
```

---

### Task 3: MCP server

**Files:**
- Create: `fleecevest-mcp/package.json`, `fleecevest-mcp/index.js`, `fleecevest-mcp/instructions.js`, `fleecevest-mcp/README.md`, `tests/mcp.test.js`

**Interfaces:**
- Consumes: `getFleecevestInstructions` from `hooks/fleecevest-instructions.js`; `getDefaultMode`, `normalizeMode` from `hooks/fleecevest-config.js` (verify these exports exist before writing — they are sed-renamed Ponytail exports).
- Produces: ESM exports `MODES`, `resolveMode(requested)`, `buildInstructions(requested)` from `fleecevest-mcp/instructions.js`; stdio MCP server `fleecevest` with prompt `fleecevest` and tool `fleecevest_instructions`.

- [ ] **Step 1: Write the failing test** (needs NO npm install — instructions.js deliberately has no SDK imports):

```js
// tests/mcp.test.js
const { test } = require('node:test');
const assert = require('node:assert');

test('mcp instructions module resolves modes and builds rules', async () => {
  const m = await import('../fleecevest-mcp/instructions.js');
  assert.deepEqual(m.MODES, ['lite', 'full', 'ultra']);
  assert.equal(m.resolveMode('ultra'), 'ultra');
  assert.ok(m.MODES.includes(m.resolveMode('off')));       // off falls back
  assert.ok(m.MODES.includes(m.resolveMode(undefined)));   // empty falls back
  assert.match(m.buildInstructions('full'), /FLEECEVEST MODE ACTIVE — level: full/);
  assert.match(m.buildInstructions('lite'), /clarity ladder/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/mcp.test.js`
Expected: FAIL — cannot find module `../fleecevest-mcp/instructions.js`.

- [ ] **Step 3: Write `fleecevest-mcp/instructions.js`** (complete content):

```js
// Pure instruction selection for the fleecevest MCP server. No MCP/SDK
// imports, so this stays unit-testable on its own. Reuses the same builder
// the Claude hooks use, so every host emits identical rules.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { getFleecevestInstructions } = require("../hooks/fleecevest-instructions.js");
const { getDefaultMode, normalizeMode } = require("../hooks/fleecevest-config.js");

// The three intensities the server offers. "off" has no instructions to serve.
export const MODES = ["lite", "full", "ultra"];

// Resolve a requested mode to a runtime intensity. Unknown, empty, or "off"
// falls back to the configured default, then to "full".
export function resolveMode(requested) {
  const asked = normalizeMode(requested);
  if (asked && asked !== "off" && MODES.includes(asked)) return asked;

  const fallback = normalizeMode(getDefaultMode());
  return fallback && MODES.includes(fallback) ? fallback : "full";
}

export function buildInstructions(requested) {
  return getFleecevestInstructions(resolveMode(requested));
}
```

- [ ] **Step 4: Write `fleecevest-mcp/index.js`** (complete content):

```js
#!/usr/bin/env node
// Fleecevest MCP server: serves the fleece-vested PM ruleset over stdio as a
// prompt (user-invoked) and a tool (for hosts that pull context via tools).
// It does NOT replace the always-on adapters; it's the clean option for hosts
// whose only injection point is the prompt menu.
import fs from "node:fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { MODES, buildInstructions, resolveMode } from "./instructions.js";

const { version } = JSON.parse(
  await fs.promises.readFile(new URL("./package.json", import.meta.url), "utf8")
);
const server = new McpServer({ name: "fleecevest", version });

const modeArg = z
  .enum(MODES)
  .optional()
  .describe("Fleecevest intensity: lite, full, or ultra. Omit for the configured default.");

server.registerPrompt(
  "fleecevest",
  {
    title: "Fleecevest mode",
    description: "Fleece-vested PM instructions: problem before solution, one-page PRDs, kill criteria on everything.",
    argsSchema: { mode: modeArg },
  },
  ({ mode }) => ({
    messages: [{ role: "user", content: { type: "text", text: buildInstructions(mode) } }],
  }),
);

server.registerTool(
  "fleecevest_instructions",
  {
    title: "Fleecevest instructions",
    description: "Return the fleecevest ruleset for the given intensity (lite, full, or ultra).",
    inputSchema: { mode: modeArg },
    outputSchema: { mode: z.string(), instructions: z.string() },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  ({ mode }) => {
    const resolvedMode = resolveMode(mode);
    const instructions = buildInstructions(resolvedMode);
    const structuredContent = { mode: resolvedMode, instructions };
    return { content: [{ type: "text", text: instructions }], structuredContent };
  },
);

await server.connect(new StdioServerTransport());
```

- [ ] **Step 5: Write `fleecevest-mcp/package.json`** (complete content):

```json
{
  "name": "fleecevest-mcp",
  "version": "0.2.0",
  "description": "Fleecevest MCP server: serves the fleece-vested PM ruleset as a prompt and a tool.",
  "type": "module",
  "main": "index.js",
  "bin": { "fleecevest-mcp": "index.js" },
  "license": "MIT",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.23.0"
  }
}
```

- [ ] **Step 6: Write `fleecevest-mcp/README.md`** — short (~20 lines, persona voice): what it serves (prompt `fleecevest`, tool `fleecevest_instructions`), when to use it (hosts without rules-file or hook injection), and a config snippet:

```json
{
  "mcpServers": {
    "fleecevest": {
      "command": "node",
      "args": ["/path/to/fleecevest/fleecevest-mcp/index.js"]
    }
  }
}
```

- [ ] **Step 7: Verify**

```bash
node --test tests/mcp.test.js               # expect 1/1 pass (no install needed)
cd fleecevest-mcp && npm install --no-fund --no-audit && cd ..
# stdio smoke: initialize handshake (MCP stdio is newline-delimited JSON)
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"smoke","version":"0"}}}' | node fleecevest-mcp/index.js | head -1
```
Expected: one JSON line containing `"name":"fleecevest"`. If the handshake framing differs on the installed SDK version, fall back to verifying the server starts without throwing (`node -e 'import("./fleecevest-mcp/index.js")' & sleep 2; kill %1`) and report DONE_WITH_CONCERNS naming what wasn't verified.

Also confirm `git status` shows no `fleecevest-mcp/node_modules` (covered by the root `.gitignore`'s `node_modules/`); commit `fleecevest-mcp/package-lock.json` if generated.

- [ ] **Step 8: Commit**

```bash
git add fleecevest-mcp/ tests/mcp.test.js
git commit -m "feat: fleecevest MCP server — ruleset as prompt and tool"
```

---

### Task 4: Wiring — package scripts, README, versions

**Files:**
- Modify: `package.json`, `.claude-plugin/plugin.json`, `README.md`

**Interfaces:**
- Consumes: everything from Tasks 1–3.
- Produces: `npm test` runs all three test files; `npm run build` regenerates the matrix; version 0.2.0 everywhere.

- [ ] **Step 1: Update `package.json`** — replace the `scripts` block and bump version:

```json
"version": "0.2.0",
"scripts": {
  "test": "node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js",
  "build": "node scripts/build-platform-copies.js",
  "check": "node scripts/check-rule-copies.js"
}
```

- [ ] **Step 2: Bump `.claude-plugin/plugin.json`** `"version"` to `"0.2.0"`.

- [ ] **Step 3: Update `README.md`** — add one section after the Install section, persona voice, ~15 lines:

`## Other editors and agents` — a table: Cursor / Windsurf / Copilot / Cline / Kiro / agents.md-compatible → "rules file ships in this repo, picked up automatically when the repo is your workspace"; OpenCode → `.opencode/command/`; OpenClaw → `.openclaw/skills/`; anything MCP-speaking → `fleecevest-mcp/` (link its README). One closing line: copies are generated — edit the canonical files and run `npm run build`, never the copies.

- [ ] **Step 4: Full verification**

```bash
npm test                        # expect 8/8 pass across 3 files
npm run check                   # expect "Platform copies in sync (26 files); ..."
claude plugin validate .        # expect "Validation passed"
```

- [ ] **Step 5: Commit**

```bash
git add package.json .claude-plugin/plugin.json README.md
git commit -m "feat: wire platform build into npm scripts, document matrix — Phase 2 complete"
```

---

## Self-review notes

- **Spec coverage:** Section 4 Phase 2 = platform matrix via `build-platform-copies.js` (Tasks 1–2), `check-rule-copies.js` drift guard (Task 1), MCP server on the instructions.js pattern (Task 3). Ponytail's `.qoder`, Gemini extension, and Pi extension are NOT in the spec's tree — deliberately out (add on demand).
- **Type consistency:** `outputs()`/`read`/`ROOT` exported in Task 1, extended in Task 2, consumed by check + test unchanged. `resolveMode`/`buildInstructions`/`MODES` defined once in Task 3 and matched by its test. Invariant phrases verified present in all three persona surfaces as shipped in Phase 1 (checked against actual file contents).
- **Test math:** structure 6 + platform 1 + mcp 1 = 8 total at Task 4.
