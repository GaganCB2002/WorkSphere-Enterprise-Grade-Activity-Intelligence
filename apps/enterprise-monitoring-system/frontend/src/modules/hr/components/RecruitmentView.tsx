import React, { useState } from 'react';
import { Briefcase, UserPlus, Upload, Calendar, FileText, CheckCircle, AlertCircle, Award } from 'lucide-react';

export function RecruitmentView() {
  const [candidates, setCandidates] = useState([
    { id: 'CAN-101', name: 'Siddharth Rao', role: 'Senior React Architect', stage: 'Interview', match: 96, resume: 'siddharth_cv.pdf', date: '2026-05-18' },
    { id: 'CAN-102', name: 'Ananya Iyer', role: 'DevOps Lead', stage: 'Screening', match: 92, resume: 'ananya_devops.pdf', date: '2026-05-19' },
    { id: 'CAN-103', name: 'Vikram Malhotra', role: 'AI/ML Engineer', stage: 'Offer', match: 98, resume: 'vikram_ai.pdf', date: '2026-05-20' }
  ]);

  const [activeTab, setActiveTab] = useState<'candidates' | 'post' | 'onboarding'>('candidates');
  const [newJob, setNewJob] = useState({ title: '', department: '', location: '', reqSkills: '' });

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title) return;
    alert(`Job "${newJob.title}" posted successfully to LinkedIn, Indeed, and WorkSphere Career Portal!`);
    setNewJob({ title: '', department: '', location: '', reqSkills: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Briefcase className="text-luxury-blue" />
            Recruitment & Automated Onboarding
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">AI-powered resume parsing, interview scheduling, and e-signature offer management.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab('candidates')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'candidates' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Candidates</button>
          <button onClick={() => setActiveTab('post')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'post' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Post Job</button>
          <button onClick={() => setActiveTab('onboarding')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'onboarding' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Onboarding Workflows</button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'candidates' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Active Candidate Pipeline</h3>
              <span className="text-xs font-bold text-luxury-blue">{candidates.length} Total</span>
            </div>
            <div className="space-y-4">
              {candidates.map(c => (
                <div key={c.id} className="glass-panel p-5 rounded-2xl border-white/5 hover:border-luxury-blue/30 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-luxury-blue/20 text-luxury-blue flex items-center justify-center font-black text-lg shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{c.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{c.role} • <span className="text-luxury-blue font-semibold">{c.id}</span></p>
                      <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1"><Award size={12} className="text-amber-400" /> {c.match}% AI Match</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {c.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      c.stage === 'Offer' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      c.stage === 'Interview' ? 'bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20' :
                      'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>{c.stage}</span>
                    <button className="px-3 py-1.5 rounded-xl bg-luxury-blue text-white text-xs font-bold hover:bg-luxury-blue/80 transition shadow-md shadow-luxury-blue/20">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
                <Upload size={16} className="text-luxury-blue" /> AI Resume Parser
              </h3>
              <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 text-center hover:border-luxury-blue/50 transition cursor-pointer bg-white/5">
                <Upload className="mx-auto h-12 w-12 text-luxury-blue mb-4 animate-bounce" />
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Drag & Drop Resume (PDF/DOCX)</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">AI will automatically extract skills, experience, and match score.</p>
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl bg-gradient-to-br from-luxury-blue/20 to-transparent border-white/10 mt-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-400" /> Automated E-Signature
              </h4>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">Offer letters are securely signed via DocuSign/Aadhaar eSign integration instantly.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'post' && (
        <div className="glass-panel p-8 rounded-3xl border-white/10 max-w-2xl mx-auto bg-white/5 backdrop-blur-md space-y-6">
          <h3 className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <UserPlus size={18} className="text-luxury-blue" /> Create Multi-Channel Job Posting
          </h3>
          <form onSubmit={handlePostJob} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Job Title</label>
              <input type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} placeholder="e.g. Senior Microservices Engineer" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Department</label>
                <input type="text" value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})} placeholder="e.g. Core Engineering" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Location</label>
                <input type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} placeholder="e.g. Bangalore / Davangere" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Required Skills (Comma separated)</label>
              <input type="text" value={newJob.reqSkills} onChange={e => setNewJob({...newJob, reqSkills: e.target.value})} placeholder="e.g. Spring Boot, React, Kubernetes" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
            </div>
            <button type="submit" className="w-full h-12 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 mt-4">Broadcast Job</button>
          </form>
        </div>
      )}

      {activeTab === 'onboarding' && (
        <div className="glass-panel p-8 rounded-3xl border-white/10 bg-white/5 backdrop-blur-md space-y-6">
          <h3 className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-400" /> Automated Onboarding Workflow Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 'Step 1: Document Verification', desc: 'AI verifies ID, PAN, and educational transcripts instantly.', status: 'Completed', color: 'border-emerald-500/30 bg-emerald-500/5' },
              { step: 'Step 2: Asset Allocation', desc: 'Laptop & monitor auto-assigned from Inventory module.', status: 'In Progress', color: 'border-luxury-blue/30 bg-luxury-blue/5' },
              { step: 'Step 3: Access Provisioning', desc: 'GitHub, Jira, AWS, and Slack accounts created via SSO.', status: 'Pending', color: 'border-amber-500/30 bg-amber-500/5' },
              { step: 'Step 4: Buddy Assignment', desc: 'Senior engineer paired for 30-day technical handholding.', status: 'Scheduled', color: 'border-purple-500/30 bg-purple-500/5' }
            ].map((item, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border ${item.color} space-y-4 flex flex-col justify-between`}>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">{item.step}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-max bg-white/10 text-white border border-white/10">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
