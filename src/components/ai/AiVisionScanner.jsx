import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import {
  Scan,
  Sparkles,
  Eye,
  Layers,
  Flame,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  FileCheck,
  Zap,
  CheckCircle2,
  Camera,
  Plus
} from 'lucide-react';
import ComparisonSlider from './ComparisonSlider';
import CameraRegistrationModal from '../camera/CameraRegistrationModal';

export default function AiVisionScanner() {
  const {
    selectedCamera,
    cameras,
    setSelectedCameraId,
    triggerManualScan,
    isScanning,
    scanProgress
  } = useAgriculture();

  const [overlayMode, setOverlayMode] = useState('bounding_box');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const hasCameras = cameras.length > 0 && selectedCamera && selectedCamera.id;
  const analysis = selectedCamera.lastAnalysis || {};
  const issues = analysis.detectedIssues || [];

  if (!hasCameras) {
    return (
      <div className="p-12 text-center rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-400">
          <Scan className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-lg text-white">No Field Camera Registered for AI Scan</h3>
          <p className="text-xs text-emerald-300/80 max-w-sm mx-auto mt-1">
            Please register your first camera to inspect plant pathology, disease bounding boxes, and canopy heatmaps.
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
      
      {/* Header & Camera Dropdown Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
            <Scan className="w-6 h-6 text-emerald-400" />
            <span>AI Computer Vision Inspector</span>
          </h2>
          <p className="text-xs text-emerald-300/80 mt-1">
            4K plant pathology segmentation, disease bounding boxes, and severity heatmaps
          </p>
        </div>

        {/* Camera Selector & Trigger */}
        <div className="flex items-center gap-3">
          <select
            value={selectedCamera.id}
            onChange={(e) => setSelectedCameraId(e.target.value)}
            className="bg-emerald-900/60 border border-emerald-700/60 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {cameras.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.name} ({c.crop})
              </option>
            ))}
          </select>

          <button
            onClick={() => triggerManualScan(selectedCamera.id)}
            disabled={isScanning}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-transform disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Trigger AI Vision Scan'}</span>
          </button>
        </div>
      </div>

      {/* Main Vision Inspector View & Diagnostics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Cols: Image Canvas with Overlays */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-3">
            
            {/* Mode Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40 pb-3">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Vision Pipeline View</span>

              <div className="flex items-center gap-1.5 bg-emerald-900/40 p-1 rounded-xl border border-emerald-800/30 text-xs">
                <button
                  onClick={() => setOverlayMode('original')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    overlayMode === 'original' ? 'bg-emerald-500 text-emerald-950 font-bold' : 'text-emerald-300 hover:bg-emerald-800/40'
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => setOverlayMode('bounding_box')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    overlayMode === 'bounding_box' ? 'bg-emerald-500 text-emerald-950 font-bold' : 'text-emerald-300 hover:bg-emerald-800/40'
                  }`}
                >
                  Bounding Boxes
                </button>
                <button
                  onClick={() => setOverlayMode('heatmap')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    overlayMode === 'heatmap' ? 'bg-emerald-500 text-emerald-950 font-bold' : 'text-emerald-300 hover:bg-emerald-800/40'
                  }`}
                >
                  Disease Heatmap
                </button>
                <button
                  onClick={() => setOverlayMode('segmentation')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    overlayMode === 'segmentation' ? 'bg-emerald-500 text-emerald-950 font-bold' : 'text-emerald-300 hover:bg-emerald-800/40'
                  }`}
                >
                  Canopy Mask
                </button>
              </div>
            </div>

            {/* Interactive Image Frame */}
            <div className="relative h-80 sm:h-[420px] rounded-xl overflow-hidden bg-black border border-emerald-700/50 group">
              {selectedCamera.imageUrl ? (
                <img
                  src={selectedCamera.imageUrl}
                  alt={selectedCamera.name}
                  className={`w-full h-full object-cover transition-filter duration-300 ${
                    overlayMode === 'segmentation' ? 'hue-rotate-90 saturate-200 contrast-125' : ''
                  }`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-900/40 text-emerald-400 text-xs">
                  No Image Stream
                </div>
              )}

              {/* Bounding Box Overlays */}
              {overlayMode === 'bounding_box' && issues.map((issue, idx) => {
                const box = issue.boundingBox || { x: 30, y: 30, w: 35, h: 30 };
                return (
                  <div
                    key={idx}
                    className="absolute border-2 border-amber-400 bg-amber-500/20 rounded shadow-lg shadow-amber-500/50 animate-pulse pointer-events-none"
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.w}%`,
                      height: `${box.h}%`
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-amber-500 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                      {issue.name} ({issue.confidence})
                    </div>
                  </div>
                );
              })}

              {/* Heatmap Overlay */}
              {overlayMode === 'heatmap' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/30 to-red-600/50 mix-blend-color-dodge pointer-events-none animate-pulse">
                  <div className="absolute top-1/3 left-1/3 w-36 h-36 rounded-full bg-red-500/40 blur-xl"></div>
                </div>
              )}

              {/* Scanning Active Overlay Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-900 border border-emerald-400 flex items-center justify-center animate-bounce shadow-xl shadow-emerald-500/30">
                    <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-white">Executing AI Computer Vision Pipeline</h4>
                    <p className="text-xs text-emerald-300 mt-1">{scanProgress?.stepName}</p>
                  </div>
                  <div className="w-64 h-2 rounded-full bg-emerald-950 overflow-hidden border border-emerald-700/50">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-green-300 transition-all duration-300"
                      style={{ width: `${scanProgress?.progressPercent || 0}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Image Metadata Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-black/75 backdrop-blur-md text-[11px] text-emerald-200 font-mono">
                <span>LAT: {selectedCamera.gps?.lat ? selectedCamera.gps.lat.toFixed(4) : '17.3850'}° N</span>
                <span>HEIGHT: {selectedCamera.heightMeters || 4}m</span>
                <span>RES: {selectedCamera.resolution || '4K'}</span>
                <span className="text-emerald-400 font-bold">100% ENCRYPTED</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-emerald-300/80 px-1">
              <span>Field: <strong>{selectedCamera.field}</strong></span>
              <span>Last Analysis: <strong>{analysis.timestamp ? new Date(analysis.timestamp).toLocaleTimeString() : 'Recent'}</strong></span>
            </div>

          </div>

        </div>

        {/* Right 5 Cols: AI Diagnostics & Actionable Recommendations */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Diagnostic Card */}
          <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">AI Crop Pathology Report</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  selectedCamera.healthScore >= 80
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                Health: {selectedCamera.healthScore}/100 ({analysis.overallHealth})
              </span>
            </div>

            {/* Growth & Canopy Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-800/20">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold">Growth Stage</span>
                <p className="text-xs font-bold text-white mt-1">{analysis.growthStage || 'Seedling'}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-800/20">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold">Canopy Density</span>
                <p className="text-xs font-bold text-white mt-1">{analysis.canopyCoverage || '0%'} ({analysis.leafCountEstimated || 0} leaves)</p>
              </div>
            </div>

            {/* Detected Pathology Issues */}
            <div>
              <h4 className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">Detected Pathology Issues</h4>
              
              {issues.length > 0 ? (
                <div className="space-y-2.5">
                  {issues.map((issue, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs text-amber-200 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          {issue.name}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                          {issue.confidence} Confidence
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-amber-200/80">
                        <div>Type: <strong className="text-white">{issue.type}</strong></div>
                        <div>Affected: <strong className="text-white">{issue.affectedArea}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-900/30 border border-emerald-700/30 flex items-center gap-3 text-xs text-emerald-200">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h5 className="font-bold text-emerald-100">Zero Disease Pathology Detected</h5>
                    <p className="text-[11px] text-emerald-300/80 mt-0.5">Leaves show optimal chlorophyll green balance without chlorosis or leaf spot lesions.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actionable AI Recommendations */}
            <div>
              <h4 className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">Targeted Action Protocol</h4>
              <div className="space-y-2 text-xs">
                {analysis.recommendations?.map((rec, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-emerald-900/40 border border-emerald-800/30 flex items-start gap-2 text-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Multi-Temporal Comparison Slider Section */}
      {selectedCamera.historyImages && selectedCamera.historyImages.length > 0 && (
        <ComparisonSlider historyImages={selectedCamera.historyImages} />
      )}

      {showRegisterModal && <CameraRegistrationModal onClose={() => setShowRegisterModal(false)} />}

    </div>
  );
}
