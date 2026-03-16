import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const supabase = createAdminClient()

  const { error } = await supabase.from('lead_captures').insert({
    business_name: body.businessName,
    email: body.email,
    phone: body.phone,
    website: body.website,
    industry: body.industry,
    source: 'landing_page',
    utm_source: body.utm_source,
    utm_medium: body.utm_medium,
    utm_campaign: body.utm_campaign,
  })

  if (error) {
    console.error('Lead capture error:', error)
    // Still return 200 to not expose errors to frontend
  }

  return NextResponse.json({ ok: true })
}
