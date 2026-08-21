# Customer Referral Program - Product Spec

## Overview
Launch a referral program to capitalize on organic word-of-mouth adoption (already 30% of signups) while managing rising CAC. The program incentivizes existing customers to refer others with a $50-per-referral reward budget.

## Problem Statement
- CAC has doubled YoY, straining unit economics
- Organic referrals already account for 30% of new signups—significant untapped leverage
- No formal mechanism exists to track or reward referrers, leaving adoption potential on the table

## Goals
1. **Reduce CAC** by incentivizing a lower-friction acquisition channel
2. **Increase referral volume** from current implicit 30% to explicit, tracked referrals (target: 40%+ of new signups within 6 months)
3. **Improve customer retention** by strengthening community and referrer investment

## Success Metrics
- Referral-sourced signup rate (% of new signups with referral attribution)
- Referral conversion rate (% of invites → signup)
- Cost per referral (total referral spend ÷ new referrals attributed)
- Referrer engagement (% of existing customers who refer at least once)
- Blended CAC impact (referral CAC vs. baseline CAC)

## Program Mechanics

### Who Can Refer
- Any active customer account (status: paid or trial)
- Requirement: account age ≥ 7 days (reduces spam)

### How It Works
1. Referrer generates a unique referral link/code from in-app dashboard
2. Referrer shares link with prospects
3. Prospect signs up using referral link
4. New customer completes onboarding and makes first purchase (or activation event)
5. Referrer receives $50 reward (see Fulfillment below)

### Rewards Structure
- **Per referral:** $50 (to referrer account as credit or cash payout)
- **Cap per referrer:** $500/month (max 10 referrals/month) to prevent gaming and control spend
- **Prospect incentive:** Optional—consider $10 credit on first purchase to remove friction (requires finance approval)

### Referral Activation Criteria
Referral counts when the new customer:
- Completes email verification
- AND makes a first purchase OR reaches activation threshold (e.g., creates first project, runs first workflow)

This prevents fake signups while keeping the bar realistic.

## Implementation Details

### Tracking & Attribution
- Unique referral URLs/codes stored with referrer ID
- UTM parameter fallback: `utm_source=referral&utm_medium=<code>`
- Cookie lifetime: 30 days (reasonable for B2B signup cycles)
- De-duplication: last-click attribution (if customer uses multiple referral codes, the most recent counts)

### Reward Fulfillment
- **Option A (preferred):** Account credit—applied instantly after activation, can be used toward future charges or requested as payout
- **Option B:** Monthly payout—batched payouts via Stripe Connect / ACH on the 15th of each month (simpler accounting, adds delay)
- **Compliance:** Collect tax info (W-9 or equivalent) for payouts >$600/year per IRS requirements

### Fraud Prevention
- Blacklist known duplicate/test accounts
- Flag referrals from same IP address / device (alert, but allow—real referrals can come from offices)
- Limit one referral per unique email domain per month initially (can loosen after validation)
- Monitor for patterns (e.g., single referrer driving 50+ referrals in a week)

## Communication & Discovery

### Referrer Awareness
- In-app referral widget (bottom-right corner or dedicated dashboard tab)
- Email campaign: monthly highlights ("You've earned $150! Share and earn more")
- On-boarding: show referral CTA in welcome email and onboarding flow
- Social proof: leaderboard (top 10 referrers by count, optional)

### Prospect Experience
- Referral landing page (light-weight, reinforces personal recommendation)
- Email: from referrer's name ("Alice invited you to try Acme")
- Signup flow: show referrer info ("Referred by Alice")

## Rollout Plan
1. **Week 1-2:** Build tracking, reward fulfillment, and in-app UI
2. **Week 3:** QA, fraud rules, and tax collection setup
3. **Week 4:** Soft launch (opt-in, internal + select customer cohort; gather feedback)
4. **Week 5-6:** Monitor metrics, iterate, and scale to all customers
5. **Week 7:** Public launch and marketing push

## Out of Scope (V2)
- Team referrals (split rewards among team members)
- Tiered rewards (higher payout after N referrals)
- Referral contests / seasonal bonuses
- Affiliate program (external partners)

## Open Questions for Stakeholder Alignment
1. Should we offer a prospect incentive ($10 credit)? What's the marketing team's recommendation?
2. Is $500/month per referrer cap realistic, or should we adjust based on CAC targets?
3. Do we have tax/legal review for payout structure?
4. Which activation event triggers the reward—first purchase, or a lower bar (email verified)?

---

This spec is ready to share with engineering, design, finance, and legal for feedback before development starts.
