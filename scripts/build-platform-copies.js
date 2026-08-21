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
