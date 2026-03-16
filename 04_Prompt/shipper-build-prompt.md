# DOLPHI — SUPER ENHANCED BUILD PROMPT FOR SHIPPER
*Version 1.0 | March 2026*

---

## MASTER PROMPT

You are building **Dolphi** — Australia's most trusted all-of-life marketplace app. Think: Dubizzle (UAE) + TradeMe (New Zealand) + the trust and safety infrastructure that Facebook Marketplace lacks, rebuilt natively for Australia with AI at its core.

Dolphi is not a classifieds board. It is a **full-stack marketplace ecosystem** — a single destination where Australians buy, sell, discover, and connect across every category of their lives: everyday goods, vehicles, property, jobs, services, and local community — all protected by verified identity, AI-powered safety, and built-in buyer protection payments.

Build this as a **world-class, production-ready mobile-first application** with the following architecture, features, design system, and product flows. Do not cut corners. Think through every edge case. This is designed to be the next major Australian consumer platform.

---

## SECTION 1: CORE ARCHITECTURE & TECHNICAL STACK

### Platform
- **Primary**: Native mobile app (iOS + Android) — this is a mobile-first product
- **Secondary**: Responsive web application (same feature parity)
- **Backend**: RESTful API + real-time WebSocket layer (for chat and notifications)
- **Database**: PostgreSQL (relational) + Redis (caching + sessions) + Elasticsearch (search)
- **File Storage**: AWS S3 or equivalent (images, videos, documents)
- **Real-time**: WebSocket or Socket.io for live chat and notifications
- **Search**: Elasticsearch with geospatial indexing (location-aware search is critical)
- **AI/ML**: OpenAI Vision API (or equivalent) for listing generation; custom models for safety
- **Payments**: Stripe Connect (for marketplace split payments, escrow, payouts)
- **Identity Verification**: Integration with Australian digital ID (e.g. GreenID, Veriff, or IDMatrix)
- **Maps**: Google Maps or Mapbox (location picking, suburb search, "near me" features)
- **Push Notifications**: Firebase Cloud Messaging (FCM) for Android, APNs for iOS
- **Analytics**: Mixpanel or Amplitude (user behaviour) + custom admin dashboard

### Data Models (Core Entities)
```
User {
  id, email, phone, full_name, username, avatar_url,
  verification_status (unverified | phone_verified | id_verified),
  verification_badge_type (none | verified | pro | dealer | agent),
  dolphi_score (float 0-5), total_reviews, total_sales, total_purchases,
  location (suburb, state, postcode, lat/lng),
  joined_at, last_active_at, is_business, business_name,
  stripe_customer_id, stripe_connect_account_id,
  notification_preferences, privacy_settings
}

Listing {
  id, user_id, category_id, subcategory_id, title, description,
  condition (new | like_new | good | fair | for_parts),
  price, price_type (fixed | negotiable | free | auction | contact),
  currency (AUD), images[url], video_url,
  location (suburb, state, postcode, lat/lng, display_precision),
  status (draft | active | sold | expired | removed),
  views, saves, enquiries,
  is_featured, is_verified_listing, is_boosted,
  boost_expires_at, expires_at,
  ai_generated (bool), ai_confidence_score,
  attributes (JSON — category-specific structured data),
  tags[], moderation_status, moderation_notes,
  created_at, updated_at, sold_at
}

Category {
  id, name, slug, parent_id, icon, image,
  attributes_schema (JSON — defines structured fields for this category),
  listing_fee, boost_pricing, is_featured_category
}

Message / Conversation {
  id, listing_id, buyer_id, seller_id,
  messages[{id, sender_id, body, type(text|image|system|offer),
            offer_amount, is_read, sent_at, safety_flagged}],
  status (active | archived | blocked),
  last_message_at
}

Transaction {
  id, listing_id, buyer_id, seller_id,
  amount, platform_fee, stripe_payment_intent_id,
  status (pending | paid | in_transit | completed | disputed | refunded),
  buyer_protection_eligible, delivery_method (pickup | shipping),
  tracking_number, tracking_carrier,
  buyer_confirmed_at, auto_release_at,
  dispute_id, created_at
}

Review {
  id, transaction_id, reviewer_id, reviewee_id, listing_id,
  rating (1-5), title, body, is_buyer_review,
  response_body, response_at,
  created_at, is_removed
}

SavedSearch {
  id, user_id, name, filters (JSON), notification_frequency,
  last_notified_at, new_results_count
}

Report {
  id, reporter_id, listing_id | user_id | message_id,
  reason_code, description, status, resolved_by, resolved_at
}
```

