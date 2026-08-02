import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import {
  Camera,
  ShieldCheck,
  Bell,
  Sun,
  Moon,
  User,
  Search,
  Globe,
  Sparkles,
  Layers,
  Menu
} from 'lucide-react';

export default function Navbar({ onMobileMenuClick }) {
  const {
    theme,
    toggleTheme,
    userRole,
    setUserRole,
    stats,
    alerts,
    setActiveTab,
    triggerManualScan,
    selectedCamera
  } = useAgriculture();

  const activeAlerts = alerts.filter((a) => a.status === 'Active').length;

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/80 dark:bg-emerald-950/90 backdrop-blur-md border-b border-emerald-800/40 text-emerald-50 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuClick}
            className="md:hidden p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-900/50 group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5 text-emerald-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-serif tracking-tight text-white">
                  Agriculture<span className="text-emerald-400 font-extrabold">AI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  24×7 Active
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80 font-medium hidden sm:block">
                "AI That Watches Your Crops 24×7."
              </p>
            </div>
          </div>
        </div>

        {/* Center Global Trigger & Quick Stats */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => triggerManualScan(selectedCamera.id)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/40 transition-all hover:scale-102"
          >
            <Sparkles className="w-4 h-4 fill-emerald-950" />
            <span>Trigger 24×7 AI Vision Scan</span>
          </button>

          <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-emerald-900/40 border border-emerald-800/40 text-xs">
            <span className="text-emerald-300">Live Cameras:</span>
            <span className="font-bold text-emerald-100">{stats.onlineCameras}/{stats.totalCameras}</span>
            <span className="text-emerald-700">|</span>
            <span className="text-emerald-300">Avg Health:</span>
            <span className="font-bold text-emerald-400">{stats.avgHealthScore}/100</span>
          </div>
        </div>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Alert Bell */}
          <button
            onClick={() => setActiveTab('alert_center')}
            className="relative p-2 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/60 border border-emerald-700/40 text-emerald-200 transition-colors"
            title="Alert Center"
          >
            <Bell className="w-5 h-5" />
            {activeAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {activeAlerts}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/60 border border-emerald-700/40 text-emerald-200 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-emerald-200" />}
          </button>

          {/* User Role Selector */}
          <div className="relative">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="appearance-none bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/50 text-emerald-100 text-xs font-semibold rounded-xl px-3 py-2 pr-7 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="Farmer" className="bg-emerald-950 text-emerald-100">Farmer Mode</option>
              <option value="Agronomist" className="bg-emerald-950 text-emerald-100">Agronomist Expert</option>
              <option value="Super Admin" className="bg-emerald-950 text-emerald-100">Super Admin</option>
            </select>
            <User className="w-3.5 h-3.5 text-emerald-300 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

        </div>

      </div>
    </header>
  );
}
