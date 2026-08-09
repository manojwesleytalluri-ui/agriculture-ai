import React, { useState } from 'react';
import { SENSORS, SENSOR_META } from '../../data/mockSensors';
import { Cpu, Plus, Edit, Trash2, Eye, Wifi, WifiOff } from 'lucide-react';

export default function SensorManagementPage() {
  const [sensors, setSensors] = useState(SENSORS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            <Cpu className="w-6 h-6" style={{ color: 'var(--color-primary)' }} /> Sensor Management
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {sensors.length} sensors registered • {sensors.filter((s) => s.status === 'online').length} online
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white transition-transform hover:scale-105"
          style={{ background: 'var(--color-primary)' }}>
          <Plus className="w-3.5 h-3.5" /> Add Sensor
        </button>
      </div>

      {/* Desktop Table */}
      <div className="card overflow-hidden hidden sm:block">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'var(--color-surface-raised)' }}>
              {['Sensor', 'Type', 'Location', 'Status', 'Last Update', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]"
                  style={{ color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => {
              const meta = SENSOR_META[sensor.type];
              return (
                <tr key={sensor.id} className="transition-colors hover:opacity-90"
                  style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{meta?.icon || '📡'}</span>
                      <div>
                        <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{sensor.name}</p>
                        <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{sensor.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>{meta?.label || sensor.type}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>
                    {sensor.location} • {sensor.fieldId}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{
                        background: sensor.status === 'online' ? 'var(--color-primary-50)' : 'var(--color-red-bg)',
                        color: sensor.status === 'online' ? 'var(--color-primary)' : 'var(--color-red)',
                      }}>
                      {sensor.status === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                      {sensor.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>1 min ago</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setSelectedSensor(sensor)} className="p-1.5 rounded-lg transition-colors"
                        style={{ color: 'var(--color-primary)', background: 'var(--color-surface-raised)' }} title="View">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg transition-colors"
                        style={{ color: 'var(--color-amber)', background: 'var(--color-surface-raised)' }} title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg transition-colors"
                        style={{ color: 'var(--color-red)', background: 'var(--color-surface-raised)' }} title="Remove">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-2">
        {sensors.map((sensor) => {
          const meta = SENSOR_META[sensor.type];
          return (
            <div key={sensor.id} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{meta?.icon || '📡'}</span>
                  <div>
                    <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{sensor.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{meta?.label}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    background: sensor.status === 'online' ? 'var(--color-primary-50)' : 'var(--color-red-bg)',
                    color: sensor.status === 'online' ? 'var(--color-primary)' : 'var(--color-red)',
                  }}>
                  {sensor.status === 'online' ? '🟢 Online' : '🔴 Offline'}
                </span>
              </div>
              <div className="text-[11px] grid grid-cols-2 gap-1" style={{ color: 'var(--color-text-muted)' }}>
                <span>Location: {sensor.location}</span>
                <span>Field: {sensor.fieldId}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sensor Detail Modal */}
      {selectedSensor && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedSensor(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md card p-6 animate-scaleIn">
            <h3 className="text-base font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              {SENSOR_META[selectedSensor.type]?.icon} {selectedSensor.name}
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'Sensor ID', value: selectedSensor.id },
                { label: 'Type', value: SENSOR_META[selectedSensor.type]?.label },
                { label: 'Field', value: selectedSensor.fieldId },
                { label: 'Location', value: selectedSensor.location },
                { label: 'Status', value: selectedSensor.status === 'online' ? '🟢 Online' : '🔴 Offline' },
                { label: 'Last Update', value: '1 minute ago' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-1.5 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                  <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{item.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelectedSensor(null)}
              className="mt-4 w-full py-2 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'var(--color-primary)' }}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}
