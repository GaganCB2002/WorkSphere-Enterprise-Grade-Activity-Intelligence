import React, { useState } from 'react';
import { DepartmentView } from '../../dashboards/DepartmentView';
import { StatCardData } from '../../models/types';
import { UserCheck, FileText, CheckCircle, Clock, Layers, ShieldCheck, Users, Terminal } from 'lucide-react';

// Import newly migrated Recruitment & Hiring_1 modules
import { HumanResourcesPage } from './HumanResourcesPage';
import { HRDashboard } from './HR_Dashboard_Module';
import { EmployeeDashboardPage } from './HR_Employee_Dashboard';
import TechLeadDashboard from './HR_TechLead_Dashboard';

const initialStats: StatCardData[] = [
  { title: 'Pending Onboardings', value: '18', trend: 'Next batch June 1', trendType: 'up', icon: '📝', color: 'blue' },
  { title: 'Document Verification', value: '5 Pending', trend: 'Action required', trendType: 'down', icon: '📁', color: 'amber' },
  { title: 'Interviews Today', value: '14', trend: 'Fully scheduled', trendType: 'up', icon: '🤝', color: 'emerald' },
  { title: 'Employee Inquiries', value: '3 Open', trend: 'Resolved within 24h', trendType: 'neutral', icon: '💬', color: 'purple' },
];

const mockOnboardings = [
  { id: 'onb-1', name: 'James Wilson', role: 'SOFTWARE_ENGINEER', stage: 'Background Check', progress: 60, status: 'IN_PROGRESS' },
  { id: 'onb-2', name: 'Sophia Martinez', role: 'PRODUCT_MANAGER', stage: 'Equipment Dispatch', progress: 85, status: 'IN_PROGRESS' },
  { id: 'onb-3', name: 'Lucas Scott', role: 'FINANCE_ANALYST', stage: 'Contract Signing', progress: 30, status: 'WAITING' },
];

const mockDashboardData = {
  hero: {
    title: 'Workforce Intelligence Command',
    subtitle: 'Real-time telemetry, AI attrition risk modeling, and department budget tracking.',
    modules: ['Attendance Sync', 'Leave Control', 'AI Pulse', 'Budget Forecast']
  },
  aiInsights: {
    recommendations: [
      'Engineering department shows 12% increase in overtime hours. Consider workload rebalancing.',
      'Leave approval backlog in DevOps squad exceeds SLA by 4 hours. Automated reminders dispatched.'
    ],
    attritionHotspots: [
      { name: 'Frontend Engineering Squad', department: 'Engineering', risk: 35 },
      { name: 'Customer Support Tier 1', department: 'Support', risk: 18 }
    ]
  },
  metrics: [
    { id: 'm1', label: 'Active Workforce', value: '1,420', icon: '👥', change: '+5.2% vs last month' },
    { id: 'm2', label: 'Today Attendance', value: '96.4%', icon: '📅', change: '+1.4% vs benchmark' },
    { id: 'm3', label: 'Monthly Payroll', value: '$12.4M', icon: '💰', change: 'Fully verified' }
  ],
  attendanceTrend: [
    { label: 'Week 1', value: 94 }, { label: 'Week 2', value: 95 }, { label: 'Week 3', value: 96 }, { label: 'Week 4', value: 96.4 }
  ],
  productivityTrend: [
    { label: 'Week 1', value: 88 }, { label: 'Week 2', value: 91 }, { label: 'Week 3', value: 93 }, { label: 'Week 4', value: 94.2 }
  ],
  alerts: [
    'Biometric attendance sync delay detected in regional office #4.',
    '3 high-priority leave requests pending CEO final sign-off.'
  ],
  budgetUtilization: [
    { department: 'Engineering', utilization: 84, forecast: 4500000 },
    { department: 'Sales & Marketing', utilization: 92, forecast: 3200000 },
    { department: 'HR & Operations', utilization: 65, forecast: 1800000 }
  ]
};

