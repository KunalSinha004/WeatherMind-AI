import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { HourlyPoint } from '../types';
import { useTheme } from '../context/ThemeContext';

export const HourlyChart: React.FC<{ data: HourlyPoint[] }> = ({ data }) => {
  const { tempUnit } = useTheme();

  const chartData = data.map(item => ({
    ...item,
    tempDisplay: tempUnit === 'fahrenheit' ? Math.round((item.temp * 9) / 5 + 32) : item.temp
  }));

  const symbol = tempUnit === 'fahrenheit' ? '°F' : '°C';

  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            24-Hour Forecast Trend
          </h3>
          <p className="text-xs text-slate-400">Hourly temperature and rain probability projection</p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-slate-300">Temperature ({symbol})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-slate-300">Rain Prob (%)</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />

            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '12px',
                color: '#f8fafc',
                fontSize: '12px'
              }}
              formatter={(value: any, name: any) => [
                name === 'tempDisplay' ? `${value}${symbol}` : `${value}%`,
                name === 'tempDisplay' ? 'Temperature' : 'Rain Probability'
              ]}
            />

            <Area
              type="monotone"
              dataKey="tempDisplay"
              stroke="#06b6d4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#tempGradient)"
            />
            <Area
              type="monotone"
              dataKey="rainProb"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#rainGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
