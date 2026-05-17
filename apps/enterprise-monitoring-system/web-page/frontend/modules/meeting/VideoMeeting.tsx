import React, { useState } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, MonitorUp, MessageSquare, Users, Settings, 
  PhoneOff, Circle, ShieldCheck, Hand, Disc, Share2, Expand, MoreHorizontal
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isSpeaking?: boolean;
}

export const VideoMeeting: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'grid' | 'participants' | 'chat'>('grid');
  const [isRecording, setIsRecording] = useState(true);

  const participants: Participant[] = [
    { id: '1', name: 'Gagan CB', role: 'Super Admin', avatar: '👑', isMuted: isMuted, isVideoOff: isVideoOff, isSpeaking: !isMuted },
    { id: '2', name: 'Sarah Jenkins', role: 'CTO', avatar: '👩‍💻', isMuted: false, isVideoOff: false, isSpeaking: true },
    { id: '3', name: 'Marcus Vance', role: 'SecOps', avatar: '🛡️', isMuted: true, isVideoOff: false },
    { id: '4', name: 'David Vance', role: 'CEO', avatar: '👔', isMuted: true, isVideoOff: true },
    { id: '5', name: 'Alex River', role: 'DevOps', avatar: '🐳', isMuted: false, isVideoOff: false },
    { id: '6', name: 'Elena Rostova', role: 'AI Lead', avatar: '🧠', isMuted: true, isVideoOff: false }
  ];

  return (
    <div className="h-[750px] bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans">
      {/* Header Bar */}
      <div className="h-16 border-b border-slate-800 bg-slate-950/40 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
            <Video size={20} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-white">Executive Strategy Sync</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold flex items-center gap-1.5">
                <ShieldCheck size={14} /> E2E Encrypted
              </span>
              {isRecording && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-semibold flex items-center gap-1.5 animate-pulse">
                  <Circle size={10} className="fill-red-500 text-red-500" /> Recording
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Meeting ID: wrk-sync-2026 &bull; 6 Participants</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow-inner">
          <button 
            onClick={() => setActiveTab('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'grid' 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Video size={16} /> Active Grid
          </button>
          <button 
            onClick={() => setActiveTab('participants')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'participants' 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Users size={16} /> Participants (6)
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'chat' 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 border border-purple-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare size={16} /> Meeting Chat
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Video Grid */}
        <div className="flex-1 bg-slate-950/60 p-6 overflow-y-auto flex flex-col justify-between">
          {activeTab === 'grid' && (
            <div className="grid grid-cols-3 gap-6 flex-1 max-h-[580px]">
              {participants.map((p) => (
                <div 
                  key={p.id} 
                  className={`relative bg-slate-900/80 border rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center group transition-all duration-300 ${
                    p.isSpeaking 
                      ? 'border-purple-500 shadow-purple-500/10 shadow-2xl ring-2 ring-purple-500/30' 
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {p.isVideoOff ? (
                    <div className="w-24 h-24 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-4xl shadow-2xl">
                      {p.avatar}
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-900/40 to-slate-950/80 flex items-center justify-center text-6xl">
                      {p.avatar}
                    </div>
                  )}

                  {/* Participant Lower Third */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.isSpeaking ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                      <span className="text-xs font-bold text-white truncate">{p.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-400 font-semibold">{p.role}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {p.isMuted ? (
                        <div className="p-1 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                          <MicOff size={12} />
                        </div>
                      ) : (
                        <div className="p-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400">
                          <Mic size={12} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'participants' && (
            <div className="flex-1 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 overflow-y-auto max-w-3xl margin-auto w-full self-center">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">In Call (6)</h3>
              <div className="flex flex-col gap-3">
                {participants.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shadow-lg">
                        {p.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          {p.name}
                          <span className="text-[10px] px-2 py-0.5 bg-slate-800 rounded-lg border border-slate-700 text-slate-400">{p.role}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Connected via WorkSphere WinRT Client</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className={`p-2 rounded-xl border transition-colors ${p.isMuted ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                        {p.isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                      </button>
                      <button className={`p-2 rounded-xl border transition-colors ${p.isVideoOff ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                        {p.isVideoOff ? <VideoOff size={16} /> : <Video size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex-1 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col max-w-3xl margin-auto w-full self-center">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Meeting Chat</h3>
              <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-base">👩‍💻</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">Sarah Jenkins</span>
                      <span className="text-[10px] text-slate-500">10:02 AM</span>
                    </div>
                    <div className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 mt-1 shadow-lg">
                      Let us look at the Q3 growth numbers on slide 4.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-base">🛡️</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">Marcus Vance</span>
                      <span className="text-[10px] text-slate-500">10:05 AM</span>
                    </div>
                    <div className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 mt-1 shadow-lg">
                      Agreed. The security audit clearance is fully green.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2 focus-within:border-purple-500/50 transition-colors">
                <input type="text" placeholder="Send message to meeting..." className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none px-2" />
                <button className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg shadow-lg transition-colors">
                  <MessageSquare size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Bottom Meeting Controls Bar */}
          <div className="h-20 border border-slate-800 bg-slate-900/80 backdrop-blur-xl rounded-2xl px-8 flex items-center justify-between shadow-2xl mt-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> E2E Secure Audio/Video
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs shadow-xl transition-all duration-300 ${
                  isMuted 
                    ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30' 
                    : 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700'
                }`}
              >
                {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>

              <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs shadow-xl transition-all duration-300 ${
                  isVideoOff 
                    ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30' 
                    : 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700'
                }`}
              >
                {isVideoOff ? <VideoOff size={18} /> : <Video size={18} />}
                {isVideoOff ? 'Start Video' : 'Stop Video'}
              </button>

              <button 
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs shadow-xl transition-all duration-300 ${
                  isScreenSharing 
                    ? 'bg-purple-600 border border-purple-500/30 text-white shadow-purple-500/25' 
                    : 'bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20'
                }`}
              >
                <MonitorUp size={18} />
                {isScreenSharing ? 'Sharing Screen' : 'Share Screen'}
              </button>

              <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-slate-300 hover:text-white shadow-xl transition-colors">
                <Hand size={18} />
              </button>

              <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-slate-300 hover:text-white shadow-xl transition-colors">
                <Settings size={18} />
              </button>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-red-500/25 transition-all duration-300">
              <PhoneOff size={18} /> Leave Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
