import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Wifi, ShieldAlert, CheckCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { smartHRApi } from '../api';
import type { LiveTrackingLog } from '../types';

export function LiveTrackingView() {
  const [logs, setLogs] = useState<LiveTrackingLog[]>([]);
  const [selectedEmp, setSelectedEmp] = useState('EMP-003');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, [selectedEmp]);

  const fetchLogs = () => {
    setIsRefreshing(true);
    smartHRApi.getTrackingLogs(selectedEmp).then(res => {
      setLogs(res);
      setIsRefreshing(false);
    });
  };

  const handleSimulateMove = (lat: number, lng: number, violation: boolean, zone: string) => {
    smartHRApi.logLocation({ employeeId: selectedEmp, employeeName: selectedEmp === 'EMP-003' ? 'Rohan Desai' : 'Arjun Mehta', latitude: lat, longitude: lng, geofenceViolation: violation, geofenceZoneName: zone }).then(res => {
      setLogs([res, ...logs]);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl bg-gradient-to-r from-luxury-blue/10 to-transparent border-white/10">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Navigation className="text-luxury-blue" />
            Live GPS & Wi-Fi Triangulation Tracking
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High-precision hardware GPS lock, Wi-Fi SSID triangulation, and real-time geofence perimeter monitoring.</p>
        </div>
        <div className="flex items-center gap-4">
          <select value={selectedEmp} onChange={e => setSelectedEmp(e.target.value)} className="h-11 bg-white/5 border border-white/10 rounded-2xl px-4 text-xs text-white outline-none focus:border-luxury-blue font-bold uppercase tracking-wider">
            <option value="EMP-003" className="bg-slate-900">Rohan Desai (EMP-003)</option>
            <option value="EMP-001" className="bg-slate-900">Arjun Mehta (EMP-001)</option>
          </select>
          <button onClick={fetchLogs} className={`h-11 w-11 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition flex items-center justify-center shrink-0 ${isRefreshing ? 'animate-spin text-luxury-blue' : ''}`} title="Refresh Live Telemetry">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulated Google Maps UI */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 shrink-0">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin size={16} className="text-luxury-blue" /> Enterprise Telemetry Map View (Davangere / Bangalore)
            </h3>
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> GPS Hardware Lock Active
            </span>
          </div>

          {/* Interactive Map Simulation Container */}
          <div className="flex-1 rounded-3xl border border-white/10 overflow-hidden relative bg-slate-950/80 flex items-center justify-center p-6">
            {/* Grid overlay representing map streets */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Simulated Geofence Circles */}
            <div className="absolute h-64 w-64 rounded-full border-2 border-dashed border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center animate-pulse pointer-events-none">
              <span className="absolute bottom-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">Davangere Core Perimeter (15m)</span>
            </div>

            {/* Active Employee Marker */}
            {logs.length > 0 && (
              <div className="absolute z-10 flex flex-col items-center animate-bounce">
                <div className={`p-3 rounded-2xl ${logs[0].geofenceViolation ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50' : 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/50'} font-black text-xs flex items-center gap-2 border border-white/20`}>
                  <Navigation size={16} className="animate-spin" />
                  <span>{logs[0].employeeName}</span>
                </div>
                <div className={`h-4 w-1 bg-gradient-to-b ${logs[0].geofenceViolation ? 'from-rose-500' : 'from-luxury-blue'} to-transparent`}></div>
              </div>
            )}

            {/* Map Controls / Telemetry Overlay */}
            <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl bg-black/60 border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 z-20">
              <div className="text-xs space-y-1">
                <p className="font-bold text-white flex items-center gap-2"><Wifi size={14} className="text-luxury-blue" /> SSID: <span className="text-emerald-400">{logs[0]?.wifiSsid || 'WorkSphere-Corp'}</span></p>
                <p className="text-[10px] text-slate-400 font-mono">IP: {logs[0]?.ipAddress || '192.168.10.45'} • Lat: {logs[0]?.latitude || 14.4644}, Lng: {logs[0]?.longitude || 75.9218}</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={() => handleSimulateMove(14.4644, 75.9218, false, 'Davangere Office Hub')} className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-[10px] font-bold hover:bg-emerald-600 transition shadow-md shadow-emerald-500/20">Move to Davangere Hub</button>
                <button onClick={() => handleSimulateMove(12.9716, 77.5946, false, 'Bangalore HQ')} className="px-3 py-1.5 rounded-xl bg-luxury-blue text-white text-[10px] font-bold hover:bg-luxury-blue/80 transition shadow-md shadow-luxury-blue/20">Move to Bangalore HQ</button>
                <button onClick={() => handleSimulateMove(15.2500, 75.0000, true, 'Outside Authorized Perimeter')} className="px-3 py-1.5 rounded-xl bg-rose-500 text-white text-[10px] font-bold hover:bg-rose-600 transition shadow-md shadow-rose-500/20">Trigger Geofence Breach</button>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Log Feed */}
        <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6 bg-white/5 backdrop-blur-md flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 shrink-0">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Live Telemetry Log Feed</h3>
            <span className="text-xs font-bold text-luxury-blue">{logs.length} Pings</span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1 my-2 max-h-[450px]">
            {logs.map((log, idx) => (
              <div key={idx} className={`glass-panel p-4 rounded-2xl border ${log.geofenceViolation ? 'border-rose-500/30 bg-rose-500/5' : 'border-white/5 bg-white/5'} hover:border-luxury-blue/30 transition space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{log.geofenceZoneName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${log.geofenceViolation ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>{log.geofenceViolation ? 'Violation' : 'Authorized'}</span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-1 font-mono">
                  <p>Coords: {log.latitude}, {log.longitude}</p>
                  <p>Network: {log.wifiSsid} ({log.ipAddress})</p>
                  <p className="text-[9px] text-slate-500">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
