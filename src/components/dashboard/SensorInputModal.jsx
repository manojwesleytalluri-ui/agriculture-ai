import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { Sliders, X, CheckCircle, RotateCcw } from 'lucide-react';

export default function SensorInputModal() {
  const {
    isSensorInputModalOpen,
    setIsSensorInputModalOpen,
    sensorData,
    updateCustomSensorData,
    resetSensorDataToZero
  } = useAgriculture();

  const [moistureInput, setMoistureInput] = useState(sensorData.soilMoisture.value || '');
  const [tempInput, setTempInput] = useState(sensorData.airTemperature.value || '');
  const [humidityInput, setHumidityInput] = useState(sensorData.airHumidity.value || '');

  if (!isSensorInputModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomSensorData(moistureInput, tempInput, humidityInput);
    setIsSensorInputModalOpen(false);
  };

  const handleReset = () => {
    setMoistureInput(0);
    setTempInput(0);
    setHumidityInput(0);
    resetSensorDataToZero();
    setIsSensorInputModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1E3922] text-white border-2 border-[#3A6B3F] rounded-2xl sm:rounded-3xl max-w-md w-[95%] sm:w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2A4D2E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4D8B43] text-white flex items-center justify-center shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-serif">
                Input Sensor Telemetry
              </h3>
              <p className="text-xs text-[#85D67A] font-semibold">
                Set custom sensor values for your farm field
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSensorInputModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#274E2B] transition-colors"
          >
            <X className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-200 mb-1">
              Soil Moisture (%) [0 - 150]
            </label>
            <input
              type="number"
              min="0"
              max="150"
              value={moistureInput}
              onChange={(e) => setMoistureInput(e.target.value)}
              placeholder="e.g. 35 or 0"
              className="w-full bg-[#152B18] border border-[#3A6B3F] rounded-xl px-4 py-2.5 text-sm text-white font-bold placeholder-gray-500 focus:outline-none focus:border-[#4D8B43]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-200 mb-1">
              Air Temperature (°C) [0 - 150]
            </label>
            <input
              type="number"
              min="0"
              max="150"
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder="e.g. 29 or 0"
              className="w-full bg-[#152B18] border border-[#3A6B3F] rounded-xl px-4 py-2.5 text-sm text-white font-bold placeholder-gray-500 focus:outline-none focus:border-[#4D8B43]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-200 mb-1">
              Air Humidity (%) [0 - 100]
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={humidityInput}
              onChange={(e) => setHumidityInput(e.target.value)}
              placeholder="e.g. 70 or 0"
              className="w-full bg-[#152B18] border border-[#3A6B3F] rounded-xl px-4 py-2.5 text-sm text-white font-bold placeholder-gray-500 focus:outline-none focus:border-[#4D8B43]"
            />
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-[#4D8B43] hover:bg-[#3E7335] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Apply Custom Values</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-3 rounded-2xl bg-[#A83232] hover:bg-[#8B2525] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
              title="Reset all values to 0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset (0)</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
