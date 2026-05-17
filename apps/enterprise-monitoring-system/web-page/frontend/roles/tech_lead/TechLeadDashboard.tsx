import React, { useState } from 'react';
import { DepartmentView } from '../../dashboards/DepartmentView';
import { StatCardData } from '../../models/types';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  BarChart, Bar
} from 'recharts';
import { GitBranch, GitPullRequest, Bug, CheckCircle, Clock, Check, X, LayoutDashboard, Code2, Bot, Sparkles, MessageSquare } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Weekly Git Commits', value: '428', trend: '+35 this week', trendType: 'up', icon: '💻', color: 'blue' },
  { title: 'Pending Pull Requests', value: '8', trend: 'Requires code review', trendType: 'down', icon: '🔄', color: 'amber' },
  { title: 'Code Coverage', value: '88.4%', trend: 'Jest + SonarQube', trendType: 'up', icon: '🛡️', color: 'emerald' },
  { title: 'Open P1/P2 Bugs', value: '2', trend: 'High priority', trendType: 'down', icon: '🐛', color: 'red' },
];

const mockGitActivity = [
  { day: 'Mon', commits: 64, prs: 12 },
  { day: 'Tue', commits: 82, prs: 18 },
  { day: 'Wed', commits: 95, prs: 22 },
  { day: 'Thu', commits: 110, prs: 25 },
  { day: 'Fri', commits: 77, prs: 15 },
];

const mockPrs = [
  { id: 'PR-1042', title: 'refactor(auth): migrate to Next.js 15 externalDir architecture', author: 'Sarah Jenkins', branch: 'feature/next15-external', additions: 420, deletions: 112, status: 'OPEN' },
  { id: 'PR-1043', title: 'feat(ai): integrate PyTorch LSTM productivity scoring endpoint', author: 'Michael Chang', branch: 'feature/ai-lstm-scoring', additions: 850, deletions: 45, status: 'OPEN' },
  { id: 'PR-1041', title: 'fix(gps): resolve WinRT hardware telemetry geolocation accuracy', author: 'David Ross', branch: 'fix/winrt-gps-lock', additions: 64, deletions: 88, status: 'APPROVED' },
];

const mockWorkstreams = [
  { name: 'Core API Hardening', status: 'In Review', progress: 75, risk: 'Low' },
  { name: 'Unified Dashboard Integration', status: 'In Progress', progress: 45, risk: 'Medium' },
  { name: 'AI Attrition Model v2', status: 'Blocked', progress: 30, risk: 'High' },
];

const mockTeamStatus = [
  { name: 'Sarah Chen', role: 'Sr. Frontend', status: 'online' },
  { name: 'Alex Rivera', role: 'DevOps', status: 'busy' },
  { name: 'James Wilson', role: 'Backend', status: 'online' },
];

const mockSignals = [
  { actor: 'System', text: 'Deployment to staging successful', time: '12m ago' },
  { actor: 'Sarah', text: 'Merged PR #138', time: '45m ago' },
  { actor: 'Security', text: 'Critical patch applied', time: '2h ago' },
];

