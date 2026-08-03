import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import FungicideGuideModal from './FungicideGuideModal';
import SensorInputModal from './SensorInputModal';
import ImageUploadModal from './ImageUploadModal';
import { AlertTriangle, Power, Database, Monitor, ArrowRight, ShieldAlert, Cpu, Sparkles, Sliders, RotateCcw, Camera } from 'lucide-react';

export default function SmartAgriDashboard() {
  const {
    pumpStatus,
    pumpLastUpdated,
    handlePumpControl,
    sensorData,
    currentTime,
    alerts,
    setIsFungicideModalOpen,
    setIsSensorInputModalOpen,
    setIsImageUploadModalOpen,
    isImageUploadModalOpen,
    resetSensorDataToZero
  } = useAgriculture();

  const { soilMoisture, airTemperature, airHumidity } = sensorData;
  const hasActiveAlert = alerts && alerts.some((a) => a.status === 'Active');

  const activeAlert = alerts && alerts.find((a) => a.status === 'Active');
  const alertTitle = activeAlert ? activeAlert.title : 'Leaf Spot Detected';
  const alertRec = activeAlert ? activeAlert.recommendation : 'Apply Copper Fungicide';

  const moistureDash = `${Math.min(100, Math.max(0, (soilMoisture.value / 150) * 100)) * 1.2566} 125.66`;
  const tempDash = `${Math.min(100, Math.max(0, (airTemperature.value / 150) * 100)) * 1.2566} 125.66`;
  const humidityDash = `${Math.min(100, Math.max(0, (airHumidity.value / 100) * 100)) * 1.2566} 125.66`;

  const jsonText = `{\n  "PumpControl": {\n    "command": "${pumpStatus}",\n    "last_updated": "${pumpLastUpdated}",\n    "source": "Web Interface"\n  }\n}`;

  return (
    <div className="space-y-8 animate-fadeIn font-sans pb-12 text-white">
      
      {/* 1. Header Section with Compact Small Size Layout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#2A4D2E] bg-[#1E3922] p-3.5 sm:p-4 rounded-2xl shadow-md border">
        <div>
          <h2 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-white flex flex-wrap items-center gap-2">
            <span className="bg-[#4D8B43] text-white px-3 py-1 rounded-xl text-xs font-sans font-black uppercase tracking-wider shadow-sm">
              Field Overview
            </span>
            <span className="text-white drop-shadow font-black">
              Smart Agriculture Dashboard
            </span>
          </h2>
        </div>

        {/* Action Controls: Upload Crop Image, Enter Custom Sensor Data, Reset */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setIsImageUploadModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#4D8B43] to-emerald-600 hover:from-[#3E7335] hover:to-emerald-500 text-white font-extrabold text-[11px] uppercase tracking-wider shadow transition-all flex items-center gap-1 hover:scale-105"
            title="Upload a crop photo from camera or file to extract AI data"
          >
            <Camera className="w-3.5 h-3.5 text-white" />
            <span>Upload Image</span>
          </button>

          <button
            onClick={() => setIsSensorInputModalOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-[#274E2B] hover:bg-[#346639] border border-[#3A6B3F] text-white font-extrabold text-[11px] uppercase tracking-wider shadow transition-all flex items-center gap-1 hover:scale-105"
            title="Enter your custom sensor values"
          >
            <Sliders className="w-3 h-3 text-white" />
            <span>Input Data</span>
          </button>

          <button
            onClick={resetSensorDataToZero}
            className="px-2.5 py-1.5 rounded-lg bg-[#A83232] hover:bg-[#8B2525] text-white font-extrabold text-[11px] uppercase tracking-wider shadow transition-all flex items-center gap-1 hover:scale-105"
            title="Clear & Reset all sensor gauges to 0"
          >
            <RotateCcw className="w-3 h-3 text-white" />
            <span>Reset (0)</span>
          </button>

          <div className="text-[11px] font-black text-white bg-[#274E2B] px-2.5 py-1.5 rounded-lg border border-[#4D8B43] shadow flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#85D67A]" />
            <span><strong className="text-white font-black">{currentTime}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Sensor Gauges Section (3 Uniform Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Gauge 1: Soil Moisture */}
        <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between space-y-3 sm:space-y-4 shadow-xl text-white">
          <h3 className="text-base sm:text-lg font-black text-white font-serif bg-[#274E2B] px-3 sm:px-4 py-1.5 rounded-xl w-full text-center shadow-inner border border-[#4D8B43]">
            Soil Moisture
          </h3>

          {/* Semi-Circle SVG Gauge */}
          <div className="relative w-36 h-20 sm:w-44 sm:h-24 flex items-end justify-center">
            <svg className="w-36 h-36 sm:w-44 sm:h-44 overflow-visible" viewBox="0 0 100 50">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#152B18"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {soilMoisture.value > 0 && (
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke={soilMoisture.value < 40 ? "#A83232" : "#4D8B43"}
                  strokeWidth="10"
                  strokeDasharray={moistureDash}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              )}
            </svg>
            <div className="absolute bottom-1 text-center">
              <span className="text-2xl sm:text-3xl font-black text-white drop-shadow">
                {soilMoisture.value}%
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-xs font-bold text-white px-2 sm:px-4 pt-1">
            <span className="text-gray-300">0</span>
            <span className="text-white font-black text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-lg bg-[#A83232] shadow-sm">
              {soilMoisture.status}
            </span>
            <span className="text-gray-300">150</span>
          </div>
        </div>

        {/* Gauge 2: Air Temperature */}
        <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between space-y-3 sm:space-y-4 shadow-xl text-white">
          <h3 className="text-base sm:text-lg font-black text-white font-serif bg-[#274E2B] px-3 sm:px-4 py-1.5 rounded-xl w-full text-center shadow-inner border border-[#4D8B43]">
            Air Temperature
          </h3>

          {/* Semi-Circle SVG Gauge */}
          <div className="relative w-36 h-20 sm:w-44 sm:h-24 flex items-end justify-center">
            <svg className="w-36 h-36 sm:w-44 sm:h-44 overflow-visible" viewBox="0 0 100 50">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#152B18"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {airTemperature.value > 0 && (
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke={airTemperature.value > 35 ? "#A83232" : "#4D8B43"}
                  strokeWidth="10"
                  strokeDasharray={tempDash}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              )}
            </svg>
            <div className="absolute bottom-1 text-center">
              <span className="text-2xl sm:text-3xl font-black text-white drop-shadow">
                {airTemperature.value}°C
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-xs font-bold text-white px-2 sm:px-4 pt-1">
            <span className="text-gray-300">0</span>
            <span className="text-white font-black text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-lg bg-[#38761D] shadow-sm">
              {airTemperature.status}
            </span>
            <span className="text-gray-300">150</span>
          </div>
        </div>

        {/* Gauge 3: Air Humidity */}
        <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between space-y-3 sm:space-y-4 shadow-xl text-white">
          <h3 className="text-base sm:text-lg font-black text-white font-serif bg-[#274E2B] px-3 sm:px-4 py-1.5 rounded-xl w-full text-center shadow-inner border border-[#4D8B43]">
            Air Humidity
          </h3>

          {/* Semi-Circle SVG Gauge */}
          <div className="relative w-36 h-20 sm:w-44 sm:h-24 flex items-end justify-center">
            <svg className="w-36 h-36 sm:w-44 sm:h-44 overflow-visible" viewBox="0 0 100 50">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#152B18"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {airHumidity.value > 0 && (
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#6E441D"
                  strokeWidth="10"
                  strokeDasharray={humidityDash}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              )}
            </svg>
            <div className="absolute bottom-1 text-center">
              <span className="text-2xl sm:text-3xl font-black text-white drop-shadow">
                {airHumidity.value}%
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-xs font-bold text-white px-2 sm:px-4 pt-1">
            <span className="text-gray-300">0</span>
            <span className="text-white font-black text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-lg bg-[#6E441D] shadow-sm">
              {airHumidity.status}
            </span>
            <span className="text-gray-300">100</span>
          </div>
        </div>

      </div>

      {/* 3. Second Row: Plant Health Alert & Irrigation Pump Control */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Plant Health Status */}
        <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl text-white">
          {hasActiveAlert ? (
            <div className="flex flex-col justify-between h-full">
              <div className="bg-[#B82E2B] text-white py-3 px-4 text-center font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md">
                <AlertTriangle className="w-4 h-4 text-amber-200 animate-pulse" />
                <span>WARNING - ACTIVE ALERT</span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-black text-center text-white font-serif">
                  Plant Health Pathology
                </h3>

                <div className="relative rounded-2xl overflow-hidden border-2 border-[#3A6B3F] shadow-inner max-h-48 group">
                  <img
                    src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                    alt="Leaf Spot Disease Detected"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#701C1C]/95 text-white text-center py-2.5 px-3 text-xs font-black tracking-wide">
                    Plant Health: {alertTitle}
                  </div>
                </div>

                <div className="space-y-3 text-center pt-2">
                  <div>
                    <span className="text-xs text-gray-300 font-bold uppercase block tracking-wider">Recommendation:</span>
                    <p className="text-lg font-black text-white">{alertRec}</p>
                  </div>

                  <button
                    onClick={() => setIsFungicideModalOpen(true)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#8B5A2B] hover:bg-[#734B22] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <ShieldAlert className="w-4 h-4 text-white" />
                    <span>View Fungicide Guide</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <div className="bg-[#4D8B43] text-white py-3 px-4 text-center font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md">
                <ShieldAlert className="w-4 h-4 text-white" />
                <span>SYSTEM STATUS: ALL CLEAR</span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-black text-center text-white font-serif">
                  Plant Health Overview
                </h3>

                <div className="relative rounded-2xl overflow-hidden border-2 border-[#3A6B3F] shadow-inner max-h-48 group">
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
                    alt="Healthy Crop Field"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#152B18]/95 text-[#85D67A] text-center py-2.5 px-3 text-xs font-black tracking-wide">
                    Plant Health: Normal (No Active Alerts)
                  </div>
                </div>

                <div className="space-y-3 text-center pt-2">
                  <div>
                    <span className="text-xs text-gray-300 font-bold uppercase block tracking-wider">Status Protocol:</span>
                    <p className="text-sm font-bold text-white">No Pathology Detected. Ready for Input.</p>
                  </div>

                  <button
                    onClick={() => setIsImageUploadModalOpen(true)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#4D8B43] hover:bg-[#3E7335] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Camera className="w-4 h-4 text-white" />
                    <span>Upload Crop Image to Scan</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Card: Irrigation Control */}
        <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl text-white">
          <div className="bg-[#152B18] text-white py-3 px-4 text-center font-black text-xs uppercase tracking-widest shadow-md border-b border-[#2A4D2E]">
            Irrigation Control
          </div>

          <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#152B18] border-2 border-[#3A6B3F]">
              <div>
                <span className="text-xs text-gray-300 font-bold uppercase block tracking-wider">Pump Status:</span>
                <span className={`text-3xl font-black ${pumpStatus === 'ON' ? 'text-[#85D67A]' : 'text-[#FF4D4D]'}`}>
                  {pumpStatus}
                </span>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-colors ${pumpStatus === 'ON' ? 'bg-[#4D8B43] text-white animate-pulse' : 'bg-[#701C1C] text-white'}`}>
                <Power className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => handlePumpControl('ON')}
                className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 ${
                  pumpStatus === 'ON'
                    ? 'bg-[#4D8B43] text-white ring-4 ring-[#4D8B43]/50 scale-105'
                    : 'bg-[#4D8B43] hover:bg-[#3E7335] text-white'
                }`}
              >
                <Power className="w-4 h-4 text-white" />
                <span>Start Pump</span>
              </button>

              <button
                onClick={() => handlePumpControl('OFF')}
                className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  pumpStatus === 'OFF'
                    ? 'bg-[#A83232] text-white shadow-md'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                <span>Stop Pump</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Third Row: System Architecture Explainer */}
      <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
        <h3 className="text-2xl font-black text-center text-white font-serif">
          How Pump Control Works
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-6 flex flex-wrap items-center justify-center gap-4 text-center">
            
            <div className="p-4 rounded-2xl bg-[#152B18] border-2 border-[#3A6B3F] space-y-2 w-28 flex flex-col items-center shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#4D8B43] text-white flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] font-black text-white leading-tight block">
                Website button
              </span>
            </div>

            <ArrowRight className="w-5 h-5 text-[#85D67A] shrink-0 hidden sm:block" />

            <div className="p-4 rounded-2xl bg-[#152B18] border-2 border-[#3A6B3F] space-y-2 w-28 flex flex-col items-center shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#E68A00] text-white flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] font-black text-white leading-tight block">
                Cloud Database
              </span>
            </div>

            <ArrowRight className="w-5 h-5 text-[#85D67A] shrink-0 hidden sm:block" />

            <div className="p-4 rounded-2xl bg-[#152B18] border-2 border-[#3A6B3F] space-y-2 w-28 flex flex-col items-center shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#4D8B43] text-white flex items-center justify-center">
                <Power className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] font-black text-white leading-tight block">
                Irrigation Pump
              </span>
            </div>

          </div>

          <div className="lg:col-span-6 bg-[#152B18] text-[#85D67A] p-5 rounded-2xl border-2 border-[#3A6B3F] shadow-inner font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#2A4D2E] pb-2 text-[11px]">
              <span className="text-white font-bold">Writes to Firebase (Realtime Database)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#85D67A] animate-ping"></span>
            </div>

            <pre className="text-[11px] leading-relaxed text-gray-200 overflow-x-auto">
              {jsonText}
            </pre>
          </div>

        </div>
      </div>

      {/* Render Modals */}
      <FungicideGuideModal />
      <SensorInputModal />
      <ImageUploadModal isOpen={isImageUploadModalOpen} onClose={() => setIsImageUploadModalOpen(false)} />

    </div>
  );
}
