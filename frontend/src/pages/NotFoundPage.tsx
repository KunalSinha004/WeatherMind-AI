import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6 px-4">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-4xl font-black shadow-glow-cyan">
        404
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-black text-slate-100">Page Not Found</h1>
        <p className="text-xs text-slate-400">
          The requested atmospheric coordinate or page does not exist in our telemetry index.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Link
          to="/dashboard"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 flex items-center gap-2 shadow-glow-cyan"
        >
          <Home className="w-4 h-4" /> Go to Dashboard
        </Link>
        <Link
          to="/search"
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs hover:border-slate-700 flex items-center gap-2"
        >
          <Search className="w-4 h-4" /> Search Cities
        </Link>
      </div>
    </div>
  );
};
