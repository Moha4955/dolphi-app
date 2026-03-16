import Link from 'next/link';
import { PlusCircle, Upload, Share2, Rocket } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createClient();

  // Fetch campaigns
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const campaignCount = campaigns?.length || 0;
  const liveCampaigns = campaigns?.filter((c) => c.status === 'live').length || 0;

  const hasNoCampaigns = !campaigns || campaigns.length === 0;

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Total Campaigns</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">{campaignCount}</h3>
          <p className="text-xs text-[#64748B] mt-2">All time</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Live Campaigns</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">{liveCampaigns}</h3>
          <p className="text-xs text-[#64748B] mt-2">Active now</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">AI Credits Used</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0</h3>
          <p className="text-xs text-[#64748B] mt-2">This month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Email Subscribers</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0</h3>
          <p className="text-xs text-[#64748B] mt-2">Connected lists</p>
        </div>
      </div>

      {hasNoCampaigns ? (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 border border-[#E2EDF3] text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-[#0D2B3E] mb-2">
            Launch your first campaign
          </h2>
          <p className="text-[#64748B] mb-6">
            Create a multi-channel campaign to reach your audience across social,
            email, SEO, and more.
          </p>
          <Link
            href="/campaigns/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: '#00A896' }}
          >
            <PlusCircle size={20} />
            Create Campaign
          </Link>
        </div>
      ) : (
        <>
          {/* Recent Campaigns Table */}
          <div className="bg-white rounded-2xl border border-[#E2EDF3]">
            <div className="p-6 border-b border-[#E2EDF3]">
              <h3 className="text-lg font-bold text-[#0D2B3E]">Recent campaigns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E2EDF3]">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Channels
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#64748B] uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns?.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-[#E2EDF3] hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-[#0D2B3E] font-medium">
                        {campaign.name}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {campaign.channels?.map((ch: string) => (
                            <span
                              key={ch}
                              className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                              style={{
                                backgroundColor:
                                  ch === 'email'
                                    ? '#00A896'
                                    : ch === 'social'
                                    ? '#065A82'
                                    : '#64748B',
                              }}
                            >
                              {ch}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{
                            backgroundColor:
                              campaign.status === 'live'
                                ? '#10B981'
                                : campaign.status === 'draft'
                                ? '#9CA3AF'
                                : campaign.status === 'scheduled'
                                ? '#FBBF24'
                                : '#3B82F6',
                          }}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#64748B]">
                        {new Date(campaign.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Link
                          href={`/campaigns/${campaign.id}`}
                          className="text-teal-600 hover:text-teal-700 font-semibold"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/campaigns/new"
              className="bg-white rounded-2xl p-6 border border-[#E2EDF3] hover:shadow-lg transition text-center group"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-[#0D2B3E] mb-2 group-hover:text-teal-600">
                New Campaign
              </h3>
              <p className="text-sm text-[#64748B]">
                Start a fresh multi-channel campaign
              </p>
            </Link>

            <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3] hover:shadow-lg transition text-center cursor-pointer group">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-[#0D2B3E] mb-2 group-hover:text-teal-600">
                Import Email List
              </h3>
              <p className="text-sm text-[#64748B]">
                Upload your subscriber CSV
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3] hover:shadow-lg transition text-center cursor-pointer group">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-lg font-semibold text-[#0D2B3E] mb-2 group-hover:text-teal-600">
                Connect Social Account
              </h3>
              <p className="text-sm text-[#64748B]">
                Link Facebook, Instagram, LinkedIn or TikTok
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
