// Agriculture AI — Mock Weather Data

export const MOCK_WEATHER = {
  currentTemp: 29,
  feelsLike: 32,
  condition: 'Partly Cloudy',
  conditionIcon: '⛅',
  humidity: 65,
  rainProbability: 25,
  windSpeedKm: 12,
  windDirection: 'NE',
  uvIndex: 7,
  visibility: '10 km',
  pressure: 1013,
  sunrise: '06:05 AM',
  sunset: '06:42 PM',
  forecast: [
    { day: 'Today', high: 33, low: 24, condition: '⛅', rain: 25 },
    { day: 'Mon', high: 32, low: 23, condition: '☀️', rain: 10 },
    { day: 'Tue', high: 31, low: 24, condition: '🌧️', rain: 70 },
    { day: 'Wed', high: 30, low: 23, condition: '🌦️', rain: 45 },
    { day: 'Thu', high: 34, low: 25, condition: '☀️', rain: 5 },
    { day: 'Fri', high: 33, low: 24, condition: '⛅', rain: 15 },
    { day: 'Sat', high: 31, low: 23, condition: '🌧️', rain: 60 },
  ],
  advisories: [
    { type: 'info', message: 'Moderate UV expected. Avoid field work during 11 AM – 2 PM.' },
    { type: 'warning', message: 'Rain expected on Tuesday. Plan harvesting accordingly.' },
  ],
};
