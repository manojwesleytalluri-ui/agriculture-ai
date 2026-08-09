import React, { useState } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { Bell, User, Menu, Leaf, Sun, Moon, X } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

export default function Navbar({ onMobileMenuClick }) {
  const { activePage, setActivePage, theme, toggleTheme, unreadAlerts, unreadNotifications, farmer, dataSource } = useAgriculture();
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'field_monitoring', label: 'Field Monitoring' },
    { id: 'ai_insights', label: 'AI Insights' },
    { id: 'crop_health', label: 'Crop Health' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16">

        {/* Left: Logo + Mobile menu */}
        <div className="flex items-center gap-3">
          <button onClick={onMobileMenuClick}
            className="lg:hidden p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text)' }}
            aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>

          <div onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
              <Leaf className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight leading-none" style={{ color: 'var(--color-text)' }}>
                🌱 Agriculture <span style={{ color: 'var(--color-primary)' }}>AI</span>
              </h1>
              <p className="text-[10px] font-medium hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
                Smart Monitoring Platform
              </p>
            </div>
          </div>

          {dataSource === 'DEMO' && (
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber)', border: '1px solid var(--color-amber)' }}>
              DEMO DATA
            </span>
          )}
        </div>

        {/* Center: Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActivePage(item.id)}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all"
              style={{
                background: activePage === item.id ? 'var(--color-primary)' : 'transparent',
                color: activePage === item.id ? '#FFFFFF' : 'var(--color-text-secondary)',
              }}>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors"
            style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-muted)' }}
            aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg transition-colors"
              style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-muted)' }}
              aria-label="Notifications">
              <Bell className="w-4 h-4" />
              {(unreadAlerts + unreadNotifications) > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  style={{ background: 'var(--color-red)' }}>
                  {unreadAlerts + unreadNotifications}
                </span>
              )}
            </button>
            {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
          </div>

          {/* Farmer Profile */}
          <button onClick={() => setActivePage('farmer_profile')}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors"
            style={{ background: 'var(--color-surface-raised)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'var(--color-primary)' }}>
              {farmer.name.charAt(0)}
            </div>
            <span className="hidden sm:inline text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              {farmer.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
