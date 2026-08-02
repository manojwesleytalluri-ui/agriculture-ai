import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { Camera, AlertTriangle, TrendingUp, Sparkles, Activity, ShieldCheck } from 'lucide-react';

export default function OverviewStats() {
  const { stats, setActiveTab, triggerManualScan, selectedCamera } = useAgriculture();

  const getHealthColor = (score) => {
    if (score >= 90) return 'from-emerald-500 to-green-400 text-emerald-400';
    if (score >= 75) return 'from-green-400 to-lime-400 text-green-400';
    if (score >= 60) return 'from-amber-400 to-yellow-500 text-amber-400';
    return 'from-red-500 to-rose-600 text-red-400';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Crop Health Score Gauge Card */}
      <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md relative overflow-hidden group hover:border-emerald-600/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Overall Crop Health</span>
          <Activity className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="mt-4 flex items-center gap-4">
          {/* Circular Score Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="6"
                className="text-emerald-900/80"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray={163}
                strokeDashoffset={163 - (163 * stats.avgHealthScore) / 100}
                className={getHealthColor(stats.avgHealthScore).split(' ')[2]}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-lg font-extrabold text-white font-serif">{stats.avgHealthScore}</span>
          </div>

          <div>
            <p className="text-xl font-bold font-serif text-white">
              {stats.avgHealthScore >= 85 ? 'Healthy Crop' : stats.avgHealthScore >= 70 ? 'Good Condition' : 'Needs Inspection'}
            </p>
            <p className="text-xs text-emerald-300/80 mt-0.5">
              Based on 4K field camera vision scans
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('vision_scanner')}
          className="mt-4 w-full py-1.5 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/60 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
        >
          <span>View Vision Inspection</span>
          <span>→</span>
        </button>
      </div>

      {/* 2. Active Field Cameras */}
      <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md relative overflow-hidden group hover:border-emerald-600/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Field Cameras 24×7</span>
          <Camera className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-serif">{stats.onlineCameras}</span>
            <span className="text-xs text-emerald-300">/ {stats.totalCameras} Active</span>
          </div>
          <p className="text-xs text-emerald-300/80 mt-1">
            Auto-capturing every 15m - 1 hr
          </p>
        </div>

        <button
          onClick={() => triggerManualScan(selectedCamera.id)}
          className="mt-4 w-full py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-emerald-500/30 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Trigger Live Scan</span>
        </button>
      </div>

      {/* 3. Active Alerts */}
      <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md relative overflow-hidden group hover:border-emerald-600/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">AI Farm Alerts</span>
          <AlertTriangle className={`w-5 h-5 ${stats.activeAlertsCount > 0 ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`} />
        </div>

        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-serif">{stats.activeAlertsCount}</span>
            <span className="text-xs text-amber-300 font-semibold">Active Warnings</span>
          </div>
          <p className="text-xs text-emerald-300/80 mt-1">
            Pest attack & blight detected
          </p>
        </div>

        <button
          onClick={() => setActiveTab('alert_center')}
          className="mt-4 w-full py-1.5 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
        >
          <span>Open Alert Center</span>
          <span>→</span>
        </button>
      </div>

      {/* 4. Estimated Harvest & Yield */}
      <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md relative overflow-hidden group hover:border-emerald-600/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Predicted Yield</span>
          <TrendingUp className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="mt-4">
          <span className="text-2xl font-extrabold text-white font-serif">{stats.predictedYield}</span>
          <p className="text-xs text-emerald-300/80 mt-1">
            Est. Harvest: 45 Days Remaining
          </p>
        </div>

        <button
          onClick={() => setActiveTab('growth_analytics')}
          className="mt-4 w-full py-1.5 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/60 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
        >
          <span>View Yield Forecast</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
