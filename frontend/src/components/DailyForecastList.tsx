import React from 'react';
import { DailyPoint } from '../types';
import { useTheme } from '../context/ThemeContext';
import { CloudRain, Wind } from 'lucide-react';

export const DailyForecastList: React.FC<{ daily: DailyPoint[] }> = ({ daily }) => {
  const { tempUnit } = useTheme();

  const convertTemp = (c: number) => {
    if (tempUnit === 'fahrenheit') {
      return Math.round((c * 9) / 5 + 32);
    }
    return Math.round(c);
  };

  const symbol = tempUnit === 'fahrenheit' ? '°F' : '°C';

  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            7-Day Weather Outlook
          </h3>
          <p className="text-xs text-slate-400">Daily forecast summary and precipitation outlook</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {daily.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border text-center transition-all duration-200 hover:-translate-y-1 ${
              idx === 0
                ? 'bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-500/40 shadow-glow-cyan'
                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-bold text-slate-300 block">{item.dayName}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{item.date.slice(5)}</span>

            <div className="text-3xl my-3">{item.icon}</div>

            <p className="text-[11px] font-medium text-slate-300 truncate">{item.condition}</p>

            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2">
              <span className="text-sm font-extrabold text-slate-100">
                {convertTemp(item.maxTemp)}{symbol}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {convertTemp(item.minTemp)}{symbol}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-cyan-400">
              <CloudRain className="w-3 h-3" />
              <span>{item.rainProb}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
