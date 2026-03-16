'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0D2B3E' }}>
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
        <div className="max-w-md">
          <div className="text-5xl mb-8">🐬</div>
          <h1 className="text-4xl font-bold text-white mb-3">Welcome back</h1>
          <p className="text-teal-100 mb-8">
            Your all-in-one marketing suite to amplify your brand
          </p>
          <ul className="space-y-4 text-teal-50">
            <li className="flex items-start">
              <span className="mr-3 text-lg">✓</span>
              <span>Multi-channel campaign management in one place</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">✓</span>
              <span>AI-powered content creation and optimization</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-lg">✓</span>
              <span>Real-time analytics and performance tracking</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[#0D2B3E] mb-2">Sign in</h2>
          <p className="text-[#64748B] mb-8">Access your marketing dashboard</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
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
                Password
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-[#64748B]">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-teal-600 hover:text-teal-700">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-2 rounded-lg font-semibold text-white transition"
              style={{
                backgroundColor: loading ? '#00A896' : '#00A896',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#64748B]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