const mockFeed = [
  { id: 'f1', title: 'Leave Approved', detail: 'Sarah Jenkins approved 5 days annual leave for David Ross.', category: 'Approved', actor: 'Sarah Jenkins', timestamp: Date.now() - 1200000 },
  { id: 'f2', title: 'AI Risk Alert', detail: 'High attrition risk detected in Support squad due to consecutive overtime.', category: 'Warning', actor: 'System AI', timestamp: Date.now() - 3600000 },
  { id: 'f3', title: 'Payroll Disbursed', detail: 'Monthly automated direct deposit batch successfully completed.', category: 'Success', actor: 'Finance Bot', timestamp: Date.now() - 7200000 }
];

export const HrExecutiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'onboarding' | 'human_capital' | 'command_center' | 'employee_portal' | 'tech_lead'>('onboarding');

  return (
    <DepartmentView
      title="HR Operations & Capital Hub"
      subtitle="Unified Master Suite: Onboarding Checklists, Human Capital Intelligence & Departmental Command Centers"
      stats={initialStats}
      onRefresh={() => alert('Refreshing HR operations queue and telemetry...')}
      quickActions={[
        { label: 'Schedule Interview', icon: <UserCheck className="w-4 h-4" />, action: 'schedule', variant: 'primary' },
        { label: 'Verify Documents', icon: <FileText className="w-4 h-4" />, action: 'verify', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'schedule') alert('Opening Interview Scheduler Modal...');
        if (action === 'verify') alert('Opening Document Verification Queue...');
      }}
    >
      {/* Master Module Navigation Tabs */}
      <div className="flex flex-wrap gap-3 p-2 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl mb-8 shadow-inner">
        <button
          onClick={() => setActiveTab('onboarding')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'onboarding' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          Onboarding & Operations
        </button>

        <button
          onClick={() => setActiveTab('human_capital')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'human_capital' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Human Capital Intelligence
        </button>

        <button
          onClick={() => setActiveTab('command_center')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'command_center' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Users className="w-4 h-4" />
          Workforce Command Center
        </button>

        <button
          onClick={() => setActiveTab('employee_portal')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'employee_portal' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Employee HR Portal
        </button>

        <button
          onClick={() => setActiveTab('tech_lead')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'tech_lead' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Terminal className="w-4 h-4" />
          Tech Lead HR View
        </button>
      </div>

      {/* Tab Content Rendering */}
      {activeTab === 'onboarding' && (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 animate-in fade-in duration-500">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">Active Employee Onboardings</h3>
            <p className="text-slate-400 text-xs mt-1">Track background checks, contract signatures, and equipment provisioning</p>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                  <th className="p-4">New Hire</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Current Stage</th>
                  <th className="p-4 text-center">Progress</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
                {mockOnboardings.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white text-sm">{item.name}</td>
                    <td className="p-4 font-semibold text-blue-400 text-xs">{item.role}</td>
                    <td className="p-4 text-slate-300 text-xs font-medium">{item.stage}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 w-8 text-right">{item.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => alert(`Advancing onboarding for ${item.name}`)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors"
                      >
                        Advance Stage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'human_capital' && (
        <div className="animate-in fade-in duration-500">
          <HumanResourcesPage />
        </div>
      )}

      {activeTab === 'command_center' && (
        <div className="animate-in fade-in duration-500">
          <HRDashboard data={mockDashboardData} feed={mockFeed} onRefresh={async () => alert('Snapshot refreshed successfully!')} />
        </div>
      )}

      {activeTab === 'employee_portal' && (
        <div className="animate-in fade-in duration-500">
          <EmployeeDashboardPage 
            platform={{ attendance: { leaveRequests: [] } }} 
            user={{ id: 'emp-101', name: 'Gagan CB', role: 'Senior Architect', department: 'Core Engineering' }} 
            token="mock-jwt-token" 
          />
        </div>
      )}

      {activeTab === 'tech_lead' && (
        <div className="animate-in fade-in duration-500">
          <TechLeadDashboard user={{ id: 'tl-1', name: 'Alex Rivera', role: 'Engineering Lead', department: 'Platform Architecture' }} />
        </div>
      )}
    </DepartmentView>
  );
};