---

## SECTION 2: DESIGN SYSTEM

### Brand Identity
- **App Name**: Dolphi
- **Tagline**: "Buy, sell, and discover — safely."
- **Logo**: A stylised dolphin leaping through a circle — represents speed, intelligence, trust, Australiana

### Colour Palette
```
Primary:        #0D7E9C  (Ocean Teal — trust, depth, Australian coastal)
Primary Light:  #E8F6F9  (Teal Wash — backgrounds, cards)
Secondary:      #F5A623  (Warm Amber — energy, optimism, CTAs)
Accent:         #FF6B4A  (Coral — urgent CTAs, badges, notifications)
Success:        #27AE60  (Green — verified, completed, safe)
Warning:        #F39C12  (Amber — flags, warnings)
Error:          #E74C3C  (Red — errors, scam alerts)
Neutral-900:    #1A1A2E  (Near-black text)
Neutral-600:    #6B7280  (Secondary text)
Neutral-200:    #E5E7EB  (Borders, dividers)
Neutral-50:     #F9FAFB  (Page backgrounds)
White:          #FFFFFF
```

### Typography
```
Display:   Inter or Poppins — Bold 32-48px — headlines, hero text
H1:        Semibold 24px
H2:        Semibold 20px
H3:        Semibold 17px
Body:      Regular 15px — line height 1.6
Body SM:   Regular 13px — metadata, secondary info
Caption:   Regular 11px — timestamps, labels
Monospace: 13px — prices, codes
```

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

### Component Library (Build These)
- Button (Primary / Secondary / Ghost / Destructive / Icon-only)
- Input (Text / Search / Textarea / Dropdown / Chips multi-select)
- Card (Listing Card / User Card / Category Card / Transaction Card)
- Badge (Verified / Pro / Dealer / New / Sale / Featured)
- Avatar (with status indicator, with badge overlay)
- Bottom Sheet / Modal
- Toast / Snackbar notifications
- Skeleton loaders (all major layouts)
- Price display (AUD currency format, strikethrough for reduced price)
- Star Rating (display + interactive input)
- Image Gallery (swipeable, pinch-zoom, thumbnail strip)
- Map Pin (custom styled, cluster support)
- Progress Steps (for listing creation, verification flows)
- Safety Banner (prominent warnings for unverified listings)

### Responsive Breakpoints
```
Mobile:  < 768px  (primary design target)
Tablet:  768-1024px
Desktop: > 1024px
```

### Motion & Animation
- List transitions: fade-up + stagger (50ms between items)
- Page transitions: slide left/right (native mobile feel)
- Skeleton → content: fade-in 200ms
- Pull-to-refresh: custom dolphin animation
- Loading state: Dolphi teal spinner
- Success states: checkmark with scale animation
- Error states: shake animation on invalid inputs

### Accessibility
- WCAG 2.1 AA minimum
- All interactive elements: 44x44px minimum tap target
- Focus indicators visible
- Screen reader labels on all icons
- Colour contrast ratio ≥ 4.5:1 for body text
- Support system font size preferences

---

## SECTION 3: APP SCREENS & FLOWS

### SCREEN 1: Onboarding
**Splash**: Dolphin animation, brand reveal, tagline
**Value Prop Slides** (3 slides, skip available):
1. "Buy with confidence" — verified sellers + buyer protection
2. "Sell in seconds" — AI-powered listing creation
3. "Everything in one place" — all categories, all of Australia

**Auth Screen**:
- Continue with Apple (iOS)
- Continue with Google
- Continue with phone number (SMS OTP)
- Email signup/login
- Guest browse (limited — push to account on first action)

**Phone Verification**: Enter mobile → 6-digit OTP → verify
**Profile Setup**: Name, profile photo, suburb/postcode (location picker with map)
**Interest Selection**: Pick categories you're interested in (pre-seeds the feed)

---

### SCREEN 2: Home / Discovery Feed
**Top Bar**: Dolphi logo | Location pill (suburb name, tappable) | Notifications bell (badge count) | Search icon
**Hero Search Bar**: Prominent, full-width, placeholder: "Search anything near you..."

**Quick Category Grid** (2x4 horizontal scroll):
Icons for: All | Cars | Property | Electronics | Furniture | Fashion | Sports | Free Items

