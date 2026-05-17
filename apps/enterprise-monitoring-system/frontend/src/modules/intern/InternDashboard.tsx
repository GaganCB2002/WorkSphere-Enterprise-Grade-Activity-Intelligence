import React, { useState } from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { StatCardData } from '../../../models/types';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';
import { BookOpen, UserCheck, CheckCircle, Clock, Award, Star } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Learning Modules Completed', value: '14 / 18', trend: '78% completed', trendType: 'up', icon: '📚', color: 'blue' },
  { title: 'Mentor Evaluation Score', value: '4.8 / 5.0', trend: 'Exceeding expectations', trendType: 'up', icon: '⭐', color: 'emerald' },
  { title: 'Assigned Sprint Tasks', value: '3', trend: 'Sprint 42', trendType: 'neutral', icon: '⚡', color: 'purple' },
  { title: 'Internship Duration', value: 'Week 6 / 12', trend: 'Midpoint review', trendType: 'up', icon: '⏳', color: 'amber' },
];

const mockLearningModules = [
  { module: 'Git & GitHub Workflows', progress: 100, score: 95 },
  { module: 'React 18 & Next.js Basics', progress: 100, score: 92 },
  { module: 'TypeScript Type Safety', progress: 85, score: 88 },
  { module: 'Spring Boot REST APIs', progress: 60, score: 80 },
  { module: 'Docker Containerization', progress: 30, score: 75 },
];

const mockTasks = [
  { id: 'int-task-1', title: 'Fix CSS responsiveness in DepartmentView mobile layout', status: 'DONE', mentor: 'Sarah Jenkins' },
  { id: 'int-task-2', title: 'Add Jest unit test coverage for StatCard trend calculations', status: 'IN_PROGRESS', mentor: 'Sarah Jenkins' },
  { id: 'int-task-3', title: 'Pair program with Tech Lead on Redis JWT token rotation', status: 'TODO', mentor: 'Michael Chang' },
];

export const InternDashboard: React.FC = () => {
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'DONE' ? 'TODO' : 'DONE' } : t));
  };

  return (
    <DepartmentView
      title="Internship & Onboarding Portal"
      subtitle="Learning Path Progress, Mentor Evaluations & Assigned Task Checklist"
      stats={initialStats}
      onRefresh={() => alert('Refreshing internship learning portal...')}
      quickActions={[
        { label: 'Request Mentor Review', icon: <UserCheck className="w-4 h-4" />, action: 'mentor_review', variant: 'primary' },
        { label: 'Access Learning LMS', icon: <BookOpen className="w-4 h-4" />, action: 'lms', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'mentor_review') alert('Notification dispatched to assigned mentor (Sarah Jenkins) for 1-on-1 code review...');
        if (action === 'lms') alert('Opening Enterprise Learning Management System (LMS)...');
      }}
    >
      {/* Learning Path Progress Bar Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Learning Path Module Completion</h3>
          <p className="text-slate-400 text-xs mt-1">Tracking completion percentage and quiz assessment scores across core onboarding modules</p>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockLearningModules} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="module" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="progress" name="Module Progress (%)" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="score" name="Assessment Score (%)" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Intern Tasks Checklist */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Assigned Intern Tasks</h3>
          <p className="text-slate-400 text-xs mt-1">Review assigned starter tasks and designated mentor supervisors</p>
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {task.status === 'DONE' ? <CheckCircle className="w-6 h-6 text-emerald-400" /> : <Clock className="w-6 h-6" />}
                </button>
                <div>
                  <h5 className={`font-bold text-sm ${task.status === 'DONE' ? 'text-slate-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </h5>
                  <span className="text-xs text-slate-500 font-medium block mt-0.5">
                    Assigned Mentor: <strong className="text-blue-400">{task.mentor}</strong>
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
