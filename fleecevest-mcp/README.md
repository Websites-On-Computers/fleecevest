# fleecevest-mcp

The vest doesn't care how your host injects context — it just needs a way in.
This is that way in: a stdio MCP server that serves the fleece-vested PM
ruleset as a prompt and a tool, for the hosts that have neither a rules-file
convention nor a hook system to lean on.

## What it serves

- Prompt `fleecevest` — pick it from your host's prompt menu, optionally with
  `mode: lite | full | ultra`.
- Tool `fleecevest_instructions` — same ruleset, callable by the model when a
  prompt menu isn't available. Returns `{ mode, instructions }`.

Accepted modes are `lite`, `full`, `ultra`; omit the argument to get the
configured default. Same resolver, same rules, every host.

## When to use it

Use this if your host can't read `CLAUDE.md`/`AGENTS.md` and can't run hooks.
If it can do either of those, use the adapter instead — one page of PRD
discipline shouldn't cost you an MCP round trip.

## Config

First, run `npm install` inside `fleecevest-mcp/` — dependencies aren't committed.

### Example config

```json
{
  "mcpServers": {
    "fleecevest": {
      "command": "node",
      "args": ["/path/to/fleecevest/fleecevest-mcp/index.js"]
    }
  }
}
```
