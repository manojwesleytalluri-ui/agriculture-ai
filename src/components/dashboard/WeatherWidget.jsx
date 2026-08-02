import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { CloudSun, Droplets, Wind, Sun, CloudRain, ShieldAlert } from 'lucide-react';

export default function WeatherWidget() {
  const { weather } = useAgriculture();

  return (
    <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-amber-400" />
          <h3 className="font-serif font-bold text-base text-white">Weather & Sensor Intelligence</h3>
        </div>
        <span className="text-xs text-emerald-300/80">Updated 5 mins ago</span>
      </div>

      {/* Main Temperature & Sensor Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/30">
          <span className="text-[11px] text-emerald-300 uppercase font-semibold">Temperature</span>
          <p className="text-2xl font-extrabold text-white font-serif mt-1">{weather.currentTemp}°C</p>
          <span className="text-[10px] text-emerald-400 font-medium">{weather.condition}</span>
        </div>

        <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/30">
          <span className="text-[11px] text-emerald-300 uppercase font-semibold">Humidity</span>
          <p className="text-2xl font-extrabold text-white font-serif mt-1">{weather.humidity}%</p>
          <span className="text-[10px] text-emerald-400 font-medium">Optimal range</span>
        </div>

        <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/30">
          <span className="text-[11px] text-emerald-300 uppercase font-semibold">Soil Moisture</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-serif mt-1">{weather.soilMoistureAvg}%</p>
          <span className="text-[10px] text-emerald-300/80 font-medium">Field A1 & B2 Sensor</span>
        </div>

        <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/30">
          <span className="text-[11px] text-emerald-300 uppercase font-semibold">Solar Rad / UV</span>
          <p className="text-2xl font-extrabold text-amber-300 font-serif mt-1">{weather.solarRadiationWm2} <span className="text-xs font-normal">W/m²</span></p>
          <span className="text-[10px] text-amber-400 font-medium">UV Index {weather.uvIndex}</span>
        </div>
      </div>

      {/* 7-Day Mini Forecast */}
      <div>
        <h4 className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">7-Day Rain Forecast</h4>
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {weather.forecast.map((f, idx) => (
            <div key={idx} className="p-2 rounded-xl bg-emerald-900/30 border border-emerald-800/20 space-y-1">
              <span className="text-[11px] text-emerald-200 font-medium block">{f.day}</span>
              <CloudRain className="w-4 h-4 text-emerald-300 mx-auto" />
              <span className="text-[11px] text-white font-bold block">{f.tempMax}°</span>
              <span className={`text-[9px] font-semibold block ${f.rainChance > 50 ? 'text-amber-400 font-bold' : 'text-emerald-400'}`}>
                {f.rainChance}% rain
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Advisories */}
      {weather.advisories.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-emerald-800/30">
          {weather.advisories.map((adv) => (
            <div key={adv.id} className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-200">{adv.title}</h5>
                <p className="text-[11px] text-amber-300/80 mt-0.5 leading-relaxed">{adv.advice}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
