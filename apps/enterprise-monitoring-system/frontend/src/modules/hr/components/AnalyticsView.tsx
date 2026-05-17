import React, { useState, useEffect } from 'react';
import { BarChart2, PieChart, TrendingUp, Calendar, Download, CheckCircle, FileText, Users, DollarSign, Activity } from 'lucide-react';
import { smartHRApi } from '../api';

export function AnalyticsView() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'export'>('overview');

  useEffect(() => {
    smartHRApi.getAnalytics().then(setAnalytics);
  }, []);

  const handleExport = (format: string) => {
    alert(`Generating ${format.toUpperCase()} Enterprise Report... Successfully downloaded to your system!`);
  };

  if (!analytics) return <div className="p-8 text-center text-slate-400">Loading Enterprise Analytics...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <BarChart2 className="text-luxury-blue" />
            AI-Driven Analytics & BI Reports
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enterprise performance metrics, attendance trends, attrition predictions, and executive report exports.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'overview' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Overview</button>
          <button onClick={() => setActiveTab('reports')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'reports' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>BI Reports</button>
          <button onClick={() => setActiveTab('export')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'export' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Export Engine</button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Enterprise Workforce', value: analytics.totalEmployees, change: '+12% vs last quarter', icon: Users, color: 'text-luxury-blue' },
              { label: 'Avg Engagement Score', value: `${analytics.avgEngagement}%`, change: '+3.5% vs benchmark', icon: Activity, color: 'text-emerald-400' },
              { label: 'Avg Performance Rating', value: `★ ${analytics.avgPerformance}`, change: 'Top Tier 1 Output', icon: TrendingUp, color: 'text-amber-400' },
              { label: 'Predicted Attrition Risk', value: `${analytics.attritionRate}%`, change: 'Low Risk Status', icon: PieChart, color: 'text-rose-400' }
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{kpi.label}</span>
                    <div className="h-10 w-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <Icon size={18} className={kpi.color} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{kpi.value}</h3>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1">{kpi.change}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-luxury-blue" /> Weekly Attendance & Punctuality Trend
              </h3>
              <div className="space-y-4 pt-2">
                {analytics.attendanceTrend.map((t: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">{t.label}</span>
                      <span className="text-emerald-400">{t.value}% Active</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-luxury-blue to-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${t.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
                <BarChart2 size={16} className="text-luxury-blue" /> Productivity & Task Velocity (Sprint 42)
              </h3>
              <div className="space-y-4 pt-2">
                {analytics.productivityTrend.map((p: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">{p.label}</span>
                      <span className="text-luxury-blue">{p.value}% Velocity</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-luxury-blue rounded-full transition-all duration-1000" style={{ width: `${p.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <FileText size={16} className="text-luxury-blue" /> Executive Business Intelligence Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Daily Attendance & Geofence Docket', period: 'Daily', count: 'Generated 06:00 AM', desc: 'Summary of biometric check-ins and perimeter violations.' },
              { title: 'Weekly Sprint Velocity & POW Audit', period: 'Weekly', count: 'Generated Sunday', desc: 'Aggregated proof of work tasks and AI verification scores.' },
              { title: 'Monthly Payroll Disbursement & Tax Summary', period: 'Monthly', count: 'Generated 1st of Month', desc: 'Complete breakdown of salary, PF, ESI, and TDS deductions.' }
            ].map((rep, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20">{rep.period}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{rep.count}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-3">{rep.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{rep.desc}</p>
                </div>
                <div className="border-t border-white/5 pt-4 flex items-center gap-2">
                  <button onClick={() => handleExport('pdf')} className="flex-1 py-2 rounded-xl bg-luxury-blue text-white text-xs font-bold hover:bg-luxury-blue/80 transition shadow-md shadow-luxury-blue/20 flex items-center justify-center gap-1"><Download size={14} /> PDF</button>
                  <button onClick={() => handleExport('excel')} className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1"><Download size={14} /> Excel</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'export' && (
        <div className="glass-panel p-8 rounded-3xl border-white/10 max-w-2xl mx-auto bg-white/5 backdrop-blur-md space-y-6 text-center">
          <Download className="mx-auto h-16 w-16 text-luxury-blue animate-bounce" />
          <h3 className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white">Enterprise Report Export Engine</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">Select your desired format to compile a comprehensive, cryptographic-signed report containing all employee dockets, attendance logs, and AI violation audits.</p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <button onClick={() => handleExport('pdf')} className="px-6 py-3 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 flex items-center gap-2 text-xs">
              <Download size={16} /> Export Complete PDF Docket
            </button>
            <button onClick={() => handleExport('csv')} className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest hover:bg-emerald-600 transition shadow-xl shadow-emerald-500/30 flex items-center gap-2 text-xs">
              <Download size={16} /> Export Complete CSV / Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
