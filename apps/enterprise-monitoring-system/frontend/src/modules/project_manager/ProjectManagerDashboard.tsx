import React from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { ProjectManager } from '../../projects/ProjectManager';
import { StatCardData, Project, Task } from '../../../models/types';
import { Calendar, Users, CheckCircle, TrendingUp } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Active Enterprise Projects', value: '12', trend: '4 Squads', trendType: 'up', icon: '📁', color: 'blue' },
  { title: 'Sprint 42 Task Completion', value: '74.2%', trend: 'On schedule', trendType: 'up', icon: '⚡', color: 'emerald' },
  { title: 'Team Productivity Score', value: '91.8%', trend: '+3.5% MoM', trendType: 'up', icon: '📈', color: 'purple' },
  { title: 'At-Risk Milestones', value: '0', trend: 'All clear', trendType: 'up', icon: '🎯', color: 'amber' },
];

const mockProjects: Project[] = [
  { id: 'proj-1', name: 'Core Auth & RBAC Refactor', description: 'Upgrading spring security filter chains and MFA TOTP flows', managerId: 'mgr-1', managerName: 'Michael Chang', startDate: '2026-05-01', endDate: '2026-06-15', status: 'ACTIVE', budget: 150000, spent: 45000 },
  { id: 'proj-2', name: 'AI Productivity Inference Engine', description: 'Deploying PyTorch LSTM models on AWS Inferentia endpoints', managerId: 'mgr-1', managerName: 'Michael Chang', startDate: '2026-05-10', endDate: '2026-07-30', status: 'ACTIVE', budget: 280000, spent: 110000 },
];

const mockTasks: Task[] = [
  { id: 'task-1', projectId: 'proj-1', title: 'Implement JWT refresh token rotation in Redis', description: 'Ensure tokens are blacklisted upon logout and rotated automatically', assigneeId: 'emp-1', assigneeName: 'Sarah Jenkins (Frontend)', priority: 'HIGH', status: 'DONE', dueDate: '2026-05-14', estimatedHours: 12 },
  { id: 'task-2', projectId: 'proj-1', title: 'Visual RBAC Permission Matrix UI', description: 'Create dynamic table allowing Super Admins to toggle 13 permission types', assigneeId: 'emp-2', assigneeName: 'Sarah Jenkins (Frontend)', priority: 'CRITICAL', status: 'IN_PROGRESS', dueDate: '2026-05-18', estimatedHours: 16 },
  { id: 'task-3', projectId: 'proj-1', title: 'Spring Security PreAuthorize annotations', description: 'Add method-level security checks across all 17 department controllers', assigneeId: 'emp-3', assigneeName: 'Michael Chang (Backend)', priority: 'HIGH', status: 'REVIEW', dueDate: '2026-05-16', estimatedHours: 8 },
  { id: 'task-4', projectId: 'proj-2', title: 'FastAPI PyTorch model loading optimization', description: 'Preload joblib/PyTorch artifacts during container startup', assigneeId: 'emp-4', assigneeName: 'David Ross (DevOps)', priority: 'MEDIUM', status: 'TODO', dueDate: '2026-05-22', estimatedHours: 20 },
];

export const ProjectManagerDashboard: React.FC = () => {
  return (
    <DepartmentView
      title="Project Management Command Hub"
      subtitle="Sprint Burndown Charts, Kanban Board, Team Productivity & Gantt Timeline"
      stats={initialStats}
      onRefresh={() => alert('Refreshing Jira & GitHub project boards...')}
      quickActions={[
        { label: 'Create Sprint', icon: <Calendar className="w-4 h-4" />, action: 'create_sprint', variant: 'primary' },
        { label: 'Resource Allocation', icon: <Users className="w-4 h-4" />, action: 'resources', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'create_sprint') alert('Opening Sprint Creation Wizard (Sprint 43)...');
        if (action === 'resources') alert('Opening Team Workload & Resource Allocation Matrix...');
      }}
    >
      <ProjectManager 
        initialProjects={mockProjects} 
        initialTasks={mockTasks} 
        onTaskCreate={(task) => alert(`Task created: ${task.title}`)}
        onTaskStatusChange={(taskId, newStatus) => console.log(`Task ${taskId} moved to ${newStatus}`)}
      />
    </DepartmentView>
  );
};
