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
