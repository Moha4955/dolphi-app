# Deploying Dolphi — Step by Step Guide (No DevOps Required)

## Overview

This guide walks you through deploying Dolphi, the AI-powered marketing campaign platform, to production. We're deploying:

- **Next.js app** → Vercel (cloud platform for Next.js)
- **PostgreSQL database** → Supabase (managed database + authentication)
- **Billing** → Stripe (payment processing)
- **Transactional emails** → Resend (email API)
- **AI content generation** → Anthropic (Claude API)

**Estimated cost:** $0 to start (all services offer free tiers) | ~$25/month when you hit 100+ paying customers

**Estimated time:** 45 minutes first time through

---

## Prerequisites

Before starting, make sure you have these accounts set up (all free):

- A GitHub account (free at [github.com](https://github.com))
- A Supabase account (free at [supabase.com](https://supabase.com))
- A Vercel account (free at [vercel.com](https://vercel.com))
- A Stripe account (free at [stripe.com](https://stripe.com), live mode when you're ready for real customers)
- An Anthropic account + API key (get at [console.anthropic.com](https://console.anthropic.com))
- A Resend account (free at [resend.com](https://resend.com))

---

## Step 1: Set Up Supabase (the Database)

Supabase is your PostgreSQL database + authentication layer. All your campaigns, users, and content will live here.

1. **Create a new project**
   - Go to [supabase.com](https://supabase.com) and sign in
   - Click "New Project"
   - Project name: `dolphi-prod`
   - Region: "Sydney" (closest to Australian customers)
   - Set a strong database password and **save it somewhere safe** (you won't see it again)
   - Click "Create new project" and wait ~2 minutes for it to provision

2. **Copy your API credentials**
   - Once the project loads, go to Settings → API
   - Copy and save these three values:
     - `Project URL` (looks like `https://xxxxx.supabase.co`)
     - `anon public key` (starts with `eyJ...`)
     - `service_role secret` (starts with `eyJ...`, keep this private!)

3. **Initialize the database schema**
   - Go to SQL Editor → New query
   - Open the file `supabase/migrations/001_initial_schema.sql` in this repo
   - Copy the entire contents and paste it into the SQL editor
   - Click "Run"
   - You should see "Success. No rows returned"

4. **Enable email authentication**
   - Go to Authentication → Providers
   - Find "Email" and toggle it on
   - Keep the default settings

---

## Step 2: Set Up Stripe (Billing)

Stripe handles all payment processing. You'll create 4 plans with monthly and annual pricing.

1. **Create a Stripe account**
   - Go to [stripe.com](https://stripe.com)
   - Click "Sign up" and complete the setup
   - For now, use "Test mode" (you'll switch to Live mode when ready to accept real payments)

2. **Create your 4 pricing plans**
   - Go to Products → Add product
   - Create each of these (you'll do this 8 times total: 4 plans × 2 billing periods):

   **Monthly Plans:**
   - Product name: `Dolphi Starter` → Pricing model: Recurring → Price: `$49 AUD/month` → Copy the Price ID
   - Product name: `Dolphi Growth` → Price: `$129 AUD/month` → Copy the Price ID
   - Product name: `Dolphi Business` → Price: `$249 AUD/month` → Copy the Price ID
   - Product name: `Dolphi Agency` → Price: `$499 AUD/month` → Copy the Price ID

   **Annual Plans (20% discount):**
   - Product name: `Dolphi Starter Annual` → Price: `$470 AUD/year` → Copy the Price ID
   - Product name: `Dolphi Growth Annual` → Price: `$1,242 AUD/year` → Copy the Price ID
   - Product name: `Dolphi Business Annual` → Price: `$2,390 AUD/year` → Copy the Price ID
   - Product name: `Dolphi Agency Annual` → Price: `$4,788 AUD/year` → Copy the Price ID

3. **Get your API keys**
   - Go to Developers → API Keys
   - Copy your `Secret key` (starts with `sk_test_...`)
   - Copy your `Publishable key` (starts with `pk_test_...`)

4. **Set up webhooks** (you'll finish this after deploying to Vercel)
   - Go to Developers → Webhooks
   - Click "Add endpoint"
   - Endpoint URL: leave blank for now (you'll come back after Vercel deployment)
   - Click "Select events"
   - Check these three events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Click "Add endpoint"
   - Copy the `Signing secret` (starts with `whsec_...`)

---

## Step 3: Get Anthropic API Key

Claude will generate your marketing content.

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in to your account
3. Click "API Keys" in the left sidebar
4. Click "Create Key"
5. Copy the key and keep it safe

---

## Step 4: Get Resend API Key

Resend sends transactional emails (password resets, campaign notifications, etc.).

1. Go to [resend.com](https://resend.com)
2. Sign up and verify your email
3. Go to "API Keys" in the sidebar
4. Click "Create API Key"
5. Copy the key
6. (Optional) Go to "Domains" and add your custom domain (e.g., `noreply@dolphi.com.au`)
   - Follow the DNS verification steps

---

## Step 5: Deploy to Vercel

Vercel is the easiest way to deploy Next.js apps. They auto-scale, handle SSL certificates, and integrate with GitHub.

1. **Push your code to GitHub** (if you haven't already)
   ```bash
   git init
   git add .
   git commit -m "Initial Dolphi commit"
   git remote add origin https://github.com/YOUR_USERNAME/dolphi-app.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

2. **Create a Vercel project**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Click "Import Project from GitHub"
   - Find and select your `dolphi-app` repository
   - Click "Import"

3. **Configure environment variables**
   - Vercel will show you the "Configure Project" step
   - Click "Environment Variables"
   - Add all of these (use the values you collected above):
     ```
     NEXT_PUBLIC_APP_URL=https://your-app.vercel.app (you'll know this URL after first deploy)
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret
     STRIPE_SECRET_KEY=sk_test_xxxxx
     STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
     STRIPE_WEBHOOK_SECRET=whsec_xxxxx
     STRIPE_PRICE_STARTER_MONTHLY=price_xxxxx
     STRIPE_PRICE_STARTER_ANNUAL=price_xxxxx
     STRIPE_PRICE_GROWTH_MONTHLY=price_xxxxx
     STRIPE_PRICE_GROWTH_ANNUAL=price_xxxxx
     STRIPE_PRICE_BUSINESS_MONTHLY=price_xxxxx
     STRIPE_PRICE_BUSINESS_ANNUAL=price_xxxxx
     STRIPE_PRICE_AGENCY_MONTHLY=price_xxxxx
     STRIPE_PRICE_AGENCY_ANNUAL=price_xxxxx
     ANTHROPIC_API_KEY=your_api_key
     RESEND_API_KEY=your_api_key
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app (takes ~2 minutes)
   - Once deployed, you'll see your live URL (e.g., `https://dolphi-app.vercel.app`)
   - Copy this URL and update `NEXT_PUBLIC_APP_URL` environment variable in Vercel settings, then redeploy

---

## Step 6: Connect Stripe Webhook to Vercel

Now that you have a live URL, connect your Stripe webhook.

1. Go back to [stripe.com](https://stripe.com) → Developers → Webhooks
2. Find the webhook endpoint you created earlier
3. Edit it and set the URL to: `https://YOUR-VERCEL-URL.vercel.app/api/stripe/webhook`
   - Replace `YOUR-VERCEL-URL` with your actual Vercel domain
4. Copy the new `Signing secret`
5. Go back to Vercel → Settings → Environment Variables
6. Update `STRIPE_WEBHOOK_SECRET` with the new secret
7. Click "Redeploy" to redeploy with the updated secret

---

## Step 7: Set Up Your Custom Domain

(Optional but recommended)

1. Go to your domain registrar (GoDaddy, Namecheap, etc.) and note your domain name
2. In Vercel → Settings → Domains
3. Click "Add Domain"
4. Enter your domain (e.g., `dolphi.com.au`)
5. Vercel will show you the DNS records to add in your registrar
6. Go to your registrar and add the DNS records Vercel provides
7. Wait 10–30 minutes for DNS to propagate
8. Vercel will automatically get an SSL certificate for you

---

## Step 8: Create Dolphi as Your First Tenant (Dogfood)

Use your own platform to test everything.

1. Go to your live Dolphi app (e.g., `https://dolphi-app.vercel.app`)
2. Sign up with your email
3. Complete the onboarding form:
   - Business name: "Dolphi Australia"
   - Website: "dolphi.com.au"
   - Industry: "Software"
   - Phone: your number
   - State: your state
4. Click "Complete Onboarding"

5. (Optional) Mark yourself as internal in Supabase:
   - Go to Supabase SQL Editor
   - Run this query:
     ```sql
     UPDATE tenants
     SET is_internal = true, plan = 'agency'
     WHERE slug LIKE 'dolphi%';
     ```
   - This marks you as an internal user and gives you the Agency plan for free testing

---

## Step 9: Test Everything End-to-End

1. **Test the campaign builder:**
   - Go to Campaigns → New Campaign
   - Select channels (e.g., Social Media + Email)
   - Fill in campaign details
   - Let AI generate content
   - Review and launch
   - Check that the campaign appears in your database

2. **Test authentication:**
   - Sign out
   - Sign back in with your email
   - Verify the login flow works

3. **Test Stripe (in test mode):**
   - Go to Settings → Billing
   - Click on a plan to upgrade
   - Use Stripe's test card: `4242 4242 4242 4242`
   - Expiry: any future date (e.g., `12/25`)
   - CVC: any 3 digits (e.g., `123`)
   - Click "Subscribe"
   - Verify the webhook fires and your plan updates in the database

4. **Check logs:**
   - Vercel: Settings → Functions → view logs
   - Supabase: Database → Logs
   - Stripe: Developers → Events (should see `checkout.session.completed`)

---

## Step 10: Monitor & Scale

**Daily/Weekly Checks:**
- Vercel dashboard: check function errors and response times
- Supabase dashboard: check database usage and slow queries
- Stripe dashboard: monitor revenue and failed payments
- Email logs: ensure transactional emails are being delivered

**Performance:**
- If your database gets slow, upgrade your Supabase plan
- If you exceed Vercel's free tier (1000 function invocations/day), upgrade to Pro
- Monitor Anthropic API usage (you pay per token)

**Backup:**
- Supabase automatically backs up your database daily
- Download backups periodically: Settings → Backups

---

## Troubleshooting

### "Unauthorized" errors when calling Supabase

**Problem:** Your app returns 401 errors when trying to fetch data.

**Fix:**
1. Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct in Vercel env vars
2. Verify your Supabase project is running (not paused)
3. Check RLS (Row-Level Security) policies aren't blocking queries:
   - Go to Supabase → Authentication → Policies
   - If you see overly strict policies, update them to allow your authenticated users

### Stripe webhook not firing

**Problem:** Subscription updates in Stripe don't update your database.

**Fix:**
1. Verify webhook URL is correct: `https://YOUR-APP.vercel.app/api/stripe/webhook`
2. Check the webhook is enabled and listening to the right events
3. In Stripe → Developers → Events, look for "Failed" events and click them to see error details
4. Test locally with Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   stripe trigger checkout.session.completed
   ```

### Environment variables not updating

**Problem:** You updated an env var in Vercel but your app still uses the old value.

**Fix:** You must **redeploy** for env vars to take effect:
- Go to Vercel → Deployments → find the latest
- Click the three dots → "Redeploy"

### "Rate limit exceeded" from Anthropic

**Problem:** You hit Claude's rate limits.

**Fix:**
1. Add a delay between concurrent requests (e.g., 1 second)
2. Upgrade your Anthropic plan if you're generating content for many users at once
3. Cache generated content so you don't re-generate the same campaign twice

### Database connection pooling issues

**Problem:** Your app runs out of database connections during peak load.

**Fix:**
1. In Supabase Settings → Database → Connection pooling
2. Enable PgBouncer with Pool Mode = Transaction
3. Set max pool size to 10–20
4. Update your connection string to use the pool endpoint

---

## Monthly Cost at Different Scales

| Scale | Supabase | Vercel | Stripe (3.5%) | Anthropic | Resend | **Total** |
|-------|----------|--------|---------------|-----------|---------|-----------|
| 0–100 users | Free | Free | $0 | $50 | Free | **~$50** |
| 100–1,000 users | $25 | Free | ~$350 | $150 | $25 | **~$550** |
| 1,000–5,000 users | $100 | $20 | ~$1,750 | $400 | $100 | **~$2,370** |
| 5,000–10,000 users | $200 | $50 | ~$3,500 | $800 | $200 | **~$4,750** |

---

## Next Steps After Deployment

1. **Send your first campaign to your 48,000 business list**
   - Create an email list in the Email Marketing section
   - Import your CSV of 48K prospects
   - Create a campaign introducing Dolphi
   - Offer a free 14-day trial with no credit card required
   - Track opens, clicks, and sign-ups in the Campaign Tracker

2. **Set up marketing**
   - Add Google Analytics to track conversions
   - Set up landing page A/B tests
   - Create case studies from early customers

3. **Gather feedback**
   - Export leads from your 48K campaign
   - Call the interested ones and ask what they need
   - Update your product roadmap based on feedback

4. **Scale up**
   - Once you hit 10+ paying customers, upgrade from trial to paid Stripe plan
   - Switch Stripe to "Live mode" to accept real payments
   - Monitor unit economics and iterate pricing if needed

---

## Support

- **Supabase docs:** [supabase.com/docs](https://supabase.com/docs)
- **Vercel docs:** [vercel.com/docs](https://vercel.com/docs)
- **Stripe docs:** [stripe.com/docs](https://stripe.com/docs)
- **Anthropic docs:** [docs.anthropic.com](https://docs.anthropic.com)
- **Resend docs:** [resend.com/docs](https://resend.com/docs)

---

**Good luck shipping Dolphi! 🚀**
