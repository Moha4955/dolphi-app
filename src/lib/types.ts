export type Plan = 'trial' | 'starter' | 'growth' | 'business' | 'agency'
export type PlanStatus = 'active' | 'past_due' | 'canceled' | 'trialing'
export type CampaignStatus = 'draft' | 'scheduled' | 'live' | 'paused' | 'completed'
export type Channel = 'social' | 'email' | 'blog' | 'seo' | 'ads'
export type Platform = 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'google_business'
export type Role = 'owner' | 'marketer' | 'viewer'

export interface Tenant {
  id: string
  name: string
  slug: string
  website?: string
  industry?: string
  plan: Plan
  plan_status: PlanStatus
  trial_ends_at?: string
  stripe_customer_id?: string
  logo_url?: string
  is_internal: boolean
  created_at: string
}

export interface UserProfile {
  id: string
  tenant_id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: Role
}

export interface Campaign {
  id: string
  tenant_id: string
  name: string
  goal: string
  status: CampaignStatus
  brief?: string
  target_audience?: string
  tone?: string
  budget_aud?: number
  start_date?: string
  end_date?: string
  primary_keyword?: string
  channels: Channel[]
  created_at: string
}

export interface ContentPiece {
  id: string
  tenant_id: string
  campaign_id?: string
  channel: Channel
  content_type: string
  platform?: string
  subject_line?: string
  preview_text?: string
  body: string
  meta_title?: string
  meta_description?: string
  keywords?: string[]
  ai_generated: boolean
  approved: boolean
  published: boolean
  created_at: string
}

export interface SocialAccount {
  id: string
  tenant_id: string
  platform: Platform
  account_name: string
  account_avatar?: string
  is_active: boolean
  connected_at: string
}

export const PLAN_LIMITS: Record<Plan, {
  campaigns: number
  aiCredits: number
  emailContacts: number
  socialPlatforms: number
  teamMembers: number
  accountingIntegration: boolean
  whiteLabel: boolean
  blogPublisher: boolean
  priceMonthly: number
  priceAnnual: number
  label: string
}> = {
  trial: {
    campaigns: 1, aiCredits: 10, emailContacts: 100, socialPlatforms: 2,
    teamMembers: 1, accountingIntegration: false, whiteLabel: false, blogPublisher: false,
    priceMonthly: 0, priceAnnual: 0, label: 'Free Trial'
  },
  starter: {
    campaigns: 3, aiCredits: 30, emailContacts: 500, socialPlatforms: 2,
    teamMembers: 1, accountingIntegration: false, whiteLabel: false, blogPublisher: false,
    priceMonthly: 49, priceAnnual: 470, label: 'Starter'
  },
  growth: {
    campaigns: -1, aiCredits: -1, emailContacts: 5000, socialPlatforms: 4,
    teamMembers: 3, accountingIntegration: false, whiteLabel: false, blogPublisher: true,
    priceMonthly: 129, priceAnnual: 1238, label: 'Growth'
  },
  business: {
    campaigns: -1, aiCredits: -1, emailContacts: 25000, socialPlatforms: 5,
    teamMembers: 10, accountingIntegration: true, whiteLabel: false, blogPublisher: true,
    priceMonthly: 249, priceAnnual: 2390, label: 'Business'
  },
  agency: {
    campaigns: -1, aiCredits: -1, emailContacts: -1, socialPlatforms: 5,
    teamMembers: -1, accountingIntegration: true, whiteLabel: true, blogPublisher: true,
    priceMonthly: 499, priceAnnual: 4790, label: 'Agency'
  },
}

export interface GenerateContentRequest {
  campaignId: string
  brief: string
  goal: string
  targetAudience: string
  tone: string
  primaryKeyword: string
  channels: Channel[]
  businessName: string
  website?: string
}

export interface GenerateContentResponse {
  social?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    tiktok?: string
  }
  email?: {
    subject: string
    previewText: string
    body: string
  }[]
  blog?: {
    title: string
    body: string
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
  seo?: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
  ads?: {
    headline1: string
    headline2: string
    headline3: string
    description1: string
    description2: string
  }
}
