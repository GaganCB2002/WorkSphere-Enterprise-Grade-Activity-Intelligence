import React, { useState, useEffect } from 'react';
import { BookOpen, Award, CheckCircle, Plus, Search, Users, ExternalLink } from 'lucide-react';
import { smartHRApi } from '../api';
import type { TrainingCourse } from '../types';

export function LMSView() {
  const [courses, setCourses] = useState<TrainingCourse[]>([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', category: 'Engineering', certificationName: '', durationHours: 12 });
  const [activeTab, setActiveTab] = useState<'catalog' | 'create'>('catalog');

  useEffect(() => {
    smartHRApi.getCourses().then(setCourses);
  }, []);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title) return;
    smartHRApi.createCourse(newCourse).then(res => {
      setCourses([res, ...courses]);
      setNewCourse({ title: '', description: '', category: 'Engineering', certificationName: '', durationHours: 12 });
      setActiveTab('catalog');
      alert(`Course "${res.title}" Published to Enterprise LMS!`);
    });
  };

  const handleEnroll = (courseId: string) => {
    smartHRApi.enrollInCourse(courseId, 'EMP-003').then(() => {
      smartHRApi.getCourses().then(setCourses);
      alert('Successfully enrolled Rohan Desai (EMP-003) in course!');
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <BookOpen className="text-luxury-blue" />
            LMS, Skill Tracking & Certifications
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enterprise upskilling catalog, automated skill matrix mapping, and digital badge certifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab('catalog')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'catalog' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Course Catalog</button>
          <button onClick={() => setActiveTab('create')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'create' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Publish New Course</button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(c => (
            <div key={c.id} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20">{c.category}</span>
                  <span className="text-xs text-slate-400 font-bold">{c.durationHours}h Duration</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{c.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{c.description}</p>
                {c.certificationName && (
                  <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold">
                    <Award size={16} /> {c.certificationName}
                  </div>
                )}
              </div>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1"><Users size={14} /> {c.enrolledEmployeeIds.length} Enrolled</span>
                <button onClick={() => handleEnroll(c.id)} className="px-4 py-2 rounded-xl bg-luxury-blue text-white text-xs font-black hover:bg-luxury-blue/80 transition shadow-lg shadow-luxury-blue/20">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="glass-panel p-8 rounded-3xl border-white/10 max-w-2xl mx-auto bg-white/5 backdrop-blur-md space-y-6">
          <h3 className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-luxury-blue" /> Create Enterprise Training Program
          </h3>
          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Course Title</label>
              <input type="text" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} placeholder="e.g. Masterclass in Distributed Caching" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Detailed Syllabus & Objectives</label>
              <textarea value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} placeholder="Describe what employees will learn..." className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-luxury-blue resize-none" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Category</label>
                <select value={newCourse.category} onChange={e => setNewCourse({...newCourse, category: e.target.value})} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue">
                  <option value="Engineering" className="bg-slate-900">Engineering</option>
                  <option value="Compliance" className="bg-slate-900">Compliance</option>
                  <option value="Leadership" className="bg-slate-900">Leadership</option>
                  <option value="Soft Skills" className="bg-slate-900">Soft Skills</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Duration (Hours)</label>
                <input type="number" value={newCourse.durationHours} onChange={e => setNewCourse({...newCourse, durationHours: Number(e.target.value)})} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Certification Badge</label>
                <input type="text" value={newCourse.certificationName} onChange={e => setNewCourse({...newCourse, certificationName: e.target.value})} placeholder="e.g. AWS Certified" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
            </div>
            <button type="submit" className="w-full h-12 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 mt-4">Publish Course to Enterprise Hub</button>
          </form>
        </div>
      )}
    </div>
  );
}
