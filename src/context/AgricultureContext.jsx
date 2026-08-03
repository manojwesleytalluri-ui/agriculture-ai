import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CAMERAS } from '../data/mockCameras';
import { CROP_DATABASE, NUTRIENT_DEFICIENCIES } from '../data/mockCrops';
import { MOCK_WEATHER } from '../data/mockWeather';
import { runAiScanSimulation } from '../services/aiVisionService';

const AgricultureContext = createContext();

export const AgricultureProvider = ({ children }) => {
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  
  // Hash-aware Browser Back Button History State
  const [activeTab, setActiveTabState] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'field_status', 'sensors', 'pump_control', 'alert_center', 'reports', 'settings', 'cameras', 'vision_scanner', 'growth_analytics', 'map_view', 'logs'].includes(hash)) {
        return hash;
      }
    }
    return 'dashboard';
  });

  const [userRole, setUserRole] = useState('Farmer');
  const [theme, setTheme] = useState('dark');
  const [weather, setWeather] = useState(MOCK_WEATHER);

  // Irrigation Pump & Sensor Real-Time State
  const [pumpStatus, setPumpStatus] = useState('OFF');
  const [pumpLastUpdated, setPumpLastUpdated] = useState('11:06:00 AM');
  const [isFungicideModalOpen, setIsFungicideModalOpen] = useState(false);
  const [isSensorInputModalOpen, setIsSensorInputModalOpen] = useState(false);
  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);

  // Initial Sensor Gauge Data (Default 0% / 0°C / 0% when user has not provided data)
  const [sensorData, setSensorData] = useState({
    soilMoisture: { value: 0, unit: '%', status: '0% (No Input)', min: 0, max: 150, color: '#A83232' },
    airTemperature: { value: 0, unit: '°C', status: '0°C (No Input)', min: 0, max: 150, color: '#4D8B43' },
    airHumidity: { value: 0, unit: '%', status: '0% (No Input)', min: 0, max: 100, color: '#6E441D' }
  });

  // User Custom Sensor Input Handler
  const updateCustomSensorData = (sm, temp, hum) => {
    const moistureVal = Math.max(0, Math.min(150, parseFloat(sm) || 0));
    const tempVal = Math.max(0, Math.min(150, parseFloat(temp) || 0));
    const humVal = Math.max(0, Math.min(100, parseFloat(hum) || 0));

    const moistureStatus = moistureVal === 0 ? '0% (No Input)' : moistureVal < 40 ? 'Low' : moistureVal < 80 ? 'Optimal' : 'High';
    const tempStatus = tempVal === 0 ? '0°C (No Input)' : tempVal < 18 ? 'Cool' : tempVal <= 32 ? 'Optimal' : 'High';
    const humStatus = humVal === 0 ? '0% (No Input)' : humVal < 40 ? 'Low' : humVal <= 65 ? 'Optimal' : 'High';

    setSensorData({
      soilMoisture: { value: moistureVal, unit: '%', status: moistureStatus, min: 0, max: 150, color: moistureVal < 40 ? '#A83232' : '#4D8B43' },
      airTemperature: { value: tempVal, unit: '°C', status: tempStatus, min: 0, max: 150, color: tempVal > 35 ? '#A83232' : '#4D8B43' },
      airHumidity: { value: humVal, unit: '%', status: humStatus, min: 0, max: 100, color: '#6E441D' }
    });
  };

  // Reset Sensor Data to 0
  const resetSensorDataToZero = () => {
    setSensorData({
      soilMoisture: { value: 0, unit: '%', status: '0% (No Input)', min: 0, max: 150, color: '#A83232' },
      airTemperature: { value: 0, unit: '°C', status: '0°C (No Input)', min: 0, max: 150, color: '#4D8B43' },
      airHumidity: { value: 0, unit: '%', status: '0% (No Input)', min: 0, max: 100, color: '#6E441D' }
    });
  };

  // Scanning & AI State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(null);
  const [latestScanResult, setLatestScanResult] = useState(null);

  // Analyze User Uploaded Image & Extract Telemetry Data
  const analyzeUploadedImage = (imageDataUrl, imageName = 'Uploaded Crop Field') => {
    setIsScanning(true);
    setScanProgress({ stepIndex: 0, stepName: 'Reading uploaded image file & extracting pixels...', progressPercent: 15 });

    setTimeout(() => {
      setScanProgress({ stepIndex: 1, stepName: 'Running Convolutional Neural Net Pathology Model...', progressPercent: 55 });
    }, 600);

    setTimeout(() => {
      setScanProgress({ stepIndex: 2, stepName: 'Extracting Bounding Boxes & Telemetry Data...', progressPercent: 90 });
    }, 1200);

    setTimeout(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const healthScore = Math.floor(65 + Math.random() * 30);
      const isDiseaseDetected = healthScore < 80;

      const issues = isDiseaseDetected ? [
        {
          name: 'Leaf Spot Pathology (Septoria)',
          confidence: '96.4%',
          type: 'Fungal Pathogen',
          affectedArea: 'Canopy Lower Leaves',
          boundingBox: { x: 28, y: 32, w: 42, h: 36 }
        }
      ] : [];

      const recommendations = isDiseaseDetected
        ? ['Apply Organic Copper Octanoate Fungicide spray within 24h.', 'Reduce overhead sprinkler irrigation; switch to drip.', 'Prune severely spotted lower leaves to prevent spore spread.']
        : ['Crop health is optimal. Maintain current drip irrigation schedule.', 'Soil nitrogen levels are balanced. Re-scan in 7 days.'];

      const result = {
        timestamp: now.toISOString(),
        healthScore,
        overallHealth: healthScore >= 80 ? 'Healthy Canopy' : 'Leaf Spot Warning',
        growthStage: 'Vegetative Growth',
        canopyCoverage: '78%',
        leafCountEstimated: 42,
        detectedIssues: issues,
        recommendations,
        imageUrl: imageDataUrl
      };

      const uploadedCamId = `CAM-UPLOAD-${Date.now().toString().slice(-4)}`;
      const newCamera = {
        id: uploadedCamId,
        name: imageName,
        farm: 'Uploaded Field Image',
        field: 'Custom Upload Zone',
        crop: 'Custom Uploaded Crop',
        status: 'Online',
        healthScore,
        imageUrl: imageDataUrl,
        lastAnalysis: result
      };

      setCameras((prev) => [newCamera, ...prev]);
      setSelectedCameraId(uploadedCamId);
      setLatestScanResult(result);

      // Automatically populate telemetry gauges & alerts from uploaded image analysis
      const moistureVal = isDiseaseDetected ? 35 : 65;
      const tempVal = 29;
      const humVal = 70;

      setSensorData({
        soilMoisture: { value: moistureVal, unit: '%', status: moistureVal < 40 ? 'Low' : 'Optimal', min: 0, max: 150, color: moistureVal < 40 ? '#A83232' : '#4D8B43' },
        airTemperature: { value: tempVal, unit: '°C', status: 'Optimal', min: 0, max: 150, color: '#4D8B43' },
        airHumidity: { value: humVal, unit: '%', status: 'High', min: 0, max: 100, color: '#6E441D' }
      });

      if (isDiseaseDetected) {
        setAlerts((prev) => [
          {
            id: `ALT-${Date.now()}`,
            title: 'Leaf Spot Detected (Uploaded Image)',
            crop: imageName,
            severity: 'WARNING',
            recommendation: 'Apply Copper Fungicide',
            status: 'Active',
            timestamp: formattedTime
          },
          ...prev
        ]);
      }

      setIsScanning(false);
      setScanProgress(null);
    }, 1800);
  };

  // Dynamic Live Time Clock
  const [currentTime, setCurrentTime] = useState('11:06 AM');

  // Custom Tab Setter that Pushes Browser History
  const changeTab = (newTab, skipPush = false) => {
    setActiveTabState(newTab);
    if (!skipPush && typeof window !== 'undefined') {
      const targetHash = `#${newTab}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState({ tab: newTab }, '', targetHash);
      }
    }
  };

  // Sync with Browser Back / Forward Buttons
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.history.state || !window.history.state.appStarted) {
      window.history.replaceState({ tab: activeTab, appStarted: true }, '', `#${activeTab}`);
      window.history.pushState({ tab: activeTab, appStarted: true }, '', `#${activeTab}`);
    }

    const handlePopState = (e) => {
      let targetTab = 'dashboard';
      if (e.state && e.state.tab) {
        targetTab = e.state.tab;
      } else if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        if (hash) targetTab = hash;
      }

      if (isFungicideModalOpen) setIsFungicideModalOpen(false);
      if (isSensorInputModalOpen) setIsSensorInputModalOpen(false);
      if (isImageUploadModalOpen) setIsImageUploadModalOpen(false);

      setActiveTabState(targetTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab, isFungicideModalOpen, isSensorInputModalOpen, isImageUploadModalOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(formatted);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePumpControl = (command) => {
    setPumpStatus(command);
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setPumpLastUpdated(formattedTime);

    if (command === 'ON') {
      setTimeout(() => {
        setSensorData((prev) => ({
          ...prev,
          soilMoisture: { ...prev.soilMoisture, value: 55, status: 'Optimal', color: '#4D8B43' }
        }));
      }, 2000);
    } else {
      setSensorData((prev) => ({
        ...prev,
        soilMoisture: { ...prev.soilMoisture, value: prev.soilMoisture.value > 0 ? 35 : 0, status: prev.soilMoisture.value > 0 ? 'Low' : '0% (No Input)' }
      }));
    }
  };

  // Alert Center State (Default empty until user provides image/sensor data)
  const [alerts, setAlerts] = useState([]);

  // Task Planner State
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (newTask) => {
    setTasks((prev) => [
      { id: `TSK-${Date.now()}`, completed: false, recommendedByAi: false, ...newTask },
      ...prev
    ]);
  };

  const resolveAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'Resolved' } : a))
    );
  };

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

  const deleteCamera = (cameraIdToDelete) => {
    setCameras((prev) => {
      const filtered = prev.filter((c) => c.id !== cameraIdToDelete);
      if (selectedCameraId === cameraIdToDelete) {
        setSelectedCameraId(filtered[0]?.id || '');
      }
      return filtered;
    });
  };

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
        setActiveTab: changeTab,
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
        analyzeUploadedImage,
        deleteCamera,
        // Sensor states & custom input handlers
        pumpStatus,
        pumpLastUpdated,
        handlePumpControl,
        sensorData,
        updateCustomSensorData,
        resetSensorDataToZero,
        currentTime,
        isFungicideModalOpen,
        setIsFungicideModalOpen,
        isSensorInputModalOpen,
        setIsSensorInputModalOpen,
        isImageUploadModalOpen,
        setIsImageUploadModalOpen,
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
