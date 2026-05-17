import React from 'react';
import { AlertTriangle, Brain, RefreshCw, User as UserIcon } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  category: string;
  actor: string;
  timestamp: string | number;
}

export interface DashboardData {
  hero?: {
    title?: string;
    subtitle?: string;
    modules?: string[];
  };
  aiInsights?: {
    recommendations?: string[];
    attritionHotspots?: { name: string; department: string; risk: number }[];
  };
  metrics?: { id: string; label?: string; title?: string; value: string | number; icon?: string; change?: string }[];
  attendanceTrend?: { label: string; value: number }[];
  productivityTrend?: { label: string; value: number }[];
  alerts?: string[];
  budgetUtilization?: { department: string; utilization: number; forecast: number }[];
}

interface DashboardPageProps {
  data: DashboardData;
  feed: ActivityItem[];
  onRefresh: () => Promise<void>;
}

const chartPalette = ['#0f766e', '#1d4ed8', '#f97316', '#7c3aed'];

export function MetricCard({ metric }: { metric: any }) {
  return (
    <div className="rounded-[22px] bg-white p-5 border border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{metric.label || metric.title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{metric.value}</p>
        </div>
        <div className="rounded-xl p-3 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
          <span className="text-lg">{metric.icon || '📊'}</span>
        </div>
      </div>
      {metric.change && (
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>{metric.change}</span>
        </div>
      )}
    </div>
  );
}

export function SectionCard({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-[28px] bg-white p-6 lg:p-8 border border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h3>
          {subtitle && <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
}

export function StatusBadge({ label }: { label: string }) {
  const getBadgeStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('approv') || s.includes('high') || s.includes('active')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (s.includes('pend') || s.includes('warn') || s.includes('med')) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    if (s.includes('reject') || s.includes('crit') || s.includes('low')) return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
    return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getBadgeStyle(label)}`}>
      {label}
    </span>
  );
}

export function currency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

export function dateTimeLabel(ts: string | number) {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString() + ' ' + new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function DashboardPage({ data, feed, onRefresh }: DashboardPageProps) {
  return (
    <div className="space-y-4">
      <section className="glass-panel overflow-hidden p-7 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[28px]">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">Command center</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{data?.hero?.title || 'Dashboard'}</h2>
            <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400">{data?.hero?.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {data?.hero?.modules?.map((module) => (
                <span key={module} className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
                  {module}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">AI recommendations</p>
                <h3 className="mt-2 text-2xl font-semibold">Workforce pulse</h3>
              </div>
              <Brain className="h-7 w-7 text-amber-300" />
            </div>
            <div className="mt-6 space-y-4">
              {data?.aiInsights?.recommendations?.map((recommendation) => (
                <div key={recommendation} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 shadow-inner">
                  {recommendation}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {data?.metrics?.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard
          title="Attendance and productivity"
          subtitle="Month-wise workforce health indicators."
          action={
            <button
              type="button"
              onClick={() => void onRefresh()}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 transition hover:border-blue-600 hover:text-blue-600"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh snapshot
            </button>
          }
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.attendanceTrend || []}>
                  <defs>
                    <linearGradient id="attendanceFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#0f766e" stopOpacity={0.42} />
                      <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }} />
                  <Area dataKey="value" stroke="#0f766e" fill="url(#attendanceFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.productivityTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }} />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {(data?.productivityTrend || []).map((entry, index) => (
                      <Cell key={entry.label} fill={chartPalette[index % chartPalette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Active alerts" subtitle="Operational items that need attention this week.">
          <div className="space-y-3">
            {data?.alerts?.map((alert) => (
              <div key={alert} className="flex gap-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 px-4 py-4 text-sm text-amber-800 dark:text-amber-400 border border-amber-500/20">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{alert}</span>
              </div>
            ))}
            {data?.aiInsights?.attritionHotspots?.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-4 bg-slate-50 dark:bg-slate-900/30">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.department}</p>
                </div>
                <StatusBadge label={`${item.risk >= 30 ? 'High' : item.risk >= 15 ? 'Medium' : 'Low'}`} />
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Budget utilization" subtitle="Department spending against approved plan.">
          <div className="space-y-4">
            {data?.budgetUtilization?.map((item) => (
              <div key={item.department} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-900 dark:text-white">{item.department}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {item.utilization}% used • forecast {currency(item.forecast)}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(item.utilization, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Live activity feed" subtitle="Streaming HR actions, AI alerts, and operational updates.">
          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
            {feed?.map((item) => (
              <article key={`${item.id}-${item.timestamp}`} className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:bg-slate-900 dark:border-slate-800 transition-all hover:border-blue-600/30 shadow-sm">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white leading-tight">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
                  </div>
                  <StatusBadge label={item.category} />
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                      <UserIcon size={12} />
                    </div>
                    <span>{item.actor}</span>
                  </div>
                  <span>{dateTimeLabel(item.timestamp)}</span>
                </div>
              </article>
            ))}
            {(feed?.length === 0) && (
              <div className="py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest opacity-50">
                Awaiting telemetry...
              </div>
            )}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
