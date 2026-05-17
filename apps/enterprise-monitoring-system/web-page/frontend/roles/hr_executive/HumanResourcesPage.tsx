import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  UserCheck, 
  UserMinus, 
  MoreHorizontal, 
  ChevronRight,
  Search,
  Filter,
  FileText,
  ShieldCheck,
  TrendingUp,
  Mail
} from 'lucide-react';

export function HumanResourcesPage() {
  const [view, setView] = useState<'attendance' | 'leave'>('attendance');

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-700 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[32px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                 <ShieldCheck size={18} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Departmental Intelligence</p>
           </div>
           <h1 className="text-4xl font-display font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">Human <span className="text-blue-600 dark:text-blue-400">Capital.</span></h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-[24px] border border-slate-200 dark:border-slate-700">
           <button 
             onClick={() => setView('attendance')}
             className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
               view === 'attendance' ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
             }`}
           >
             Attendance Sync
           </button>
           <button 
             onClick={() => setView('leave')}
             className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
               view === 'leave' ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
             }`}
           >
             Leave Control
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Main Content Area */}
         <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel p-8 rounded-[48px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40 shadow-2xl">
               <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white">
                    {view === 'attendance' ? 'Real-time Presence' : 'Leave Requests Queue'}
                  </h3>
                  <div className="flex items-center gap-3">
                     <button className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-700">
                        <Search size={18} />
                     </button>
                     <button className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-700">
                        <Filter size={18} />
                     </button>
                  </div>
               </div>

               <div className="space-y-4">
                  {view === 'attendance' ? (
                    [
                      { name: 'Alexander Wright', role: 'Sr. Engineer', status: 'Active', time: '09:02 AM', location: 'Office' },
                      { name: 'Sarah Jenkins', role: 'UI Designer', status: 'Remote', time: '08:45 AM', location: 'London' },
                      { name: 'Marcus Chen', role: 'Project Lead', status: 'Active', time: '09:15 AM', location: 'Office' },
                      { name: 'Elena Rodriguez', role: 'DevOps', status: 'Offline', time: '-', location: '-' },
                    ].map((emp, i) => (
                      <div 
                        key={emp.name}
                        className="flex items-center justify-between p-5 bg-white dark:bg-slate-900/60 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 transition-all group shadow-sm"
                      >
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-700">
                               {emp.name.charAt(0)}
                            </div>
                            <div>
                               <p className="text-xs font-black uppercase tracking-tight text-slate-900 dark:text-white">{emp.name}</p>
                               <p className="text-[10px] font-bold text-slate-500">{emp.role}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-12">
                            <div className="hidden sm:block text-right">
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
                               <div className="flex items-center gap-2 justify-end">
                                  <div className={`h-1.5 w-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500' : emp.status === 'Remote' ? 'bg-blue-600' : 'bg-slate-400'}`} />
                                  <span className="text-[10px] font-bold text-slate-900 dark:text-white">{emp.status}</span>
                               </div>
                            </div>
                            <div className="hidden sm:block text-right">
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Check-in</p>
                               <p className="text-[10px] font-bold text-slate-900 dark:text-white">{emp.time}</p>
                            </div>
                            <button className="h-10 w-10 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors border border-transparent dark:hover:border-slate-70">
                               <MoreHorizontal size={18} />
                            </button>
                         </div>
                      </div>
                    ))
                  ) : (
                    [
                      { name: 'James Miller', type: 'Sick Leave', duration: '2 Days', date: 'May 10 - May 12', status: 'Pending' },
                      { name: 'Lisa Thompson', type: 'Vacation', duration: '5 Days', date: 'June 01 - June 06', status: 'Approved' },
                    ].map((req, i) => (
                      <div key={req.name} className="p-6 bg-white dark:bg-slate-900/60 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                         <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                            <div className="flex items-center gap-4">
                               <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                  <UserMinus size={20} />
                               </div>
                               <div>
                                  <p className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">{req.name}</p>
                                  <p className="text-[10px] font-bold text-slate-500">{req.type}</p>
                               </div>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                              req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}>
                              {req.status}
                            </span>
                         </div>
                         <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-6">
                               <div className="flex items-center gap-2 text-slate-500">
                                  <Calendar size={14} />
                                  <span className="text-[10px] font-bold uppercase">{req.date}</span>
                                </div>
                               <div className="flex items-center gap-2 text-slate-500">
                                  <Clock size={14} />
                                  <span className="text-[10px] font-bold uppercase">{req.duration}</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-3">
                               <button 
                                 onClick={() => alert(`Rejected leave request for ${req.name}`)}
                                 className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-rose-500/20 border border-transparent hover:border-rose-500/30 transition"
                               >
                                 Reject
                               </button>
                               <button 
                                 onClick={() => alert(`Approved leave request for ${req.name}`)}
                                 className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition"
                               >
                                 Approve
                               </button>
                            </div>
                         </div>
                      </div>
                    ))
                  )}
               </div>
            </div>
         </div>

         {/* Sidebar Stats Area */}
         <div className="space-y-8">
            <div className="glass-panel p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40 shadow-2xl">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">Workforce Analytics</h4>
               <div className="space-y-8">
                  {[
                    { label: 'Attendance Rate', value: '94.2%', trend: '+2.1%', icon: TrendingUp, color: 'text-emerald-500' },
                    { label: 'Active Leave', value: '08 Persons', trend: 'Stable', icon: UserMinus, color: 'text-blue-600 dark:text-blue-400' },
                    { label: 'Unscheduled Absence', value: '0.5%', trend: '-0.2%', icon: Clock, color: 'text-rose-500' },
                  ].map(stat => (
                    <div key={stat.label} className="border-b border-slate-100 dark:border-slate-800/50 pb-4 last:border-0 last:pb-0">
                       <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
                          <span className={`text-[10px] font-black ${stat.color}`}>{stat.trend}</span>
                       </div>
                       <p className="text-2xl font-black italic text-slate-900 dark:text-white">{stat.value}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-panel p-8 rounded-[40px] bg-blue-600 border border-blue-500 text-white shadow-2xl shadow-blue-600/30 flex flex-col justify-between">
               <div>
                 <Mail className="h-8 w-8 mb-6 opacity-80" />
                 <h4 className="text-xl font-black uppercase italic mb-4">Send Broadcast</h4>
                 <p className="text-sm font-medium mb-8 text-white/80 leading-relaxed">Communicate with the entire workforce instantly via secure internal channels.</p>
               </div>
               <button 
                 onClick={() => alert('Opening Secure Workforce Broadcast Modal...')}
                 className="w-full py-4 bg-white hover:bg-slate-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transition"
               >
                 Initialize Broadcast
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
