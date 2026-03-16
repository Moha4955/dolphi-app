'use client';

import { useState } from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdsPage() {
  const supabase = createClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [platform, setPlatform] = useState('');
  const [objective, setObjective] = useState('');
  const [dailyBudget, setDailyBudget] = useState('');
  const [duration, setDuration] = useState('');

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder implementation
    alert('Ad campaign created!');
    setPlatform('');
    setObjective('');
    setDailyBudget('');
    setDuration('');
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0D2B3E]">Paid Ads</h1>
        <p className="text-[#64748B]">Manage and optimize paid advertising campaigns</p>
      </div>

      {/* Platform Connection Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-white rounded-2xl p-8 border border-[#E2EDF3] hover:shadow-lg transition text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-lg font-bold text-[#0D2B3E] mb-2">Google Ads</h3>
          <p className="text-sm text-[#64748B] mb-6">
            Run search, display, and shopping ads
          </p>
          <button
            className="px-6 py-2 rounded-lg font-semibold text-white transition w-full"
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
        </button>

        <button className="bg-white rounded-2xl p-8 border border-[#E2EDF3] hover:shadow-lg transition text-center">
          <div className="text-5xl mb-4">📘</div>
          <h3 className="text-lg font-bold text-[#0D2B3E] mb-2">Meta Ads</h3>
          <p className="text-sm text-[#64748B] mb-6">
            Facebook and Instagram advertising
          </p>
          <button
            className="px-6 py-2 rounded-lg font-semibold text-white transition w-full"
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
        </button>
      </div>

      {/* Platform Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0D2B3E]">Google Ads</h3>
            <span className="text-2xl">📊</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2EDF3]">
              <span className="text-[#64748B]">Total Spend</span>
              <span className="text-xl font-bold text-[#0D2B3E]">$0</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E2EDF3]">
              <span className="text-[#64748B]">Click-Through Rate</span>
              <span className="text-xl font-bold text-[#0D2B3E]">0%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">ROAS</span>
              <span className="text-xl font-bold text-[#0D2B3E]">0×</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0D2B3E]">Meta Ads</h3>
            <span className="text-2xl">📘</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2EDF3]">
              <span className="text-[#64748B]">Total Spend</span>
              <span className="text-xl font-bold text-[#0D2B3E]">$0</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E2EDF3]">
              <span className="text-[#64748B]">Click-Through Rate</span>
              <span className="text-xl font-bold text-[#0D2B3E]">0%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">ROAS</span>
              <span className="text-xl font-bold text-[#0D2B3E]">0×</span>
            </div>
          </div>
        </div>
      </div>

      {/* Create Campaign Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-bold text-[#0D2B3E]">Create campaign</h2>
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition text-sm ml-auto"
              style={{ backgroundColor: '#00A896' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#00C4B0')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#00A896')
              }
            >
              <PlusCircle size={18} />
              New Campaign
            </button>
          )}
        </div>

        {showCreateForm && (
          <div className="bg-white rounded-2xl p-8 border border-[#E2EDF3]">
            <form onSubmit={handleCreateCampaign} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select platform...</option>
                  <option value="google">Google Ads</option>
                  <option value="meta">Meta Ads</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                  Campaign Objective
                </label>
                <select
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select objective...</option>
                  <option value="awareness">Brand Awareness</option>
                  <option value="traffic">Traffic</option>
                  <option value="conversions">Conversions</option>
                  <option value="leads">Leads</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Daily Budget ($)
                  </label>
                  <input
                    type="number"
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="30"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg">💡</span>
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      Need copy? Use AI
                    </p>
                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      <Sparkles size={16} />
                      Generate ad copy with AI
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg font-semibold text-white transition"
                  style={{ backgroundColor: '#00A896' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#00C4B0')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#00A896')
                  }
                >
                  Create Campaign
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-2 rounded-lg font-semibold text-[#0D2B3E] border border-[#E2EDF3] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-[#E2EDF3]">
        <div className="p-6 border-b border-[#E2EDF3]">
          <h2 className="text-lg font-bold text-[#0D2B3E]">Ad campaigns</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2EDF3]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Campaign
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Platform
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Spend
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E2EDF3]">
                <td colSpan={5} className="px-6 py-8 text-center text-[#64748B]">
                  No ad campaigns yet. Start promoting your business.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