**DolphiFeed** (primary content):
- Personalised listing cards based on location + history
- "New near you" section (listings within 5km posted in last 24 hours)
- "Trending in [Suburb]" section
- Sponsored listing cards (clearly labelled "Sponsored")
- "Because you viewed X" recommendations
- Pull-to-refresh

**Listing Card Component**:
- Primary image (16:9, lazy loaded)
- Save/heart button (top right of image)
- Verified badge overlay (bottom left of image, if applicable)
- Title (2 lines max, truncate)
- Price (bold, coral for reduced price)
- Distance + suburb + time ago
- Condition badge
- DolphiPay eligible icon (if seller has DolphiPay enabled)

**Bottom Navigation**:
- Home (feed icon)
- Search (magnifier)
- Sell (large teal + button, centre — most prominent)
- Messages (chat bubble + unread badge)
- Profile (avatar)

---

### SCREEN 3: Search & Filters
**Search Interface**:
- Full-screen search with keyboard immediately open
- Recent searches (last 5)
- Trending searches
- Category quick-filters (scrollable chips)

**Results Page**:
- Count: "1,234 results in Sydney"
- Sort: Most Relevant | Newest | Price Low-High | Price High-Low | Nearest
- Filter button (opens bottom sheet)
- Toggle: List view | Grid view | Map view
- Each result: listing card + distance

**Filter Bottom Sheet** (category-aware, dynamically populated):
- Location: radius slider (1km → 100km → National)
- Price: min/max range inputs
- Condition: chips (Any | New | Like New | Good | Fair)
- Posting type: All | DolphiPay | Pickup Only | Delivery Available | Free
- Seller type: All | Verified Only | Businesses | Private sellers
- Category-specific: e.g. Vehicles → Make / Model / Year / Km / Body Type
- Date posted: Any | Today | Last 7 days | Last 30 days
- Apply button with live result count update

**Map View**:
- Listings as clustered pins on map (custom dolphin-coloured markers)
- Tap pin → listing card preview (bottom sheet)
- Tap card → full listing
- Map pans as you scroll; pins update

**Saved Searches**:
- After search → "Save this search" prompt
- Notification settings: Instant | Daily digest | Weekly digest | Off

---

### SCREEN 4: Listing Detail
**Image Gallery**:
- Full-width swipeable images
- Pinch-to-zoom
- Thumbnail strip
- Image count (3/7)
- Report button (top right)
- Share button (top right)
- Back button (top left)

**Listing Info**:
- Title (H1)
- Price (large, bold) + negotiable indicator
- DolphiPay eligible badge (if applicable)
- Condition badge + condition description
- Location pill (suburb + distance)
- Time posted + views count
- Description (expandable, "Show more")

**Key Actions Bar** (sticky at bottom):
- Save/Heart button
- "Message Seller" (opens chat)
- "Buy with DolphiPay" (if eligible — primary CTA, coral button)
- "Make Offer" (secondary)

**Seller Card**:
- Avatar + verified badge
- Display name
- DolphiScore (stars + count): "4.8 ★ (127 reviews)"
- Member since + total sales
- Response time: "Usually replies within 1 hour"
- View Profile button

**Safety Banner** (conditionally shown):
- If seller unverified: Yellow banner "This seller is not yet verified. Use DolphiPay for added protection."
- If listing auto-flagged: Red banner "Our AI flagged this listing for review. Proceed with caution."
- Always visible: "Tips to buy safely" expandable section

**Similar Listings**: Horizontal scroll of related items

**Map**: Mini-map showing general pickup area (not exact address until deal agreed)

---

### SCREEN 5: DolphiSnap — AI Listing Creation
**Entry**: Tap "Sell" in bottom nav → camera/photo picker

**Step 1 — Photo Upload**:
- Camera: tap to capture, swipe for multiple
- Gallery picker: multi-select (up to 20 photos)
- Drag to reorder photos
- Auto-enhance toggle (brightness/contrast AI fix)
- Video option (up to 60 seconds)

**Step 2 — AI Processing** (2-3 second animation):
- "Dolphi is analysing your item..."
- Animated dolphin + scanning effect on the photo
- Progress indicator

**Step 3 — AI Suggestions Review**:
- Title (AI-generated, editable): "Apple iPhone 14 Pro 256GB Space Black"
- Category (AI-selected with confidence): "Electronics > Mobile Phones" ✓
- Condition (AI-assessed): "Good — minor screen scratches detected"
- Price suggestion: "Similar items sold for AUD 650–800. We suggest AUD 720."
  - Price range bar showing where your item sits in market
  - "Price it to sell" toggle → auto-sets to lower quartile
