import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import {
  LayoutDashboard,
  Sprout,
  Activity,
  Power,
  AlertTriangle,
  FileText,
  Settings,
  Leaf
} from 'lucide-react';

export default function SidebarNavigation({ isOpen, onClose }) {
  const { activeTab, setActiveTab, alerts, isScanning, scanProgress } = useAgriculture();

  const activeAlerts = alerts.filter((a) => a.status === 'Active').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'field_status', label: 'Field Status', icon: Sprout },
    { id: 'sensors', label: 'Sensors', icon: Activity },
    { id: 'pump_control', label: 'Pump Control', icon: Power },
    { id: 'alert_center', label: 'Alerts', icon: AlertTriangle, count: activeAlerts },
    { id: 'reports', label: 'Logs', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#1E3A27] border-r border-[#2C5237] text-[#E8F0E9] flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">
          
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 px-2 py-2 border-b border-[#2C5237]">
            <div className="w-10 h-10 rounded-2xl bg-[#3B8A42] text-white flex items-center justify-center shadow-md">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-white tracking-wide">
                Smart Agriculture
              </h2>
              <span className="text-[10px] text-[#D8CCA8] uppercase font-semibold">
                AI Farm Telemetry
              </span>
            </div>
          </div>

          {/* Quick AI Scanner Widget */}
          <div className="p-3.5 rounded-2xl bg-[#14261A] border border-[#2C5237] shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B8A42]">Field Telemetry</span>
              <span className="w-2 h-2 rounded-full bg-[#3B8A42] animate-ping"></span>
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
              <p className="text-xs text-[#D8CCA8]/80 font-light leading-relaxed">
                Autonomous 24×7 crop monitoring active. Pump ready.
              </p>
            )}
          </div>

          {/* Navigation Links matching mockup */}
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
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-[#14261A] text-[#D8CCA8] border-l-4 border-[#3B8A42] font-bold shadow-md'
                      : 'hover:bg-[#2A4C34] text-[#E8F0E9]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#3B8A42]' : 'text-[#D8CCA8]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#B82E2B] text-white text-[10px] font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#2C5237] text-center text-[11px] text-[#D8CCA8]/70">
          <p className="font-serif">Smart Agriculture Platform</p>
          <p className="mt-0.5">Firebase Connected</p>
        </div>
      </aside>
    </>
  );
}
