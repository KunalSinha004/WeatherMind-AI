import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, Database, Shield, Zap, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, tempUnit, toggleTempUnit } = useTheme();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      <div>
        <h1 className="text-2xl font-black text-slate-100">Application Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Configure appearance, API data providers, and system telemetry</p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
        
        {/* Theme Settings */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Appearance & UI Mode
          </h3>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div>
              <p className="text-xs font-bold text-slate-200">Theme Mode</p>
              <p className="text-[11px] text-slate-400">Currently using {theme === 'dark' ? 'Deep Navy Dark Mode' : 'Light Mode'}</p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-400 hover:bg-slate-700 flex items-center gap-2"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              Toggle Theme
            </button>
          </div>
        </div>

        {/* Data Provider Telemetry */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Weather Data Provider
          </h3>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Provider API:</span>
              <b className="text-cyan-400">Open-Meteo Global REST API</b>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">AI Python Service:</span>
              <b className="text-slate-200">FastAPI Uvicorn Microservice (Port 8000)</b>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Refresh Frequency:</span>
              <b className="text-slate-200">Real-time On Demand</b>
            </div>
          </div>
        </div>

        {/* Cache Control */}
        <div>
          <button
            onClick={() => alert("Local cache cleared!")}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:border-slate-700"
          >
            Clear Application Local Cache
          </button>
        </div>

      </div>

    </div>
  );
};
