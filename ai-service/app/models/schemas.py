from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class PredictionRequest(BaseModel):
    location: str = Field(..., example="Bangalore")
    lat: Optional[float] = Field(None, example=12.9716)
    lon: Optional[float] = Field(None, example=77.5946)
    horizon_days: int = Field(7, example=7)
    metric: str = Field("temperature", example="temperature")
    model_name: Optional[str] = Field("xgboost", example="xgboost")
    historical_samples: Optional[List[Dict[str, Any]]] = Field(default=[], description="Historical daily or hourly series")

class ForecastPoint(BaseModel):
    timestamp: str
    date: str
    predicted_value: float
    lower_bound: float
    upper_bound: float
    confidence: float
    unit: str

class PredictionResponse(BaseModel):
    location: str
    metric: str
    horizon_days: int
    model: str
    model_version: str
    confidence_score: float
    historical_avg: float
    current_observation: float
    mae: float
    rmse: float
    r2: float
    forecast: List[ForecastPoint]
    timestamp: str

class AnomalyRequest(BaseModel):
    location: str
    current_temp: float
    current_rain: float
    current_humidity: float
    current_wind: float
    current_pressure: float
    historical_avg_temp: float

class AnomalyItem(BaseModel):
    metric: str
    is_anomaly: bool
    current_value: float
    historical_avg: float
    deviation_percent: float
    severity: str
    message: str

class AnomalyResponse(BaseModel):
    location: str
    has_anomaly: bool
    anomalies: List[AnomalyItem]
    timestamp: str

class ModelMetricsResponse(BaseModel):
    models: Dict[str, Dict[str, Any]]
