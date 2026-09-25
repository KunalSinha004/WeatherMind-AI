import React, { useState, useEffect } from 'react';
import { GitCompare, Plus, X, RefreshCw, Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import { WeatherAPI } from '../services/apiService';
import { WeatherData } from '../types';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

export const CompareCitiesPage: React.FC = () => {
  const [cities, setCities] = useState<string[]>(['Bangalore', 'Delhi', 'Mumbai', 'Kolkata']);
  const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCityInput, setNewCityInput] = useState('');

  const loadComparison = async () => {
    setLoading(true);
    try {
      const res = await WeatherAPI.compareCities(cities);
      setWeatherDataList(res);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComparison();
  }, [cities]);

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCityInput.trim() && cities.length < 4 && !cities.includes(newCityInput.trim())) {
      setCities(prev => [...prev, newCityInput.trim()]);
      setNewCityInput('');
    }
  };

  const handleRemoveCity = (cityToRemove: string) => {
    if (cities.length > 1) {
      setCities(prev => prev.filter(c => c !== cityToRemove));
    }
  };

  const chartData = weatherDataList.map(w => ({
    name: w.city,
    temp: w.current.temp,
    humidity: w.current.humidity,
    wind: w.current.windSpeed,
    uv: w.current.uvIndex
  }));

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100">Multi-City Weather Comparison</h1>
          <p className="text-xs text-slate-400 mt-1">Side-by-side climate matrix comparison for up to 4 global cities</p>
        </div>

        {/* Add City Input Form */}
        {cities.length < 4 && (
          <form onSubmit={handleAddCity} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add city to compare..."
              value={newCityInput}
              onChange={(e) => setNewCityInput(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>
        )}
      </div>

      {loading ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Fetching concurrent weather telemetry across cities...</p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {weatherDataList.map((w) => (
              <div key={w.city} className="glass-card rounded-3xl p-5 border border-slate-800 relative space-y-4">
                {cities.length > 1 && (
                  <button
                    onClick={() => handleRemoveCity(w.city)}
                    className="absolute top-3 right-3 p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-100">{w.city}</h3>
                  <span className="text-[10px] text-slate-400">{w.country}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl">{w.current.icon}</span>
                  <div>
                    <span className="text-3xl font-extrabold text-cyan-400">{w.current.temp}°C</span>
                    <p className="text-xs text-slate-300 font-semibold">{w.current.condition}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1"><Droplets className="w-3.5 h-3.5 text-cyan-400" /> Humidity:</span>
                    <b className="text-slate-100">{w.current.humidity}%</b>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1"><Wind className="w-3.5 h-3.5 text-blue-400" /> Wind Speed:</span>
                    <b className="text-slate-100">{w.current.windSpeed} km/h</b>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-amber-400" /> UV Index:</span>
                    <b className="text-slate-100">{w.current.uvIndex}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recharts Temperature Comparison Bar Chart */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Comparative Metric Visualizer
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="temp" name="Temperature (°C)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="humidity" name="Humidity (%)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="wind" name="Wind Speed (km/h)" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
