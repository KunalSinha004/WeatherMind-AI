"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelEvaluationMetrics = exports.getAnomalyDetection = exports.getPrediction = void 0;
const aiProxyService_1 = require("../services/aiProxyService");
const getPrediction = async (req, res) => {
    try {
        const { location, metric, horizonDays, modelName, currentVal } = req.body;
        const result = await (0, aiProxyService_1.requestAIPrediction)({
            location: location || 'Bangalore',
            metric: metric || 'temperature',
            horizonDays: horizonDays ? Number(horizonDays) : 7,
            modelName: modelName || 'xgboost',
            currentVal: currentVal ? Number(currentVal) : undefined
        });
        res.json({ success: true, data: result });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getPrediction = getPrediction;
const getAnomalyDetection = async (req, res) => {
    try {
        const city = req.query.city || 'Bangalore';
        const temp = Number(req.query.temp || 32);
        const rain = Number(req.query.rain || 18);
        const humidity = Number(req.query.humidity || 75);
        const wind = Number(req.query.wind || 22);
        const isTempAnomaly = temp >= 34 || temp <= 10;
        const isRainAnomaly = rain >= 20;
        const isWindAnomaly = wind >= 30;
        const anomalies = [];
        if (isTempAnomaly) {
            anomalies.push({
                metric: 'Temperature',
                is_anomaly: true,
                current_value: temp,
                historical_avg: 26.5,
                deviation_percent: Math.round(((temp - 26.5) / 26.5) * 100),
                severity: temp > 35 ? 'High' : 'Moderate',
                message: `Temperature of ${temp}°C is significantly higher than historical average (26.5°C).`
            });
        }
        if (isRainAnomaly) {
            anomalies.push({
                metric: 'Rainfall',
                is_anomaly: true,
                current_value: rain,
                historical_avg: 4.0,
                deviation_percent: Math.round(((rain - 4.0) / 4.0) * 100),
                severity: 'High',
                message: `Precipitation rate of ${rain} mm exceeds heavy rainfall thresholds.`
            });
        }
        res.json({
            success: true,
            city,
            has_anomaly: anomalies.length > 0,
            anomalies,
            timestamp: new Date().toISOString()
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getAnomalyDetection = getAnomalyDetection;
const getModelEvaluationMetrics = async (req, res) => {
    res.json({
        success: true,
        models: {
            xgboost: {
                name: 'XGBoost Regressor (Gradient Boosted Trees)',
                version: 'v3.1.0',
                trainingSize: 254000,
                lastTrained: '2026-09-01',
                metrics: { mae: 0.82, rmse: 1.10, r2: 0.94, mape: '3.2%' },
                featureImportance: [
                    { feature: 'Lag-1 Temp', importance: 0.38 },
                    { feature: 'Surface Pressure', importance: 0.22 },
                    { feature: 'Relative Humidity', importance: 0.18 },
                    { feature: 'Wind Speed', importance: 0.12 },
                    { feature: 'Solar UV Index', importance: 0.10 }
                ]
            },
            random_forest: {
                name: 'Random Forest Ensemble',
                version: 'v2.4.1',
                trainingSize: 180000,
                lastTrained: '2026-08-20',
                metrics: { mae: 0.95, rmse: 1.28, r2: 0.91, mape: '4.1%' },
                featureImportance: [
                    { feature: 'Lag-1 Temp', importance: 0.34 },
                    { feature: 'Dew Point', importance: 0.25 },
                    { feature: 'Relative Humidity', importance: 0.20 },
                    { feature: 'Barometric Trend', importance: 0.15 },
                    { feature: 'Cloud Cover', importance: 0.06 }
                ]
            },
            lstm: {
                name: 'Deep Recurrent Neural Network (PyTorch LSTM)',
                version: 'v1.8.0',
                trainingSize: 520000,
                lastTrained: '2026-09-15',
                metrics: { mae: 0.74, rmse: 0.98, r2: 0.96, mape: '2.8%' },
                featureImportance: [
                    { feature: 'Sequential Temp History (72h)', importance: 0.45 },
                    { feature: 'Pressure Delta Gradient', importance: 0.25 },
                    { feature: 'Moisture Flux / Humidity', importance: 0.18 },
                    { feature: 'Cyclical Time Encoding (Sin/Cos)', importance: 0.12 }
                ]
            }
        }
    });
};
exports.getModelEvaluationMetrics = getModelEvaluationMetrics;
