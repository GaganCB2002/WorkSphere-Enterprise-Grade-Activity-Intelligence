import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Shield, Key, CheckCircle, UserCheck, Lock } from 'lucide-react';

const rolesList = [
  { role: 'SUPER_ADMIN', name: 'Super Administrator', dept: 'Global Security', icon: Shield, desc: 'Master RBAC Permission Matrix & System Overrides', creds: { id: 'super_admin@worksphere.com', pass: 'Admin@123' } },
  { role: 'ADMIN', name: 'System Administrator', dept: 'System Admin', icon: Key, desc: 'User Management, Audit Logs & System Settings', creds: { id: 'admin@worksphere.com', pass: 'Admin@123' } },
  { role: 'CEO', name: 'Chief Executive Officer', dept: 'Executive', icon: CheckCircle, desc: 'Company Overview, Revenue Trends & OKRs (Tracking Disabled)', creds: { id: 'ceo@worksphere.com', pass: 'Admin@123' } },
  { role: 'CTO', name: 'Chief Technology Officer', dept: 'Engineering', icon: UserCheck, desc: 'Engineering Overview, Active Projects & Velocity', creds: { id: 'cto@worksphere.com', pass: 'Admin@123' } },
  { role: 'HR_MANAGER', name: 'HR Manager', dept: 'Human Resources', icon: Lock, desc: 'Attendance Heatmaps, Leave Distribution & ATS Recruitment', creds: { id: 'hr_manager@worksphere.com', pass: 'Admin@123' } },
  { role: 'HR_EXECUTIVE', name: 'HR Executive', dept: 'Human Resources', icon: Shield, desc: 'Onboarding Checklists & Document Verification', creds: { id: 'hr_executive@worksphere.com', pass: 'Admin@123' } },
  { role: 'FINANCE_MANAGER', name: 'Finance Manager', dept: 'Finance', icon: Key, desc: 'Cash Flow, P&L Statements & Budget Allocation', creds: { id: 'finance_manager@worksphere.com', pass: 'Admin@123' } },
  { role: 'MARKETING_MANAGER', name: 'Marketing Manager', dept: 'Marketing', icon: CheckCircle, desc: 'Campaign ROI, SEO Analytics & Lead Conversion Funnel', creds: { id: 'marketing_manager@worksphere.com', pass: 'Admin@123' } },
  { role: 'SALES_MANAGER', name: 'Sales Manager', dept: 'Sales', icon: UserCheck, desc: 'Kanban CRM Pipeline, Lead Scoring & Revenue Targets', creds: { id: 'sales_manager@worksphere.com', pass: 'Admin@123' } },
  { role: 'PROJECT_MANAGER', name: 'Project Manager', dept: 'Project Management', icon: Lock, desc: 'Sprint Burndown Charts, Gantt Charts & Task Assignment', creds: { id: 'project_manager@worksphere.com', pass: 'Admin@123' } },
  { role: 'TECH_LEAD', name: 'Tech Lead', dept: 'Engineering', icon: Shield, desc: 'Git Commit ActivityGraphs, Sprint Velocity & PR Reviews', creds: { id: 'tech_lead@worksphere.com', pass: 'Admin@123' } },
  { role: 'DEVOPS_ENGINEER', name: 'DevOps Engineer', dept: 'Infrastructure', icon: Key, desc: 'Server Health CPU/Memory Gauges & Docker Containers', creds: { id: 'devops_engineer@worksphere.com', pass: 'Admin@123' } },
  { role: 'QA_ENGINEER', name: 'QA Engineer', dept: 'Quality Assurance', icon: CheckCircle, desc: 'Bug Reports, Test Case Execution Matrix & Defect Density', creds: { id: 'qa_engineer@worksphere.com', pass: 'Admin@123' } },
  { role: 'SOFTWARE_ENGINEER', name: 'Software Engineer', dept: 'Engineering', icon: UserCheck, desc: 'Personal Activity Timeline, Task Checklist & Code Commit', creds: { id: 'software_engineer@worksphere.com', pass: 'Admin@123' } },
  { role: 'SECURITY_ANALYST', name: 'Security Analyst', dept: 'Security', icon: Lock, desc: 'Failed Login IP Geolocation Map & Threat Alert Center', creds: { id: 'security_analyst@worksphere.com', pass: 'Admin@123' } },
  { role: 'SUPPORT_AGENT', name: 'Support Agent', dept: 'Customer Support', icon: Shield, desc: 'Customer Ticket Queue, Resolution Analytics & Live Chat', creds: { id: 'support_agent@worksphere.com', pass: 'Admin@123' } },
  { role: 'EMPLOYEE', name: 'Standard Employee', dept: 'General', icon: Key, desc: 'Personal Activity Timeline, Attendance Check-In & Leave', creds: { id: 'employee@worksphere.com', pass: 'Admin@123' } },
  { role: 'INTERN', name: 'Intern', dept: 'General', icon: CheckCircle, desc: 'Simplified Profile View, Assigned Learning Tasks & Feedback', creds: { id: 'intern@worksphere.com', pass: 'Admin@123' } },
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [loginUserId, setLoginUserId] = useState(rolesList[0].creds.id);
  const [loginPassword, setLoginPassword] = useState(rolesList[0].creds.pass);

  const handleRoleSelect = (index) => {
    setSelectedRoleIndex(index);
    setLoginUserId(rolesList[index].creds.id);
    setLoginPassword(rolesList[index].creds.pass);
  };

  const handleVerifyAndEnter = (e) => {
    e.preventDefault();
    const activeRole = rolesList[selectedRoleIndex];
    dispatch({ 
      type: 'LOGIN_SUCCESS', 
      payload: { 
        id: loginUserId, 
        name: activeRole.name, 
        role: activeRole.role, 
        department: activeRole.dept 
      } 
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <div className="w-full max-w-7xl mb-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-4">
          <Shield className="w-4 h-4" /> WorkSphere Global Security Protocol &bull; v2026.4
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Enterprise Command Portal Access
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl text-sm lg:text-base">
          Select an enterprise role below to auto-populate testing credentials and access dedicated departmental command centers.
        </p>
      </div>

      {/* Main Grid Container */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 18 Role Cards Grid */}
        <div className="lg:col-span-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">1. Select Enterprise Role Profile</h2>
              <p className="text-xs text-slate-400">Instantly configures session telemetry and RBAC permissions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {rolesList.map((roleObj, idx) => {
              const IconComp = roleObj.icon;
              const isSelected = idx === selectedRoleIndex;
              return (
                <div
                  key={roleObj.role}
                  onClick={() => handleRoleSelect(idx)}
                  className={`relative flex flex-col p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-500/20 translate-y-[-2px]' 
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-blue-400'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 tracking-wider">
                      {roleObj.dept}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white mb-1">{roleObj.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 flex-grow">{roleObj.desc}</p>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 font-mono flex flex-col gap-0.5 bg-slate-950/40 p-2 rounded-xl">
                    <div className="text-slate-400 font-semibold truncate">ID: {roleObj.creds.id}</div>
                    <div className="text-blue-400 font-semibold">Pass: {roleObj.creds.pass}</div>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Secure Authentication Form */}
        <div className="lg:col-span-4 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between sticky top-6">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">2. Secure Authentication</h2>
                <p className="text-xs text-slate-400">Verify credentials & enter command center</p>
              </div>
            </div>

            <form onSubmit={handleVerifyAndEnter} className="space-y-5">
              <div>
                <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                  Enterprise User ID / Email
                </label>
                <input
                  type="text"
                  value={loginUserId}
                  onChange={(e) => setLoginUserId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-mono focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="user@worksphere.com"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                  Security Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-mono focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-blue-400">
                  <CheckCircle className="w-4 h-4" /> Selected Profile Active
                </div>
                <div>Role: <span className="font-bold text-white">{rolesList[selectedRoleIndex].name}</span></div>
                <div>Department: <span className="font-bold text-white">{rolesList[selectedRoleIndex].dept}</span></div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold tracking-wide shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 uppercase text-sm"
              >
                <UserCheck className="w-5 h-5" /> VERIFY & ENTER WORKSPACE
              </button>
            </form>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> RBAC Active
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" /> Biometric Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
