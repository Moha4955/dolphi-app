'use client';

import { useState } from 'react';
import { PlusCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SEOPage() {
  const supabase = createClient();
  const [showKeywordForm, setShowKeywordForm] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [url, setUrl] = useState('');

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder implementation
    alert('Keyword added!');
    setKeyword('');
    setUrl('');
    setShowKeywordForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0D2B3E]">SEO Tools</h1>
        <p className="text-[#64748B]">Monitor keywords and optimize your search visibility</p>
      </div>

      {/* SEO Health Score */}
      <div className="bg-white rounded-2xl p-8 border border-[#E2EDF3]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[#64748B] mb-2">SEO Health Score</p>
            <h3 className="text-4xl font-bold text-[#0D2B3E]">N/A</h3>
            <p className="text-sm text-[#64748B] mt-2">
              Connect your website to calculate your score
            </p>
          </div>
          <div className="text-5xl">📊</div>
        </div>
      </div>

      {/* Google Search Console Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔗</div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#0D2B3E] mb-2">
              Connect Google Search Console
            </h2>
            <p className="text-[#64748B] mb-4">
              Import your search data, top queries, and indexing status
            </p>
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
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Keyword Tracker */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0D2B3E]">Keyword tracker</h2>
          <button
            onClick={() => setShowKeywordForm(!showKeywordForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition text-sm"
            style={{ backgroundColor: '#00A896' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#00C4B0')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#00A896')
            }
          >
            <PlusCircle size={18} />
            Add Keyword
          </button>
        </div>

        {showKeywordForm && (
          <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
            <form onSubmit={handleAddKeyword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                  Keyword
                </label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., best coffee in Sydney"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                  Target URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="https://yoursite.com/page"
                  required
                />
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
                  Add Keyword
                </button>
                <button
                  type="button"
                  onClick={() => setShowKeywordForm(false)}
                  className="flex-1 py-2 rounded-lg font-semibold text-[#0D2B3E] border border-[#E2EDF3] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#E2EDF3]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2EDF3]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Keyword
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Current rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Change
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Search volume
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    Difficulty
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                    URL
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E2EDF3]">
                  <td colSpan={6} className="px-6 py-8 text-center text-[#64748B]">
                    No keywords being tracked yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* On-Page Checklist */}
      <div className="bg-white rounded-2xl p-8 border border-[#E2EDF3]">
        <h2 className="text-lg font-bold text-[#0D2B3E] mb-6">On-page SEO checklist</h2>
        <div className="space-y-4">
          {[
            { item: 'Title tags', status: 'pending' },
            { item: 'Meta descriptions', status: 'pending' },
            { item: 'Page speed', status: 'pending' },
            { item: 'Mobile friendly', status: 'pending' },
            { item: 'Schema markup', status: 'pending' },
          ].map((check) => (
            <div key={check.item} className="flex items-center justify-between p-4 border border-[#E2EDF3] rounded-lg">
              <span className="font-medium text-[#0D2B3E]">{check.item}</span>
              <span className="text-xs font-semibold text-[#64748B] px-3 py-1 bg-gray-100 rounded-full">
                Not checked
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
