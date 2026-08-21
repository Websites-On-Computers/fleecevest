# Fleecevest Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A behavior benchmark proving the persona measurably changes output (with/without arms, deterministic checks, regression gate) plus curated before/after examples.

**Architecture:** `benchmarks/behavior.js` runs each of 3 fixed product prompts through `claude -p --model haiku` twice — baseline vs. `--append-system-prompt` carrying `getFleecevestInstructions('full')` — and scores both outputs with 5 pure deterministic check functions (no LLM judge). Results print as a markdown table and are saved to `benchmarks/results/<date>.md`; the script exits 1 if the fleecevest arm doesn't beat baseline. The check functions are exported and unit-tested without any model calls. `examples/` holds 3 authored before/after files in Ponytail's examples style.

**Tech Stack:** Node ≥18 builtins only (`node:child_process`, `node:fs`); the `claude` CLI for benchmark arms (6 calls per run, haiku).

## Global Constraints

- Zero root dependencies; benchmark uses only node builtins + the `claude` CLI.
- `npm test` stays model-call-free: the benchmark runs only via `npm run bench`, never from the test suite.
- Persona surfaces unchanged — this phase adds measurement and documentation, no rule edits.
- No banned words in authored content: "synergy", "circle back", "double-click", "elite" — EXCEPT the "Before" halves of `examples/*.md`, which deliberately showcase the bloated style (the structure test globs only `skills/` and `references/`, so no conflict).
- Run tests with explicit file paths (`node --test tests/…`), never the bare directory.
- Benchmark scoring is never tuned to flatter the persona: if the fleecevest arm loses, that's reported as a concern, not regex-adjusted away.
- Commit at the end of every task; all commits end with: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

---

### Task 1: Benchmark harness + unit tests

**Files:**
- Create: `benchmarks/behavior.js`, `benchmarks/README.md`, `tests/benchmark.test.js`
- Modify: `package.json` (add `bench` script)

**Interfaces:**
- Consumes: `getFleecevestInstructions(mode)` from `hooks/fleecevest-instructions.js` (Phase 1).
- Produces: exports `CHECKS` (map of name → `(output: string) => boolean`), `PROMPTS` (array of `{id, text}`), `score(output) => {checkName: boolean}` from `benchmarks/behavior.js`; `npm run bench` entry point. Task 2 runs it; Task 4 documents it.

- [ ] **Step 1: Write the failing test**

```js
// tests/benchmark.test.js
const { test } = require('node:test');
const assert = require('node:assert');
const { CHECKS, PROMPTS, score } = require('../benchmarks/behavior.js');

const FLEECE_SAMPLE = [
  '# PRD: Dark mode',
  '**Problem** — Night-shift users abandon the app; they use OS invert today.',
  '**Evidence** — ASSUMPTION: no direct quotes yet; cheapest test: search support tickets.',
  '**Success** — baseline unknown — measure first. Kill criteria: adoption < 5% at day 30.',
].join('\n');

const BLOATED_SAMPLE = [
  '# Dark Mode Initiative Overview',
  'This document outlines our comprehensive vision for the dark mode initiative.',
  ...Array.from({ length: 130 }, (_, i) => `Requirement ${i}: the system shall be configurable.`),
].join('\n');

test('checks pass on a fleecevest-shaped doc', () => {
  const s = score(FLEECE_SAMPLE);
  assert.equal(s['problem-first'], true);
  assert.equal(s['kill-criteria'], true);
  assert.equal(s['assumption-marked'], true);
  assert.equal(s['baseline-aware'], true);
  assert.equal(s['one-pager'], true);
});

test('checks fail on a bloated doc', () => {
  const s = score(BLOATED_SAMPLE);
  assert.equal(s['kill-criteria'], false);
  assert.equal(s['assumption-marked'], false);
  assert.equal(s['baseline-aware'], false);
  assert.equal(s['one-pager'], false);
});

test('benchmark surface is stable', () => {
  assert.equal(PROMPTS.length, 3);
  assert.equal(Object.keys(CHECKS).length, 5);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/benchmark.test.js`
