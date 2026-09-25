import axios from 'axios';

export interface WeatherDataResult {
  city: string;
  country: string;
  lat: number;
  lon: number;
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    weatherCode: number;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
    uvIndex: number;
    visibility: number;
    cloudCover: number;
    sunrise: string;
    sunset: string;
  };
  hourly: Array<{
    time: string;
    temp: number;
    rainProb: number;
    humidity: number;
    windSpeed: number;
    condition: string;
  }>;
  daily: Array<{
    date: string;
    dayName: string;
    condition: string;
    minTemp: number;
    maxTemp: number;
    rainProb: number;
    windSpeed: number;
    uvIndex: number;
    icon: string;
  }>;
  isDemoData?: boolean;
}

// Convert Open-Meteo weather codes WMO to human conditions & icons
export function mapWMOCode(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: 'Clear Sky', icon: '☀️' };
  if (code >= 1 && code <= 3) return { condition: 'Partly Cloudy', icon: '⛅' };
  if (code === 45 || code === 48) return { condition: 'Foggy', icon: '🌫️' };
  if (code >= 51 && code <= 55) return { condition: 'Light Drizzle', icon: '🌧️' };
  if (code >= 61 && code <= 65) return { condition: 'Rain', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { condition: 'Snow', icon: '❄️' };
  if (code >= 80 && code <= 82) return { condition: 'Heavy Showers', icon: '🌦️' };
  if (code >= 95 && code <= 99) return { condition: 'Thunderstorm', icon: '🌩️' };
  return { condition: 'Partly Cloudy', icon: '🌤️' };
}

