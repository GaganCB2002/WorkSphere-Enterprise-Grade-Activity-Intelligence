import React, { useState } from 'react';
import { DepartmentView } from '../../dashboards/DepartmentView';
import { StatCardData } from '../../models/types';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';
import { MessageSquare, Phone, Clock, Smile, CheckCircle, Clock3 } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Avg Resolution Time', value: '14.2m', trend: '-2.4m vs target', trendType: 'up', icon: '⚡', color: 'emerald' },
  { title: 'Customer Satisfaction', value: '98.2%', trend: 'Highly rated', trendType: 'up', icon: '⭐', color: 'blue' },
  { title: 'Live Chat Sentiment', value: 'Positive (92%)', trend: 'BERT Transformer', trendType: 'up', icon: '😊', color: 'purple' },
  { title: 'Active Ticket Queue', value: '12', trend: 'Assigned', trendType: 'neutral', icon: '⏳', color: 'amber' },
];

const mockTicketData = [
  { category: 'Login / MFA Issues', tickets: 42 },
  { category: 'Billing / Invoice Inquiries', tickets: 28 },
  { category: 'Agent Telemetry Setup', tickets: 35 },
  { category: 'API Key Generation', tickets: 18 },
  { category: 'General Guidance', tickets: 15 },
];

const mockTickets = [
  { id: 'TCK-501', client: 'Acme Corp', subject: 'Unable to verify TOTP Google Authenticator code', priority: 'HIGH', sentiment: 'FRUSTRATED (84%)', status: 'IN_PROGRESS', time: '12m ago' },
  { id: 'TCK-502', client: 'Global Dynamics', subject: 'Requesting invoice breakdown for AWS EKS multi-cloud cluster', priority: 'MEDIUM', sentiment: 'NEUTRAL (90%)', status: 'OPEN', time: '28m ago' },
  { id: 'TCK-503', client: 'Vortex Cloud', subject: 'Desktop agent failing to capture screen on macOS Sonoma', priority: 'CRITICAL', sentiment: 'ANGRY (95%)', status: 'IN_PROGRESS', time: '5m ago' },
];

export const SupportAgentDashboard: React.FC = () => {
  const [tickets, setTickets] = useState(mockTickets);

  const handleCloseTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'CLOSED' } : t));
    alert('Ticket resolved successfully. CSAT feedback survey dispatched to client.');
  };

  return (
    <DepartmentView
      title="Customer Success & Support"
      subtitle="Ticket Queue, Resolution Time Analytics & BERT Live Chat Sentiment"
      stats={initialStats}
      onRefresh={() => alert('Refreshing Zendesk & Intercom support queues...')}
      quickActions={[
        { label: 'Open Live Chat', icon: <MessageSquare className="w-4 h-4" />, action: 'live_chat', variant: 'primary' },
        { label: 'View Call Logs', icon: <Phone className="w-4 h-4" />, action: 'call_logs', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'live_chat') alert('Opening Live Customer Chat Terminal...');
        if (action === 'call_logs') alert('Opening VoIP Call Recording & Transcript History...');
      }}
    >
      {/* Ticket Category Bar Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Ticket Volume by Category</h3>
          <p className="text-slate-400 text-xs mt-1">Breakdown of incoming customer success inquiries across enterprise modules</p>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockTicketData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="category" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="tickets" name="Active Tickets" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ticket Queue Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Active Customer Ticket Queue</h3>
          <p className="text-slate-400 text-xs mt-1">Review incoming support requests, AI sentiment analysis scores, and SLA timers</p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-4">Ticket ID</th>
                <th className="p-4">Client Name</th>
                <th className="p-4">Subject</th>
                <th className="p-4 text-center">Priority</th>
                <th className="p-4 text-center">AI Sentiment</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {tickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-white text-xs">{ticket.id}</td>
                  <td className="p-4 font-bold text-white text-sm">{ticket.client}</td>
                  <td className="p-4 text-slate-300 text-xs font-medium max-w-md truncate">{ticket.subject}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider ${
                      ticket.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      ticket.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-xs text-purple-400">{ticket.sentiment}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      ticket.status === 'CLOSED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {ticket.status !== 'CLOSED' && (
                      <button 
                        onClick={() => handleCloseTicket(ticket.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                      >
                        Resolve Ticket
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DepartmentView>
  );
};
