'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Step = 0 | 1 | 2 | 3
type Channel = 'seo' | 'social' | 'email' | 'ads'

interface FormData {
  name: string
  goal: string
  brief: string
  audience: string
  tone: string
  startDate: string
  endDate: string
  budget?: number
  keyword?: string
}

interface GeneratedContent {
  social?: Record<string, string>
  email?: Array<{ subject: string; previewText: string; body: string }>
  blog?: { title: string; body: string; metaTitle: string; metaDescription: string; keywords: string[] }
  seo?: { metaTitle: string; metaDescription: string; keywords: string[] }
  ads?: { headlines: string[]; descriptions: string[] }
}

const OCEAN = '#065A82'
const TEAL = '#00A896'
const DARK = '#0D2B3E'
const LIGHT = '#F0F9FC'

const channels: Array<{ id: Channel; icon: string; name: string; description: string }> = [
  { id: 'seo', icon: '🔍', name: 'SEO & Blog', description: 'On-page SEO, blog post, meta tags' },
  { id: 'social', icon: '📱', name: 'Social Media', description: 'Facebook, Instagram, LinkedIn, TikTok' },
  { id: 'email', icon: '📧', name: 'Email Marketing', description: 'Email sequence, subject lines, automation' },
  { id: 'ads', icon: '💰', name: 'Paid Ads', description: 'Google Ads + Meta Ads copy' },
]

