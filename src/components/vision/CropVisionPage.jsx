import React from 'react';
import { Camera, Upload, Clock, ArrowRight, Image } from 'lucide-react';

export default function CropVisionPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
          <Camera className="w-6 h-6" style={{ color: 'var(--color-primary)' }} /> AI Crop Vision
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Visual crop monitoring with AI-powered image analysis. Coming soon.
        </p>
      </div>

      {/* Coming Soon Banner */}
      <div className="card p-6 text-center" style={{ borderLeft: '4px solid var(--color-primary)' }}>
        <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4 animate-float"
          style={{ background: 'var(--color-primary-50)' }}>📸</div>
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>Camera System — Coming Soon</h3>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          This feature will allow field cameras to capture crop images periodically.
          AI will analyze images for crop health, growth tracking, and disease detection.
        </p>
      </div>

      {/* Architecture */}
      <div className="card p-5">
        <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text)' }}>📐 Camera System Architecture</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {[
            { icon: '📷', label: 'Field Camera' },
            { icon: '☁️', label: 'Image Upload' },
            { icon: '💾', label: 'Cloud Storage' },
            { icon: '🧠', label: 'AI Analysis' },
            { icon: '🩺', label: 'Health Detection' },
            { icon: '📊', label: 'Dashboard' },
          ].map((step, i) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
                  {step.icon}
                </div>
                <span className="text-[10px] font-medium text-center" style={{ color: 'var(--color-text-muted)' }}>{step.label}</span>
              </div>
              {i < 5 && <ArrowRight className="w-4 h-4 hidden sm:block shrink-0" style={{ color: 'var(--color-primary)' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Placeholder Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: <Upload className="w-5 h-5" />, title: 'Upload Crop Images', desc: 'Upload field photos for AI analysis of crop health and growth.' },
          { icon: <Clock className="w-5 h-5" />, title: 'Growth Comparison', desc: 'Compare crop images over 7, 14, or 30 days to track growth.' },
          { icon: <Image className="w-5 h-5" />, title: 'AI Observations', desc: 'Receive AI-generated insights about visible crop conditions.' },
        ].map((feature) => (
          <div key={feature.title} className="card p-4 opacity-60">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-muted)' }}>
              {feature.icon}
            </div>
            <h4 className="text-xs font-bold mb-1" style={{ color: 'var(--color-text)' }}>{feature.title}</h4>
            <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{feature.desc}</p>
            <span className="inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded"
              style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-muted)' }}>
              COMING SOON
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
