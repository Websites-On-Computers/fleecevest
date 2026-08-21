// tests/structure.test.js
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const glob = (dir, filter) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { recursive: true })
        .map(String)
        .filter(filter)
        .map((f) => path.join(dir, f))
    : [];

test('plugin manifest is valid', () => {
  const p = JSON.parse(fs.readFileSync(path.join(ROOT, '.claude-plugin/plugin.json'), 'utf8'));
  assert.equal(p.name, 'fleecevest');
  assert.ok(p.version);
  assert.ok(p.description.length > 20);
  assert.equal(p.hooks, './hooks/claude-codex-hooks.json');
});

test('hooks manifest is valid JSON and references existing files', () => {
  const h = JSON.parse(fs.readFileSync(path.join(ROOT, 'hooks/claude-codex-hooks.json'), 'utf8'));
  for (const evt of Object.values(h.hooks)) {
    for (const m of evt) {
      for (const hook of m.hooks) {
        const file = hook.command.match(/hooks\/([\w.-]+\.js)/)[1];
        assert.ok(fs.existsSync(path.join(ROOT, 'hooks', file)), `missing hooks/${file}`);
      }
    }
  }
});

test('every SKILL.md has name+description frontmatter', () => {
  for (const f of glob(path.join(ROOT, 'skills'), (f) => f.endsWith('SKILL.md'))) {
    const src = fs.readFileSync(f, 'utf8');
    assert.match(src, /^---\nname: fleecevest/, `${f}: bad frontmatter`);
    assert.match(src, /\ndescription: /, `${f}: no description`);
  }
});

test('references are distilled-stamped and within budget', () => {
  for (const f of glob(path.join(ROOT, 'references'), (f) => f.endsWith('.md'))) {
    const src = fs.readFileSync(f, 'utf8');
    assert.match(src.split('\n')[2] ?? src, /distilled: \d{4}-\d{2}-\d{2}, corpus @ [0-9a-f]{7}/, `${f}: no distilled stamp`);
    assert.ok(src.split('\n').length <= 220, `${f}: over 220 lines`);
  }
});

test('every command toml has description and prompt', () => {
  for (const f of glob(path.join(ROOT, 'commands'), (f) => f.endsWith('.toml'))) {
    const src = fs.readFileSync(f, 'utf8');
    assert.match(src, /^description = "/m, `${f}: no description`);
    assert.match(src, /^prompt = "/m, `${f}: no prompt`);
  }
});

test('no buzzwords or "elite" in authored content', () => {
  const files = [
    ...glob(path.join(ROOT, 'skills'), (f) => f.endsWith('.md')),
    ...glob(path.join(ROOT, 'references'), (f) => f.endsWith('.md')),
  ];
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8').toLowerCase();
    for (const word of ['synergy', 'circle back', 'double-click', 'elite']) {
      // "buzzword tax" rule text itself may quote them — allow lines containing the word "tax"
      const offending = src.split('\n').filter((l) => l.includes(word) && !l.includes('tax'));
      assert.deepEqual(offending, [], `${f}: buzzword "${word}"`);
    }
  }
});
