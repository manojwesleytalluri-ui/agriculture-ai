import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';

export default function CropHealthPage() {
  const { crops, sensorReadings } = useAgriculture();
  const [selectedCropId, setSelectedCropId] = useState(crops[0]?.id || '');

  const selectedCrop = crops.find((c) => c.id === selectedCropId) || crops[0];
  const temp = sensorReadings.temperature?.value || 0;
  const humidity = sensorReadings.humidity?.value || 0;
  const moisture = sensorReadings.soilMoisture?.value || 0;

  const isInRange = (val, min, max) => val >= min && val <= max;

  const getHealthStatus = () => {
    if (!selectedCrop) return { label: 'Unknown', color: 'amber', icon: '🟡' };
    const { idealConditions } = selectedCrop;
    const tempOk = isInRange(temp, idealConditions.tempMin, idealConditions.tempMax);
    const humOk = isInRange(humidity, idealConditions.humidityMin, idealConditions.humidityMax);
    const moistOk = isInRange(moisture, idealConditions.moistureMin, idealConditions.moistureMax);
    const score = [tempOk, humOk, moistOk].filter(Boolean).length;
    if (score === 3) return { label: 'Good', color: 'green', icon: '🟢' };
    if (score >= 2) return { label: 'Fair', color: 'amber', icon: '🟡' };
    return { label: 'Poor', color: 'red', icon: '🔴' };
  };

  const health = getHealthStatus();

  const getConditionBar = (val, min, max, unit) => {
    const ok = isInRange(val, min, max);
    return (
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-2 rounded-full" style={{ background: 'var(--color-surface-raised)' }}>
            <div className="h-full rounded-full transition-all" style={{
              width: `${Math.min(100, (val / (max * 1.3)) * 100)}%`,
              background: ok ? 'var(--color-primary)' : 'var(--color-amber)',
            }} />
          </div>
          <div className="flex justify-between text-[9px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            <span>{min}{unit}</span>
            <span>Ideal Range</span>
            <span>{max}{unit}</span>
          </div>
        </div>
        <span className="text-sm font-bold min-w-[50px] text-right" style={{ color: ok ? 'var(--color-primary)' : 'var(--color-amber)' }}>
          {val}{unit}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>🌿 Crop Health</h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Select a crop to view health analysis and AI recommendations.</p>
      </div>

      {/* Crop Selector */}
      <div className="flex flex-wrap gap-2">
        {crops.map((crop) => (
          <button key={crop.id} onClick={() => setSelectedCropId(crop.id)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            style={{
              background: selectedCropId === crop.id ? 'var(--color-primary)' : 'var(--color-surface)',
              color: selectedCropId === crop.id ? '#fff' : 'var(--color-text-secondary)',
              border: `1px solid ${selectedCropId === crop.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
            }}>
            {crop.icon} {crop.name}
          </button>
        ))}
      </div>

      {selectedCrop && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Crop Card */}
          <div className="lg:col-span-2 card p-5 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{selectedCrop.icon}</span>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{selectedCrop.name}</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Growth Stage: <strong>{selectedCrop.currentStage}</strong> • {selectedCrop.daysToHarvest} days to harvest
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span>{health.icon}</span>
                  <span className="text-sm font-bold" style={{ color: health.color === 'green' ? 'var(--color-primary)' : health.color === 'red' ? 'var(--color-red)' : 'var(--color-amber)' }}>
                    Health: {health.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Growth Stage Progress */}
            <div>
              <p className="text-[10px] font-bold uppercase mb-2" style={{ color: 'var(--color-text-muted)' }}>Growth Stages</p>
              <div className="flex gap-1">
                {selectedCrop.growthStages.map((stage, i) => {
                  const currentIdx = selectedCrop.growthStages.indexOf(selectedCrop.currentStage);
                  return (
                    <div key={stage} className="flex-1 text-center">
                      <div className="h-2 rounded-full mb-1" style={{
                        background: i <= currentIdx ? 'var(--color-primary)' : 'var(--color-surface-raised)',
                      }} />
                      <p className="text-[9px] font-medium" style={{
                        color: i === currentIdx ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      }}>{stage}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Environment Conditions */}
            <div>
              <p className="text-[10px] font-bold uppercase mb-3" style={{ color: 'var(--color-text-muted)' }}>Environmental Conditions vs Ideal</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>🌡️ Temperature</p>
                  {getConditionBar(temp, selectedCrop.idealConditions.tempMin, selectedCrop.idealConditions.tempMax, '°C')}
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>💧 Humidity</p>
                  {getConditionBar(humidity, selectedCrop.idealConditions.humidityMin, selectedCrop.idealConditions.humidityMax, '%')}
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>🌱 Soil Moisture</p>
                  {getConditionBar(moisture, selectedCrop.idealConditions.moistureMin, selectedCrop.idealConditions.moistureMax, '%')}
                </div>
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-3">
            {/* AI Recommendation */}
            <div className="card p-4">
              <h4 className="text-xs font-bold mb-2" style={{ color: 'var(--color-text)' }}>🧠 AI Recommendation</h4>
              <p className="text-xs leading-relaxed p-3 rounded-lg italic"
                style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)' }}>
                {health.label === 'Good'
                  ? `Current environmental conditions are suitable for ${selectedCrop.name}. Continue regular monitoring.`
                  : health.label === 'Fair'
                  ? `Some parameters are outside the ideal range for ${selectedCrop.name}. Monitor closely and adjust irrigation or ventilation if needed.`
                  : `Multiple environmental conditions are outside the ideal range for ${selectedCrop.name}. Immediate attention recommended.`}
              </p>
            </div>

            {/* Common Diseases */}
            <div className="card p-4">
              <h4 className="text-xs font-bold mb-2" style={{ color: 'var(--color-text)' }}>🦠 Common Diseases</h4>
              <div className="space-y-1.5">
                {selectedCrop.commonDiseases.map((disease) => (
                  <div key={disease} className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg"
                    style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)' }}>
                    <span>⚠️</span> {disease}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="card p-4">
              <h4 className="text-xs font-bold mb-2" style={{ color: 'var(--color-text)' }}>💡 Farming Tip</h4>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{selectedCrop.tips}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
