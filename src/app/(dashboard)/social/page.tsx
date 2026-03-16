'use client';

import { useState } from 'react';
import { Calendar, Clock, Send } from 'lucide-react';

export default function SocialPage() {
  const [caption, setCaption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = ['Facebook', 'Instagram', 'LinkedIn', 'TikTok'];

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSchedulePost = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder implementation
    alert('Post scheduled!');
    setCaption('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedPlatforms([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0D2B3E]">Social Media</h1>
        <p className="text-[#64748B]">
          Manage and schedule posts across all platforms
        </p>
      </div>

      {/* Connected Platforms */}
      <div>
        <h2 className="text-lg font-bold text-[#0D2B3E] mb-4">Connected platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'Facebook', icon: '📘' },
            { name: 'Instagram', icon: '📷' },
            { name: 'LinkedIn', icon: '💼' },
            { name: 'TikTok', icon: '🎵' },
          ].map((platform) => (
            <div
              key={platform.name}
              className="bg-white rounded-2xl p-6 border border-[#E2EDF3] text-center"
            >
              <div className="text-4xl mb-4">{platform.icon}</div>
              <h3 className="font-semibold text-[#0D2B3E] mb-4">{platform.name}</h3>
              <button
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
      </div>

      {/* Post Scheduler Form */}
      <div className="bg-white rounded-2xl p-8 border border-[#E2EDF3]">
        <h2 className="text-lg font-bold text-[#0D2B3E] mb-6">Schedule a post</h2>
        <form onSubmit={handleSchedulePost} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              rows={4}
              placeholder="What's on your mind? ✨"
            ></textarea>
            <p className="text-xs text-[#64748B] mt-2">{caption.length} characters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                <Calendar size={16} className="inline mr-2" />
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                <Clock size={16} className="inline mr-2" />
                Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0D2B3E] mb-3">
              Post to
            </label>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <label key={platform} className="flex items-center p-3 border border-[#E2EDF3] rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                    className="mr-3"
                  />
                  <span className="text-sm font-medium text-[#0D2B3E]">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!caption || !selectedDate || !selectedTime || selectedPlatforms.length === 0}
            className="w-full py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#00A896',
              opacity:
                !caption ||
                !selectedDate ||
                !selectedTime ||
                selectedPlatforms.length === 0
                  ? 0.5
                  : 1,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#00C4B0')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#00A896')
            }
          >
            <Send size={20} />
            Schedule Post
          </button>
        </form>
      </div>

      {/* Scheduled Posts Table */}
      <div className="bg-white rounded-2xl border border-[#E2EDF3]">
        <div className="p-6 border-b border-[#E2EDF3]">
          <h2 className="text-lg font-bold text-[#0D2B3E]">Scheduled posts</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2EDF3]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Post preview
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Platform
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Scheduled time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E2EDF3]">
                <td colSpan={4} className="px-6 py-8 text-center text-[#64748B]">
                  No scheduled posts yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
