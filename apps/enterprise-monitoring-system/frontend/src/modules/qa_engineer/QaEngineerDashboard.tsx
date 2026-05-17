import React, { useState } from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { StatCardData } from '../../../models/types';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';
import { Bug, CheckCircle, AlertTriangle, FileText, Play } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Automated Test Pass Rate', value: '94.2%', trend: '+2.1% MoM', trendType: 'up', icon: '🛡️', color: 'emerald' },
  { title: 'Active Defect Density', value: '1.2 / KLOC', trend: 'Below threshold', trendType: 'up', icon: '📊', color: 'blue' },
  { title: 'Open P1/P2 Defects', value: '2', trend: 'High priority', trendType: 'down', icon: '🐛', color: 'red' },
  { title: 'Test Cases Executed', value: '1,420', trend: 'Sprint 42', trendType: 'up', icon: '⚡', color: 'purple' },
];

const mockDefectDensityData = [
  { module: 'Core Auth', defects: 2 },
  { module: 'AI Monitoring', defects: 5 },
  { module: 'HR & Payroll', defects: 1 },
  { module: 'GPS Tracking', defects: 4 },
  { module: 'Next.js Frontend', defects: 3 },
];

const mockBugs = [
  { id: 'BUG-101', title: 'MFA TOTP challenge bypasses Redis rate limiter under heavy concurrency', severity: 'CRITICAL', module: 'Core Auth', assignee: 'Michael Chang', status: 'IN_PROGRESS' },
  { id: 'BUG-102', title: 'PyTorch LSTM inference memory leak during batch video bounding box evaluation', severity: 'HIGH', module: 'AI Monitoring', assignee: 'Dr. Aris Thorne', status: 'OPEN' },
  { id: 'BUG-103', title: 'Recharts tooltip flickering on Safari 17 during cash flow hover', severity: 'MEDIUM', module: 'Next.js Frontend', assignee: 'Sarah Jenkins', status: 'RESOLVED' },
];

export const QaEngineerDashboard: React.FC = () => {
  const [bugs, setBugs] = useState(mockBugs);

  const handleResolve = (id: string) => {
    setBugs(prev => prev.map(b => b.id === id ? { ...b, status: 'RESOLVED' } : b));
    alert('Bug marked as RESOLVED. Notification sent to Tech Lead for verification.');
  };

  return (
    <DepartmentView
      title="QA Engineering & Test Automation"
      subtitle="Defect Density Matrix, Bug Tracking Queue & Automated Test Suite Health"
      stats={initialStats}
      onRefresh={() => alert('Refreshing Jira Bug Tracker & SonarQube metrics...')}
      quickActions={[
        { label: 'Run E2E Test Suite', icon: <Play className="w-4 h-4" />, action: 'run_tests', variant: 'primary' },
        { label: 'Log New Defect', icon: <Bug className="w-4 h-4" />, action: 'log_bug', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'run_tests') alert('Initiating Playwright & Cypress End-to-End Automated Test Suite...');
        if (action === 'log_bug') alert('Opening Defect Logging Form...');
      }}
    >
      {/* Defect Density Bar Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Active Defect Density by Module</h3>
          <p className="text-slate-400 text-xs mt-1">Comparing open bug volume across core enterprise subsystems</p>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockDefectDensityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="module" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="defects" name="Active Defects" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bug Tracking Queue Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Defect Tracking Queue</h3>
          <p className="text-slate-400 text-xs mt-1">Review active bug reports, severity classifications, and engineering assignments</p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-4">Defect ID</th>
                <th className="p-4">Summary</th>
                <th className="p-4 text-center">Severity</th>
                <th className="p-4">Module</th>
                <th className="p-4">Assignee</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {bugs.map(bug => (
                <tr key={bug.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-white text-xs">{bug.id}</td>
                  <td className="p-4 font-bold text-white text-sm max-w-md truncate">{bug.title}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider ${
                      bug.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      bug.severity === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {bug.severity}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 text-xs font-medium">{bug.module}</td>
                  <td className="p-4 text-slate-400 text-xs font-medium">{bug.assignee}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      bug.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      bug.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {bug.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {bug.status !== 'RESOLVED' && (
                      <button 
                        onClick={() => handleResolve(bug.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                      >
                        Resolve
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
