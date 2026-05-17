import React, { useState } from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { StatCardData, EnterpriseRole } from '../../../models/types';
import { Shield, Database, Cpu, Lock, Check, X, RefreshCw, AlertTriangle, HardDrive } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Total Enterprise Roles', value: '18', trend: '+2 new roles', trendType: 'up', icon: '🛡️', color: 'blue' },
  { title: 'Active System Nodes', value: '1,420', trend: '99.9% uptime', trendType: 'up', icon: '🖥️', color: 'emerald' },
  { title: 'AI Subsystems', value: '9 Online', trend: '0 drift detected', trendType: 'neutral', icon: '🤖', color: 'purple' },
  { title: 'Pending Security Audits', value: '0', trend: 'All clear', trendType: 'up', icon: '🔒', color: 'amber' },
];

const allRoles: EnterpriseRole[] = [
  'SUPER_ADMIN', 'ADMIN', 'CEO', 'CTO', 'HR_MANAGER', 'HR_EXECUTIVE', 
  'FINANCE_MANAGER', 'MARKETING_MANAGER', 'SALES_MANAGER', 'PROJECT_MANAGER', 
  'TECH_LEAD', 'DEVOPS_ENGINEER', 'QA_ENGINEER', 'SOFTWARE_ENGINEER', 
  'SECURITY_ANALYST', 'SUPPORT_AGENT', 'EMPLOYEE', 'INTERN'
];

const allPermissions = [
  'CREATE_USER', 'UPDATE_USER', 'DELETE_USER', 'VIEW_REPORT', 'MANAGE_EMPLOYEE', 
  'TRACK_EMPLOYEE', 'VIEW_ANALYTICS', 'MANAGE_FINANCE', 'MANAGE_PROJECT', 
  'VIEW_GPS', 'EXPORT_REPORT', 'AI_ACCESS', 'ADMIN_ACCESS'
];

export const SuperAdminDashboard: React.FC = () => {
  const [matrix, setMatrix] = useState<Record<EnterpriseRole, Record<string, boolean>>>(() => {
    const initial: Record<string, Record<string, boolean>> = {};
    allRoles.forEach(role => {
      initial[role] = {};
      allPermissions.forEach(perm => {
        if (role === 'SUPER_ADMIN') {
          initial[role][perm] = true;
        } else if (role === 'CEO') {
          initial[role][perm] = perm !== 'CREATE_USER' && perm !== 'DELETE_USER' && perm !== 'ADMIN_ACCESS';
        } else if (role.includes('MANAGER') || role === 'CTO') {
          initial[role][perm] = perm !== 'DELETE_USER' && perm !== 'ADMIN_ACCESS';
        } else {
          initial[role][perm] = perm === 'VIEW_REPORT' || perm === 'VIEW_ANALYTICS';
        }
      });
    });
    return initial as Record<EnterpriseRole, Record<string, boolean>>;
  });

  const [aiToggles, setAiToggles] = useState({
    violenceDetection: true,
    productivityLstm: true,
    anomalyIsolation: true,
    behaviorClustering: true,
    llmExecutiveSummary: true
  });

  const handleTogglePerm = (role: EnterpriseRole, perm: string) => {
    if (role === 'SUPER_ADMIN') return; // Cannot modify Super Admin
    setMatrix(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm]
      }
    }));
  };

  const handleBackup = () => {
    alert('Initiating master database snapshot... Backup completed successfully.');
  };

  return (
    <DepartmentView
      title="Super Admin Command Center"
      subtitle="Master RBAC Permission Matrix & Core Infrastructure Control"
      stats={initialStats}
      onRefresh={() => alert('Refreshing master state...')}
      quickActions={[
        { label: 'Trigger DB Backup', icon: <Database className="w-4 h-4" />, action: 'backup', variant: 'primary' },
        { label: 'Flush Redis Cache', icon: <RefreshCw className="w-4 h-4" />, action: 'flush', variant: 'secondary' },
        { label: 'System Lockdown', icon: <Lock className="w-4 h-4" />, action: 'lockdown', variant: 'danger' }
      ]}
      onQuickAction={(action) => {
        if (action === 'backup') handleBackup();
        if (action === 'flush') alert('Redis cache flushed successfully.');
        if (action === 'lockdown') alert('SYSTEM WARNING: Lockdown protocol requires secondary MFA verification.');
      }}
    >
      {/* AI Subsystem Toggles Panel */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Subsystem Feature Flags</h3>
              <p className="text-slate-400 text-xs mt-1">Real-time control over active Machine Learning models across the enterprise</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            All Models Operational
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(aiToggles).map(([key, value]) => (
            <div key={key} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
              <div>
                <h5 className="font-bold text-white text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</h5>
                <span className="text-xs text-slate-500 font-medium block mt-0.5">
                  {value ? 'Active & Polling' : 'Suspended'}
                </span>
              </div>
              <button 
                onClick={() => setAiToggles(prev => ({ ...prev, [key]: !value }))}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${value ? 'bg-blue-600' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Master RBAC Permission Matrix */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Master RBAC Permission Matrix</h3>
              <p className="text-slate-400 text-xs mt-1">Granular access control matrix for all 18 enterprise roles and 13 permission types</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-bold">Click cell to toggle permission</span>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="p-4 text-xs font-extrabold text-slate-300 uppercase tracking-wider sticky left-0 bg-slate-950 z-20 border-r border-slate-800 min-w-[180px]">
                  Enterprise Role
                </th>
                {allPermissions.map(perm => (
                  <th key={perm} className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider text-center min-w-[130px] border-r border-slate-800/50">
                    {perm.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {allRoles.map(role => (
                <tr key={role} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-xs text-white sticky left-0 bg-slate-950/90 backdrop-blur-sm border-r border-slate-800 flex items-center justify-between">
                    <span>{role}</span>
                    {role === 'SUPER_ADMIN' && <Shield className="w-3.5 h-3.5 text-blue-400" />}
                  </td>
                  {allPermissions.map(perm => {
                    const hasPerm = matrix[role]?.[perm] || false;
                    return (
                      <td key={perm} className="p-3 text-center border-r border-slate-800/50">
                        <button
                          onClick={() => handleTogglePerm(role, perm)}
                          disabled={role === 'SUPER_ADMIN'}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto transition-all ${
                            hasPerm 
                              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10' 
                              : 'bg-slate-800/50 border border-slate-700/50 text-slate-600 hover:text-slate-400'
                          }`}
                        >
                          {hasPerm ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DepartmentView>
  );
};
