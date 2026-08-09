import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { AlertTriangle, Check, Eye, X, Filter } from 'lucide-react';

export default function AlertsPage() {
  const { alerts, markAlertRead, dismissAlert, setActivePage } = useAgriculture();
  const [filter, setFilter] = useState('all');

  const filteredAlerts = alerts.filter((a) => {
    if (a.dismissed) return false;
    if (filter === 'all') return true;
    if (filter === 'unread') return !a.read;
    return a.severity === filter;
  });

  const severityStyles = {
    critical: { bg: 'var(--color-red-bg)', border: 'var(--color-red)', color: 'var(--color-red)', label: '🔴 Critical' },
    warning: { bg: 'var(--color-amber-bg)', border: 'var(--color-amber)', color: 'var(--color-amber)', label: '🟡 Warning' },
    info: { bg: 'var(--color-blue-bg)', border: 'var(--color-blue)', color: 'var(--color-blue)', label: '🔵 Info' },
  };

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'critical', label: '🔴 Critical' },
    { id: 'warning', label: '🟡 Warning' },
    { id: 'info', label: '🟢 Info' },
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            <AlertTriangle className="w-6 h-6" style={{ color: 'var(--color-amber)' }} /> Alerts
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {alerts.filter((a) => !a.read && !a.dismissed).length} unread alerts
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5">
        {filterOptions.map((opt) => (
          <button key={opt.id} onClick={() => setFilter(opt.id)}
            className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
            style={{
              background: filter === opt.id ? 'var(--color-primary)' : 'var(--color-surface)',
              color: filter === opt.id ? '#fff' : 'var(--color-text-secondary)',
              border: `1px solid ${filter === opt.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
            }}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="space-y-2">
        {filteredAlerts.length === 0 && (
          <div className="card p-8 text-center">
            <span className="text-3xl">✅</span>
            <p className="text-sm font-medium mt-2" style={{ color: 'var(--color-text)' }}>No alerts to show</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>All systems are operating normally.</p>
          </div>
        )}

        {filteredAlerts.map((alert) => {
          const style = severityStyles[alert.severity] || severityStyles.info;
          return (
            <div key={alert.id} className="card p-4 transition-all"
              style={{
                borderLeft: `3px solid ${style.border}`,
                background: alert.read ? 'var(--color-surface)' : style.bg,
              }}>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{alert.title}</h4>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                      style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{alert.message}</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {!alert.read && (
                    <button onClick={() => markAlertRead(alert.id)} title="Mark as read"
                      className="p-1.5 rounded-lg transition-colors hover:opacity-80"
                      style={{ background: 'var(--color-surface-raised)', color: 'var(--color-primary)' }}>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button onClick={() => dismissAlert(alert.id)} title="Dismiss"
                    className="p-1.5 rounded-lg transition-colors hover:opacity-80"
                    style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-muted)' }}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
