import React, { useState } from 'react';
import { Task, Project } from '../models/types';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid 
} from 'recharts';
import { 
  Plus, CheckCircle, Clock, AlertCircle, User, Calendar, Tag, ArrowRight, X, Play, Check 
} from 'lucide-react';

interface ProjectManagerProps {
  initialProjects: Project[];
  initialTasks: Task[];
  onTaskCreate?: (task: Partial<Task>) => void;
  onTaskStatusChange?: (taskId: string, newStatus: Task['status']) => void;
}

const mockBurndownData = [
  { day: 'Day 1', remaining: 120, actual: 120 },
  { day: 'Day 2', remaining: 105, actual: 110 },
  { day: 'Day 3', remaining: 90, actual: 95 },
  { day: 'Day 4', remaining: 75, actual: 80 },
  { day: 'Day 5', remaining: 60, actual: 55 },
  { day: 'Day 6', remaining: 45, actual: 40 },
  { day: 'Day 7', remaining: 30, actual: 25 },
  { day: 'Day 8', remaining: 15, actual: 10 },
  { day: 'Day 9', remaining: 0, actual: 0 },
];

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  initialProjects,
  initialTasks,
  onTaskCreate,
  onTaskStatusChange
}) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjects[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'kanban' | 'burndown' | 'gantt'>('kanban');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  
  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Sarah Jenkins (Frontend)');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('MEDIUM');

  const filteredTasks = tasks.filter(t => t.projectId === selectedProjectId);
  const currentProject = projects.find(p => p.id === selectedProjectId);

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    if (onTaskStatusChange) onTaskStatusChange(taskId, newStatus);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      projectId: selectedProjectId,
      title: newTaskTitle,
      description: newTaskDesc,
      assigneeId: `emp-${Date.now()}`,
      assigneeName: newTaskAssignee,
      priority: newTaskPriority,
      status: 'TODO',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estimatedHours: 8
    };

    setTasks(prev => [...prev, newTask]);
    if (onTaskCreate) onTaskCreate(newTask);
    setIsNewTaskModalOpen(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const columns: { label: string; status: Task['status']; color: string }[] = [
    { label: 'To Do', status: 'TODO', color: 'slate' },
    { label: 'In Progress', status: 'IN_PROGRESS', color: 'blue' },
    { label: 'Review', status: 'REVIEW', color: 'amber' },
    { label: 'Done', status: 'DONE', color: 'emerald' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Project Selector & Views Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Select Active Project
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white font-semibold focus:outline-none focus:border-blue-500/50"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          {currentProject && (
            <div className="hidden sm:block border-l border-slate-800 pl-4">
              <span className="text-xs text-slate-400 block font-medium">Budget Utilization</span>
              <span className="text-sm font-bold text-emerald-400">
                ${currentProject.spent.toLocaleString()} / ${currentProject.budget.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* View Tabs & Create Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
            {(['kanban', 'burndown', 'gantt'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.status);
            return (
              <div key={col.status} className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-5 flex flex-col min-h-[500px]">
                {/* Column Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full bg-${col.color}-500`} />
                    <span>{col.label}</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700">
                    {colTasks.length}
                  </span>
                </div>

                {/* Task Cards List */}
                <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                  {colTasks.map(task => (
                    <div 
                      key={task.id} 
                      className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider ${
                            task.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            task.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            task.priority === 'MEDIUM' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                            'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.dueDate}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                          {task.title}
                        </h4>
                        <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 mt-1">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                            {task.assigneeName.charAt(0)}
                          </div>
                          <span className="text-xs font-medium text-slate-400 truncate max-w-[100px]">
                            {task.assigneeName.split(' ')[0]}
                          </span>
                        </div>

                        {/* Status Quick Move */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {col.status !== 'TODO' && (
                            <button 
                              onClick={() => handleStatusChange(task.id, col.status === 'DONE' ? 'REVIEW' : col.status === 'REVIEW' ? 'IN_PROGRESS' : 'TODO')}
                              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="Move Back"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {col.status !== 'DONE' && (
                            <button 
                              onClick={() => handleStatusChange(task.id, col.status === 'TODO' ? 'IN_PROGRESS' : col.status === 'IN_PROGRESS' ? 'REVIEW' : 'DONE')}
                              className="p-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-md shadow-blue-600/20"
                              title="Move Forward"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs">
                      No tasks in this column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sprint Burndown View */}
      {activeTab === 'burndown' && (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Sprint Burndown Chart</h3>
              <p className="text-slate-400 text-xs mt-1">Tracking remaining effort hours vs ideal burndown trajectory</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-slate-300">Ideal Task Remaining</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-300">Actual Task Remaining</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockBurndownData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="remaining" name="Ideal Burndown" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="actual" name="Actual Burndown" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Gantt Timeline View */}
      {activeTab === 'gantt' && (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">Project Gantt Timeline</h3>
            <span className="text-xs text-slate-400 font-medium">Sprint 42 (Current)</span>
          </div>

          <div className="space-y-4 overflow-x-auto">
            <div className="min-w-[700px] space-y-4">
              {filteredTasks.map(task => (
                <div key={task.id} className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700 transition-colors">
                  <div className="w-1/3 truncate">
                    <h5 className="font-bold text-white text-sm truncate">{task.title}</h5>
                    <span className="text-xs text-slate-500 font-medium">{task.assigneeName}</span>
                  </div>
                  <div className="flex-1 bg-slate-900 rounded-xl h-8 relative flex items-center px-2 overflow-hidden border border-slate-800">
                    <div className={`absolute left-0 top-0 bottom-0 rounded-xl ${
                      task.status === 'DONE' ? 'bg-emerald-500/20 border-r border-emerald-500' :
                      task.status === 'REVIEW' ? 'bg-amber-500/20 border-r border-amber-500' :
                      task.status === 'IN_PROGRESS' ? 'bg-blue-500/20 border-r border-blue-500' :
                      'bg-slate-800'
                    }`} style={{ width: task.status === 'DONE' ? '100%' : task.status === 'REVIEW' ? '85%' : task.status === 'IN_PROGRESS' ? '50%' : '15%' }} />
                    <span className="relative z-10 text-xs font-bold text-slate-300 px-2">
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-xs font-bold text-slate-400 block">{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setIsNewTaskModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-2xl font-bold text-white">Create New Task</h3>
              <p className="text-slate-400 text-xs mt-1">Assign tasks to team members with priority and estimates</p>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Task Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Implement OAuth2 SSO integration" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Detailed task description and acceptance criteria..." 
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Assignee</label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="Sarah Jenkins (Frontend)">Sarah Jenkins (Frontend)</option>
                    <option value="Michael Chang (Backend)">Michael Chang (Backend)</option>
                    <option value="David Ross (DevOps)">David Ross (DevOps)</option>
                    <option value="Elena Rostova (QA)">Elena Rostova (QA)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
