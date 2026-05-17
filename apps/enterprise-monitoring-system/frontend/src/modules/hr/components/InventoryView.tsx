import React, { useState, useEffect } from 'react';
import { Package, UserCheck, CheckCircle, Plus, Search, ExternalLink, IndianRupee } from 'lucide-react';
import { smartHRApi } from '../api';
import type { InventoryAsset } from '../types';

export function InventoryView() {
  const [assets, setAssets] = useState<InventoryAsset[]>([]);
  const [assetTag, setAssetTag] = useState('AST-LPT-101');
  const [empId, setEmpId] = useState('EMP-003');
  const [empName, setEmpName] = useState('Rohan Desai');

  useEffect(() => {
    smartHRApi.getAssets().then(setAssets);
  }, []);

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetTag || !empId) return;
    smartHRApi.allocateAsset(assetTag, empId, empName).then(res => {
      smartHRApi.getAssets().then(setAssets);
      alert(`Asset ${res.assetTag} (${res.name}) successfully allocated to ${res.assignedToEmployeeName}!`);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Package className="text-luxury-blue" />
            Inventory & IT Asset Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Lifecycle asset tracking, automated allocation matrices, and hardware depreciation auditing.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Enterprise Asset Registry</h3>
            <span className="text-xs font-bold text-luxury-blue">{assets.length} Hardware Units</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.map((ast, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-luxury-blue/10 text-luxury-blue border border-luxury-blue/20">{ast.category}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${ast.status === 'Assigned' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>{ast.status}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{ast.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">Tag: <span className="text-white font-bold">{ast.assetTag}</span></p>
                  <p className="text-xs text-emerald-400 font-bold flex items-center gap-1"><IndianRupee size={14} /> Value: ₹{ast.value.toLocaleString()}</p>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1"><UserCheck size={14} className="text-luxury-blue" /> Assigned:</span>
                  <span className="text-white font-bold">{ast.assignedToEmployeeName || 'Unassigned'} ({ast.assignedToEmployeeId || 'N/A'})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
              <Package size={16} className="text-luxury-blue" /> Allocate Hardware Asset
            </h3>
            <form onSubmit={handleAllocate} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Asset Tag</label>
                <input type="text" value={assetTag} onChange={e => setAssetTag(e.target.value)} placeholder="e.g. AST-LPT-101" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Employee ID</label>
                <input type="text" value={empId} onChange={e => setEmpId(e.target.value)} placeholder="e.g. EMP-003" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Employee Name</label>
                <input type="text" value={empName} onChange={e => setEmpName(e.target.value)} placeholder="e.g. Rohan Desai" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white outline-none focus:border-luxury-blue" required />
              </div>
              <button type="submit" className="w-full h-12 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 mt-4">Assign Asset to Employee</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
