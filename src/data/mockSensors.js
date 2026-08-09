// Agriculture AI — Mock Sensor Definitions & Realistic Data Generator

export const SENSOR_TYPES = {
  TEMPERATURE: 'temperature',
  HUMIDITY: 'humidity',
  SOIL_MOISTURE: 'soilMoisture',
  LIGHT: 'light',
  RAINFALL: 'rainfall',
  AIR_QUALITY: 'airQuality',
};

export const SENSOR_META = {
  [SENSOR_TYPES.TEMPERATURE]: { label: 'Temperature', unit: '°C', icon: '🌡️', color: '#E67E22', idealMin: 20, idealMax: 32 },
  [SENSOR_TYPES.HUMIDITY]: { label: 'Humidity', unit: '%', icon: '💧', color: '#2980B9', idealMin: 45, idealMax: 75 },
  [SENSOR_TYPES.SOIL_MOISTURE]: { label: 'Soil Moisture', unit: '%', icon: '🌱', color: '#2D6A4F', idealMin: 35, idealMax: 65 },
  [SENSOR_TYPES.LIGHT]: { label: 'Light Intensity', unit: '%', icon: '☀️', color: '#F1C40F', idealMin: 40, idealMax: 85 },
  [SENSOR_TYPES.RAINFALL]: { label: 'Rainfall', unit: 'mm', icon: '🌧️', color: '#5DADE2', idealMin: 0, idealMax: 30 },
  [SENSOR_TYPES.AIR_QUALITY]: { label: 'Air Quality', unit: 'AQI', icon: '🌬️', color: '#8E44AD', idealMin: 0, idealMax: 100 },
};

export const SENSORS = [
  { id: 'SEN-001', name: 'Sensor 01', type: SENSOR_TYPES.TEMPERATURE, fieldId: 'FIELD-A', location: 'North-East Corner', status: 'online' },
  { id: 'SEN-002', name: 'Sensor 02', type: SENSOR_TYPES.HUMIDITY, fieldId: 'FIELD-A', location: 'North-West Corner', status: 'online' },
  { id: 'SEN-003', name: 'Sensor 03', type: SENSOR_TYPES.SOIL_MOISTURE, fieldId: 'FIELD-A', location: 'Center', status: 'online' },
  { id: 'SEN-004', name: 'Sensor 04', type: SENSOR_TYPES.TEMPERATURE, fieldId: 'FIELD-B', location: 'South-East Corner', status: 'online' },
  { id: 'SEN-005', name: 'Sensor 05', type: SENSOR_TYPES.HUMIDITY, fieldId: 'FIELD-B', location: 'South-West Corner', status: 'online' },
  { id: 'SEN-006', name: 'Sensor 06', type: SENSOR_TYPES.SOIL_MOISTURE, fieldId: 'FIELD-B', location: 'Center', status: 'online' },
];

// Generate a realistic daily temperature curve
function getDailyTemperature(hour) {
  // Coolest at 5 AM (~22°C), hottest at 2 PM (~33°C)
  const baseTemp = 27.5;
  const amplitude = 5.5;
  const phase = -Math.PI / 2; // shift so peak is ~14:00
  return baseTemp + amplitude * Math.sin((2 * Math.PI * (hour - 8)) / 24 + phase);
}

// Generate correlated humidity (inversely proportional to temperature)
function getDailyHumidity(hour) {
  const baseHumidity = 60;
  const amplitude = 15;
  // Humidity is opposite to temperature
  return baseHumidity - amplitude * Math.sin((2 * Math.PI * (hour - 8)) / 24 - Math.PI / 2);
}

// Generate soil moisture with gradual decline
function getSoilMoisture(hour, dayOffset = 0) {
  const baseMoisture = 58;
  const dailyLoss = dayOffset * 2;
  const hourlyVariation = 3 * Math.sin((2 * Math.PI * hour) / 24);
  return Math.max(25, Math.min(80, baseMoisture - dailyLoss + hourlyVariation));
}

// Generate light intensity based on sun position
function getLightIntensity(hour) {
  if (hour < 6 || hour > 19) return Math.random() * 5;
  const peakHour = 12.5;
  const spread = 6;
  return Math.max(0, Math.min(95, 85 * Math.exp(-0.5 * Math.pow((hour - peakHour) / spread, 2)) + Math.random() * 8));
}

// Small random jitter
function jitter(value, range = 1.5) {
  return value + (Math.random() - 0.5) * range * 2;
}

// Generate current sensor readings
export function generateCurrentReadings() {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;

  return {
    temperature: { value: parseFloat(jitter(getDailyTemperature(hour), 1).toFixed(1)), timestamp: now.toISOString() },
    humidity: { value: parseFloat(jitter(getDailyHumidity(hour), 2).toFixed(0)), timestamp: now.toISOString() },
    soilMoisture: { value: parseFloat(jitter(getSoilMoisture(hour), 2).toFixed(0)), timestamp: now.toISOString() },
    light: { value: parseFloat(jitter(getLightIntensity(hour), 3).toFixed(0)), timestamp: now.toISOString() },
    rainfall: { value: parseFloat((Math.random() < 0.3 ? Math.random() * 15 : Math.random() * 3).toFixed(1)), timestamp: now.toISOString() },
    airQuality: { value: Math.floor(40 + Math.random() * 60), timestamp: now.toISOString() },
  };
}

// Generate historical time-series data
export function generateHistory(sensorType, pointCount, intervalMinutes) {
  const now = new Date();
  const data = [];

  for (let i = pointCount - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * intervalMinutes * 60000);
    const hour = timestamp.getHours() + timestamp.getMinutes() / 60;
    const dayOffset = i / (1440 / intervalMinutes); // days ago

    let value;
    switch (sensorType) {
      case SENSOR_TYPES.TEMPERATURE:
        value = parseFloat(jitter(getDailyTemperature(hour), 1.2).toFixed(1));
        break;
      case SENSOR_TYPES.HUMIDITY:
        value = parseFloat(jitter(getDailyHumidity(hour), 2.5).toFixed(0));
        break;
      case SENSOR_TYPES.SOIL_MOISTURE:
        value = parseFloat(jitter(getSoilMoisture(hour, dayOffset), 2).toFixed(0));
        break;
      case SENSOR_TYPES.LIGHT:
        value = parseFloat(jitter(getLightIntensity(hour), 4).toFixed(0));
        break;
      case SENSOR_TYPES.RAINFALL:
        value = parseFloat((Math.random() < 0.2 ? Math.random() * 12 : Math.random() * 2).toFixed(1));
        break;
      case SENSOR_TYPES.AIR_QUALITY:
        value = Math.floor(35 + Math.random() * 70);
        break;
      default:
        value = Math.random() * 50;
    }

    data.push({
      timestamp: timestamp.toISOString(),
      time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      value: Math.max(0, value),
    });
  }

  return data;
}

// Compute stats from a history array
export function computeStats(history) {
  if (!history.length) return { current: 0, avg: 0, min: 0, max: 0 };
  const values = history.map((d) => d.value);
  return {
    current: values[values.length - 1],
    avg: parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)),
    min: parseFloat(Math.min(...values).toFixed(1)),
    max: parseFloat(Math.max(...values).toFixed(1)),
  };
}
