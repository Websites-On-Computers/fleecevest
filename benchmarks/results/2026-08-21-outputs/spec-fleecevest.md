# Referral Program Spec — One-Pager

## Problem
CAC doubled YoY; 30% of signups are already organic word-of-mouth referrals, but we're not systematizing or rewarding them, leaving acquisition cost and customer lifetime value on the table.

## Evidence
- **Data:** 30% of new signups already self-report referral source (internal analytics)
- **Budget signal:** Finance approved $50/referral spend — implies they've modeled unit economics as ROI-positive
- **Urgency:** CAC trending unsustainable; growth needs lever other than paid spend

## Solution
Launch a simple referral incentive: referrer gets $50 account credit when their referred friend signs up and completes activation (defined as: creates account + first action within 7 days). Distribute credit as account balance usable against next bill. Refer link is opaque (unique token tied to referrer account), no public affiliate dashboard or social virality mechanics.

## Scope

**In:**
- Unique referral links per user (generated on demand, shown in one place)
- Activation criteria: referred user creates account + first action within 7 days
- $50 account credit to referrer (no cash, no tier multipliers)
- Email + dashboard tracking of pending and claimed rewards
- Row-level attribution table for 60-day analysis

**Cut:**
- Tiered rewards (revisit when referral volume > 1000/mo)
- Social share buttons, viral coeff (revisit if engagement <15% of active users)
- Gamification, leaderboards (revisit if redemption rate <20%)
- Referee incentive (test referrer-only first; cheaper, simpler)
- Affiliate dashboard (revisit when spam risk > 5% of signups)
- Fraud detection ml model (assume <2% fraud; flag high clusters manually)

## Success & Kill Criteria

**Primary metric:** % of MoM new signups from referral source  
**Baseline:** 30% (today)  
**Target:** 35%+ within 60 days (capture incremental formalized adoption)  
**Kill if:** 
- Referred signups <32% at 60d (no formalization uplift) 
- Cost per referred signup >$75 (incentive unsustainable)  
- Referrer redemption rate <10% (friction in claiming/credit)

## Assumptions (Test Early)
- **User behavior:** Existing referrers will formalize their referrals when asked (no active permission needed, just enabled)
- **Economics:** Finance's $50/referral math assumes 60d cohort LTV ≥ $150 (review before launch)
- **Compliance:** Referral credits are account credits, not taxable cash rebates (legal sign-off needed)

## Launch Plan
1. **Week 1:** Wireframes + legal sign-off on credit structure
2. **Week 2:** Build link gen, claim flow, email template, reporting dashboard
3. **Week 3:** Soft launch to 10% of existing users (dog-food + early feedback)
4. **Week 4:** GA; measure cohorts daily; review kill criteria by day 40
5. **Day 60:** Kill/iterate/scale decision

---

**Cut:** fraud detection, referee incentive, social virality. **Assuming:** referrer activation requires no extra permission, LTV ≥$150. **Validate next:** legal sign-off (Day 0), $50 unit econ review (Day 2), soft-launch feedback on friction (Day 21).