- Description (AI-drafted, editable): Full paragraph auto-generated

**Step 4 — Details**:
- Category-specific structured fields auto-populated (edit as needed)
- Attributes: brand, model, colour, storage, etc.
- Condition: chips (new / like new / good / fair / for parts)
- Price type: Fixed | Negotiable | Make Offer | Free

**Step 5 — Listing Options**:
- Transaction type: Local Pickup | Shipping | Both
- Location: auto-filled from profile, editable (precision: suburb only by default)
- DolphiPay: Enable/Disable toggle (strongly incentivised — "Sell 3x faster with DolphiPay")
- Listing duration: 30 days | 60 days | Until sold
- Boost options: Feature this listing (AUD 4.99 / 9.99 / 19.99 with preview of visibility increase)

**Step 6 — Review & Publish**:
- Preview exactly how listing looks to buyers
- Edit any field
- "Publish Listing" (coral CTA)
- Success screen: listing live, share sheet, "Create another" option

---

### SCREEN 6: DolphiChat — Messaging
**Conversation List**:
- Sorted by latest activity
- Each row: listing thumbnail | listing title | buyer/seller name | last message preview | time
- Unread indicator (bold + dot)
- Filter: Buying | Selling | All

**Conversation View**:
- Header: listing thumbnail + title + price | back
- Messages: bubbles (sender right teal, receiver left grey)
- Message types:
  - Text
  - Image (tappable, full-screen)
  - System message: "Transaction started via DolphiPay"
  - Offer: styled offer card — "Offered AUD 680" with Accept/Counter/Decline
  - Safety alert: red banner "Our AI detected a suspicious link in this message"
- Input bar: text field | image attach | offer icon | send
- "Quick Replies" chips above keyboard on first message: "Is this still available?" | "What's the condition?" | "Can you do [location]?"
- AI-suggested questions based on listing (appears on first open)

**Offer Flow**:
- Buyer taps offer icon → modal: slider or numeric input, "Reason (optional)"
- Offer card in chat with 24-hour expiry countdown
- Seller: Accept → triggers DolphiPay checkout | Counter → new offer | Decline → message
- Accepted offer locks in price, initiates payment flow

**Safety Features**:
- AI scans every message for malicious URLs, QR codes, phishing patterns
- "Request to meet safely" button → opens DolphiMeet feature (public place suggestions near both users)
- Block & Report: long-press on message or profile header

---

### SCREEN 7: DolphiPay — Checkout & Payments
**Initiate Payment** (from listing or accepted offer):
- Order summary card: listing image | title | condition | price | seller name/verified badge
- Delivery selection: Local Pickup (date/time picker + meetup suggestions) | Post/Shipping (address entry)
- Payment method: Saved card | New card (Stripe Card Element) | Apple Pay | Google Pay | Afterpay | Zip
- Platform fee disclosure: "Buyer service fee: AUD X.XX"
- Total breakdown: item + service fee
- Buyer Protection badge: "Protected up to AUD 2,000 by Dolphi"
- Terms checkbox + "Pay Securely" button

**Payment Processing**:
- Stripe 3DS handled inline
- Loading state → success animation (dolphin + checkmark)
- Push notification to seller: "You have a new order!"

**Order Status Tracking**:
- Timeline: Order placed → Seller confirmed → In transit / Pickup arranged → Delivered → Complete
- For shipping: tracking number entry by seller, real-time tracking via AfterShip API
- For pickup: meeting arranged confirmation, tap-to-confirm meetup (geo-verified)
- Countdown: "Funds auto-release to seller in 5 days if no dispute raised"

**Buyer Confirm Receipt**:
- "I've received the item" button → triggers fund release to seller
- Optional: Leave review (prompted immediately)
- Or: "I have a problem" → opens dispute flow

**Dispute Flow**:
- Reason selector: Item not received | Not as described | Significant defect | Wrong item
- Photo upload of issue
- Timeline: Dolphi reviews within 2 business days
- Resolution options: Full refund | Partial refund | Keep item at agreed price

---

### SCREEN 8: User Profile & DolphiVerify
**Own Profile**:
- Large avatar + name
- Verification badges (Verified / Pro / DolphiScore)
- Stats: X sales | Y purchases | Member since
- DolphiScore: star rating + review count
- Tabs: Active Listings | Sold | Reviews | Saved

**DolphiVerify Flow** (prompted after first sale or listing):
1. "Verify your identity to sell faster and earn buyer trust"
   - Stats: "Verified sellers get 3x more enquiries"
