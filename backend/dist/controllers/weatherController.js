"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareCities = exports.getHistoricalAnalytics = exports.searchCities = exports.getDailyForecast = exports.getHourlyForecast = exports.getCurrentWeather = void 0;
const openMeteoService_1 = require("../services/openMeteoService");
const getCurrentWeather = async (req, res) => {
    try {
        const city = req.query.city || 'Bangalore';
        const data = await (0, openMeteoService_1.fetchLiveWeather)(city);
        res.json({ success: true, data });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getCurrentWeather = getCurrentWeather;
const getHourlyForecast = async (req, res) => {
    try {
        const city = req.query.city || 'Bangalore';
        const data = await (0, openMeteoService_1.fetchLiveWeather)(city);
        res.json({ success: true, city: data.city, hourly: data.hourly });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getHourlyForecast = getHourlyForecast;
const getDailyForecast = async (req, res) => {
    try {
        const city = req.query.city || 'Bangalore';
        const data = await (0, openMeteoService_1.fetchLiveWeather)(city);
        res.json({ success: true, city: data.city, daily: data.daily });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getDailyForecast = getDailyForecast;
const searchCities = async (req, res) => {
    try {
        const q = req.query.q || 'Bangalore';
        const result = await (0, openMeteoService_1.geocodeCity)(q);
        res.json({ success: true, results: [result] });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.searchCities = searchCities;
const getHistoricalAnalytics = async (req, res) => {
    try {
        const city = req.query.city || 'Bangalore';
        const metric = req.query.metric || 'temperature';
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
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getHistoricalAnalytics = getHistoricalAnalytics;
const compareCities = async (req, res) => {
    try {
        const citiesQuery = req.query.cities || 'Bangalore,Delhi,Mumbai,Kolkata';
        const cityList = citiesQuery.split(',').map(c => c.trim()).filter(Boolean).slice(0, 4);
        const results = await Promise.all(cityList.map(c => (0, openMeteoService_1.fetchLiveWeather)(c)));
        res.json({ success: true, count: results.length, cities: results });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.compareCities = compareCities;
