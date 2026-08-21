#!/usr/bin/env node
// fleecevest — UserPromptSubmit hook to track which fleecevest mode is active
// Inspects user input for /fleecevest commands and writes mode to flag file

const { getDefaultMode, isDeactivationCommand, writeDefaultMode } = require('./fleecevest-config');
const { clearMode, isQoder, readMode, setMode, writeHookOutput } = require('./fleecevest-runtime');
const { getFleecevestInstructions } = require('./fleecevest-instructions');

let input = '';
let done = false;

function finish() {
  if (done) return;
  done = true;
  try {
    // Strip UTF-8 BOM some shells prepend when piping (breaks JSON.parse)
    const data = JSON.parse(input.replace(/^\uFEFF/, ''));
    const prompt = (data.prompt || '').trim().toLowerCase();

    // Match /fleecevest commands
    let modeSwitched = false;
    let deactivated = false;
    if (/^[/@$]fleecevest/.test(prompt)) {
      const parts = prompt.split(/\s+/);
      const cmd = parts[0].replace(/^[@$]/, '/');
      const arg = parts[1] || '';

      let mode = null;
      let isReportOnly = false;

      if (cmd === '/fleecevest-review' || cmd === '/fleecevest:fleecevest-review') {
        mode = 'review';
      } else if (cmd === '/fleecevest' || cmd === '/fleecevest:fleecevest') {
        // `/fleecevest default <mode>` persists the default to config (survives
        // restarts). Plain switches stay session-scoped ("sticks until session
        // end"), so this is the only path that writes config. review is not a
        // valid default (#377), so only off/lite/full/ultra are accepted.
        if (arg === 'default') {
          const dmode = parts[2];
          if (dmode === 'off' || dmode === 'lite' || dmode === 'full' || dmode === 'ultra') {
            writeDefaultMode(dmode);
            writeHookOutput('UserPromptSubmit', dmode, 'FLEECEVEST DEFAULT SET — new sessions start in ' + dmode + '.');
          }
          return; // don't fall through to the session-mode switch
        }
        if (arg === 'lite') mode = 'lite';
        else if (arg === 'full') mode = 'full';
        else if (arg === 'ultra') mode = 'ultra';
        else if (arg === 'off') mode = 'off';
        else if (arg === '') {
          isReportOnly = true;
          mode = readMode() || getDefaultMode();
        } else {
          mode = getDefaultMode();
        }
      }

      if (isReportOnly) {
        writeHookOutput(
          'UserPromptSubmit',
          mode,
          'FLEECEVEST MODE ACTIVE — level: ' + mode,
        );
      } else if (mode && mode !== 'off') {
        setMode(mode);
        modeSwitched = true;
        // fleecevest: Qoder needs the full ruleset every turn, so when a mode
        // switch happens we fold the confirmation into the ruleset output
        // below (one JSON on stdout) instead of emitting two separate writes.
        if (!isQoder) {
          writeHookOutput(
            'UserPromptSubmit',
            mode,
            'FLEECEVEST MODE CHANGED — level: ' + mode,
          );
        }
      } else if (mode === 'off') {
        clearMode();
        deactivated = true;
        writeHookOutput('UserPromptSubmit', 'off', 'FLEECEVEST MODE OFF');
      }
    }

    // Detect deactivation
    if (!modeSwitched && !deactivated && isDeactivationCommand(prompt)) {
      clearMode();
      deactivated = true;
      writeHookOutput('UserPromptSubmit', 'off', 'FLEECEVEST MODE OFF');
    }

    // Qoder has no SessionStart event, so UserPromptSubmit does double duty:
    // activate the default mode on first prompt (if no flag exists yet), then
    // inject the ruleset on every prompt. Claude Code/Codex do this in
    // SessionStart via fleecevest-activate.js; Qoder can't, so we do it here.
    // Skip when deactivated — user just turned fleecevest off.
    if (isQoder && !deactivated) {
      let currentMode = readMode();
      if (!currentMode) {
        // First prompt in session — initialize from config/env default
        currentMode = getDefaultMode();
        if (currentMode !== 'off') {
          try { setMode(currentMode); } catch (e) {}
        }
      }
      if (currentMode && currentMode !== 'off') {
        // fleecevest: one JSON per invocation — mode-switch confirmation is
        // folded into the ruleset header so Qoder gets both in one write.
        const header = modeSwitched
          ? 'FLEECEVEST MODE CHANGED — level: ' + currentMode + '\n\n'
          : '';
        writeHookOutput('UserPromptSubmit', currentMode, header + getFleecevestInstructions(currentMode));
      }
    }
  } catch (e) {
    // Silent fail
  }
}

process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', finish);

// Never hang the session. On Windows, Claude Code runs this hook through a
// PowerShell `if {}` wrapper that can swallow the piped prompt JSON, so stdin
// 'end' never fires and the hook blocks forever — freezing the session (#443).
// On error, or after a short fallback, process whatever arrived (recovering the
// mode if data came without EOF) and exit. unref() keeps the timer from adding
// latency to the normal path, where 'end' fires first. Mirrors the best-effort,
// never-block contract the other lifecycle hooks already follow.
process.stdin.on('error', () => { finish(); process.exit(0); });
setTimeout(() => { finish(); process.exit(0); }, 1000).unref();
