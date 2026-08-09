// Agriculture AI — Mock Alert Templates

export const INITIAL_ALERTS = [
  {
    id: 'ALT-001',
    type: 'critical',
    title: 'High Temperature Detected',
    message: 'Temperature in Field 01 has exceeded 38°C. Crops may experience heat stress.',
    fieldId: 'FIELD-A',
    sensorId: 'SEN-001',
    severity: 'critical',
    icon: '🔴',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    read: false,
    dismissed: false,
  },
  {
    id: 'ALT-002',
    type: 'warning',
    title: 'Low Soil Moisture',
    message: 'Soil moisture in Field 02 has dropped below 30%. Consider irrigation.',
    fieldId: 'FIELD-B',
    sensorId: 'SEN-006',
    severity: 'warning',
    icon: '🟡',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    read: false,
    dismissed: false,
  },
  {
    id: 'ALT-003',
    type: 'info',
    title: 'System Normal',
    message: 'All connected sensors are functioning normally. No issues detected.',
    fieldId: null,
    sensorId: null,
    severity: 'info',
    icon: '🟢',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    read: true,
    dismissed: false,
  },
];

// Check sensor values against thresholds and generate alerts
export function checkThresholds(readings, thresholds) {
  const newAlerts = [];
  const now = new Date().toISOString();

  if (readings.temperature?.value > thresholds.temperature.max) {
    newAlerts.push({
      id: `ALT-T-${Date.now()}`,
      type: readings.temperature.value > thresholds.temperature.criticalMax ? 'critical' : 'warning',
      title: 'High Temperature',
      message: `Temperature is ${readings.temperature.value}${thresholds.temperature.unit}, exceeding the ${thresholds.temperature.max}${thresholds.temperature.unit} threshold.`,
      severity: readings.temperature.value > thresholds.temperature.criticalMax ? 'critical' : 'warning',
      icon: readings.temperature.value > thresholds.temperature.criticalMax ? '🔴' : '🟡',
      timestamp: now,
      read: false,
      dismissed: false,
    });
  }

  if (readings.soilMoisture?.value < thresholds.soilMoisture.min) {
    newAlerts.push({
      id: `ALT-SM-${Date.now()}`,
      type: 'warning',
      title: 'Low Soil Moisture',
      message: `Soil moisture is at ${readings.soilMoisture.value}${thresholds.soilMoisture.unit}, below the ${thresholds.soilMoisture.min}${thresholds.soilMoisture.unit} minimum.`,
      severity: 'warning',
      icon: '🟡',
      timestamp: now,
      read: false,
      dismissed: false,
    });
  }

  if (readings.humidity?.value > thresholds.humidity.criticalMax) {
    newAlerts.push({
      id: `ALT-H-${Date.now()}`,
      type: 'warning',
      title: 'High Humidity Warning',
      message: `Humidity is at ${readings.humidity.value}${thresholds.humidity.unit}. Risk of fungal disease increases.`,
      severity: 'warning',
      icon: '🟡',
      timestamp: now,
      read: false,
      dismissed: false,
    });
  }

  return newAlerts;
}
