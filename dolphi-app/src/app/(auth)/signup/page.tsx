'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1 - Account
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2 - Business
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');

  const handleStepOne = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      setStep(2);
      setLoading(false);
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleStepTwo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          businessName,
          website,
          industry,
          phone,
          state,
        }),
      });

      if (!response.ok) {
        setError('Failed to save business details');
        setLoading(false);
        return;
      }

      setStep(3);
      setLoading(false);
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleSkipToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D2B3E] to-[#065A82] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`text-sm font-semibold ${
                  s <= step ? 'text-white' : 'text-teal-100'
                }`}
              >
                Step {s}
              </div>
            ))}
          </div>
          <div className="w-full bg-teal-900 rounded-full h-2">
            <div
              className="bg-teal-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {/* Step 1 - Account */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-[#0D2B3E] mb-2">Create your account</h2>
              <p className="text-[#64748B] mb-8">
                Get started with Dolphi marketing suite
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleStepOne} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Password (min 8 characters)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-2 rounded-lg font-semibold text-white transition"
                  style={{ backgroundColor: '#00A896' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#00C4B0')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#00A896')
                  }
                >
                  {loading ? 'Creating account...' : 'Continue'}
                </button>

                <div className="text-center text-sm text-[#64748B] mt-4">
                  Already have an account?{' '}
                  <Link href="/login" className="text-teal-600 hover:text-teal-700 font-semibold">
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* Step 2 - Business */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-[#0D2B3E] mb-2">Tell us about your business</h2>
              <p className="text-[#64748B] mb-8">
                We'll customize Dolphi for your needs
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleStepTwo} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Business name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Your business name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="">Select an industry</option>
                    <option value="Retail">Retail</option>
                    <option value="Trades & Construction">Trades & Construction</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="+61 2 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="">Select a state</option>
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">NT</option>
                  </select>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-2 rounded-lg font-semibold text-[#0D2B3E] border border-[#E2EDF3] hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 rounded-lg font-semibold text-white transition"
                    style={{ backgroundColor: '#00A896' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#00C4B0')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '#00A896')
                    }
                  >
                    {loading ? 'Saving...' : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3 - Connect */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-[#0D2B3E] mb-2">Connect your accounts</h2>
              <p className="text-[#64748B] mb-8">
                Link your social media and marketing platforms
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { name: 'Facebook', icon: '📘' },
                  { name: 'Instagram', icon: '📷' },
                  { name: 'LinkedIn', icon: '💼' },
                  { name: 'TikTok', icon: '🎵' },
                ].map((platform) => (
                  <div
                    key={platform.name}
                    className="border border-[#E2EDF3] rounded-lg p-6 text-center"
                  >
                    <div className="text-4xl mb-3">{platform.icon}</div>
                    <h3 className="font-semibold text-[#0D2B3E] mb-4">{platform.name}</h3>
                    <button
                      onClick={() => handleSkipToDashboard()}
                      className="w-full py-2 rounded-lg font-semibold text-white transition"
                      style={{ backgroundColor: '#00A896' }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = '#00C4B0')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = '#00A896')
                      }
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSkipToDashboard}
                className="w-full py-3 rounded-lg font-semibold text-teal-600 border border-teal-200 hover:bg-teal-50 transition"
              >
                Skip for now → Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
