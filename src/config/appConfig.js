// Agriculture AI — Application Configuration
// Toggle DATA_SOURCE between 'DEMO' and 'LIVE' to switch modes.

const appConfig = {
  // Data source: 'DEMO' uses generated mock data; 'LIVE' fetches from backend API
  DATA_SOURCE: 'DEMO',

  // Backend API base URL (used when DATA_SOURCE = 'LIVE')
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',

  // Sensor refresh interval in milliseconds
  SENSOR_REFRESH_INTERVAL: 10000,

  // Chart history intervals
  TIME_RANGES: {
    HOUR: { label: 'Last Hour', points: 12, intervalMinutes: 5 },
    TODAY: { label: 'Today', points: 24, intervalMinutes: 60 },
    WEEK: { label: '7 Days', points: 7, intervalMinutes: 1440 },
    MONTH: { label: '30 Days', points: 30, intervalMinutes: 1440 },
  },

  // Sensor threshold alerts
  THRESHOLDS: {
    temperature: { min: 15, max: 38, criticalMax: 42, unit: '°C' },
    humidity: { min: 30, max: 80, criticalMax: 95, unit: '%' },
    soilMoisture: { min: 25, max: 75, criticalMax: 90, unit: '%' },
    light: { min: 20, max: 90, criticalMax: 100, unit: '%' },
    rainfall: { min: 0, max: 50, criticalMax: 100, unit: 'mm' },
    airQuality: { min: 0, max: 150, criticalMax: 300, unit: 'AQI' },
  },

  // Farm info
  DEFAULT_FARM: {
    name: 'Green Valley Farm',
    location: 'Tamil Nadu, India',
    farmerId: 'FARMER-001',
    farmerName: 'Manoj Kumar',
  },
};

export default appConfig;
