'use client'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle2, Zap, BarChart3, Globe, Mail, Search, Megaphone, ArrowRight, Star } from 'lucide-react'

const FEATURES = [
  { icon: Search,    title: 'SEO Tools',        desc: 'Keyword tracking, on-page audits, and rank monitoring.' },
  { icon: Globe,     title: 'Social Media',      desc: 'Schedule posts to Facebook, Instagram, LinkedIn & TikTok.' },
  { icon: Mail,      title: 'Email Marketing',   desc: 'Beautiful emails, automated sequences, open tracking.' },
  { icon: Megaphone, title: 'Blog & Content',    desc: 'AI writes SEO blogs and publishes to your website.' },
  { icon: BarChart3, title: 'Campaign Tracker',  desc: 'One dashboard for all channels — see ROI at a glance.' },
  { icon: Zap,       title: 'AI Content Engine', desc: 'Brief in → posts, emails, blog & ads out in 30 seconds.' },
]

const PRICING = [
  {
    name: 'Starter', price: 49, annual: 470, desc: 'Perfect for sole traders & side hustles',
    features: ['3 active campaigns', '2 social platforms', '500 email contacts', 'Basic SEO tools', '30 AI credits/month'],
    highlight: false, cta: 'Start Free Trial',
  },
  {
    name: 'Growth', price: 129, annual: 1238, desc: 'Most popular for growing businesses',
    features: ['Unlimited campaigns', 'All 4 platforms + TikTok', '5,000 email contacts', 'Full SEO + rank tracking', 'Unlimited AI content', 'Blog publisher'],
    highlight: true, cta: 'Start Free Trial',
  },
  {
    name: 'Business', price: 249, annual: 2390, desc: 'For established SMBs with a team',
    features: ['Everything in Growth', '25,000 email contacts', 'Xero / MYOB / QB integration', '10 team members', 'Paid ads integration', 'Priority support'],
    highlight: false, cta: 'Start Free Trial',
  },
  {
    name: 'Agency', price: 499, annual: 4790, desc: 'Manage multiple client accounts',
    features: ['Everything in Business', 'Up to 25 client accounts', 'White-label dashboard', 'Client PDF reports', 'API access', 'Dedicated account manager'],
    highlight: false, cta: 'Contact Us',
  },
]

