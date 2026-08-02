import React, { useState } from 'react';
import { AgricultureProvider, useAgriculture } from './context/AgricultureContext';
import Navbar from './components/layout/Navbar';
import SidebarNavigation from './components/layout/SidebarNavigation';
import SmartAgriDashboard from './components/dashboard/SmartAgriDashboard';
import CameraGrid from './components/camera/CameraGrid';
import AiVisionScanner from './components/ai/AiVisionScanner';
import GrowthAnalytics from './components/analytics/GrowthAnalytics';
import FarmMapViewer from './components/maps/FarmMapViewer';
import AlertCenter from './components/alerts/AlertCenter';
import ReportGenerator from './components/reports/ReportGenerator';

function MainLayout() {
  const { activeTab } = useAgriculture();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-[#F4F1EA] dark:bg-[#121E14] text-[#1C2B1E] dark:text-[#E8F0E9] selection:bg-[#3B8A42] selection:text-white antialiased">
      
      {/* Top Navbar */}
      <Navbar onMobileMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex">
        {/* Sidebar Navigation */}
        <SidebarNavigation
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          
          {/* Main Smart Agriculture Dashboard (Matches User Mockup 1-to-1) */}
          {(activeTab === 'dashboard' || activeTab === 'field_status' || activeTab === 'sensors' || activeTab === 'pump_control') && (
            <SmartAgriDashboard />
          )}

          {/* Camera Grid Tab */}
          {activeTab === 'cameras' && <CameraGrid />}

          {/* AI Vision Inspector Tab */}
          {activeTab === 'vision_scanner' && <AiVisionScanner />}

          {/* Growth & Yield Analytics Tab */}
          {activeTab === 'growth_analytics' && <GrowthAnalytics />}

          {/* Interactive Map View Tab */}
          {activeTab === 'map_view' && <FarmMapViewer />}

          {/* Alert Center Tab */}
          {activeTab === 'alert_center' && <AlertCenter />}

          {/* Reports & Logs Tab */}
          {(activeTab === 'reports' || activeTab === 'logs') && <ReportGenerator />}

        </main>
      </div>

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
