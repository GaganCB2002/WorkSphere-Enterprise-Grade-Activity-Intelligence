import React, { useState, useEffect } from 'react';
import { SmilePlus, Award, Megaphone, CheckCircle, Plus, Search, Heart, ThumbsUp } from 'lucide-react';
import { smartHRApi } from '../api';
import type { EngagementSurvey } from '../types';

export function EngagementView() {
  const [surveys, setSurveys] = useState<EngagementSurvey[]>([]);
  const [activeTab, setActiveTab] = useState<'surveys' | 'recognition' | 'announcements'>('surveys');
  const [kudos, setKudos] = useState([
    { id: '1', from: 'Arjun Mehta', to: 'Rohan Desai', badge: 'Super Debugger', msg: 'Fixed the Davangere GPS proxy triangulation bug in record time!', date: '2026-05-17', likes: 14 },
    { id: '2', from: 'Priya Sharma', to: 'Arjun Mehta', badge: 'Inspiring Leader', msg: 'Flawless execution of the enterprise monitoring microservices architecture.', date: '2026-05-15', likes: 28 }
  ]);
  const [newKudo, setNewKudo] = useState({ to: '', badge: 'Star Performer', msg: '' });

  useEffect(() => {
    smartHRApi.getSurveys().then(setSurveys);
  }, []);

  const handleSendKudo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKudo.to || !newKudo.msg) return;
    setKudos([{ id: String(Date.now()), from: 'Current User', to: newKudo.to, badge: newKudo.badge, msg: newKudo.msg, date: new Date().toISOString().split('T')[0], likes: 1 }, ...kudos]);
    setNewKudo({ to: '', badge: 'Star Performer', msg: '' });
    alert('Kudos sent! Recognition published to company wall.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <SmilePlus className="text-luxury-blue" />
            Engagement, Recognition & Announcements
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pulse surveys, peer-to-peer kudos recognition wall, and enterprise-wide broadcast announcements.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab('surveys')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'surveys' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Surveys</button>
          <button onClick={() => setActiveTab('recognition')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'recognition' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Recognition Wall</button>
          <button onClick={() => setActiveTab('announcements')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'announcements' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Announcements</button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'surveys' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {surveys.map(s => (
            <div key={s.id} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20">{s.category}</span>
                  <span className="text-xs text-slate-400 font-bold">{s.publishedDate}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-3">{s.title}</h4>
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Survey Questions:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {s.questions.map((q, i) => <li key={i}>{q}</li>)}
                  </ul>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">Participation: <span className="text-white font-bold">{s.participationRate}%</span></span>
                <span className="text-emerald-400 font-bold flex items-center gap-1"><ThumbsUp size={14} /> Sentiment: {s.averageSentimentScore}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'recognition' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Peer Recognition Kudos Wall</h3>
              <span className="text-xs font-bold text-luxury-blue">{kudos.length} Kudos</span>
            </div>
            <div className="space-y-4">
              {kudos.map(k => (
                <div key={k.id} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <p className="text-xs text-slate-400"><span className="text-white font-bold">{k.from}</span> celebrated <span className="text-luxury-blue font-bold">{k.to}</span></p>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center gap-1"><Award size={12} /> {k.badge}</span>
                  </div>
                  <p className="text-sm text-slate-200 italic">"{k.msg}"</p>
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{k.date}</span>
                    <button className="flex items-center gap-1 text-rose-400 hover:scale-110 transition font-bold"><Heart size={14} className="fill-rose-400" /> {k.likes}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
                <Award size={16} className="text-luxury-blue" /> Send Peer Kudos Badge
              </h3>
              <form onSubmit={handleSendKudo} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Recipient Name</label>
                  <input type="text" value={newKudo.to} onChange={e => setNewKudo({...newKudo, to: e.target.value})} placeholder="e.g. Rohan Desai" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Badge Type</label>
                  <select value={newKudo.badge} onChange={e => setNewKudo({...newKudo, badge: e.target.value})} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue">
                    <option value="Star Performer" className="bg-slate-900">Star Performer</option>
                    <option value="Super Debugger" className="bg-slate-900">Super Debugger</option>
                    <option value="Team Player" className="bg-slate-900">Team Player</option>
                    <option value="Innovator" className="bg-slate-900">Innovator</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Appreciation Message</label>
                  <textarea value={newKudo.msg} onChange={e => setNewKudo({...newKudo, msg: e.target.value})} placeholder="Write why they deserve this kudos..." className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-luxury-blue resize-none" required />
                </div>
                <button type="submit" className="w-full h-12 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 mt-4">Publish Recognition</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <Megaphone size={16} className="text-luxury-blue" /> Enterprise Broadcast Announcements
          </h3>
          <div className="space-y-4">
            {[
              { title: 'WorkSphere 2026 Global Virtual Townhall', date: 'May 25, 2026', author: 'CEO Office', content: 'Join us for our Q2 strategic roadmap presentation covering biometric security expansion and AI anomaly detection rollout across all regional hubs.', priority: 'Urgent' },
              { title: 'Davangere Engineering Facility Upgrade Completed', date: 'May 10, 2026', author: 'Facilities & IT', content: 'New Gigabit Wi-Fi 7 triangulation nodes and 4K dual-monitor desks have been fully deployed for all employees.', priority: 'Standard' }
            ].map((ann, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{ann.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Broadcast by {ann.author} • {ann.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${ann.priority === 'Urgent' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20'}`}>{ann.priority}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
