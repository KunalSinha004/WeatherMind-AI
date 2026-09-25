# WeatherMind AI — Architecture Documentation

## 1. System Overview
WeatherMind AI is a production-grade weather forecasting platform combining real-time satellite telemetry, historical climate series analytics, and ensemble machine learning predictions (XGBoost, Random Forest, PyTorch Deep LSTM).

```
                      ┌──────────────────────────────────────────────┐
                      │              React + Vite + TS               │
                      │                 (Frontend)                   │
                      └──────────────────────┬───────────────────────┘
                                             │ REST & WebSockets
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │           Node.js + Express + TS             │
                      │                 (Backend)                    │
                      └──────────────┬────────────────┬──────────────┘
                                     │                │
            Open-Meteo REST API      │                │ HTTP Proxy / REST
            (Live Satellite Data) ◄──┘                ▼
                                           ┌───────────────────┐
                                           │  Python FastAPI   │
                                           │   (AI Service)    │
                                           └─────────┬─────────┘
                                                     │
                                           ┌─────────▼─────────┐
                                           │  Scikit-Learn     │
                                           │  XGBoost & PyTorch│
                                           └───────────────────┘
```

## 2. Component Microservices
- **Frontend Layer (`frontend/`)**: Vite React TypeScript SPA with Tailwind CSS, Framer Motion, Recharts, and Leaflet Maps.
- **Node.js Gateway (`backend/`)**: Express REST API, JWT Authentication, Open-Meteo Integration Proxy, Mongoose ORM, and Socket.io alerts.
- **Python AI Microservice (`ai-service/`)**: FastAPI server handling XGBoost, Random Forest, PyTorch LSTM inference, anomaly scoring, and model metrics.