2. Select ID type: Australian Driver Licence | Passport | Medicare + Licence
3. Capture ID (front + back where applicable) — camera with guides
4. Liveness check: follow the dot / blink / turn head (anti-spoofing)
5. Processing: "Verifying your identity — usually takes 2 minutes"
6. Success: Blue dolphin tick badge appears on profile
7. Option: Link bank account for faster seller payouts (Stripe Connect)

**DolphiScore / Reviews Tab**:
- Overall score with star breakdown (5/4/3/2/1 distribution bar)
- Filter: As Seller | As Buyer
- Each review: avatar + name + listing thumbnail + star + text + date
- Seller's response (if added)
- "Add a response" button (seller only, one response per review)

**Other User's Profile** (when tapping a seller):
- Avatar + name + verified badge
- DolphiScore prominent
- Stats: total sales, member since, response rate, response time
- Active listings (scroll)
- Reviews
- Report / Block options

---

### SCREEN 9: Saved & Watchlist
- Tabs: Saved Items | Saved Searches | Collections
- Saved Items: listing cards with "Still available" / "Sold" / "Price reduced" overlay
- Price drop alerts: "Price dropped AUD 50 since you saved this"
- Saved Searches: list with "X new results" badge + notification settings
- Collections: user-created wishlists (name, cover image) — shareable link

---

### SCREEN 10: Notifications Centre
- Grouped by type: Activity | Price Drops | Messages | Orders | System
- Each notification: icon + title + body + timestamp + tappable deep link
- Mark all read
- Notification preferences (per-type toggles) accessible from gear icon

---

### SCREEN 11: Categories Browser
- Vertical category list with icons
- Tap to expand subcategories
- Featured category banners (editorial, seasonal)
- "Explore more" → full category tree

**Vehicle-Specific Pages**: DolphiSpec condition report, VIN lookup, PPSR check link, financing calculator
**Property-Specific Pages**: DolphiEstimate AVM, suburb price history, floor plan upload, open home times
**Jobs Pages**: CV builder, one-tap apply, company profiles, salary benchmarks

---

