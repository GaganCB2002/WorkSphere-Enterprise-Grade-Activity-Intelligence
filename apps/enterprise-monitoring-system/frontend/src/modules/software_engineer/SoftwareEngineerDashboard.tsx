import React, { useState } from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { StatCardData } from '../../../models/types';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';
import { CheckSquare, Clock, GitCommit, CheckCircle, Circle, Play } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Sprint Tasks Completed', value: '8 / 10', trend: '80% done', trendType: 'up', icon: '⚡', color: 'emerald' },
  { title: 'Weekly Code Commits', value: '42', trend: '+12 vs avg', trendType: 'up', icon: '💻', color: 'blue' },
  { title: 'AI Productivity Score', value: '94.5%', trend: 'Highly productive', trendType: 'up', icon: '📈', color: 'purple' },
  { title: 'Active Working Hours', value: '38.2h', trend: 'Sprint 42', trendType: 'neutral', icon: '⏳', color: 'amber' },
];

const mockCommitVelocity = [
  { day: 'Mon', commits: 6, lines: 320 },
  { day: 'Tue', commits: 10, lines: 540 },
  { day: 'Wed', commits: 12, lines: 810 },
  { day: 'Thu', commits: 8, lines: 410 },
  { day: 'Fri', commits: 6, lines: 290 },
];

const mockTasks = [
  { id: 'task-1', title: 'Implement Next.js externalDir path aliases in next.config.ts', status: 'DONE', priority: 'HIGH', estimatedHours: 4 },
  { id: 'task-2', title: 'Create Visual RBAC Permission Matrix table component', status: 'IN_PROGRESS', priority: 'CRITICAL', estimatedHours: 8 },
  { id: 'task-3', title: 'Write Jest unit tests for Redux Saga authentication workers', status: 'TODO', priority: 'MEDIUM', estimatedHours: 6 },
];

export const SoftwareEngineerDashboard: React.FC = () => {
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'DONE' ? 'TODO' : 'DONE' } : t));
  };

  return (
    <DepartmentView
      title="Software Engineer Workstation"
      subtitle="Personal Activity Timeline, Task Checklist, Commit Velocity & Sprint View"
      stats={initialStats}
      onRefresh={() => alert('Refreshing personal GitHub & Jira board...')}
      quickActions={[
        { label: 'Clock In (Attendance)', icon: <Play className="w-4 h-4" />, action: 'clock_in', variant: 'primary' },
        { label: 'Sync Git Commits', icon: <GitCommit className="w-4 h-4" />, action: 'sync_git', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'clock_in') alert('Clocked in successfully. Hardware telemetry tracking active.');
        if (action === 'sync_git') alert('Synchronized 42 local commits with remote repository.');
      }}
    >
      {/* Code Commit Velocity Line Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Daily Commit & LOC Velocity</h3>
            <p className="text-slate-400 text-xs mt-1">Tracking personal repository commits and lines of code modified this week</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-300">Commits</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-slate-300">Lines Modified (/10)</span>
            </div>
          </div>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockCommitVelocity} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="commits" name="Commits" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="lines" name="Lines Modified (/10)" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sprint Task Checklist */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Sprint 42 Assigned Tasks</h3>
          <p className="text-slate-400 text-xs mt-1">Personal Kanban task checklist and estimated burndown hours</p>
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {task.status === 'DONE' ? <CheckCircle className="w-6 h-6 text-emerald-400" /> : <Circle className="w-6 h-6" />}
                </button>
                <div>
                  <h5 className={`font-bold text-sm ${task.status === 'DONE' ? 'text-slate-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </h5>
                  <span className="text-xs text-slate-500 font-medium block mt-0.5">
                    Est: {task.estimatedHours}h — Priority: <strong className="text-blue-400">{task.priority}</strong>
                  </span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                task.status === 'DONE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                task.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                'bg-slate-500/10 text-slate-400 border border-slate-500/20'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DepartmentView>
  );
};
