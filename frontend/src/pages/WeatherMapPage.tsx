import React, { useState, useEffect } from 'react';
import { Search, MapPin, Layers, Thermometer, CloudRain, Wind, Cloud, Gauge } from 'lucide-react';
import { WeatherAPI } from '../services/apiService';
import { WeatherData } from '../types';
import { MapWidget } from '../components/MapWidget';

export const WeatherMapPage: React.FC = () => {
  const [city, setCity] = useState('Bangalore');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [activeLayer, setActiveLayer] = useState<'temp' | 'rain' | 'wind' | 'clouds'>('temp');
  const [loading, setLoading] = useState(true);

  const loadWeather = async (targetCity: string) => {
    setLoading(true);
    try {
      const data = await WeatherAPI.getLiveWeather(targetCity);
      setWeather(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(city);
  }, [city]);

  return (
    <div className="space-y-4">
      {/* Header & Map Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100">Interactive Weather Map</h1>
          <p className="text-xs text-slate-400 mt-0.5">Explore real-time spatial atmospheric radar layers</p>
        </div>

        {/* Layer Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveLayer('temp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeLayer === 'temp'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" /> Temperature
          </button>
          <button
            onClick={() => setActiveLayer('rain')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeLayer === 'rain'
                ? 'bg-blue-600 text-white shadow-glow-blue'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" /> Precipitation
          </button>
          <button
            onClick={() => setActiveLayer('wind')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeLayer === 'wind'
                ? 'bg-violet-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wind className="w-3.5 h-3.5" /> Wind Vector
          </button>
        </div>
      </div>

      {/* Map Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadWeather(city);
        }}
        className="glass-card rounded-2xl p-2.5 border border-slate-800 flex items-center gap-2 max-w-md"
      >
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Focus map on location..."
          className="flex-1 bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700"
        >
          Locate
        </button>
      </form>

      {/* Map Container */}
      {weather && (
        <MapWidget weather={weather} activeLayer={activeLayer} height="h-[600px]" />
      )}
    </div>
  );
};
