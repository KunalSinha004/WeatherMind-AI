import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-black text-slate-100">WeatherMind AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            "See Tomorrow. Understand the Weather."
            Production-grade AI weather forecasting platform powered by XGBoost, Random Forest, & Deep Learning.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">Core Platform</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Weather Dashboard</Link></li>
            <li><Link to="/ai-forecast" className="hover:text-cyan-400 transition-colors">AI Prediction Lab</Link></li>
            <li><Link to="/analytics" className="hover:text-cyan-400 transition-colors">Historical Analytics</Link></li>
            <li><Link to="/map" className="hover:text-cyan-400 transition-colors">Interactive Weather Map</Link></li>
            <li><Link to="/alerts" className="hover:text-cyan-400 transition-colors">Severe Weather Alerts</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">Machine Learning</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/about-model" className="hover:text-cyan-400 transition-colors">XGBoost Gradient Boosting</Link></li>
            <li><Link to="/about-model" className="hover:text-cyan-400 transition-colors">Random Forest Ensemble</Link></li>
            <li><Link to="/about-model" className="hover:text-cyan-400 transition-colors">PyTorch Deep LSTM</Link></li>
            <li><Link to="/about-model" className="hover:text-cyan-400 transition-colors">Model Evaluation Metrics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">System Health</h4>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">API Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">AI Service:</span>
              <span className="text-cyan-400 font-bold">FastAPI v1.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Provider:</span>
              <span className="text-slate-200 font-semibold">Open-Meteo REST</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© 2026 WeatherMind AI Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built for Final-Year Major Project & Startup Demo
        </p>
      </div>
    </footer>
  );
};
