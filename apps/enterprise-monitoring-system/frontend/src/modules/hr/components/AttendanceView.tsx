import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Fingerprint, FileCheck, CheckCircle, AlertCircle, Plus, Search } from 'lucide-react';
import { smartHRApi } from '../api';
import type { AttendanceRecord, LeaveRequest } from '../types';

export function AttendanceView() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'attendance' | 'leaves' | 'shifts' | 'timesheets'>('attendance');
  const [newLeave, setNewLeave] = useState({ type: 'Sick', startDate: '', endDate: '', reason: '' });
  const [biometricStatus, setBiometricStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  useEffect(() => {
    smartHRApi.getAttendance('EMP-001').then(setAttendance);
    smartHRApi.getLeaves().then(setLeaves);
  }, []);

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeave.startDate || !newLeave.endDate) return;
    smartHRApi.submitLeaveRequest(newLeave).then(res => {
      setLeaves([res, ...leaves]);
      setNewLeave({ type: 'Sick', startDate: '', endDate: '', reason: '' });
      alert(`Leave Applied! AI Decision: ${res.aiDecisionReason}`);
    });
  };

  const simulateBiometricScan = () => {
    setBiometricStatus('scanning');
    setTimeout(() => {
      setBiometricStatus('success');
      smartHRApi.recordAttendance({ status: 'Present', workMode: 'Office', locationCoordinates: '12.9716,77.5946' }).then(res => {
        setAttendance([res, ...attendance]);
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Clock className="text-luxury-blue" />
            Attendance, Leaves & Timesheets
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Biometric verification, AI auto-leave approvals, shift scheduling, and productivity timesheets.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setActiveTab('attendance')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'attendance' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Attendance</button>
          <button onClick={() => setActiveTab('leaves')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'leaves' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Leaves</button>
          <button onClick={() => setActiveTab('shifts')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'shifts' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Shifts</button>
          <button onClick={() => setActiveTab('timesheets')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'timesheets' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Timesheets</button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Recent Attendance Logs</h3>
              <span className="text-xs font-bold text-luxury-blue">{attendance.length} Records</span>
            </div>
            <div className="space-y-4">
              {attendance.map((att, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-2xl border-white/5 hover:border-luxury-blue/30 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-luxury-blue/20 text-luxury-blue flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{att.date}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Check In: {new Date(att.checkInTime).toLocaleTimeString()} • Check Out: {att.checkOutTime ? new Date(att.checkOutTime).toLocaleTimeString() : 'Active Shift'}</p>
                      <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1"><Fingerprint size={12} className="text-emerald-400" /> Biometric Verified</span>
                        <span>Mode: {att.workMode}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${att.status === 'Present' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>{att.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4 text-center">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center justify-center gap-2">
                <Fingerprint size={18} className="text-luxury-blue" /> Biometric Kiosk Simulator
              </h3>
              <div onClick={simulateBiometricScan} className={`border-2 border-dashed border-white/10 rounded-3xl p-8 text-center transition cursor-pointer bg-white/5 ${biometricStatus === 'scanning' ? 'border-luxury-blue animate-pulse' : biometricStatus === 'success' ? 'border-emerald-500 bg-emerald-500/10' : 'hover:border-luxury-blue/50'}`}>
                <Fingerprint className={`mx-auto h-16 w-16 mb-4 ${biometricStatus === 'scanning' ? 'text-luxury-blue animate-spin' : biometricStatus === 'success' ? 'text-emerald-500' : 'text-slate-400'}`} />
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{biometricStatus === 'scanning' ? 'Scanning Face & Fingerprint...' : biometricStatus === 'success' ? 'Biometric Verified successfully!' : 'Click to Simulate Biometric Check-In'}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Hardware GPS lock verified at Bangalore Core Hub.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leaves' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Leave Application History</h3>
              <span className="text-xs font-bold text-luxury-blue">{leaves.length} Total</span>
            </div>
            <div className="space-y-4">
              {leaves.map((l, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-2xl border-white/5 hover:border-luxury-blue/30 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{l.type} Leave</h4>
                      {l.aiApproved && <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20">AI Auto-Approved</span>}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{l.startDate} to {l.endDate} • {l.reason}</p>
                    {l.aiDecisionReason && <p className="text-[10px] text-slate-400 mt-2 italic">Decision: {l.aiDecisionReason}</p>}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${l.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>{l.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
                <Calendar size={16} className="text-luxury-blue" /> Apply New Leave
              </h3>
              <form onSubmit={handleApplyLeave} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Leave Type</label>
                  <select value={newLeave.type} onChange={e => setNewLeave({...newLeave, type: e.target.value})} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue">
                    <option value="Sick" className="bg-slate-900">Sick Leave</option>
                    <option value="Casual" className="bg-slate-900">Casual Leave</option>
                    <option value="Annual" className="bg-slate-900">Annual Leave</option>
                    <option value="Maternity" className="bg-slate-900">Maternity Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Start Date</label>
                    <input type="date" value={newLeave.startDate} onChange={e => setNewLeave({...newLeave, startDate: e.target.value})} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">End Date</label>
                    <input type="date" value={newLeave.endDate} onChange={e => setNewLeave({...newLeave, endDate: e.target.value})} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Reason</label>
                  <input type="text" value={newLeave.reason} onChange={e => setNewLeave({...newLeave, reason: e.target.value})} placeholder="e.g. Family medical emergency" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
                </div>
                <button type="submit" className="w-full h-12 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 mt-4">Submit Leave Request</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'shifts' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <Clock size={16} className="text-luxury-blue" /> Enterprise Shift Roster Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Morning Shift (APAC)', timing: '06:00 AM - 02:00 PM', count: '24 Employees', lead: 'Arjun Mehta' },
              { title: 'General Shift (EMEA)', timing: '09:00 AM - 06:00 PM', count: '58 Employees', lead: 'Priya Sharma' },
              { title: 'Night Shift (US/EST)', timing: '06:30 PM - 03:30 AM', count: '18 Employees', lead: 'Rohan Desai' }
            ].map((shift, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{shift.title}</h4>
                  <p className="text-xs text-luxury-blue font-semibold mt-1">{shift.timing}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Active Roster Count: <span className="text-white font-medium">{shift.count}</span></p>
                </div>
                <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Shift Lead:</span>
                  <span className="text-white font-bold">{shift.lead}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'timesheets' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <FileCheck size={16} className="text-luxury-blue" /> Weekly Productivity Timesheets
          </h3>
          <div className="space-y-4">
            {[
              { project: 'WorkSphere Core Telemetry Engine', client: 'Internal Enterprise', hours: 38, status: 'Approved' },
              { project: 'Davangere Geo-Triangulation Proxy', client: 'LiveGuard Tracking', hours: 42, status: 'Approved' }
            ].map((ts, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl border-white/5 hover:border-luxury-blue/30 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{ts.project}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Client: {ts.client} • Logged Hours: <span className="text-luxury-blue font-bold">{ts.hours}h</span></p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">{ts.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