const SOCIAL_PROOF = [
  { name: 'Sarah M.', biz: 'Plumbing business, Brisbane', stars: 5, quote: 'I used to spend $400/month on different tools. Dolphi does everything for $129.' },
  { name: 'James K.', biz: 'Café owner, Melbourne',       stars: 5, quote: 'First campaign went live in 8 minutes. 43 new leads in week one.' },
  { name: 'Lisa T.',  biz: 'Real estate, Perth',           stars: 5, quote: 'The AI writes better copy than I do. My email open rate jumped to 58%.' },
]

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [billing, setBilling] = useState<'monthly'|'annual'>('monthly')

  async function handleLeadCapture(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0D2B3E] text-white">
      {/* ── NAV ── */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center text-lg">🐬</div>
          <span className="font-bold text-xl">Dolphi</span>
          <span className="text-xs text-teal font-semibold tracking-widest uppercase ml-1">Australia</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing"  className="hover:text-white transition-colors">Pricing</a>
          <a href="#reviews"  className="hover:text-white transition-colors">Reviews</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors">Sign in</Link>
          <Link href="/signup" className="bg-teal hover:bg-teal-light transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg">
            Start Free →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block bg-teal/20 border border-teal/30 text-teal text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
          🇦🇺 Built for Australian Businesses
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
          Your Entire Marketing<br />
          <span className="gradient-text">Suite in One Place</span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          SEO, social media, email, blogs and paid ads — all powered by AI.
          Enter a brief, get everything generated in 30 seconds, go live in 10 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link href="/signup"
            className="bg-teal hover:bg-teal-light text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-teal/30">
            Start Free 14-Day Trial →
          </Link>
          <a href="#demo"
            className="border border-white/20 hover:border-white/40 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
            Watch Demo
          </a>
        </div>
        <p className="text-sm text-white/40">No credit card required · Cancel anytime · Australian support</p>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { v: '10 min', l: 'To first live campaign' },
            { v: '4.8×',   l: 'Average campaign ROI' },
            { v: '61%',    l: 'Average email open rate' },
            { v: '$49',    l: 'Starting price AUD/mo' },
          ].map(s => (
            <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-black text-teal">{s.v}</div>
              <div className="text-xs text-white/50 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="bg-[#F0F9FC] text-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#0D2B3E] mb-4">Everything you need. Nothing you don't.</h2>
            <p className="text-lg text-[#64748B] max-w-xl mx-auto">
              Replace 5 different tools with one platform that actually works together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white border border-[#E2EDF3] rounded-2xl p-6 hover:border-teal transition-colors hover:shadow-lg group">
                <div className="w-10 h-10 bg-[#EEF9F8] rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal/10 transition-colors">
                  <f.icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-bold text-lg text-[#0D2B3E] mb-2">{f.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#0D2B3E] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">From sign-up to live campaign in 10 minutes</h2>
            <p className="text-white/60">No agency. No training. Just results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n:'1', icon:'📋', title:'Sign up & connect', desc:'Create your account, add your business details, and connect your social accounts in one click each. Takes 90 seconds.' },
              { n:'2', icon:'✍️', title:'Write a brief',    desc:'Tell us your campaign goal, audience and budget in plain English. One paragraph is all you need.' },
              { n:'3', icon:'🚀', title:'AI does the rest', desc:'We generate your posts, emails, blog, ad copy and SEO tags. Review, tweak if you like, and hit launch.' },
            ].map(s => (
              <div key={s.n} className="bg-[#065A82]/30 border border-white/10 rounded-2xl p-8">
                <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center font-black text-white mb-4">{s.n}</div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="bg-[#F0F9FC] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-[#0D2B3E] text-center mb-12">What Australian businesses are saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOCIAL_PROOF.map(r => (
              <div key={r.name} className="bg-white border border-[#E2EDF3] rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array(r.stars).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-[#1E293B] mb-4 italic">"{r.quote}"</p>
                <div className="text-sm font-bold text-[#0D2B3E]">{r.name}</div>
                <div className="text-xs text-[#64748B]">{r.biz}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="bg-[#0D2B3E] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-4">Simple, honest pricing in AUD</h2>
            <p className="text-white/60 mb-6">14-day free trial on all plans. No credit card needed.</p>
            {/* Billing toggle */}
            <div className="inline-flex bg-white/10 rounded-xl p-1 gap-1">
              <button onClick={() => setBilling('monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${billing==='monthly' ? 'bg-teal text-white' : 'text-white/60 hover:text-white'}`}>
                Monthly
              </button>
              <button onClick={() => setBilling('annual')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${billing==='annual' ? 'bg-teal text-white' : 'text-white/60 hover:text-white'}`}>
                Annual <span className="text-xs text-teal ml-1">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING.map(plan => (
              <div key={plan.name} className={`rounded-2xl p-6 border relative ${plan.highlight
                ? 'bg-teal border-teal shadow-2xl shadow-teal/30 scale-105'
                : 'bg-white/5 border-white/10'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0D2B3E] border border-teal text-teal text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="font-bold text-lg mb-1">{plan.name}</div>
                <div className="text-xs text-white/60 mb-4">{plan.desc}</div>
                <div className="mb-6">
                  <span className="text-4xl font-black">
                    ${billing === 'annual' ? Math.round(plan.annual / 12) : plan.price}
                  </span>
                  <span className="text-white/60 text-sm">/mo AUD</span>
                  {billing === 'annual' && <div className="text-xs text-teal mt-1">Billed ${plan.annual}/yr</div>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                      <span className={plan.highlight ? 'text-white' : 'text-white/80'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.cta === 'Contact Us' ? 'mailto:hello@dolphi.com.au' : '/signup'}
                  className={`block text-center font-semibold py-3 rounded-xl transition-all ${plan.highlight
                    ? 'bg-white text-teal hover:bg-white/90'
                    : 'border border-white/20 hover:border-white/40 text-white hover:bg-white/5'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-white/40 text-sm mt-8">All prices include GST · Cancel anytime · Australian-based support</p>
        </div>
      </section>

      {/* ── LEAD CAPTURE ── */}
      <section className="bg-[#065A82] py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-3">Not ready to start yet?</h2>
          <p className="text-white/70 mb-8">Leave your details — we'll send you a free guide on the 5 marketing channels every Australian business needs in 2026.</p>
          {submitted ? (
            <div className="bg-teal/20 border border-teal rounded-xl p-6">
              <CheckCircle2 className="w-10 h-10 text-teal mx-auto mb-3" />
              <p className="font-bold">You're on the list! Check your email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleLeadCapture} className="space-y-3">
              <input name="businessName" placeholder="Business name" required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal" />
              <input name="email" type="email" placeholder="Email address" required value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal" />
              <input name="phone" placeholder="Phone number (optional)"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal" />
              <input name="website" placeholder="Website URL (optional)"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal" />
              <button type="submit"
                className="w-full bg-teal hover:bg-teal-light font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                Send Me the Free Guide <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#061820] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal rounded-lg flex items-center justify-center">🐬</div>
            <span className="font-bold text-white">Dolphi Australia</span>
          </div>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/terms"   className="hover:text-white">Terms of Service</a>
            <a href="mailto:hello@dolphi.com.au" className="hover:text-white">hello@dolphi.com.au</a>
          </div>
          <p className="text-white/30 text-sm">© 2026 Dolphi Australia Pty Ltd · ABN XX XXX XXX XXX</p>
        </div>
      </footer>
    </div>
  )
}
