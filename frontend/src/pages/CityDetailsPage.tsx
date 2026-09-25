import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WeatherAPI } from '../services/apiService';
import { WeatherData } from '../types';
import { WeatherCard } from '../components/WeatherCard';
import { HourlyChart } from '../components/HourlyChart';
import { DailyForecastList } from '../components/DailyForecastList';
import { MapWidget } from '../components/MapWidget';
import { ArrowLeft, BrainCircuit, RefreshCw } from 'lucide-react';

export const CityDetailsPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const city = cityName || 'Bangalore';

  useEffect(() => {
    setLoading(true);
    WeatherAPI.getLiveWeather(city)
      .then(res => setWeather(res))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading || !weather) {
    return (
      <div className="p-12 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading comprehensive weather profile for {city}...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-100">{weather.city} Weather Intelligence</h1>
          <p className="text-xs text-slate-400">Detailed atmospheric readings & 7-day outlook</p>
        </div>
      </div>

      <WeatherCard weather={weather} />
      <HourlyChart data={weather.hourly} />
      <DailyForecastList daily={weather.daily} />

      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Radar Position Map</h3>
        <MapWidget weather={weather} height="h-80" />
      </div>
    </div>
  );
};
