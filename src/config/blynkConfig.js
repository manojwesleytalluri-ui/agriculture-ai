// Agriculture AI — Blynk IoT Cloud Configuration
// Maps Blynk virtual pins to sensor data fields.
// Auth Token connects to your specific Blynk device.

const blynkConfig = {
  // Blynk Cloud REST API base URL
  // In development, use the Vite proxy to avoid CORS issues
  // In production, use the direct Blynk Cloud URL
  BASE_URL: import.meta.env.DEV ? '/blynk-api' : 'https://blynk.cloud/external/api',

  // Device Auth Token (from Blynk Console)
  AUTH_TOKEN: 'WuYCmoMvLCzVAB070ENTSew3DjUwuYiJ',

  // Virtual Pin → Sensor Mapping
  // Matches your Blynk Console template exactly:
  //   V0 = Temperature (°C)
  //   V1 = Humidity (%)
  //   V2 = Rain Status (0/1 or mm)
  //   V3 = Soil Moisture (%)
  //   V5 = Pump Control (0 = OFF, 1 = ON)
  PIN_MAP: {
    V0: { key: 'temperature',  label: 'Temperature',    unit: '°C',  icon: '🌡️', pin: 'v0' },
    V1: { key: 'humidity',     label: 'Humidity',        unit: '%',   icon: '💧', pin: 'v1' },
    V2: { key: 'rainfall',    label: 'Rain Status',     unit: '',    icon: '🌧️', pin: 'v2' },
    V3: { key: 'soilMoisture', label: 'Soil Moisture',   unit: '%',   icon: '🌱', pin: 'v3' },
    V5: { key: 'pumpControl',  label: 'Pump Control',    unit: '',    icon: '💦', pin: 'v5' },
  },

  // Polling interval for live data refresh (milliseconds)
  POLL_INTERVAL: 5000,

  // Connection timeout (milliseconds)
  TIMEOUT: 8000,

  // Retry configuration
  RETRY: {
    maxAttempts: 3,
    delayMs: 2000,
  },
};

export default blynkConfig;
