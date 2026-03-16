# 🐬 DOLPHI — Australia's Next-Generation Marketplace Platform
### Strategy Document & Shipper Build Prompt
*Research compiled March 2026*

---

## PART 1: MARKET RESEARCH FINDINGS

---

### 1.1 Dubizzle — The Blueprint

Dubizzle (est. 2005, Dubai, UAE) is the #1 classifieds app in the Middle East and a masterclass in marketplace design. Key takeaways:

**What makes it dominant:**
- Free listings for everyone — zero barrier to entry
- Vertical depth across Real Estate, Motors, Jobs, and General Goods
- AI-powered "Sell with AI": user takes a photo → AI generates title, description, category, and price suggestion automatically
- 64 proprietary AI models running 49M predictions/month
- TruEstimate™ for real estate valuations, TruBroker™ for verified agents
- Premium listing upgrades, featured placements, and subscription tiers as revenue engine
- $750M annual revenue, 123M monthly visits across its group
- Custom single tech stack that scales across geographies

**What it lacks (opportunity):**
- Not available in Australia
- No cross-platform aggregation (it doesn't pull in listings from other marketplaces)
- No integrated logistics/shipping solution
- Limited social trust layer

---

### 1.2 TradeMe — The Cultural Dominance Model

TradeMe (est. 1999, New Zealand) is the gold standard for what a locally dominant marketplace looks like. It's more than a classifieds site — it's embedded into New Zealand culture (5M members in a 5.3M-person country).

**What makes it dominant:**
- Auction + Buy Now hybrid model creates urgency and value discovery
- All-in-one: marketplace + property + jobs + motors under one roof
- "Book A Courier" — integrated shipping from your doorstep
- "Ping" — its own payment product, removing reliance on banks
- "Community Watch" — crowdsourced trust & safety flagging system
- Eliminated success fees in March 2026 to compete directly with Facebook Marketplace
- Survived eBay's attempted Australian/NZ entry because it owned the culture first

**Strategic lesson for Dolphi:**
Build the cultural layer first. Become the place Australians think of instinctively when they want to buy, sell, or find something. Be local, be trusted, be essential.

---

### 1.3 Australian Marketplace Landscape — The Gap

| Platform | Type | Strength | Weakness |
|---|---|---|---|
| Gumtree | Horizontal classifieds | Australia's #1, local, peer-to-peer | No AI, no payments, no shipping, dated UX |
| Facebook Marketplace | Social classifieds | 1.1B global MAU, social trust | Fragmented, no escrow, privacy concerns |
| eBay Australia | Auction/Retail | Mature ecosystem | Not local-first, fees, aging |
| Carsales.com | Niche (Autos) | Market leader in cars | Single vertical only |
| Amazon Australia | General Retail | Logistics powerhouse | Not C2C, not classifieds |
| OLX | Global classifieds | Multi-country scale | No AU presence or brand |

**The Gap:** There is no single Australian platform that:
1. Aggregates listings from ALL other marketplaces
2. Has AI-powered listing creation
3. Has integrated payments + shipping
4. Covers all verticals with depth (Property, Autos, Jobs, General, Services)
5. Builds cultural identity the way TradeMe does in NZ

**Dolphi fills this gap.**

---

## PART 2: THE DOLPHI CONCEPT

---

### 2.1 Vision Statement

> **Dolphi is Australia's marketplace — the one place to buy, sell, list, or find anything, powered by AI, connected to every other platform, and built around the trust and culture of Australian life.**

The name "Dolphi" is local, friendly, memorable, and distinctly Australian — nodding to the ocean, community, and playfulness. Dolphins are intelligent, social, and fast — exactly the qualities of the platform.

---

### 2.2 The Core Insight — Don't Compete, Aggregate + Elevate

The strategic genius of Dolphi is that it **doesn't fight Facebook Marketplace and Gumtree — it uses them**.

Think of Dolphi in three layers:

**Layer 1 — AGGREGATOR:** Dolphi searches and displays listings from Facebook Marketplace, Gumtree, eBay, Carsales, Domain, Seek, and more in one unified feed. When a user searches "couch Melbourne", they see listings from ALL platforms, ranked by relevance, proximity, and trust score.

**Layer 2 — NATIVE MARKETPLACE:** When users want the best experience — payments, shipping, buyer protection, AI listings — they create Dolphi-native listings. These are incentivised with trust badges, priority placement, and integrated tools.

**Layer 3 — ECOSYSTEM:** Jobs, property, motors, services, and general goods — all verticals with depth. Plus tools for business sellers: bulk listing, analytics, subscription tiers, CRM-lite.

The user never needs to leave Dolphi. They can cross-list FROM Dolphi TO other platforms with one tap, or simply view aggregated results from those platforms. Dolphi becomes the central nervous system of Australian buying and selling.

---

### 2.3 Core Feature Set

#### 🔍 Universal Search & Aggregation
- Single search bar queries Dolphi native listings + scraped/API-connected listings from Gumtree, eBay, Facebook Marketplace (where API-permitted), Carsales, Domain, Seek
- Filter by: Platform source, location, price, category, listing age, seller trust score
- Save searches with push notification alerts ("new listing matching your search")
- Map view for local browsing

#### 🤖 AI-Powered Listing Creation ("List with Dolphi AI")
- Take a photo → AI identifies item, writes title, description, suggests category and price
- Pulls comparable sold listings to recommend pricing
- Auto-suggests best time to post based on category trends
- One-tap cross-list to Facebook Marketplace, Gumtree, eBay simultaneously
- AI chat assistant to answer "what should I price this?" or "how do I write a better listing?"

#### 🏡 Verticals (Deep Category Experiences)
Each vertical has its own purpose-built UX:
- **Property** — Buy, rent, share accommodation. Suburb price insights, mortgage calculator, inspection booking, verified agent badges (TruAgent)
- **Motors** — Cars, bikes, boats, caravans. PPSR/NEVDIS integration for history checks, financing calculator, mobile inspection booking
- **Jobs** — Post jobs or find work. Resume builder, application tracker, industry salary guides
- **Services** — Tradies, cleaners, tutors, pet care, etc. Reviews, verified ABN badges, booking calendar
- **Marketplace** — General goods: electronics, furniture, fashion, collectibles, baby items, sports equipment
- **Community** — Free items, skill swaps, local notices, lost pets

#### 💳 Dolphi Pay — Integrated Payments
- In-app secure payment with buyer protection (escrow hold until item received)
- Sellers get paid 24 hours after confirmed delivery
- Support for: card, PayID, Apple Pay, Google Pay, Afterpay (for items $50+)
- No transaction fee for casual sellers (first 12 months, TradeMe-inspired strategy)
- Business sellers: 2.5% transaction fee, includes fraud protection

#### 📦 Dolphi Ship — Integrated Logistics
- Click "Ship this" on any listing → pre-filled label generated
- Courier partners: Australia Post, StarTrack, Sendle, CouriersPlease
- Live tracking in-app
- Prepaid return labels for buyer protection disputes
- Rate comparison across couriers

#### ⭐ Trust & Reputation System
- **TrustScore** — Composite score: transaction history, identity verification, response time, review average
- **DolphiVerified** badge — ID verification via government ID + face scan (optional but incentivised)
- **ABN Verified** badge — For business sellers
- **Community Flag** — Users can flag suspicious listings (like TradeMe's Community Watch)
- Two-way reviews: buyer and seller both reviewed per transaction

#### 🔔 Smart Notifications & Saved Searches
- Price drop alerts on watched items
- "Someone else is looking at this" urgency signals
- New listing alerts within X km matching saved searches
- Offer notifications

#### 💼 Business Seller Suite
- Dashboard with listing analytics (views, clicks, conversion)
- Bulk listing upload (CSV/API)
- Subscription tiers: Free, Seller Pro ($29/mo), Business ($99/mo)
- Lead management for property agents and auto dealers
- Promoted listing auctions (bid for top position in category)

---

### 2.4 Monetization Stack

| Revenue Stream | Mechanism |
|---|---|
| Featured Listings | Sellers pay to appear at top of search/category |
| Bump Up | Re-list a post to top of feed for 24-48hrs |
| Subscription Tiers | Seller Pro + Business monthly plans |
| Vertical Lead Packages | Real estate agents, car dealers pay per lead |
| Banner Advertising | Category-targeted display ads for businesses |
| Dolphi Pay Transaction Fee | 2.5% for business sellers |
| Dolphi Ship Commission | Small margin on courier bookings |
| Data Insights Product | Anonymised market trend reports for investors, agents, dealers |
| API Access | Third-party developers accessing Dolphi listing data |

**Year 1 target revenue mix:** 60% premium listings/bumps, 25% subscriptions, 15% payments/shipping
**Year 3 target:** Shift to 40% SaaS subscriptions, 30% vertical lead packages, 30% pay+ship

---

### 2.5 Design Philosophy

**Aesthetic:** Clean, airy, coastal Australian palette. Sky blue + white + warm sand tones. Bold, friendly typography. Generous white space. Inspired by the clarity of Australian outdoor life — nothing cluttered, nothing dark.

**UX Principles:**
1. **0-friction listing** — A listing should take under 60 seconds with AI assistance
2. **Local-first** — Default to nearby listings. Everything anchored to postcode/suburb
3. **Trust at every touchpoint** — Verification badges, review scores, and payment protection visible at all times
4. **Progressive disclosure** — Simple for casual users, powerful tools revealed as users engage more
5. **Mobile-first, desktop-capable** — 80% of classifieds browsing is mobile; design mobile → scale up

**Accessibility:** WCAG 2.1 AA compliant. Dark mode. Voice search support.

---

### 2.6 Growth & Go-to-Market Strategy

**Phase 1 — Seed the supply (Months 1-6):**
- Launch in 2 cities: Sydney + Melbourne
- Incentivise early listers: free featured listing for first 3 months, referral bonuses
- Partner with 5-10 local Facebook buy/sell groups to onboard their communities
- PR: "The Australian answer to Gumtree" narrative

**Phase 2 — Build the habit (Months 6-18):**
- Launch aggregation (Gumtree + eBay search integration)
- Roll out Dolphi Pay + Dolphi Ship
- Expand to Brisbane, Perth, Adelaide
- Launch Business Seller suite, targeting real estate agencies and car dealerships

**Phase 3 — Cultural dominance (Year 2+):**
- TV/radio campaign in key metro markets
- Partnerships with Australia Post (shipping), banks (PayID), insurance providers (item protection)
- Launch TradeMe-style "Community" vertical (lost pets, local notices, skill swaps)
- Explore acquisition of smaller vertical platforms (e.g., a local jobs board)

---

## PART 3: SUPER-ENHANCED SHIPPER BUILD PROMPT

---

*The following is a comprehensive, multi-stage prompt system designed for use with Shipper.now (shipper.now) — an AI-powered full-stack no-code app builder. Copy and paste Section 3.1 as your opening prompt, then follow the staged prompts in Section 3.2 in sequence.*

---

### 3.1 Master Founding Prompt (Paste This First)

---

```
I want to build a full-stack marketplace web app called DOLPHI — Australia's next-generation classifieds and marketplace platform. Think Dubizzle (UAE) meets TradeMe (NZ), but built specifically for Australia, with AI-powered listing creation, cross-platform aggregation, integrated payments, and integrated shipping.

Here is a complete specification. Please acknowledge each section, ask any clarifying questions, then help me build this step by step.

---

APP IDENTITY
Name: Dolphi
Tagline: "Australia's Marketplace"
Brand: Friendly, clean, coastal Australian aesthetic. Primary colours: sky blue (#1A9FD4), white (#FFFFFF), warm sand (#F5E6C8), coral accent (#FF6B47). Font: Rounded, modern sans-serif (e.g. Plus Jakarta Sans or DM Sans). Logo: a stylised dolphin leaping over a search bar.
Tone: Warm, local, trustworthy, and fast. Like a helpful neighbour.

---

CORE USER TYPES
1. Casual Buyer — browses, searches, makes offers, purchases
2. Casual Seller — lists items to sell, ships or arranges pickup
3. Business Seller — real estate agent, car dealer, tradie, recruiter. Has a dashboard.
4. Admin — platform team managing listings, disputes, users

---

CORE PAGES & FLOWS

HOME PAGE
- Full-width hero with universal search bar ("Search anything, anywhere in Australia...")
- Location auto-detect or manual suburb input with postcode lookup
- Category icons below search: Property, Motors, Jobs, Services, Marketplace, Community, Free Stuff
- "New Near You" horizontal scroll of latest local listings
- "Trending Categories" section
- "How Dolphi Works" 3-step explainer (List → Connect → Transact)
- Trust indicators: "X listings posted today", "Y verified sellers", "Z transactions this month"
- Footer: About, Safety Tips, Help Centre, Sell on Dolphi, Business Accounts, Blog

LISTING CREATION FLOW (KEY UX — make this exceptional)
Step 1: "What are you selling?" — text input OR photo upload
Step 2: AI analyses photo/text, pre-fills: title, description, category, suggested price range (based on comparable listings), condition
Step 3: User reviews and edits AI-generated fields. "Make it better" button refines description.
Step 4: Add more photos (up to 20)
Step 5: Set price. Options: Fixed Price / Make an Offer / Auction / Free / Swap
Step 6: Location — auto-detected suburb, or manual. Toggle: "Pickup only / Ship nationally / Both"
Step 7: Cross-list options — checkboxes: "Also post to Facebook Marketplace / Gumtree / eBay" (show as coming soon badges if not yet integrated)
Step 8: Preview listing
Step 9: Publish. Celebration micro-animation. "Your listing is live! Share it:"

SEARCH RESULTS PAGE
- Left sidebar filters: Category, Price range, Location radius, Condition, Listing type (Dolphi native / All platforms), Date posted, Seller type (Verified / Business / Casual)
- Grid view default (3 cols desktop, 2 cols tablet, 1 col mobile). Toggle to list view.
- Each card: Photo, Title, Price, Location, Time posted, Platform source badge (Dolphi / Gumtree / eBay), TrustScore stars, Quick Save button
- Map view toggle — shows listing pins on Google Maps
- "Set Alert" button — save search and get notified of new matches
- Sort: Relevance / Newest / Price low-high / Price high-low / Nearest

LISTING DETAIL PAGE
- Full-width photo gallery with zoom
- Title, Price, Location, Time posted
- Seller info panel: Avatar, DolphiVerified badge, TrustScore, Member since, X reviews
- "Make Offer" button and "Buy Now" button (if Dolphi Pay enabled)
- "Message Seller" — in-app chat
- "Save" (wishlist/watchlist)
- Description with "Read more" expand
- Item details table (condition, brand, model, year, etc. — dynamically shown based on category)
- Similar listings horizontal scroll
- Report listing button
- Share buttons

MESSAGING / INBOX
- Clean chat interface, WhatsApp-style
- Pre-set quick replies: "Is this still available?", "Can you do $X?", "Can I pick up Saturday?"
- Offer negotiation flow: seller can Accept / Counter / Decline
- Transaction status tracker in chat thread once payment initiated

USER PROFILE & DASHBOARD
- Public profile: photo, name, location, TrustScore, reviews, active listings
- Private dashboard: My Listings (active/sold/draft), Purchases, Messages, Saved searches, Saved listings, Payments, Settings
- Business dashboard (for Business accounts): Analytics (views, impressions, click-through, conversion), Bulk upload, Subscription management, Listing performance

VERTICAL-SPECIFIC PAGES (each has bespoke fields + UX)
- Property: Bedrooms, bathrooms, parking, land size, inspection dates calendar, suburb price chart, mortgage calculator
- Motors: Make, model, year, kms, VIN, PPSR check link, financing calculator, inspection booking
- Jobs: Role title, salary range, job type (full-time/part-time/casual/contract), industry, remote/onsite, apply button with CV upload
- Services: Service type, hourly rate or fixed quote, service area radius, availability calendar, ABN verified badge
- Community: Free items, Lost & Found, Local Notices, Skill Swaps — no payment flow

DOLPHI PAY (Payments)
- Triggered when buyer clicks "Buy Now"
- Escrow: funds held by Dolphi until buyer confirms receipt
- Payment methods: Visa/Mastercard, PayID, Apple Pay, Google Pay, Afterpay (for $50+)
- Transaction fee: FREE for casual sellers, 2.5% for Business accounts
- Seller payout: 24 hours after confirmed delivery (or auto-confirm after 72 hours of no dispute)
- Dispute flow: buyer raises issue → seller responds → Dolphi moderates → refund or release funds

DOLPHI SHIP (Shipping)
- Shown on listings with "Ship nationally" enabled
- Pre-filled shipping label generation
- Rate comparison: Australia Post / Sendle / CouriersPlease
- Live tracking embedded in order page
- Prepaid return labels for disputes

TRUST & VERIFICATION
- Email + mobile verification on signup (mandatory)
- DolphiVerified: optional ID verification via govt ID upload + selfie match (adds badge to profile)
- ABN Verified: business number check against ABN Lookup API
- TrustScore: computed from: transaction count, review average, response time, dispute history, verification level
- Community Flag: report suspicious listing or user (like TradeMe's Community Watch)
- Two-way review: both buyer and seller review after each transaction

MONETIZATION FEATURES (build these in)
- Featured Listing: Seller pays $X to appear at top of category for 7 days
- Bump Up: $3 to re-push listing to top of feed
- Subscription tiers: Free / Seller Pro ($29/mo) / Business ($99/mo) — unlock analytics, bulk listing, reduced fees
- Stripe integration for all payments

---

TECH REQUIREMENTS
- Mobile-responsive web app (mobile-first design)
- User auth: email/password + Google OAuth + Apple Sign In
- Database: listings, users, messages, transactions, reviews
- Real-time messaging (websockets)
- Photo upload and storage (up to 20 photos per listing)
- Search: full-text + location-based + filter combinations
- Push notifications (browser + email)
- Stripe for payments
- Google Maps API for location features
- Email via SendGrid (transactional: signup, listing live, message received, payment confirmed)

---

DESIGN SYSTEM
Colours:
- Primary Blue: #1A9FD4
- White: #FFFFFF
- Sand/Background: #F9F5F0
- Coral Accent: #FF6B47
- Dark Text: #1C1C1E
- Muted Text: #6B7280
- Success Green: #22C55E
- Warning Amber: #F59E0B

Typography:
- Headings: DM Sans Bold
- Body: DM Sans Regular
- UI Labels: DM Sans Medium

Component style: Rounded corners (8–16px radius), soft shadows, generous padding. Cards with subtle hover elevation. Primary buttons: solid blue, pill shape. Secondary buttons: outlined. Micro-animations on interactions (button press, card hover, listing publish celebration).

---

BUILD THIS AS AN MVP FIRST, THEN WE WILL LAYER IN FEATURES.

MVP SCOPE:
1. Home page with search + categories
2. Listing creation flow with AI description generation
3. Search results page with filters
4. Listing detail page
5. User auth (signup/login)
6. Basic user profile + my listings
7. Messaging between buyer and seller
8. Stripe payment integration (Buy Now flow)
9. Photo upload
10. Location-based search (suburb/postcode)

PHASE 2 (after MVP validation):
- Dolphi Ship integration
- Vertical-specific pages (Property, Motors, Jobs)
- TrustScore system
- Business dashboard + analytics
- Featured listing / Bump Up monetization
- Cross-platform aggregation (Gumtree, eBay display)
- Push notifications
- Mobile app wrapper (React Native or PWA)

Please start by confirming you understand the full spec and suggest the best architecture and file structure for this project. Then let's begin with the home page.
```

---

### 3.2 Staged Follow-Up Prompts (Use In Sequence)

Once Shipper has confirmed the spec and proposed an architecture, use these prompts in order:

**Prompt 2 — Home Page**
```
Build the Dolphi home page. It should feel premium and Australian — clean, coastal, light. Include: full hero with the universal search bar (location-aware), category icons with emoji or SVG icons for Property / Motors / Jobs / Services / Marketplace / Community, a "New Near You" listing card grid (use placeholder data for now), a "How Dolphi Works" 3-step section, and trust metrics strip. Make it mobile-first. Use the brand colours I defined (#1A9FD4, #F9F5F0, #FF6B47) and DM Sans font.
```

**Prompt 3 — Listing Creation Flow**
```
Build the listing creation flow as a multi-step form wizard. There should be 9 steps as specified: item description/photo upload → AI pre-fill → edit details → add more photos → set price type → location + shipping preference → cross-list options → preview → publish with celebration animation. The AI step should call an AI endpoint: when a user uploads a photo or types a description, it generates a title, description, category, condition, and price suggestion. Make this feel magical — it should be Dolphi's "wow" feature. Show a loading spinner with text like "Dolphi AI is writing your listing..." while it processes.
```

**Prompt 4 — Search & Listings**
```
Build the search results page and listing detail page. Search results: left sidebar filters (price, location, category, condition, date, verified only), responsive card grid showing listing photo, title, price, suburb, time posted, and a small platform badge. Include map view toggle using Google Maps. Listing detail: full photo gallery, price, seller info card with TrustScore and DolphiVerified badge, "Buy Now" and "Message Seller" buttons, item details table, and similar listings section. Make all interactions feel smooth — hover effects, transitions, button feedback.
```

**Prompt 5 — Auth & Profiles**
```
Build the authentication system (signup, login, Google OAuth) and user profile pages. Signup should collect: name, email, password, suburb/postcode, phone (optional). Profile page should show: avatar, name, location, TrustScore, reviews, active listings grid. Private dashboard should show tabbed navigation: My Listings / Purchases / Messages / Saved / Settings. Settings should allow: edit profile info, change password, notification preferences, verify email/phone.
```

**Prompt 6 — Messaging**
```
Build the real-time messaging system. It should look and feel like a mobile chat app (WhatsApp-inspired). Each conversation thread is linked to a specific listing — show the listing card at the top of the conversation. Include quick-reply buttons: "Is this still available?", "Can you do [price]?", "Can I pick up this weekend?". Build an offer flow: buyer sends offer amount → seller sees "Accept / Counter / Decline" options → counter offer → buyer accepts/declines → if accepted, "Proceed to Payment" button appears.
```

**Prompt 7 — Payments**
```
Integrate Stripe for the Dolphi Pay flow. When a buyer clicks "Buy Now": show order summary, allow payment method selection (card, Apple Pay, Google Pay), show escrow explanation ("Your payment is held safely until you confirm receipt"), Stripe checkout, post-payment order tracking page. Build the seller side: pending payout shows in dashboard, "Payment will be released in 24h after delivery confirmation". Include a simple dispute button. Keep it reassuring and trustworthy — the UI should communicate safety at every step.
```

**Prompt 8 — Polish & Launch Readiness**
```
Now polish the entire app for launch readiness. Things to do:
1. Add loading skeletons on all data-fetching pages
2. Add empty states for: no search results, no messages, no listings yet
3. Add error states for: failed photo upload, payment failure, location not found
4. Ensure all buttons have loading states
5. Add subtle micro-animations: card hover lift, button press, listing publish celebration confetti, new message pulse
6. Add SEO meta tags to all pages
7. Make all pages fully responsive from 320px (small mobile) to 1440px (large desktop)
8. Add a "Report Listing" modal
9. Add footer with: About, Sell on Dolphi, Safety, Help, Contact, Terms, Privacy
10. Add a simple onboarding tooltip tour for first-time users
Give me a summary of all changes made and flag anything that needs manual attention.
```

---

### 3.3 Designer Mood Board Notes for Shipper

When Shipper asks about design preferences, use this language:

> "The aesthetic should feel like a premium Australian lifestyle brand — think the visual language of Airbnb crossed with Gumtree's friendliness and the clarity of Apple's design. Lots of white space, photography-forward (listings should look beautiful), rounded and approachable UI, with a coastal colour palette that feels distinctly Australian without being kitsch. The app should feel like it was built by people who love Australia and care deeply about the experience. Think: summer morning, open markets, good coffee. Fast, clean, trustworthy."

---

## PART 4: COMPETITIVE MOAT — WHY DOLPHI WINS

The following are Dolphi's durable competitive advantages that are hard to replicate:

**1. The Aggregation Flywheel**
Every platform Dolphi aggregates from (Gumtree, eBay, Facebook) drives traffic TO Dolphi. Users come to Dolphi because it has more listings than any single platform. As Dolphi's native listings grow, the aggregation becomes less important — but it bootstraps the supply problem at launch.

**2. The AI Listing Moat**
As more listings are created through "List with Dolphi AI", Dolphi accumulates the richest training data for Australian marketplace AI — pricing models, category taxonomies, description quality. This compounds over time into a category-specific AI advantage no competitor can quickly replicate.

**3. The Trust Infrastructure**
DolphiVerified + TrustScore + Dolphi Pay escrow creates a safer marketplace than Facebook or Gumtree can offer. Scam victims from those platforms become Dolphi's most vocal advocates.

**4. The Integrated Commerce Stack**
By owning Pay + Ship + Listings, Dolphi has significantly higher switching costs than classifieds-only platforms. Once sellers and buyers use Dolphi Pay and Dolphi Ship, moving back to unstructured classifieds is a step backward.

**5. The Cultural Identity**
Like TradeMe in NZ, Dolphi should become a cultural institution. "Dolphi it" becomes a verb. "I found it on Dolphi" becomes a phrase. Community features, local notices, free stuff, and skill swaps create emotional attachment beyond commerce.

---

*End of Dolphi Strategy & Shipper Build Prompt Document*
*Prepared for: Moe | Dolphi Project | March 2026*
