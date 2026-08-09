import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';

export default function NotificationDropdown({ onClose }) {
  const { notifications, markNotificationRead, alerts, setActivePage } = useAgriculture();

  const recentAlerts = alerts.filter((a) => !a.dismissed).slice(0, 3);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 z-50 rounded-xl overflow-hidden animate-fadeInDown"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)' }}>

        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Notifications</h3>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {/* Recent alerts */}
          {recentAlerts.map((alert) => (
            <button key={alert.id}
              onClick={() => { setActivePage('alerts'); onClose(); }}
              className="w-full text-left px-4 py-3 border-b transition-colors hover:opacity-90"
              style={{
                borderColor: 'var(--color-border-light)',
                background: alert.read ? 'transparent' : 'var(--color-surface-raised)',
              }}>
              <div className="flex items-start gap-3">
                <span className="text-lg">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-text)' }}>{alert.title}</p>
                  <p className="text-[11px] mt-0.5 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{alert.message}</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!alert.read && (
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--color-primary)' }} />
                )}
              </div>
            </button>
          ))}

          {/* Regular notifications */}
          {notifications.map((notif) => (
            <button key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className="w-full text-left px-4 py-3 border-b transition-colors hover:opacity-90"
              style={{
                borderColor: 'var(--color-border-light)',
                background: notif.read ? 'transparent' : 'var(--color-surface-raised)',
              }}>
              <div className="flex items-start gap-3">
                <span className="text-lg">{notif.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>{notif.message}</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-muted)' }}>{notif.time}</p>
                </div>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--color-primary)' }} />
                )}
              </div>
            </button>
          ))}

          {recentAlerts.length === 0 && notifications.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No new notifications</p>
            </div>
          )}
        </div>

        <button onClick={() => { setActivePage('alerts'); onClose(); }}
          className="w-full px-4 py-2.5 text-xs font-semibold text-center transition-colors"
          style={{ color: 'var(--color-primary)', background: 'var(--color-surface-raised)' }}>
          View All Alerts →
        </button>
      </div>
    </>
  );
}
