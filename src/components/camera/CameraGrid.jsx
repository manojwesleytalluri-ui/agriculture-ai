import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { Camera, Battery, Sun, Wifi, Sparkles, Plus, RefreshCw, AlertTriangle, ShieldCheck, Trash2 } from 'lucide-react';
import CameraRegistrationModal from './CameraRegistrationModal';

export default function CameraGrid() {
  const { cameras, selectedCameraId, setSelectedCameraId, triggerManualScan, deleteCamera, setActiveTab, isScanning } = useAgriculture();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
            <Camera className="w-6 h-6 text-emerald-400" />
            <span>24×7 Field Camera Telemetry</span>
          </h2>
          <p className="text-xs text-emerald-300/80 mt-1">
            Automated hourly field capture & AI pathology stream across all active fields
          </p>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-transform active:scale-98"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Register New Camera</span>
        </button>
      </div>

      {/* Grid of Cameras or Empty State */}
      {cameras.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cameras.map((cam) => {
            const isSelected = cam.id === selectedCameraId;
            return (
              <div
                key={cam.id}
                className={`rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl shadow-emerald-950/80'
                    : 'bg-emerald-950/50 border-emerald-800/40 hover:border-emerald-700/60'
                }`}
              >
                <div className="relative h-56 sm:h-64 bg-emerald-950 overflow-hidden group">
                  {cam.imageUrl ? (
                    <img
                      src={cam.imageUrl}
                      alt={cam.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-900/40 text-emerald-400 text-xs">
                      No Image Signal
                    </div>
                  )}

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold tracking-wider font-mono">
                        {cam.id}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase backdrop-blur-md flex items-center gap-1.5 bg-emerald-500/80 text-emerald-950">
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
                        {cam.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-emerald-200 text-[11px] font-medium">
                      <Battery className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{cam.battery}%</span>
                      {cam.solarCharging && <Sun className="w-3.5 h-3.5 text-amber-400" />}
                      <Wifi className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent p-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                        {cam.farm} • {cam.field}
                      </span>
                      <h3 className="text-base font-serif font-bold text-white">{cam.name}</h3>
                      <p className="text-xs text-emerald-200/80">Crop: {cam.crop} ({cam.cropVariety})</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-emerald-300 block">Health Score</span>
                      <span className="text-xl font-serif font-extrabold text-emerald-400">
                        {cam.healthScore}/100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-800/20">
                      <span className="text-[10px] text-emerald-400 block font-semibold">Capture Interval</span>
                      <span className="text-white font-medium">{cam.captureInterval}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-800/20">
                      <span className="text-[10px] text-emerald-400 block font-semibold">Resolution</span>
                      <span className="text-white font-medium">{cam.resolution}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        setSelectedCameraId(cam.id);
                        setActiveTab('vision_scanner');
                      }}
                      className="flex-1 py-2 rounded-xl bg-emerald-800/60 hover:bg-emerald-700/80 text-emerald-100 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Inspect AI Vision Pipeline</span>
                    </button>

                    <button
                      onClick={() => triggerManualScan(cam.id)}
                      disabled={isScanning}
                      className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                      <span>Scan</span>
                    </button>

                    <button
                      onClick={() => deleteCamera(cam.id)}
                      className="p-2 rounded-xl bg-[#A83232] hover:bg-[#8B2525] text-white transition-colors shadow"
                      title="Delete Image Card"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-400">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-white">No Field Cameras Registered</h3>
            <p className="text-xs text-emerald-300/80 max-w-sm mx-auto mt-1">
              All demo data has been cleared. Register your first camera to start monitoring your field with AI.
            </p>
          </div>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Register Your First Camera</span>
          </button>
        </div>
      )}

      {showRegisterModal && <CameraRegistrationModal onClose={() => setShowRegisterModal(false)} />}

    </div>
  );
}
