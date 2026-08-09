import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import {
  LayoutDashboard, Home, Sprout, BrainCircuit, HeartPulse, Camera, AlertTriangle,
  Cpu, Network, UserCircle, Info, Settings, X, Leaf
} from 'lucide-react';

export default function SidebarNavigation({ isOpen, onClose }) {
  const { activePage, setActivePage, sensorStatus, fieldHealthStatus, dataSource } = useAgriculture();

  const navSections = [
    {
      title: 'Main',
      items: [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'field_monitoring', label: 'Field Monitoring', icon: Sprout },
      ],
    },
    {
      title: 'Intelligence',
      items: [
        { id: 'ai_insights', label: 'AI Insights', icon: BrainCircuit },
        { id: 'crop_health', label: 'Crop Health', icon: HeartPulse },
        { id: 'crop_vision', label: 'AI Crop Vision', icon: Camera },
      ],
    },
    {
      title: 'System',
      items: [
        { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
        { id: 'sensor_management', label: 'Sensor Management', icon: Cpu },
        { id: 'architecture', label: 'Architecture', icon: Network },
      ],
    },
    {
      title: 'Account',
      items: [
        { id: 'farmer_profile', label: 'Farmer Profile', icon: UserCircle },
        { id: 'about', label: 'About', icon: Info },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      )}

      <aside className={`fixed lg:sticky top-0 lg:top-16 left-0 z-50 lg:z-10 h-screen lg:h-[calc(100vh-4rem)] w-64 overflow-y-auto transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`} style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}>

        {/* Mobile Close + Brand */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Agriculture AI</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg" style={{ color: 'var(--color-text-muted)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 space-y-5">
          {/* Status Widget */}
          <div className="p-3.5 rounded-xl" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-light)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>System Status</span>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22C55E' }} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>Sensors</span>
                <p className="font-bold" style={{ color: 'var(--color-text)' }}>{sensorStatus.online}/{sensorStatus.total}</p>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)' }}>Health</span>
                <p className="font-bold" style={{ color: 'var(--color-text)' }}>{fieldHealthStatus.icon} {fieldHealthStatus.label}</p>
              </div>
            </div>
            {dataSource === 'DEMO' && (
              <div className="mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full text-center"
                style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber)' }}>
                Demo Mode Active
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] font-bold uppercase tracking-widest px-3 mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                {section.title}
              </p>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button key={item.id}
                      onClick={() => { setActivePage(item.id); if (onClose) onClose(); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: isActive ? 'var(--color-primary)' : 'transparent',
                        color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                      }}>
                      <Icon className="w-4 h-4 shrink-0" style={{ opacity: isActive ? 1 : 0.7 }} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 mt-auto border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-[10px] font-medium" style={{ color: 'var(--color-text-muted)' }}>Agriculture AI v1.0</p>
          <p className="text-[9px] mt-0.5" style={{ color: 'var(--color-primary)' }}>IoT Smart Farming Platform</p>
        </div>
      </aside>
    </>
  );
}
