import React, { useState, useEffect } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { SENSOR_META, SENSOR_TYPES, generateHistory, computeStats } from '../../data/mockSensors';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Clock, Wifi, Cloud, Droplets, Wind, Sun as SunIcon, Thermometer, Eye } from 'lucide-react';
import appConfig from '../../config/appConfig';

function SummaryCard({ icon, label, value, status, color }) {
  const colors = {
    green: { bg: 'var(--color-primary-50)', text: 'var(--color-primary)', border: 'var(--color-primary-200)' },
    amber: { bg: 'var(--color-amber-bg)', text: 'var(--color-amber)', border: 'var(--color-amber)' },
    red: { bg: 'var(--color-red-bg)', text: 'var(--color-red)', border: 'var(--color-red)' },
  };
  const c = colors[color] || colors.green;

  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
        style={{ background: c.bg, border: `1px solid ${c.border}` }}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
        <p className="text-sm font-bold" style={{ color: c.text }}>{value}</p>
      </div>
    </div>
  );
}

function SensorCard({ type, current, previous }) {
  const meta = SENSOR_META[type];
  if (!meta) return null;

  const diff = current - (previous || current);
  const trend = diff > 0.5 ? 'up' : diff < -0.5 ? 'down' : 'stable';

  // Mini sparkline data
  const [sparkData, setSparkData] = useState([]);
  useEffect(() => {
    const hist = generateHistory(type, 12, 5);
    setSparkData(hist);
  }, [type, current]);

  return (
    <div className="card card-interactive p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{meta.icon}</span>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>{meta.label}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: current >= meta.idealMin && current <= meta.idealMax ? 'var(--color-primary-50)' : 'var(--color-amber-bg)',
            color: current >= meta.idealMin && current <= meta.idealMax ? 'var(--color-primary)' : 'var(--color-amber)',
          }}>
          {current >= meta.idealMin && current <= meta.idealMax ? 'Normal' : current < meta.idealMin ? 'Low' : 'High'}
        </div>
      </div>

      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--color-text)' }}>
            {current}<span className="text-sm font-medium ml-0.5" style={{ color: 'var(--color-text-muted)' }}>{meta.unit}</span>
          </p>
          <div className="flex items-center gap-1 mt-1">
            {trend === 'up' && <TrendingUp className="w-3 h-3" style={{ color: 'var(--color-orange)' }} />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" style={{ color: 'var(--color-blue)' }} />}
            {trend === 'stable' && <Minus className="w-3 h-3" style={{ color: 'var(--color-text-muted)' }} />}
            <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
              {previous ? `Prev: ${previous}${meta.unit}` : 'Stable'}
            </span>
          </div>
        </div>

        {/* Mini sparkline */}
        <div className="w-20 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData}>
              <defs>
                <linearGradient id={`spark-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={meta.color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={meta.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke={meta.color} strokeWidth={1.5} fill={`url(#spark-${type})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function WeatherCard({ weather }) {
  return (
    <div className="card p-5">
      <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
        <Cloud className="w-3.5 h-3.5 inline mr-1.5" />Weather
      </h3>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-4xl">{weather.conditionIcon}</span>
        <div>
          <p className="text-2xl font-extrabold" style={{ color: 'var(--color-text)' }}>{weather.currentTemp}°C</p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{weather.condition}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
          <Droplets className="w-3 h-3" /> Humidity: <strong>{weather.humidity}%</strong>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
          <Wind className="w-3 h-3" /> Wind: <strong>{weather.windSpeedKm} km/h</strong>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
          <Droplets className="w-3 h-3" /> Rain: <strong>{weather.rainProbability}%</strong>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
          <SunIcon className="w-3 h-3" /> UV: <strong>{weather.uvIndex}</strong>
        </div>
      </div>
      {/* Forecast */}
      <div className="mt-3 pt-3 border-t flex gap-2 overflow-x-auto" style={{ borderColor: 'var(--color-border-light)' }}>
        {weather.forecast.slice(0, 5).map((d) => (
          <div key={d.day} className="text-center px-2 py-1 rounded-lg shrink-0 min-w-[48px]"
            style={{ background: 'var(--color-surface-raised)' }}>
            <p className="text-[10px] font-medium" style={{ color: 'var(--color-text-muted)' }}>{d.day}</p>
            <p className="text-base">{d.condition}</p>
            <p className="text-[10px] font-bold" style={{ color: 'var(--color-text)' }}>{d.high}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SensorChart() {
  const [selectedSensor, setSelectedSensor] = useState(SENSOR_TYPES.TEMPERATURE);
  const [timeRange, setTimeRange] = useState('TODAY');
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({ current: 0, avg: 0, min: 0, max: 0 });

  useEffect(() => {
    const range = appConfig.TIME_RANGES[timeRange];
    const history = generateHistory(selectedSensor, range.points, range.intervalMinutes);
    setChartData(history);
    setStats(computeStats(history));
  }, [selectedSensor, timeRange]);

  const meta = SENSOR_META[selectedSensor];
  const sensorOptions = [SENSOR_TYPES.TEMPERATURE, SENSOR_TYPES.HUMIDITY, SENSOR_TYPES.SOIL_MOISTURE];

  return (
    <div className="card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>📈 Live Sensor Graph</h3>
        <div className="flex flex-wrap gap-1.5">
          {sensorOptions.map((s) => (
            <button key={s} onClick={() => setSelectedSensor(s)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all"
              style={{
                background: selectedSensor === s ? 'var(--color-primary)' : 'var(--color-surface-raised)',
                color: selectedSensor === s ? '#fff' : 'var(--color-text-secondary)',
              }}>
              {SENSOR_META[s].icon} {SENSOR_META[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Time filters */}
      <div className="flex gap-1 mb-4">
        {Object.entries(appConfig.TIME_RANGES).map(([key, val]) => (
          <button key={key} onClick={() => setTimeRange(key)}
            className="px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all"
            style={{
              background: timeRange === key ? 'var(--color-surface-raised)' : 'transparent',
              color: timeRange === key ? 'var(--color-text)' : 'var(--color-text-muted)',
              border: timeRange === key ? '1px solid var(--color-border)' : '1px solid transparent',
            }}>
            {val.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Current', value: stats.current },
          { label: 'Average', value: stats.avg },
          { label: 'Min', value: stats.min },
          { label: 'Max', value: stats.max },
        ].map((s) => (
          <div key={s.label} className="text-center py-2 rounded-lg" style={{ background: 'var(--color-surface-raised)' }}>
            <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{s.value}{meta.unit}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={meta.color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={meta.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
            <XAxis dataKey={timeRange === 'HOUR' || timeRange === 'TODAY' ? 'time' : 'date'}
              tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false}
              domain={['auto', 'auto']} />
            <Tooltip contentStyle={{
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: '8px', fontSize: '11px', color: 'var(--color-text)',
            }} />
            <Area type="monotone" dataKey="value" stroke={meta.color} strokeWidth={2} fill="url(#chartGrad)" dot={false}
              name={`${meta.label} (${meta.unit})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { greeting, farmer, sensorReadings, previousReadings, lastUpdate, fieldHealthStatus, soilCondition,
    sensorStatus, weather, dataSource } = useAgriculture();

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Demo Banner */}
      {dataSource === 'DEMO' && (
        <div className="px-4 py-2 rounded-xl text-xs font-medium text-center"
          style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber)', border: '1px solid var(--color-amber)' }}>
          📋 DEMO DATA — Sensor readings are simulated. Connect real hardware to see live data.
        </div>
      )}

      {/* Greeting */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          {greeting}, {farmer.name.split(' ')[0]} 👋
        </h2>
        <p className="text-xs mt-1 flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
          <Clock className="w-3 h-3" /> Last update: {lastUpdate.toLocaleTimeString()} •
          <Wifi className="w-3 h-3" /> {sensorStatus.online}/{sensorStatus.total} sensors online •
          {farmer.farmName}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryCard icon={fieldHealthStatus.icon} label="Field Health" value={fieldHealthStatus.label} color={fieldHealthStatus.color} />
        <SummaryCard icon={soilCondition.icon} label="Soil Condition" value={soilCondition.label} color={soilCondition.color} />
        <SummaryCard icon="📡" label="Sensor Status" value={`${sensorStatus.online}/${sensorStatus.total} Online`} color="green" />
        <SummaryCard icon="🧠" label="AI Status" value="Monitoring" color="green" />
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <SensorCard type={SENSOR_TYPES.TEMPERATURE} current={sensorReadings.temperature?.value} previous={previousReadings.temperature?.value} />
        <SensorCard type={SENSOR_TYPES.HUMIDITY} current={sensorReadings.humidity?.value} previous={previousReadings.humidity?.value} />
        <SensorCard type={SENSOR_TYPES.SOIL_MOISTURE} current={sensorReadings.soilMoisture?.value} previous={previousReadings.soilMoisture?.value} />
        <SensorCard type={SENSOR_TYPES.LIGHT} current={sensorReadings.light?.value} previous={previousReadings.light?.value} />
        <SensorCard type={SENSOR_TYPES.RAINFALL} current={sensorReadings.rainfall?.value} previous={previousReadings.rainfall?.value} />
        <div className="card p-4 sm:p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl animate-pulseGlow"
            style={{ background: 'var(--color-primary-50)' }}>📡</div>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Sensors</p>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--color-primary)' }}>
              {sensorStatus.online} / {sensorStatus.total}
            </p>
            <p className="text-[10px] font-medium" style={{ color: 'var(--color-primary)' }}>Connected</p>
          </div>
        </div>
      </div>

      {/* Chart + Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SensorChart />
        </div>
        <WeatherCard weather={weather} />
      </div>
    </div>
  );
}
