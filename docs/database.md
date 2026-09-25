# WeatherMind AI — Database Schemas & Collections

MongoDB database collections:
- `users`: User profiles, JWT credentials, preferred location, temperature unit preferences (`celsius` | `fahrenheit`).
- `weather_data`: Cached Open-Meteo observations and hourly/daily forecast points.
- `predictions`: Logged ML model inference runs with confidence scores and point estimates.
- `model_versions`: Model metadata, dataset training dates, and evaluation scores (MAE, RMSE, R²).
- `alerts`: Active severe weather warning bulletins with severity levels and duration.
- `saved_locations`: User pinned favorite cities and primary hubs.
- `notifications`: User alert notifications.
- `system_logs`: Application server logs and error stack trace events.
