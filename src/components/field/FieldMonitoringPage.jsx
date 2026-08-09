import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { SENSORS, SENSOR_META } from '../../data/mockSensors';
import { MapPin, Wifi, Droplets, Thermometer, Sun as SunIcon } from 'lucide-react';

function FieldMap({ field, sensors }) {
  // Visual field map with sensor positions
  const sensorPositions = [
    { x: 20, y: 20 }, { x: 75, y: 20 }, { x: 48, y: 50 },
    { x: 20, y: 80 }, { x: 75, y: 80 }, { x: 48, y: 50 },
  ];

  return (
    <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A3A20, #2D6A4F)', border: '1px solid var(--color-border)' }}>

      {/* Field Grid Pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)' }} />

      {/* Field Label */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-bold text-white"
        style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
        🌾 {field.name}
      </div>
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold"
        style={{ background: field.status === 'healthy' ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)', color: field.status === 'healthy' ? '#22C55E' : '#EAB308' }}>
        {field.status === 'healthy' ? '🟢 Healthy' : '🟡 Moderate'}
      </div>

      {/* Crop Rows */}
      {[25, 40, 55, 70].map((top) => (
        <div key={top} className="absolute left-[15%] right-[15%] flex justify-around"
          style={{ top: `${top}%` }}>
          {Array.from({ length: 6 }).map((_, j) => (
            <span key={j} className="text-lg opacity-60">🌱</span>
          ))}
        </div>
      ))}

      {/* Sensor Markers */}
      {sensors.map((sensor, i) => {
        const pos = sensorPositions[i % sensorPositions.length];
        return (
          <div key={sensor.id} className="absolute transition-transform hover:scale-125"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}>
            <div className="relative group cursor-pointer">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm animate-pulseGlow"
                style={{ background: sensor.status === 'online' ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)' }}>
                📡
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
                {sensor.name} • {SENSOR_META[sensor.type]?.label} • {sensor.status}
              </div>
            </div>
          </div>
        );
      })}

      {/* Water Area */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-medium text-white/70"
        style={{ background: 'rgba(41,128,185,0.3)' }}>
        💧 Irrigation Zone
      </div>
    </div>
  );
}

export default function FieldMonitoringPage() {
  const { sensorReadings, fields } = useAgriculture();
  const [selectedFieldId, setSelectedFieldId] = useState(fields[0]?.id || '');

  const selectedField = fields.find((f) => f.id === selectedFieldId) || fields[0];
  const fieldSensors = SENSORS.filter((s) => s.fieldId === selectedFieldId);

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>🌾 Field Monitoring</h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Monitor individual field conditions and sensor locations.</p>
      </div>

      {/* Field Selector */}
      <div className="flex gap-2">
        {fields.map((field) => (
          <button key={field.id} onClick={() => setSelectedFieldId(field.id)}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: selectedFieldId === field.id ? 'var(--color-primary)' : 'var(--color-surface)',
              color: selectedFieldId === field.id ? '#fff' : 'var(--color-text-secondary)',
              border: `1px solid ${selectedFieldId === field.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
            }}>
            {field.status === 'healthy' ? '🟢' : '🟡'} {field.name}
          </button>
        ))}
      </div>

      {selectedField && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Field Map */}
          <div className="lg:col-span-2">
            <FieldMap field={selectedField} sensors={fieldSensors} />
          </div>

          {/* Field Details */}
          <div className="space-y-3">
            <div className="card p-4">
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Field Details</h3>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Crop', value: `${selectedField.crop}` },
                  { label: 'Area', value: selectedField.area },
                  { label: 'Soil Type', value: selectedField.soilType },
                  { label: 'Irrigation', value: selectedField.irrigationType },
                  { label: 'Planted', value: new Date(selectedField.plantingDate).toLocaleDateString() },
                  { label: 'Est. Harvest', value: new Date(selectedField.expectedHarvest).toLocaleDateString() },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sensor Readings for this field */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { icon: '🌡️', label: 'Temperature', value: `${sensorReadings.temperature?.value}°C` },
          { icon: '💧', label: 'Humidity', value: `${sensorReadings.humidity?.value}%` },
          { icon: '🌱', label: 'Soil Moisture', value: `${sensorReadings.soilMoisture?.value}%` },
          { icon: '☀️', label: 'Light', value: `${sensorReadings.light?.value}%` },
          { icon: '🌧️', label: 'Rainfall', value: `${sensorReadings.rainfall?.value} mm` },
          { icon: '📡', label: 'Sensors', value: `${fieldSensors.filter((s) => s.status === 'online').length}/${fieldSensors.length}` },
        ].map((item) => (
          <div key={item.label} className="card p-3 text-center">
            <span className="text-xl">{item.icon}</span>
            <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
            <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