Expected: FAIL — cannot find module `../benchmarks/behavior.js`.

- [ ] **Step 3: Write `benchmarks/behavior.js`** (complete content):

```js
#!/usr/bin/env node
// Fleecevest behavior benchmark: the same product prompts with and without the
// persona, scored by deterministic checks (no LLM judge). A report and a
// regression gate: exits 1 if the fleecevest arm doesn't beat baseline.
//
// Run: npm run bench   (needs the `claude` CLI, authenticated; 6 haiku calls)
// Checks are never tuned to flatter the persona — a losing arm is a finding.

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { getFleecevestInstructions } = require('../hooks/fleecevest-instructions.js');

const ROOT = path.join(__dirname, '..');

const PROMPTS = [
  { id: 'prd', text: 'Write a PRD for adding dark mode to our web app.' },
  { id: 'spec', text: 'Write a product spec for a new customer referral program.' },
  { id: 'strategy', text: 'We have 12 feature requests and can build 3 this quarter. Write the prioritization doc.' },
];

// Deterministic checks over the raw output string.
const CHECKS = {
  // The problem shows up in the opening, not page 3.
  'problem-first': (out) => /problem/i.test(out.split('\n').slice(0, 12).join('\n')),
  // Something says when we stop.
  'kill-criteria': (out) => /kill criteri|stop (if|when)/i.test(out),
  // Unknowns are marked, not asserted.
  'assumption-marked': (out) => /assumption/i.test(out),
  // Metrics acknowledge a baseline (or its absence).
  'baseline-aware': (out) => /baseline/i.test(out),
  // One-pager budget.
  'one-pager': (out) => out.split('\n').length <= 120,
};

function runArm(prompt, instructions) {
  const args = ['-p', '--model', 'haiku'];
  if (instructions) args.push('--append-system-prompt', instructions);
  args.push(prompt);
  return execFileSync('claude', args, {
    encoding: 'utf8',
    timeout: 300000,
    maxBuffer: 10 * 1024 * 1024,
  });
}

function score(out) {
  const results = {};
  for (const [name, fn] of Object.entries(CHECKS)) results[name] = fn(out);
  return results;
}

module.exports = { CHECKS, PROMPTS, score };

if (require.main === module) {
  const instructions = getFleecevestInstructions('full');
  const rows = [];
  let fleecePass = 0;
  let basePass = 0;

  for (const { id, text } of PROMPTS) {
    console.error(`running ${id} (baseline)...`);
    const base = score(runArm(text, null));
    console.error(`running ${id} (fleecevest)...`);
    const fleece = score(runArm(text, instructions));
    for (const name of Object.keys(CHECKS)) {
      rows.push({ prompt: id, check: name, baseline: base[name], fleecevest: fleece[name] });
      if (base[name]) basePass++;
      if (fleece[name]) fleecePass++;
    }
  }

  const total = rows.length;
  const date = new Date().toISOString().slice(0, 10);
  const report = [
    `# Behavior benchmark — ${date}`,
    '',
    `Model: haiku. 2 arms x ${PROMPTS.length} prompts, ${Object.keys(CHECKS).length} checks each.`,
    '',
    '| prompt | check | baseline | fleecevest |',
    '|---|---|---|---|',
    ...rows.map(
      (r) => `| ${r.prompt} | ${r.check} | ${r.baseline ? 'pass' : 'fail'} | ${r.fleecevest ? 'pass' : 'fail'} |`
    ),
    '',
    `**baseline ${basePass}/${total} — fleecevest ${fleecePass}/${total}**`,
    '',
  ].join('\n');

  console.log(report);
  const outDir = path.join(ROOT, 'benchmarks', 'results');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${date}.md`);
  fs.writeFileSync(outPath, report);
  console.error(`wrote ${path.relative(ROOT, outPath)}`);

  if (fleecePass <= basePass) {
    console.error('REGRESSION: fleecevest arm did not beat baseline.');
    process.exit(1);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/benchmark.test.js`
