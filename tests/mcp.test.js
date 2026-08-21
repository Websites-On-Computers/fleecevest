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
