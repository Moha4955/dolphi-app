'use client';

import { useState } from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function BlogPage() {
  const supabase = createClient();
  const [blogContent, setBlogContent] = useState('');

  const handleGenerateAI = async () => {
    // Placeholder for AI generation
    setBlogContent(
      'Your AI-generated blog post will appear here. This is a placeholder for the future AI-powered content generation feature.'
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2B3E]">Blog & Content</h1>
          <p className="text-[#64748B]">Create and publish blog posts to boost SEO</p>
        </div>

        <div className="flex gap-3">
          <button
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
            New Blog Post
          </button>

          <button
            onClick={handleGenerateAI}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white transition"
            style={{ backgroundColor: '#065A82' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#0D3F5C')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#065A82')
            }
          >
            <Sparkles size={20} />
            Generate with AI
          </button>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-2xl border border-[#E2EDF3]">
        <div className="p-6 border-b border-[#E2EDF3]">
          <h2 className="text-lg font-bold text-[#0D2B3E]">Blog posts</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2EDF3]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  SEO Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Word count
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Published
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E2EDF3]">
                <td colSpan={6} className="px-6 py-8 text-center text-[#64748B]">
                  No blog posts yet. Start creating content to improve your SEO.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Editor */}
      <div className="bg-white rounded-2xl p-8 border border-[#E2EDF3]">
        <h2 className="text-lg font-bold text-[#0D2B3E] mb-4">
          Blog Editor — coming full rich text editor
        </h2>
        <textarea
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
          className="w-full px-4 py-3 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          rows={10}
          placeholder="Start writing your blog post here... Use AI generation for help!"
        ></textarea>

        <div className="mt-6 flex gap-4">
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
            Save Draft
          </button>

          <button className="px-6 py-2 rounded-lg font-semibold text-white transition" style={{ backgroundColor: '#065A82' }}>
            Publish
          </button>

          <button className="px-6 py-2 rounded-lg font-semibold text-[#0D2B3E] border border-[#E2EDF3] hover:bg-gray-50 transition">
            Preview
          </button>
        </div>
      </div>

      {/* Empty State with AI CTA */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-12 border border-purple-200 text-center">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-[#0D2B3E] mb-2">
          AI-Powered Blog Writing
        </h2>
        <p className="text-[#64748B] mb-6">
          Use Dolphi's AI to generate SEO-optimized blog posts in seconds. Get ideas,
          create content, and publish faster than ever.
        </p>
        <button
          onClick={handleGenerateAI}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition"
          style={{ backgroundColor: '#00A896' }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#00C4B0')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#00A896')
          }
        >
          <Sparkles size={20} />
          Generate Content with AI
        </button>
      </div>
    </div>
  );
}
