import { Request, Response } from 'express';
import { fetchLiveWeather, geocodeCity } from '../services/openMeteoService';

export const getCurrentWeather = async (req: Request, res: Response): Promise<void> => {
  try {
    const city = (req.query.city as string) || 'Bangalore';
    const data = await fetchLiveWeather(city);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getHourlyForecast = async (req: Request, res: Response): Promise<void> => {
  try {
    const city = (req.query.city as string) || 'Bangalore';
    const data = await fetchLiveWeather(city);
    res.json({ success: true, city: data.city, hourly: data.hourly });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDailyForecast = async (req: Request, res: Response): Promise<void> => {
  try {
    const city = (req.query.city as string) || 'Bangalore';
    const data = await fetchLiveWeather(city);
    res.json({ success: true, city: data.city, daily: data.daily });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const searchCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const q = (req.query.q as string) || 'Bangalore';
    const result = await geocodeCity(q);
    res.json({ success: true, results: [result] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getHistoricalAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const city = (req.query.city as string) || 'Bangalore';
    const metric = (req.query.metric as string) || 'temperature';
    
    // Generate realistic historical series (30 days)
    const historyData = [];
    const now = new Date();
    const baseTemp = 26.5;

    for (let i = 30; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const monthName = d.toLocaleString('en-us', { month: 'short' });
      
      const seasonal = Math.sin((i / 30) * Math.PI) * 4;
      const noise = (Math.random() - 0.5) * 2;
      const actualVal = Math.round((baseTemp + seasonal + noise) * 10) / 10;
      const historicalAvg = Math.round((baseTemp + seasonal) * 10) / 10;

      historyData.push({
        date: dateStr,
        day: d.getDate(),
        month: monthName,
        actual: actualVal,
        historicalAverage: historicalAvg,
        rainfall: Math.round(Math.max(0, Math.sin(i * 0.8) * 18)),
        humidity: Math.round(55 + Math.cos(i * 0.5) * 20),
        windSpeed: Math.round(12 + Math.sin(i * 0.3) * 6),
        pressure: Math.round(1012 + Math.sin(i * 0.2) * 5)
      });
    }

    res.json({
      success: true,
      city,
      metric,
      range: '30-days',
      data: historyData
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const compareCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const citiesQuery = (req.query.cities as string) || 'Bangalore,Delhi,Mumbai,Kolkata';
    const cityList = citiesQuery.split(',').map(c => c.trim()).filter(Boolean).slice(0, 4);

    const results = await Promise.all(cityList.map(c => fetchLiveWeather(c)));
    res.json({ success: true, count: results.length, cities: results });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
