# WeatherMind AI — REST API Specifications

## 1. Authentication
- `POST /api/auth/register` — Create new user account
- `POST /api/auth/login` — Authenticate user and issue JWT bearer token
- `GET /api/auth/me` — Retrieve current authenticated user profile
- `POST /api/auth/forgot-password` — Password recovery workflow

## 2. Weather Telemetry
- `GET /api/weather/current?city=Bangalore` — Fetch current weather observation & 24h/7d series
- `GET /api/weather/hourly?city=Bangalore` — 24-hour forecast trend
- `GET /api/weather/forecast?city=Bangalore` — 7-day outlook
- `GET /api/weather/search?q=London` — Geocoding city search
- `GET /api/weather/historical?city=Bangalore&metric=temperature` — Historical climate series
- `GET /api/weather/compare?cities=Bangalore,Delhi,Mumbai,Kolkata` — Multi-city comparison matrix

## 3. AI Prediction Inference
- `POST /api/prediction/predict` — Generate ML forecast (temperature, rainfall, humidity, wind, pressure)
- `POST /api/prediction/temperature` — Temperature prediction
- `POST /api/prediction/rainfall` — Rainfall & precipitation probability
- `GET /api/prediction/anomaly` — Statistical anomaly detection
- `GET /api/prediction/metrics` — Model evaluation metrics (MAE, RMSE, R²)

## 4. Admin Controls
- `GET /api/admin/stats` — Platform metrics, user management, and microservice status
