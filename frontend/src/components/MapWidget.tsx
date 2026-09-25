import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { WeatherData } from '../types';

// Custom Map Marker Icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to dynamically center map when lat/lon changes
const MapRecenter: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);
  return null;
};

export const MapWidget: React.FC<{
  weather: WeatherData;
  activeLayer?: 'temp' | 'rain' | 'wind' | 'clouds';
  height?: string;
}> = ({ weather, activeLayer = 'temp', height = 'h-96' }) => {
  const center: [number, number] = [weather.lat, weather.lon];

  // Open-Meteo or OpenWeather map tile overlay simulation
  let tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  if (activeLayer === 'rain') {
    tileLayerUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
  } else if (activeLayer === 'wind') {
    tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  }

  return (
    <div className={`w-full ${height} rounded-3xl overflow-hidden border border-slate-800 relative z-10 shadow-2xl`}>
      <MapContainer center={center} zoom={9} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileLayerUrl}
        />
        <MapRecenter lat={weather.lat} lon={weather.lon} />

        <Marker position={center} icon={customIcon}>
          <Popup>
            <div className="p-1 text-slate-100 text-xs">
              <h4 className="font-bold text-cyan-400 text-sm">{weather.city}, {weather.country}</h4>
              <p className="mt-1 font-semibold">{weather.current.icon} {weather.current.temp}°C — {weather.current.condition}</p>
              <p className="text-[11px] text-slate-300">Humidity: {weather.current.humidity}% | Wind: {weather.current.windSpeed} km/h</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
