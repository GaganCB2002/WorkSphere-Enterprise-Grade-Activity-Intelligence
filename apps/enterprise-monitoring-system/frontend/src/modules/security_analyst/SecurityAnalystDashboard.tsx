import React, { useState } from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { StatCardData } from '../../../models/types';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';
import { Shield, AlertTriangle, Lock, Eye, CheckCircle, XCircle } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Threat Alerts Today', value: '3', trend: 'Requires investigation', trendType: 'down', icon: '⚠️', color: 'amber' },
  { title: 'Blocked IP Addresses', value: '142', trend: 'Automated firewall', trendType: 'up', icon: '🔒', color: 'blue' },
  { title: 'Sensitive Data Access', value: '1,840', trend: 'Fully audited', trendType: 'neutral', icon: '👁️', color: 'purple' },
  { title: 'Security Posture Score', value: '98.4%', trend: 'SOC2 Compliant', trendType: 'up', icon: '🛡️', color: 'emerald' },
];

const mockThreatData = [
  { category: 'Brute Force Login', count: 45 },
  { category: 'Suspicious IP Geolocation', count: 28 },
  { category: 'Off-Hours Data Access', count: 15 },
  { category: 'Unauthorized USB Mount', count: 4 },
  { category: 'Privilege Escalation Attempt', count: 2 },
];

const mockThreats = [
  { id: 'THREAT-201', user: 'David Ross', ip: '185.190.140.5', location: 'Moscow, RU', type: 'Multiple Failed MFA Challenges', severity: 'CRITICAL', status: 'INVESTIGATING' },
  { id: 'THREAT-202', user: 'Elena Rostova', ip: '45.33.22.11', location: 'Beijing, CN', type: 'Off-Hours Sensitive Table Export', severity: 'HIGH', status: 'INVESTIGATING' },
  { id: 'THREAT-203', user: 'Alex Patel', ip: '192.168.1.105', location: 'New York, US', type: 'Simultaneous Multi-Device Login', severity: 'MEDIUM', status: 'RESOLVED' },
];

export const SecurityAnalystDashboard: React.FC = () => {
  const [threats, setThreats] = useState(mockThreats);

  const blockIp = (ip: string) => {
    alert(`IP Address ${ip} has been permanently added to the enterprise edge firewall blacklist.`);
  };

  const resolveThreat = (id: string) => {
    setThreats(prev => prev.map(t => t.id === id ? { ...t, status: 'RESOLVED' } : t));
    alert('Threat marked as RESOLVED and archived to SIEM audit storage.');
  };

  return (
    <DepartmentView
      title="Cybersecurity Threat Center"
      subtitle="Failed Login Geolocation, Suspicious IP Blocking & Sensitive Data Access Audit"
      stats={initialStats}
      onRefresh={() => alert('Refreshing SIEM & AWS WAF firewall logs...')}
      quickActions={[
        { label: 'Trigger Security Scan', icon: <Shield className="w-4 h-4" />, action: 'scan', variant: 'primary' },
        { label: 'Lockdown Compromised Accounts', icon: <Lock className="w-4 h-4" />, action: 'lockdown', variant: 'danger' }
      ]}
      onQuickAction={(action) => {
        if (action === 'scan') alert('Initiating Deep Forensic Malware & Vulnerability Scan across all endpoints...');
        if (action === 'lockdown') alert('SYSTEM WARNING: Initiating global session revocation for flagged accounts...');
      }}
    >
      {/* Threat Category Bar Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Security Threat Classification</h3>
          <p className="text-slate-400 text-xs mt-1">Volume of automated security anomalies detected by edge firewalls and SIEM</p>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockThreatData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="category" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="count" name="Incidents" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Threat Alert Queue Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Active Threat Alert Queue</h3>
          <p className="text-slate-400 text-xs mt-1">Investigate suspicious IP logins, geolocation anomalies, and data exfiltration attempts</p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-4">Threat ID</th>
                <th className="p-4">Target User</th>
                <th className="p-4">IP & Geolocation</th>
                <th className="p-4">Anomaly Type</th>
                <th className="p-4 text-center">Severity</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {threats.map(threat => (
                <tr key={threat.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-white text-xs">{threat.id}</td>
                  <td className="p-4 font-bold text-white text-sm">{threat.user}</td>
                  <td className="p-4">
                    <span className="font-mono text-xs font-bold text-blue-400 block">{threat.ip}</span>
                    <span className="text-xs text-slate-500 font-medium">{threat.location}</span>
                  </td>
                  <td className="p-4 text-slate-300 text-xs font-medium max-w-xs truncate">{threat.type}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider ${
                      threat.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      threat.severity === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      threat.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {threat.status !== 'RESOLVED' && (
                      <>
                        <button 
                          onClick={() => blockIp(threat.ip)}
                          className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
                        >
                          Block IP
                        </button>
                        <button 
                          onClick={() => resolveThreat(threat.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                        >
                          Resolve
                        </button>
                      </>
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
