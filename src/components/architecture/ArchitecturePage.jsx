import React from 'react';
import { Network } from 'lucide-react';

export default function ArchitecturePage() {
  const layers = [
    { id: 'farm', icon: '🌾', label: 'Farm', desc: 'Agricultural field with crops', color: '#2D6A4F' },
    { id: 'sensors', icon: '📡', label: 'Sensors', desc: 'Temperature, Humidity, Soil Moisture', color: '#40916C',
      items: ['🌡️ Temperature', '💧 Humidity', '🌱 Soil Moisture'] },
    { id: 'mcu', icon: '🔌', label: 'ESP32 MCU', desc: 'Microcontroller collects & transmits', color: '#52B788' },
    { id: 'wifi', icon: '📶', label: 'Wi-Fi / Internet', desc: 'Wireless data transmission', color: '#2980B9' },
    { id: 'backend', icon: '🖥️', label: 'Backend API', desc: 'Processes & stores sensor data', color: '#E67E22' },
    { id: 'db', icon: '💾', label: 'Database', desc: 'Historical sensor readings', color: '#8E44AD' },
    { id: 'ai', icon: '🧠', label: 'Agriculture AI', desc: 'AI analysis & recommendations', color: '#2D6A4F' },
    { id: 'dashboard', icon: '📊', label: 'Web Dashboard', desc: 'Real-time visualization', color: '#40916C' },
    { id: 'farmer', icon: '👨‍🌾', label: 'Farmer', desc: 'Makes informed decisions', color: '#1B4332' },
  ];

  const apiEndpoints = [
    { method: 'GET', path: '/api/fields', desc: 'List all fields' },
    { method: 'GET', path: '/api/sensors', desc: 'List all sensors' },
    { method: 'GET', path: '/api/sensors/:id', desc: 'Get sensor details' },
    { method: 'GET', path: '/api/readings', desc: 'Get all readings' },
    { method: 'GET', path: '/api/readings/latest', desc: 'Get latest readings' },
    { method: 'GET', path: '/api/readings/history', desc: 'Get historical data' },
    { method: 'GET', path: '/api/alerts', desc: 'Get active alerts' },
    { method: 'GET', path: '/api/ai-insights', desc: 'Get AI analysis' },
    { method: 'POST', path: '/api/readings', desc: 'Submit sensor readings' },
  ];

  const dbTables = [
    { name: 'users', fields: 'id, name, email, role' },
    { name: 'farms', fields: 'id, user_id, farm_name, location' },
    { name: 'fields', fields: 'id, farm_id, field_name, crop, area' },
    { name: 'sensors', fields: 'id, field_id, sensor_type, location, status' },
    { name: 'readings', fields: 'id, sensor_id, timestamp, value' },
    { name: 'alerts', fields: 'id, field_id, type, message, severity, timestamp' },
    { name: 'ai_insights', fields: 'id, field_id, analysis, recommendation, timestamp' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
          <Network className="w-6 h-6" style={{ color: 'var(--color-primary)' }} /> System Architecture
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Agriculture AI IoT system architecture and data flow.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="card p-6">
        <h3 className="text-sm font-bold text-center mb-6" style={{ color: 'var(--color-text)' }}>
          🌾 Agriculture AI — Data Flow Architecture
        </h3>
        <div className="flex flex-col items-center gap-1">
          {layers.map((layer, i) => (
            <React.Fragment key={layer.id}>
              <div className="w-full max-w-sm">
                <div className="p-3 rounded-xl text-center transition-transform hover:scale-105"
                  style={{ background: `${layer.color}15`, border: `1px solid ${layer.color}40` }}>
                  <span className="text-2xl">{layer.icon}</span>
                  <p className="text-xs font-bold mt-1" style={{ color: layer.color }}>{layer.label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{layer.desc}</p>
                  {layer.items && (
                    <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                      {layer.items.map((item) => (
                        <span key={item} className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {i < layers.length - 1 && (
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-3 animate-dataFlow" style={{ background: 'var(--color-primary)' }} />
                  <span className="text-sm" style={{ color: 'var(--color-primary)' }}>↓</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="card p-5">
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>🔌 API Endpoints</h3>
        <div className="space-y-1">
          {apiEndpoints.map((ep) => (
            <div key={ep.path} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs"
              style={{ background: 'var(--color-surface-raised)' }}>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white min-w-[40px] text-center"
                style={{ background: ep.method === 'GET' ? 'var(--color-primary)' : 'var(--color-amber)' }}>
                {ep.method}
              </span>
              <code className="font-mono font-semibold flex-1" style={{ color: 'var(--color-text)' }}>{ep.path}</code>
              <span style={{ color: 'var(--color-text-muted)' }}>{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Database Schema */}
      <div className="card p-5">
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>💾 Database Schema</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dbTables.map((table) => (
            <div key={table.name} className="p-3 rounded-lg" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-light)' }}>
              <p className="text-xs font-bold mb-1" style={{ color: 'var(--color-primary)' }}>📋 {table.name}</p>
              <p className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>{table.fields}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
