import React, { useState } from 'react';
import { StatCardData } from '../models/types';
import { 
  TrendingUp, TrendingDown, Minus, Calendar, Filter, Download, 
  RefreshCw, Search, Plus, CheckCircle, AlertTriangle, Info
} from 'lucide-react';

interface DepartmentViewProps {
  title: string;
  subtitle: string;
  stats: StatCardData[];
  onRefresh?: () => void;
  onExport?: () => void;
  onQuickAction?: (actionName: string) => void;
  quickActions?: { label: string; icon: React.ReactNode; action: string; variant?: 'primary' | 'secondary' | 'danger' }[];
  children: React.ReactNode;
}

export const StatCard: React.FC<{ data: StatCardData }> = ({ data }) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
          {data.title}
        </span>
        <div className={`p-3 rounded-xl bg-${data.color}-500/10 border border-${data.color}-500/20 text-${data.color}-400`}>
          <span className="text-xl">{data.icon}</span>
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <h4 className="text-3xl font-bold text-white tracking-tight">
          {data.value}
        </h4>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
          data.trendType === 'up' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
          data.trendType === 'down' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
          'bg-slate-500/10 text-slate-400 border border-slate-500/20'
        }`}>
          {data.trendType === 'up' && <TrendingUp className="w-3 h-3" />}
          {data.trendType === 'down' && <TrendingDown className="w-3 h-3" />}
          {data.trendType === 'neutral' && <Minus className="w-3 h-3" />}
          <span>{data.trend}</span>
        </div>
      </div>
    </div>
  );
};

export const DepartmentView: React.FC<DepartmentViewProps> = ({
  title,
  subtitle,
  stats,
  onRefresh,
  onExport,
  onQuickAction,
  quickActions = [],
  children
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('7d');

  return (
    <div className="min-h-full bg-slate-950 text-slate-100 p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            {title}
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">
            {subtitle}
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search department..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all w-60"
            />
          </div>

          {/* Time Filter */}
          <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl p-1">
            {['24h', '7d', '30d', '1y'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeFilter === t 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Refresh & Export */}
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="p-2.5 bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all hover:rotate-180 duration-500"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          {onExport && (
            <button 
              onClick={onExport}
              className="flex items-center gap-2 px-4 py-2 bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white text-sm font-semibold transition-all"
              title="Export Report"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Export</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions Bar */}
      {quickActions.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/30 backdrop-blur-md border border-slate-800/60 rounded-2xl shadow-lg">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Quick Actions:
          </span>
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => onQuickAction && onQuickAction(action.action)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg ${
                action.variant === 'primary' ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20' :
                action.variant === 'danger' ? 'bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30' :
                'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} data={stat} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};
