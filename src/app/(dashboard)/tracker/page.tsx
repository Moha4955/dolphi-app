import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function TrackerPage() {
  const supabase = createClient();

  // Fetch campaign performance data
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .eq('status', 'live');

  const hasData = campaigns && campaigns.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0D2B3E]">Campaign Tracker</h1>
        <p className="text-[#64748B]">Real-time analytics and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Total Reach</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0</h3>
          <p className="text-xs text-[#64748B] mt-2">people reached</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Total Clicks</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0</h3>
          <p className="text-xs text-[#64748B] mt-2">click-throughs</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Leads Captured</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0</h3>
          <p className="text-xs text-[#64748B] mt-2">new leads</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Email Opens</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0%</h3>
          <p className="text-xs text-[#64748B] mt-2">open rate</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Overall ROI</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0×</h3>
          <p className="text-xs text-[#64748B] mt-2">return on investment</p>
        </div>
      </div>

      {!hasData && (
        /* Connection Banner */
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl p-8 border border-teal-200">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🔗</div>
            <div>
              <h2 className="text-lg font-bold text-[#0D2B3E]">
                Connect your channels to start tracking
              </h2>
              <p className="text-[#64748B] mt-1">
                Link your social media, email, SEO, and ad platforms to see real-time
                analytics
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Channel Performance */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
        <h3 className="text-lg font-bold text-[#0D2B3E] mb-6">
          Campaign performance by channel
        </h3>

        {campaigns && campaigns.length > 0 ? (
          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#0D2B3E]">
                    {campaign.name}
                  </span>
                  <span className="text-xs text-[#64748B]">0 engagements</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: '0%',
                      backgroundColor: '#00A896',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#64748B] text-center py-8">
            No live campaigns to track yet
          </p>
        )}
      </div>

      {/* Channel Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <h3 className="text-lg font-bold text-[#0D2B3E] mb-6">Channel breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#64748B]">Social Media</span>
                <span className="text-sm font-semibold text-[#0D2B3E]">0%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: '0%', backgroundColor: '#065A82' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#64748B]">Email</span>
                <span className="text-sm font-semibold text-[#0D2B3E]">0%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: '0%', backgroundColor: '#00A896' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#64748B]">SEO</span>
                <span className="text-sm font-semibold text-[#0D2B3E]">0%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: '0%', backgroundColor: '#F59E0B' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#64748B]">Paid Ads</span>
                <span className="text-sm font-semibold text-[#0D2B3E]">0%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: '0%', backgroundColor: '#EF4444' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <h3 className="text-lg font-bold text-[#0D2B3E] mb-4">Analytics note</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              ℹ️ Analytics will populate automatically as your campaigns run. Connect
              your channels and launch campaigns to start seeing real-time data here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
