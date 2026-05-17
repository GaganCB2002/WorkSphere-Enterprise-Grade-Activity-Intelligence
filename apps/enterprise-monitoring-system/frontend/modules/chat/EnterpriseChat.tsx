import React, { useState } from 'react';
import { 
  MessageSquare, Send, Hash, User, Paperclip, Smile, Search, Phone, Video, 
  MoreVertical, Check, CheckCheck, Circle, Bot, Shield, Plus
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isBot?: boolean;
  isMe?: boolean;
}

export const EnterpriseChat: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('#general');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '#general': [
      { id: '1', sender: 'System Guardian', avatar: '🤖', content: 'Welcome to the WorkSphere Enterprise Global Chat. All communications are E2E encrypted and logged for compliance.', timestamp: '09:00 AM', isBot: true },
      { id: '2', sender: 'Sarah Jenkins (CTO)', avatar: '👩‍💻', content: 'Team, please ensure all telemetry nodes are active before the executive review at 2 PM.', timestamp: '09:15 AM' },
      { id: '3', sender: 'Marcus Vance (SecOps)', avatar: '🛡️', content: 'Firewall rules updated. We rectified 3 kernel-level anomalies this morning.', timestamp: '09:30 AM' },
      { id: '4', sender: 'Gagan CB (Super Admin)', avatar: '👑', content: 'Excellent work Marcus. Sarah, the Next.js analytics portal is fully synchronized.', timestamp: '09:45 AM', isMe: true }
    ],
    '#engineering': [
      { id: '1', sender: 'System Guardian', avatar: '🤖', content: 'Channel #engineering created by Sarah Jenkins.', timestamp: 'Yesterday', isBot: true },
      { id: '2', sender: 'Alex River (DevOps)', avatar: '🐳', content: 'Kubernetes cluster upgraded to v1.30. Zero downtime observed.', timestamp: '08:20 AM' }
    ],
    '#executive-lounge': [
      { id: '1', sender: 'System Guardian', avatar: '🤖', content: 'Restricted Channel: E2E Biometric Clearance Required.', timestamp: 'Yesterday', isBot: true },
      { id: '2', sender: 'David Vance (CEO)', avatar: '👔', content: 'Quarterly ARR targets achieved. Let us prepare the board presentation.', timestamp: '08:00 AM' }
    ],
    '#alerts-squad': [
      { id: '1', sender: 'System Guardian', avatar: '🤖', content: 'AUTOMATED ALERT: High memory pressure detected on Node #4.', timestamp: '10:00 AM', isBot: true }
    ]
  });

  const channels = ['#general', '#engineering', '#executive-lounge', '#alerts-squad'];
  const directMessages = [
    { name: 'Sarah Jenkins', role: 'CTO', status: 'online', avatar: '👩‍💻' },
    { name: 'Marcus Vance', role: 'SecOps', status: 'online', avatar: '🛡️' },
    { name: 'David Vance', role: 'CEO', status: 'offline', avatar: '👔' },
    { name: 'Alex River', role: 'DevOps', status: 'away', avatar: '🐳' }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Gagan CB (Super Admin)',
      avatar: '👑',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMessage]
    }));
    setInputMessage('');
  };

  return (
    <div className="h-[750px] bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-slate-800 bg-slate-950/40 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <MessageSquare size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Enterprise Secure Messaging
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">E2E Encrypted</span>
            </h2>
            <p className="text-xs text-slate-400">WorkSphere Unified Communications Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search messages, files, links..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          <button className="p-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white transition-colors">
            <Phone size={18} />
          </button>
          <button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:text-blue-300 transition-colors">
            <Video size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Channels & DMs */}
        <div className="w-64 border-r border-slate-800 bg-slate-950/20 flex flex-col p-4 gap-6 overflow-y-auto">
          {/* Channels Section */}
          <div>
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Channels</span>
              <button className="p-1 hover:bg-slate-800/60 rounded-lg text-slate-400 hover:text-white transition-colors">
                <Plus size={14} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {channels.map(channel => (
                <button
                  key={channel}
                  onClick={() => setActiveChannel(channel)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeChannel === channel 
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/5' 
                      : 'text-slate-300 hover:bg-slate-800/40 hover:text-white border border-transparent'
                  }`}
                >
                  <Hash size={16} className={activeChannel === channel ? 'text-blue-400' : 'text-slate-500'} />
                  {channel.replace('#', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages Section */}
          <div>
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Messages</span>
              <button className="p-1 hover:bg-slate-800/60 rounded-lg text-slate-400 hover:text-white transition-colors">
                <Plus size={14} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {directMessages.map(dm => (
                <button
                  key={dm.name}
                  onClick={() => setActiveChannel(dm.name)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeChannel === dm.name 
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/5' 
                      : 'text-slate-300 hover:bg-slate-800/40 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="relative flex items-center justify-center w-7 h-7 bg-slate-800 border border-slate-700 rounded-lg text-base">
                    {dm.avatar}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                      dm.status === 'online' ? 'bg-emerald-500' : dm.status === 'away' ? 'bg-amber-500' : 'bg-slate-500'
                    }`} />
                  </div>
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-xs font-bold truncate">{dm.name}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{dm.role}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-950/40 overflow-hidden">
          {/* Active Channel Header */}
          <div className="h-14 border-b border-slate-800/60 px-6 flex items-center justify-between bg-slate-900/20">
            <div className="flex items-center gap-2">
              <Hash size={18} className="text-blue-400" />
              <h3 className="text-sm font-bold text-white">{activeChannel.replace('#', '')}</h3>
              <span className="text-xs text-slate-500 font-semibold px-2 py-0.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                {activeChannel.startsWith('#') ? 'Company Channel' : 'Direct Message'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <button className="p-1.5 hover:bg-slate-800 rounded-lg hover:text-white transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            {(messages[activeChannel] || []).map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 max-w-2xl ${msg.isMe ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shadow-lg flex-shrink-0">
                  {msg.avatar}
                </div>
                <div className={`flex flex-col gap-1 ${msg.isMe ? 'items-end' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{msg.sender}</span>
                    <span className="text-[10px] font-semibold text-slate-500">{msg.timestamp}</span>
                  </div>
                  <div className={`px-4 py-3 rounded-2xl text-xs font-medium leading-relaxed shadow-xl ${
                    msg.isMe 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/10 border border-blue-500/30' 
                      : msg.isBot
                      ? 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700/50 shadow-slate-950/20'
                      : 'bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800 shadow-slate-950/20'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Bar */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-inner focus-within:border-blue-500/50 transition-colors">
              <button type="button" className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                <Paperclip size={18} />
              </button>
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${activeChannel}...`}
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none px-2"
              />
              <button type="button" className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                <Smile size={18} />
              </button>
              <button 
                type="submit"
                className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
