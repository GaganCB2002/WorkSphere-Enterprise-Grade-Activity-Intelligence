import React, { useState } from 'react';
import { DepartmentView } from '../../dashboards/DepartmentView';
import { StatCardData, UserProfile, AuditLog, EnterpriseRole } from '../../models/types';
import { Users, Shield, Settings, FileText, CheckCircle, XCircle, Search, Edit2, Lock } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Total User Accounts', value: '1,248', trend: '+15 this week', trendType: 'up', icon: '👥', color: 'blue' },
  { title: 'MFA Adoption', value: '94.2%', trend: '+3.1% increase', trendType: 'up', icon: '🔒', color: 'emerald' },
  { title: 'Active Sessions', value: '892', trend: 'Peak hours', trendType: 'neutral', icon: '⚡', color: 'purple' },
  { title: 'Security Flagged Users', value: '3', trend: 'Action required', trendType: 'down', icon: '⚠️', color: 'amber' },
];

const mockUsers: UserProfile[] = [
  { id: 'usr-1', email: 'sarah.j@worksphere.com', name: 'Sarah Jenkins', role: 'SOFTWARE_ENGINEER', department: 'Engineering', avatar: 'SJ', mfaEnabled: true, status: 'ONLINE', lastActive: 'Just now' },
  { id: 'usr-2', email: 'michael.c@worksphere.com', name: 'Michael Chang', role: 'TECH_LEAD', department: 'Engineering', avatar: 'MC', mfaEnabled: true, status: 'ONLINE', lastActive: 'Just now' },
  { id: 'usr-3', email: 'elena.r@worksphere.com', name: 'Elena Rostova', role: 'QA_ENGINEER', department: 'QA', avatar: 'ER', mfaEnabled: true, status: 'IDLE', lastActive: '10m ago' },
  { id: 'usr-4', email: 'david.r@worksphere.com', name: 'David Ross', role: 'DEVOPS_ENGINEER', department: 'DevOps', avatar: 'DR', mfaEnabled: false, status: 'OFFLINE', lastActive: '2h ago' },
  { id: 'usr-5', email: 'alex.p@worksphere.com', name: 'Alex Patel', role: 'SALES_MANAGER', department: 'Sales', avatar: 'AP', mfaEnabled: true, status: 'ONLINE', lastActive: 'Just now' },
];

const mockAuditLogs: AuditLog[] = [
  { id: 'log-1', userId: 'usr-1', userName: 'Sarah Jenkins', role: 'SOFTWARE_ENGINEER', action: 'EXPORT_REPORT', target: 'Sprint 42 Burndown', ipAddress: '192.168.1.42', timestamp: '2026-05-16 10:15:22' },
  { id: 'log-2', userId: 'usr-2', userName: 'Michael Chang', role: 'TECH_LEAD', action: 'UPDATE_USER', target: 'Elena Rostova (Role upgrade)', ipAddress: '192.168.1.15', timestamp: '2026-05-16 09:42:10' },
  { id: 'log-3', userId: 'usr-4', userName: 'David Ross', role: 'DEVOPS_ENGINEER', action: 'FAILED_LOGIN', target: 'MFA Challenge Timeout', ipAddress: '10.0.0.104', timestamp: '2026-05-16 08:11:05' },
];

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'audit' | 'settings'>('users');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMfa = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, mfaEnabled: !u.mfaEnabled } : u));
  };

  return (
    <DepartmentView
      title="System Administrator Hub"
      subtitle="User Management, Role Assignments, System Settings & Audit Logs"
      stats={initialStats}
      onRefresh={() => alert('Refreshing user database...')}
      quickActions={[
        { label: 'Add New User', icon: <Users className="w-4 h-4" />, action: 'add_user', variant: 'primary' },
        { label: 'Export Audit Logs', icon: <FileText className="w-4 h-4" />, action: 'export_audit', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'add_user') alert('Opening Add User Modal...');
        if (action === 'export_audit') alert('Exporting system audit logs to CSV...');
      }}
    >
      {/* Navigation Tabs */}
      <div className="flex items-center bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-1.5 w-fit shadow-lg">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'audit' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Audit Logs</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>System Settings</span>
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Enterprise User Accounts</h3>
              <p className="text-slate-400 text-xs mt-1">Manage employee accounts, role assignments, and MFA requirements</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                  <th className="p-4">Employee</th>
                  <th className="p-4">Role & Dept</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">MFA Enabled</th>
                  <th className="p-4">Last Active</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-sm">
                        {user.avatar}
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-sm">{user.name}</h5>
                        <span className="text-xs text-slate-400">{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-blue-400 text-xs block">{user.role}</span>
                      <span className="text-xs text-slate-500 font-medium">{user.department}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.status === 'ONLINE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        user.status === 'IDLE' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'ONLINE' ? 'bg-emerald-500' : user.status === 'IDLE' ? 'bg-amber-500' : 'bg-slate-500'}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => toggleMfa(user.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          user.mfaEnabled 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {user.mfaEnabled ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{user.mfaEnabled ? 'Required' : 'Disabled'}</span>
                      </button>
                    </td>
                    <td className="p-4 text-xs text-slate-400 font-medium">{user.lastActive}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => alert(`Editing user: ${user.name}`)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors"
                        title="Edit User"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white">System Audit Trail</h3>
              <p className="text-slate-400 text-xs mt-1">Immutable cryptographic log of all administrative actions and security events</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
              Real-time Active
            </span>
          </div>

          <div className="space-y-4">
            {mockAuditLogs.map(log => (
              <div key={log.id} className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-blue-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-white text-sm">{log.userName}</h5>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-extrabold text-slate-400 border border-slate-700">
                        {log.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-1">
                      Action: <span className="text-blue-400 font-bold">{log.action}</span> — Target: <span className="text-slate-200">{log.target}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end justify-between gap-1 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                  <span className="text-xs font-mono text-slate-500">{log.ipAddress}</span>
                  <span className="text-xs text-slate-400 font-medium">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">Global System Settings</h3>
            <p className="text-slate-400 text-xs mt-1">Configure company-wide policies, session timeouts, and monitoring defaults</p>
          </div>

          <div className="space-y-6 max-w-2xl">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
              <div>
                <h5 className="font-bold text-white text-sm">Session Timeout</h5>
                <p className="text-xs text-slate-400 mt-0.5">Automatically log out inactive users after a specified duration</p>
              </div>
              <select className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm font-semibold focus:outline-none focus:border-blue-500">
                <option>15 Minutes</option>
                <option>30 Minutes</option>
                <option>1 Hour</option>
                <option>4 Hours</option>
              </select>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
              <div>
                <h5 className="font-bold text-white text-sm">Strict IP Geofencing</h5>
                <p className="text-xs text-slate-400 mt-0.5">Restrict dashboard login to recognized corporate IP subnets</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-blue-600 p-1 transition-colors relative">
                <div className="w-4 h-4 rounded-full bg-white translate-x-6 transition-transform" />
              </button>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
              <div>
                <h5 className="font-bold text-white text-sm">Require Biometric Login</h5>
                <p className="text-xs text-slate-400 mt-0.5">Enforce facial recognition verification on dashboard startup</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-slate-800 p-1 transition-colors relative">
                <div className="w-4 h-4 rounded-full bg-white translate-x-0 transition-transform" />
              </button>
            </div>

            <button 
              onClick={() => alert('Settings saved successfully.')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}
    </DepartmentView>
  );
};
