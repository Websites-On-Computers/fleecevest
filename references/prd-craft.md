# Writing Requirements: PRDs, Specs, and Problem Framing

> distilled: 2026-08-20, corpus @ be8ab89

## Appetites, not estimates — Ryan Singer
Don't take a big idea, spec it fully, and ask engineering how long it'll take — decide up front how much time the problem is worth, then shape a solution that fits inside that budget. **When to use:** kicking off any project before a single requirement is written; set the time box before you scope the work, not after. *Source: Ryan Singer, "A better way to plan, build, and ship products"*
> "We're not going to say, 'Oh, we need to build a calendar and then do a whole bunch of Figma files or write a whole bunch of requirements and then ask for an estimate.'"
> "What is our appetite for this? What is the maximum amount of time we're willing to go before we actually finish something?"

## The circuit breaker — Ryan Singer
When a project blows through its time budget and isn't converging, the failure mode isn't "extend the deadline" or "cut scope to fake a finish" — it's stopping the build and sending it back to shaping until the fuzzy part gets clarity. **When to use:** a project is at the end of its committed window and still isn't landing; resist quietly rolling it into overtime. *Source: Ryan Singer, "A better way to plan, build, and ship products"*
> "If a project is not on track to actually finish after the six weeks, we're just going to cancel it and rethink."
> "We're not going to keep reinvesting in something that we don't understand."

## Hunt the rabbit holes before you bet — Ryan Singer
The risk that sinks a scoped project is rarely the obvious hard part — it's the "oh, it'll be fine" step that turns out to have three hidden branches once someone opens the code. **When to use:** before finalizing a pitch or PRD, deliberately interrogate the parts that feel too easy to be true. *Source: Ryan Singer, "A better way to plan, build, and ship products"*
> "There are these, we can call them rabbit holes, we can call them time bombs."

## A PRD template people actually finish — Claire Vo
The PRD sections that get used in practice: objectives and user goals, user stories, what's explicitly out of scope, a UX walkthrough, a narrative section (how would you pitch this to a customer?), then sequencing/milestones and measurement. **When to use:** structuring a spec template for a team — the narrative/pitch section is the one most PMs skip and shouldn't. *Source: Claire Vo, "Bending the universe in your favor"*
> "About 60% of people use it to put in an idea and get a PRD out. Just get the specs of what are my objectives and user goals, what are user stories, what is out of scope, walk through the UX... I have what's called a narrative, which is, how do you pitch this product?"

## Outside-in teardown as a training rep — Claire Vo
To build spec-writing judgment, don't just write your own PRDs — critique someone else's shipped product as if you owned it: what would you have measured, how would you handle error states, would you call this good, okay, or great. **When to use:** leveling up a junior PM's requirements-writing instincts without waiting for their next project. *Source: Claire Vo, "Bending the universe in your favor"*
> "How would I have written the PRD here? What would I be measuring? How would I think about error states?"

## Start with why, not what — Maggie Crowley
The most important section of a one-pager or spec is the first one — background and context: what's the problem, why does it matter, why does it matter now. Get that right and the rest of the document gets easy; skip it and the doc is just a features list with no home base for decisions. **When to use:** reviewing a draft spec — if the opening isn't a problem statement, send it back before reading further. *Source: Maggie Crowley, "Mastering product strategy and growing as a PM"*
> "The most important section in my opinion in the document is the first part, which is like what is the background and context? What is the problem, why does it matter and why does it matter now?"

## Headline first, argument second — Maggie Crowley
Lead every doc, email, or update with the conclusion, then support it — and cap your bets or priorities at three. A fourth item is a sign you haven't actually prioritized. **When to use:** editing any strategy doc or one-pager before it goes out; cut before you add. *Source: Maggie Crowley, "Mastering product strategy and growing as a PM"*
> "The Minto principle is something that I would recommend everyone do, which is put the headline, the full conclusion first and then you're supporting argument second."
> "There's always three things or fewer, never more than three things."

## Kill the one-way write-up — Lane Shackleton
Docs that only accept comments in a hundred-pixel margin produce two failure modes: nobody knows who's actually read it, and the most important disagreement ends up buried in a 30-comment thread on the title. **When to use:** diagnosing why a strategy doc "got feedback" but nothing actually got decided — check whether the doc structurally supports a real discussion or just spell-checking. *Source: Lane Shackleton, "What sets great teams apart"*
> "You would always be trying to figure out who's read your write-up... sending a write-up out at 11:30 PM and then waiting patiently for the avatar of the SVP... which is just totally insane if you think about that behavior."
> "You'll get into this 30 comment thread on the title of the doc."

## Opportunities are not solutions in disguise — Teresa Torres
An opportunity is an unmet need, pain point, or desire — not a feature. Almost everyone writing discovery docs collapses this distinction and fills the "problem" section with things that are actually solutions wearing a problem costume. **When to use:** reviewing an opportunity space, problem brief, or "customer needs" section — check whether each line could be shipped as-is; if so, it's a solution, not a problem. *Source: Teresa Torres, "Build better products with continuous product discovery"*
> "I can tell you that 98% of people that write opportunities write them as solutions."

## A number is not a strategy — Jackie Bavaro
"Increase revenue by 50%" is a target, not a strategy — a real strategy connects that target to a specific feature or bet through an explicit chain of reasoning, dot by dot, so anyone reading it can see why this work and not other work. **When to use:** reviewing a strategy doc handed down from leadership — if you can't trace the dots from goal to feature, the strategy isn't finished, and it's the PM's job to finish it. *Source: Jackie Bavaro, "Jackie Bavaro on getting better at product strategy"*
> "My CEO brought me a strategy and the strategy is increased revenue by 50%, it's a revenue target number. That doesn't seem like a strategy to me."
> "A good strategy is all about connecting the dots."

## Don't over-invent a narrowly scoped problem — Jackie Bavaro
When you're handed a small, well-bounded problem, the mistake is treating it as a chance to be creative — do the simple, obvious thing well, and save the invention for when the scope actually calls for it. **When to use:** early-career or any time a request is small and specific; resist the urge to redesign what wasn't broken. *Source: Jackie Bavaro, "Jackie Bavaro on getting better at product strategy"*
> "The right answer to these narrowly scope defined products is not to invent a whole new print dialogue... just do the simple thing, get it done really well."

## You're judged by your artifacts, not your intentions — Vikrama Dhiman
When a PM's impact isn't translating into career growth, the diagnostic question isn't about their ideas — it's "show me your last PRD, your last product note, your strategy doc." The quality bar on the actual documents is what's usually missing. **When to use:** as a gut-check before asking for more scope or a promotion — pull up your last three docs and read them like a skeptical reviewer would. *Source: Vikrama Dhiman, "A framework for PM skill development"*
> "Can you show me your last PRD? Can you show me the last product note that you sent? Can you show me the product strategy doc? You must have that impact through the artifacts that you work on."
