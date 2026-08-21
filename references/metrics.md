# Metrics: North Stars, Baselines, and Retention as Truth

> distilled: 2026-08-20, corpus @ be8ab89

## Retention as the proxy for product quality — Gibson Biddle
Netflix collapsed the fuzzy question "is this a good product?" into one measurable number — monthly retention — instead of arguing over subjective UX quality. **When to use:** when leadership keeps debating "is this better" with no shared yardstick; pick a single retention-shaped proxy and rally around it. *Source: Gibson Biddle, "35 years of product design wisdom from Apple, Disney, Pinterest and beyond"*
> "A more engaging product is a better product. So if you think investing in building a better product is super important, then you go with engagement, and the proxy metric that I use for that at Netflix was retention."

## SWAG as a starting metric target — Gibson Biddle
Don't wait for perfect data to set a metric target — take a stupid wild-ass guess first, then refine it one smart conversation at a time. **When to use:** defining a new north-star or engagement target in a new role, especially under time pressure. *Source: Gibson Biddle, "35 years of product design wisdom from Apple, Disney, Pinterest and beyond"*
> "Personally, I'd start with a SWAG. I would take a shot, a stupid, wild-ass guess of what I think is right, so at least I started with a point of view before I shared it with my team."

## Word-of-mouth multiplier for baselining retention ROI — Gibson Biddle
To decide whether a marginal retention lift is worth the investment, multiply saved customers by LTV and an explicit word-of-mouth factor — then argue about that multiplier, not the raw retention delta. **When to use:** when a feature only moves churn a fraction of a point and you need to translate that into a defensible dollar figure. *Source: Gibson Biddle, "35 years of product design wisdom from Apple, Disney, Pinterest and beyond"*
> "If you loved it, Lenny, you'd tell your friends about it, you'd rave about it, and you'd bring in one other customer for free into Netflix. And so, we used this 2X word of mouth factor."

## Strategic retention vs. tactical retention — Patrick Campbell
Product teams pour effort into "strategic retention" (roadmap, time-to-value, features) while ignoring "tactical retention" (failed payments, cancellation flows, offboarding) — which is 25-40% of total churn. **When to use:** as an audit checklist once retention has plateaued despite continued feature investment. *Source: Patrick Campbell, "10 lessons on bootstrapping a $200m business"*
> "You fail at realizing most of the time that there are two types of retention. There is strategic retention and then there's tactical retention... this tactical retention, it's typically about 25 to 40% of your churn problem."

## The pricing metric matters more than the price — Patrick Campbell
What you charge per (seats, credits, visits) is the highest-leverage pricing lever — get the unit right and churn drops roughly 20-25% because customers downgrade instead of canceling. **When to use:** when redesigning a pricing model, not just when tweaking price points. *Source: Patrick Campbell, "10 lessons on bootstrapping a $200m business"*
> "The number one thing to figure out when you're thinking about the different pricing pieces, pound for pound, it's the pricing metric or the value metric."

## The retention "death zone" — Patrick Campbell
Churn is U-shaped by usage pattern: daily-habit workflow products and invisible-value products (no login required) both retain best; anything in the middle — occasional but not habitual use — retains worst. **When to use:** diagnosing why a mid-frequency product has stubbornly average retention; the fix may be pushing toward one extreme, not just "improving the product." *Source: Patrick Campbell, "10 lessons on bootstrapping a $200m business"*
> "Those products that are workflow products you use every single day or mostly every single day, or those products you don't have to log into but you still get the value, that's where the lowest churn rates are, the highest retention. Anything in the middle, it's like death."

## Protect the baseline, not just grow it — Casey Winters
At scale, existing metrics silently erode if unmaintained — an algorithm change or platform shift can wipe out gains you assumed were permanent. **When to use:** arguing for defensive/maintenance work when leadership only wants to fund net-new growth. *Source: Casey Winters, "Why most product managers are unprepared for the demands of a real startup"*
> "We're not guaranteed the gains from all the things we've built in the past. We need to do things to protect them."

## Build custom metrics for un-sexy investments — Casey Winters
High-impact but hard-to-measure work (reliability, dev velocity, tech debt) is chronically underfunded because it resists standard metrics — construct bespoke metrics to make its value visible instead of letting it lose every roadmap fight to growth-metric-backed asks. **When to use:** justifying infra or quality work against a roadmap dominated by growth numbers. *Source: Casey Winters, "Why most product managers are unprepared for the demands of a real startup"*

## Usage as the North Star, revenue as the byproduct — Elena Verna
Lovable deliberately does not optimize for revenue — it optimizes usage/adoption and treats monetization as a lagging output to tune later, appropriate for an early/hypergrowth category land-grab. **When to use:** when maximizing market share matters more than near-term monetization efficiency. *Source: Elena Verna, "The new AI growth playbook for 2026"*
> "Our North Star is just to get as much usage as possible, and we will fix and tune our monetization model afterwards."

## Engagement retention as the leading indicator of paid retention — Elena Verna
In a usage-based business, watch engagement retention weekly and treat it as the predictor of where paid/revenue retention will land later — it's less lagging and less noisy than the "real" number. **When to use:** choosing which retention curve deserves the team's weekly attention. *Source: Elena Verna, "The new AI growth playbook for 2026"*
> "There's actually engagement retention as well, because that is the leading indicator for how your paid retention is going to look like."