export const TechLeadDashboard: React.FC = () => {
  const [prs, setPrs] = useState(mockPrs);
  const [workstreams, setWorkstreams] = useState(mockWorkstreams);

  const handleApprove = (id: string) => {
    setPrs(prev => prev.map(pr => pr.id === id ? { ...pr, status: 'APPROVED' } : pr));
    alert('Pull Request approved. Merging into develop branch...');
  };

  return (
    <DepartmentView
      title="Tech Lead Engineering Command"
      subtitle="Git Commit Velocity, Code Review Queue, Active Workstreams & CI/CD Deployment Telemetry"
      stats={initialStats}
      onRefresh={() => alert('Refreshing GitHub repository state...')}
      quickActions={[
        { label: 'Create Pull Request', icon: <GitPullRequest className="w-4 h-4" />, action: 'create_pr', variant: 'primary' },
        { label: 'Trigger SonarQube Audit', icon: <CheckCircle className="w-4 h-4" />, action: 'sonar', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'create_pr') alert('Opening GitHub Pull Request Creation Modal...');
        if (action === 'sonar') alert('Initiating SonarQube static code analysis and vulnerability scan...');
      }}
    >
      {/* Git Activity Line Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 mb-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Weekly Git Commit Velocity</h3>
            <p className="text-slate-400 text-xs mt-1">Comparing daily commit volume against open pull request requests</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-300">Git Commits</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-slate-300">Pull Requests</span>
            </div>
          </div>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockGitActivity} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="commits" name="Git Commits" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="prs" name="Pull Requests" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pull Requests Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 mb-8">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Pending Code Reviews (GitHub PRs)</h3>
          <p className="text-slate-400 text-xs mt-1">Review squad code modifications, test coverage, and branch mergeability</p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-4">Pull Request</th>
                <th className="p-4">Author</th>
                <th className="p-4 text-center">Diff</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {prs.map(pr => (
                <tr key={pr.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-400">{pr.id}</span>
                      <h5 className="font-bold text-white text-sm">{pr.title}</h5>
                    </div>
                    <span className="text-xs text-slate-500 font-mono mt-0.5 block">{pr.branch}</span>
                  </td>
                  <td className="p-4 text-slate-300 text-xs font-medium">{pr.author}</td>
                  <td className="p-4 text-center text-xs font-mono">
                    <span className="text-emerald-400 font-bold">+{pr.additions}</span> / <span className="text-red-400 font-bold">-{pr.deletions}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      pr.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {pr.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {pr.status === 'OPEN' ? (
                      <button 
                        onClick={() => handleApprove(pr.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                      >
                        Approve PR
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 font-bold">Merged</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recruitment & Hiring_1 Integrated Features: Active Workstreams, Code Quality Signals, Team Status, Recent Signal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Workstreams & Code Quality Signals */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-blue-400" />
                Active Workstreams
              </h3>
              <button 
                onClick={() => alert('Opening full project backlog...')} 
                className="text-xs font-bold text-blue-400 hover:underline"
              >
                View All Epics
              </button>
            </div>
            
            <div className="space-y-4">
              {workstreams.map((project) => (
                <div key={project.name} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-white text-sm">{project.name}</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      project.risk === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                      project.risk === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {project.risk} Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                Code Quality Signals & AI Insights
              </h3>
              <p className="text-slate-400 text-xs mt-1">Automated static analysis and ML candidate matching recommendations</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950 p-6 border border-slate-800 shadow-inner">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                  <GitBranch className="h-5 w-5 text-amber-400" />
                  <span className="font-bold text-white text-sm">Open Pull Requests</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">#142 Payment Fix</span>
                    <span className="text-amber-400 font-bold">Review Required</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">#139 Auth Refactor</span>
                    <span className="text-emerald-400 font-bold">Passing Tests</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                    <Bot className="h-5 w-5 text-blue-400" />
                    <span className="font-bold text-white text-sm">AI Recruitment Match</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "Candidate #42 shows high potential for the Senior Backend role based on current squad skill gaps and commit velocity history."
                  </p>
                </div>
                <button 
                  onClick={() => alert('Scheduling candidate interview with squad lead...')}
                  className="mt-4 w-full py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-bold transition-colors"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Team Status & Recent Signals */}
        <div className="space-y-8 lg:col-span-1">
          <section className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Squad Presence
              </h3>
              <p className="text-slate-400 text-xs mt-1">Real-time availability of engineering squad members</p>
            </div>

            <div className="space-y-4">
              {mockTeamStatus.map((member) => (
                <div key={member.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-extrabold text-blue-400">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{member.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${member.status === 'online' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-amber-500 shadow-lg shadow-amber-500/50'}`} />
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                Recent System Signals
              </h3>
              <p className="text-slate-400 text-xs mt-1">Live stream of automated CI/CD and security audit logs</p>
            </div>

            <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-6 pt-2 pb-2">
              {mockSignals.map((activity, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-950 group-hover:bg-emerald-400 transition-colors" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-400">{activity.actor}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-extrabold text-slate-400 border border-slate-700">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {activity.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DepartmentView>
  );
};
