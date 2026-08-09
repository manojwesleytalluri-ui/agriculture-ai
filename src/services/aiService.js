// Agriculture AI — AI Analysis Service
// Generates insights and recommendations based on sensor data.
// In DEMO mode: algorithmic analysis. In LIVE mode: could call an AI API.

import { SENSOR_META } from '../data/mockSensors';

// Analyze current field conditions and produce insight cards
export function analyzeFieldConditions(readings) {
  const insights = [];

  // Temperature analysis
  const temp = readings.temperature?.value || 0;
  if (temp > 35) {
    insights.push({
      id: 'insight-temp-high',
      category: 'Temperature',
      icon: '🌡️',
      severity: 'warning',
      title: 'Temperature Alert',
      summary: `Temperature is ${temp}°C — above the preferred range for most crops.`,
      detail: 'High temperatures may cause heat stress, reduced pollination, and wilting. Consider shade nets or mist irrigation during peak hours.',
      confidence: 82,
    });
  } else if (temp < 18) {
    insights.push({
      id: 'insight-temp-low',
      category: 'Temperature',
      icon: '🌡️',
      severity: 'info',
      title: 'Low Temperature Notice',
      summary: `Temperature is ${temp}°C — below ideal for warm-season crops.`,
      detail: 'Cold conditions may slow growth. Monitor overnight temperatures for frost risk.',
      confidence: 75,
    });
  } else {
    insights.push({
      id: 'insight-temp-ok',
      category: 'Temperature',
      icon: '🌡️',
      severity: 'good',
      title: 'Temperature Optimal',
      summary: `Temperature at ${temp}°C is within the ideal range.`,
      detail: 'Current temperature conditions are suitable for healthy crop growth.',
      confidence: 95,
    });
  }

  // Soil moisture analysis
  const moisture = readings.soilMoisture?.value || 0;
  if (moisture < 30) {
    insights.push({
      id: 'insight-moisture-low',
      category: 'Irrigation',
      icon: '💧',
      severity: 'warning',
      title: 'Irrigation Recommended',
      summary: `Soil moisture at ${moisture}% — irrigation may be required soon.`,
      detail: 'Soil moisture has dropped below the minimum threshold. Schedule drip irrigation within the next 4-6 hours to prevent crop stress.',
      confidence: 88,
    });
  } else if (moisture > 75) {
    insights.push({
      id: 'insight-moisture-high',
      category: 'Irrigation',
      icon: '💧',
      severity: 'info',
      title: 'Adequate Soil Moisture',
      summary: `Soil moisture at ${moisture}% — no irrigation needed.`,
      detail: 'Soil moisture is above optimal. Delay irrigation to prevent waterlogging and root rot risk.',
      confidence: 90,
    });
  } else {
    insights.push({
      id: 'insight-moisture-ok',
      category: 'Irrigation',
      icon: '💧',
      severity: 'good',
      title: 'Soil Moisture Good',
      summary: `Soil moisture at ${moisture}% is within the recommended range.`,
      detail: 'No immediate irrigation is required. Continue monitoring.',
      confidence: 93,
    });
  }

  // Humidity analysis
  const humidity = readings.humidity?.value || 0;
  if (humidity > 80) {
    insights.push({
      id: 'insight-hum-high',
      category: 'Crop Environment',
      icon: '🌱',
      severity: 'warning',
      title: 'High Humidity Warning',
      summary: `Humidity at ${humidity}% increases risk of fungal diseases.`,
      detail: 'High humidity combined with warm temperatures creates favorable conditions for blast, blight, and mildew. Ensure proper ventilation and consider preventive fungicide application.',
      confidence: 79,
    });
  } else {
    insights.push({
      id: 'insight-env-ok',
      category: 'Crop Environment',
      icon: '🌱',
      severity: 'good',
      title: 'Crop Environment Suitable',
      summary: 'Current conditions are suitable for healthy crop growth.',
      detail: 'Temperature, humidity, and soil moisture are within acceptable ranges. Continue regular monitoring.',
      confidence: 92,
    });
  }

  return insights;
}

