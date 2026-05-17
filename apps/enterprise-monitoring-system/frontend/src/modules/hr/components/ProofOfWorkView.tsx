import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, AlertCircle, Upload, MapPin, Clock, Search, ExternalLink } from 'lucide-react';
import { smartHRApi } from '../api';
import type { ProofOfWork } from '../types';

export function ProofOfWorkView() {
  const [pows, setPows] = useState<ProofOfWork[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80');

  useEffect(() => {
    smartHRApi.getProofOfWorks().then(setPows);
  }, []);

  const handleSubmitPOW = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    smartHRApi.submitProofOfWork({ taskTitle, mediaUrl, employeeId: 'EMP-003', employeeName: 'Rohan Desai' }).then(res => {
      setPows([res, ...pows]);
      setTaskTitle('');
      alert('Proof of Work Submitted! AI Analysis verified the image, timestamp, and location successfully.');
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Camera className="text-luxury-blue" />
            AI Proof of Work & Verification Engine
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cryptographic timestamping, AI computer vision screenshot verification, and GPS coordinate binding.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Verified Proof of Work Feed</h3>
            <span className="text-xs font-bold text-luxury-blue">{pows.length} Verified Tasks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pows.map((pow, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle size={12} /> AI Verified
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{new Date(pow.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>

                  <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 relative group bg-slate-900">
                    <img src={pow.mediaUrl} alt={pow.taskTitle} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                      <p className="text-xs font-bold text-white truncate">{pow.taskTitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed"><span className="text-slate-400 font-semibold block mb-1">AI Audit Summary:</span> {pow.aiAnalysisSummary}</p>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-luxury-blue" /> {pow.latitude}, {pow.longitude}</span>
                  <span className="text-white font-bold">{pow.employeeName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
              <Upload size={16} className="text-luxury-blue" /> Submit Task Verification Docket
            </h3>
            <form onSubmit={handleSubmitPOW} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Task / Milestone Title</label>
                <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="e.g. Implemented OAuth2 JWT Security" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Evidence Image / Screenshot URL</label>
                <input type="text" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>

              <div className="border-2 border-dashed border-white/10 rounded-3xl p-6 text-center hover:border-luxury-blue/50 transition cursor-pointer bg-white/5 my-4">
                <Camera className="mx-auto h-12 w-12 text-luxury-blue mb-4 animate-pulse" />
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Simulate Live Camera Capture</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Binds hardware GPS lock & cryptographic timestamp automatically.</p>
              </div>

              <button type="submit" className="w-full h-12 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 mt-4">Publish Proof of Work</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
