import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { Info, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { setActivePage } = useAgriculture();

  const sections = [
    { icon: '📡', title: 'IoT Monitoring', desc: 'Collect environmental data from connected field sensors in real time.' },
    { icon: '🧠', title: 'AI Analysis', desc: 'Analyze collected sensor data to generate actionable farming insights.' },
    { icon: '🔔', title: 'Smart Alerts', desc: 'Receive notifications when unusual conditions are detected in the field.' },
    { icon: '🌿', title: 'Crop Monitoring', desc: 'Track crop conditions, growth stages, and health over time.' },
    { icon: '📊', title: 'Data Visualization', desc: 'Convert sensor readings into clear, understandable graphs and charts.' },
  ];

  const steps = [
    { emoji: '📡', label: 'Sense' },
    { emoji: '☁️', label: 'Collect' },
    { emoji: '🧠', label: 'Analyze' },
    { emoji: '💡', label: 'Understand' },
    { emoji: '🌱', label: 'Act' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
          <Info className="w-6 h-6" style={{ color: 'var(--color-primary)' }} /> About Agriculture AI
        </h2>
      </div>

      {/* Mission */}
      <div className="card p-6 text-center" style={{ borderLeft: '4px solid var(--color-primary)' }}>
        <span className="text-4xl">🌱</span>
        <h3 className="text-lg font-bold mt-3 mb-2" style={{ color: 'var(--color-text)' }}>
          Smart Monitoring. Better Decisions. Healthier Crops.
        </h3>
        <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Agriculture AI combines IoT sensors, cloud data, data visualization, and artificial intelligence
          to help farmers monitor field conditions and make informed decisions.
        </p>
      </div>

      {/* Workflow */}
      <div className="card p-5">
        <h3 className="text-sm font-bold text-center mb-6" style={{ color: 'var(--color-text)' }}>
          How Agriculture AI Works
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
                  {step.emoji}
                </div>
                <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{step.label}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 hidden sm:block shrink-0" style={{ color: 'var(--color-primary)' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Feature Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div key={section.title} className="card card-interactive p-5">
            <span className="text-2xl">{section.icon}</span>
            <h4 className="text-sm font-bold mt-2 mb-1" style={{ color: 'var(--color-text)' }}>{section.title}</h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{section.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center py-6">
        <button onClick={() => setActivePage('architecture')}
          className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
          View System Architecture →
        </button>
      </div>

      {/* Footer */}
      <div className="text-center py-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>© 2026 Agriculture AI — IoT Smart Farming Platform</p>
      </div>
    </div>
  );
}
