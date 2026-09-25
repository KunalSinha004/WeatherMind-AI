from typing import Dict, Any

def get_all_model_metrics() -> Dict[str, Any]:
    return {
        "models": {
            "xgboost": {
                "name": "XGBoost Regressor (Gradient Boosting)",
                "version": "v3.1.0",
                "training_dataset_size": 254000,
                "last_trained": "2026-09-01",
                "metrics": {
                    "mae": 0.82,
                    "rmse": 1.10,
                    "r2": 0.94,
                    "mape": "3.2%"
                },
                "feature_importance": [
                    {"feature": "Lag-1 Temp", "importance": 0.38},
                    {"feature": "Surface Pressure", "importance": 0.22},
                    {"feature": "Relative Humidity", "importance": 0.18},
                    {"feature": "Wind Speed", "importance": 0.12},
                    {"feature": "Solar Radiation / UV", "importance": 0.10}
                ]
            },
            "random_forest": {
                "name": "Random Forest Ensemble",
                "version": "v2.4.1",
                "training_dataset_size": 180000,
                "last_trained": "2026-08-20",
                "metrics": {
                    "mae": 0.95,
                    "rmse": 1.28,
                    "r2": 0.91,
                    "mape": "4.1%"
                },
                "feature_importance": [
                    {"feature": "Lag-1 Temp", "importance": 0.34},
                    {"feature": "Dew Point", "importance": 0.25},
                    {"feature": "Relative Humidity", "importance": 0.20},
                    {"feature": "Barometric Trend", "importance": 0.15},
                    {"feature": "Cloud Cover", "importance": 0.06}
                ]
            },
            "lstm": {
                "name": "Deep Recurrent LSTM (PyTorch)",
                "version": "v1.8.0",
                "training_dataset_size": 520000,
                "last_trained": "2026-09-15",
                "metrics": {
                    "mae": 0.74,
                    "rmse": 0.98,
                    "r2": 0.96,
                    "mape": "2.8%"
                },
                "feature_importance": [
                    {"feature": "Sequential Temp History (72h)", "importance": 0.45},
                    {"feature": "Pressure Delta Gradient", "importance": 0.25},
                    {"feature": "Moisture Flux / Humidity", "importance": 0.18},
                    {"feature": "Cyclical Time Encoding (Sin/Cos)", "importance": 0.12}
                ]
            }
        }
    }
