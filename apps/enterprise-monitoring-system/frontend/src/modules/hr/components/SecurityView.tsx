import React, { useState } from 'react';
import { ShieldCheck, Key, Lock, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export function SecurityView() {
  const [activeTab, setActiveTab] = useState<'rbac' | 'mfa' | 'audit'>('rbac');
  const [roles, setRoles] = useState([
    { role: 'CEO / Principal', access: 'Full Enterprise Read/Write, AI Override, Payroll Disburse', users: 2 },
    { role: 'HR Manager', access: 'Employee DB, Leave Approval, Performance Dockets, LMS Admin', users: 5 },
    { role: 'Engineering Lead', access: 'Timesheets, Sprint Velocity POW, Group Chat Moderator', users: 14 },
    { role: 'Standard Employee', access: 'Self-Service Portal, Leave Apply, POW Submit, LMS Viewer', users: 120 }
  ]);
  const [mfaEnabled, setMfaEnabled] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="text-luxury-blue" />
            Security, RBAC & Audit Compliance
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Role-based access control matrices, biometric MFA enforcement, and tamper-proof cryptographic audit logs.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab('rbac')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'rbac' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>RBAC Matrix</button>
          <button onClick={() => setActiveTab('mfa')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'mfa' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>MFA Config</button>
          <button onClick={() => setActiveTab('audit')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'audit' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Audit Logs</button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'rbac' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <Lock size={16} className="text-luxury-blue" /> Enterprise Role-Based Access Control (RBAC)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((r, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{r.role}</h4>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20">{r.users} Active Users</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed"><span className="text-slate-300 font-semibold block mb-1">Configured Permissions:</span> {r.access}</p>
                </div>
                <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span className="flex items-center gap-1"><CheckCircle size={14} /> 256-Bit AES Encrypted Token</span>
                  <button className="text-luxury-blue hover:underline">Edit Policy</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'mfa' && (
        <div className="glass-panel p-8 rounded-3xl border-white/10 max-w-2xl mx-auto bg-white/5 backdrop-blur-md space-y-6 text-center">
          <Key className="mx-auto h-16 w-16 text-luxury-blue mb-4 animate-pulse" />
          <h3 className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white">Multi-Factor Biometric Authentication (MFA)</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">WorkSphere enforces mandatory facial recognition & fingerprint verification during login/logout workflows across all regional hubs.</p>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between max-w-md mx-auto mt-6">
            <div className="text-left">
              <h4 className="text-sm font-bold text-white">Biometric MFA Lock</h4>
              <p className="text-[10px] text-slate-400 mt-1">Requires Windows Hello / Apple FaceID hardware token.</p>
            </div>
            <button onClick={() => setMfaEnabled(!mfaEnabled)} className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition ${mfaEnabled ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-rose-500 text-white'}`}>{mfaEnabled ? 'Enabled' : 'Disabled'}</button>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <FileText size={16} className="text-luxury-blue" /> Cryptographic System Audit Logs
          </h3>
          <div className="space-y-4">
            {[
              { event: 'Payroll Monthly Disbursement Executed', actor: 'Priya Sharma (HR)', ip: '192.168.10.12', time: 'May 1st, 2026 09:00 AM', hash: 'SHA256:8f9a2b1c3d4e5f6a7b8c9d0e1f2a3b4c' },
              { event: 'Geofence Breach Auto-Flagged', actor: 'SYSTEM AI', ip: '192.168.10.45', time: 'May 16th, 2026 03:15 PM', hash: 'SHA256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d' }
            ].map((aud, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl border-white/5 bg-white/5 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{aud.event}</span>
                  <span className="text-[10px] text-slate-400">{aud.time}</span>
                </div>
                <p className="text-[10px] text-slate-400">Actor: <span className="text-luxury-blue font-bold">{aud.actor}</span> • Origin IP: {aud.ip}</p>
                <p className="text-[9px] text-emerald-400 truncate">Cryptographic Hash: {aud.hash}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
