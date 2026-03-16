import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const adminClient = createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { businessName, website, industry, phone, state } = await request.json()

  // Generate a URL-safe slug from business name
  const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36)

  // Create tenant
  const { data: tenant, error: tenantError } = await adminClient.from('tenants').insert({
    name: businessName,
    slug,
    website,
    industry,
    phone,
    location: state,
    plan: 'trial',
    plan_status: 'trialing',
  }).select().single()

  if (tenantError) return NextResponse.json({ error: tenantError.message }, { status: 500 })

  // Create user profile
  const { error: profileError } = await adminClient.from('user_profiles').insert({
    id: user.id,
    tenant_id: tenant.id,
    email: user.email!,
    full_name: user.user_metadata?.full_name,
    role: 'owner',
  })

  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 })

  return NextResponse.json({ tenant }, { status: 201 })
}
