import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function CampaignsPage() {
  const supabase = createClient();

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  const statusCounts = {
    all: campaigns?.length || 0,
    live: campaigns?.filter((c) => c.status === 'live').length || 0,
    scheduled: campaigns?.filter((c) => c.status === 'scheduled').length || 0,
    completed: campaigns?.filter((c) => c.status === 'completed').length || 0,
  };

  const hasCampaigns = campaigns && campaigns.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2B3E]">Campaigns</h1>
          <p className="text-[#64748B]">Manage all your marketing campaigns</p>
        </div>
        <Link
          href="/campaigns/new"
          className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white transition"
          style={{ backgroundColor: '#00A896' }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#00C4B0')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#00A896')
          }
        >
          <PlusCircle size={20} />
          New Campaign
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 border-b border-[#E2EDF3] pb-4">
        <button className="px-4 py-2 rounded-lg text-sm font-semibold text-[#0D2B3E] bg-white border border-[#E2EDF3] hover:bg-gray-50">
          All ({statusCounts.all})
        </button>
        <button className="px-4 py-2 rounded-lg text-sm font-semibold text-[#0D2B3E] bg-white border border-[#E2EDF3] hover:bg-gray-50">
          Live ({statusCounts.live})
        </button>
        <button className="px-4 py-2 rounded-lg text-sm font-semibold text-[#0D2B3E] bg-white border border-[#E2EDF3] hover:bg-gray-50">
          Scheduled ({statusCounts.scheduled})
        </button>
        <button className="px-4 py-2 rounded-lg text-sm font-semibold text-[#0D2B3E] bg-white border border-[#E2EDF3] hover:bg-gray-50">
          Completed ({statusCounts.completed})
        </button>
      </div>

      {hasCampaigns ? (
        /* Campaigns Table */
        <div className="bg-white rounded-2xl border border-[#E2EDF3]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2EDF3]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Goal
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Channels
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns?.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-[#E2EDF3] hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-[#0D2B3E] font-semibold">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#64748B]">
                      {campaign.goal || '—'}
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
                    <td className="px-6 py-4 text-sm text-[#0D2B3E] font-medium">
                      ${campaign.budget || 0}
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
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 border border-[#E2EDF3] text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-[#0D2B3E] mb-2">No campaigns yet</h2>
          <p className="text-[#64748B] mb-6">
            Create your first campaign to get started
          </p>
          <Link
            href="/campaigns/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition"
            style={{ backgroundColor: '#00A896' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#00C4B0')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#00A896')
            }
          >
            <PlusCircle size={20} />
            Create Campaign
          </Link>
        </div>
      )}
    </div>
  );
}
