import React from 'react';
import { DepartmentView } from '../../dashboards/DepartmentView';
import { StatCardData } from '../../models/types';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Shield, TrendingUp, Users, DollarSign, Award, FileText, CheckCircle } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Annual Recurring Revenue', value: '$148.5M', trend: '+18.4% YoY', trendType: 'up', icon: '💰', color: 'emerald' },
  { title: 'Total Headcount', value: '1,420', trend: 'Across 17 Depts', trendType: 'up', icon: '👥', color: 'blue' },
  { title: 'Enterprise Productivity', value: '92.4%', trend: 'AI Benchmark', trendType: 'up', icon: '⚡', color: 'purple' },
  { title: 'Client Retention Rate', value: '98.7%', trend: '+0.5% QoQ', trendType: 'up', icon: '⭐', color: 'amber' },
];

const mockRevenueData = [
  { month: 'Jan', revenue: 10.2, target: 9.5 },
  { month: 'Feb', revenue: 11.0, target: 10.0 },
  { month: 'Mar', revenue: 11.5, target: 10.5 },
  { month: 'Apr', revenue: 12.1, target: 11.0 },
  { month: 'May', revenue: 12.8, target: 11.5 },
  { month: 'Jun', revenue: 13.5, target: 12.0 },
  { month: 'Jul', revenue: 14.2, target: 12.5 },
  { month: 'Aug', revenue: 14.9, target: 13.0 },
  { month: 'Sep', revenue: 15.6, target: 13.5 },
  { month: 'Oct', revenue: 16.3, target: 14.0 },
  { month: 'Nov', revenue: 17.1, target: 14.5 },
  { month: 'Dec', revenue: 18.5, target: 15.0 },
];

const mockDeptRadarData = [
  { dept: 'Engineering', headcount: 450, budget: 120, satisfaction: 94 },
  { dept: 'Sales', headcount: 280, budget: 95, satisfaction: 88 },
  { dept: 'Marketing', headcount: 150, budget: 80, satisfaction: 91 },
  { dept: 'Support', headcount: 220, budget: 60, satisfaction: 85 },
  { dept: 'HR & Finance', headcount: 120, budget: 50, satisfaction: 96 },
  { dept: 'Cyber & DevOps', headcount: 200, budget: 110, satisfaction: 93 },
];

const mockOkrs = [
  { objective: 'Expand Enterprise Market Share in North America by 25%', progress: 78, owner: 'Alex Patel (VP Sales)' },
  { objective: 'Achieve SOC2 Type II & ISO27001 Re-certification', progress: 100, owner: 'David Ross (CISO)' },
  { objective: 'Deploy Next-Gen AI Productivity LSTM across all squads', progress: 92, owner: 'Michael Chang (CTO)' },
  { objective: 'Maintain sub-15 minute average customer resolution time', progress: 85, owner: 'Rachel Green (VP Support)' },
];

export const CeoDashboard: React.FC = () => {
  return (
    <DepartmentView
      title="CEO Executive Board Hub"
      subtitle="Global Enterprise Performance, 12-Month Revenue & Strategic OKRs"
      stats={initialStats}
      onRefresh={() => alert('Refreshing executive board metrics...')}
      onExport={() => alert('Exporting Claude LLM Executive Board Summary PDF...')}
      quickActions={[
        { label: 'Executive Board Report', icon: <FileText className="w-4 h-4" />, action: 'board_report', variant: 'primary' },
        { label: 'Strategic OKRs', icon: <Award className="w-4 h-4" />, action: 'okrs', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'board_report') alert('Generating AI Executive Board Summary...');
        if (action === 'okrs') alert('Navigating to Strategic OKR Planner...');
      }}
    >
      {/* Executive Privacy Exemption Banner */}
      <div className="bg-gradient-to-r from-purple-900/40 via-blue-900/30 to-slate-900/40 backdrop-blur-xl border border-purple-500/40 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 shadow-lg shadow-purple-500/20">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Executive Privacy Shield Active</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                Tracking Offline
              </span>
            </h3>
            <p className="text-slate-300 text-xs mt-1 font-medium max-w-2xl">
              As Chief Executive Officer, your workstation telemetry, background screen capture, and app usage polling are explicitly disabled per enterprise governance policy.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-2.5 shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Telemetry Exemption Verified</span>
        </div>
      </div>

      {/* Charts Section: Revenue & Dept Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 12-Month Revenue Bar Chart */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white">12-Month Revenue Performance</h3>
              <p className="text-slate-400 text-xs mt-1">Actual Revenue vs Target Quota ($ Millions)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-300">Actual Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-slate-300">Target Quota</span>
              </div>
            </div>
          </div>

          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="revenue" name="Actual Revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" name="Target Quota" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Headcount & Budget Radar */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Department Allocation Radar</h3>
              <p className="text-slate-400 text-xs mt-1">Multi-variable balance across headcount, budget, and employee satisfaction</p>
            </div>
          </div>

          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockDeptRadarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="dept" stroke="#94a3b8" textAnchor="middle" />
                <PolarRadiusAxis stroke="#64748b" />
                <Radar name="Headcount" dataKey="headcount" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                <Radar name="Budget Allocation" dataKey="budget" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Claude AI Executive Board Summary */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Claude LLM Executive Board Summary</h3>
              <p className="text-slate-400 text-xs mt-1">Real-time natural language synthesis of enterprise telemetry, P&L, and squad velocity</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
            AI Generated
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-inner text-slate-300 text-sm leading-relaxed">
          <p>
            <strong className="text-white">Executive Synthesis:</strong> The enterprise is demonstrating exceptional operational momentum entering Q3. Annual Recurring Revenue (ARR) has expanded by 18.4% YoY, driven by strong enterprise expansions in the North American financial services sector. 
          </p>
          <p>
            <strong className="text-white">Productivity & AI Monitoring:</strong> Overall employee productivity scores have stabilized at 92.4% following the rollout of the LSTM behavior prediction engine. Engineering squad velocity shows a 14% increase in sprint burndown efficiency with zero critical security regressions.
          </p>
          <p>
            <strong className="text-white">Strategic Recommendation:</strong> Accelerate hiring within the DevOps and Cybersecurity squads to support the upcoming multi-region AWS infrastructure scaling. Capital allocation remains well within the projected $150M annual budget ceiling.
          </p>
        </div>
      </div>

      {/* Strategic OKRs Tracker */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Strategic Enterprise OKRs (Q3)</h3>
          <p className="text-slate-400 text-xs mt-1">Tracking top-level Objectives and Key Results across department leadership</p>
        </div>

        <div className="space-y-6">
          {mockOkrs.map((okr, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h5 className="font-bold text-white text-sm">{okr.objective}</h5>
                <span className="text-xs text-slate-400 font-medium">Owner: <strong className="text-slate-200">{okr.owner}</strong></span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Progress</span>
                  <span className={okr.progress === 100 ? 'text-emerald-400' : 'text-blue-400'}>{okr.progress}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      okr.progress === 100 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-blue-600 shadow-lg shadow-blue-600/20'
                    }`} 
                    style={{ width: `${okr.progress}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DepartmentView>
  );
};
