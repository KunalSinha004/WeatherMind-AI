import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, Bell, Check, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { WeatherAPI } from '../services/apiService';
import { WeatherAlert } from '../types';

export const AlertsCenterPage: React.FC = () => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [filterSeverity, setFilterSeverity] = useState<'All' | 'Extreme' | 'High' | 'Moderate'>('All');
  const [loading, setLoading] = useState(true);

  // Preference Toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [severeOnly, setSevereOnly] = useState(false);
  const [tempThreshold, setTempThreshold] = useState(35);

  useEffect(() => {
    WeatherAPI.getAlerts()
      .then(res => setAlerts(res))
      .finally(() => setLoading(false));
  }, []);

  const filtered = alerts.filter(a => filterSeverity === 'All' || a.severity === filterSeverity);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-black text-slate-100">Severe Weather Alerts Center</h1>
        <p className="text-xs text-slate-400 mt-1">
          Intelligent real-time anomaly monitoring and automated atmospheric warnings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Active Alerts List (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Severity Filter Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Filter Severity:</span>
              {['All', 'Extreme', 'High', 'Moderate'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    filterSeverity === sev
                      ? 'bg-amber-500 text-slate-950 shadow-glow-amber'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="glass-card rounded-3xl p-8 text-center space-y-2">
              <RefreshCw className="w-6 h-6 text-amber-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400">Syncing active regional warning bulletins...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl glass-card border transition-all hover:scale-[1.01] ${
                    item.severity === 'Extreme'
                      ? 'border-rose-500/50 bg-rose-950/20'
                      : item.severity === 'High'
                      ? 'border-amber-500/50 bg-amber-950/20'
                      : 'border-blue-500/50 bg-blue-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                          item.severity === 'Extreme'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        <AlertTriangle className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-100">{item.title}</h3>
                        <p className="text-xs text-slate-400">📍 {item.location}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase ${
                        item.severity === 'Extreme'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">{item.description}</p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Started: {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>Expected Duration: <b className="text-slate-200">{item.expectedDuration}</b></span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* User Alert Configuration Preferences (1 Col) */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5 h-fit">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Alert Preferences & Rules
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-200">Email Notifications</p>
                <p className="text-[11px] text-slate-400">Receive warning emails for saved cities</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-200">Severe Alerts Only</p>
                <p className="text-[11px] text-slate-400">Suppress moderate advisory notices</p>
              </div>
              <input
                type="checkbox"
                checked={severeOnly}
                onChange={(e) => setSevereOnly(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-200 mb-1">
                <span>Extreme Heat Threshold</span>
                <span className="text-cyan-400">{tempThreshold}°C</span>
              </div>
              <input
                type="range"
                min="30"
                max="45"
                value={tempThreshold}
                onChange={(e) => setTempThreshold(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-900"
              />
            </div>

            <button
              onClick={() => alert("Alert configuration saved!")}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-glow-cyan mt-2"
            >
              Save Alert Preferences
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
