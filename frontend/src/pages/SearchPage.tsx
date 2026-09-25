import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Sparkles, History } from 'lucide-react';
import { WeatherAPI } from '../services/apiService';
import { WeatherData } from '../types';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || 'Bangalore';

  const [query, setQuery] = useState(initialQuery);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Bangalore', 'Delhi', 'Mumbai', 'London', 'Tokyo']);

  const navigate = useNavigate();

  const handleSearch = async (targetCity: string) => {
    if (!targetCity.trim()) return;
    setLoading(true);
    try {
      const result = await WeatherAPI.getLiveWeather(targetCity);
      setWeather(result);
      if (!recentSearches.includes(result.city)) {
        setRecentSearches(prev => [result.city, ...prev.slice(0, 4)]);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(initialQuery);
  }, [initialQuery]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-100">Global Weather Search</h1>
        <p className="text-xs text-slate-400 mt-1">Search any city worldwide for real-time telemetry and AI forecasts</p>
      </div>

      {/* Search Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="glass-card rounded-2xl p-3 border border-slate-800 flex items-center gap-3 shadow-xl"
      >
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name (e.g. Paris, New York, Tokyo, Sydney)..."
          className="flex-1 bg-transparent text-sm font-semibold text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-glow-cyan"
        >
          {loading ? 'Searching...' : 'Search City'}
        </button>
      </form>

      {/* Recent Searches Tags */}
      <div className="flex items-center gap-2 text-xs">
        <History className="w-4 h-4 text-slate-500" />
        <span className="text-slate-400">Recent Searches:</span>
        <div className="flex items-center gap-2 flex-wrap">
          {recentSearches.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(s);
                handleSearch(s);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors text-xs"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      {weather && (
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-2xl">
                {weather.current.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">{weather.city}, {weather.country}</h2>
                <p className="text-xs text-slate-400">Lat: {weather.lat.toFixed(2)}, Lon: {weather.lon.toFixed(2)}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-4xl font-extrabold text-cyan-400">{weather.current.temp}°C</span>
              <p className="text-xs text-slate-300 font-semibold">{weather.current.condition}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Humidity</span>
              <span className="font-bold text-slate-200">{weather.current.humidity}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Wind Speed</span>
              <span className="font-bold text-slate-200">{weather.current.windSpeed} km/h</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Pressure</span>
              <span className="font-bold text-slate-200">{weather.current.pressure} hPa</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">UV Index</span>
              <span className="font-bold text-slate-200">{weather.current.uvIndex} / 12</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => navigate(`/city/${encodeURIComponent(weather.city)}`)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:border-slate-700 flex items-center gap-1.5"
            >
              Full City Details
            </button>
            <button
              onClick={() => navigate(`/ai-forecast?city=${encodeURIComponent(weather.city)}`)}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 shadow-glow-cyan flex items-center gap-1.5"
            >
              Run AI Prediction <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
