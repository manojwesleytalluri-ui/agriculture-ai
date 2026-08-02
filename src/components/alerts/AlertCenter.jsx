import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { AlertTriangle, ShieldCheck, CheckCircle, Filter } from 'lucide-react';

export default function AlertCenter() {
  const { alerts, resolveAlert } = useAgriculture();
  const [filter, setFilter] = useState('Active'); // 'Active' | 'Resolved' | 'All'

  const filteredAlerts = filter === 'All'
    ? alerts
    : alerts.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span>AI Risk & Alert Center</span>
          </h2>
          <p className="text-xs text-emerald-300/80 mt-1">
            Real-time disease detection alerts, hardware telemetry errors, and weather risk advisories
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-emerald-900/50 p-1.5 rounded-xl border border-emerald-800/40 text-xs">
          <button
            onClick={() => setFilter('Active')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === 'Active' ? 'bg-amber-500 text-amber-950 font-bold' : 'text-emerald-300 hover:bg-emerald-800/40'
            }`}
          >
            Active Warnings ({alerts.filter((a) => a.status === 'Active').length})
          </button>
          <button
            onClick={() => setFilter('Resolved')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === 'Resolved' ? 'bg-emerald-500 text-emerald-950 font-bold' : 'text-emerald-300 hover:bg-emerald-800/40'
            }`}
          >
            Resolved ({alerts.filter((a) => a.status === 'Resolved').length})
          </button>
          <button
            onClick={() => setFilter('All')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === 'All' ? 'bg-emerald-500 text-emerald-950 font-bold' : 'text-emerald-300 hover:bg-emerald-800/40'
            }`}
          >
            All Logs ({alerts.length})
          </button>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                alert.status === 'Resolved'
                  ? 'bg-emerald-950/30 border-emerald-900/40 opacity-70'
                  : alert.severity === 'Critical'
                  ? 'bg-red-950/40 border-red-500/40 shadow-lg shadow-red-950/30'
                  : 'bg-amber-950/40 border-amber-500/40 shadow-lg shadow-amber-950/30'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    alert.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif font-bold text-base text-white">{alert.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        alert.severity === 'Critical'
                          ? 'bg-red-500/30 text-red-300 border border-red-500/40'
                          : 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {alert.severity} Priority
                    </span>
                  </div>

                  <p className="text-xs text-emerald-200/80 leading-relaxed">{alert.description}</p>

                  <div className="flex items-center gap-3 text-[11px] text-emerald-400 pt-1 font-mono">
                    <span>Camera: {alert.cameraName}</span>
                    <span>•</span>
                    <span>Field: {alert.field}</span>
                    <span>•</span>
                    <span>Logged: {alert.timestamp}</span>
                  </div>
                </div>
              </div>

              {alert.status === 'Active' ? (
                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold text-xs shrink-0 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Mark Resolved</span>
                </button>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-emerald-900/60 text-emerald-300 text-xs font-bold shrink-0">
                  Resolved
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 space-y-2">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-serif font-bold text-base text-white">No active warnings in this filter</h4>
            <p className="text-xs text-emerald-400/80">All field cameras report optimal conditions.</p>
          </div>
        )}
      </div>

    </div>
  );
}
