import React, { useState } from 'react';
import { Calendar, ArrowRightLeft } from 'lucide-react';

export default function ComparisonSlider({ historyImages }) {
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(historyImages.length > 1 ? 1 : 0);

  if (!historyImages || historyImages.length === 0) return null;

  const imgA = historyImages[indexA] || historyImages[0];
  const imgB = historyImages[indexB] || historyImages[0];

  return (
    <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 backdrop-blur-md space-y-4">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
          <h3 className="font-serif font-bold text-base text-white">Multi-Temporal Growth Comparison</h3>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-300 font-medium">Image A:</span>
            <select
              value={indexA}
              onChange={(e) => setIndexA(Number(e.target.value))}
              className="bg-emerald-900/60 border border-emerald-700/60 text-white rounded-lg px-2 py-1 focus:outline-none"
            >
              {historyImages.map((img, idx) => (
                <option key={idx} value={idx}>
                  {img.date} ({img.score}/100)
                </option>
              ))}
            </select>
          </div>

          <span className="text-emerald-600 font-bold">vs</span>

          <div className="flex items-center gap-1.5">
            <span className="text-emerald-300 font-medium">Image B:</span>
            <select
              value={indexB}
              onChange={(e) => setIndexB(Number(e.target.value))}
              className="bg-emerald-900/60 border border-emerald-700/60 text-white rounded-lg px-2 py-1 focus:outline-none"
            >
              {historyImages.map((img, idx) => (
                <option key={idx} value={idx}>
                  {img.date} ({img.score}/100)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side by side comparison grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left Side A */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-400 font-mono">{imgA.date}</span>
            <span className="text-emerald-200">Health Score: <strong className="text-white">{imgA.score}/100</strong></span>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden border border-emerald-700/40 bg-black">
            {imgA.url ? (
              <img src={imgA.url} alt={imgA.date} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-emerald-400 text-xs">No Image</div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] text-white font-mono">
              CAPTURE_A
            </div>
          </div>
        </div>

        {/* Right Side B */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-400 font-mono">{imgB.date}</span>
            <span className="text-emerald-200">Health Score: <strong className="text-white">{imgB.score}/100</strong></span>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden border border-emerald-700/40 bg-black">
            {imgB.url ? (
              <img src={imgB.url} alt={imgB.date} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-emerald-400 text-xs">No Image</div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] text-white font-mono">
              CAPTURE_B
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
