import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

from app.models.schemas import (
    PredictionRequest, PredictionResponse,
    AnomalyRequest, AnomalyResponse,
    ModelMetricsResponse
)
from app.services.predictor import generate_ml_forecast
from app.services.anomaly_detector import detect_weather_anomalies
from app.services.metrics import get_all_model_metrics

app = FastAPI(
    title="WeatherMind AI Service",
    description="Python FastAPI machine learning inference service for WeatherMind AI platform",
    version="1.0.0"
)

# Enable CORS for backend node service & frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "WeatherMind AI Inference Service",
        "version": "1.0.0",
        "models_available": ["xgboost", "random_forest", "lstm"]
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ai-service"}

@app.post("/predict/temperature", response_model=PredictionResponse)
def predict_temperature(req: PredictionRequest):
    try:
        return generate_ml_forecast(
            location=req.location,
            metric="temperature",
            horizon_days=req.horizon_days,
            model_name=req.model_name or "xgboost"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/rainfall", response_model=PredictionResponse)
def predict_rainfall(req: PredictionRequest):
    try:
        return generate_ml_forecast(
            location=req.location,
            metric="rainfall",
            horizon_days=req.horizon_days,
            model_name=req.model_name or "xgboost",
            base_val=4.5
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/humidity", response_model=PredictionResponse)
def predict_humidity(req: PredictionRequest):
    try:
        return generate_ml_forecast(
            location=req.location,
            metric="humidity",
            horizon_days=req.horizon_days,
            model_name=req.model_name or "xgboost",
            base_val=65.0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/wind", response_model=PredictionResponse)
def predict_wind(req: PredictionRequest):
    try:
        return generate_ml_forecast(
            location=req.location,
            metric="wind",
            horizon_days=req.horizon_days,
            model_name=req.model_name or "xgboost",
            base_val=14.0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/lstm", response_model=PredictionResponse)
def predict_lstm(req: PredictionRequest):
    try:
        return generate_ml_forecast(
            location=req.location,
            metric=req.metric,
            horizon_days=req.horizon_days,
            model_name="lstm"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/anomaly", response_model=AnomalyResponse)
def predict_anomaly(req: AnomalyRequest):
    try:
        return detect_weather_anomalies(
            location=req.location,
            current_temp=req.current_temp,
            current_rain=req.current_rain,
            current_humidity=req.current_humidity,
            current_wind=req.current_wind,
            current_pressure=req.current_pressure,
            historical_avg_temp=req.historical_avg_temp
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/model/metrics")
def get_model_metrics():
    return get_all_model_metrics()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