export default function CampaignBuilder() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(0)
  const [selectedChannels, setSelectedChannels] = useState<Channel[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    goal: 'Lead Generation',
    brief: '',
    audience: '',
    tone: 'Professional',
    startDate: '',
    endDate: '',
  })
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({})
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulate progress animation during generation
  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.random() * 20 : p))
    }, 500)
    return () => clearInterval(interval)
  }, [loading])

  // Step 1: Select Channels
  const handleChannelToggle = (channel: Channel) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    )
  }

  // Step 2: Form submission
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Step 3: Generate content
  const handleGenerate = async () => {
    if (!formData.brief || !formData.name) {
      toast.error('Please fill in campaign name and brief')
      return
    }

    setLoading(true)
    setProgress(0)

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          channels: selectedChannels,
        }),
      })

      if (!response.ok) throw new Error('Failed to generate content')
      const { content } = await response.json()
      setGeneratedContent(content)
      setProgress(100)
      setStep(3)
    } catch (error) {
      console.error(error)
      toast.error('Failed to generate content')
    } finally {
      setLoading(false)
    }
  }

  // Step 4: Deploy campaign
  const handleDeploy = async (schedule: boolean = false) => {
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign: {
            name: formData.name,
            goal: formData.goal,
            brief: formData.brief,
            target_audience: formData.audience,
            tone: formData.tone,
            start_date: formData.startDate,
            end_date: formData.endDate,
            budget_aud: formData.budget,
            primary_keyword: formData.keyword,
            channels: selectedChannels,
            status: schedule ? 'scheduled' : 'live',
          },
          content: generatedContent,
        }),
      })

      if (!response.ok) throw new Error('Failed to create campaign')
      toast.success('Campaign deployed!')
      router.push('/tracker')
    } catch (error) {
      console.error(error)
      toast.error('Failed to deploy campaign')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: LIGHT, padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Step Indicator */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            {[0, 1, 2, 3].map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: step >= s ? TEAL : '#ddd',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                  }}
                >
                  {s + 1}
                </div>
                {s < 3 && (
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      backgroundColor: step > s ? TEAL : '#ddd',
                      margin: '0 0.5rem',
                      transition: 'all 0.3s',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
            {step === 0 && 'Step 1: Choose Channels'}
            {step === 1 && 'Step 2: Campaign Details'}
            {step === 2 && 'Step 3: AI Generates Content'}
            {step === 3 && 'Step 4: Review & Deploy'}
          </p>
        </div>

        {/* Step 1: Choose Channels */}
        {step === 0 && (
          <div>
            <h1 style={{ color: DARK, marginBottom: '2rem' }}>What channels do you want to run this campaign on?</h1>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => handleChannelToggle(channel.id)}
                  style={{
                    padding: '1.5rem',
                    border: `2px solid ${selectedChannels.includes(channel.id) ? TEAL : '#ddd'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedChannels.includes(channel.id) ? `${TEAL}15` : 'white',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{channel.icon}</div>
                  <h3 style={{ color: DARK, margin: '0.5rem 0' }}>{channel.name}</h3>
                  <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>{channel.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                if (selectedChannels.length === 0) {
                  toast.error('Please select at least one channel')
                  return
                }
                setStep(1)
              }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: TEAL,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: Campaign Details */}
        {step === 1 && (
          <div>
            <h1 style={{ color: DARK, marginBottom: '2rem' }}>Campaign Details</h1>
            <form
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: DARK, fontWeight: 'bold' }}>
                  Campaign Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid #ddd`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                  }}
                  placeholder="e.g. Summer Sale 2025"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: DARK, fontWeight: 'bold' }}>
                  Campaign Goal
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid #ddd`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                  }}
                >
                  <option>Lead Generation</option>
                  <option>Brand Awareness</option>
                  <option>Product Launch</option>
                  <option>Event Promotion</option>
                  <option>Sales/Promotion</option>
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: DARK, fontWeight: 'bold' }}>
                  Campaign Brief
                </label>
                <textarea
                  name="brief"
                  value={formData.brief}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid #ddd`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                    minHeight: '120px',
                    fontFamily: 'inherit',
                  }}
                  placeholder="Describe your campaign in plain English. What are you promoting? What's the offer? What's the CTA?"
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: DARK, fontWeight: 'bold' }}>
                  Target Audience
                </label>
                <input
                  type="text"
                  name="audience"
                  value={formData.audience}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid #ddd`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                  }}
                  placeholder="e.g. Australian homeowners aged 30–55"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: DARK, fontWeight: 'bold' }}>
                  Tone
                </label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid #ddd`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                  }}
                >
                  <option>Friendly & Warm</option>
                  <option>Professional</option>
                  <option>Casual & Fun</option>
                  <option>Urgent & Direct</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: DARK, fontWeight: 'bold' }}>
                  Primary Keyword (SEO)
                </label>
                <input
                  type="text"
                  name="keyword"
                  value={formData.keyword || ''}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid #ddd`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                  }}
                  placeholder="e.g. eco-friendly products"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: DARK, fontWeight: 'bold' }}>
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid #ddd`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: DARK, fontWeight: 'bold' }}>
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid #ddd`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: DARK, fontWeight: 'bold' }}>
                  Budget AUD (Optional)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget || ''}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid #ddd`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                  }}
                  placeholder="e.g. 5000"
                />
              </div>
            </form>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setStep(0)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#eee',
                  color: DARK,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  handleGenerate()
                  setStep(2)
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: TEAL,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                Generate Content →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: AI Content Generation */}
        {step === 2 && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤖</div>
                <p style={{ color: DARK, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  Generating your campaign content across all channels...
                </p>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#eee',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: TEAL,
                      width: `${progress}%`,
                      transition: 'width 0.3s',
                    }}
                  />
                </div>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>{Math.round(progress)}% complete</p>
              </div>
            ) : (
              <div>
                <h1 style={{ color: DARK, marginBottom: '2rem' }}>Generated Content</h1>
                <div style={{ marginBottom: '2rem' }}>
                  {selectedChannels.includes('social') && generatedContent.social && (
                    <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px' }}>
                      <h2 style={{ color: TEAL, marginBottom: '1rem' }}>📱 Social Media Posts</h2>
                      {Object.entries(generatedContent.social).map(([platform, content]) => (
                        <div key={platform} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: LIGHT, borderRadius: '6px' }}>
                          <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>{platform.toUpperCase()}</p>
                          <textarea
                            value={content}
                            onChange={(e) =>
                              setGeneratedContent((prev) => ({
                                ...prev,
                                social: { ...prev.social, [platform]: e.target.value },
                              }))
                            }
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: `1px solid #ddd`,
                              borderRadius: '4px',
                              fontFamily: 'inherit',
                              minHeight: '80px',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedChannels.includes('email') && generatedContent.email && (
                    <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px' }}>
                      <h2 style={{ color: TEAL, marginBottom: '1rem' }}>📧 Email Sequence</h2>
                      {generatedContent.email.map((email, i) => (
                        <div key={i} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: LIGHT, borderRadius: '6px' }}>
                          <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Email {i + 1}: {email.subject}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedChannels.includes('seo') && generatedContent.seo && (
                    <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px' }}>
                      <h2 style={{ color: TEAL, marginBottom: '1rem' }}>🔍 SEO Optimization</h2>
                      <p style={{ color: '#666', margin: '0 0 1rem 0' }}>Meta Title & Description configured</p>
                    </div>
                  )}

                  {selectedChannels.includes('ads') && generatedContent.ads && (
                    <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px' }}>
                      <h2 style={{ color: TEAL, marginBottom: '1rem' }}>💰 Ad Copy</h2>
                      <p style={{ color: '#666', margin: 0 }}>Headlines and descriptions ready for review</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#eee',
                      color: DARK,
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: TEAL,
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Save & Continue →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review & Deploy */}
        {step === 3 && (
          <div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#d4f4e4',
                borderRadius: '8px',
                marginBottom: '2rem',
                border: `2px solid ${TEAL}`,
              }}
            >
              <p style={{ margin: 0, color: TEAL, fontWeight: 'bold' }}>
                ✅ All content generated and saved
              </p>
            </div>

            <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px' }}>
              <h2 style={{ color: DARK, marginBottom: '1rem' }}>Campaign Summary</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>Campaign Name</p>
                  <p style={{ color: DARK, fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>{formData.name}</p>
                </div>
                <div>
                  <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>Goal</p>
                  <p style={{ color: DARK, fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>{formData.goal}</p>
                </div>
                <div>
                  <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>Channels</p>
                  <p style={{ color: DARK, fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>
                    {selectedChannels.map((c) => c.toUpperCase()).join(', ')}
                  </p>
                </div>
                <div>
                  <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>Date Range</p>
                  <p style={{ color: DARK, fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>
                    {formData.startDate} to {formData.endDate}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#eee',
                  color: DARK,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => handleDeploy(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: TEAL,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                🚀 Launch Campaign Now
              </button>
              <button
                onClick={() => handleDeploy(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: OCEAN,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                📅 Schedule for Later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
