# Working with Engineering

> distilled: 2026-08-20, corpus @ be8ab89

## The mini-CEO trap — Noah Weiss
PM-as-mini-CEO framing turns PMs into dictators, which is exactly why engineers reject them; the job is facilitation, not command. **When to use:** Whenever a PM starts unilaterally calling shots on scope or design. *Source: Noah Weiss, "The 10 traits of great PMs, AI, and Slack's approach to product"*
> "I think that's the most dangerous piece of advice ever in the history of product management because I think that is how you end up having PMs who try to act like dictators instead of leaders and facilitators."

## Say it, do it, or explain why not — Noah Weiss
Trust with engineers is built by blunt follow-through: commit, deliver, and if you can't, proactively say so before they find out. **When to use:** As the baseline reliability standard when a commitment must be dropped or reprioritized. *Source: Noah Weiss, "The 10 traits of great PMs, AI, and Slack's approach to product"*
> "good leaders need to say what they're going to do and then do what they said. If they can't then they need to follow up and explain why."

## Decision velocity over tiebreaking — Noah Weiss
The PM's real job is building the team's capacity to make high-quality decisions fast without them, not personally arbitrating every call. **When to use:** When a team stalls on decisions and defaults to "ask the PM." *Source: Noah Weiss, "The 10 traits of great PMs, AI, and Slack's approach to product"*
> "how do you actually get the team to be able to make high quality decisions quickly without you arbitrarily playing tiebreaker all the time."

## Prototype in real code, not static mocks — Noah Weiss
Slack ditched prolonged design-mock debates for fast throwaway prototypes in real software, because you can only judge how software feels once it runs. **When to use:** When scoping debate about UX or complexity drags on before anyone has touched working code. *Source: Noah Weiss, "The 10 traits of great PMs, AI, and Slack's approach to product"*
> "we stopped spending so many cycles on design explorations of static mocks or walkthroughs and said, 'How quickly can we get into prototyping the path in real software, even if it's messy and you throw it away'"

## The two-way-door trap — Shreyas Doshi
Teams invoke "reversible decision" language to skip analysis, but a shipped feature becomes a commitment the team must defend and maintain — effectively irreversible below Bezos's altitude. **When to use:** Before waving through a "quick, low-risk" feature someone called a two-way door. *Source: Shreyas Doshi, "The art of product management"*
> "They are two-way doors at Bezos' level, but as a PM leader, for you, they are a one-way door, and that's making you busy."

## The "is Bob free?" red flag — Shreyas Doshi
If a build decision is driven by engineer availability rather than customer motivation and strategy, the team is deciding backwards — and this is common practice, not a rare failure. **When to use:** In scoping meetings, when the first question is who's free to build it rather than why it should exist. *Source: Shreyas Doshi, "The art of product management"*
> "They're talking about, 'Well, is Bob the engineer going to be free? And when are they free? And if they are free, then let's build the feature.'"

## Thinking is cheap — Shreyas Doshi
Upfront thinking costs nothing compared to the engineering cost of a half-scoped build, so the default should be more deliberation before committing eng time, not less. **When to use:** When bias-to-action pressure says to skip strategic discussion and just ship. *Source: Shreyas Doshi, "The art of product management"*
> "thinking is cheap, so you should do more thinking, not less."

## Eigenquestions — Shishir Mehrotra
Before debating a pile of open questions in parallel, find the one question whose answer resolves most of the others, and answer it first. **When to use:** Early scoping with engineers, when a project has a long list of seemingly equal open questions. *Source: Shishir Mehrotra, "The rituals of great teams"*
> "The eigenquestion, the simplest definition of eigenquestion, it's the question that when answered also answers the most subsequent questions."

## Scope is an input, not an output — Shishir Mehrotra
The size of scope someone owns reflects their manager's allocation decision, not their performance — rewarding scope alone punishes people doing risky, hard-to-size work. **When to use:** When roadmap or promotion talk starts equating bigger project with better performer. *Source: Shishir Mehrotra, "The rituals of great teams"*
> "The second issue was they said the scope is actually an input, not an output."

## Job titles create delegation reflexes — Julie Zhuo
Zhuo runs her startup deliberately without PMs: when a PM title exists, engineers reflexively hand off the "why" to it; remove the title and engineers own product thinking. **When to use:** On lean teams, or when engineers wait for fully specified requirements instead of engaging with the problem. *Source: Julie Zhuo, "From managing people to managing AI: The leadership skills everyone needs now"*
> "when I have a problem, like I need to figure out the product definition, my default will be, well, I've got these people and that's kind of their job description, so I'm just going to delegate that to them."

