// Agriculture AI — Sensor Service Layer
// In DEMO mode: returns generated mock data
// In LIVE mode: fetches from backend API endpoints

import appConfig from '../config/appConfig';
import { generateCurrentReadings, generateHistory, computeStats, SENSORS } from '../data/mockSensors';

class SensorService {
  async getLatestReadings() {
    if (appConfig.DATA_SOURCE === 'LIVE') {
      const res = await fetch(`${appConfig.API_BASE_URL}/readings/latest`);
      return res.json();
    }
    return generateCurrentReadings();
  }

  async getHistory(sensorType, timeRangeKey = 'TODAY') {
    if (appConfig.DATA_SOURCE === 'LIVE') {
      const res = await fetch(`${appConfig.API_BASE_URL}/readings/history?type=${sensorType}&range=${timeRangeKey}`);
      return res.json();
    }
    const range = appConfig.TIME_RANGES[timeRangeKey];
    return generateHistory(sensorType, range.points, range.intervalMinutes);
  }

  async getHistoryWithStats(sensorType, timeRangeKey = 'TODAY') {
    const history = await this.getHistory(sensorType, timeRangeKey);
    const stats = computeStats(history);
    return { history, stats };
  }

  async getSensors() {
    if (appConfig.DATA_SOURCE === 'LIVE') {
      const res = await fetch(`${appConfig.API_BASE_URL}/sensors`);
      return res.json();
    }
    return SENSORS;
  }

  async getSensorStatus() {
    const sensors = await this.getSensors();
    const online = sensors.filter((s) => s.status === 'online').length;
    return { total: sensors.length, online, offline: sensors.length - online };
  }
}

export default new SensorService();
