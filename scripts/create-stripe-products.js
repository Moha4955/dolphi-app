/**
 * Dolphi — Stripe Product & Price Setup Script
 * Run once to create all subscription products and prices in Stripe.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-stripe-products.js
 */

const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

const plans = [
  {
    name: 'Dolphi Starter',
    description: 'Perfect for solo operators and micro-businesses. Up to 3 campaigns/month.',
    monthlyPrice: 4900,   // $49 AUD
    annualPrice:  47000,  // $470 AUD (2 months free)
    metadata: { plan: 'starter' },
  },
  {
    name: 'Dolphi Growth',
    description: 'For growing businesses ready to scale across all channels. Up to 15 campaigns/month.',
    monthlyPrice: 14900,  // $149 AUD
    annualPrice:  143000, // $1,430 AUD
    metadata: { plan: 'growth' },
  },
  {
    name: 'Dolphi Business',
    description: 'For established businesses with serious marketing needs. Unlimited campaigns.',
    monthlyPrice: 34900,  // $349 AUD
    annualPrice:  335000, // $3,350 AUD
    metadata: { plan: 'business' },
  },
  {
    name: 'Dolphi Agency',
    description: 'For agencies managing multiple clients. White-label ready, unlimited everything.',
    monthlyPrice: 99900,  // $999 AUD
    annualPrice:  959000, // $9,590 AUD
    metadata: { plan: 'agency' },
  },
];

async function setup() {
  console.log('🐬 Creating Dolphi Stripe products and prices...\n');

  const priceIds = {};

  for (const plan of plans) {
    // Create product
    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description,
      metadata: plan.metadata,
    });
    console.log(`✅ Product created: ${plan.name} (${product.id})`);

    // Monthly price
    const monthly = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.monthlyPrice,
      currency: 'aud',
      recurring: { interval: 'month' },
      metadata: { plan: plan.metadata.plan, billing: 'monthly' },
    });
    console.log(`   💳 Monthly price: ${monthly.id} ($${plan.monthlyPrice / 100}/mo)`);

    // Annual price
    const annual = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.annualPrice,
      currency: 'aud',
      recurring: { interval: 'year' },
      metadata: { plan: plan.metadata.plan, billing: 'annual' },
    });
    console.log(`   💳 Annual price:  ${annual.id} ($${plan.annualPrice / 100}/yr)\n`);

    priceIds[plan.metadata.plan] = {
      monthly: monthly.id,
      annual: annual.id,
    };
  }

  console.log('─────────────────────────────────────────────');
  console.log('Add these to your Vercel environment variables:\n');
  for (const [plan, ids] of Object.entries(priceIds)) {
    const upper = plan.toUpperCase();
    console.log(`STRIPE_PRICE_${upper}_MONTHLY=${ids.monthly}`);
    console.log(`STRIPE_PRICE_${upper}_ANNUAL=${ids.annual}`);
  }
  console.log('\n✅ Done! Copy the price IDs above into Vercel → Settings → Environment Variables');
}

setup().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
