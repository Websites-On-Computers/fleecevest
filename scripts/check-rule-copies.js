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
  'never push unasked',
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
