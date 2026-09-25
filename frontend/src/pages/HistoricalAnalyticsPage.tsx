import React, { useState, useEffect } from 'react';
import { BarChart3, Calendar, RefreshCw, ArrowUpRight, TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { WeatherAPI } from '../services/apiService';

export const HistoricalAnalyticsPage: React.FC = () => {
  const [city, setCity] = useState('Bangalore');
  const [metric, setMetric] = useState('temperature');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await WeatherAPI.getHistorical(city, metric);
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [city, metric]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-100">Historical Weather Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore historical climate series and compare actual observations against multi-year baselines.
        </p>
      </div>

      {/* Selector Controls */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
            Select Location
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
            Analytics Metric
          </label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none focus:border-cyan-500"
          >
            <option value="temperature">Temperature Delta (°C)</option>
            <option value="rainfall">Precipitation Accumulation (mm)</option>
            <option value="humidity">Relative Humidity (%)</option>
            <option value="wind">Wind Speed (km/h)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={loadData}
            className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-glow-cyan flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data Series
          </button>
        </div>
      </div>

      {/* Main Charts */}
      {loading ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading historical climate telemetry for {city}...</p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Actual vs Historical Baseline Area Chart */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Actual Observed vs Historical 30-Day Average ({metric})
                </h3>
                <p className="text-xs text-slate-400">Comparing recorded metrics against multi-decade seasonal norm</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-slate-300">Observed Recorded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-slate-300">Historical Average</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={3} fill="#06b6d4" fillOpacity={0.15} />
                  <Area type="monotone" dataKey="historicalAverage" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rainfall & Humidity Trend Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Precipitation Rainfall Accumulation (mm)
              </h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#f8fafc',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="rainfall" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Wind Speed Telemetry (km/h)
              </h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#f8fafc',
                        fontSize: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="windSpeed" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