Expected: 3/3 pass (requiring the module makes no model calls — the runner is behind `require.main`).

- [ ] **Step 5: Add the npm script.** In `package.json` scripts, add:

```json
"bench": "node benchmarks/behavior.js"
```

- [ ] **Step 6: Write `benchmarks/README.md`** (~15 lines, persona voice): what it measures (does the persona actually change output — problem-first, kill criteria, marked assumptions, baseline awareness, one-pager budget), how to run (`npm run bench`, needs authenticated `claude` CLI, 6 haiku calls), where results land (`benchmarks/results/<date>.md`), gate semantics (exit 1 when fleecevest ≤ baseline), and the no-tuning rule (a losing arm is a finding, not a regex bug).

- [ ] **Step 7: Full test pass**

Run: `node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js tests/benchmark.test.js`
Expected: 9/9 pass.

- [ ] **Step 8: Commit**

```bash
git add benchmarks/ tests/benchmark.test.js package.json
git commit -m "feat: behavior benchmark harness with deterministic checks"
```

---

### Task 2: Run the benchmark, commit the result

**Files:**
- Create: `benchmarks/results/<today's date>.md` (generated by the run)

**Interfaces:**
- Consumes: `npm run bench` from Task 1.
- Produces: the first recorded benchmark result; Task 4's README section cites its headline numbers.

- [ ] **Step 1: Run the benchmark**

```bash
npm run bench
```

Expected: progress lines on stderr, the markdown table on stdout, `wrote benchmarks/results/<date>.md`, exit 0 with the fleecevest arm beating baseline. Takes a few minutes (6 haiku calls).

- [ ] **Step 2: Read the result table.** Sanity-check it tells a coherent story (fleecevest arm passing most checks; baseline failing several). If the gate FAILED (exit 1) or the fleecevest arm scores oddly low: do NOT adjust the checks — commit the result anyway and report DONE_WITH_CONCERNS with the table so the controller can decide whether the persona or the checks need work.

- [ ] **Step 3: Commit**

```bash
git add benchmarks/results/
git commit -m "bench: first recorded behavior benchmark run"
```

---

### Task 3: Before/after examples

**Files:**
- Create: `examples/prd-dark-mode.md`, `examples/tickets-breakdown.md`, `examples/review-teardown.md`, `examples/README.md`

**Interfaces:**
- Consumes: the artifact formats defined in `skills/fleecevest-prd/SKILL.md`, `skills/fleecevest-tickets/SKILL.md`, `skills/fleecevest-review/SKILL.md` — read each before authoring; the "After" halves must follow those templates exactly.
- Produces: 3 example files Task 4's README section links.

- [ ] **Step 1: Author the three example files.** Shared format for each:

```markdown
# Example: <title>

## Before (how it usually goes)
<~20-30 line excerpt of a realistically bloated artifact — vision paragraphs,
unnumbered wishlists, "increase engagement" with no baseline, no kill criteria.
Buzzwords allowed HERE and only here: this half is the cautionary tale.>

## After (fleecevest)
<the same product need through the matching skill's exact template —
one-pager PRD with Problem/Evidence/Bet/Success/Requirements/Open questions;
or epics/tickets with Story/Acceptance/Depends on/Ready;
or review findings in `<section>: <tag> <what>. <fix>.` form ending with
`net: -<N> lines possible. rungs failed: <list>.`>

## What changed
<exactly 3 bullets, each one line: the cut, the sharpening, the addition.>
```

