import React, { useState } from 'react';
import { DepartmentView } from '../../../dashboards/DepartmentView';
import { StatCardData } from '../../../models/types';
import { DollarSign, Users, Award, TrendingUp, ArrowRight, CheckCircle, Clock } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Q2 Revenue Quota', value: '$35.0M', trend: '88% achieved', trendType: 'up', icon: '💰', color: 'emerald' },
  { title: 'Active CRM Deals', value: '142', trend: '$42M Pipeline', trendType: 'up', icon: '🤝', color: 'blue' },
  { title: 'Win Rate', value: '64.5%', trend: '+3.2% QoQ', trendType: 'up', icon: '📈', color: 'purple' },
  { title: 'Sales Rep Commissions', value: '$1.2M', trend: 'Disbursed', trendType: 'neutral', icon: '⭐', color: 'amber' },
];

const mockDeals = [
  { id: 'deal-1', client: 'Titanium Global', value: 4500000, stage: 'PROPOSAL', rep: 'Alex Patel', score: 94 },
  { id: 'deal-2', client: 'Apex Financial', value: 2100000, stage: 'QUALIFIED', rep: 'Sarah Jenkins', score: 88 },
  { id: 'deal-3', client: 'Vortex Cloud', value: 6800000, stage: 'NEGOTIATION', rep: 'Michael Chang', score: 96 },
  { id: 'deal-4', client: 'Echo Logistics', value: 1500000, stage: 'WON', rep: 'Alex Patel', score: 91 },
];

export const SalesManagerDashboard: React.FC = () => {
  const [deals, setDeals] = useState(mockDeals);

  const advanceStage = (id: string, currentStage: string) => {
    const nextStage = currentStage === 'QUALIFIED' ? 'PROPOSAL' : currentStage === 'PROPOSAL' ? 'NEGOTIATION' : 'WON';
    setDeals(prev => prev.map(d => d.id === id ? { ...d, stage: nextStage } : d));
  };

  return (
    <DepartmentView
      title="Sales & CRM Command Hub"
      subtitle="Kanban CRM Pipeline, Lead Scoring, Revenue Targets & Commission Tracker"
      stats={initialStats}
      onRefresh={() => alert('Refreshing Salesforce CRM pipeline...')}
      quickActions={[
        { label: 'Add New Deal', icon: <DollarSign className="w-4 h-4" />, action: 'add_deal', variant: 'primary' },
        { label: 'Disburse Commissions', icon: <Award className="w-4 h-4" />, action: 'commissions', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'add_deal') alert('Opening Add CRM Deal Modal...');
        if (action === 'commissions') alert('Processing sales representative commission payouts ($1.2M)...');
      }}
    >
      {/* Kanban CRM Pipeline View */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">CRM Deal Pipeline</h3>
          <p className="text-slate-400 text-xs mt-1">Real-time tracking of enterprise deals across qualification, proposal, and closing stages</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON'].map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage);
            const totalVal = stageDeals.reduce((sum, d) => sum + d.value, 0);
            return (
              <div key={stage} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[400px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">{stage}</h5>
                    <span className="text-[10px] text-emerald-400 font-bold">${(totalVal / 1000000).toFixed(1)}M</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 border border-slate-700">
                    {stageDeals.length}
                  </span>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                  {stageDeals.map(deal => (
                    <div key={deal.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-blue-500/40 transition-all group flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-extrabold">
                            Score: {deal.score}
                          </span>
                          <span className="text-xs font-bold text-emerald-400">${(deal.value / 1000000).toFixed(1)}M</span>
                        </div>
                        <h6 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{deal.client}</h6>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Rep: {deal.rep}</span>
                      </div>

                      <div className="flex items-center justify-end border-t border-slate-800/80 pt-2 mt-1">
                        {stage !== 'WON' && (
                          <button 
                            onClick={() => advanceStage(deal.id, deal.stage)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-md"
                          >
                            <span>Advance</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="flex items-center justify-center h-32 border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs">
                      No deals
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DepartmentView>
  );
};
