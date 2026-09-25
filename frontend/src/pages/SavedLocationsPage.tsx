import React, { useState, useEffect } from 'react';
import { Bookmark, Plus, Trash2, Star, MapPin, ArrowRight, RefreshCw } from 'lucide-react';
import { WeatherAPI } from '../services/apiService';
import { WeatherData } from '../types';
import { useNavigate } from 'react-router-dom';

export const SavedLocationsPage: React.FC = () => {
  const [cities, setCities] = useState<string[]>(['Bangalore', 'Delhi', 'Mumbai', 'London', 'Tokyo']);
  const [primaryCity, setPrimaryCity] = useState('Bangalore');
  const [weatherCards, setWeatherCards] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCity, setNewCity] = useState('');

  const navigate = useNavigate();

  const loadSaved = async () => {
    setLoading(true);
    try {
      const data = await Promise.all(cities.map(c => WeatherAPI.getLiveWeather(c)));
      setWeatherCards(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
  }, [cities]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCity.trim() && !cities.includes(newCity.trim())) {
      setCities(prev => [...prev, newCity.trim()]);
      setNewCity('');
    }
  };

  const handleRemove = (cityToRemove: string) => {
    setCities(prev => prev.filter(c => c !== cityToRemove));
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100">Saved Locations</h1>
          <p className="text-xs text-slate-400 mt-1">Manage your pinned favorite weather stations and primary hubs</p>
        </div>

        {/* Add Location Form */}
        <form onSubmit={handleAdd} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add new location..."
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 flex items-center gap-1 shadow-glow-cyan"
          >
            <Plus className="w-4 h-4" /> Save
          </button>
        </form>
      </div>

      {loading ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading saved locations telemetry...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherCards.map((w) => {
            const isPrimary = w.city.toLowerCase() === primaryCity.toLowerCase();
            return (
              <div
                key={w.city}
                className={`glass-card rounded-3xl p-6 border transition-all duration-200 relative space-y-4 ${
                  isPrimary
                    ? 'border-cyan-500/50 bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-900 shadow-glow-cyan'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPrimaryCity(w.city)}
                      title={isPrimary ? 'Primary Location' : 'Set as Primary Location'}
                    >
                      <Star className={`w-5 h-5 ${isPrimary ? 'text-amber-400 fill-amber-400' : 'text-slate-600 hover:text-amber-400'}`} />
                    </button>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">{w.city}</h3>
                      <span className="text-[10px] text-slate-400">{w.country}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(w.city)}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-cyan-400">{w.current.temp}°C</span>
                  <div className="text-right">
                    <span className="text-3xl">{w.current.icon}</span>
                    <p className="text-xs font-semibold text-slate-300">{w.current.condition}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Humidity</span>
                    <span className="font-bold text-slate-200">{w.current.humidity}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Wind</span>
                    <span className="font-bold text-slate-200">{w.current.windSpeed} km/h</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/city/${encodeURIComponent(w.city)}`)}
                  className="w-full py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-cyan-400 hover:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
