import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { Settings, ShieldCheck, Database, Sliders, Bell, Cpu, Save, RotateCcw, CheckCircle2, User, Moon, Sun } from 'lucide-react';

export default function FarmSettings() {
  const {
    userRole,
    setUserRole,
    theme,
    toggleTheme,
    resetSensorDataToZero,
    sensorData,
    updateCustomSensorData
  } = useAgriculture();

  const [farmName, setFarmName] = useState('Green Horizon Smart Organic Estate');
  const [fieldLocation, setFieldLocation] = useState('Cotopaxi Volcano Valley / Mysuru District');
  const [samplingRate, setSamplingRate] = useState('Every 15 Minutes');
  const [autoPumpThreshold, setAutoPumpThreshold] = useState('35');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans pb-12 text-white">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#2A4D2E] bg-[#1E3922] p-5 rounded-3xl shadow-lg border">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white flex items-center gap-3">
            <span className="bg-[#4D8B43] text-white px-3.5 py-1.5 rounded-2xl text-sm font-sans font-black uppercase tracking-wider shadow-md">
              <Settings className="w-4 h-4 inline mr-1" /> System
            </span>
            <span className="text-white drop-shadow-lg font-black">
              Farm & Sensor Settings
            </span>
          </h2>
          <p className="text-xs text-gray-200 mt-1 font-medium">
            Configure telemetry sampling frequencies, threshold alerts, and cloud hardware connections
          </p>
        </div>

        {isSaved && (
          <div className="px-4 py-2 rounded-2xl bg-[#4D8B43] text-white font-bold text-xs flex items-center gap-2 animate-fadeIn shadow-md">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Farm Identity & Telemetry Thresholds */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Farm & Field Information */}
          <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#85D67A] font-serif font-bold text-sm border-b border-[#2A4D2E] pb-3">
              <Cpu className="w-5 h-5 text-[#4D8B43]" />
              <span>Farm Profile & Location</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-200 mb-1">Farm Name</label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full bg-[#152B18] border border-[#3A6B3F] rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-[#4D8B43]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-200 mb-1">Field Coordinates / Location</label>
                <input
                  type="text"
                  value={fieldLocation}
                  onChange={(e) => setFieldLocation(e.target.value)}
                  className="w-full bg-[#152B18] border border-[#3A6B3F] rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-[#4D8B43]"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Telemetry & Irrigation Threshold Rules */}
          <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#85D67A] font-serif font-bold text-sm border-b border-[#2A4D2E] pb-3">
              <Sliders className="w-5 h-5 text-[#4D8B43]" />
              <span>Automated Irrigation & Alert Thresholds</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-200 mb-1">Auto-Irrigation Low Moisture Trigger (%)</label>
                <input
                  type="number"
                  min="5"
                  max="90"
                  value={autoPumpThreshold}
                  onChange={(e) => setAutoPumpThreshold(e.target.value)}
                  className="w-full bg-[#152B18] border border-[#3A6B3F] rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-[#4D8B43]"
                />
                <p className="text-[11px] text-gray-300 mt-1">
                  When Soil Moisture drops below {autoPumpThreshold}%, system triggers automated warning alert.
                </p>
              </div>

              <div>
                <label className="block font-bold text-gray-200 mb-1">Telemetry Sensor Sampling Rate</label>
                <select
                  value={samplingRate}
                  onChange={(e) => setSamplingRate(e.target.value)}
                  className="w-full bg-[#152B18] border border-[#3A6B3F] rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-[#4D8B43]"
                >
                  <option value="Every 5 Minutes">Every 5 Minutes (High Precision)</option>
                  <option value="Every 15 Minutes">Every 15 Minutes (Balanced - Recommended)</option>
                  <option value="Every 1 Hour">Every 1 Hour (Eco Power Saver)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Hardware Connection & User Profile Settings */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 3: Firebase Realtime Hardware Stream */}
          <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#85D67A] font-serif font-bold text-sm border-b border-[#2A4D2E] pb-3">
              <Database className="w-5 h-5 text-[#4D8B43]" />
              <span>Firebase Realtime Hardware Relay</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#152B18] border border-[#2A4D2E] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Firebase Database URL</span>
                  <span className="text-[11px] text-gray-300 font-mono">https://smart-agri-telemetry-default-rtdb.firebaseio.com</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#4D8B43] text-white text-[10px] font-bold">CONNECTED</span>
              </div>

              <div className="p-3 rounded-xl bg-[#152B18] border border-[#2A4D2E] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Irrigation Pump Relay GPIO</span>
                  <span className="text-[11px] text-gray-300 font-mono">GPIO_PIN_17 (Solid State Relay 10A)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#4D8B43] text-white text-[10px] font-bold">READY</span>
              </div>
            </div>
          </div>

          {/* Card 4: Role & Theme Controls */}
          <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#85D67A] font-serif font-bold text-sm border-b border-[#2A4D2E] pb-3">
              <User className="w-5 h-5 text-[#4D8B43]" />
              <span>User Mode & System Theme</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-200 mb-1">Operating Role Mode</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full bg-[#152B18] border border-[#3A6B3F] rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-[#4D8B43]"
                >
                  <option value="Farmer">Farmer Mode (Simplified Dashboard)</option>
                  <option value="Agronomist">Agronomist Expert (Pathology Heatmaps)</option>
                  <option value="Super Admin">Super Admin (Hardware Overrides)</option>
                </select>
              </div>

              <div className="pt-2 border-t border-[#2A4D2E] flex items-center justify-between">
                <button
                  type="button"
                  onClick={resetSensorDataToZero}
                  className="px-4 py-2.5 rounded-xl bg-[#A83232] hover:bg-[#8B2525] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Sensor Values (0)</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4D8B43] hover:bg-[#3E7335] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
