import Stripe from 'stripe'
import { Plan } from './types'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

export const PRICE_IDS: Record<Plan, { monthly: string; annual: string }> = {
  trial:    { monthly: '', annual: '' },
  starter:  { monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY!, annual: process.env.STRIPE_PRICE_STARTER_ANNUAL! },
  growth:   { monthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY!, annual: process.env.STRIPE_PRICE_GROWTH_ANNUAL! },
  business: { monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY!, annual: process.env.STRIPE_PRICE_BUSINESS_ANNUAL! },
  agency:   { monthly: process.env.STRIPE_PRICE_AGENCY_MONTHLY!, annual: process.env.STRIPE_PRICE_AGENCY_ANNUAL! },
}

export async function createCheckoutSession({
  customerId,
  priceId,
  tenantId,
  successUrl,
  cancelUrl,
}: {
  customerId?: string
  priceId: string
  tenantId: string
  successUrl: string
  cancelUrl: string
}) {
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { tenant_id: tenantId },
    },
    metadata: { tenant_id: tenantId },
    success_url: successUrl,
    cancel_url: cancelUrl,
    billing_address_collection: 'required',
    tax_id_collection: { enabled: true },   // for ABN/GST
    currency: 'aud',
    allow_promotion_codes: true,
  })
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}