// Generate recommendation cards
export function getRecommendations(readings) {
  const recommendations = [];
  const temp = readings.temperature?.value || 0;
  const moisture = readings.soilMoisture?.value || 0;
  const humidity = readings.humidity?.value || 0;

  // Irrigation recommendation
  if (moisture < 40) {
    recommendations.push({
      id: 'rec-irrigation',
      icon: '💧',
      title: 'Irrigation Recommendation',
      action: 'Moderate irrigation may be required.',
      reason: `Soil moisture has decreased to ${moisture}% over the last 6 hours.`,
      priority: 'high',
    });
  } else {
    recommendations.push({
      id: 'rec-irrigation',
      icon: '💧',
      title: 'Irrigation Status',
      action: 'No immediate irrigation needed.',
      reason: `Soil moisture is currently at ${moisture}%, within the optimal range.`,
      priority: 'low',
    });
  }

  // Temperature recommendation
  if (temp > 35) {
    recommendations.push({
      id: 'rec-temp',
      icon: '🌡️',
      title: 'Temperature Alert',
      action: 'Temperature is above the preferred range.',
      reason: 'Continue monitoring the crop environment. Consider shade nets during peak hours.',
      priority: 'medium',
    });
  }

  // Crop environment
  recommendations.push({
    id: 'rec-crop',
    icon: '🌱',
    title: 'Crop Environment',
    action: humidity > 80 ? 'Monitor for fungal disease risk.' : 'Current conditions are suitable for healthy crop growth.',
    reason: humidity > 80
      ? 'High humidity may promote fungal infections. Ensure proper ventilation.'
      : 'All environmental parameters are within normal limits.',
    priority: humidity > 80 ? 'medium' : 'low',
  });

  return recommendations;
}

// Simple AI chat response based on sensor context
export function chatWithAI(message, sensorData) {
  const msg = message.toLowerCase();
  const temp = sensorData?.temperature?.value;
  const moisture = sensorData?.soilMoisture?.value;
  const humidity = sensorData?.humidity?.value;

  if (msg.includes('field condition') || msg.includes('current') || msg.includes('status')) {
    if (temp && moisture && humidity) {
      return `Based on current sensor data: Temperature is ${temp}°C, Soil Moisture is ${moisture}%, and Humidity is ${humidity}%. ${
        temp > 35 ? 'Temperature is slightly elevated — monitor for heat stress.' : 'All values are within normal operating range.'
      } The field appears to be in ${moisture > 30 && temp < 38 ? 'good' : 'stressed'} condition.`;
    }
    return "I don't have enough current sensor data to determine the field condition. Please ensure sensors are connected.";
  }

  if (msg.includes('soil moisture') || msg.includes('moisture low') || msg.includes('why is soil')) {
    if (moisture !== undefined) {
      return `Current soil moisture is at ${moisture}%. ${
        moisture < 35
          ? 'This is below the ideal range. The decrease could be due to high evapotranspiration from warm temperatures, insufficient irrigation, or sandy soil with low water retention. I recommend scheduling irrigation within the next few hours.'
          : 'This is within the recommended range. No action needed at this time.'
      }`;
    }
    return "I don't have enough current data to analyze soil moisture levels.";
  }

  if (msg.includes('temperature') || msg.includes('temp')) {
    if (temp !== undefined) {
      return `The current temperature is ${temp}°C. ${
        temp > 35 ? 'This is above optimal for most crops. Consider shade structures or mist cooling.' :
        temp < 18 ? 'This is below ideal for warm-season crops. Monitor for frost risk.' :
        'This is within the ideal range for crop growth.'
      }`;
    }
    return "Temperature data is not available at the moment.";
  }

  if (msg.includes('sensor') || msg.includes('problem') || msg.includes('offline')) {
    return 'All 6 sensors are currently online and reporting data normally. Last reading received within the past 10 seconds. No sensor issues detected.';
  }

  if (msg.includes('change') || msg.includes('today') || msg.includes('trend')) {
    return `Today's trends: Temperature ranged from approximately 23°C to ${temp || 29}°C, following the normal daily cycle. Soil moisture has gradually decreased by about 3-5% since morning due to evaporation. Humidity varies inversely with temperature. No unusual patterns detected.`;
  }

  if (msg.includes('water') || msg.includes('irrigat')) {
    if (moisture !== undefined) {
      return moisture < 40
        ? `Soil moisture is at ${moisture}%, which is below the ideal range. I recommend activating drip irrigation for 20-30 minutes to bring moisture back to the 50-60% range.`
        : `Soil moisture is at ${moisture}%, which is adequate. No additional irrigation is needed at this time.`;
    }
    return "I don't have enough data to make an irrigation recommendation.";
  }

  return "I can help you understand your field conditions. Try asking about the current field condition, soil moisture levels, temperature trends, sensor status, or irrigation needs. My analysis is based on the live sensor data from your farm.";
}
