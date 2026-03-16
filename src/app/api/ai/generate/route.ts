import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateCampaignContent } from '@/lib/ai'
import { GenerateContentRequest } from '@/lib/types'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json() as GenerateContentRequest

  // Validate required fields
  if (!body.brief || !body.channels?.length) {
    return NextResponse.json({ error: 'brief and channels are required' }, { status: 400 })
  }

  const content = await generateCampaignContent(body)
  return NextResponse.json({ content })
}
