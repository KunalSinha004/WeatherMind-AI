import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  BrainCircuit,
  BarChart3,
  MapPin,
  AlertTriangle,
  GitCompare,
  Bookmark,
  Cpu,
  Settings,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC<{ onOpenAssistant: () => void }> = ({ onOpenAssistant }) => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Weather Search', icon: Search, path: '/search' },
    { label: 'AI Forecast Lab', icon: BrainCircuit, path: '/ai-forecast', badge: 'AI' },
    { label: 'Historical Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Interactive Map', icon: MapPin, path: '/map' },
    { label: 'Alerts Center', icon: AlertTriangle, path: '/alerts', alertCount: 2 },
    { label: 'Compare Cities', icon: GitCompare, path: '/compare' },
    { label: 'Saved Locations', icon: Bookmark, path: '/saved' },
    { label: 'About AI Models', icon: Cpu, path: '/about-model' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ label: 'Admin Dashboard', icon: ShieldAlert, path: '/admin', badge: 'Admin' });
  }

  return (
    <aside className="w-64 shrink-0 hidden lg:block border-r border-slate-800 bg-slate-950/60 p-4 space-y-6 min-h-[calc(100vh-4rem)]">
      
      {/* WeatherMind Assistant Card Launcher */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-colors" />
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2 shadow-glow-cyan">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <h4 className="text-xs font-bold text-slate-100">WeatherMind AI Assistant</h4>
        <p className="text-[11px] text-slate-400 mt-1">Ask natural language climate & forecast queries</p>
        <button
          onClick={onOpenAssistant}
          className="mt-3 w-full py-1.5 px-3 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
        >
          Launch Assistant
        </button>
      </div>

      {/* Navigation Group */}
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Navigation</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30 shadow-glow-blue'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {item.badge}
                </span>
              )}
              {item.alertCount && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {item.alertCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Version Footer */}
      <div className="pt-4 border-t border-slate-900 text-center text-[10px] text-slate-400">
        <p className="font-mono">WeatherMind AI v2.4.0</p>
        <p className="text-slate-400 mt-0.5">Scikit-learn + XGBoost + PyTorch</p>
      </div>
    </aside>
  );
};
