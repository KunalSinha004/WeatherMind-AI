import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, BrainCircuit, ShieldCheck, Zap,
  Globe2, CloudRain, Thermometer, Wind, CheckCircle2, ChevronDown, Activity
} from 'lucide-react';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does WeatherMind AI predict future weather patterns?",
      a: "WeatherMind AI processes time-series historical data and atmospheric physics parameters through ensemble XGBoost, Random Forest, and PyTorch LSTM models. It uses rolling lags, barometric pressure deltas, and seasonal sine/cosine encodings to compute confidence-weighted forecasts."
    },
    {
      q: "Are AI weather forecasts guaranteed to be 100% accurate?",
      a: "No. Atmospheric dynamics involve chaotic micro-turbulences. WeatherMind AI explicitly provides confidence intervals (e.g. 91% confidence score, ±1.2°C margin of error) and never claims guaranteed exact outcomes."
    },
    {
      q: "Where does the real-time weather data originate?",
      a: "Our data pipeline integrates Open-Meteo high-resolution global atmospheric models alongside localized satellite sensor metrics."
    },
    {
      q: "Can I monitor severe weather alerts for custom locations?",
      a: "Yes! You can configure custom threshold alerts for heavy precipitation, extreme heatwaves, gale wind speed, and UV exposure index."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 flex items-center justify-center text-white shadow-glow-cyan">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
              WeatherMind <span className="text-cyan-400">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#ai-forecasting" className="hover:text-cyan-400 transition-colors">AI Forecasting</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#tech-stack" className="hover:text-cyan-400 transition-colors">Tech Stack</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-black hover:brightness-110 transition-all shadow-glow-cyan flex items-center gap-2"
            >
              Launch Platform <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Next-Gen Climate Intelligence & Machine Learning</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 tracking-tight leading-tight">
            AI-Powered Weather Forecasting
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Predict weather patterns, analyze climate trends, and make smarter decisions with AI-driven forecasting. See Tomorrow. Understand the Weather.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-sm font-black hover:scale-105 transition-transform shadow-glow-cyan flex items-center justify-center gap-2"
            >
              Explore Forecast <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/ai-forecast"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl glass-panel text-cyan-300 border border-cyan-500/30 text-sm font-bold hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
            >
              <BrainCircuit className="w-4 h-4 text-cyan-400" /> Try AI Prediction
            </Link>
          </div>

        </div>

        {/* HERO VISUAL DASHBOARD PREVIEW */}
        <div className="mt-14 max-w-5xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">weathermind-ai // live-forecast-preview</span>
            </div>
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> AI Confidence: 91%
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Bangalore, India</span>
                <span className="text-cyan-400 font-bold">☀️ 28°C</span>
              </div>
              <p className="text-2xl font-black text-slate-100">Partly Cloudy</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <div>Humidity: <b className="text-slate-200">68%</b></div>
                <div>Wind: <b className="text-slate-200">14 km/h</b></div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-blue-950/60 border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">AI Weather Insight</span>
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                "Rain probability is projected to increase significantly tomorrow afternoon (+72%). Extreme heat index mitigated by cloud cover."
              </p>
              <div className="pt-2 text-[11px] text-cyan-300 font-bold">XGBoost Ensemble v3.1</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Next 24h Rainfall</span>
                <p className="text-3xl font-extrabold text-cyan-400 mt-2">14.3 mm</p>
                <p className="text-[11px] text-slate-400 mt-1">Expected peak: 3 PM – 6 PM</p>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
                <div className="bg-cyan-400 h-full w-[72%]" />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* A. WHY WEATHERMIND AI */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Why WeatherMind AI</h2>
          <h3 className="text-3xl font-black text-slate-100">Architected for Production Precision</h3>
          <p className="text-xs text-slate-400">Beyond basic API endpoints — comprehensive predictive atmospheric intelligence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-100">Multi-Model ML Pipeline</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trains XGBoost, Random Forest, and PyTorch Deep LSTM models on historical weather vectors with lag feature engineering.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Globe2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-100">Global Micro-Climates</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant geocoding lookup and live satellite observation mapping for over 200,000 cities worldwide.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-100">Anomaly Detection</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated statistical deviation monitoring flags sudden thermal spikes, rainfall surges, and barometric anomalies.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="tech-stack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900 bg-slate-950/40">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Technology Stack</h2>
          <h3 className="text-3xl font-black text-slate-100 mt-2">Built With Modern Microservices</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl glass-panel border border-slate-800">
            <p className="text-sm font-bold text-cyan-400">React + Vite + TS</p>
            <p className="text-[11px] text-slate-400 mt-1">Frontend UI Engine</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-slate-800">
            <p className="text-sm font-bold text-blue-400">Node.js + Express</p>
            <p className="text-[11px] text-slate-400 mt-1">REST API Gateway</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-slate-800">
            <p className="text-sm font-bold text-violet-400">FastAPI + Python</p>
            <p className="text-[11px] text-slate-400 mt-1">ML Inference Microservice</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-slate-800">
            <p className="text-sm font-bold text-emerald-400">MongoDB + Mongoose</p>
            <p className="text-[11px] text-slate-400 mt-1">NoSQL Persistence</p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-900">
        <h2 className="text-3xl font-black text-center text-slate-100 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-5 text-left font-bold text-sm text-slate-200 flex items-center justify-between"
              >
                <span>{f.q}</span>
                <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === i && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/40 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100">Ready to Experience AI Weather Intelligence?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Access real-time weather analytics, 14-day machine learning predictions, and severe weather alert management.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-black text-sm hover:bg-cyan-400 transition-colors shadow-glow-cyan"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};
