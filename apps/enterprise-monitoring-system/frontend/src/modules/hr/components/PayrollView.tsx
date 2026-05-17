import React, { useState, useEffect } from 'react';
import { IndianRupee, FileText, CheckCircle, AlertCircle, Plus, Search, DollarSign, Download } from 'lucide-react';
import { smartHRApi } from '../api';
import type { PayrollRecord } from '../types';

export function PayrollView() {
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
  const [empId, setEmpId] = useState('EMP-001');
  const [month, setMonth] = useState('2026-05');
  const [reimbursements, setReimbursements] = useState<number>(12500);

  useEffect(() => {
    smartHRApi.getPayrolls().then(setPayrolls);
  }, []);

  const handleProcessPayroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empId || !month) return;
    smartHRApi.processPayroll(empId, month, reimbursements).then(res => {
      setPayrolls([res, ...payrolls]);
      alert(`Payroll Processed Successfully! Net Salary: ₹${res.netSalary.toLocaleString()} (TXN ID: ${res.bankTransactionId})`);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <IndianRupee className="text-luxury-blue" />
            Payroll, Taxation & Reimbursements
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Automated salary calculation, PF/ESI/TDS tax deductions, expense reimbursements, and bank disbursement tracking.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Processed Payroll History</h3>
            <span className="text-xs font-bold text-luxury-blue">{payrolls.length} Records</span>
          </div>

          <div className="space-y-4">
            {payrolls.map((pay, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{pay.employeeName} ({pay.employeeId})</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Month: <span className="text-luxury-blue font-bold">{pay.month}</span> • Dept: {pay.department}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${pay.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20'}`}>{pay.status}</span>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition"><Download size={14} /> Payslip</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Basic + HRA</p>
                    <p className="text-sm font-black text-white mt-1">₹{(pay.basicSalary + pay.hra).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase text-amber-400 font-bold tracking-wider">Allowances + Reimb.</p>
                    <p className="text-sm font-black text-white mt-1">₹{(pay.specialAllowance + pay.bonus + pay.expenseReimbursements).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase text-rose-400 font-bold tracking-wider">Deductions (PF+ESI+TDS)</p>
                    <p className="text-sm font-black text-white mt-1">₹{(pay.pf + pay.esi + pay.tds).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-luxury-blue/10 border border-luxury-blue/20">
                    <p className="text-[10px] uppercase text-luxury-blue font-black tracking-widest">Net Salary</p>
                    <p className="text-base font-black text-luxury-blue mt-1">₹{pay.netSalary.toLocaleString()}</p>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic">Disbursement Hash: <span className="text-white font-mono">{pay.bankTransactionId}</span></p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
              <IndianRupee size={16} className="text-luxury-blue" /> Process New Payroll
            </h3>
            <form onSubmit={handleProcessPayroll} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Employee ID</label>
                <input type="text" value={empId} onChange={e => setEmpId(e.target.value)} placeholder="e.g. EMP-001" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Payroll Month</label>
                <input type="text" value={month} onChange={e => setMonth(e.target.value)} placeholder="e.g. 2026-05" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Expense Reimbursements (₹)</label>
                <input type="number" value={reimbursements} onChange={e => setReimbursements(Number(e.target.value))} placeholder="e.g. 12500" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <button type="submit" className="w-full h-12 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 mt-4">Calculate & Disburse Salary</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
