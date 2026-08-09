import React, { useState } from 'react';
import { AgricultureProvider, useAgriculture } from './context/AgricultureContext';
import Navbar from './components/layout/Navbar';
import SidebarNavigation from './components/layout/SidebarNavigation';
import LandingPage from './components/landing/LandingPage';
import DashboardPage from './components/dashboard/DashboardPage';
import FieldMonitoringPage from './components/field/FieldMonitoringPage';
import AiInsightsPage from './components/ai/AiInsightsPage';
import CropHealthPage from './components/crops/CropHealthPage';
import CropVisionPage from './components/vision/CropVisionPage';
import AlertsPage from './components/alerts/AlertsPage';
import SensorManagementPage from './components/sensors/SensorManagementPage';
import ArchitecturePage from './components/architecture/ArchitecturePage';
import FarmerProfilePage from './components/profile/FarmerProfilePage';
import AboutPage from './components/about/AboutPage';
import AiChatAssistant from './components/chat/AiChatAssistant';

function MainLayout() {
  const { activePage } = useAgriculture();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Landing page has no sidebar/navbar
  if (activePage === 'home') {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <Navbar onMobileMenuClick={() => setMobileMenuOpen(true)} />
        <LandingPage />
        <AiChatAssistant />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Top Navbar */}
      <Navbar onMobileMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex">
        {/* Sidebar */}
        <SidebarNavigation
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'field_monitoring' && <FieldMonitoringPage />}
          {activePage === 'ai_insights' && <AiInsightsPage />}
          {activePage === 'crop_health' && <CropHealthPage />}
          {activePage === 'crop_vision' && <CropVisionPage />}
          {activePage === 'alerts' && <AlertsPage />}
          {activePage === 'sensor_management' && <SensorManagementPage />}
          {activePage === 'architecture' && <ArchitecturePage />}
          {activePage === 'farmer_profile' && <FarmerProfilePage />}
          {activePage === 'about' && <AboutPage />}
        </main>
      </div>

      {/* Floating AI Chat */}
      <AiChatAssistant />
    </div>
  );
}

export default function App() {
  return (
    <AgricultureProvider>
      <MainLayout />
    </AgricultureProvider>
  );
}
