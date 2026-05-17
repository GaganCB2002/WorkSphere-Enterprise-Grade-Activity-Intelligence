import React, { useState } from 'react';
import { 
  Mail, Inbox, Send, FileText, Archive, AlertOctagon, Star, Trash2, 
  Search, Plus, Paperclip, Reply, Forward, MoreVertical, Check, Filter, Tag
} from 'lucide-react';

interface Email {
  id: string;
  sender: string;
  email: string;
  avatar: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  isStarred: boolean;
  isUnread: boolean;
  category: 'work' | 'alert' | 'compliance';
}

export const EnterpriseWebmail: React.FC = () => {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string>('1');
  const [isComposing, setIsComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      sender: 'Sarah Jenkins (CTO)',
      email: 'sjenkins@worksphere.com',
      avatar: '👩‍💻',
      subject: 'URGENT: Executive Review & Q3 Telemetry Health',
      preview: 'Team, please review the attached Q3 workstation telemetry charts prior to our 2 PM board meeting...',
      body: `Team,

Please review the attached Q3 workstation telemetry charts prior to our 2 PM board meeting. We have observed a 14% increase in engineering velocity across all squads utilizing the new WorkSphere WinRT kernel tracking agents.

Furthermore, ensure all compliance logs are exported to PDF via the Next.js portal before the external auditor arrives.

Best regards,
Sarah Jenkins
Chief Technology Officer`,
      timestamp: '10:30 AM',
      isStarred: true,
      isUnread: true,
      category: 'work'
    },
    {
      id: '2',
      sender: 'System Guardian',
      email: 'guardian@worksphere.com',
      avatar: '🤖',
      subject: 'SECURITY NOTICE: 3 Malware Signatures Quarantined',
      preview: 'Automated Security Notification: The WorkSphere background daemon has successfully isolated and rectified 3 Trojan signatures...',
      body: `Automated Security Notification:

The WorkSphere background daemon has successfully isolated and rectified 3 Trojan signatures attempting to modify kernel memory space on Node #12.

Action Taken: AUTOMATIC RECTIFICATION (QUARANTINED)
Status: Fully Resolved
Severity: HIGH

No further action is required from the administrator.`,
      timestamp: '08:15 AM',
      isStarred: false,
      isUnread: false,
      category: 'alert'
    },
    {
      id: '3',
      sender: 'External Auditor',
      email: 'compliance@sec-audit.org',
      avatar: '🛡️',
      subject: 'WorkSphere ISO 27001 Clearance Verification',
      preview: 'We have received your biometric facial capture logs and E2E ECIES encryption certificates for the Davangere regional nodes...',
      body: `Dear WorkSphere Administrator,

We have received your biometric facial capture logs and E2E ECIES encryption certificates for the Davangere regional nodes. The audit verification is complete and your enterprise clearance has been upgraded to Tier-1.

Certificate ID: ISO-27001-2026-WS
Valid Thru: Dec 2027

Sincerely,
Global Compliance Team`,
      timestamp: 'Yesterday',
      isStarred: true,
      isUnread: false,
      category: 'compliance'
    }
  ]);

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: <Inbox size={18} />, count: emails.filter(e => e.isUnread).length },
    { id: 'sent', label: 'Sent Items', icon: <Send size={18} /> },
    { id: 'drafts', label: 'Drafts', icon: <FileText size={18} />, count: 1 },
    { id: 'archive', label: 'Archive', icon: <Archive size={18} /> },
    { id: 'spam', label: 'Junk Email', icon: <AlertOctagon size={18} /> }
  ];

  const selectedEmail = emails.find(e => e.id === selectedEmailId) || emails[0];

  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(prev => prev.map(em => em.id === id ? { ...em, isStarred: !em.isStarred } : em));
  };

  return (
    <div className="h-[750px] bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans relative">
      {/* Top Bar */}
      <div className="h-16 border-b border-slate-800 bg-slate-950/40 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Mail size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Enterprise Secure Webmail
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">Microsoft Exchange E2E</span>
            </h2>
            <p className="text-xs text-slate-400">gagan@worksphere.com &bull; Tier-1 High Security Clearance</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search mailbox, subject, sender..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
          <button 
            onClick={() => setIsComposing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
          >
            <Plus size={16} /> New Message
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Folders Sidebar */}
        <div className="w-64 border-r border-slate-800 bg-slate-950/20 flex flex-col p-4 gap-6 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeFolder === folder.id 
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/5' 
                    : 'text-slate-300 hover:bg-slate-800/40 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={activeFolder === folder.id ? 'text-emerald-400' : 'text-slate-500'}>{folder.icon}</span>
                  {folder.label}
                </div>
                {folder.count && folder.count > 0 && (
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Categories / Tags */}
          <div>
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</span>
            </div>
            <div className="flex flex-col gap-2 px-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium cursor-pointer hover:text-white">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Work Projects
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium cursor-pointer hover:text-white">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Automated Alerts
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium cursor-pointer hover:text-white">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Compliance & Audits
              </div>
            </div>
          </div>
        </div>

        {/* Middle Emails List */}
        <div className="w-80 border-r border-slate-800 bg-slate-950/40 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/20">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{activeFolder}</span>
            <button className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Filter size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-slate-800/50">
            {emails.map((em) => (
              <div 
                key={em.id}
                onClick={() => { setSelectedEmailId(em.id); em.isUnread = false; }}
                className={`p-4 flex flex-col gap-2 cursor-pointer transition-all duration-200 ${
                  selectedEmailId === em.id 
                    ? 'bg-emerald-500/10 border-l-4 border-emerald-500 text-white' 
                    : em.isUnread 
                    ? 'bg-slate-900/40 hover:bg-slate-800/40 text-white' 
                    : 'bg-transparent hover:bg-slate-800/30 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs flex-shrink-0">
                      {em.avatar}
                    </div>
                    <span className={`text-xs truncate ${em.isUnread ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>{em.sender}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={(e) => handleToggleStar(em.id, e)} className="text-slate-500 hover:text-amber-400 transition-colors">
                      <Star size={14} className={em.isStarred ? 'fill-amber-400 text-amber-400' : ''} />
                    </button>
                    <span className="text-[10px] text-slate-500 font-semibold">{em.timestamp}</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-white truncate">{em.subject}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{em.preview}</div>

                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                    em.category === 'work' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    em.category === 'alert' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                    'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {em.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Email Reading Pane */}
        <div className="flex-1 bg-slate-950/60 overflow-y-auto flex flex-col">
          {selectedEmail ? (
            <div className="flex-1 p-8 flex flex-col gap-6 max-w-4xl margin-auto w-full self-center">
              {/* Email Action Toolbar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-lg">
                    {selectedEmail.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedEmail.sender}</h3>
                    <p className="text-xs text-slate-400">{selectedEmail.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-white shadow-lg transition-colors">
                    <Reply size={16} /> Reply
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-white shadow-lg transition-colors">
                    <Forward size={16} /> Forward
                  </button>
                  <button className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white shadow-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                  <button className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white shadow-lg transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Email Subject & Meta */}
              <div>
                <h1 className="text-2xl font-extrabold text-white mb-2">{selectedEmail.subject}</h1>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Received: {selectedEmail.timestamp}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Check size={14} /> Microsoft Exchange Verified E2E
                  </span>
                </div>
              </div>

              {/* Email Body Content */}
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs text-slate-200 leading-relaxed whitespace-pre-wrap shadow-inner font-sans">
                {selectedEmail.body}
              </div>

              {/* Attachments Section */}
              {selectedEmail.id === '1' && (
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                      <Paperclip size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Q3_Workstation_Telemetry_Report.pdf</div>
                      <div className="text-[10px] text-slate-400">4.2 MB &bull; Evidence Grade PDF</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-colors">
                    Download File
                  </button>
                </div>
              )}

              {/* Quick Reply Box */}
              <div className="mt-auto pt-6 border-t border-slate-800">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 shadow-inner focus-within:border-emerald-500/50 transition-colors">
                  <textarea 
                    placeholder={`Reply to ${selectedEmail.sender}...`}
                    rows={3}
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                  />
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-2 text-slate-400">
                      <button className="p-1.5 hover:bg-slate-800 rounded-lg hover:text-white transition-colors">
                        <Paperclip size={16} />
                      </button>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                      <Send size={14} /> Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select an item to read
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {isComposing && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col animate-scaleUp">
            <div className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-950/40">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Mail size={18} className="text-emerald-400" /> New Secure Message
              </h3>
              <button onClick={() => setIsComposing(false)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                &times;
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-4 pb-3 border-b border-slate-800 text-xs">
                <span className="w-16 font-bold text-slate-400 uppercase">To:</span>
                <input type="text" placeholder="recipient@worksphere.com" className="flex-1 bg-transparent text-white focus:outline-none" />
              </div>
              <div className="flex items-center gap-4 pb-3 border-b border-slate-800 text-xs">
                <span className="w-16 font-bold text-slate-400 uppercase">Subject:</span>
                <input type="text" placeholder="Message Subject" className="flex-1 bg-transparent text-white focus:outline-none" />
              </div>
              <textarea placeholder="Write your secure message here..." rows={10} className="w-full flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none resize-none pt-2" />
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between px-6">
              <button type="button" className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                <Paperclip size={18} />
              </button>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsComposing(false)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors">
                  Discard
                </button>
                <button onClick={() => setIsComposing(false)} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                  <Send size={14} /> Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
