import React, { useState } from 'react';
import { Cpu, MessageSquare, TrendingUp, AlertTriangle, CheckCircle, Send, Sparkles, Bot, ArrowRight } from 'lucide-react';

export function AIFeaturesView() {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'prediction' | 'anomaly' | 'tasks'>('chatbot');
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello! I am AuraHR AI, your enterprise assistant. Ask me anything about leave policies, payroll deductions, or team performance predictions.', time: 'Just now' }
  ]);
  const [input, setInput] = useState('');

  const handleSendAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'User', text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');

    setTimeout(() => {
      let aiReply = "I have analyzed your query against WorkSphere HR policies. Based on current enterprise guidelines, your request is fully compliant and has been logged for execution.";
      if (userMsg.text.toLowerCase().includes('leave')) aiReply = "Your annual leave balance is currently 14 days. Applying for 3 days will leave you with 11 days. AI auto-approval is active for this duration.";
      if (userMsg.text.toLowerCase().includes('payroll')) aiReply = "Your last payslip for April 2026 was disbursed successfully with a net salary of ₹1,457,812.50. All TDS and PF deductions are fully accounted for.";
      
      setMessages([...newMsgs, { sender: 'AI', text: aiReply, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Cpu className="text-luxury-blue" />
            AI Features & Automation Suite
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Chatbot assistant, ML performance prediction, anomaly compliance detection, and auto task delegation.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setActiveTab('chatbot')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'chatbot' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>AI Chatbot</button>
          <button onClick={() => setActiveTab('prediction')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'prediction' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Performance AI</button>
          <button onClick={() => setActiveTab('anomaly')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'anomaly' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Anomaly Detection</button>
          <button onClick={() => setActiveTab('tasks')} className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${activeTab === 'tasks' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Auto Task Assign</button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'chatbot' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 max-w-3xl mx-auto bg-white/5 backdrop-blur-md flex flex-col h-[550px]">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 shrink-0">
            <div className="h-12 w-12 rounded-2xl bg-luxury-blue/20 text-luxury-blue flex items-center justify-center font-black text-xl shadow-lg shadow-luxury-blue/10">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">AuraHR Enterprise AI Copilot</h3>
              <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><Sparkles size={12} /> Powered by WorkSphere LLM • Instant Policy Resolution</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar my-4 space-y-4 pr-2">
            {messages.map((m, idx) => {
              const isAI = m.sender === 'AI';
              return (
                <div key={idx} className={`flex flex-col max-w-lg ${isAI ? 'mr-auto items-start' : 'ml-auto items-end'}`}>
                  <div className={`p-4 rounded-3xl text-xs space-y-2 shadow-lg ${isAI ? 'bg-white/10 text-slate-100 dark:text-white rounded-bl-none border border-white/5' : 'bg-luxury-blue text-white rounded-br-none shadow-luxury-blue/20'}`}>
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 px-1">{m.sender} • {m.time}</span>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendAI} className="flex items-center gap-3 border-t border-white/5 pt-4 shrink-0">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask AuraHR AI (e.g. What is my leave balance?)..." className="flex-1 h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-xs text-white outline-none focus:border-luxury-blue" />
            <button type="submit" className="h-12 px-6 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 flex items-center gap-2 shrink-0 text-xs">
              <Send size={16} /> Ask AI
            </button>
          </form>
        </div>
      )}

      {activeTab === 'prediction' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-luxury-blue" /> Machine Learning Performance & Flight Risk Prediction
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emp: 'Rohan Desai', role: 'Software Engineer', risk: '18.5% (Moderate)', reason: 'Salary below market median for 3 years experience; high recent overtime.', action: 'Recommend 15% compensation adjustment in upcoming appraisal cycle.' },
              { emp: 'Priya Sharma', role: 'HR Manager', risk: '2.1% (Very Low)', reason: 'High engagement score (98%); recently received peer recognition badge.', action: 'Maintain current quarterly check-in cadence.' },
              { emp: 'Arjun Mehta', role: 'Senior Tech Lead', risk: '4.2% (Low)', reason: 'Key architectural contributor; recently enrolled in advanced CKA certification.', action: 'Explore Principal Architect career track mapping.' }
            ].map((pred, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{pred.emp}</h4>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${pred.risk.includes('Moderate') ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>{pred.risk} Risk</span>
                  </div>
                  <p className="text-xs text-luxury-blue font-semibold mt-1">{pred.role}</p>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed"><span className="text-slate-400 font-semibold block mb-1">AI Root Cause Analysis:</span> {pred.reason}</p>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <p className="text-xs text-emerald-400 font-bold flex items-center gap-1"><CheckCircle size={14} /> AI Prescriptive Action:</p>
                  <p className="text-xs text-slate-300 mt-1 italic">{pred.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'anomaly' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-400" /> AI Compliance & Anomaly Detection Matrix
          </h3>
          <div className="space-y-4">
            {[
              { type: 'Unusual Working Hours Detected', emp: 'Rohan Desai', details: 'Employee logged in at 03:00 AM IST outside configured shift parameters.', confidence: '94% Confidence', severity: 'Medium', status: 'Auto-Logged for HR Review' },
              { type: 'Simultaneous Geolocation Mismatch', emp: 'Guest Vendor', details: 'IP triangulation indicates Bangalore while GPS hardware token reports Davangere.', confidence: '99% Confidence', severity: 'High', status: 'Access Temporarily Suspended' }
            ].map((ano, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{ano.type}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${ano.severity === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>{ano.severity} Severity</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Target: <span className="text-white font-medium">{ano.emp}</span> • {ano.details}</p>
                  <p className="text-[10px] text-luxury-blue font-mono mt-2">{ano.confidence}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-white border border-white/10">{ano.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white border-b border-white/5 pb-4 flex items-center gap-2">
            <Cpu size={16} className="text-luxury-blue" /> Autonomous AI Task Delegation Engine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { task: 'Urgent Security Patch Deployment', skillReq: 'Kubernetes, Microservices', assignedTo: 'Arjun Mehta', reason: 'Arjun has 100% skill match and highest active sprint velocity in the engineering division.' },
              { task: 'Q2 Compliance Docket Compilation', skillReq: 'Talent Acquisition, Employee Relations', assignedTo: 'Priya Sharma', reason: 'Priya is the designated HR Lead for Davangere/Bangalore compliance audits.' }
            ].map((tsk, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border-white/5 hover:border-luxury-blue/30 transition space-y-4 bg-white/5 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{tsk.task}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Required Skills: {tsk.skillReq}</p>
                  <div className="mt-4 p-4 rounded-2xl bg-luxury-blue/10 border border-luxury-blue/20 space-y-2">
                    <p className="text-xs font-bold text-luxury-blue flex items-center gap-1"><Sparkles size={14} /> AI Auto-Assigned To: {tsk.assignedTo}</p>
                    <p className="text-[10px] text-slate-300 leading-relaxed">{tsk.reason}</p>
                  </div>
                </div>
                <button className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center justify-center gap-1 mt-2"><CheckCircle size={14} /> Approve AI Delegation</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
