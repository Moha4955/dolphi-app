import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createCheckoutSession, PRICE_IDS } from '@/lib/stripe'
import { Plan } from '@/lib/types'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan, billing } = await request.json() as { plan: Plan, billing: 'monthly' | 'annual' }
  const priceId = billing === 'annual' ? PRICE_IDS[plan].annual : PRICE_IDS[plan].monthly
  if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

  const { data: profile } = await supabase.from('user_profiles').select('tenant_id').eq('id', user.id).single()
  const { data: tenant } = await supabase.from('tenants').select('stripe_customer_id').eq('id', profile?.tenant_id).single()

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const session = await createCheckoutSession({
    customerId: tenant?.stripe_customer_id,
    priceId,
    tenantId: profile?.tenant_id!,
    successUrl: `${baseUrl}/settings?billing=success`,
    cancelUrl: `${baseUrl}/settings`,
  })

  return NextResponse.json({ url: session.url })
}