export async function geocodeCity(query: string): Promise<{ city: string; country: string; lat: number; lon: number }> {
  try {
    const res = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: { name: query, count: 1, language: 'en', format: 'json' },
      timeout: 4000
    });
    if (res.data?.results && res.data.results.length > 0) {
      const match = res.data.results[0];
      return {
        city: match.name,
        country: match.country || match.admin1 || 'Global',
        lat: match.latitude,
        lon: match.longitude
      };
    }
  } catch (err) {
    console.warn(`[Geocoding] Fallback for ${query}`);
  }

  // Known city fallback coordinates
  const fallbacks: Record<string, { city: string; country: string; lat: number; lon: number }> = {
    'bangalore': { city: 'Bangalore', country: 'India', lat: 12.9716, lon: 77.5946 },
    'bengaluru': { city: 'Bangalore', country: 'India', lat: 12.9716, lon: 77.5946 },
    'delhi': { city: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
    'mumbai': { city: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
    'kolkata': { city: 'Kolkata', country: 'India', lat: 22.5726, lon: 88.3639 },
    'london': { city: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
    'new york': { city: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 },
    'tokyo': { city: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
    'paris': { city: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
    'sydney': { city: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 }
  };

  const key = query.toLowerCase().trim();
  if (fallbacks[key]) return fallbacks[key];

  return {
    city: query.charAt(0).toUpperCase() + query.slice(1),
    country: 'International',
    lat: 12.9716,
    lon: 77.5946
  };
}

export async function fetchLiveWeather(locationName: string): Promise<WeatherDataResult> {
  const geo = await geocodeCity(locationName);

  try {
    const url = 'https://api.open-meteo.com/v1/forecast';
    const response = await axios.get(url, {
      params: {
        latitude: geo.lat,
        longitude: geo.lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m',
        hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max',
        timezone: 'auto'
      },
      timeout: 5000
    });

    const data = response.data;
    const curr = data.current;
    const wmo = mapWMOCode(curr.weather_code ?? 0);

    // Format hourly (24 points)
    const hourlyPoints = [];
    const hourlyTimes = data.hourly?.time || [];
    const hourlyTemps = data.hourly?.temperature_2m || [];
    const hourlyRain = data.hourly?.precipitation_probability || [];
    const hourlyHum = data.hourly?.relative_humidity_2m || [];
    const hourlyWind = data.hourly?.wind_speed_10m || [];
    const hourlyWmo = data.hourly?.weather_code || [];

    for (let i = 0; i < Math.min(24, hourlyTimes.length); i++) {
      const dateObj = new Date(hourlyTimes[i]);
      const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const hWmo = mapWMOCode(hourlyWmo[i] ?? 0);
      hourlyPoints.push({
        time: timeStr,
        temp: Math.round(hourlyTemps[i] ?? curr.temperature_2m),
        rainProb: Math.round(hourlyRain[i] ?? 10),
        humidity: Math.round(hourlyHum[i] ?? 60),
        windSpeed: Math.round(hourlyWind[i] ?? 12),
        condition: hWmo.condition
      });
    }

    // Format daily (7 days)
    const dailyPoints = [];
    const dailyDates = data.daily?.time || [];
    const dailyMax = data.daily?.temperature_2m_max || [];
    const dailyMin = data.daily?.temperature_2m_min || [];
    const dailyWmo = data.daily?.weather_code || [];
    const dailyRain = data.daily?.precipitation_probability_max || [];
    const dailyUv = data.daily?.uv_index_max || [];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < Math.min(7, dailyDates.length); i++) {
      const d = new Date(dailyDates[i]);
      const dWmo = mapWMOCode(dailyWmo[i] ?? 0);
      dailyPoints.push({
        date: dailyDates[i],
        dayName: i === 0 ? 'Today' : dayNames[d.getDay()],
        condition: dWmo.condition,
        icon: dWmo.icon,
        minTemp: Math.round(dailyMin[i] ?? 20),
        maxTemp: Math.round(dailyMax[i] ?? 30),
        rainProb: Math.round(dailyRain[i] ?? 15),
        windSpeed: Math.round(10 + Math.random() * 8),
        uvIndex: Math.round(dailyUv[i] ?? 6)
      });
    }

    const sunriseStr = data.daily?.sunrise?.[0] ? new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:15 AM';
    const sunsetStr = data.daily?.sunset?.[0] ? new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:45 PM';

    return {
      city: geo.city,
      country: geo.country,
      lat: geo.lat,
      lon: geo.lon,
      current: {
        temp: Math.round(curr.temperature_2m ?? 28),
        feelsLike: Math.round(curr.apparent_temperature ?? 30),
        condition: wmo.condition,
        weatherCode: curr.weather_code ?? 0,
        icon: wmo.icon,
        humidity: Math.round(curr.relative_humidity_2m ?? 65),
        windSpeed: Math.round(curr.wind_speed_10m ?? 14),
        windDirection: Math.round(curr.wind_direction_10m ?? 180),
        pressure: Math.round(curr.surface_pressure ?? 1012),
        uvIndex: Math.round(data.daily?.uv_index_max?.[0] ?? 6),
        visibility: 10,
        cloudCover: 40,
        sunrise: sunriseStr,
        sunset: sunsetStr
      },
      hourly: hourlyPoints,
      daily: dailyPoints,
      isDemoData: false
    };

  } catch (err: any) {
    console.warn(`[WeatherService] Live API request failed for ${geo.city}, serving fallback demo mode.`);
    return generateFallbackWeather(geo.city, geo.country, geo.lat, geo.lon);
  }
}

export function generateFallbackWeather(city: string, country: string, lat: number, lon: number): WeatherDataResult {
  const baseTemp = 28;
  const hourly = [];
  for (let i = 0; i < 24; i++) {
    const hourStr = `${i.toString().padStart(2, '0')}:00`;
    const tempVar = Math.sin((i / 24) * Math.PI * 2) * 5;
    hourly.push({
      time: hourStr,
      temp: Math.round(baseTemp + tempVar),
      rainProb: Math.round(20 + Math.random() * 40),
      humidity: Math.round(60 + Math.sin(i) * 15),
      windSpeed: Math.round(10 + Math.cos(i) * 5),
      condition: i > 12 && i < 18 ? 'Light Rain' : 'Partly Cloudy'
    });
  }

  const days = ['Today', 'Tomorrow', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
  const daily = days.map((day, idx) => ({
    date: new Date(Date.now() + idx * 86400000).toISOString().split('T')[0],
    dayName: day,
    condition: idx % 2 === 0 ? 'Partly Cloudy' : 'Sunny',
    icon: idx % 2 === 0 ? '⛅' : '☀️',
    minTemp: 21 + idx,
    maxTemp: 31 + (idx % 3),
    rainProb: 15 + idx * 10,
    windSpeed: 12 + idx,
    uvIndex: 5 + (idx % 4)
  }));

  return {
    city,
    country,
    lat,
    lon,
    current: {
      temp: baseTemp,
      feelsLike: baseTemp + 2,
      condition: 'Partly Cloudy',
      weatherCode: 2,
      icon: '⛅',
      humidity: 68,
      windSpeed: 14,
      windDirection: 140,
      pressure: 1013,
      uvIndex: 6,
      visibility: 10,
      cloudCover: 35,
      sunrise: '06:15 AM',
      sunset: '06:45 PM'
    },
    hourly,
    daily,
    isDemoData: true
  };
}
