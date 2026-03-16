import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ campaigns: data })
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Get user's tenant_id
  const { data: profile } = await supabase.from('user_profiles').select('tenant_id').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const body = await request.json()
  const { campaign, content } = body

  // Insert campaign
  const { data: newCampaign, error: campError } = await supabase.from('campaigns').insert({
    ...campaign,
    tenant_id: profile.tenant_id,
    created_by: user.id,
  }).select().single()

  if (campError) return NextResponse.json({ error: campError.message }, { status: 500 })

  // Insert content pieces if provided
  if (content && Object.keys(content).length > 0) {
    const pieces = []
    if (content.social) {
      for (const [platform, body] of Object.entries(content.social)) {
        if (body) pieces.push({ tenant_id: profile.tenant_id, campaign_id: newCampaign.id, channel: 'social', content_type: `${platform}_post`, platform, body })
      }
    }
    if (content.email?.length) {
      content.email.forEach((e: any, i: number) => {
        pieces.push({ tenant_id: profile.tenant_id, campaign_id: newCampaign.id, channel: 'email', content_type: `email_${i+1}`, subject_line: e.subject, preview_text: e.previewText, body: e.body })
      })
    }
    if (content.blog) {
      pieces.push({ tenant_id: profile.tenant_id, campaign_id: newCampaign.id, channel: 'blog', content_type: 'blog_post', body: content.blog.body, meta_title: content.blog.metaTitle, meta_description: content.blog.metaDescription, keywords: content.blog.keywords })
    }
    if (content.seo) {
      pieces.push({ tenant_id: profile.tenant_id, campaign_id: newCampaign.id, channel: 'seo', content_type: 'seo_meta', meta_title: content.seo.metaTitle, meta_description: content.seo.metaDescription, keywords: content.seo.keywords, body: content.seo.metaDescription })
    }
    if (content.ads) {
      pieces.push({ tenant_id: profile.tenant_id, campaign_id: newCampaign.id, channel: 'ads', content_type: 'ad_copy', body: JSON.stringify(content.ads) })
    }
    if (pieces.length) await supabase.from('content_pieces').insert(pieces)
  }

  return NextResponse.json({ campaign: newCampaign }, { status: 201 })
}
