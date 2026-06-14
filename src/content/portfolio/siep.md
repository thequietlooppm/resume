# Social Issues, Electoral & Political Ads

## Background

After Russian-linked accounts spent roughly $100,000 on Facebook ads during the 2016 US election, the pressure on platforms to bring transparency to political advertising intensified quickly. Facebook responded by building an authorization and disclosure system that required political advertisers to verify their identity and location, attach a "Paid for by" or "Published by" disclaimer to every political ad, and have their ads archived in a publicly searchable Ad Library for seven years.

The program launched first in the United States, then expanded to Brazil, and eventually to India ahead of the country's 2019 general elections, one of the largest democratic exercises in the world. The global rollout was led by Product Manager Sarah Clark Schiff, and I was on the project from the US launch through India, a span of roughly two years.

My work fell into two areas: the review infrastructure that enforced the new ad policies, and the advertiser experience that made the policies workable in practice. Much of the engineering work was driven by lessons learned in the earlier US and Brazil rollouts, which exposed gaps in our review pipeline that we had to close before taking the program into larger and more complex markets.

## Disclaimer Review Infrastructure

Every political ad now needed a "Paid for by" disclaimer, and that disclaimer had to conform to policy. That meant we needed a way to review the text at scale before ads went live.

My team's approach was to repurpose the existing text-string review infrastructure we already used across other policy areas rather than build something new. The more substantive lift was retraining the underlying machine learning models against the content we expected to see in political ad disclaimers. Political bylines look different from the text patterns the models had been trained on, so we built labeled datasets from the ads we were already seeing, ran them through the models, and iterated until precision and recall hit acceptable thresholds.

## Rebuilding the Review Pipeline

The larger engineering challenge was the structure of the review pipeline itself. Running the program through the US and Brazil made clear that our existing architecture wasn't going to scale. Historically, our system reviewed ads for all applicable policies in a single serial process. Reviewers were trained across every policy area and worked through a unified queue. That approach had served us well for general ad review, but the demands of election-specific enforcement exposed its limits.

For elections work, we wanted reviewers trained specifically on political ad policies and, where possible, on the nuances of a particular election. A generalist queue made that impossible. We also wanted to be able to run political ad review in parallel with other policy reviews rather than blocking one on the other.

The solution was to rearchitect the core review pipeline to support parallel flows. Instead of a single serial process, the system now supported n independent review tracks running concurrently. This required rebuilding the primary rule engine to understand parallel state and adding logic to resolve conflicting outcomes when different tracks reached different conclusions about the same ad.

Edge case handling was its own problem. What happens when one review track stalls or takes far longer than expected? We had to make explicit tradeoffs between advertiser experience (they want a fast answer) and review completeness (we want all tracks to finish). We defined timeout logic and fallback behaviors that balanced those competing pressures without defaulting to either always rejecting or always approving ambiguous cases.

To validate the new architecture before it went live, we ran shadow traffic for several months. The shadow system processed real ads through both the old pipeline and the new one simultaneously, comparing outcomes to confirm they matched where they should. We also used the shadow period to label ads as political before any enforcement was in effect, which gave us a live measurement of prevalence and let us build a feedback loop for both the ML engineers and the human review teams.

## The Targeting Problem

The hardest problem I solved on this project wasn't technical. It was a policy enforcement gap that had a real impact on legitimate advertisers.

Political ads carried restrictions on which targeting options were permitted. Advertisers who wanted to run political ads were often unaware of those restrictions, so even when their ad was authorized and their disclaimer was valid, we were still rejecting it because their targeting configuration violated policy. The rejection reason was difficult to communicate clearly through our existing notification infrastructure, which meant advertisers didn't know what to fix or why.

My proposed solution was to add an explicit opt-in step: ask advertisers to declare upfront that they intended to run a political ad. If we knew that in advance, we could surface only the permitted targeting options in the ad buying UI and eliminate the rejection at the source. The check would move from the review backend to the purchase flow, where it was far easier to guide advertisers in real time.

The ads growth team pushed back. Adding any friction to the buying process was a non-starter for them, and an extra confirmation step qualified as friction.

I went back to my leadership team with a proposal for a controlled A/B test. A small test group would see the opt-in experience; the control group would go through the existing flow. The test showed minimal revenue impact in the treatment group alongside a measurable reduction in rejection rates for political ad buyers. That data was enough to move the conversation.

The experience shipped, and it became more than a fix for political ads. The same framework, where the advertiser self-identifies the ad type and the UI constrains options accordingly, was later applied to housing, employment, and credit advertising, categories that carried their own targeting restrictions for civil rights reasons. On the review side, the change simplified our logic considerably: instead of inspecting every targeting combination on the backend, we could trust that the UI had already constrained the options, and focus our review on the declaration itself.

## What It Taught Me

This project was one of the clearest examples I've seen of a policy problem that looks like a technical problem until you look closely. The review pipeline work was genuinely complex, but the highest-leverage decision I made was the A/B test that reframed a buyer-friction argument into a data question. Getting that test approved meant doing the work of translating an operational problem (rejection rates on legitimate ads) into a business case (revenue impact is negligible, friction is recoverable) for an audience that was starting from a different set of priorities.

The program that launched in India in early 2019 brought advertiser verification, disclaimer enforcement, and a seven-year public Ad Library to one of the world's largest democracies. The parallel review architecture and advertiser opt-in framework we built for it outlasted the project and became foundational infrastructure for the integrity work that followed.
