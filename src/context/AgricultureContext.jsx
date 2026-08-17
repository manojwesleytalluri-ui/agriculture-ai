// Agriculture AI — Global State Management
// Supports three data modes: DEMO (mock data), LIVE (backend API), and BLYNK (Blynk IoT Cloud)
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import appConfig from '../config/appConfig';
import blynkService from '../services/blynkService';
import { generateCurrentReadings } from '../data/mockSensors';
import { FIELDS } from '../data/mockFields';
import { CROP_DATABASE, NUTRIENT_DEFICIENCIES } from '../data/mockCrops';
import { MOCK_WEATHER } from '../data/mockWeather';
import { INITIAL_ALERTS, checkThresholds } from '../data/mockAlerts';
import { analyzeFieldConditions, getRecommendations } from '../services/aiService';

const AgricultureContext = createContext();

const PAGES = [
  'home', 'dashboard', 'field_monitoring', 'ai_insights', 'crop_health',
  'crop_vision', 'alerts', 'sensor_management', 'architecture',
  'farmer_profile', 'about',
];

export const AgricultureProvider = ({ children }) => {
  // ── Theme ──
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('agri-theme') || 'dark';
    }
    return 'dark';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('agri-theme', next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // ── Page Navigation (hash-based) ──
  const [activePage, setActivePageState] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (PAGES.includes(hash)) return hash;
    }
    return 'home';
  });

  const setActivePage = useCallback((page, skipPush = false) => {
    setActivePageState(page);
    if (!skipPush && typeof window !== 'undefined') {
      const target = `#${page}`;
      if (window.location.hash !== target) {
        window.history.pushState({ page }, '', target);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.history.state?.appStarted) {
      window.history.replaceState({ page: activePage, appStarted: true }, '', `#${activePage}`);
    }
    const handlePop = (e) => {
      let target = 'home';
      if (e.state?.page) target = e.state.page;
      else if (window.location.hash) {
        const h = window.location.hash.replace('#', '');
        if (PAGES.includes(h)) target = h;
      }
      setActivePageState(target);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [activePage]);

  // ── Farmer Profile ──
  const [farmer, setFarmer] = useState({
    name: appConfig.DEFAULT_FARM.farmerName,
    farmName: appConfig.DEFAULT_FARM.name,
    location: appConfig.DEFAULT_FARM.location,
    email: 'manoj@greenvalleyfarm.in',
    fieldsCount: FIELDS.length,
    sensorsCount: 6,
    crops: ['Rice', 'Tomato'],
  });

  // ── Sensor Data ──
  const [sensorReadings, setSensorReadings] = useState(() => generateCurrentReadings());
  const [previousReadings, setPreviousReadings] = useState(() => generateCurrentReadings());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [sensorError, setSensorError] = useState(null);

  // ── Blynk Connection Status ──
  const [blynkStatus, setBlynkStatus] = useState({
    status: 'disconnected',
    lastError: null,
    consecutiveFailures: 0,
  });
  const [pumpIsOn, setPumpIsOn] = useState(false);

  // ── Fields ──
  const [fields] = useState(FIELDS);

  // ── Weather ──
  const [weather] = useState(MOCK_WEATHER);

  // ── Alerts ──
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const markAlertRead = useCallback((alertId) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, read: true } : a)));
  }, []);

  const dismissAlert = useCallback((alertId) => {
    setAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, dismissed: true } : a)));
  }, []);

  // ── AI Insights ──
  const [aiInsights, setAiInsights] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);

  // ── Notifications ──
  const [notifications, setNotifications] = useState([
    { id: 'n1', message: 'All field sensors connected successfully.', icon: '📡', time: '15 minutes ago', read: false },
    { id: 'n2', message: 'Soil moisture changed significantly.', icon: '🌱', time: '2 minutes ago', read: false },
  ]);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  // ── Clock ──
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Ref to hold latest sensorReadings for the Blynk callback ──
  const sensorReadingsRef = useRef(sensorReadings);
  useEffect(() => {
    sensorReadingsRef.current = sensorReadings;
  }, [sensorReadings]);

  // ── Blynk Data Fetch Function ──
  const fetchBlynkData = useCallback(async () => {
    try {
      setIsLoading(true);
      setSensorError(null);

      const newReadings = await blynkService.readAllPins();

      setPreviousReadings({ ...sensorReadingsRef.current });
      setSensorReadings(newReadings);
      setLastUpdate(new Date());

      // Update connection status
      const connStatus = blynkService.getConnectionStatus();
      setBlynkStatus(connStatus);

      // Update pump status
      const pump = blynkService.getPumpStatus();
      setPumpIsOn(pump.isOn);

      // Update AI with Blynk data
      setAiInsights(analyzeFieldConditions(newReadings));
      setAiRecommendations(getRecommendations(newReadings));

      // Check thresholds against live data
      const newAlerts = checkThresholds(newReadings, appConfig.THRESHOLDS);
      if (newAlerts.length > 0) {
        setAlerts((prev) => [...newAlerts, ...prev].slice(0, 50));
      }

      // Add Blynk connected notification on first success
      if (connStatus.status === 'connected' && connStatus.consecutiveFailures === 0) {
        setNotifications((prev) => {
          const hasBlynkNotif = prev.some((n) => n.id === 'blynk-connected');
          if (hasBlynkNotif) return prev;
          return [
            {
              id: 'blynk-connected',
              message: '🟢 Blynk Cloud connected — live sensor data active.',
              icon: '☁️',
              time: 'Just now',
              read: false,
            },
            ...prev,
          ];
        });
      }
    } catch (error) {
      console.error('[AgricultureContext] Blynk fetch error:', error);
      setSensorError(error.message);
      setBlynkStatus({
        status: 'error',
        lastError: error.message,
        consecutiveFailures: blynkService.getConnectionStatus().consecutiveFailures,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Blynk Polling Timer ──
  useEffect(() => {
    if (appConfig.DATA_SOURCE !== 'BLYNK') return;

    // Initial fetch
    fetchBlynkData();

    // Set up polling interval
    const intervalId = setInterval(fetchBlynkData, appConfig.SENSOR_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []); // Only run once on mount for Blynk mode

  // ── Demo Data Refresh Timer ──
  useEffect(() => {
    if (appConfig.DATA_SOURCE !== 'DEMO') return;

    const interval = setInterval(() => {
      setPreviousReadings(sensorReadings);
      const newReadings = generateCurrentReadings();
      setSensorReadings(newReadings);
      setLastUpdate(new Date());

      // Update AI
      setAiInsights(analyzeFieldConditions(newReadings));
      setAiRecommendations(getRecommendations(newReadings));

      // Check thresholds
      const newAlerts = checkThresholds(newReadings, appConfig.THRESHOLDS);
      if (newAlerts.length > 0) {
        setAlerts((prev) => [...newAlerts, ...prev].slice(0, 50));
      }
    }, appConfig.SENSOR_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [sensorReadings]);

  // Initial AI analysis
  useEffect(() => {
    setAiInsights(analyzeFieldConditions(sensorReadings));
    setAiRecommendations(getRecommendations(sensorReadings));
  }, []);

  // ── Computed Values ──
  const unreadAlerts = alerts.filter((a) => !a.read && !a.dismissed).length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const sensorStatus = appConfig.DATA_SOURCE === 'BLYNK'
    ? {
        total: 5,
        online: blynkStatus.status === 'connected' ? 5 : 0,
        offline: blynkStatus.status === 'connected' ? 0 : 5,
      }
    : { total: 6, online: 6, offline: 0 };

  const fieldHealthStatus = (() => {
    const temp = sensorReadings.temperature?.value || 0;
    const moisture = sensorReadings.soilMoisture?.value || 0;
    if (temp > 38 || moisture < 25) return { label: 'Stressed', color: 'red', icon: '🔴' };
    if (temp > 35 || moisture < 35) return { label: 'Moderate', color: 'amber', icon: '🟡' };
    return { label: 'Healthy', color: 'green', icon: '🟢' };
  })();

  const soilCondition = (() => {
    const m = sensorReadings.soilMoisture?.value || 0;
    if (m < 25) return { label: 'Dry', color: 'red', icon: '🔴' };
    if (m < 40) return { label: 'Fair', color: 'amber', icon: '🟡' };
    return { label: 'Good', color: 'green', icon: '🟢' };
  })();

  // ── Greeting ──
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  })();

  return (
    <AgricultureContext.Provider
      value={{
        // Theme
        theme, toggleTheme,
        // Navigation
        activePage, setActivePage,
        // Farmer
        farmer, setFarmer,
        // Sensor data
        sensorReadings, previousReadings, lastUpdate, isLoading, sensorError,
        // Blynk-specific
        blynkStatus, pumpIsOn, blynkService,
        // Fields
        fields,
        // Weather
        weather,
        // Alerts
        alerts, setAlerts, markAlertRead, dismissAlert, unreadAlerts,
        // AI
        aiInsights, aiRecommendations,
        // Notifications
        notifications, unreadNotifications, markNotificationRead,
        // Crops
        crops: CROP_DATABASE, nutrientDeficiencies: NUTRIENT_DEFICIENCIES,
        // Clock
        currentTime,
        // Computed
        sensorStatus, fieldHealthStatus, soilCondition, greeting,
        // Config
        dataSource: appConfig.DATA_SOURCE,
      }}
    >
      {children}
    </AgricultureContext.Provider>
  );
};

export const useAgriculture = () => useContext(AgricultureContext);
