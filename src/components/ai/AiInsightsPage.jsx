import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { BrainCircuit, TrendingUp, Shield, Eye } from 'lucide-react';

export default function AiInsightsPage() {
  const { aiInsights, aiRecommendations, sensorReadings } = useAgriculture();

  const severityStyles = {
    good: { bg: 'var(--color-primary-50)', border: 'var(--color-primary-200)', color: 'var(--color-primary)', icon: '✅' },
    warning: { bg: 'var(--color-amber-bg)', border: 'var(--color-amber)', color: 'var(--color-amber)', icon: '⚠️' },
    info: { bg: 'var(--color-blue-bg)', border: 'var(--color-blue)', color: 'var(--color-blue)', icon: 'ℹ️' },
    critical: { bg: 'var(--color-red-bg)', border: 'var(--color-red)', color: 'var(--color-red)', icon: '🔴' },
  };

  const priorityStyles = {
    high: { bg: 'var(--color-red-bg)', text: 'var(--color-red)' },
    medium: { bg: 'var(--color-amber-bg)', text: 'var(--color-amber)' },
    low: { bg: 'var(--color-primary-50)', text: 'var(--color-primary)' },
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
          <BrainCircuit className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
          Agriculture AI Insights
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          AI-powered analysis of your sensor data with actionable recommendations.
        </p>
      </div>

      {/* Overall Assessment */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: 'var(--color-primary-50)' }}>🧠</div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Current AI Analysis</h3>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Based on real-time sensor data from all connected sensors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="py-2 rounded-lg" style={{ background: 'var(--color-surface-raised)' }}>
            <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Temperature</p>
            <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{sensorReadings.temperature?.value}°C</p>
          </div>
          <div className="py-2 rounded-lg" style={{ background: 'var(--color-surface-raised)' }}>
            <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Humidity</p>
            <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{sensorReadings.humidity?.value}%</p>
          </div>
          <div className="py-2 rounded-lg" style={{ background: 'var(--color-surface-raised)' }}>
            <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Soil Moisture</p>
            <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{sensorReadings.soilMoisture?.value}%</p>
          </div>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div>
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>📊 Analysis Results</h3>
        <div className="space-y-3">
          {aiInsights.map((insight) => {
            const style = severityStyles[insight.severity] || severityStyles.info;
            return (
              <div key={insight.id} className="card p-4" style={{ borderLeft: `3px solid ${style.border}` }}>
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{insight.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{insight.title}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: style.bg, color: style.color }}>
                        {insight.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>{insight.summary}</p>
                    <p className="text-[11px] p-2.5 rounded-lg italic" style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-muted)' }}>
                      "{insight.detail}"
                    </p>
                    {insight.confidence && (
                      <div className="flex items-center gap-2 mt-2">
                        <Shield className="w-3 h-3" style={{ color: 'var(--color-text-muted)' }} />
                        <span className="text-[10px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                          AI Confidence: {insight.confidence}%
                        </span>
                        <div className="flex-1 h-1 rounded-full" style={{ background: 'var(--color-surface-raised)' }}>
                          <div className="h-full rounded-full" style={{ width: `${insight.confidence}%`, background: style.color }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>💡 AI Recommendations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {aiRecommendations.map((rec) => {
            const pStyle = priorityStyles[rec.priority] || priorityStyles.low;
            return (
              <div key={rec.id} className="card card-interactive p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{rec.icon}</span>
                  <h4 className="text-xs font-bold flex-1" style={{ color: 'var(--color-text)' }}>{rec.title}</h4>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                    style={{ background: pStyle.bg, color: pStyle.text }}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-secondary)' }}>{rec.action}</p>
                <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{rec.reason}</p>
                <button className="mt-3 text-[11px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                  View Details →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
