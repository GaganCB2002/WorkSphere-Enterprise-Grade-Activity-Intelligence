import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Paperclip, MapPin, Users, Bell, CheckCircle, Search, User } from 'lucide-react';
import { smartHRApi } from '../api';
import type { ChatMessage } from '../types';

export function CommunicationView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [activeChat, setActiveChat] = useState<'EMP-001' | 'group'>('EMP-001');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    smartHRApi.getChatHistory('EMP-002', activeChat === 'group' ? 'group' : 'EMP-001').then(setMessages);
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = {
      senderId: 'EMP-002',
      senderName: 'Priya Sharma (HR)',
      receiverId: activeChat === 'group' ? undefined : 'EMP-001',
      groupId: activeChat === 'group' ? 'DEV-GROUP-1' : undefined,
      content: input,
      attachedLocation: input.toLowerCase().includes('location') ? '14.4644,75.9218' : undefined
    };

    smartHRApi.sendChatMessage(newMsg).then(res => {
      setMessages([...messages, res]);
      setInput('');
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <MessageSquare className="text-luxury-blue" />
            Integrated Enterprise Chat & Notifications
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">WhatsApp/Slack-like encrypted messaging with live location attachments and instant push notifications.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[650px]">
        {/* Sidebar */}
        <div className="glass-panel p-4 rounded-3xl border-white/10 space-y-4 bg-white/5 backdrop-blur-md flex flex-col">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search chats..." className="w-full h-11 bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 text-xs text-white outline-none focus:border-luxury-blue" />
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1">
            <div onClick={() => setActiveChat('EMP-001')} className={`p-4 rounded-2xl border transition cursor-pointer flex items-center gap-3 ${activeChat === 'EMP-001' ? 'bg-luxury-blue/20 border-luxury-blue/50 text-white' : 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10'}`}>
              <div className="h-10 w-10 rounded-xl bg-luxury-blue/30 flex items-center justify-center font-bold text-white shrink-0">AM</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">Arjun Mehta</p>
                <p className="text-[10px] text-slate-400 truncate">Senior Tech Lead</p>
              </div>
            </div>

            <div onClick={() => setActiveChat('group')} className={`p-4 rounded-2xl border transition cursor-pointer flex items-center gap-3 ${activeChat === 'group' ? 'bg-luxury-blue/20 border-luxury-blue/50 text-white' : 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10'}`}>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0"><Users size={18} /></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate"># Core-Engineering</p>
                <p className="text-[10px] text-slate-400 truncate">45 Members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-3xl border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between h-full overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-luxury-blue/20 text-luxury-blue flex items-center justify-center font-black text-lg">
                {activeChat === 'group' ? <Users size={20} /> : 'AM'}
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">{activeChat === 'group' ? '# Core-Engineering Channel' : 'Arjun Mehta (Senior Tech Lead)'}</h3>
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online • End-to-End Encrypted</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar my-4 space-y-4 pr-2">
            {messages.map((m, idx) => {
              const isMe = m.senderId === 'EMP-002';
              return (
                <div key={idx} className={`flex flex-col max-w-md ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                  <div className={`p-4 rounded-3xl text-xs space-y-2 shadow-lg ${isMe ? 'bg-luxury-blue text-white rounded-br-none shadow-luxury-blue/20' : 'bg-white/10 text-slate-100 dark:text-white rounded-bl-none border border-white/5'}`}>
                    {!isMe && <p className="text-[10px] font-bold text-luxury-blue">{m.senderName}</p>}
                    <p className="leading-relaxed">{m.content}</p>
                    {m.attachedLocation && (
                      <div className="p-2.5 rounded-2xl bg-black/20 border border-white/10 flex items-center gap-2 mt-2 text-[10px] font-mono text-emerald-400">
                        <MapPin size={14} className="shrink-0" />
                        <span>Location Pin: {m.attachedLocation} (Davangere Hub)</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 px-1">{new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="flex items-center gap-3 border-t border-white/5 pt-4 shrink-0">
            <button type="button" onClick={() => setInput(input + ' [Attached Live Location: 14.4644, 75.9218]')} className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-luxury-blue transition flex items-center justify-center shrink-0 border border-white/5" title="Attach Live Location Pin">
              <MapPin size={20} />
            </button>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type an encrypted message..." className="flex-1 h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-xs text-white outline-none focus:border-luxury-blue" />
            <button type="submit" className="h-12 px-6 rounded-2xl bg-luxury-blue text-white font-black uppercase tracking-widest hover:bg-luxury-blue/80 transition shadow-xl shadow-luxury-blue/30 flex items-center gap-2 shrink-0 text-xs">
              <Send size={16} /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
