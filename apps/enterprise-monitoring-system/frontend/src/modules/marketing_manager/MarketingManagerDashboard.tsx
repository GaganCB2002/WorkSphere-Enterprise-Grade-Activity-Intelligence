import React from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { StatCardData } from '../../../models/types';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';
import { Megaphone, Search, Users, Share2 } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Total Campaign ROI', value: '312%', trend: '+45% YoY', trendType: 'up', icon: '📣', color: 'blue' },
  { title: 'Monthly Web Visitors', value: '1.2M', trend: 'SEO Organic', trendType: 'up', icon: '🔍', color: 'emerald' },
  { title: 'MQL Lead Conversions', value: '4,280', trend: 'Target exceeded', trendType: 'up', icon: '🎯', color: 'purple' },
  { title: 'Social Reach', value: '8.4M', trend: '+12% MoM', trendType: 'up', icon: '🌐', color: 'amber' },
];

const mockCampaigns = [
  { name: 'Q2 Enterprise AI Launch', budget: 150000, leads: 1820, roi: '340%', status: 'ACTIVE' },
  { name: 'North America FinTech Webinar', budget: 45000, leads: 640, roi: '280%', status: 'ACTIVE' },
  { name: 'EMEA Cloud Security Summit', budget: 80000, leads: 920, roi: '310%', status: 'COMPLETED' },
];

const mockLeadFunnel = [
  { stage: 'Website Visitors', count: 1200000 },
  { stage: 'Marketing Qualified (MQL)', count: 4280 },
  { stage: 'Sales Qualified (SQL)', count: 1420 },
  { stage: 'Closed Deals', count: 380 },
];

export const MarketingManagerDashboard: React.FC = () => {
  return (
    <DepartmentView
      title="Marketing & Demand Generation"
      subtitle="Campaign ROI, SEO Performance & Lead Conversion Funnel"
      stats={initialStats}
      onRefresh={() => alert('Refreshing marketing analytics...')}
      quickActions={[
        { label: 'Launch Campaign', icon: <Megaphone className="w-4 h-4" />, action: 'launch', variant: 'primary' },
        { label: 'SEO Audit Report', icon: <Search className="w-4 h-4" />, action: 'seo', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'launch') alert('Opening Campaign Builder Modal...');
        if (action === 'seo') alert('Generating Google Analytics & SEMrush SEO Performance Report...');
      }}
    >
      {/* Lead Conversion Funnel Bar Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Demand Generation Funnel</h3>
          <p className="text-slate-400 text-xs mt-1">Conversion tracking from top-of-funnel web traffic to closed won enterprise deals</p>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={mockLeadFunnel} margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="stage" type="category" stroke="#94a3b8" width={140} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Bar dataKey="count" name="Volume" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Active Marketing Campaigns</h3>
          <p className="text-slate-400 text-xs mt-1">Track advertising spend, generated leads, and overall campaign ROI</p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-4">Campaign Name</th>
                <th className="p-4 text-right">Budget</th>
                <th className="p-4 text-center">Leads (MQL)</th>
                <th className="p-4 text-center">ROI</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {mockCampaigns.map((camp, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{camp.name}</td>
                  <td className="p-4 text-right font-bold text-blue-400 text-xs">${camp.budget.toLocaleString()}</td>
                  <td className="p-4 text-center text-xs font-bold text-slate-300">{camp.leads}</td>
                  <td className="p-4 text-center font-bold text-emerald-400 text-xs">{camp.roi}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      camp.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {camp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DepartmentView>
  );
};
