// Pure instruction selection for the fleecevest MCP server. No MCP/SDK
// imports, so this stays unit-testable on its own. Reuses the same builder
// the Claude hooks use, so every host emits identical rules.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { getFleecevestInstructions } = require("../hooks/fleecevest-instructions.js");
const { getDefaultMode, normalizeMode } = require("../hooks/fleecevest-config.js");

// The three intensities the server offers. "off" has no instructions to serve.
export const MODES = ["lite", "full", "ultra"];

// Resolve a requested mode to a runtime intensity. Unknown, empty, or "off"
// falls back to the configured default, then to "full".
export function resolveMode(requested) {
  const asked = normalizeMode(requested);
  if (asked && asked !== "off" && MODES.includes(asked)) return asked;

  const fallback = normalizeMode(getDefaultMode());
  return fallback && MODES.includes(fallback) ? fallback : "full";
}

export function buildInstructions(requested) {
  return getFleecevestInstructions(resolveMode(requested));
}
