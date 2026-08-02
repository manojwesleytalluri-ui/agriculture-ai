import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { ShieldAlert, X, CheckCircle, Info, Droplet, AlertTriangle, FileText } from 'lucide-react';

export default function FungicideGuideModal() {
  const { isFungicideModalOpen, setIsFungicideModalOpen } = useAgriculture();

  if (!isFungicideModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF8F5] dark:bg-[#1E2B20] text-[#1C2B1E] dark:text-[#E8F0E9] border-2 border-[#8B5A2B] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Header Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-[#8B5A2B]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B5A2B] text-white flex items-center justify-center shadow-md">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1C2B1E] dark:text-[#F0EDE6] font-serif">
                Copper Fungicide Treatment Guide
              </h2>
              <p className="text-xs text-[#8B5A2B] dark:text-[#D8CCA8] font-semibold">
                Target: Leaf Spot Disease (Septoria / Early Blight)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFungicideModalOpen(false)}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-black dark:hover:text-white" />
          </button>
        </div>

        {/* Diagnosis Summary */}
        <div className="p-4 rounded-2xl bg-[#FFF5E6] dark:bg-[#2A3A2D] border border-[#E6B800]/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#B82E2B] shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-[#701C1C] dark:text-[#F8B4B4]">
              High Risk Alert: Leaf Spot Symptoms Confirmed
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Camera 1 detected brown necrotic spots with yellow halos on lower foliage. Copper Octanoate spray is recommended immediately to protect healthy canopy growth.
            </p>
          </div>
        </div>

        {/* Treatment Protocol Steps */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C2B1E] dark:text-[#D8CCA8] flex items-center gap-2">
            <Droplet className="w-4 h-4 text-[#3B8A42]" /> Application Protocol & Dosage
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#162218] border border-[#D2C9B5] dark:border-emerald-900/50 space-y-1">
              <span className="font-bold text-[#8B5A2B]">Mixing Ratio</span>
              <p className="font-semibold text-base text-[#1C2B1E] dark:text-white">1.5 to 2.0 fl. oz</p>
              <p className="text-gray-500 dark:text-gray-400">per gallon of clean water</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#162218] border border-[#D2C9B5] dark:border-emerald-900/50 space-y-1">
              <span className="font-bold text-[#8B5A2B]">Frequency</span>
              <p className="font-semibold text-base text-[#1C2B1E] dark:text-white">Every 7 to 10 Days</p>
              <p className="text-gray-500 dark:text-gray-400">Repeat until spots subside</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#162218] border border-[#D2C9B5] dark:border-emerald-900/50 space-y-2">
            <span className="text-xs font-bold text-[#1C2B1E] dark:text-[#D8CCA8] block">Step-by-Step Instructions:</span>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#3B8A42] shrink-0 mt-0.5" />
                <span>Spray early in the morning before full sun exposure to avoid leaf scorching.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#3B8A42] shrink-0 mt-0.5" />
                <span>Thoroughly coat both upper and lower leaf surfaces until liquid drips slightly off tips.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#3B8A42] shrink-0 mt-0.5" />
                <span>Pause drip irrigation pump for 2 hours post-spray to allow chemical bonding.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#8B5A2B]/30">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Info className="w-4 h-4 text-[#8B5A2B]" />
            <span>Organic Certified Liquid Copper Fungicide</span>
          </div>

          <button
            onClick={() => setIsFungicideModalOpen(false)}
            className="px-6 py-2.5 rounded-full bg-[#8B5A2B] hover:bg-[#70461F] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
}
