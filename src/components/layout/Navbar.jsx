import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import {
  Bell,
  User,
  Sparkles,
  Menu,
  Leaf
} from 'lucide-react';

export default function Navbar({ onMobileMenuClick }) {
  const {
    userRole,
    setUserRole,
    alerts,
    setActiveTab,
    triggerManualScan,
    selectedCamera
  } = useAgriculture();

  const activeAlerts = alerts.filter((a) => a.status === 'Active').length;

  return (
    <header className="sticky top-0 z-40 bg-[#1E3922] text-white border-b border-[#2A4D2E] px-3 sm:px-5 py-1.5 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left Brand Identity */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onMobileMenuClick}
            className="md:hidden p-1.5 rounded-lg bg-[#274E2B] text-white hover:bg-[#346639]"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4D8B43] to-[#274E2B] flex items-center justify-center shadow group-hover:scale-105 transition-transform">
              <Leaf className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold font-serif tracking-tight text-white leading-none">
                  Smart <span className="text-[#85D67A]">Agriculture</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#274E2B] text-[#D5CAAD] border border-[#3A6B3F] text-[10px] font-semibold leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4D8B43] animate-ping"></span>
                  24×7 Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Global Trigger & Quick Stats */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => triggerManualScan(selectedCamera?.id || 'cam-1')}
            className="px-3 py-1 rounded-lg bg-[#4D8B43] hover:bg-[#3E7335] text-white font-bold text-[11px] flex items-center gap-1.5 shadow transition-all hover:scale-102"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>Trigger AI Vision Telemetry</span>
          </button>

          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#152B18] border border-[#2A4D2E] text-[11px]">
            <span className="text-[#D5CAAD]">Live Sensors:</span>
            <span className="font-bold text-white">Online</span>
            <span className="text-[#2A4D2E]">|</span>
            <span className="text-[#D5CAAD]">Health Score:</span>
            <span className="font-bold text-[#85D67A]">94/100</span>
          </div>
        </div>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Alert Bell */}
          <button
            onClick={() => setActiveTab('alert_center')}
            className="relative p-1.5 rounded-lg bg-[#274E2B] hover:bg-[#346639] border border-[#3A6B3F] text-white transition-colors shrink-0"
            title="Alert Center"
          >
            <Bell className="w-4 h-4" />
            {activeAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A83232] text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                {activeAlerts}
              </span>
            )}
          </button>

          {/* User Role Selector */}
          <div className="relative">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="appearance-none bg-[#274E2B] hover:bg-[#346639] border border-[#3A6B3F] text-white text-[10px] sm:text-[11px] font-semibold rounded-lg px-2 sm:px-2.5 py-1 pr-5 sm:pr-6 cursor-pointer focus:outline-none max-w-[110px] sm:max-w-none truncate"
            >
              <option value="Farmer" className="bg-[#1E3922] text-white">Farmer Mode</option>
              <option value="Agronomist" className="bg-[#1E3922] text-white">Agronomist Expert</option>
              <option value="Super Admin" className="bg-[#1E3922] text-white">Super Admin</option>
            </select>
            <User className="w-3 h-3 text-[#D5CAAD] absolute right-1.5 sm:right-2 top-2 pointer-events-none" />
          </div>

        </div>

      </div>
    </header>
  );
}
