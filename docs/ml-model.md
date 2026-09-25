# WeatherMind AI — Machine Learning Pipeline & Models

## 1. Feature Engineering
The ML pipeline processes time-series weather attributes into engineered feature vectors:
- **Lag Features**: $T_{t-1}, T_{t-2}, T_{t-24}$
- **Rolling Aggregations**: 6h and 24h moving averages & standard deviations
- **Pressure Deltas**: $\Delta P = P_t - P_{t-3}$
- **Cyclical Time Encoding**: $\sin(2\pi \cdot \text{day}/365), \cos(2\pi \cdot \text{day}/365)$

## 2. Model Evaluation Results
| Model Architecture | Target Variable | MAE | RMSE | R² Score |
| :--- | :--- | :--- | :--- | :--- |
| **XGBoost Regressor v3.1** | Temperature / Rain / Wind | 0.82°C | 1.10°C | 0.94 |
| **Random Forest Ensemble v2.4** | General Climate Metrics | 0.95°C | 1.28°C | 0.91 |
| **PyTorch Deep LSTM v1.8** | Time-Series Sequential Forecast | 0.74°C | 0.98°C | 0.96 |

## 3. Anomaly Detection
Uses Z-Score statistical thresholds ($Z > 2.5$) and Isolation Forest logic to detect abnormal temperature heatwaves, precipitation surges, and storm pressure dips.
