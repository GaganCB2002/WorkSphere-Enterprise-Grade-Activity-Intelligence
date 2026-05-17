import React, { useState } from 'react';
import { DepartmentView } from '../../dashboards/DepartmentView';
import { StatCardData } from '../../models/types';
import { 
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend
} from 'recharts';
import { Play, Square, Calendar, Award, CheckCircle, Clock, Send, Sparkles, FileText, CheckCircle2, CalendarCheck } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Today Status', value: 'Clocked In', trend: 'Hardware telemetry active', trendType: 'up', icon: '⚡', color: 'emerald' },
  { title: 'Weekly Hours', value: '38.4h', trend: 'Target: 40h', trendType: 'up', icon: '⏳', color: 'blue' },
  { title: 'Available Leave Balance', value: '18 Days', trend: 'Annual paid leave', trendType: 'neutral', icon: '🌴', color: 'purple' },
  { title: 'AI Productivity Rating', value: '94.2%', trend: 'Highly productive', trendType: 'up', icon: '📈', color: 'amber' },
];

const mockSkillRadarData = [
  { skill: 'React / Next.js', score: 95, benchmark: 85 },
  { skill: 'TypeScript', score: 90, benchmark: 80 },
  { skill: 'Spring Boot 3', score: 85, benchmark: 75 },
  { skill: 'PostgreSQL', score: 80, benchmark: 75 },
  { skill: 'Docker / K8s', score: 75, benchmark: 70 },
  { skill: 'UI / UX Design', score: 85, benchmark: 70 },
];

const mockActivityTimeline = [
  { time: '09:00 AM', event: 'Clocked In (Verified via WinRT Hardware Geolocation)', type: 'ATTENDANCE' },
  { time: '10:15 AM', event: 'Committed 420 LOC to feature/next15-external branch', type: 'GIT' },
  { time: '11:30 AM', event: 'Attended Daily Engineering Standup (Zoom)', type: 'MEETING' },
  { time: '01:00 PM', event: 'Resolved P1 Defect BUG-103 (Recharts tooltip flickering)', type: 'JIRA' },
  { time: '03:45 PM', event: 'Active app usage: VS Code (94% Productive Focus)', type: 'TELEMETRY' },
];

const initialLeaves = [
  { id: 'leave-1', type: 'Annual Leave', from: '2026-06-10', to: '2026-06-15', status: 'Approved', reason: 'Summer family vacation' },
  { id: 'leave-2', type: 'Sick Leave', from: '2026-04-12', to: '2026-04-13', status: 'Approved', reason: 'Dental appointment & recovery' },
];

const initialMessages = [
  { id: 1, sender: 'HR Support (Sarah)', text: 'Hello Gagan, your annual leave request for June has been approved.', time: '10:30 AM', isMe: false },
  { id: 2, sender: 'You', text: 'Thank you Sarah! Will the payroll system reflect the advance?', time: '10:32 AM', isMe: true },
  { id: 3, sender: 'HR Support (Sarah)', text: 'Yes, it is fully synchronized with the automated disbursement schedule.', time: '10:35 AM', isMe: false },
];