### SCREEN 12: DolphiNeighbours (Community Layer)
- Suburb selector (defaults to user's suburb)
- Post types: Marketplace | Free Items | Recommendations | Events | Lost & Found | Q&A
- Neighbour feed (posts from within 5km radius)
- Post creation: type selector → title → body → optional image → location (postcode auto)
- Upvote/downvote + comments
- Verified local badge (must have verified address to post)
- No doxxing: exact address never shown

---

### SCREEN 13: Seller Dashboard (DolphiPro)
- Overview stats: Active listings | Total views | Enquiries | Sales this month | Revenue
- Performance chart (30/60/90 day toggle)
- Listings management table: status, views, enquiries, actions
- Bulk actions: relist, edit, mark sold, delete
- Boost manager: active boosts + expiry + ROI
- Review management
- Payout history + bank account settings
- Subscription management

---

### SCREEN 14: Settings & Safety
- Account: email, phone, password, social connections
- Notifications: per-type granular controls
- Privacy: listing location precision, profile visibility, blocked users
- Safety: active sessions, 2FA, data download
- DolphiPay: payment methods, payout account, transaction history
- Help & Support: FAQ, live chat, report abuse
- About: terms, privacy policy, feedback

---

## SECTION 4: ADVANCED FEATURES

### DolphiSearch Aggregation Engine
When a user searches and there are fewer than 20 native results:
- Query Facebook Marketplace API / Gumtree sitemap (where legally permitted via scraping or partnerships)
- Display external results clearly labelled "External listing — not covered by Dolphi Protect"
- External results shown after native results, separated by a divider
- Clicking external: in-app browser → deep link to source OR prompt "List this on Dolphi for protection"
- Track conversion: % of users who post on Dolphi after viewing external → measure aggregation value

### Cross-Platform Syndication
When creating a listing, optional toggle: "Also post to:"
- Facebook Marketplace (OAuth connection required, uses FB Marketplace API)
- Gumtree (API partnership or OAuth)
- eBay Australia (eBay developer API, for eligible categories)
Dolphi is the source of truth. Enquiries from other platforms forward into DolphiChat.

### DolphiEstimate (Property AVM)
- Input: address
- Output: estimated value range (buy + rent), comparable sales (last 12 months), suburb trend chart, days on market average
- Data sources: CoreLogic API (commercial), RP Data, ABS suburb data
- Shown on all property listings automatically
- API product for mortgage brokers, conveyancers, insurers (B2B revenue)

### AI Listing Assistant (Extended)
- Real-time price comp: as user types a price, show "X similar items recently sold for AUD Y–Z"
- Smart title suggestions as user types
- Description enhancement: "Improve my description" button → AI rewrites for clarity and SEO
- Tag generation: AI suggests 5–10 relevant search tags
- Keyword optimisation score: 1–100 "listing quality score" with tips to improve

### DolphiMeet — Safe Meetup Planner
- Triggered from chat: "Arrange a safe meetup"
- Shows 3 nearby safe meetup suggestions (police stations, shopping centre customer service desks, cafes with high foot traffic)
- Both parties confirm time + location in-app
- Meetup reminder notification (1 hour before)
- "I'm safe" confirmation post-meetup (mutual)
- No-show reporting

### DolphiAI Scam Detection
- Every listed image is scanned: reverse image search against known scam asset databases
- Every listing description scanned for: advance fee patterns, shipping-only scams, overpayment fraud scripts, fake check schemes
- Every chat message scanned for: suspicious URLs, QR code images, unusual payment requests (Venmo, gift cards, crypto)
- Confidence scoring: listings with high scam probability automatically hidden, flagged for human review within 4 hours
- User warning: "A buyer/seller has been flagged by our system. Proceed with caution." with tips
- Automated suspension for confirmed bad actors

### Auction Mechanics (Phase 2 — for Collectibles / High Value)
- Reserve price (hidden or disclosed, seller's choice)
- Starting bid + increment rules
- Auto-bidding up to buyer's maximum
- Countdown timer (prominently displayed)
- Outbid notifications (push)
- Sniping protection: 5-minute extension if bid placed in final 5 minutes
- Reserve met indicator
- DolphiPay escrow: funds captured at bid, released at auction close

### DolphiPro Business Tools
- Bulk listing via CSV upload (with template download)
- API access for dealers/agents to push inventory directly
- Analytics: listing performance, conversion funnel, best posting times
- Automated relisting (expired listing auto-republished with one tap)
- Customer CRM: track enquiries, mark as contacted/converted
- Promotional tools: flash sale pricing, timed discount codes

---

## SECTION 5: AI SYSTEMS SPECIFICATION

### Model 1 — DolphiSnap (Listing Generation)
**Input**: 1–20 photos + optional brief voice/text note from seller
**Output**: Title, description, category prediction (with confidence), condition assessment, suggested price range, structured attribute values (make/model/year/colour/size etc.)
**Implementation**:
- Vision model (GPT-4o Vision or Claude claude-sonnet-4-6 API) for image analysis
- Category classifier trained on Dolphi listing taxonomy
- Price recommendation: trained on historical sold comps by category/condition/suburb
- Confidence score: if < 70%, show "AI wasn't sure — please confirm category"

### Model 2 — DolphiSafe (Content Moderation)
**Inputs**: Listing title, description, images, chat messages
**Outputs**: Safety score, flag categories, recommended action
**Flag categories**:
- Prohibited items (weapons, drugs, counterfeit goods — instant remove)
- Suspected scam (review + user warning)
- Misrepresentation (listing category mismatch — auto-recategorise + notify seller)
- Adult content (remove from default feed, mark restricted)
- Personally identifiable information leaked in listing (blur or flag)
**Implementation**: Custom fine-tuned classifier + regex rules + image hash matching (known scam assets)

### Model 3 — DolphiMatch (Recommendations)
**Inputs**: User browsing history, saved items, location, past purchases, price preferences, time of day
**Outputs**: Personalised feed ranking, "you might also like" shelf, smart price drop alerts
**Implementation**: Collaborative filtering + content-based filtering hybrid. Cold start handled by category interests set during onboarding.

### Model 4 — DolphiChat AI (Messaging Intelligence)
**Inputs**: Conversation history, listing data, user verification status
**Outputs**: Suggested quick-replies, smart auto-responses for away sellers, scam alert flags, AI-generated offer negotiation suggestions
**Implementation**: Contextual prompt with listing + conversation context; safety filters always applied

---

## SECTION 6: MONETISATION FLOWS

### For Sellers (Casual C2C)
- Listing is FREE. No success fee.
- Optional paid boosts at listing publish:
  - Bump to top: AUD 2.99 (24hr) / 4.99 (48hr)
  - Featured in category: AUD 9.99 / 7 days
  - Homepage spotlight: AUD 19.99 / 3 days
  - Urgent sale badge: AUD 4.99

### For Buyers (DolphiPay Transactions)
- Buyer service fee (only on DolphiPay, not cash transactions):
  - AUD 0–20: free
  - AUD 20.01–100: AUD 0.99
  - AUD 100.01–250: AUD 1.99
  - AUD 250.01–1000: AUD 4.99
  - AUD 1000+: AUD 9.99

### For Business Sellers (DolphiPro)
- Starter: AUD 49/mo — 50 active listings, analytics, Pro badge
- Growth: AUD 149/mo — unlimited listings, bulk tools, priority support
- Enterprise: Custom — API access, account manager, custom integration

### For Vehicles (Dealer)
- Dealer subscription: AUD 199/mo base + AUD 9.99/vehicle/month active
- Premium dealer: AUD 399/mo — featured dealer page, auto-promoted listings

### For Real Estate (Agents)
- Standard agent: AUD 249/agent/month — DolphiEstimate, enquiry CRM, profile
- Agency account: AUD 499/mo — all agents, branded agency page, market reports
- Project developer listings: Custom pricing

### For Jobs (Employers)
- Standard job post: AUD 99 / 30 days
- Featured job: AUD 249 / 30 days (homepage + category top)
- Company profile: AUD 199/mo
- Bulk packages: 5 posts for AUD 399

---

## SECTION 7: NOTIFICATION STRATEGY

### Push Notifications (high-value, never spam)
| Trigger | Title | Body |
|---|---|---|
| New message | "New message from [Name]" | "[Preview of message]" |
| Offer received | "You got an offer!" | "[Name] offered AUD [X] for [Listing]" |
| Item sold | "Congrats! [Listing] sold" | "Complete the sale via DolphiPay." |
| Saved search match | "New match for [Search]" | "X new items just listed near you." |
| Price drop | "[Listing] just got cheaper" | "Down from AUD X to AUD Y" |
| Listing about to expire | "Your listing expires in 3 days" | "Tap to relist [Listing]" |
| Payment received | "Payment received!" | "AUD X for [Listing] — funds pending." |
| Offer accepted | "[Name] accepted your offer!" | "Complete payment to secure [Listing]." |
| Dispute update | "Update on your dispute" | "Dolphi has reviewed your case..." |
| Verification prompt | "Verify to sell 3x faster" | "Add your ID to earn the verified badge." |

### Email Notifications
- Weekly digest of saved search new results (if no recent app opens)
- Transaction receipts
- Payment reminders
- Account security alerts (new login, password change)
- Never promotional (app pushes handle all promotional comms)

---

## SECTION 8: ADMIN & OPERATIONS DASHBOARD

Build a full web-based admin interface:

### Moderation Queue
- Flagged listings (AI-flagged + user-reported)
- Flagged users
- Open disputes
- Actions: approve | remove | warn user | suspend | ban
- Bulk actions
- Audit log (who did what, when)

### Analytics Dashboard
- DAU / MAU with trend chart
- Listings posted (by day, category, state)
- Transactions completed (volume + GMV)
- Dispute rate / resolution rate
- Verification rate
- Revenue breakdown (boosts / subscriptions / buyer fees)
- Churn by seller type
- Top categories by GMV
- Geographic heatmap

### User Management
- Search users by email/phone/ID
- View full profile + listing history + transaction history + review history
- Verification status + ID documents (restricted access — compliance only)
- Manual verification override
- Issue warnings, temporary suspension, permanent ban
- Notes/flags on accounts

### Content Management
- Featured listings curation
- Category banner management
- Homepage editorial slots
- Promoted search keywords

---

## SECTION 9: LEGAL & COMPLIANCE (AUSTRALIA-SPECIFIC)

Build the following into the platform from day one:

### Data & Privacy
- Privacy policy compliant with Australian Privacy Act 1988
- GDPR-equivalent controls (even though not legally required, build trust)
- Data export: users can download all their data (JSON)
- Data deletion: full account deletion with 30-day cooling off period
- Cookies: consent banner on web, functional-only by default
- No selling user data to third parties

### Marketplace Rules
- Prohibited items list (weapons, drugs, protected wildlife, stolen goods, counterfeit, etc.)
- Consumer guarantees: listings subject to Australian Consumer Law guarantees
- Business seller disclosure: auto-prompt for users with >10 sales/month to declare if trading in trade
- GST handling for B2C transactions (DolphiPro sellers)

### Identity & Financial
- AML/CTF compliance: transaction monitoring for structuring, high-risk patterns
- KYC for DolphiPro sellers: ABN verification + director ID check
- AUSTRAC reporting for high-value cash-equivalent transactions
- Stripe is the payment processor (handles PCI DSS compliance)

### Dispute Resolution
- Internal dispute resolution (Dolphi): first line
- External: Australian Financial Complaints Authority (AFCA) if applicable
- Terms of service: clear limitation of liability, dispute escalation paths

---

## SECTION 10: PERFORMANCE & SCALABILITY REQUIREMENTS

### Performance Targets
- App cold start: < 2 seconds
- Feed load (first 20 items): < 1 second
- Image load: progressive, < 500ms for thumbnail
- Search results: < 500ms (Elasticsearch)
- Chat message delivery: < 200ms (WebSocket)
- Payment checkout: < 3 seconds end-to-end

### Scalability Design
- Stateless API servers (horizontal scaling)
- CDN for all static assets and images (CloudFront or equivalent)
- Database read replicas for feed/search (write to primary, read from replicas)
- Redis cache for: session data, category trees, featured listings, user profile snapshots
- Elasticsearch index: listings (with geo, category, price facets)
- Message queue (SQS or equivalent) for: AI processing jobs, notifications, email sends
- Image processing pipeline: upload → S3 → Lambda resize (thumbnail, medium, full) → CloudFront

### Infrastructure
- Multi-region: primary ap-southeast-2 (Sydney) for data sovereignty compliance
- Auto-scaling groups for API servers
- RDS Multi-AZ for primary database
- Daily backups with 30-day retention
- Health monitoring: Datadog or equivalent
- Error tracking: Sentry
- Uptime target: 99.9% (< 9 hours downtime/year)

---

## SECTION 11: GROWTH & VIRALITY MECHANICS

Build these into the product:

1. **Referral Program**: "Give AUD 10, get AUD 10" — unique shareable link per user, AUD 10 Dolphi credit each direction when referred user completes first transaction

2. **First Sale Celebration**: Full-screen confetti animation when first sale completes → share to social media prompt ("I just sold my first item on Dolphi! 🐬")

3. **DolphiScore Milestones**: Unlock profile badges at 10 / 50 / 100 / 500 transactions — shareable

4. **Neighbourhood Leaderboard**: Most active sellers in each suburb (opt-in) — creates local competition

5. **Share Listing**: Every listing has a unique URL + Open Graph meta (rich preview on iMessage, WhatsApp, social) with one-tap "List one yourself" CTA at bottom of shared page

6. **Listing Expiry Emails**: "Your listing is about to expire — relist with one tap" (drives re-engagement)

7. **Price Drop Watching**: Any user who saved a listing gets a push notification when price drops — drives return visits

8. **Collections Sharing**: "I'm looking for these things" — shareable wishlist links that drive inbound offers

9. **Seller Stories**: DolphiPro sellers can post 24hr stories (like Instagram) showing new inventory — surfaces in feed

10. **"Make an Offer" Momentum**: If a listing has received an offer (even declined), show "X people interested" — social proof

---

## FINAL NOTES FOR THE BUILDER

This is not a minimum viable product brief. This is a **maximum viable product** brief — the full vision of what Dolphi should be from day one architecture-wise, even if not every screen ships in v1.

**Build priorities in order**:
1. Authentication + onboarding
2. Listing creation (DolphiSnap AI)
3. Feed + search
4. Listing detail page
5. DolphiChat messaging
6. DolphiPay (Stripe Connect integration)
7. User profiles + DolphiVerify
8. Review system
9. Saved searches + notifications
10. Admin moderation dashboard
11. DolphiNeighbours
12. DolphiSearch aggregation
13. Vertical-specific features (vehicles, property, jobs)
14. DolphiPro business tools
15. Auction mechanics

**Design philosophy**: Every screen should feel like it belongs in a top-tier consumer app (think Airbnb, Uber, Depop at their best). Whitespace is your friend. Trust is the brand. Speed is a feature. AI is invisible — it just makes everything easier.

**The single biggest competitive moat**: Trust. Everything — verified identities, buyer protection, AI safety, DolphiScore — serves this. Every product decision should be evaluated through the lens of: "Does this make transactions safer and more trustworthy?"

**The single biggest growth unlock**: Viral listings. Make every listing beautiful and shareable. Make the share action one tap. Make the shared page convert browsers into new users.

Now build it.

---
*Dolphi — Australia's most trusted marketplace. 🐬*
