import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { MapPin, Camera, Navigation, Layers, Battery, Sun, Wifi, Sparkles, Plus } from 'lucide-react';
import CameraRegistrationModal from '../camera/CameraRegistrationModal';

export default function FarmMapViewer() {
  const { cameras, selectedCameraId, setSelectedCameraId, setActiveTab, selectedCamera } = useAgriculture();
  const [activeFarmFilter, setActiveFarmFilter] = useState('All');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const hasCameras = cameras.length > 0 && selectedCamera && selectedCamera.id;
  const selectedCam = selectedCamera;

  if (!hasCameras) {
    return (
      <div className="p-12 text-center rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-400">
          <MapPin className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-lg text-white">No Interactive Farm Map Nodes Yet</h3>
          <p className="text-xs text-emerald-300/80 max-w-sm mx-auto mt-1">
            Register your first camera to view satellite field boundary overlays and geospatial camera pins.
          </p>
        </div>
        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Register Camera Now</span>
        </button>

        {showRegisterModal && <CameraRegistrationModal onClose={() => setShowRegisterModal(false)} />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <span>Interactive Farm & Camera Map View</span>
          </h2>
          <p className="text-xs text-emerald-300/80 mt-1">
            Geospatial camera nodes, field boundary coordinates, and coverage direction vectors
          </p>
        </div>

        {/* Register Button */}
        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Register Camera</span>
        </button>
      </div>

      {/* Map + Drawer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Interactive SVG Map Canvas */}
        <div className="lg:col-span-8 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-3">
          
          <div className="flex items-center justify-between text-xs text-emerald-300">
            <span className="font-semibold uppercase tracking-wider">Geospatial Satellite & Field Boundary Overlay</span>
            <span className="font-mono">LAT: {selectedCam.gps?.lat ? selectedCam.gps.lat.toFixed(4) : '17.3850'}° N • LON: {selectedCam.gps?.lng ? selectedCam.gps.lng.toFixed(4) : '78.4866'}° E</span>
          </div>

          {/* Interactive SVG Farm Field Map */}
          <div className="relative h-96 sm:h-[480px] rounded-xl overflow-hidden bg-gradient-to-br from-emerald-950 via-green-950 to-emerald-950 border border-emerald-700/50 p-6 flex items-center justify-center">
            
            {/* Satellite Grid Texture Effect */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <svg viewBox="0 0 800 500" className="w-full h-full relative z-10">
              
              {/* Field Boundaries */}
              <g className="group cursor-pointer">
                <polygon
                  points="50,50 750,60 720,440 60,420"
                  fill="#064e3b"
                  fillOpacity="0.6"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4"
                  className="group-hover:fill-emerald-800 transition-colors"
                />
                <text x="400" y="240" fill="#a7f3d0" fontSize="18" fontWeight="bold" textAnchor="middle">
                  {selectedCam.farm || 'My Farm'} • {selectedCam.field || 'Field A'}
                </text>
                <text x="400" y="270" fill="#6ee7b7" fontSize="13" textAnchor="middle">
                  Crop: {selectedCam.crop} ({selectedCam.cropVariety})
                </text>
              </g>

              {/* Camera Nodes */}
              {cameras.map((cam, idx) => {
                const coords = [
                  { x: 400, y: 180 },
                  { x: 250, y: 320 },
                  { x: 550, y: 320 },
                  { x: 400, y: 380 }
                ][idx] || { x: 300 + (idx * 60), y: 200 };

                const isSelected = cam.id === selectedCameraId;

                return (
                  <g
                    key={cam.id}
                    onClick={() => setSelectedCameraId(cam.id)}
                    className="cursor-pointer group"
                  >
                    {/* View Cone Vector */}
                    <path
                      d={`M ${coords.x} ${coords.y} L ${coords.x - 30} ${coords.y + 40} L ${coords.x + 30} ${coords.y + 40} Z`}
                      fill={cam.status === 'Online' ? '#10b981' : '#f59e0b'}
                      fillOpacity="0.3"
                    />

                    {/* Camera Node Circle */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isSelected ? '16' : '12'}
                      fill={cam.status === 'Online' ? '#10b981' : '#f59e0b'}
                      stroke="#ffffff"
                      strokeWidth="3"
                      className="transition-all transform group-hover:scale-125"
                    />

                    {isSelected && (
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="24"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}

                    <text
                      x={coords.x}
                      y={coords.y - 20}
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="extrabold"
                      textAnchor="middle"
                      className="drop-shadow-md font-mono"
                    >
                      {cam.id}
                    </text>
                  </g>
                );
              })}

            </svg>

            <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md p-2.5 rounded-xl text-[11px] text-emerald-200 space-y-1">
              <span className="font-bold text-white block">Legend</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Active Node</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Warning Node</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right 4 Cols: Selected Camera Drawer Info */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Camera Node Drawer</span>
            <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-mono text-[10px] font-bold">
              {selectedCam.id}
            </span>
          </div>

          <div className="relative h-44 rounded-xl overflow-hidden border border-emerald-700/40 bg-black">
            {selectedCam.imageUrl ? (
              <img src={selectedCam.imageUrl} alt={selectedCam.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-emerald-400 text-xs">No Image</div>
            )}
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 text-white text-xs font-bold font-serif">
              {selectedCam.name}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-emerald-900/60 text-emerald-200">
              <span>Farm Name:</span>
              <strong className="text-white">{selectedCam.farm}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-emerald-900/60 text-emerald-200">
              <span>Field & Crop:</span>
              <strong className="text-white">{selectedCam.field} ({selectedCam.crop})</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-emerald-900/60 text-emerald-200">
              <span>Battery & Solar:</span>
              <strong className="text-emerald-400">{selectedCam.battery}% {selectedCam.solarCharging ? '(Solar Charging)' : ''}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-emerald-900/60 text-emerald-200">
              <span>Health Score:</span>
              <strong className={selectedCam.healthScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
                {selectedCam.healthScore}/100
              </strong>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('vision_scanner')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4 fill-emerald-950" />
            <span>Open AI Vision Inspector</span>
          </button>

        </div>

      </div>

      {showRegisterModal && <CameraRegistrationModal onClose={() => setShowRegisterModal(false)} />}

    </div>
  );
}