## NDR over 100% as the multiple-moving metric — Elena Verna
Net dollar retention above 100% — expansion revenue outweighing churn — is singled out as the one retention number with outsized effect on valuation multiple, distinct from logo retention or raw growth. **When to use:** deciding which retention metric to headline in a board deck or fundraising narrative. *Source: Elena Verna, "The new AI growth playbook for 2026"*
> "If you don't know about net dollar retention, please read it up, that's like a superpower to get bigger multiple if you can show NDR that is over 100."

## Growth accounting: New minus Stale plus Resurrected — Naomi Gleit
Decompose net daily growth into new registrations, users gone stale (30 days no login), and resurrected users (returned after going stale) — this exposed that churn and resurrection moved the business more than new-user acquisition did. **When to use:** diagnosing whether a growth problem is really an acquisition problem or a retention problem before allocating headcount. *Source: Naomi Gleit, "Meta's head of product on working with Mark Zuckerberg, early growth tactics, and more"*
> "The churn in resurrection lines were actually much larger than the new user line, which implied to us that retention and driving those two lines was actually our biggest lever to drive net growth."

## Growth model as common currency across teams — Dan Hockenmaier
A quantitative growth model — built in a spreadsheet, which is hard to fake — translates unlike metric gains from different teams into one comparable unit, so leadership can actually prioritize instead of trading anecdotes. **When to use:** zero-based annual planning or any resource-allocation fight across teams that each move a different number. *Source: Dan Hockenmaier, "Developing a growth model + marketplace growth strategy"*
> "It's typically built in a spreadsheet which has a really nice feature of being very hard to fake. You can talk about a business conceptually, but when you actually have to get it to line up and link in a model, it's very hard to not force yourself to understand how the business works."

## Retention sensitivity is chronically underrated — Dan Hockenmaier
Building a real growth model reveals that a small retention gain often beats a much larger gain somewhere else, because retained users compound into referrals, content, and margin — easy to underweight without the model. **When to use:** allocating product/growth resources when retention "feels" boring next to flashier acquisition levers. *Source: Dan Hockenmaier, "Developing a growth model + marketplace growth strategy"*
> "Your growth is much more sensitive to customer retention than you can ever intuit... getting a smaller percentage gain on retention is often much more valuable than making a bigger change in some other area."

## Marketplace metric tree: GMV → unit economics → liquidity → share of wallet — Dan Hockenmaier
GMV/transactions is the north star everything ladders up to; unit economics validates sustainability; liquidity measures matching reliability; share of wallet measures relationship depth and predicts future defensibility. **When to use:** diagnosing marketplace health beyond top-line GMV, and choosing breadth vs. depth of growth. *Source: Dan Hockenmaier, "Developing a growth model + marketplace growth strategy"*
> "You need something that brings together both the supply and demand side to make sure it's working and that's typically your ultimate north star of which everything else ladders up to."

## Retention depth beats MAU for channel bets — Brian Balfour
When evaluating a new platform or distribution channel, rank it by retention and depth of engagement of its users, not signups or MAU — those are vanity metrics that flatter a channel before it's proven durable. **When to use:** deciding which emerging channel deserves company resources. *Source: Brian Balfour, "Why ChatGPT will be the next big growth channel"*
> "The better signal is retention and depth of engagement of the users on this platform than it is pure user level like MAU or some other number of signups, one of those vanity metrics."

## The 40% test is a leading indicator; retention cohorts are the lagging truth — Sean Ellis
Ask users how they'd feel if the product disappeared (very/somewhat/not disappointed); 40%+ "very disappointed" signals PMF faster than waiting on cohort retention to mature — but run both in parallel, since cohorts are the more accurate ground truth. **When to use:** early/MVP stage, before you can wait out a long-term retention cohort. *Source: Sean Ellis, "The original growth hacker reveals his secrets"*
> "The question is, how would you feel if you could no longer use this product?"

## Ignore the "somewhat disappointed" middle — Sean Ellis
Fence-sitters in the PMF survey are telling you the product is a nice-to-have; building for their feedback dilutes the experience for your must-have users. **When to use:** deciding whose feedback should actually drive roadmap and onboarding after running the PMF survey. *Source: Sean Ellis, "The original growth hacker reveals his secrets"*
> "Just ignore the people who say they'd be somewhat disappointed. They're telling you it's a nice to have... They're as good as gone."

## North-star checklist: units of value, not a ratio, never revenue — Sean Ellis
A good north-star metric counts units of customer-perceived value, trends up-and-to-the-right rather than being a ratio, and correlates with revenue growth without being revenue itself. **When to use:** picking or re-picking a north-star metric — a team can land one in about 30 minutes with the right checklist, not weeks of debate. *Source: Sean Ellis, "The original growth hacker reveals his secrets"*
> "It should correlate to revenue growth, but revenue shouldn't be the North Star Metric... revenue should be a product of doing things. It shouldn't kind of guide your day-to-day actions."
