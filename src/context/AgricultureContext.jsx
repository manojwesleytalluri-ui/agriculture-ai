import React, { createContext, useContext, useState } from 'react';
import { INITIAL_CAMERAS } from '../data/mockCameras';
import { CROP_DATABASE, NUTRIENT_DEFICIENCIES } from '../data/mockCrops';
import { MOCK_WEATHER } from '../data/mockWeather';
import { runAiScanSimulation } from '../services/aiVisionService';

const AgricultureContext = createContext();

export const AgricultureProvider = ({ children }) => {
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('Farmer');
  const [theme, setTheme] = useState('dark');
  const [weather, setWeather] = useState(MOCK_WEATHER);

  // Scanning & AI State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(null);
  const [latestScanResult, setLatestScanResult] = useState(null);

  // Alert Center State - Starts Empty
  const [alerts, setAlerts] = useState([]);

  // Task Planner State - Starts Empty
  const [tasks, setTasks] = useState([]);

  const selectedCamera =
    cameras.find((c) => c.id === selectedCameraId) ||
    cameras[0] || {
      id: '',
      name: 'No Camera Registered',
      farm: 'No Farm',
      field: 'No Field',
      crop: 'No Crop',
      healthScore: 0,
      imageUrl: '',
      lastAnalysis: {
        timestamp: '',
        overallHealth: 'No Data',
        healthScore: 0,
        growthStage: 'N/A',
        canopyCoverage: '0%',
        leafCountEstimated: 0,
        detectedIssues: [],
        waterStatus: 'N/A',
        recommendations: []
      }
    };

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toggle Task Completion
  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // Add Task
  const addTask = (newTask) => {
    setTasks((prev) => [
      { id: `TSK-${Date.now()}`, completed: false, recommendedByAi: false, ...newTask },
      ...prev
    ]);
  };

  // Resolve Alert
  const resolveAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'Resolved' } : a))
    );
  };

  // Trigger Immediate Snapshot & AI Scan Simulator
  const triggerManualScan = async (cameraIdToScan) => {
    const targetCam = cameras.find((c) => c.id === (cameraIdToScan || selectedCameraId)) || cameras[0];
    if (!targetCam || !targetCam.id) return;

    setIsScanning(true);
    setScanProgress({ stepIndex: 0, stepName: 'Initializing 4K Camera Lens Capture...', progressPercent: 5 });

    const result = await runAiScanSimulation(targetCam, (progress) => {
      setScanProgress(progress);
    });

    setCameras((prevCams) =>
      prevCams.map((c) =>
        c.id === targetCam.id
          ? {
              ...c,
              healthScore: result.healthScore,
              lastCaptureTime: 'Just now',
              lastAnalysis: {
                ...c.lastAnalysis,
                timestamp: result.timestamp,
                healthScore: result.healthScore,
                overallHealth: result.overallHealth,
                detectedIssues: result.detectedIssues,
                recommendations: result.recommendations
              }
            }
          : c
      )
    );

    setLatestScanResult(result);
    setIsScanning(false);
    setScanProgress(null);
  };

  // Calculate Farm Overview Stats
  const totalCameras = cameras.length;
  const onlineCameras = cameras.filter((c) => c.status === 'Online' || c.status === 'Alert').length;
  const avgHealthScore = cameras.length > 0
    ? Math.round(cameras.reduce((acc, c) => acc + c.healthScore, 0) / cameras.length)
    : 0;
  const activeAlertsCount = alerts.filter((a) => a.status === 'Active').length;

  return (
    <AgricultureContext.Provider
      value={{
        cameras,
        setCameras,
        selectedCameraId,
        setSelectedCameraId,
        selectedCamera,
        activeTab,
        setActiveTab,
        userRole,
        setUserRole,
        theme,
        toggleTheme,
        weather,
        setWeather,
        crops: CROP_DATABASE,
        nutrientDeficiencies: NUTRIENT_DEFICIENCIES,
        alerts,
        setAlerts,
        resolveAlert,
        tasks,
        setTasks,
        toggleTask,
        addTask,
        isScanning,
        scanProgress,
        latestScanResult,
        triggerManualScan,
        stats: {
          totalCameras,
          onlineCameras,
          avgHealthScore,
          activeAlertsCount,
          totalFarms: cameras.length > 0 ? 1 : 0,
          totalFields: cameras.length,
          predictedYield: cameras.length > 0 ? 'Pending Input' : 'N/A'
        }
      }}
    >
      {children}
    </AgricultureContext.Provider>
  );
};

export const useAgriculture = () => useContext(AgricultureContext);
