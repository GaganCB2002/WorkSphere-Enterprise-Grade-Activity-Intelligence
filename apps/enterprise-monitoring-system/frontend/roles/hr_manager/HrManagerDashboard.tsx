import React, { useState } from 'react';
import { DepartmentView } from '../../dashboards/DepartmentView';
import { StatCardData } from '../../models/types';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Users, Calendar, DollarSign, UserCheck, CheckCircle, XCircle } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Total Enterprise Headcount', value: '1,420', trend: '+45 this month', trendType: 'up', icon: '👥', color: 'blue' },
  { title: 'Today Attendance Rate', value: '96.4%', trend: 'Above benchmark', trendType: 'up', icon: '📅', color: 'emerald' },
  { title: 'Pending Leave Requests', value: '12', trend: 'Requires approval', trendType: 'down', icon: '⏳', color: 'amber' },
  { title: 'Monthly Payroll Disbursed', value: '$12.4M', trend: 'Fully verified', trendType: 'neutral', icon: '💰', color: 'purple' },
];

const mockLeaveDistribution = [
  { name: 'Annual Paid Leave', value: 45 },
  { name: 'Sick / Medical Leave', value: 25 },
  { name: 'Maternity / Paternity', value: 15 },
  { name: 'Sabbatical / Unpaid', value: 15 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

const mockRecruitmentFunnel = [
  { stage: 'Applications Received', count: 1250 },
  { stage: 'Screened & Shortlisted', count: 420 },
  { stage: 'Technical Interviews', count: 180 },
  { stage: 'Final HR Round', count: 65 },
  { stage: 'Offers Extended', count: 32 },
];

const mockLeaveRequests = [
  { id: 'req-1', empName: 'Sarah Jenkins', dept: 'Engineering', type: 'Annual Leave', days: 5, startDate: '2026-06-01', status: 'PENDING' },
  { id: 'req-2', empName: 'David Ross', dept: 'DevOps', type: 'Sick Leave', days: 2, startDate: '2026-05-18', status: 'PENDING' },
  { id: 'req-3', empName: 'Elena Rostova', dept: 'QA', type: 'Maternity Leave', days: 90, startDate: '2026-07-01', status: 'PENDING' },
];

export const HrManagerDashboard: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);

  const handleApprove = (id: string) => {
    setLeaveRequests(prev => prev.filter(r => r.id !== id));
    alert('Leave request approved and synchronized with payroll schedule.');
  };

  const handleReject = (id: string) => {
    setLeaveRequests(prev => prev.filter(r => r.id !== id));
    alert('Leave request rejected. Notification sent to employee.');
  };

  return (
    <DepartmentView
      title="HR & Payroll Command Hub"
      subtitle="Attendance Telemetry, Leave Distribution & ATS Recruitment Pipeline"
      stats={initialStats}
      onRefresh={() => alert('Refreshing HR attendance database...')}
      quickActions={[
        { label: 'Run Monthly Payroll', icon: <DollarSign className="w-4 h-4" />, action: 'payroll', variant: 'primary' },
        { label: 'Post New Job Requisition', icon: <UserCheck className="w-4 h-4" />, action: 'post_job', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'payroll') alert('Initiating secure direct deposit disbursement for 1,420 employees...');
        if (action === 'post_job') alert('Opening ATS Job Requisition Form...');
      }}
    >
      {/* Charts Section: Leave Distribution & ATS Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leave Distribution Pie Chart */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">Leave Type Distribution</h3>
            <p className="text-slate-400 text-xs mt-1">Breakdown of active employee absences across categories</p>
          </div>

          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockLeaveDistribution} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                  {mockLeaveDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ATS Recruitment Funnel Bar Chart */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">ATS Recruitment Funnel</h3>
            <p className="text-slate-400 text-xs mt-1">Candidate pipeline conversion from application to extended offer</p>
          </div>

          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={mockRecruitmentFunnel} margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="stage" type="category" stroke="#94a3b8" width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
                />
                <Bar dataKey="count" name="Candidates" fill="#3b82f6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pending Leave Requests Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Pending Leave Approvals</h3>
          <p className="text-slate-400 text-xs mt-1">Review and action employee time-off requests</p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-4">Employee</th>
                <th className="p-4">Department</th>
                <th className="p-4">Leave Type</th>
                <th className="p-4 text-center">Duration</th>
                <th className="p-4">Start Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {leaveRequests.map(req => (
                <tr key={req.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{req.empName}</td>
                  <td className="p-4 text-slate-300 text-xs font-medium">{req.dept}</td>
                  <td className="p-4 font-bold text-purple-400 text-xs">{req.type}</td>
                  <td className="p-4 text-center text-xs font-bold text-slate-300">{req.days} Days</td>
                  <td className="p-4 text-xs text-slate-400 font-medium">{req.startDate}</td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleApprove(req.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {leaveRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 text-xs font-medium">
                    No pending leave requests requiring approval.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DepartmentView>
  );
};