Content requirements:
- `prd-dark-mode.md`: Before = 5 sections of vision/theater for dark mode; After = the one-pager per fleecevest-prd's headings, with one ASSUMPTION block and real kill criteria.
- `tickets-breakdown.md`: Before = a flat 12-item task list with no acceptance criteria ("build settings page", "make it fast"); After = 2 outcome-named epics, 4 tickets total in the exact Story/Acceptance/Depends on/Ready format, one ticket honestly `Ready: no`.
- `review-teardown.md`: Before = a 6-line excerpt of a vague PRD ("we will leverage synergies to delight users at scale"); After = a fleecevest-review teardown of that exact excerpt — at least 5 findings using 5 different tags, ending with the net line.

- [ ] **Step 2: Write `examples/README.md`** (~8 lines): what these are (the same product need, before and after the vest), that Before halves are deliberately bad, and a pointer to try it live via `/fleecevest-prd`.

- [ ] **Step 3: Verify**

```bash
node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js tests/benchmark.test.js   # 9/9 — examples are outside all test globs
grep -c '^## ' examples/prd-dark-mode.md examples/tickets-breakdown.md examples/review-teardown.md      # 3 each (Before/After/What changed)
```

Also confirm the After halves contain zero banned words (`grep -iE 'synergy|circle back|double-click|elite' examples/*.md` hits only Before sections).

- [ ] **Step 4: Commit**

```bash
git add examples/
git commit -m "docs: before/after examples — prd, tickets, review"
```

---

### Task 4: Wiring — versions, README

**Files:**
- Modify: `package.json`, `.claude-plugin/plugin.json`, `fleecevest-mcp/package.json`, `README.md`

**Interfaces:**
- Consumes: benchmark results (Task 2), examples (Task 3).

- [ ] **Step 1: Bump versions** to `0.3.0` in all three: root `package.json`, `.claude-plugin/plugin.json`, `fleecevest-mcp/package.json`. (Do not regenerate `fleecevest-mcp/package-lock.json` by hand; run `npm install --package-lock-only` inside `fleecevest-mcp/` so the lock matches.)

- [ ] **Step 2: Update `README.md`** — add one short section after "Other editors and agents", persona voice:

`## Receipts` — two paragraphs: (1) the benchmark: what it measures, `npm run bench`, cite the actual headline from Task 2's result file ("baseline X/15 — fleecevest Y/15", link `benchmarks/results/`); (2) examples: link `examples/` with one line ("the same product need, before and after the vest").

- [ ] **Step 3: Full verification**

```bash
npm test                        # 8/8 (test script unchanged — benchmark.test.js gets added to it in this step, see below)
```

Wait — `npm test` must include the new test file. Update the `test` script in `package.json` to:

```json
"test": "node --test tests/structure.test.js tests/platform.test.js tests/mcp.test.js tests/benchmark.test.js"
```

Then:

```bash
npm test                        # expect 9/9 pass
npm run check                   # "Platform copies in sync (26 files); ..."
claude plugin validate .        # "Validation passed"
```

- [ ] **Step 4: Commit**

```bash
git add package.json .claude-plugin/plugin.json fleecevest-mcp/ README.md
git commit -m "feat: version 0.3.0, benchmark and examples documented — Phase 3 complete"
```

---

## Self-review notes

- **Spec coverage:** Phase 3 = "tests, behavior benchmarks, examples". Structural tests shipped early (Phases 1–2, noted in the Phase 2 final review); behavior benchmark → Tasks 1–2 (leads with problem? kill criteria? one-pager budget? — the spec's three questions are the checks, plus two more); before/after examples → Task 3. The paid 3-model benchmark harness stays deliberately skipped per spec.
- **Ledger note honored:** review finding format asserted nowhere as `<file-or-section>:` — Task 3's review example uses the shipped `<section>:` form.
- **Type consistency:** `CHECKS`/`PROMPTS`/`score` exported once (Task 1), consumed by its test; `npm run bench` name consistent across Tasks 1, 2, 4.
- **Placeholder scan:** clean; every code step carries full content; authored-content steps (README/examples) carry complete format contracts and content requirements.
