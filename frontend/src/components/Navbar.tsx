import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // fixed import below
import { 
  Sun, Moon, Search, Bell, User, Sparkles, SlidersHorizontal, Shield, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC<{ onOpenAssistant: () => void }> = ({ onOpenAssistant }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, tempUnit, toggleTempUnit } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
                WeatherMind <span className="text-cyan-400">AI</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Intelligence Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search city (e.g. Bangalore, Delhi, Tokyo, London)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </form>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Assistant Quick Launcher */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:border-cyan-400 hover:text-cyan-200 transition-all shadow-glow-cyan"
            title="Ask WeatherMind AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Unit Toggle (°C / °F) */}
          <button
            onClick={toggleTempUnit}
            className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300 hover:border-slate-700 transition-colors"
            title="Switch Temperature Unit"
          >
            {tempUnit === 'celsius' ? '°C' : '°F'}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel p-4 shadow-2xl z-50 border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Alerts & Insights</h4>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">2 New</span>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs">
                    <p className="font-semibold text-amber-400">⚡ Heavy Rain Warning</p>
                    <p className="text-slate-400 mt-1">Convective rain cells approaching Bangalore afternoon. 72% probability.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-xs">
                    <p className="font-semibold text-cyan-400">🤖 AI Insight</p>
                    <p className="text-slate-400 mt-1">Humidity projected to rise significantly by 18:00.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                {user ? user.name.charAt(0) : 'U'}
              </div>
              <span className="hidden lg:inline text-xs font-semibold max-w-[100px] truncate">
                {user ? user.name : 'Guest'}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel p-2 shadow-2xl z-50 border border-slate-800">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-slate-200">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <div className="py-1 text-xs text-slate-300">
                  <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                    <User className="w-4 h-4 text-cyan-400" />
                    Profile Management
                  </Link>
                  <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    App Preferences
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-amber-400 transition-colors font-semibold">
                      <Shield className="w-4 h-4 text-amber-400" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-colors text-left mt-1">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
