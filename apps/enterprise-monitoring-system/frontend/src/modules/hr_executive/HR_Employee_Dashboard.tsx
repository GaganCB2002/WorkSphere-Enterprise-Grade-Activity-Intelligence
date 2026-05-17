import React, { useState, useEffect, useRef } from 'react';
import { Send, Clock, CheckCircle2, FileText, CalendarCheck, Sparkles } from 'lucide-react';
import { SectionCard, StatusBadge } from './DashboardPage';

export interface User {
  id?: string;
  employeeId?: string;
  name: string;
  role?: string;
  department?: string;
}

export interface PlatformData {
  attendance?: {
    leaveRequests?: { id: string; employeeName: string; type: string; from: string; to: string; status: string; reason: string }[];
  };
}

// Mock API client
const mockApi = {
  getChatMessages: async (token: string, roomId?: string, channel?: string) => {
    return [
      { id: 1, senderId: 'hr-1', senderName: 'HR Support', content: 'Hello! How can we assist you today with your leave or payroll inquiries?', timestamp: Date.now() - 3600000 },
      { id: 2, senderId: 'emp-1', senderName: 'You', content: 'Hi, I submitted an annual leave request. When will it be reviewed?', timestamp: Date.now() - 1800000 },
      { id: 3, senderId: 'hr-1', senderName: 'HR Support', content: 'It is in the current queue and will be processed by end of day today.', timestamp: Date.now() - 600000 },
    ];
  },
  sendMessage: async (payload: any, token: string) => {
    return { success: true };
  }
};

// Mock Socket client
const mockSocket = {
  emit: (event: string, data: any) => console.log('Socket emit:', event, data),
  on: (event: string, callback: any) => console.log('Socket on:', event),
  off: (event: string, callback: any) => console.log('Socket off:', event),
};

export function EmployeeDashboardPage({ platform, user, token }: { platform: PlatformData; user: User; token: string }) {
  const [form, setForm] = useState({
    employeeId: user?.employeeId ?? user?.id ?? 'emp-1',
    employeeName: user?.name || 'Employee',
    type: 'Annual Leave',
    from: '',
    to: '',
    reason: '',
  });

  const [myLeaves, setMyLeaves] = useState(platform?.attendance?.leaveRequests?.filter(r => r.employeeName === (user?.name || 'Employee')) || [
    { id: 'leave-1', employeeName: user?.name || 'Employee', type: 'Annual Leave', from: '2026-06-10', to: '2026-06-15', status: 'Approved', reason: 'Summer vacation' },
    { id: 'leave-2', employeeName: user?.name || 'Employee', type: 'Sick Leave', from: '2026-04-12', to: '2026-04-13', status: 'Approved', reason: 'Medical appointment' }
  ]);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const hrChannel = 'hr-confidential';

  useEffect(() => {
    mockSocket.emit('join_room', hrChannel);

    mockApi.getChatMessages(token, undefined, hrChannel).then(setMessages).catch(() => {});

    const handleNewMessage = (msg: any) => {
      if (msg.groupId === hrChannel) {
        setMessages(prev => [...prev, msg]);
      }
    };

    mockSocket.on('new_message', handleNewMessage);
    return () => {
      mockSocket.off('new_message', handleNewMessage);
    };
  }, [token]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleApplyLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.reason) return;

    const newLeave = {
      id: `leave-${Date.now()}`,
      employeeId: form.employeeId,
      employeeName: form.employeeName,
      type: form.type,
      from: form.from,
      to: form.to,
      status: 'Pending',
      reason: form.reason
    };

    setMyLeaves(prev => [newLeave, ...prev]);
    setForm({ ...form, from: '', to: '', reason: '' });
    alert("Leave request submitted successfully!");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      senderId: user?.id || 'emp-1',
      senderName: user?.name || 'You',
      content: chatInput,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMsg]);
    await mockApi.sendMessage({
      groupId: hrChannel,
      content: chatInput,
      type: 'text',
    }, token);

    setChatInput('');
  };

  const statCards = [
    { label: 'Pending Reviews', value: 2, icon: FileText, tone: 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-500/20' },
    { label: 'Tasks Completed', value: 15, icon: CheckCircle2, tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-500/20' },
    { label: 'Leave Balance', value: '18 Days', icon: CalendarCheck, tone: 'bg-sky-50 text-sky-700 dark:bg-sky-950/20 dark:text-sky-400 border border-sky-500/20' },
    { label: 'Hours Tracked', value: '38h 45m', icon: Clock, tone: 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-500/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <div className="p-6 lg:p-8 border-b border-slate-100 dark:border-slate-800">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Employee Dashboard</p>
          <h1 className="mt-2 text-3xl font-display font-bold text-slate-950 dark:text-white">
            Welcome back, {user?.name || 'Employee'}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-xs">
            {user?.role || 'EMPLOYEE'} • {user?.department || 'Engineering'}
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-[22px] bg-white p-5 border border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{stat.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${stat.tone}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <SectionCard title="Apply for Leave" subtitle="Submit a time-off request.">
            <form onSubmit={handleApplyLeave} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  {['Annual Leave', 'Sick Leave', 'WFH', 'Comp Off'].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <input
                  type="date"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                  value={form.from}
                  onChange={(e) => setForm({ ...form, from: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                  value={form.to}
                  onChange={(e) => setForm({ ...form, to: e.target.value })}
                />
                <button 
                  type="button" 
                  onClick={() => alert('Workload Audit: Your squad has 0 conflicting leaves during this period. Safe to apply.')}
                  className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  Check Team Workload
                </button>
              </div>

              <textarea
                required
                className="min-h-[100px] rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                placeholder="Reason for leave..."
              />
              <button type="submit" className="rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition">
                Submit Request
              </button>
            </form>
          </SectionCard>

          <SectionCard title="My Leave History" subtitle="Status of your recent applications.">
            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
              <table className="min-w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3 font-extrabold uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 font-extrabold uppercase tracking-wider">Dates & Reason</th>
                    <th className="px-4 py-3 font-extrabold uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-slate-900/20">
                  {myLeaves.map(leave => (
                    <tr key={leave.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-900 dark:text-white">{leave.type}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                        <div className="font-semibold text-blue-400">{leave.from} to {leave.to}</div>
                        <p className="text-[10px] italic mt-0.5 max-w-[200px] truncate text-slate-500">"{leave.reason}"</p>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <StatusBadge label={leave.status} />
                        {(leave as any).hrReason && (
                          <p className="text-[10px] text-rose-500 mt-1 font-bold">Note: {(leave as any).hrReason}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                  {myLeaves.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-slate-500">No leave requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Direct Message: HR" subtitle="Instant communication with HR support.">
            <div className="flex flex-col h-[500px] bg-slate-50 dark:bg-slate-950/40 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-inner">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, i) => {
                  const isMe = msg.senderId === (user?.id || 'emp-1');
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] ${isMe ? 'text-right' : 'text-left'}`}>
                        <div className="mb-1 flex items-center gap-2 px-1 text-[10px] font-bold text-slate-400 justify-end">
                          <span>{isMe ? 'You' : msg.senderName}</span>
                          <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className={`rounded-2xl px-4 py-2.5 text-xs ${isMe ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-100 dark:border-slate-700'}`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative">
                <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Message HR Support..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-blue-500 dark:bg-slate-950 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="absolute right-1 top-1 bottom-1 aspect-square rounded-lg bg-blue-600 text-white flex items-center justify-center transition disabled:opacity-50 hover:bg-blue-500"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
