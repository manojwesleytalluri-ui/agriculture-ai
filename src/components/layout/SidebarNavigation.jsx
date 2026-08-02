import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import {
  LayoutDashboard,
  Camera,
  Scan,
  TrendingUp,
  Map,
  AlertTriangle,
  FileText,
  Sparkles,
  CheckSquare
} from 'lucide-react';

export default function SidebarNavigation({ isOpen, onClose }) {
  const { activeTab, setActiveTab, alerts, isScanning, scanProgress } = useAgriculture();

  const activeAlerts = alerts.filter((a) => a.status === 'Active').length;

  const navItems = [
    { id: 'dashboard', label: 'Farmer Dashboard', icon: LayoutDashboard },
    { id: 'cameras', label: 'Field Cameras 24×7', icon: Camera, badge: '4 Live' },
    { id: 'vision_scanner', label: 'AI Vision Inspector', icon: Scan, highlight: true },
    { id: 'growth_analytics', label: 'Growth & Yield AI', icon: TrendingUp },
    { id: 'map_view', label: 'Interactive Farm Map', icon: Map },
    { id: 'alert_center', label: 'Alert Center', icon: AlertTriangle, count: activeAlerts },
    { id: 'reports', label: 'AI Health Reports', icon: FileText }
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-emerald-950/95 border-r border-emerald-800/40 text-emerald-100 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">
          
          {/* Quick AI Status banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-900/80 to-emerald-950 border border-emerald-700/50 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">AI Vision Engine</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            {isScanning ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-emerald-200">
                  <span className="animate-pulse">{scanProgress?.stepName || 'Scanning...'}</span>
                  <span>{scanProgress?.progressPercent || 0}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-emerald-950 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-green-300 transition-all duration-300"
                    style={{ width: `${scanProgress?.progressPercent || 0}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-emerald-300/80 font-light leading-relaxed">
                Autonomous 24×7 crop monitoring active. Next camera upload in 12 mins.
              </p>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-emerald-950 font-bold shadow-md shadow-emerald-950/50'
                      : 'hover:bg-emerald-900/60 text-emerald-200/90'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-950' : 'text-emerald-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 text-[10px] font-semibold">
                      {item.badge}
                    </span>
                  )}

                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-emerald-800/40 text-center text-[11px] text-emerald-400/60">
          <p className="font-serif">Agriculture AI Platform v4.2</p>
          <p className="mt-0.5">Connected to 4 Field Cameras</p>
        </div>
      </aside>
    </>
  );
}
