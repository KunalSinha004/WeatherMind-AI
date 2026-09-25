# WeatherMind AI — Intelligent Weather Forecasting & Prediction Platform

> **Tagline**: *"See Tomorrow. Understand the Weather."*

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)]()
[![React](https://img.shields.io/badge/React-19.0-cyan.svg)]()
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)]()
[![FastAPI](https://img.shields.io/badge/FastAPI-Python_3.11-teal.svg)]()
[![XGBoost](https://img.shields.io/badge/ML-XGBoost%20%7C%20PyTorch-orange.svg)]()

WeatherMind AI is a production-ready, startup-level weather intelligence platform built for major project demonstrations, portfolios, and technical interviews. It combines live satellite telemetry with machine learning forecasts (XGBoost, Random Forest, PyTorch Deep LSTM) to compute temperature, rainfall, humidity, wind, pressure trends, and statistical anomaly detection.

---

## 🌟 Key Features

1. **Futuristic Landing Page**: High-conversion SaaS startup design with interactive live dashboard preview, feature breakdown, tech stack showcase, FAQ, and call-to-actions.
2. **Real-Time Weather Intelligence**: Live weather observations, 24-hour hourly trend charts, and 7-day outlook using high-resolution Open-Meteo satellite APIs with instant global geocoding.
3. **Dedicated AI Prediction Lab**: Configurable machine learning inference engine allowing users to select location, prediction variable, forecast horizon (24h to 14 days), and model algorithm (XGBoost Regressor, Random Forest Ensemble, PyTorch Deep LSTM).
4. **WeatherMind AI Assistant**: Natural language weather assistant chat modal capable of answering complex climate queries ("Will it rain tomorrow?", "Should I carry an umbrella?", "Compare Bangalore and Delhi").
5. **Weather Anomaly Detection**: Automated Z-score statistical monitoring flagging heatwaves, rain surges, and barometric pressure drops.
6. **Interactive Weather Map**: Fullscreen Leaflet radar map with layer switching (Temperature, Precipitation/Rain, Wind Vector, Cloud Cover) and clickable marker popups.
7. **Severe Weather Alerts Center**: Warning bulletins with visual severity indicators (Extreme, High, Moderate) and user alert threshold preference controls.
8. **Multi-City Comparison Matrix**: Side-by-side comparison for up to 4 cities with comparative metric visualizer charts.
9. **Historical Climate Analytics**: 30-day historical trend analysis comparing observed data against seasonal averages.
10. **Saved Locations Management**: Pinned favorite cities with primary hub selection and quick weather cards.
11. **Admin Control Center**: Infrastructure monitoring (Node.js, FastAPI, MongoDB), user management directory, API request counters, and live ML prediction execution logs.
12. **Model Performance Showcase**: Technical documentation detailing lag features, feature importance weighting, MAE, RMSE, and R² score evaluation metrics.

---

## 🛠️ Tech Stack Architecture

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Glassmorphism Effects + Dark/Light Theme Switching
- **Animations & Icons**: Framer Motion + Lucide React
- **Charts**: Recharts (Interactive Area & Bar Charts)
- **Maps**: Leaflet + React-Leaflet
- **Routing**: React Router DOM v7

### Backend Gateway
- **Runtime**: Node.js + Express.js + TypeScript
- **Security**: JWT Authentication + Password Hashing (Bcrypt) + CORS
- **Database**: MongoDB + Mongoose ORM
- **Real-Time**: Socket.io (Alert Broadcasting)

### AI Microservice
- **Framework**: Python 3.11 + FastAPI + Uvicorn
- **Data Engineering**: Pandas + NumPy + Scikit-Learn
- **Machine Learning**: XGBoost Regressor + Random Forest Ensemble + PyTorch Deep LSTM

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ and `npm`
- **Python**: v3.10+ (for AI FastAPI service)

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs at: `http://localhost:3000`

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Runs at: `http://localhost:5000`

### 3. Python AI Microservice Setup
```bash
cd ai-service
python -m pip install -r requirements.txt
python app/main.py
```
Runs at: `http://localhost:8000`

---

## 🔑 Demo Account Credentials

For quick major project demonstration and evaluation:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **User** | `user@weathermind.ai` | `password123` | Full Dashboard & Prediction Access |
| **Admin** | `admin@weathermind.ai` | `admin123` | Admin Control Center & System Logs |

*(Quick one-click demo login buttons are also provided directly on the Login page!)*

---

## 🐳 Docker Deployment

To launch the complete multi-container stack:
```bash
docker-compose up --build
```

---

## 📁 Repository Structure

```
weathermind-ai/
├── frontend/             # React Vite TypeScript UI
├── backend/              # Node.js Express REST API
├── ai-service/           # Python FastAPI Machine Learning Inference
├── docs/                 # Architecture, API, ML Model & Database Docs
├── docker/               # Container Dockerfile definitions
├── docker-compose.yml    # Full stack orchestration
└── README.md             # Project documentation
```

---

## 📄 Documentation Links
- [Architecture Specifications](docs/architecture.md)
- [API Documentation](docs/api.md)
- [ML Model & Feature Engineering Pipeline](docs/ml-model.md)
- [Database Schema Definitions](docs/database.md)

---
© 2026 WeatherMind AI — Built for Final-Year Major Project & Portfolio Demonstration.
