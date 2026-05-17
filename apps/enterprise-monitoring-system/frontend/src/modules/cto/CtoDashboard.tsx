import React from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { StatCardData } from '../../../models/types';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  BarChart, Bar
} from 'recharts';
import { Cpu, GitBranch, Server, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Total Engineering Squads', value: '14', trend: '120 Engineers', trendType: 'up', icon: '💻', color: 'blue' },
  { title: 'Average Sprint Velocity', value: '84 pts', trend: '+8 pts QoQ', trendType: 'up', icon: '📈', color: 'emerald' },
  { title: 'System Uptime', value: '99.99%', trend: 'Multi-region AWS', trendType: 'up', icon: '⚡', color: 'purple' },
  { title: 'Open P1 Bugs', value: '0', trend: 'Resolved', trendType: 'up', icon: '🐛', color: 'amber' },
];

const mockVelocityData = [
  { sprint: 'Sprint 37', frontend: 38, backend: 42 },
  { sprint: 'Sprint 38', frontend: 40, backend: 44 },
  { sprint: 'Sprint 39', frontend: 42, backend: 45 },
  { sprint: 'Sprint 40', frontend: 41, backend: 48 },
  { sprint: 'Sprint 41', frontend: 45, backend: 50 },
  { sprint: 'Sprint 42', frontend: 48, backend: 52 },
];

const mockSquads = [
  { name: 'Core Auth & RBAC Squad', lead: 'Michael Chang', members: 8, velocity: 48, status: 'HEALTHY' },
  { name: 'AI Monitoring & Inference Squad', lead: 'Dr. Aris Thorne', members: 12, velocity: 64, status: 'HEALTHY' },
  { name: 'Enterprise Billing & Finance Squad', lead: 'Sarah Jenkins', members: 6, velocity: 36, status: 'HEALTHY' },
  { name: 'Mobile App & Native Agent Squad', lead: 'David Ross', members: 10, velocity: 52, status: 'WARNING' },
];

export const CtoDashboard: React.FC = () => {
  return (
    <DepartmentView
      title="CTO Engineering Command Center"
      subtitle="Cross-Squad Velocity, Architecture Health & System Uptime Telemetry"
      stats={initialStats}
      onRefresh={() => alert('Refreshing engineering metrics...')}
      quickActions={[
        { label: 'Trigger CI/CD Pipeline', icon: <GitBranch className="w-4 h-4" />, action: 'deploy', variant: 'primary' },
        { label: 'Cloud Infrastructure Audit', icon: <Server className="w-4 h-4" />, action: 'audit', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'deploy') alert('Initiating master CI/CD deployment pipeline across all production clusters...');
        if (action === 'audit') alert('Generating AWS/GCP multi-cloud cost and architecture compliance report...');
      }}
    >
      {/* Velocity Line Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Cross-Squad Sprint Velocity</h3>
            <p className="text-slate-400 text-xs mt-1">Comparing completed story points across Frontend and Backend engineering squads</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-300">Frontend Velocity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-300">Backend Velocity</span>
            </div>
          </div>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockVelocityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="sprint" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="frontend" name="Frontend Velocity" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="backend" name="Backend Velocity" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engineering Squads Status Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Active Engineering Squads</h3>
          <p className="text-slate-400 text-xs mt-1">Real-time health, headcount, and sprint velocity tracking per autonomous squad</p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-4">Squad Name</th>
                <th className="p-4">Tech Lead</th>
                <th className="p-4 text-center">Headcount</th>
                <th className="p-4 text-center">Sprint Velocity</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {mockSquads.map((squad, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{squad.name}</td>
                  <td className="p-4 text-slate-300 text-xs font-medium">{squad.lead}</td>
                  <td className="p-4 text-center text-xs font-bold text-slate-400">{squad.members} Engineers</td>
                  <td className="p-4 text-center font-bold text-blue-400 text-xs">{squad.velocity} pts</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      squad.status === 'HEALTHY' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {squad.status === 'HEALTHY' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      <span>{squad.status}</span>
                    </span>
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
