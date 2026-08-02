import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { TrendingUp, Award, Calendar, BarChart2, Zap } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  BarChart,
  Bar
} from 'recharts';

export default function GrowthAnalytics() {
  const { selectedCamera, cameras } = useAgriculture();

  const currentHealth = selectedCamera?.healthScore || 0;

  const growthTimelineData = [
    { day: 'Day 5', health: 95, canopy: 15, heightCm: 8, water: 80 },
    { day: 'Day 15', health: 92, canopy: 30, heightCm: 18, water: 75 },
    { day: 'Day 25', health: 88, canopy: 48, heightCm: 32, water: 70 },
    { day: 'Day 35', health: 84, canopy: 62, heightCm: 46, water: 65 },
    { day: 'Day 45 (Today)', health: currentHealth, canopy: 74, heightCm: 58, water: 68 },
    { day: 'Day 55 (Est)', health: 90, canopy: 85, heightCm: 72, water: 75 },
    { day: 'Day 65 (Est)', health: 92, canopy: 92, heightCm: 85, water: 80 },
    { day: 'Day 80 (Harvest)', health: 94, canopy: 96, heightCm: 95, water: 60 }
  ];

  const yieldData = cameras.length > 0
    ? cameras.map((c) => ({
        field: c.field,
        estimatedTons: Math.round(c.healthScore * 0.05 * 10) / 10,
        targetTons: Math.round((c.healthScore * 0.05 + 0.5) * 10) / 10
      }))
    : [{ field: 'No Field Data', estimatedTons: 0, targetTons: 0 }];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <span>Growth Trend & Yield Forecasting AI</span>
        </h2>
        <p className="text-xs text-emerald-300/80 mt-1">
          Predictive yield estimation, canopy coverage progression, and water consumption telemetry
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md">
          <span className="text-[11px] font-semibold uppercase text-emerald-400">Total Harvest Readiness</span>
          <p className="text-2xl font-extrabold font-serif text-white mt-1">52% Completed</p>
          <span className="text-[11px] text-emerald-300/80">Est. Harvest Window: Sep 15 - Sep 22</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md">
          <span className="text-[11px] font-semibold uppercase text-emerald-400">Projected Farm Production</span>
          <p className="text-2xl font-extrabold font-serif text-emerald-400 mt-1">
            {cameras.length > 0 ? '25.9 Tons Total' : 'Pending Camera Data'}
          </p>
          <span className="text-[11px] text-emerald-300/80">+8.4% compared to last season</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md">
          <span className="text-[11px] font-semibold uppercase text-emerald-400">AI Confidence Rating</span>
          <p className="text-2xl font-extrabold font-serif text-amber-300 mt-1">94.8% Accurate</p>
          <span className="text-[11px] text-emerald-300/80">Validated against 4K vision captures</span>
        </div>
      </div>

      {/* Main Chart 1: Crop Growth & Canopy Area Chart */}
      <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-white">Crop Health & Canopy Density Timeline</h3>
            <p className="text-xs text-emerald-300/80">Historical tracking & AI projected progression up to harvest</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span> Health Score
            </span>
            <span className="flex items-center gap-1.5 text-lime-300">
              <span className="w-3 h-3 rounded-full bg-lime-400 inline-block"></span> Canopy Coverage %
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="canopyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A3E635" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#A3E635" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#064E3B" />
              <XAxis dataKey="day" stroke="#A7F3D0" fontSize={11} />
              <YAxis stroke="#A7F3D0" fontSize={11} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#022C22', borderColor: '#059669', borderRadius: '12px', color: '#FFF' }}
              />
              <Area type="monotone" dataKey="health" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#healthGrad)" />
              <Area type="monotone" dataKey="canopy" stroke="#A3E635" strokeWidth={2} fillOpacity={1} fill="url(#canopyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid Chart 2 & 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Field Yield Estimation Bar Chart */}
        <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
          <h3 className="font-serif font-bold text-base text-white">Yield Estimation per Field (Tons/Acre)</h3>
          
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064E3B" />
                <XAxis dataKey="field" stroke="#A7F3D0" fontSize={10} />
                <YAxis stroke="#A7F3D0" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#022C22', borderColor: '#059669', borderRadius: '12px', color: '#FFF' }}
                />
                <Bar dataKey="estimatedTons" fill="#10B981" radius={[6, 6, 0, 0]} name="Estimated Yield" />
                <Bar dataKey="targetTons" fill="#047857" radius={[6, 6, 0, 0]} name="Target Potential" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Height & Water Telemetry Line Chart */}
        <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
          <h3 className="font-serif font-bold text-base text-white">Plant Height (cm) & Soil Moisture Tracking</h3>
          
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064E3B" />
                <XAxis dataKey="day" stroke="#A7F3D0" fontSize={11} />
                <YAxis stroke="#A7F3D0" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#022C22', borderColor: '#059669', borderRadius: '12px', color: '#FFF' }}
                />
                <Line type="monotone" dataKey="heightCm" stroke="#38BDF8" strokeWidth={3} name="Height (cm)" />
                <Line type="monotone" dataKey="water" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" name="Soil Moisture %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
