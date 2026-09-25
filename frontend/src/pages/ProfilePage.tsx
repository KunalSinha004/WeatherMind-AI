import React, { useState } from 'react';
import { User as UserIcon, Mail, MapPin, Sliders, Bell, Shield, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const ProfilePage: React.FC = () => {
  const { user, updateUserPreferences } = useAuth();
  const { tempUnit, toggleTempUnit } = useTheme();

  const [name, setName] = useState(user?.name || 'Kunal Sharma');
  const [preferredLocation, setPreferredLocation] = useState(user?.preferredLocation || 'Bangalore');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserPreferences({ name, preferredLocation });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      <div>
        <h1 className="text-2xl font-black text-slate-100">User Profile Management</h1>
        <p className="text-xs text-slate-400 mt-1">Manage your personal settings, primary location, and notifications</p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
        
        {/* User Header Avatar */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-black text-2xl flex items-center justify-center shadow-glow-cyan">
            {name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">{user?.name}</h2>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <span className="inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Role: {user?.role.toUpperCase()}
            </span>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4" /> Profile settings updated successfully.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Preferred Primary Location
              </label>
              <input
                type="text"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Temperature Unit Preference
            </h4>
            <button
              type="button"
              onClick={toggleTempUnit}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-400 hover:border-slate-700"
            >
              Current: {tempUnit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'} — Click to Switch
            </button>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 shadow-glow-cyan transition-colors"
          >
            Save Profile Changes
          </button>
        </form>

      </div>

    </div>
  );
};