export const EmployeeDashboard: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [myLeaves, setMyLeaves] = useState(initialLeaves);
  const [messages, setMessages] = useState(initialMessages);
  const [chatInput, setChatInput] = useState('');
  
  // Leave Form State
  const [leaveForm, setLeaveForm] = useState({
    type: 'Annual Leave',
    from: '',
    to: '',
    reason: ''
  });

  const toggleClock = () => {
    setIsClockedIn(!isClockedIn);
    alert(isClockedIn ? 'Clocked out successfully. Hardware telemetry suspended.' : 'Clocked in successfully. Hardware telemetry tracking active.');
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveForm.from || !leaveForm.to || !leaveForm.reason) {
      alert('Please fill in all leave request fields.');
      return;
    }
    const newLeave = {
      id: `leave-${Date.now()}`,
      type: leaveForm.type,
      from: leaveForm.from,
      to: leaveForm.to,
      status: 'Pending',
      reason: leaveForm.reason
    };
    setMyLeaves(prev => [newLeave, ...prev]);
    setLeaveForm({ type: 'Annual Leave', from: '', to: '', reason: '' });
    alert('Leave request submitted successfully to HR queue!');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
  };

  return (
    <DepartmentView
      title="Employee Self-Service Portal"
      subtitle="Personal Activity Timeline, Attendance Clock-In, Leave Balance & HR Confidential Channel"
      stats={initialStats}
      onRefresh={() => alert('Refreshing employee self-service records...')}
      quickActions={[
        { label: isClockedIn ? 'Clock Out' : 'Clock In', icon: isClockedIn ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />, action: 'clock', variant: isClockedIn ? 'danger' : 'primary' },
        { label: 'Apply for Leave', icon: <Calendar className="w-4 h-4" />, action: 'leave', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'clock') toggleClock();
        if (action === 'leave') alert('Please use the Leave Application Form below.');
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Skill Radar Chart */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">Personal Skill Radar</h3>
            <p className="text-slate-400 text-xs mt-1">Comparing current technical proficiency against enterprise engineering benchmarks</p>
          </div>

          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockSkillRadarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" stroke="#94a3b8" textAnchor="middle" />
                <PolarRadiusAxis stroke="#64748b" />
                <Radar name="My Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                <Radar name="Benchmark" dataKey="benchmark" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">Today Activity Timeline</h3>
            <p className="text-slate-400 text-xs mt-1">Real-time log of verified workstation telemetry and attendance events</p>
          </div>

          <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-6 pt-2 pb-2">
            {mockActivityTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-950 group-hover:bg-emerald-400 transition-colors" />
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-400">{item.time}</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-extrabold text-slate-400 border border-slate-700">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recruitment & Hiring_1 Integrated Features: Leave Form, Leave History, HR Messaging */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Apply Leave Form */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 lg:col-span-1">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-purple-400" />
              Apply for Leave
            </h3>
            <p className="text-slate-400 text-xs mt-1">Submit a secure time-off request to HR.</p>
          </div>

          <form onSubmit={handleApplyLeave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Leave Category</label>
              <select 
                value={leaveForm.type} 
                onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Work From Home (WFH)">Work From Home (WFH)</option>
                <option value="Compensatory Off">Compensatory Off</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</label>
                <input 
                  type="date" 
                  value={leaveForm.from} 
                  onChange={(e) => setLeaveForm({ ...leaveForm, from: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-sm text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">End Date</label>
                <input 
                  type="date" 
                  value={leaveForm.to} 
                  onChange={(e) => setLeaveForm({ ...leaveForm, to: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-sm text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reason for Leave</label>
              <textarea 
                value={leaveForm.reason} 
                onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                rows={3}
                placeholder="Provide detailed justification..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button 
              type="button" 
              onClick={() => alert('Workload Audit: Your squad has 0 conflicting leaves during this period. Safe to apply.')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Check Team Workload Conflicts
            </button>

            <button 
              type="submit" 
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* Leave History Table */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 lg:col-span-1">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              My Leave History
            </h3>
            <p className="text-slate-400 text-xs mt-1">Status of recent time-off applications.</p>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="p-3">Type</th>
                  <th className="p-3">Dates & Reason</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 bg-slate-900/20 text-xs">
                {myLeaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 font-bold text-white">{leave.type}</td>
                    <td className="p-3 text-slate-300">
                      <div className="font-semibold text-blue-400">{leave.from} to {leave.to}</div>
                      <div className="text-slate-500 text-[10px] italic mt-0.5 truncate max-w-[150px]">"{leave.reason}"</div>
                    </td>
                    <td className="p-3 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        leave.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HR Confidential Messaging */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 lg:col-span-1 flex flex-col h-[520px]">
          <div className="border-b border-slate-800 pb-4 flex-shrink-0">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-400" />
              Direct Message: HR
            </h3>
            <p className="text-slate-400 text-xs mt-1">Confidential communication channel with HR support.</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 py-2 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.isMe ? 'text-right' : 'text-left'}`}>
                  <div className="mb-1 flex items-center gap-2 px-1 text-[10px] font-bold text-slate-400 justify-end">
                    <span>{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <div className={`rounded-2xl px-4 py-2.5 text-xs ${
                    msg.isMe ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-200 border border-slate-700 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="pt-4 border-t border-slate-800 flex-shrink-0 relative">
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Message HR Support..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-4 pr-12 text-xs text-white focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit" 
              disabled={!chatInput.trim()}
              className="absolute right-2 top-6 bottom-2 aspect-square rounded-lg bg-blue-600 text-white flex items-center justify-center transition disabled:opacity-50 hover:bg-blue-500"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </DepartmentView>
  );
};
