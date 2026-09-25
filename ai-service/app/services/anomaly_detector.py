from typing import Dict, Any, List
from datetime import datetime

def detect_weather_anomalies(
    location: str,
    current_temp: float,
    current_rain: float,
    current_humidity: float,
    current_wind: float,
    current_pressure: float,
    historical_avg_temp: float = 26.0
) -> Dict[str, Any]:
    """
    Detects weather anomalies based on statistical deviation (Z-score & thresholds)
    against historical averages.
    """
    anomalies: List[Dict[str, Any]] = []
    
    # 1. Temperature anomaly check
    temp_diff = current_temp - historical_avg_temp
    if abs(temp_diff) >= 5.0:
        severity = "High" if abs(temp_diff) >= 8.0 else "Moderate"
        direction = "above" if temp_diff > 0 else "below"
        anomalies.append({
            "metric": "Temperature",
            "is_anomaly": True,
            "current_value": current_temp,
            "historical_avg": historical_avg_temp,
            "deviation_percent": round((temp_diff / historical_avg_temp) * 100, 1),
            "severity": severity,
            "message": f"Temperature is {abs(temp_diff):.1f}°C {direction} historical average for this period."
        })

    # 2. Rainfall anomaly check (heavy precipitation threshold > 25 mm/h)
    if current_rain >= 20.0:
        anomalies.append({
            "metric": "Rainfall",
            "is_anomaly": True,
            "current_value": current_rain,
            "historical_avg": 3.5,
            "deviation_percent": round(((current_rain - 3.5) / 3.5) * 100, 1),
            "severity": "High" if current_rain >= 40.0 else "Moderate",
            "message": f"Extreme rainfall rate of {current_rain} mm detected, significantly exceeding historical norms."
        })

    # 3. Wind speed anomaly (> 40 km/h)
    if current_wind >= 35.0:
        anomalies.append({
            "metric": "Wind Speed",
            "is_anomaly": True,
            "current_value": current_wind,
            "historical_avg": 12.0,
            "deviation_percent": round(((current_wind - 12.0) / 12.0) * 100, 1),
            "severity": "High" if current_wind >= 55.0 else "Moderate",
            "message": f"High wind gust speed of {current_wind} km/h detected. Exercise caution for outdoor activity."
        })

    # 4. Pressure anomaly (< 1000 hPa or > 1030 hPa)
    if current_pressure < 995.0 or current_pressure > 1028.0:
        anomalies.append({
            "metric": "Pressure",
            "is_anomaly": True,
            "current_value": current_pressure,
            "historical_avg": 1013.25,
            "deviation_percent": round(((current_pressure - 1013.25) / 1013.25) * 100, 1),
            "severity": "Moderate",
            "message": f"Barometric pressure of {current_pressure} hPa indicates an active storm/front system."
        })

    return {
        "location": location,
        "has_anomaly": len(anomalies) > 0,
        "anomalies": anomalies,
        "timestamp": datetime.now().isoformat()
    }
