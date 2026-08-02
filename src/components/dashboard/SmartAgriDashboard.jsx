import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import FungicideGuideModal from './FungicideGuideModal';
import { AlertTriangle, Power, Database, Monitor, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

export default function SmartAgriDashboard() {
  const {
    pumpStatus,
    pumpLastUpdated,
    handlePumpControl,
    sensorData,
    currentTime,
    setIsFungicideModalOpen
  } = useAgriculture();

  const { soilMoisture, airTemperature, airHumidity } = sensorData;

  return (
    <div className="space-y-8 animate-fadeIn text-[#1C2B1E] dark:text-[#E8F0E9] font-sans pb-12">
      
      {/* 0. Monitor Showcase Teaser Card */}
      <div className="bg-[#FAF8F5] dark:bg-[#152317] border border-[#D2C9B5] dark:border-emerald-900/60 rounded-3xl p-6 shadow-xl overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A27] text-[#D8CCA8] text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-[#3B8A42]" /> Smart Agriculture Control Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1C2B1E] dark:text-[#F0EDE6]">
              Real-Time Field Telemetry & Irrigation
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Autonomous sensors, AI disease recognition, and cloud-connected pump automation for modern precision farming.
            </p>
          </div>

          {/* Desktop Monitor Frame Mockup */}
          <div className="w-full max-w-md bg-white dark:bg-[#1E2B20] p-3 rounded-2xl border-4 border-[#3A453C] shadow-2xl relative">
            <div className="w-full h-3 rounded-t-xl bg-[#2A352C] flex items-center px-2 gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-emerald-950 p-3 text-white space-y-2 text-[10px]">
              <div className="flex justify-between items-center border-b border-emerald-800/50 pb-1">
                <span className="font-bold text-emerald-400">Field Overview: Smart Agriculture</span>
                <span className="text-emerald-300/70">Live Telemetry</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="bg-emerald-900/40 p-1.5 rounded-lg border border-emerald-700/30">
                  <p className="text-gray-400 text-[8px]">Soil Moisture</p>
                  <p className="text-xs font-bold text-red-400">{soilMoisture.value}%</p>
                  <p className="text-[7px] text-red-300">{soilMoisture.status}</p>
                </div>
                <div className="bg-emerald-900/40 p-1.5 rounded-lg border border-emerald-700/30">
                  <p className="text-gray-400 text-[8px]">Air Temp</p>
                  <p className="text-xs font-bold text-green-400">{airTemperature.value}°C</p>
                  <p className="text-[7px] text-green-300">{airTemperature.status}</p>
                </div>
                <div className="bg-emerald-900/40 p-1.5 rounded-lg border border-emerald-700/30">
                  <p className="text-gray-400 text-[8px]">Air Humidity</p>
                  <p className="text-xs font-bold text-[#D8CCA8]">{airHumidity.value}%</p>
                  <p className="text-[7px] text-amber-300">{airHumidity.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#D2C9B5] dark:border-emerald-900/40">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-[#1C2B1E] dark:text-[#F0EDE6]">
            Field Overview: Smart Agriculture Dashboard
          </h2>
        </div>
        <div className="text-xs font-semibold text-[#6E5031] dark:text-[#D8CCA8] bg-[#FAF8F5] dark:bg-[#1E2B20] px-4 py-2 rounded-xl border border-[#D2C9B5] dark:border-emerald-800/40 self-start sm:self-auto shadow-sm">
          Last Updated: <span className="font-bold text-[#1C2B1E] dark:text-white">{currentTime}</span>
        </div>
      </div>

      {/* 2. Sensor Gauges Section (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Gauge 1: Soil Moisture */}
        <div className="bg-white dark:bg-[#1A261C] border-2 border-[#D2C9B5] dark:border-emerald-900/60 rounded-3xl p-6 flex flex-col items-center justify-between space-y-4 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-base font-bold text-[#1C2B1E] dark:text-[#F0EDE6]">
            Soil Moisture
          </h3>

          {/* Semi-Circle SVG Gauge */}
          <div className="relative w-44 h-24 flex items-end justify-center">
            <svg className="w-44 h-44 overflow-visible" viewBox="0 0 100 50">
              {/* Background Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#E5E0D5"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Active Red Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#D93829"
                strokeWidth="10"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 * (1 - (soilMoisture.value / 100))}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute bottom-1 text-center">
              <span className="text-2xl font-black text-[#1C2B1E] dark:text-white">
                {soilMoisture.value}%
              </span>
            </div>
          </div>

          <div className="w-full flex justify-between text-xs text-gray-500 font-semibold px-4 pt-1">
            <span>0</span>
            <span className="text-[#D93829] font-bold text-sm">{soilMoisture.status}</span>
            <span>150</span>
          </div>
        </div>

        {/* Gauge 2: Air Temperature */}
        <div className="bg-white dark:bg-[#1A261C] border-2 border-[#D2C9B5] dark:border-emerald-900/60 rounded-3xl p-6 flex flex-col items-center justify-between space-y-4 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-base font-bold text-[#1C2B1E] dark:text-[#F0EDE6]">
            Air Temperature
          </h3>

          {/* Semi-Circle SVG Gauge */}
          <div className="relative w-44 h-24 flex items-end justify-center">
            <svg className="w-44 h-44 overflow-visible" viewBox="0 0 100 50">
              {/* Background Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#E5E0D5"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Active Green Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#3B8A42"
                strokeWidth="10"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 * (1 - (airTemperature.value / 50))}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute bottom-1 text-center">
              <span className="text-2xl font-black text-[#1C2B1E] dark:text-white">
                {airTemperature.value}°C
              </span>
            </div>
          </div>

          <div className="w-full flex justify-between text-xs text-gray-500 font-semibold px-4 pt-1">
            <span>0</span>
            <span className="text-[#3B8A42] font-bold text-sm">{airTemperature.status}</span>
            <span>150</span>
          </div>
        </div>

        {/* Gauge 3: Air Humidity */}
        <div className="bg-white dark:bg-[#1A261C] border-2 border-[#D2C9B5] dark:border-emerald-900/60 rounded-3xl p-6 flex flex-col items-center justify-between space-y-4 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-base font-bold text-[#1C2B1E] dark:text-[#F0EDE6]">
            Air Humidity
          </h3>

          {/* Circular Ring Gauge */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Outer Ring Background */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#E5E0D5"
                strokeWidth="10"
              />
              {/* Active Ring Arc */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#6E5031"
                strokeWidth="10"
                strokeDasharray="238.7"
                strokeDashoffset={238.7 * (1 - (airHumidity.value / 100))}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-black text-[#1C2B1E] dark:text-white">
                {airHumidity.value}%
              </span>
            </div>
          </div>

          <div className="text-center pt-1">
            <span className="text-[#6E5031] dark:text-[#D8CCA8] font-bold text-sm">{airHumidity.status}</span>
          </div>
        </div>

      </div>

      {/* 3. Second Row: Plant Health Alert & Irrigation Pump Control */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Plant Health Warning */}
        <div className="bg-white dark:bg-[#1A261C] border-2 border-[#D2C9B5] dark:border-emerald-900/60 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg">
          {/* Red Header Banner */}
          <div className="bg-[#B82E2B] text-white py-2 px-4 text-center font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span>WARNING</span>
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <h3 className="text-xl font-bold text-center text-[#1C2B1E] dark:text-[#F0EDE6] font-serif">
              Plant Health
            </h3>

            {/* Plant Leaf Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-[#D2C9B5] shadow-inner max-h-48 group">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                alt="Leaf Spot Disease Detected"
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[#701C1C]/90 text-white text-center py-2 px-3 text-xs font-bold">
                Plant Health: Leaf Spot Detected
              </div>
            </div>

            {/* Recommendation & Guide Trigger */}
            <div className="space-y-3 text-center pt-2">
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase block">Recommendation:</span>
                <p className="text-sm font-bold text-[#1C2B1E] dark:text-white">Apply Copper Fungicide</p>
              </div>

              <button
                onClick={() => setIsFungicideModalOpen(true)}
                className="w-full py-3 px-6 rounded-2xl bg-[#8B5A2B] hover:bg-[#70461F] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>View Fungicide Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Card: Irrigation Control */}
        <div className="bg-white dark:bg-[#1A261C] border-2 border-[#D2C9B5] dark:border-emerald-900/60 rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg">
          {/* Dark Green Header Banner */}
          <div className="bg-[#1E3A27] text-white py-2 px-4 text-center font-bold text-xs uppercase tracking-widest">
            Irrigation Control
          </div>

          <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
            {/* Pump Status Indicator */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#142016] border border-[#D2C9B5] dark:border-emerald-800/40">
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase block">Pump Status:</span>
                <span className={`text-2xl font-black ${pumpStatus === 'ON' ? 'text-[#3B8A42]' : 'text-[#B82E2B]'}`}>
                  {pumpStatus}
                </span>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-colors ${pumpStatus === 'ON' ? 'bg-[#3B8A42] text-white animate-pulse' : 'bg-[#E5E0D5] text-[#1C2B1E]'}`}>
                <Power className="w-8 h-8" />
              </div>
            </div>

            {/* Interactive Control Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handlePumpControl('ON')}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 ${
                  pumpStatus === 'ON'
                    ? 'bg-[#3B8A42] text-white ring-4 ring-[#3B8A42]/30 scale-105'
                    : 'bg-[#3B8A42] hover:bg-[#2D7D32] text-white'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>Start Pump</span>
              </button>

              <button
                onClick={() => handlePumpControl('OFF')}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  pumpStatus === 'OFF'
                    ? 'bg-[#9E9E9E] text-white opacity-90'
                    : 'bg-gray-400 hover:bg-gray-500 text-white'
                }`}
              >
                <span>Stop Pump</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Third Row: System Architecture Explainer ("How Pump Control Works") */}
      <div className="bg-[#FAF8F5] dark:bg-[#162418] border-2 border-[#D2C9B5] dark:border-emerald-900/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-xl font-bold text-center text-[#1C2B1E] dark:text-[#F0EDE6] font-serif">
          How Pump Control Works
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Diagram Flow Columns */}
          <div className="lg:col-span-6 flex flex-wrap items-center justify-center gap-4 text-center">
            
            {/* Step 1: Website Button */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1E2B20] border border-[#D2C9B5] dark:border-emerald-800/40 space-y-2 w-28 flex flex-col items-center shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A27] text-white flex items-center justify-center">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#1C2B1E] dark:text-white leading-tight block">
                Website button
              </span>
            </div>

            <ArrowRight className="w-5 h-5 text-[#8B5A2B] shrink-0 hidden sm:block" />

            {/* Step 2: Cloud Database */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1E2B20] border border-[#D2C9B5] dark:border-emerald-800/40 space-y-2 w-28 flex flex-col items-center shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#E68A00] text-white flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#1C2B1E] dark:text-white leading-tight block">
                Cloud Database
              </span>
            </div>

            <ArrowRight className="w-5 h-5 text-[#8B5A2B] shrink-0 hidden sm:block" />

            {/* Step 3: Irrigation Pump */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1E2B20] border border-[#D2C9B5] dark:border-emerald-800/40 space-y-2 w-28 flex flex-col items-center shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#3B8A42] text-white flex items-center justify-center">
                <Power className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#1C2B1E] dark:text-white leading-tight block">
                Irrigation Pump
              </span>
            </div>

          </div>

          {/* Code Snippet Column: Writes to Firebase */}
          <div className="lg:col-span-6 bg-[#1B281E] text-emerald-300 p-5 rounded-2xl border border-emerald-700/50 shadow-inner font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2 text-[11px]">
              <span className="text-amber-300 font-bold">Writes to Firebase (Realtime Database)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <pre className="text-[11px] leading-relaxed text-gray-200 overflow-x-auto">
{`{
  "PumpControl": {
    "command": "${pumpStatus}",
    "last_updated": "${pumpLastUpdated}",
    "source": "Web Interface"
  }
}`}
            </pre>
          </div>

        </div>
      </div>

      {/* Render Fungicide Guide Modal */}
      <FungicideGuideModal />

    </div>
  );
}
