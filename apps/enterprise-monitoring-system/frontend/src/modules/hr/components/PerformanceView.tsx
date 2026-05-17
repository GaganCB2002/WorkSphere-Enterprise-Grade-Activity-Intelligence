import React, { useState, useEffect } from 'react';
import { Target, Award, Star, MessageSquare, CheckCircle, AlertCircle, Plus, Search } from 'lucide-react';
import { smartHRApi } from '../api';
import type { PerformanceReview } from '../types';

export function PerformanceView() {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [empId, setEmpId] = useState('EMP-003');
  const [empName, setEmpName] = useState('Rohan Desai');
  const [kpiScore, setKpiScore] = useState<number>(4.5);
  const [goalRate, setGoalRate] = useState<number>(4.6);
  const [strengths, setStrengths] = useState('High velocity, Fast learner');
  const [improvements, setImprovements] = useState('Async communication');
  const [feedback, setFeedback] = useState('Rohan has shown excellent progress in frontend telemetry.');

  useEffect(() => {
    smartHRApi.getPerformanceReviews().then(setReviews);
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empId || !empName) return;
    const newRev = {
      employeeId: empId,
      employeeName: empName,
      kpiScore,
      goalCompletionRate: goalRate,
      overallRating: Math.round(((kpiScore * 0.6) + (goalRate * 0.4)) * 10) / 10,
      strengths: strengths.split(',').map(s => s.trim()),
      improvements: improvements.split(',').map(s => s.trim()),
      feedbackNotes: feedback
    };
    smartHRApi.submitPerformanceReview(newRev).then(res => {
      setReviews([res, ...reviews]);
      alert(`Performance Review Submitted! Overall Rating: ★${res.overallRating} (${res.appraisalStatus})`);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Target className="text-luxury-blue" />
            Performance, KPI/OKR & Appraisals
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">360-degree feedback, continuous KPI/OKR tracking, and AI-predicted appraisal readiness matrices.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Employee Performance Dockets</h3>
            <span className="text-xs font-bold text-luxury-blue">{reviews.length} Dockets</span>
          </div>

          <div className="space-y-4">
            {reviews.map((rev, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{rev.employeeName} ({rev.employeeId})</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Reviewer: {rev.reviewerName} • {rev.reviewDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${rev.appraisalStatus.includes('Promotion') ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20'}`}>{rev.appraisalStatus}</span>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400/10 text-amber-400 text-xs font-black border border-amber-400/20 shadow-md shadow-amber-400/10">
                      <Star size={14} className="fill-amber-400" /> ★ {rev.overallRating}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-[10px] uppercase text-emerald-400 font-bold tracking-wider mb-2">Core Strengths</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 font-medium">
                      {rev.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-amber-400 font-bold tracking-wider mb-2">Areas for Growth</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 font-medium">
                      {rev.improvements.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300 italic">
                  "{rev.feedbackNotes}"
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
              <Award size={16} className="text-luxury-blue" /> Submit 360 Review Docket
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Employee ID</label>
                <input type="text" value={empId} onChange={e => setEmpId(e.target.value)} placeholder="e.g. EMP-003" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Employee Name</label>
                <input type="text" value={empName} onChange={e => setEmpName(e.target.value)} placeholder="e.g. Rohan Desai" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">KPI Score (1-5)</label>
                  <input type="number" step="0.1" min="1" max="5" value={kpiScore} onChange={e => setKpiScore(Number(e.target.value))} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">OKR Completion (1-5)</label>
                  <input type="number" step="0.1" min="1" max="5" value={goalRate} onChange={e => setGoalRate(Number(e.target.value))} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Strengths (Comma separated)</label>
                <input type="text" value={strengths} onChange={e => setStrengths(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Growth Areas (Comma separated)</label>
                <input type="text" value={improvements} onChange={e => setImprovements(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Detailed Coach Feedback</label>
                <textarea value={feedback} onChange={e => setFeedback(e.target.value)} className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-luxury-blue resize-none" required />
              </div>
              <button type="submit" className="w-full h-12 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 mt-4">Publish Appraisal Docket</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
