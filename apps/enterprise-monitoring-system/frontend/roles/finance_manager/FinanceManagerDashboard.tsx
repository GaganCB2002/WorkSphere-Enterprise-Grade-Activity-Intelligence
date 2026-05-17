import React from 'react';
import { DepartmentView } from '../../dashboards/DepartmentView';
import { StatCardData } from '../../models/types';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  LineChart, Line
} from 'recharts';
import { DollarSign, FileText, CheckCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const initialStats: StatCardData[] = [
  { title: 'Monthly Net Revenue', value: '$12.8M', trend: '+14.2% MoM', trendType: 'up', icon: '💰', color: 'emerald' },
  { title: 'Operating Expenses', value: '$4.2M', trend: 'Within budget', trendType: 'neutral', icon: '📉', color: 'blue' },
  { title: 'Net Profit Margin', value: '67.2%', trend: '+2.4% QoQ', trendType: 'up', icon: '📈', color: 'purple' },
  { title: 'Pending Invoices', value: '$420K', trend: '14 Overdue', trendType: 'down', icon: '⏳', color: 'amber' },
];

const mockCashFlowData = [
  { month: 'Jan', inflow: 10.5, outflow: 3.2 },
  { month: 'Feb', inflow: 11.2, outflow: 3.4 },
  { month: 'Mar', inflow: 11.8, outflow: 3.6 },
  { month: 'Apr', inflow: 12.4, outflow: 3.9 },
  { month: 'May', inflow: 12.8, outflow: 4.2 },
];

const mockInvoices = [
  { id: 'INV-2026-001', client: 'Acme Corp', amount: 125000, dueDate: '2026-05-20', status: 'PAID' },
  { id: 'INV-2026-002', client: 'Global Dynamics', amount: 85000, dueDate: '2026-05-18', status: 'PENDING' },
  { id: 'INV-2026-003', client: 'Cyberdyne Systems', amount: 210000, dueDate: '2026-05-15', status: 'OVERDUE' },
];

export const FinanceManagerDashboard: React.FC = () => {
  return (
    <DepartmentView
      title="Finance & Corporate Treasury"
      subtitle="Income vs Expense, Cash Flow & Automated Invoice Management"
      stats={initialStats}
      onRefresh={() => alert('Refreshing financial ledgers...')}
      quickActions={[
        { label: 'Generate Invoice', icon: <FileText className="w-4 h-4" />, action: 'invoice', variant: 'primary' },
        { label: 'Disburse Vendor Payments', icon: <DollarSign className="w-4 h-4" />, action: 'pay_vendors', variant: 'secondary' }
      ]}
      onQuickAction={(action) => {
        if (action === 'invoice') alert('Opening Automated Invoice Generator...');
        if (action === 'pay_vendors') alert('Processing batch vendor disbursements ($4.2M)...');
      }}
    >
      {/* Cash Flow Line Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Cash Flow Dynamics ($ Millions)</h3>
            <p className="text-slate-400 text-xs mt-1">Comparing monthly cash inflows against operational outflows</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-300">Cash Inflow</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-300">Cash Outflow</span>
            </div>
          </div>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockCashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="inflow" name="Cash Inflow" stroke="#10b981" strokeWidth={3} />
              <Line type="monotone" dataKey="outflow" name="Cash Outflow" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Corporate Invoices & Receivables</h3>
          <p className="text-slate-400 text-xs mt-1">Track incoming client wire transfers and overdue accounts</p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Client Name</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Due Date</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {mockInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{inv.id}</td>
                  <td className="p-4 text-slate-300 text-xs font-medium">{inv.client}</td>
                  <td className="p-4 text-right font-bold text-emerald-400 text-xs">${inv.amount.toLocaleString()}</td>
                  <td className="p-4 text-center text-xs text-slate-400 font-medium">{inv.dueDate}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      inv.status === 'PENDING' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {inv.status}
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
