himport { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const tenantId = session.metadata?.tenant_id
      if (tenantId && session.customer && session.subscription) {
        await supabase.from('tenants').update({
          stripe_customer_id: session.customer as string,
          stripe_sub_id: session.subscription as string,
          plan_status: 'active',
        }).eq('id', tenantId)
      }
      break
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const tenantId = sub.metadata?.tenant_id
      if (tenantId) {
        const priceId = sub.items.data[0]?.price.id
        // Map priceId back to plan name
        const planMap: Record<string, string> = {
          [process.env.STRIPE_PRICE_STARTER_MONTHLY!]: 'starter',
          [process.env.STRIPE_PRICE_STARTER_ANNUAL!]: 'starter',
          [process.env.STRIPE_PRICE_GROWTH_MONTHLY!]: 'growth',
          [process.env.STRIPE_PRICE_GROWTH_ANNUAL!]: 'growth',
          [process.env.STRIPE_PRICE_BUSINESS_MONTHLY!]: 'business',
          [process.env.STRIPE_PRICE_BUSINESS_ANNUAL!]: 'business',
          [process.env.STRIPE_PRICE_AGENCY_MONTHLY!]: 'agency',
          [process.env.STRIPE_PRICE_AGENCY_ANNUAL!]: 'agency',
        }
        await supabase.from('tenants').update({
          plan: planMap[priceId] || 'starter',
          plan_status: sub.status as string,
        }).eq('id', tenantId)
      }
      break
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const tenantId = sub.metadata?.tenant_id
      if (tenantId) {
        await supabase.from('tenants').update({ plan: 'trial', plan_status: 'canceled' }).eq('id', tenantId)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
