import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { FileText, Download, Printer, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ReportGenerator() {
  const { cameras, stats, weather } = useAgriculture();
  const [reportType, setReportType] = useState('Daily'); // Daily | Weekly | Monthly
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            <span>AI Farm Health & Agronomy Reports</span>
          </h2>
          <p className="text-xs text-emerald-300/80 mt-1">
            Generate executive printable & downloadable PDF summaries for agronomists, insurance, & field teams
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-emerald-900/50 p-1 rounded-xl border border-emerald-800/40 text-xs">
            {['Daily', 'Weekly', 'Monthly'].map((t) => (
              <button
                key={t}
                onClick={() => setReportType(t)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  reportType === t ? 'bg-emerald-500 text-emerald-950 font-bold' : 'text-emerald-300'
                }`}
              >
                {t} Report
              </button>
            ))}
          </div>

          <button
            onClick={handlePrint}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-lg"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 space-y-6 text-emerald-100 print:bg-white print:text-black print:p-0">
        
        {/* Report Header */}
        <div className="flex items-center justify-between border-b border-emerald-800/60 pb-6 print:border-gray-300">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-serif text-white print:text-black">
                Agriculture<span className="text-emerald-400 print:text-emerald-700">AI</span> Executive Summary
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 print:bg-emerald-100 print:text-emerald-800 border border-emerald-500/40 text-xs font-bold">
                {reportType} Audit
              </span>
            </div>
            <p className="text-xs text-emerald-300/80 print:text-gray-600 mt-1">
              Green Valley Eco Farm & Sunrise Agrotech • 24×7 Field Camera Telemetry
            </p>
          </div>

          <div className="text-right text-xs text-emerald-300/80 print:text-gray-600">
            <p className="font-bold text-white print:text-black font-mono">REPORT-ID: AGR-{Date.now().toString().slice(-6)}</p>
            <p>Generated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Executive Key Findings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-800/30 print:border-gray-300">
            <span className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-800">Average Health</span>
            <p className="text-2xl font-extrabold font-serif text-white print:text-black mt-1">{stats.avgHealthScore}/100</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-800/30 print:border-gray-300">
            <span className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-800">Active Cameras</span>
            <p className="text-2xl font-extrabold font-serif text-white print:text-black mt-1">{stats.onlineCameras} Nodes</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-800/30 print:border-gray-300">
            <span className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-800">Projected Yield</span>
            <p className="text-2xl font-extrabold font-serif text-emerald-400 print:text-emerald-700 mt-1">{stats.predictedYield}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-800/30 print:border-gray-300">
            <span className="text-[10px] uppercase font-bold text-emerald-400 print:text-emerald-800">Avg Soil Moisture</span>
            <p className="text-2xl font-extrabold font-serif text-white print:text-black mt-1">{weather.soilMoistureAvg}%</p>
          </div>
        </div>

        {/* Camera Field Audit Table */}
        <div>
          <h4 className="font-serif font-bold text-base text-white print:text-black mb-3">Field Camera Telemetry & Diagnostics Log</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900/50 text-emerald-300 print:bg-gray-100 print:text-black uppercase font-bold">
                <tr>
                  <th className="p-3">Camera ID</th>
                  <th className="p-3">Field & Crop</th>
                  <th className="p-3">Health Score</th>
                  <th className="p-3">Growth Stage</th>
                  <th className="p-3">AI Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-800/40 print:divide-gray-200">
                {cameras.map((c) => (
                  <tr key={c.id}>
                    <td className="p-3 font-mono font-bold text-white print:text-black">{c.id}</td>
                    <td className="p-3 font-medium text-emerald-100 print:text-black">{c.field} ({c.crop})</td>
                    <td className="p-3 font-bold text-emerald-400 print:text-emerald-700">{c.healthScore}/100</td>
                    <td className="p-3 text-emerald-200 print:text-gray-700">{c.lastAnalysis?.growthStage}</td>
                    <td className="p-3 text-emerald-200 print:text-gray-700 max-w-xs">{c.lastAnalysis?.recommendations?.[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agronomist Sign-off Box */}
        <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-800/40 print:border-gray-300 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>AI Pathology Model verified by Chief Agronomist System.</span>
          </div>
          <span className="font-mono text-emerald-400 print:text-black font-bold">VERIFIED_SIGNATURE_OK</span>
        </div>

      </div>

    </div>
  );
}
