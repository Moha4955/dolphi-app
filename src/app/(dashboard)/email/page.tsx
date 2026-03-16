'use client';

import { useState } from 'react';
import { PlusCircle, Upload, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function EmailPage() {
  const supabase = createClient();
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder implementation
    alert('Email scheduled!');
    setSubject('');
    setBody('');
    setSelectedList('');
    setScheduleDate('');
    setScheduleTime('');
    setShowComposeForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2B3E]">Email Marketing</h1>
          <p className="text-[#64748B]">Send and track email campaigns</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Total Subscribers</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0</h3>
          <p className="text-xs text-[#64748B] mt-2">across all lists</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Lists</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0</h3>
          <p className="text-xs text-[#64748B] mt-2">email lists</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Campaigns Sent</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0</h3>
          <p className="text-xs text-[#64748B] mt-2">total</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2EDF3]">
          <p className="text-sm text-[#64748B] mb-2">Avg Open Rate</p>
          <h3 className="text-3xl font-bold text-[#0D2B3E]">0%</h3>
          <p className="text-xs text-[#64748B] mt-2">average</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowComposeForm(!showComposeForm)}
          className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white transition"
          style={{ backgroundColor: '#00A896' }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#00C4B0')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#00A896')
          }
        >
          <Mail size={20} />
          Quick Compose
        </button>

        <button className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-[#0D2B3E] border border-[#E2EDF3] hover:bg-gray-50 transition">
          <PlusCircle size={20} />
          Create List
        </button>

        <button className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-[#0D2B3E] border border-[#E2EDF3] hover:bg-gray-50 transition">
          <Upload size={20} />
          Import CSV
        </button>
      </div>

      {/* Compose Form */}
      {showComposeForm && (
        <div className="bg-white rounded-2xl p-8 border border-[#E2EDF3]">
          <h2 className="text-lg font-bold text-[#0D2B3E] mb-6">Compose email</h2>
          <form onSubmit={handleSendEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                Select list
              </label>
              <select
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
                className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="">Choose a list...</option>
                <option value="main">Main List</option>
                <option value="vip">VIP Customers</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                Subject line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter subject..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                Email body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-4 py-3 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                rows={6}
                placeholder="Write your email..."
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                  Schedule date
                </label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0D2B3E] mb-2">
                  Schedule time
                </label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E2EDF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
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
                Send
              </button>
              <button
                type="button"
                onClick={() => setShowComposeForm(false)}
                className="flex-1 py-2 rounded-lg font-semibold text-[#0D2B3E] border border-[#E2EDF3] hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Email Lists Table */}
      <div className="bg-white rounded-2xl border border-[#E2EDF3]">
        <div className="p-6 border-b border-[#E2EDF3]">
          <h2 className="text-lg font-bold text-[#0D2B3E]">Email lists</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2EDF3]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  List name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Subscribers
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
              <tr className="border-b border-[#E2EDF3]">
                <td colSpan={4} className="px-6 py-8 text-center text-[#64748B]">
                  No lists yet. Create your first list to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheduled Sends Table */}
      <div className="bg-white rounded-2xl border border-[#E2EDF3]">
        <div className="p-6 border-b border-[#E2EDF3]">
          <h2 className="text-lg font-bold text-[#0D2B3E]">Scheduled sends</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2EDF3]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  List
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Scheduled for
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E2EDF3]">
                <td colSpan={4} className="px-6 py-8 text-center text-[#64748B]">
                  No scheduled sends yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
