import Link from 'next/link';
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  Search,
  Share2,
  Mail,
  FileText,
  DollarSign,
  Settings,
  Bell,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F0F9FC' }}>
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 h-screen w-60 overflow-y-auto border-r border-[#E2EDF3] shadow-sm"
        style={{ backgroundColor: '#0D2B3E' }}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🐬</span>
              <div>
                <h1 className="text-xl font-bold text-white">Dolphi</h1>
                <p className="text-xs" style={{ color: '#00A896' }}>
                  Marketing Suite
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-6">
            {/* Overview */}
            <div>
              <h3 className="text-xs font-semibold text-teal-100 uppercase tracking-wider mb-3">
                Overview
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-teal-50 hover:bg-teal-900/30 transition text-sm"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Campaigns */}
            <div>
              <h3 className="text-xs font-semibold text-teal-100 uppercase tracking-wider mb-3">
                Campaigns
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/campaigns/new"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-teal-50 hover:bg-teal-900/30 transition text-sm"
                  >
                    <PlusCircle size={18} />
                    Campaign Builder
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tracker"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-teal-50 hover:bg-teal-900/30 transition text-sm"
                  >
                    <BarChart3 size={18} />
                    Campaign Tracker
                  </Link>
                </li>
              </ul>
            </div>

            {/* Channels */}
            <div>
              <h3 className="text-xs font-semibold text-teal-100 uppercase tracking-wider mb-3">
                Channels
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/seo"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-teal-50 hover:bg-teal-900/30 transition text-sm"
                  >
                    <Search size={18} />
                    SEO Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/social"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-teal-50 hover:bg-teal-900/30 transition text-sm"
                  >
                    <Share2 size={18} />
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link
                    href="/email"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-teal-50 hover:bg-teal-900/30 transition text-sm"
                  >
                    <Mail size={18} />
                    Email Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-teal-50 hover:bg-teal-900/30 transition text-sm"
                  >
                    <FileText size={18} />
                    Blog & Content
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ads"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-teal-50 hover:bg-teal-900/30 transition text-sm"
                  >
                    <DollarSign size={18} />
                    Paid Ads
                  </Link>
                </li>
              </ul>
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-xs font-semibold text-teal-100 uppercase tracking-wider mb-3">
                Settings
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-teal-50 hover:bg-teal-900/30 transition text-sm"
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* User Section - Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 border-t border-teal-900/30"
          style={{ backgroundColor: '#0D2B3E' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ backgroundColor: '#00A896' }}
            >
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">John Doe</p>
              <p className="text-xs text-teal-200 truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-60 w-full flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 h-16 bg-white border-b border-[#E2EDF3] flex items-center justify-between px-8 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-[#0D2B3E]">Dashboard</h2>
            <p className="text-xs text-[#64748B]">Welcome back</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell size={20} className="text-[#64748B]" />
            </button>
            <Link
              href="/campaigns/new"
              className="px-4 py-2 rounded-lg font-semibold text-white transition flex items-center gap-2"
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
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
