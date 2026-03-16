import Anthropic from '@anthropic-ai/sdk'
import { GenerateContentRequest, GenerateContentResponse } from './types'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateCampaignContent(
  req: GenerateContentRequest
): Promise<GenerateContentResponse> {
  const { brief, goal, targetAudience, tone, primaryKeyword, channels, businessName, website } = req

  const systemPrompt = `You are an expert Australian marketing copywriter for ${businessName}${website ? ` (${website})` : ''}.
You write authentic, high-converting marketing content that feels human and local to Australia.
Always use Australian English spelling. Use friendly, conversational language unless tone is specified otherwise.
Never sound robotic or generic. Focus on value, urgency, and clear calls to action.`

  const channelInstructions = channels.map(c => {
    switch(c) {
      case 'social': return `SOCIAL MEDIA: Write separate posts for Facebook (200-300 words, emojis, hashtags), Instagram (short punchy caption 100-150 chars + hashtags), LinkedIn (professional 100-150 words), TikTok (very casual, trendy, 80-100 chars).`
      case 'email':  return `EMAIL: Write 3-email sequence. Email 1 (launch): subject line + preview text + full body. Email 2 (day 10 reminder): subject + body. Email 3 (day 29 urgency): subject + body.`
      case 'blog':   return `BLOG: Write a full 1200-word SEO blog post. Include: H1 title, introduction, 5-7 H2 sections, conclusion, meta title (max 60 chars), meta description (max 160 chars), 5 target keywords.`
      case 'seo':    return `SEO METADATA: Write meta title (max 60 chars), meta description (max 160 chars), and 8 target keywords naturally related to "${primaryKeyword}".`
      case 'ads':    return `PAID ADS: Write Google/Meta ad copy: 3 headlines (max 30 chars each), 2 descriptions (max 90 chars each).`
      default: return ''
    }
  }).join('\n')

  const userPrompt = `
Campaign Brief: ${brief}
Business Goal: ${goal}
Target Audience: ${targetAudience}
Tone: ${tone}
Primary Keyword: ${primaryKeyword}

Generate the following content:
${channelInstructions}

Return ONLY valid JSON with this exact structure (only include keys for selected channels):
{
  "social": {
    "facebook": "post text here",
    "instagram": "caption here",
    "linkedin": "post here",
    "tiktok": "caption here"
  },
  "email": [
    { "subject": "...", "previewText": "...", "body": "..." },
    { "subject": "...", "previewText": "...", "body": "..." },
    { "subject": "...", "previewText": "...", "body": "..." }
  ],
  "blog": {
    "title": "...",
    "body": "full html blog post...",
    "metaTitle": "...",
    "metaDescription": "...",
    "keywords": ["kw1", "kw2", "kw3", "kw4", "kw5"]
  },
  "seo": {
    "metaTitle": "...",
    "metaDescription": "...",
    "keywords": ["kw1", "kw2", "kw3", "kw4", "kw5", "kw6", "kw7", "kw8"]
  },
  "ads": {
    "headline1": "...",
    "headline2": "...",
    "headline3": "...",
    "description1": "...",
    "description2": "..."
  }
}
`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  // Extract JSON from response (handles markdown code blocks)
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/(\{[\s\S]*\})/)
  const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text

  try {
    return JSON.parse(jsonStr) as GenerateContentResponse
  } catch {
    // Fallback: return raw text as a note
    return { social: { facebook: text } }
  }
}
