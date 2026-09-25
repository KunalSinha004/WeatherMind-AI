import React from 'react';
import { WeatherData } from '../types';
import { useTheme } from '../context/ThemeContext';
import { MapPin, Wind, Droplets, Gauge, Eye, Sun, Compass } from 'lucide-react';

export const WeatherCard: React.FC<{ weather: WeatherData }> = ({ weather }) => {
  const { tempUnit } = useTheme();

  const convertTemp = (c: number) => {
    if (tempUnit === 'fahrenheit') {
      return Math.round((c * 9) / 5 + 32);
    }
    return Math.round(c);
  };

  const symbol = tempUnit === 'fahrenheit' ? '°F' : '°C';
  const c = weather.current;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-2xl">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-black text-slate-100">{weather.city}</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
              {weather.country}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Observed live • Lat: {weather.lat.toFixed(2)}, Lon: {weather.lon.toFixed(2)}
          </p>
        </div>

        {weather.isDemoData && (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Demo Data
          </span>
        )}
      </div>

      {/* Main Temperature Showcase */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
            {convertTemp(c.temp)}{symbol}
          </span>
          <div>
            <span className="text-4xl">{c.icon}</span>
            <p className="text-base font-semibold text-slate-200 mt-1">{c.condition}</p>
            <p className="text-xs text-slate-400">
              Feels like {convertTemp(c.feelsLike)}{symbol}
            </p>
          </div>
        </div>

        {/* Sunrise / Sunset Arc Mini Summary */}
        <div className="flex items-center gap-6 bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-800/80">
          <div className="text-center">
            <Sun className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 block uppercase">Sunrise</span>
            <span className="text-xs font-bold text-slate-200">{c.sunrise}</span>
          </div>
          <div className="w-[1px] h-8 bg-slate-800" />
          <div className="text-center">
            <Sun className="w-4 h-4 text-rose-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 block uppercase">Sunset</span>
            <span className="text-xs font-bold text-slate-200">{c.sunset}</span>
          </div>
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Humidity</span>
            <span className="text-sm font-bold text-slate-100">{c.humidity}%</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Wind Speed</span>
            <span className="text-sm font-bold text-slate-100">{c.windSpeed} km/h</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pressure</span>
            <span className="text-sm font-bold text-slate-100">{c.pressure} hPa</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">UV Index</span>
            <span className="text-sm font-bold text-slate-100">{c.uvIndex} / 12</span>
          </div>
        </div>
      </div>

    </div>
  );
};
