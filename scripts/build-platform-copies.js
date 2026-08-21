#!/usr/bin/env node
// Generate platform copies from canonical sources.
//   rule copies <- AGENTS.md body (generated-comment first line stripped)
//   openclaw skills <- skills/*/SKILL.md bodies with openclaw frontmatter
//   opencode commands <- commands/*.toml to markdown format
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

module.exports = { outputs, ruleBody, read, ROOT };

if (require.main === module) {
  for (const [rel, content] of Object.entries(outputs())) {
    const p = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
    console.log('wrote', rel);
  }
}
