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
