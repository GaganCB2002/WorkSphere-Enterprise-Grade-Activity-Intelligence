import React, { useState, useEffect } from 'react';
import { Users, FileText, LifeBuoy, UserCheck, Search, Plus, ExternalLink, ShieldCheck } from 'lucide-react';
import { smartHRApi } from '../api';
import type { Employee } from '../types';

export function CoreHRView() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activeTab, setActiveTab] = useState<'database' | 'documents' | 'helpdesk'>('database');
  const [search, setSearch] = useState('');
  const [tickets, setTickets] = useState([
    { id: 'TKT-201', emp: 'Rohan Desai', issue: 'PF Account Transfer Query', status: 'Open', priority: 'High', date: '2026-05-17' },
    { id: 'TKT-202', emp: 'Arjun Mehta', issue: 'Medical Insurance Addition', status: 'Resolved', priority: 'Medium', date: '2026-05-15' }
  ]);
  const [newTicket, setNewTicket] = useState({ issue: '', priority: 'Medium' });

  useEffect(() => {
    smartHRApi.getEmployees().then(setEmployees);
  }, []);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.issue) return;
    setTickets([{ id: `TKT-${Date.now().toString().slice(-3)}`, emp: 'Current User', issue: newTicket.issue, status: 'Open', priority: newTicket.priority, date: new Date().toISOString().split('T')[0] }, ...tickets]);
    setNewTicket({ issue: '', priority: 'Medium' });
  };

  const filteredEmployees = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.employeeId.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Users className="text-luxury-blue" />
            Core HR & Helpdesk Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Employee database, encrypted document management, and SLA-driven ticketing helpdesk.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab('database')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'database' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Database</button>
          <button onClick={() => setActiveTab('documents')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'documents' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Documents</button>
          <button onClick={() => setActiveTab('helpdesk')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'helpdesk' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Helpdesk</button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'database' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-4">
            <div className="relative group flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee name, ID, department..." className="w-full h-11 bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 text-sm text-white outline-none focus:border-luxury-blue" />
            </div>
            <span className="text-xs font-bold text-luxury-blue">{filteredEmployees.length} Employees Found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map(emp => (
              <div key={emp.id} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-luxury-blue/20 text-luxury-blue flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-luxury-blue/10">
                    {emp.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">{emp.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{emp.title}</p>
                    <p className="text-[10px] text-luxury-blue font-semibold mt-1">{emp.employeeId} • {emp.department}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-400 border-t border-white/5 pt-4">
                  <p className="flex items-center justify-between"><span>Location:</span> <span className="text-white font-medium">{emp.location}</span></p>
                  <p className="flex items-center justify-between"><span>Engagement:</span> <span className="text-emerald-400 font-bold">{emp.engagementScore}%</span></p>
                  <p className="flex items-center justify-between"><span>Rating:</span> <span className="text-amber-400 font-bold">★ {emp.performanceRating}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <FileText size={16} className="text-luxury-blue" /> Encrypted Enterprise Document Vault
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Employee Non-Disclosure Agreements (NDA)', count: '45 Files', type: 'Confidential', icon: ShieldCheck },
              { title: 'Tax Deduction & Form 16 Archives', count: '120 Files', type: 'Financial', icon: FileText },
              { title: 'Background Verification Dockets', count: '38 Files', type: 'Verified', icon: UserCheck }
            ].map((doc, idx) => {
              const Icon = doc.icon;
              return (
                <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-luxury-blue/20 text-luxury-blue flex items-center justify-center shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{doc.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{doc.count}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/5 text-slate-300">{doc.type}</span>
                    <button className="flex items-center gap-1 text-xs font-bold text-luxury-blue hover:underline"><ExternalLink size={14} /> Open Vault</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'helpdesk' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Active Helpdesk Tickets</h3>
              <span className="text-xs font-bold text-luxury-blue">{tickets.length} Total</span>
            </div>
            <div className="space-y-4">
              {tickets.map((t, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-2xl border-white/5 hover:border-luxury-blue/30 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.issue}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${t.priority === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>{t.priority}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Raised by <span className="text-white font-medium">{t.emp}</span> • {t.id} • {t.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${t.status === 'Open' ? 'bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
                <LifeBuoy size={16} className="text-luxury-blue" /> Raise New HR Ticket
              </h3>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Issue Description</label>
                  <textarea value={newTicket.issue} onChange={e => setNewTicket({...newTicket, issue: e.target.value})} placeholder="Describe your query or request..." className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-luxury-blue resize-none" required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Priority Level</label>
                  <select value={newTicket.priority} onChange={e => setNewTicket({...newTicket, priority: e.target.value})} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue">
                    <option value="Low" className="bg-slate-900">Low Priority</option>
                    <option value="Medium" className="bg-slate-900">Medium Priority</option>
                    <option value="High" className="bg-slate-900">High Priority</option>
                  </select>
                </div>
                <button type="submit" className="w-full h-12 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 mt-4">Submit Ticket</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
