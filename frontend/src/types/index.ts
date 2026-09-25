export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profileImage?: string;
  preferredLocation: string;
  tempUnit: 'celsius' | 'fahrenheit';
  notificationSettings?: {
    emailAlerts: boolean;
    pushAlerts: boolean;
    severeWeatherOnly: boolean;
  };
  savedCities?: string[];
}

export interface CurrentWeather {
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
}

export interface HourlyPoint {
  time: string;
  temp: number;
  rainProb: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

export interface DailyPoint {
  date: string;
  dayName: string;
  condition: string;
  icon: string;
  minTemp: number;
  maxTemp: number;
  rainProb: number;
  windSpeed: number;
  uvIndex: number;
}

export interface WeatherData {
  city: string;
  country: string;
  lat: number;
  lon: number;
  current: CurrentWeather;
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  isDemoData?: boolean;
}

export interface ForecastPoint {
  timestamp: string;
  date: string;
  predicted_value: number;
  lower_bound: number;
  upper_bound: number;
  confidence: number;
  unit: string;
}

export interface AIPredictionResult {
  location: string;
  metric: string;
  horizon_days: number;
  model: string;
  model_version: string;
  confidence_score: number;
  historical_avg: number;
  current_observation: number;
  mae: number;
  rmse: number;
  r2: number;
  forecast: ForecastPoint[];
  timestamp: string;
  isFallback?: boolean;
}

export interface WeatherAlert {
  id: string;
  title: string;
  severity: 'Extreme' | 'High' | 'Moderate' | 'Info';
  type: string;
  description: string;
  location: string;
  startTime: string;
  expectedDuration: string;
  active: boolean;
}
