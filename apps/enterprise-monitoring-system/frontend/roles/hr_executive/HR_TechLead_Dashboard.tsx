import React, { useMemo } from 'react';
import { 
  Bot, 
  Code2, 
  GitBranch, 
  LayoutDashboard, 
  MessageSquare, 
  Rocket, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  TrendingUp 
} from 'lucide-react';

export interface User {
  id?: string;
  name: string;
  role?: string;
  department?: string;
}

interface TechLeadDashboardProps {
  user: User;
}

export default function TechLeadDashboard({ user }: TechLeadDashboardProps) {
  const stats = useMemo(() => [
    { label: 'Project Velocity', value: '84%', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Active Sprints', value: '3', icon: Rocket, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Pending Reviews', value: '12', icon: GitBranch, color: 'text-amber-500' },
    { label: 'System Health', value: 'Optimal', icon: ShieldCheck, color: 'text-indigo-500' },
  ], []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="glass-panel p-8 relative overflow-hidden bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[28px] shadow-sm">
        <div className="relative z-10 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            <Terminal className="h-4 w-4" />
            Engineering Command Center
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            Welcome back, {user?.name || 'Tech Lead'}
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 text-xs">
            Tech Lead Dashboard • Overseeing system architecture and delivery flow.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-panel p-6 transition-all hover:translate-y-[-2px] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[22px] shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`rounded-2xl bg-slate-50 dark:bg-slate-950 p-3 ${stat.color} border border-slate-100 dark:border-slate-800`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-950 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Workflow Section */}
        <div className="lg:col-span-2 space-y-6">
          <section className="glass-panel p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[28px] shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Active Workstreams
              </h2>
              <button onClick={() => alert('Opening active workstreams view...')} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Core API Hardening', status: 'In Review', progress: 75, risk: 'Low' },
                { name: 'Unified Dashboard Integration', status: 'In Progress', progress: 45, risk: 'Medium' },
                { name: 'AI Attrition Model v2', status: 'Blocked', progress: 30, risk: 'High' },
              ].map((project) => (
                <div key={project.name} className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-5 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">{project.name}</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      project.risk === 'High' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                      project.risk === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {project.risk} Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-500">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[28px] shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Code2 className="h-5 w-5 text-purple-400" />
                Code Quality Signals & AI Insights
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950 p-6 text-white border border-slate-800 shadow-inner">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                  <GitBranch className="h-5 w-5 text-amber-400" />
                  <span className="font-bold text-sm">Open Pull Requests</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-white/70">#142 Payment Fix</span>
                    <span className="text-amber-400 font-bold">Review Required</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-white/70">#139 Auth Refactor</span>
                    <span className="text-emerald-400 font-bold">Passing Tests</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 flex flex-col justify-between shadow-inner">
                <div>
                  <div className="flex items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold text-slate-900 dark:text-white text-sm">AI Insights</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "Candidate #42 shows high potential for the Senior Backend role based on current team skill gaps."
                  </p>
                </div>
                <button 
                  onClick={() => alert('Scheduling candidate interview...')}
                  className="mt-4 w-full py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold transition-colors"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Activity Section */}
        <div className="space-y-6">
          <section className="glass-panel p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[28px] shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400" />
                Team Status
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Sarah Chen', role: 'Sr. Frontend', status: 'online' },
                { name: 'Alex Rivera', role: 'DevOps', status: 'busy' },
                { name: 'James Wilson', role: 'Backend', status: 'online' },
              ].map((member) => (
                <div key={member.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-xs font-extrabold text-blue-600 dark:text-blue-400 border border-blue-600/20">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{member.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${member.status === 'online' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-amber-500 shadow-lg shadow-amber-500/50'}`} />
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[28px] shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-400" />
                Recent Signal
              </h2>
            </div>
            <div className="space-y-6 relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 pl-6 pt-2 pb-2">
              {[
                { actor: 'System', text: 'Deployment to staging successful', time: '12m ago' },
                { actor: 'Sarah', text: 'Merged PR #138', time: '45m ago' },
                { actor: 'Security', text: 'Critical patch applied', time: '2h ago' },
              ].map((activity, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-950 group-hover:bg-emerald-400 transition-colors" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{activity.actor}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-extrabold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {activity.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
