import React from 'react';

export default function ResponsiveGaugeCard({ title, value, unit, status, min, max, color }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const dashLength = (pct / 100) * 125.66;

  return (
    <div className="bg-[#1E3922] border-2 border-[#3A6B3F] rounded-[20px] p-4 sm:p-5 flex flex-col items-center justify-between shadow-xl text-white w-full transition-all">
      
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-black text-white font-serif bg-[#274E2B] px-4 py-1.5 rounded-xl w-full text-center shadow-inner border border-[#4D8B43] tracking-wide">
        {title}
      </h3>

      {/* Gauge Container with clamp fluid sizing */}
      <div className="relative flex flex-col items-center justify-center my-2 sm:my-3 w-full" style={{ maxWidth: 'clamp(180px, 55vw, 260px)' }}>
        
        {/* SVG Semicircle */}
        <svg className="w-full h-auto overflow-visible" viewBox="0 0 100 58">
          {/* Background Arc */}
          <path
            d="M 10 46 A 40 40 0 0 1 90 46"
            fill="none"
            stroke="#152B18"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Active Arc - Clockwise Left to Right */}
          {value > 0 && (
            <path
              d="M 10 46 A 40 40 0 0 1 90 46"
              fill="none"
              stroke={color}
              strokeWidth="9"
              strokeDasharray={`${dashLength} 125.66`}
              strokeDashoffset="0"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          )}

          {/* Center Value Readout inside SVG */}
          <text
            x="50"
            y="37"
            textAnchor="middle"
            className="fill-white text-[19px] font-extrabold font-sans"
            style={{ fontWeight: 900 }}
          >
            {value}{unit}
          </text>

          {/* Min Label aligned at X=10 */}
          <text
            x="10"
            y="56"
            textAnchor="middle"
            className="fill-gray-300 text-[8px] font-bold"
          >
            {min}
          </text>

          {/* Max Label aligned at X=90 */}
          <text
            x="90"
            y="56"
            textAnchor="middle"
            className="fill-gray-300 text-[8px] font-bold"
          >
            {max}
          </text>
        </svg>

        {/* Status Badge - Positioned directly below value */}
        <div className="-mt-1 sm:mt-0">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-black text-white shadow-md transition-all text-center"
            style={{ backgroundColor: color }}
          >
            {status}
          </span>
        </div>

      </div>

    </div>
  );
}
