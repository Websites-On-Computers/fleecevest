---
name: fleecevest-eng
description: >
  Generate the questions a fleece-vested PM asks engineers about a proposal —
  and the questions engineers should ask back. Use when the user says
  "questions for eng", "what should I ask the engineers", "tech review prep",
  or invokes /fleecevest-eng.
---

# fleecevest-eng

Load: `references/working-with-eng.md`.

Toolchain: when the proposal is staged `draft`, aim the questions at what
must be true before promote — evidence to gather, spikes to run — not at
polish the draft doesn't owe yet.

Input: a proposal, PRD, design doc, or a described feature. Output questions,
not opinions — the PM's job here is to expose what the doc hides.

## Output (chat, or appended to the source doc on request)

**Ask the engineers** — 5–10 questions, each one line, drawn from:
- Hidden complexity: "What's the part of this you'd dread building?"
- Irreversibility: "Which decisions here are one-way doors?"
- Cut lines: "If the deadline moved up a month, what goes first?"
- Simplification: "What would make this 10x simpler to build?"
- Dependencies: "Whose roadmap does this silently depend on?"
- Operations: "What pages someone at 3am after this ships?"

**Expect back from the engineers** — 3–5 questions a good engineer will ask,
with the answer the PM should already have (from the PRD's Problem/Evidence/
Success sections). A question the PM can't answer is flagged
`OPEN QUESTION:` with the PM as owner.

Rules: questions are specific to THIS proposal — a question that could be
asked of any doc gets cut. Max one question per line, no preamble.
