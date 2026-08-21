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
