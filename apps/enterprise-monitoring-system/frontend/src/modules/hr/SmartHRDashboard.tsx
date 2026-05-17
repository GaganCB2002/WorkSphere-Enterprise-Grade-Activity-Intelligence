import React, { useState } from 'react';
import {
  Briefcase, Users, Clock, IndianRupee, Target, BookOpen, SmilePlus,
  MessageSquare, BarChart2, Cpu, Navigation, Camera, Package, ShieldCheck,
  Sun, Moon, Bell, RefreshCw, Search, Menu, X, Award, ExternalLink
} from 'lucide-react';

import { RecruitmentView } from './components/RecruitmentView';
import { CoreHRView } from './components/CoreHRView';
import { AttendanceView } from './components/AttendanceView';
import { PayrollView } from './components/PayrollView';
import { PerformanceView } from './components/PerformanceView';
import { LMSView } from './components/LMSView';
import { EngagementView } from './components/EngagementView';
import { CommunicationView } from './components/CommunicationView';
import { AnalyticsView } from './components/AnalyticsView';
import { AIFeaturesView } from './components/AIFeaturesView';
import { LiveTrackingView } from './components/LiveTrackingView';
import { ProofOfWorkView } from './components/ProofOfWorkView';
import { InventoryView } from './components/InventoryView';
import { SecurityView } from './components/SecurityView';

interface SmartHRDashboardProps {
  data?: any;
  feed?: any;
  onRefresh?: () => Promise<void>;
}

export function SmartHRDashboard({ data, feed, onRefresh }: SmartHRDashboardProps) {
  const [activeModule, setActiveModule] = useState<string>('recruitment');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
  };

  const navItems = [
    { id: 'recruitment', label: 'Recruitment & Onboarding', icon: Briefcase },
    { id: 'core', label: 'Core HR & Helpdesk', icon: Users },
    { id: 'attendance', label: 'Attendance & Leaves', icon: Clock },
    { id: 'payroll', label: 'Payroll & Taxation', icon: IndianRupee },
    { id: 'performance', label: 'Performance & OKRs', icon: Target },
    { id: 'lms', label: 'LMS & Training', icon: BookOpen },
    { id: 'engagement', label: 'Engagement & Kudos', icon: SmilePlus },
    { id: 'communication', label: 'Enterprise Chat', icon: MessageSquare },
    { id: 'analytics', label: 'AI Analytics & BI', icon: BarChart2 },
    { id: 'ai', label: 'AI Automation Suite', icon: Cpu },
    { id: 'tracking', label: 'Live GPS Tracking', icon: Navigation },
    { id: 'pow', label: 'Proof of Work (POW)', icon: Camera },
    { id: 'inventory', label: 'Inventory & IT Assets', icon: Package },
    { id: 'security', label: 'Security & RBAC', icon: ShieldCheck }
  ];

  const renderActiveView = () => {
    switch (activeModule) {
      case 'recruitment': return <RecruitmentView />;
      case 'core': return <CoreHRView />;
      case 'attendance': return <AttendanceView />;
      case 'payroll': return <PayrollView />;
      case 'performance': return <PerformanceView />;
      case 'lms': return <LMSView />;
      case 'engagement': return <EngagementView />;
      case 'communication': return <CommunicationView />;
      case 'analytics': return <AnalyticsView />;
      case 'ai': return <AIFeaturesView />;
      case 'tracking': return <LiveTrackingView />;
      case 'pow': return <ProofOfWorkView />;
      case 'inventory': return <InventoryView />;
      case 'security': return <SecurityView />;
      default: return <RecruitmentView />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} font-sans transition-colors duration-300 flex flex-col`}>
      {/* Top Navigation Bar */}
      <header className="h-20 glass-panel border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-3xl bg-gradient-to-tr from-luxury-blue to-purple-600 flex items-center justify-center font-black text-xl text-white shadow-xl shadow-luxury-blue/30 animate-pulse">
              W
            </div>
            <div>
              <h1 className="text-lg font-black uppercase italic tracking-wider bg-gradient-to-r from-white via-slate-200 to-luxury-blue bg-clip-text text-transparent">
                WorkSphere Enterprise
              </h1>
              <p className="text-[10px] font-bold text-luxury-blue uppercase tracking-widest">Smart HR Microservice Hub</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Davangere & Bangalore Hubs Active</span>
          </div>

          <button onClick={handleRefresh} className={`p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition ${isRefreshing ? 'animate-spin text-luxury-blue' : ''}`} title="Refresh Platform Telemetry">
            <RefreshCw size={18} />
          </button>

          <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition" title="Toggle Dark/Light Mode">
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-luxury-blue" />}
          </button>

          <div className="h-10 w-10 rounded-2xl bg-luxury-blue/20 border border-luxury-blue/40 flex items-center justify-center font-black text-sm text-luxury-blue shadow-lg shadow-luxury-blue/20 cursor-pointer" title="CEO / Principal Dashboard">
            CEO
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <aside className={`w-72 glass-panel border-r border-white/10 p-6 flex flex-col justify-between absolute lg:static inset-y-0 left-0 z-40 bg-slate-950/95 lg:bg-transparent backdrop-blur-2xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 flex-1">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 px-4 mb-2">Core HR Modules</p>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveModule(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition uppercase tracking-wider ${isActive ? 'bg-luxury-blue text-white shadow-xl shadow-luxury-blue/30 translate-x-1' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-luxury-blue'} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-white/10 pt-6 mt-6 space-y-4 shrink-0">
            <div className="p-4 rounded-3xl bg-gradient-to-tr from-luxury-blue/20 via-purple-500/10 to-transparent border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-white">
                <Award size={16} className="text-amber-400" />
                <span>Zoho People Enterprise</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">Fully integrated with WorkSphere Activity Intelligence & LiveGuard GPS.</p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar bg-slate-950/40">
          <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}
