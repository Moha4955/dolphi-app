'use client';

import { useState } from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  // Business Profile State
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [abn, setAbn] = useState('');

  // Team State
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Business profile saved!');
  };

  const handleInviteTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Invitation sent!');
    setInviteEmail('');
    setInviteRole('member');
  };

  const tabs = [
    { id: 'profile', label: 'Business Profile' },
    { id: 'accounts', label: 'Connected Accounts' },
    { id: 'billing', label: 'Billing' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0D2B3E]">Settings</h1>
        <p className="text-[#64748B]">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#E2EDF3]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === tab.id
                ? 'text-[#0D2B3E] border-teal-500'
                : 'text-[#64748B] border-transparent hover:text-[#0D2B3E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Business Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl p-8 border border-[#E2EDF3] max-w-3xl">
          <h2 className="text-lg font-bold text-[#0D2B3E] mb-6">Business information</h2>

          <form onSubmit={handleSaveProfile} className="space-y-6">
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
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Street address"
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

            <div>
              <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                ABN
              </label>
              <input
                type="text"
                value={abn}
                onChange={(e) => setAbn(e.target.value)}
                className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="12 345 678 901"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                Logo
              </label>
              <div className="border-2 border-dashed border-[#E2EDF3] rounded-lg p-8 text-center cursor-pointer hover:border-teal-300 transition">
                <Upload className="mx-auto mb-2 text-[#64748B]" size={24} />
                <p className="text-sm text-[#64748B] font-medium">
                  Drag and drop your logo here or click to browse
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold text-white transition"
              style={{ backgroundColor: '#00A896' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#00C4B0')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#00A896')
              }
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Connected Accounts Tab */}
      {activeTab === 'accounts' && (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h2 className="text-lg font-bold text-[#0D2B3E] mb-4">Social platforms</h2>
            <div className="space-y-3">
              {[
                { name: 'Facebook', icon: '📘' },
                { name: 'Instagram', icon: '📷' },
                { name: 'LinkedIn', icon: '💼' },
                { name: 'TikTok', icon: '🎵' },
                { name: 'Google Business', icon: '🔍' },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="bg-white rounded-2xl p-4 border border-[#E2EDF3] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="font-medium text-[#0D2B3E]">{platform.name}</span>
                  </div>
                  <button className="px-4 py-2 rounded-lg font-semibold text-white transition text-sm" style={{ backgroundColor: '#00A896' }}>
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0D2B3E] mb-4">Accounting platforms</h2>
            <div className="space-y-3">
              {[
                { name: 'Xero', icon: '📊' },
                { name: 'MYOB', icon: '📈' },
                { name: 'QuickBooks', icon: '💰' },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="bg-white rounded-2xl p-4 border border-[#E2EDF3] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="font-medium text-[#0D2B3E]">{platform.name}</span>
                  </div>
                  <button className="px-4 py-2 rounded-lg font-semibold text-white transition text-sm" style={{ backgroundColor: '#00A896' }}>
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0D2B3E] mb-4">Analytics</h2>
            <div className="bg-white rounded-2xl p-4 border border-[#E2EDF3] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <span className="font-medium text-[#0D2B3E]">Google Analytics</span>
              </div>
              <button className="px-4 py-2 rounded-lg font-semibold text-white transition text-sm" style={{ backgroundColor: '#00A896' }}>
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-2xl p-8 border border-[#E2EDF3] max-w-3xl">
          <h2 className="text-lg font-bold text-[#0D2B3E] mb-6">Billing</h2>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-[#64748B] mb-1">Current plan</p>
                <h3 className="text-xl font-bold text-[#0D2B3E]">Professional</h3>
              </div>
              <span className="px-4 py-2 rounded-full bg-teal-100 text-teal-700 font-semibold text-sm">
                Active
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 border border-[#E2EDF3] rounded-lg">
              <span className="text-[#64748B]">Plan features</span>
              <span className="font-medium text-[#0D2B3E]">10 campaigns/month</span>
            </div>
            <div className="flex items-center justify-between p-4 border border-[#E2EDF3] rounded-lg">
              <span className="text-[#64748B]">Renewal date</span>
              <span className="font-medium text-[#0D2B3E]">April 16, 2026</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="px-6 py-2 rounded-lg font-semibold text-white transition"
              style={{ backgroundColor: '#00A896' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#00C4B0')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#00A896')
              }
            >
              Upgrade Plan
            </button>
            <button className="px-6 py-2 rounded-lg font-semibold text-[#0D2B3E] border border-[#E2EDF3] hover:bg-gray-50">
              Manage Billing
            </button>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="space-y-6 max-w-3xl">
          {/* Invite Form */}
          <div className="bg-white rounded-2xl p-8 border border-[#E2EDF3]">
            <h2 className="text-lg font-bold text-[#0D2B3E] mb-6">Invite team member</h2>

            <form onSubmit={handleInviteTeamMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="team@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="member">Member</option>
                </select>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white transition"
                style={{ backgroundColor: '#00A896' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#00C4B0')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#00A896')
                }
              >
                <Plus size={20} />
                Send Invite
              </button>
            </form>
          </div>

          {/* Team Members List */}
          <div className="bg-white rounded-2xl border border-[#E2EDF3]">
            <div className="p-6 border-b border-[#E2EDF3]">
              <h2 className="text-lg font-bold text-[#0D2B3E]">Team members</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E2EDF3]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E2EDF3]">
                    <td className="px-6 py-4 text-sm text-[#0D2B3E] font-medium">
                      You
                    </td>
                    <td className="px-6 py-4 text-sm text-[#64748B]">
                      john@example.com
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 font-semibold text-xs">
                        Owner
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#64748B]">Active</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-[#64748B] hover:text-red-600 transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
