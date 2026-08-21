# fleecevest

Ruthlessly clear PM mode for coding agents. The vest means you've shipped.

## Install

Two commands. If your install needs a runbook, it has failed.

```
claude plugin marketplace add /path/to/fleecevest
claude plugin install fleecevest@fleecevest
```

(Once published, the GitHub slug works in place of the path.) Or inside a
session: `/plugin install fleecevest@fleecevest`. Restart the session. It
activates on start, level `full`, no config needed.

## Other editors and agents

Fleecevest lives in your workspace as a rules file and ships in platform-specific subdirectories. Pick it up automatically or point your tool to the right folder.

| Platform | Location | Auto-loaded |
|---|---|---|
| Cursor / Windsurf / Copilot / Cline / Kiro / agents.md | Rules in this repo | Yes |
| OpenCode | `.opencode/command/` | Point tool here |
| OpenClaw | `.openclaw/skills/` | Point tool here |
| Any MCP-speaking tool | `fleecevest-mcp/` [(see README)](fleecevest-mcp/README.md) | Configure MCP server |

All copies are generated — edit the canonical files and run `npm run build`. Never edit the copies directly.

## Receipts

The vest works. The behavior benchmark measures whether the pose forces the clarity ladder: problem-first, kill criteria, one-page discipline. Run it anytime (`npm run bench`) to watch baseline and fleecevest compete on the same 15 checks — PRD, spec, and strategy asks. The results: **baseline 7/15 — fleecevest 13/15** ([full results](benchmarks/results/)).

See the [examples](examples/): real product prompts, same shape before and after the vest, showing what changes when you ship with clarity first.

## What it does

Fleecevest sits in front of every product artifact and runs the clarity
ladder first: should this exist at all, is the problem one sentence with a
named user, what's the evidence, what's the smallest bet that tests it, and
what's the metric with a kill criterion. Only the rungs that hold get an
artifact. Fail rung one or two and the recommendation is to kill it, in one
line — that's a success state, not a bug.

## Commands

| Command | What you get |
|---|---|
| `/fleecevest` | Switch or report intensity level (lite/full/ultra/off) |
| `/fleecevest-prd` | One-page PRD, clarity ladder enforced first |
| `/fleecevest-tickets` | Epics and paste-clean tickets from a PRD/spec |
| `/fleecevest-spec` | Project spec: milestones, owners, risks, kill criteria |
| `/fleecevest-eng` | Questions a PM should ask engineering before committing |
| `/fleecevest-review` | Tear apart an existing PRD/spec/ticket for clarity failures |
| `/fleecevest-discovery` | Interview guides, assumption maps, research synthesis |
| `/fleecevest-strategy` | Strategy one-pager: metrics tree, bets, a real not-doing list |
| `/fleecevest-comms` | Stakeholder updates and launch comms, answer first |
| `/fleecevest-help` | This card, in the persona's voice |

Artifacts land in `docs/product/`.

## Intensity levels

| Level | What changes |
|---|---|
| **lite** | Ladder advisory: flags vagueness, doesn't block on it |
| **full** | Ladder enforced. One-pager first. Kill criteria mandatory. Default. |
| **ultra** | One page is the maximum. Everything else is an appendix. Rung 1 asked out loud on every request. |

Switch with `/fleecevest lite|full|ultra`. `/fleecevest default <level>`
writes the choice to config so it survives restarts.

## The knowledge base

The references fleecevest draws on are distilled from
[Lenny's Podcast transcripts](https://github.com/ChatPRD/lennys-podcast-transcripts)
— hundreds of episodes with working PMs and founders, condensed into eight
files (PRD craft, discovery, strategy, prioritization, metrics, comms,
operating habits, working with eng), each claim attributed to the person who
said it. Not paraphrase-of-a-paraphrase — sourced, so you can go check.

## Turning it off

Say "stop fleecevest", "take off the vest", or "normal mode". Resume anytime
with `/fleecevest`.

## Credits

Pattern forked from [Ponytail](https://github.com/DietrichGebert/ponytail).
Corpus from [ChatPRD/lennys-podcast-transcripts](https://github.com/ChatPRD/lennys-podcast-transcripts).
MIT licensed.
