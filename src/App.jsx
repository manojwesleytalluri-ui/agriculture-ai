import React, { useState } from 'react';
import { AgricultureProvider, useAgriculture } from './context/AgricultureContext';
import Navbar from './components/layout/Navbar';
import SidebarNavigation from './components/layout/SidebarNavigation';
import OverviewStats from './components/dashboard/OverviewStats';
import WeatherWidget from './components/dashboard/WeatherWidget';
import TaskPlanner from './components/dashboard/TaskPlanner';
import CameraGrid from './components/camera/CameraGrid';
import AiVisionScanner from './components/ai/AiVisionScanner';
import GrowthAnalytics from './components/analytics/GrowthAnalytics';
import FarmMapViewer from './components/maps/FarmMapViewer';
import AlertCenter from './components/alerts/AlertCenter';
import ReportGenerator from './components/reports/ReportGenerator';

function MainLayout() {
  const { activeTab, theme } = useAgriculture();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'dark bg-emerald-950 text-emerald-50' : 'bg-emerald-50 text-emerald-950'}`}>
      
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
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <OverviewStats />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <WeatherWidget />
                </div>
                <div className="lg:col-span-5">
                  <TaskPlanner />
                </div>
              </div>
            </div>
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

          {/* Reports Tab */}
          {activeTab === 'reports' && <ReportGenerator />}

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
