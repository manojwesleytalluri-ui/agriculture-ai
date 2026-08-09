import React from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { ArrowRight, Activity, BrainCircuit, Bell, Sprout, BarChart3, Wifi } from 'lucide-react';

export default function LandingPage() {
  const { setActivePage } = useAgriculture();

  const features = [
    { icon: Activity, title: 'IoT Monitoring', desc: 'Collect real-time environmental data from connected field sensors.' },
    { icon: BrainCircuit, title: 'AI Analysis', desc: 'Intelligent analysis of collected data for actionable farming insights.' },
    { icon: Bell, title: 'Smart Alerts', desc: 'Instant notifications when conditions exceed configured thresholds.' },
    { icon: Sprout, title: 'Crop Monitoring', desc: 'Track crop conditions, growth stages, and health over time.' },
    { icon: BarChart3, title: 'Data Visualization', desc: 'Transform sensor readings into clear, interactive graphs and charts.' },
  ];

  const steps = [
    { emoji: '📡', label: 'Sense', desc: 'Field sensors collect data' },
    { emoji: '☁️', label: 'Collect', desc: 'IoT sends to cloud' },
    { emoji: '🧠', label: 'Analyze', desc: 'AI processes insights' },
    { emoji: '📊', label: 'Understand', desc: 'Dashboard visualizes' },
    { emoji: '🌱', label: 'Act', desc: 'Farmer makes decisions' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:py-24 text-center">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, var(--color-primary-200), transparent 70%), radial-gradient(ellipse at 70% 30%, var(--color-primary-50), transparent 60%)',
          }} />

        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
            style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary-dark)', border: '1px solid var(--color-primary-200)' }}>
            <Wifi className="w-3.5 h-3.5" />
            IoT + AI Powered Smart Farming
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ color: 'var(--color-text)' }}>
            Intelligent Agriculture Starts With{' '}
            <span style={{ color: 'var(--color-primary)' }}>Better Data.</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}>
            Monitor your farm in real time, understand crop conditions, and make smarter farming decisions with AI-powered insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => setActivePage('dashboard')}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2 transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', boxShadow: 'var(--shadow-lg)' }}>
              View Dashboard <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => setActivePage('about')}
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
              Explore Agriculture AI
            </button>
          </div>
        </div>

        {/* Floating sensor icons */}
        <div className="hidden lg:block">
          <span className="absolute top-20 left-[10%] text-3xl animate-float" style={{ animationDelay: '0s' }}>🌡️</span>
          <span className="absolute top-32 right-[12%] text-3xl animate-float" style={{ animationDelay: '0.5s' }}>💧</span>
          <span className="absolute bottom-20 left-[15%] text-3xl animate-float" style={{ animationDelay: '1s' }}>🌱</span>
          <span className="absolute bottom-32 right-[8%] text-3xl animate-float" style={{ animationDelay: '1.5s' }}>📡</span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3" style={{ color: 'var(--color-text)' }}>
            Everything Your Farm Needs
          </h2>
          <p className="text-sm text-center mb-10 max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            A complete smart farming toolkit connecting sensors, AI, and your dashboard.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card card-interactive p-5 animate-fadeInUp"
                  style={{ animationDelay: `${i * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-12 sm:py-16" style={{ background: 'var(--color-surface-raised)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10" style={{ color: 'var(--color-text)' }}>How It Works</h2>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
            {steps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-2 animate-fadeInUp"
                  style={{ animationDelay: `${i * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                    {step.emoji}
                  </div>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{step.label}</p>
                  <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 hidden sm:block shrink-0" style={{ color: 'var(--color-primary)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Ready to Transform Your Farm?
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Connect your sensors and start monitoring your fields in minutes.
          </p>
          <button onClick={() => setActivePage('dashboard')}
            className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', boxShadow: 'var(--shadow-lg)' }}>
            Get Started →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          © 2026 Agriculture AI — Smart Monitoring. Better Decisions. Healthier Crops.
        </p>
      </footer>
    </div>
  );
}
