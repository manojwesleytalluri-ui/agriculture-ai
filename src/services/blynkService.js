// Agriculture AI — Blynk Cloud Service
// Fetches real-time sensor data from Blynk IoT Cloud REST API.
// Handles individual pin reads, batch reads, connection status, and history tracking.

import blynkConfig from '../config/blynkConfig';

class BlynkService {
  constructor() {
    this._history = {};        // { sensorKey: [{ value, timestamp, time, date }] }
    this._maxHistoryPoints = 100;
    this._lastReadings = null;
    this._connectionStatus = 'disconnected'; // 'connected' | 'disconnected' | 'error'
    this._lastError = null;
    this._consecutiveFailures = 0;
  }

  // ── Core API ──────────────────────────────────────────────────────

  /**
   * Read a single virtual pin value from Blynk Cloud.
   * @param {string} pin - e.g. 'v0', 'v1'
   * @returns {Promise<number|string|null>}
   */
  async readPin(pin) {
    const url = `${blynkConfig.BASE_URL}/get?token=${blynkConfig.AUTH_TOKEN}&${pin}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), blynkConfig.TIMEOUT);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Blynk API error: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      const trimmed = text.trim();
      const value = parseFloat(trimmed);
      return isNaN(value) ? trimmed : value;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Blynk API timeout reading pin ${pin}`);
      }
      throw error;
    }
  }

  /**
   * Read all configured virtual pins in parallel.
   * Returns sensor readings in the same format as mockSensors.generateCurrentReadings().
   * @returns {Promise<Object>} - { temperature: { value, timestamp }, humidity: { ... }, ... }
   */
  async readAllPins() {
    const pins = Object.values(blynkConfig.PIN_MAP);
    const now = new Date();
    const timestamp = now.toISOString();

    try {
      // Fetch all pins in parallel for speed
      const results = await Promise.allSettled(
        pins.map((pinInfo) => this.readPin(pinInfo.pin))
      );

      const readings = {};
      let successCount = 0;

      pins.forEach((pinInfo, index) => {
        const result = results[index];
        if (result.status === 'fulfilled' && result.value !== null && result.value !== undefined) {
          const rawValue = result.value;
          readings[pinInfo.key] = {
            value: typeof rawValue === 'number'
              ? parseFloat(rawValue.toFixed(1))
              : rawValue,
            timestamp,
            source: 'blynk',
            pin: pinInfo.pin,
          };
          successCount++;
        } else {
          // Use last known value or default to 0
          const lastValue = this._lastReadings?.[pinInfo.key]?.value ?? 0;
          readings[pinInfo.key] = {
            value: lastValue,
            timestamp,
            source: 'cached',
            pin: pinInfo.pin,
            error: result.reason?.message || 'Pin read failed',
          };
        }
      });

      // Derive light intensity from time of day (not on Blynk)
      if (!readings.light) {
        const hour = now.getHours() + now.getMinutes() / 60;
        let lightValue = 0;
        if (hour >= 6 && hour <= 19) {
          const peakHour = 12.5;
          const spread = 6;
          lightValue = Math.max(0, Math.min(95, 85 * Math.exp(-0.5 * Math.pow((hour - peakHour) / spread, 2))));
        }
        readings.light = {
          value: parseFloat(lightValue.toFixed(0)),
          timestamp,
          source: 'estimated',
        };
      }

      // Derive air quality (not on Blynk)
      if (!readings.airQuality) {
        readings.airQuality = {
          value: 50,
          timestamp,
          source: 'estimated',
        };
      }

      // Update connection status
      if (successCount > 0) {
        this._connectionStatus = 'connected';
        this._consecutiveFailures = 0;
        this._lastError = null;
      } else {
        this._consecutiveFailures++;
        this._connectionStatus = this._consecutiveFailures >= blynkConfig.RETRY.maxAttempts ? 'error' : 'disconnected';
      }

      // Store history for chartable sensors (not pump control)
      this._pushToHistory(readings, now);
      this._lastReadings = readings;

      return readings;
    } catch (error) {
      this._consecutiveFailures++;
      this._lastError = error.message;
      this._connectionStatus = 'error';

      console.error('[BlynkService] Failed to read all pins:', error);

      // Return last known readings if available
      if (this._lastReadings) {
        return { ...this._lastReadings };
      }

      // Absolute fallback — return zeros
      const fallback = {};
      pins.forEach((pinInfo) => {
        fallback[pinInfo.key] = { value: 0, timestamp, source: 'fallback' };
      });
      return fallback;
    }
  }

  // ── History Tracking ──────────────────────────────────────────────

  /**
   * Push current readings into the rolling history buffer.
   */
  _pushToHistory(readings, timestamp) {
    const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });

    Object.entries(readings).forEach(([key, data]) => {
      // Skip pump control from history charts
      if (key === 'pumpControl') return;

      if (!this._history[key]) {
        this._history[key] = [];
      }

      this._history[key].push({
        value: data.value,
        timestamp: timestamp.toISOString(),
        time,
        date,
      });

      // Trim old entries
      if (this._history[key].length > this._maxHistoryPoints) {
        this._history[key] = this._history[key].slice(-this._maxHistoryPoints);
      }
    });
  }

  /**
   * Get recorded history for a specific sensor type.
   * @param {string} sensorType - e.g. 'temperature', 'humidity'
   * @returns {Array}
   */
  getHistory(sensorType) {
    return this._history[sensorType] || [];
  }

  /**
   * Get history with computed stats.
   */
  getHistoryWithStats(sensorType) {
    const history = this.getHistory(sensorType);
    if (!history.length) {
      return { history: [], stats: { current: 0, avg: 0, min: 0, max: 0 } };
    }
    const values = history.map((d) => d.value);
    const stats = {
      current: values[values.length - 1],
      avg: parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)),
      min: parseFloat(Math.min(...values).toFixed(1)),
      max: parseFloat(Math.max(...values).toFixed(1)),
    };
    return { history, stats };
  }

  // ── Connection Status ─────────────────────────────────────────────

  /**
   * Get current connection status.
   * @returns {{ status: string, lastError: string|null, consecutiveFailures: number }}
   */
  getConnectionStatus() {
    return {
      status: this._connectionStatus,
      lastError: this._lastError,
      consecutiveFailures: this._consecutiveFailures,
    };
  }

  /**
   * Check if device is online by pinging a known pin.
   * @returns {Promise<boolean>}
   */
  async isDeviceOnline() {
    try {
      const value = await this.readPin('v0');
      return value !== null && value !== undefined;
    } catch {
      return false;
    }
  }

  /**
   * Get the pump control status from Blynk.
   * @returns {{ isOn: boolean, value: number|string }}
   */
  getPumpStatus() {
    const pump = this._lastReadings?.pumpControl;
    if (!pump) return { isOn: false, value: 0 };
    return {
      isOn: pump.value === 1 || pump.value === '1',
      value: pump.value,
    };
  }

  /**
   * Reset the service state.
   */
  reset() {
    this._history = {};
    this._lastReadings = null;
    this._connectionStatus = 'disconnected';
    this._lastError = null;
    this._consecutiveFailures = 0;
  }
}

// Singleton instance
const blynkService = new BlynkService();
export default blynkService;
