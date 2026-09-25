import React, { useState, useEffect } from 'react';
import { Shield, Users, Activity, BrainCircuit, AlertTriangle, RefreshCw, CheckCircle, Server, Database, Cpu } from 'lucide-react';
import { WeatherAPI } from '../services/apiService';

export const AdminDashboardPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    WeatherAPI.getAdminStats()
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading system metrics and admin logs...</p>
      </div>
    );
  }

  const { stats, users, predictionLogs } = data;

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-100">System Admin Control Center</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs border border-amber-500/30">
              Admin Mode
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Platform health, prediction logs, user management, & microservice status</p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Users</span>
          <span className="text-xl font-black text-slate-100 block">{stats.totalUsers.toLocaleString()}</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Today</span>
          <span className="text-xl font-black text-cyan-400 block">{stats.activeUsersToday.toLocaleString()}</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">API Requests</span>
          <span className="text-xl font-black text-blue-400 block">{stats.totalApiRequests.toLocaleString()}</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Forecast Requests</span>
          <span className="text-xl font-black text-violet-400 block">{stats.totalForecastsGenerated.toLocaleString()}</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">ML Predictions</span>
          <span className="text-xl font-black text-emerald-400 block">{stats.mlModelPredictions.toLocaleString()}</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Alerts</span>
          <span className="text-xl font-black text-amber-400 block">{stats.activeAlertsCount}</span>
        </div>

      </div>

      {/* Microservices Health Widget */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
          Infrastructure Microservice Telemetry
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="font-bold text-slate-200">Node Express Server</p>
                <p className="text-[10px] text-slate-400">Port 5000 • Latency: {stats.systemHealth.apiLatencyMs}ms</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">Healthy</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-5 h-5 text-violet-400" />
              <div>
                <p className="font-bold text-slate-200">Python FastAPI AI</p>
                <p className="text-[10px] text-slate-400">Port 8000 • XGBoost / PyTorch</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">Healthy</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-amber-400" />
              <div>
                <p className="font-bold text-slate-200">MongoDB Database</p>
                <p className="text-[10px] text-slate-400">CPU: {stats.systemHealth.cpuUsagePercent}% | Mem: {stats.systemHealth.memoryUsagePercent}%</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">Healthy</span>
          </div>
        </div>
      </div>

      {/* Prediction Execution Logs */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
          Recent ML Model Prediction Execution Logs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-[10px] font-extrabold uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Location</th>
                <th className="p-3">Metric</th>
                <th className="p-3">Model</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Latency</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {predictionLogs.map((log: any) => (
                <tr key={log.id} className="hover:bg-slate-900/40">
                  <td className="p-3 text-slate-400 text-[11px]">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className="p-3 text-slate-100 font-bold font-sans">{log.location}</td>
                  <td className="p-3 text-cyan-400">{log.metric}</td>
                  <td className="p-3 text-slate-300 font-sans">{log.model}</td>
                  <td className="p-3 text-emerald-400 font-bold">{log.confidence}</td>
                  <td className="p-3 text-slate-400">{log.executionTimeMs}ms</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registered Users Management Table */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
          User Management Directory
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-[10px] font-extrabold uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Primary Location</th>
                <th className="p-3">Joined</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-100">{u.name}</td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">{u.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-300'}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{u.location}</td>
                  <td className="p-3 text-slate-400 text-[11px]">{u.registeredAt}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
