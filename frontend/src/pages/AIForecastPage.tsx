import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BrainCircuit, Sparkles, Sliders, ShieldCheck, RefreshCw, BarChart2, CheckCircle, Info
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { WeatherAPI } from '../services/apiService';
import { AIPredictionResult } from '../types';

export const AIForecastPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get('city') || 'Bangalore';

  const [location, setLocation] = useState(initialCity);
  const [metric, setMetric] = useState<'temperature' | 'rainfall' | 'humidity' | 'wind' | 'pressure'>('temperature');
  const [horizonDays, setHorizonDays] = useState<number>(7);
  const [modelName, setModelName] = useState<'xgboost' | 'random_forest' | 'lstm'>('xgboost');

  const [prediction, setPrediction] = useState<AIPredictionResult | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const res = await WeatherAPI.getAIPrediction(location, metric, horizonDays, modelName);
      setPrediction(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, [location, metric, horizonDays, modelName]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-100">AI Weather Prediction Lab</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/30">
              XGBoost & LSTM Microservice
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure target metrics, forecast horizon, and ensemble machine learning models.
          </p>
        </div>

        <button
          onClick={fetchPrediction}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-400 hover:border-cyan-500/50 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Run Prediction Pipeline
        </button>
      </div>

      {/* Controls Bar */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Location Selector */}
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Prediction Variable */}
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
            Target Metric Variable
          </label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none focus:border-cyan-500"
          >
            <option value="temperature">Temperature (°C)</option>
            <option value="rainfall">Precipitation Rainfall (mm)</option>
            <option value="humidity">Relative Humidity (%)</option>
            <option value="wind">Wind Speed (km/h)</option>
            <option value="pressure">Barometric Pressure (hPa)</option>
          </select>
        </div>

        {/* Forecast Horizon */}
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
            Forecast Horizon
          </label>
          <select
            value={horizonDays}
            onChange={(e) => setHorizonDays(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none focus:border-cyan-500"
          >
            <option value={1}>24 Hours (1 Day)</option>
            <option value={3}>3 Days</option>
            <option value={7}>7 Days</option>
            <option value={14}>14 Days</option>
          </select>
        </div>

        {/* Model Architecture */}
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
            ML Architecture Model
          </label>
          <select
            value={modelName}
            onChange={(e) => setModelName(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none focus:border-cyan-500"
          >
            <option value="xgboost">XGBoost Gradient Boosting</option>
            <option value="random_forest">Random Forest Regressor</option>
            <option value="lstm">PyTorch Deep LSTM</option>
          </select>
        </div>

      </div>

      {/* Main Results Showcase */}
      {loading ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Executing machine learning inference script on FastAPI backend...</p>
        </div>
      ) : prediction ? (
        <div className="space-y-6">

          {/* Model Stats Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Model Engine</span>
              <span className="text-xs font-black text-cyan-400 block truncate">{prediction.model}</span>
              <span className="text-[10px] text-slate-500 block">Ver: {prediction.model_version}</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Confidence Score</span>
              <span className="text-2xl font-black text-emerald-400 block">
                {Math.round(prediction.confidence_score * 100)}%
              </span>
              <span className="text-[10px] text-slate-500 block">Confidence weighted</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Observation</span>
              <span className="text-2xl font-black text-slate-100 block">
                {prediction.current_observation} {prediction.forecast[0]?.unit}
              </span>
              <span className="text-[10px] text-slate-500 block">Real-time baseline</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Historical Avg</span>
              <span className="text-2xl font-black text-slate-300 block">
                {prediction.historical_avg} {prediction.forecast[0]?.unit}
              </span>
              <span className="text-[10px] text-slate-500 block">30-day baseline</span>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Model Evaluation</span>
              <div className="text-[11px] font-mono text-slate-300 space-y-0.5">
                <div>MAE: <b className="text-cyan-400">{prediction.mae}</b></div>
                <div>RMSE: <b className="text-cyan-400">{prediction.rmse}</b></div>
                <div>R²: <b className="text-cyan-400">{prediction.r2}</b></div>
              </div>
            </div>

          </div>

          {/* AI Forecast Trend Area Chart with Confidence Bands */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Predicted {metric.charAt(0).toUpperCase() + metric.slice(1)} Forecast Curve
                </h3>
                <p className="text-xs text-slate-400">
                  Showing predicted point estimate alongside upper/lower confidence boundaries
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-slate-300">Predicted Value</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <span className="text-slate-400">Upper/Lower Margin</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={prediction.forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                    formatter={(val: any, name: any) => [
                      `${val} ${prediction.forecast[0]?.unit}`,
                      name === 'predicted_value' ? 'Predicted Point' : name === 'upper_bound' ? 'Upper Limit' : 'Lower Limit'
                    ]}
                  />
                  <Area type="monotone" dataKey="upper_bound" stroke="#475569" strokeDasharray="3 3" fillOpacity={0} />
                  <Area type="monotone" dataKey="predicted_value" stroke="#06b6d4" strokeWidth={3} fill="url(#predGrad)" />
                  <Area type="monotone" dataKey="lower_bound" stroke="#475569" strokeDasharray="3 3" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Forecast Points Table Breakdown */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Detailed Horizon Breakdown Points
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-[10px] font-extrabold uppercase text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Predicted Value</th>
                    <th className="p-3">Prediction Range</th>
                    <th className="p-3">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {prediction.forecast.map((pt, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="p-3 text-slate-200 font-sans font-bold">{pt.date}</td>
                      <td className="p-3 font-extrabold text-cyan-400">{pt.predicted_value} {pt.unit}</td>
                      <td className="p-3 text-slate-400">[{pt.lower_bound} – {pt.upper_bound}] {pt.unit}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          {Math.round(pt.confidence * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Disclaimer Callout */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
            <Info className="w-5 h-5 text-cyan-400 shrink-0" />
            <p>
              <b className="text-slate-200">Note on AI Predictability:</b> WeatherMind AI predictions are statistical calculations generated via machine learning algorithms. Atmospheric conditions involve chaotic environmental factors and cannot be guaranteed as absolute factual certainty.
            </p>
          </div>

        </div>
      ) : null}

    </div>
  );
};
