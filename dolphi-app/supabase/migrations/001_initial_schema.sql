-- ═══════════════════════════════════════════════════════════════
-- DOLPHI MARKETING SUITE — Initial Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ═══════════════════════════════════════════════════════════════

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_crypt";

-- ─────────────────────────────────────────────
-- 1. TENANTS (one row per business account)
-- ─────────────────────────────────────────────
CREATE TABLE tenants (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              text NOT NULL,
  slug              text UNIQUE NOT NULL,           -- used in URLs
  website           text,
  industry          text,
  location          text DEFAULT 'Australia',
  abn               text,                           -- Australian Business Number
  phone             text,
  timezone          text DEFAULT 'Australia/Sydney',
  logo_url          text,
  plan              text NOT NULL DEFAULT 'trial'
                    CHECK (plan IN ('trial','starter','growth','business','agency')),
  plan_status       text NOT NULL DEFAULT 'active'
                    CHECK (plan_status IN ('active','past_due','canceled','trialing')),
  trial_ends_at     timestamptz DEFAULT (now() + interval '14 days'),
  stripe_customer_id text UNIQUE,
  stripe_sub_id     text UNIQUE,
  is_internal       boolean DEFAULT false,          -- TRUE for Dolphi (Tenant #0001)
  is_demo           boolean DEFAULT false,
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 2. USERS (belong to a tenant)
-- ─────────────────────────────────────────────
CREATE TABLE user_profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id   uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email       text NOT NULL,
  full_name   text,
  avatar_url  text,
  role        text NOT NULL DEFAULT 'owner'
              CHECK (role IN ('owner','marketer','viewer')),
  created_at  timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 3. CAMPAIGNS
-- ─────────────────────────────────────────────
CREATE TABLE campaigns (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id     uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name          text NOT NULL,
  goal          text NOT NULL DEFAULT 'awareness'
                CHECK (goal IN ('awareness','leads','traffic','sales','engagement')),
  status        text NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft','scheduled','live','paused','completed')),
  brief         text,
  target_audience text,
  tone          text DEFAULT 'friendly',
  budget_aud    numeric(10,2),
  start_date    date,
  end_date      date,
  primary_keyword text,
  channels      text[] DEFAULT '{}',               -- e.g. ['social','email','seo','ads']
  created_by    uuid REFERENCES user_profiles(id),
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 4. CONTENT PIECES (AI-generated per campaign)
-- ─────────────────────────────────────────────
CREATE TABLE content_pieces (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id      uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  campaign_id    uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  channel        text NOT NULL CHECK (channel IN ('social','email','blog','seo','ads')),
  content_type   text NOT NULL,                    -- 'facebook_post', 'email_subject', 'blog_post', etc.
  platform       text,                             -- 'facebook', 'instagram', 'linkedin', 'tiktok'
  subject_line   text,                             -- for emails
  preview_text   text,                             -- for emails
  body           text NOT NULL,
  meta_title     text,                             -- for SEO/blog
  meta_description text,                           -- for SEO/blog
  keywords       text[],
  ai_generated   boolean DEFAULT true,
  approved       boolean DEFAULT false,
  approved_at    timestamptz,
  approved_by    uuid REFERENCES user_profiles(id),
  published      boolean DEFAULT false,
  published_at   timestamptz,
  created_at     timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 5. SOCIAL ACCOUNTS (OAuth connections)
-- ─────────────────────────────────────────────
CREATE TABLE social_accounts (
  id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id           uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  platform            text NOT NULL CHECK (platform IN ('facebook','instagram','linkedin','tiktok','google_business')),
  platform_account_id text NOT NULL,
  account_name        text,
  account_avatar      text,
  access_token        text NOT NULL,               -- stored encrypted via Supabase Vault in production
  refresh_token       text,
  token_expires_at    timestamptz,
  is_active           boolean DEFAULT true,
  connected_at        timestamptz DEFAULT now(),
  UNIQUE(tenant_id, platform, platform_account_id)
);

-- ─────────────────────────────────────────────
-- 6. SCHEDULED POSTS
-- ─────────────────────────────────────────────
CREATE TABLE scheduled_posts (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id        uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  campaign_id      uuid REFERENCES campaigns(id) ON DELETE SET NULL,
  content_id       uuid REFERENCES content_pieces(id) ON DELETE CASCADE,
  social_account_id uuid REFERENCES social_accounts(id) ON DELETE CASCADE,
  platform         text NOT NULL,
  caption          text NOT NULL,
  image_url        text,
  scheduled_at     timestamptz NOT NULL,
  sent_at          timestamptz,
  status           text NOT NULL DEFAULT 'scheduled'
                   CHECK (status IN ('draft','scheduled','sent','failed','cancelled')),
  platform_post_id text,                           -- ID returned by social API after publish
  error_message    text,
  created_at       timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 7. EMAIL LISTS & SUBSCRIBERS
-- ─────────────────────────────────────────────
CREATE TABLE email_lists (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id        uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name             text NOT NULL,
  description      text,
  subscriber_count integer DEFAULT 0,
  created_at       timestamptz DEFAULT now()
);

CREATE TABLE email_subscribers (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id       uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  list_id         uuid REFERENCES email_lists(id) ON DELETE CASCADE,
  email           text NOT NULL,
  first_name      text,
  last_name       text,
  status          text DEFAULT 'active' CHECK (status IN ('active','unsubscribed','bounced')),
  source          text,                            -- 'landing_page', 'import', 'manual'
  subscribed_at   timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  UNIQUE(tenant_id, email)
);

-- ─────────────────────────────────────────────
-- 8. EMAIL CAMPAIGNS (sends)
-- ─────────────────────────────────────────────
CREATE TABLE email_sends (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id       uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  campaign_id     uuid REFERENCES campaigns(id) ON DELETE SET NULL,
  content_id      uuid REFERENCES content_pieces(id),
  list_id         uuid REFERENCES email_lists(id),
  subject_line    text NOT NULL,
  from_name       text,
  scheduled_at    timestamptz,
  sent_at         timestamptz,
  status          text DEFAULT 'draft' CHECK (status IN ('draft','scheduled','sending','sent','failed')),
  recipient_count integer DEFAULT 0,
  opens           integer DEFAULT 0,
  unique_opens    integer DEFAULT 0,
  clicks          integer DEFAULT 0,
  unique_clicks   integer DEFAULT 0,
  unsubscribes    integer DEFAULT 0,
  bounces         integer DEFAULT 0,
  created_at      timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 9. SEO KEYWORDS
-- ─────────────────────────────────────────────
CREATE TABLE seo_keywords (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id       uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  keyword         text NOT NULL,
  target_url      text,
  current_rank    integer,
  best_rank       integer,
  prev_rank       integer,
  search_volume   integer,
  difficulty      text CHECK (difficulty IN ('low','medium','high')),
  last_checked_at timestamptz,
  tracked_since   timestamptz DEFAULT now(),
  UNIQUE(tenant_id, keyword)
);

-- ─────────────────────────────────────────────
-- 10. BLOG POSTS
-- ─────────────────────────────────────────────
CREATE TABLE blog_posts (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id        uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  campaign_id      uuid REFERENCES campaigns(id) ON DELETE SET NULL,
  title            text NOT NULL,
  slug             text NOT NULL,
  body_html        text,
  body_text        text,
  featured_image   text,
  meta_title       text,
  meta_description text,
  focus_keyword    text,
  tags             text[] DEFAULT '{}',
  seo_score        integer CHECK (seo_score BETWEEN 0 AND 100),
  status           text DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  published_at     timestamptz,
  word_count       integer DEFAULT 0,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

-- ─────────────────────────────────────────────
-- 11. ACCOUNTING CONNECTIONS
-- ─────────────────────────────────────────────
CREATE TABLE accounting_connections (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id         uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  provider          text NOT NULL CHECK (provider IN ('xero','myob','quickbooks','stripe')),
  company_id        text,
  company_name      text,
  access_token      text NOT NULL,
  refresh_token     text,
  token_expires_at  timestamptz,
  last_sync_at      timestamptz,
  sync_status       text DEFAULT 'idle' CHECK (sync_status IN ('idle','syncing','error','ok')),
  error_message     text,
  connected_at      timestamptz DEFAULT now(),
  UNIQUE(tenant_id, provider)
);

-- ─────────────────────────────────────────────
-- 12. ANALYTICS EVENTS (raw event log)
-- ─────────────────────────────────────────────
CREATE TABLE analytics_events (
  id            bigserial PRIMARY KEY,
  tenant_id     uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  campaign_id   uuid REFERENCES campaigns(id) ON DELETE SET NULL,
  channel       text,
  event_type    text NOT NULL,                     -- 'reach','click','lead','open','impression'
  platform      text,
  value         numeric DEFAULT 1,
  metadata      jsonb DEFAULT '{}',
  recorded_at   timestamptz DEFAULT now()
) PARTITION BY RANGE (recorded_at);

-- Create monthly partitions for 2026
CREATE TABLE analytics_events_2026_01 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE analytics_events_2026_02 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
CREATE TABLE analytics_events_2026_03 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
CREATE TABLE analytics_events_2026_04 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE analytics_events_2026_05 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE analytics_events_2026_06 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE analytics_events_2026_07 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE analytics_events_2026_08 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
CREATE TABLE analytics_events_2026_09 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');
CREATE TABLE analytics_events_2026_10 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-10-01') TO ('2026-11-01');
CREATE TABLE analytics_events_2026_11 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-11-01') TO ('2026-12-01');
CREATE TABLE analytics_events_2026_12 PARTITION OF analytics_events
  FOR VALUES FROM ('2026-12-01') TO ('2027-01-01');

-- ─────────────────────────────────────────────
-- 13. LEAD CAPTURES (from landing page opt-ins)
-- ─────────────────────────────────────────────
CREATE TABLE lead_captures (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name   text,
  email           text NOT NULL,
  phone           text,
  website         text,
  industry        text,
  employees       text,
  source          text DEFAULT 'landing_page',
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  converted       boolean DEFAULT false,          -- true when they sign up
  tenant_id       uuid REFERENCES tenants(id),    -- linked when they convert
  notes           text,
  created_at      timestamptz DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════
-- INDEXES (for performance at scale)
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX idx_user_profiles_tenant_id ON user_profiles(tenant_id);
CREATE INDEX idx_campaigns_tenant_id ON campaigns(tenant_id);
CREATE INDEX idx_campaigns_status ON campaigns(tenant_id, status);
CREATE INDEX idx_content_pieces_campaign ON content_pieces(campaign_id);
CREATE INDEX idx_content_pieces_tenant ON content_pieces(tenant_id);
CREATE INDEX idx_scheduled_posts_tenant ON scheduled_posts(tenant_id);
CREATE INDEX idx_scheduled_posts_scheduled_at ON scheduled_posts(scheduled_at) WHERE status = 'scheduled';
CREATE INDEX idx_email_subscribers_tenant ON email_subscribers(tenant_id);
CREATE INDEX idx_email_subscribers_list ON email_subscribers(list_id);
CREATE INDEX idx_seo_keywords_tenant ON seo_keywords(tenant_id);
CREATE INDEX idx_blog_posts_tenant ON blog_posts(tenant_id);
CREATE INDEX idx_analytics_tenant_campaign ON analytics_events(tenant_id, campaign_id);
CREATE INDEX idx_lead_captures_email ON lead_captures(email);
CREATE INDEX idx_lead_captures_converted ON lead_captures(converted);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (the multi-tenancy safety net)
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE tenants               ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns             ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_pieces        ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_lists           ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers     ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sends           ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_keywords          ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events      ENABLE ROW LEVEL SECURITY;

-- Helper function: get current user's tenant_id
CREATE OR REPLACE FUNCTION get_my_tenant_id()
RETURNS uuid AS $$
  SELECT tenant_id FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- RLS Policies: users can only see their own tenant's data
CREATE POLICY "tenant_isolation" ON tenants
  FOR ALL USING (id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON user_profiles
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON campaigns
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON content_pieces
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON social_accounts
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON scheduled_posts
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON email_lists
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON email_subscribers
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON email_sends
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON seo_keywords
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON blog_posts
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON accounting_connections
  FOR ALL USING (tenant_id = get_my_tenant_id());

CREATE POLICY "tenant_isolation" ON analytics_events
  FOR ALL USING (tenant_id = get_my_tenant_id());

-- ═══════════════════════════════════════════════════════════════
-- FUNCTIONS & TRIGGERS
-- ═══════════════════════════════════════════════════════════════

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tenants_updated BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_campaigns_updated BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_blog_posts_updated BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create user_profile when a new auth user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Note: tenant_id is set after onboarding; handled in app code
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Keep subscriber count in sync
CREATE OR REPLACE FUNCTION update_subscriber_count()
RETURNS trigger AS $$
BEGIN
  UPDATE email_lists
  SET subscriber_count = (
    SELECT count(*) FROM email_subscribers
    WHERE list_id = COALESCE(NEW.list_id, OLD.list_id) AND status = 'active'
  )
  WHERE id = COALESCE(NEW.list_id, OLD.list_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_subscriber_count
AFTER INSERT OR UPDATE OR DELETE ON email_subscribers
FOR EACH ROW EXECUTE FUNCTION update_subscriber_count();

-- ═══════════════════════════════════════════════════════════════
-- SEED: Dolphi as Tenant #0001 (internal dogfood account)
-- Run separately after auth setup — replace USER_UUID with actual user
-- ═══════════════════════════════════════════════════════════════
-- INSERT INTO tenants (id, name, slug, website, industry, plan, is_internal, is_demo)
-- VALUES (
--   'a0000000-0000-0000-0000-000000000001',
--   'Dolphi Australia',
--   'dolphi',
--   'https://dolphi.com.au',
--   'Marketing Technology',
--   'agency',
--   true,
--   true
-- );