## Decompose disagreement into assumptions — Julie Zhuo
Instead of representing a mandated roadmap item as one good/bad blob, break it into component assumptions, name the specific one you doubt, and test just that. **When to use:** When you must carry out a leadership decision you privately doubt and need a truthful way to frame it to engineers. *Source: Julie Zhuo, "From managing people to managing AI: The leadership skills everyone needs now"*
> "when you can start to get one level deeper into breaking it down into a set of assumptions, that makes it much easier, because then likely find something that you do kind of resonate with."

## The release question — Melissa Perri
Before shipping, force alignment on what change you expect and what metric will prove it — instead of only tracking whether the sprint commitment got delivered. **When to use:** Roadmap and sprint reviews, to expose whether the team optimizes outcomes or just shipping velocity. *Source: Melissa Perri, "Everything you've ever wanted to know about SAFe and the product owner role"*
> "What do we hope will happen when we release this? What metrics are we going to change? How do we instrument it to make sure that's true?"

## Tech debt as the backstop — Melissa Perri
When discovery hasn't produced enough validated feature work, don't invent backlog busywork — hand the sprint to engineers to attack tech debt of their own choosing. **When to use:** When a PM feels pressure to "keep developers full" but hasn't validated what's worth building next. *Source: Melissa Perri, "Everything you've ever wanted to know about SAFe and the product owner role"*
> "I guarantee you there's a ton of tech debt they could be working on. You don't have to scope that out. Let them choose what's the most important thing."

## Work about work — Melissa Perri
Rigid process frameworks can consume a team's energy on ceremony fidelity instead of customer value — Perri cites a company that went bankrupt while its process-absorbed teams failed to ship invoicing. **When to use:** Warning flag when retros debate "did we do the ceremony right" more than "did this move the business." *Source: Melissa Perri, "Everything you've ever wanted to know about SAFe and the product owner role"*
> "We're talking about work about work, but we're not actually getting into what are we achieving here, and that's the part I do not like about rigid processes when it comes to this."

## The lines-of-code lie — Nicole Forsgren
Any output metric you point at engineers (or their AI agents) becomes instantly gameable — an agent will happily bloat code to hit the number, manufacturing tech debt. **When to use:** When leadership proposes a simple output metric to prove productivity; redirect to quality-tied measures. *Source: Nicole Forsgren, "How to measure AI developer productivity in 2025"*
> "Most productivity metrics are a lie. If the goal is more lines of code, I can prompt something to write the longest piece of code ever."

## The ship-trash-faster trap — Nicole Forsgren
Raw velocity without judgment about what to build just means shipping garbage faster — the "what to ship" discipline is the PM's job, and AI speed gains don't supply it. **When to use:** When an exec asks why the team can't move faster with AI; reframe from throughput to prioritization. *Source: Nicole Forsgren, "How to measure AI developer productivity in 2025"*
> "We can ship trash faster every single day. We need strategy and really smart decisions to know what to ship."

## The org-switching tax — Nicole Forsgren
If engineers avoid internal transfers for non-political reasons, switching costs as much as onboarding a new hire — a concrete signal of hidden friction the team has stopped reporting. **When to use:** Assessing whether a team's slowness is fixable friction; check internal mobility patterns, not just complaints. *Source: Nicole Forsgren, "How to measure AI developer productivity in 2025"*
> "I've worked with companies where switching orgs within the company, you had to basically pay the same tax as a new hire because the systems were so different and they were so full of friction."

## Tasks, not problems — Scott Wu
Hand an AI agent (or any less-experienced executor) bounded, verifiable tasks — not open-ended problems to figure out — and pre-flag the 10-20% that needs human judgment rather than reviewing everything blindly afterward. **When to use:** Before handing off a ticket, ask "can this be quickly verified?" — if not, expect to steer actively. *Source: Scott Wu, "Inside Devin: The AI engineer that's set to write 50% of its company's code this year"*
> "Devin is best when it is working on tasks that are well-defined. One way to put it is, you want to be giving Devin tasks, not problems."

## Onboard the agent like a new hire — Alexander Embiricos
Don't dump zero-context tasks on a coding agent — build trust progressively (codebase context, align on approach, delegate incrementally), exactly like ramping a new teammate. **When to use:** When someone complains an AI coding agent "isn't working" — the failure is usually prompting it like a search engine. *Source: Alexander Embiricos, "Codex: OpenAI's coding agent"*
> "It's like you're building trust with a new teammate. And so you wouldn't go to a new teammate and just give them like, 'Hey, do this thing. Here's zero context.'"

## The review bottleneck inversion — Alexander Embiricos
As AI writes more code, the constraint shifts from writing speed to human review and validation speed — that's the real ceiling on shipping, not code generation. **When to use:** Diagnosing why "AI made coding faster" hasn't translated into shipping faster; look at PR review queues and validation loops. *Source: Alexander Embiricos, "Codex: OpenAI's coding agent"*
> "you can have an agent watch all the work you're doing, but if you don't have the agent also validating its work, then you're still bottlenecked on can you go review all that code?"
