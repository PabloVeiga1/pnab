import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import "../styles.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Corrige os ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function CentralizarMapa({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 16);
  }, [position, map]);

  return null;
}

export default function Map({ destino }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Seu navegador não suporta geolocalização.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        setPosition([
          location.coords.latitude,
          location.coords.longitude,
        ]);
      },
      (error) => {
        console.error(error);
        alert("Não foi possível obter sua localização.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Sempre que um destino for selecionado
  useEffect(() => {
    if (!destino) return;

    console.log("Destino selecionado:", destino);

    // Nas próximas etapas vamos:
    // 1. Centralizar o mapa no destino
    // 2. Adicionar um marcador
    // 3. Traçar a rota
  }, [destino]);

  if (!position) {
    return (
      <div className="loading">
        <h2>Obtendo localização...</h2>
      </div>
    );
  }

  return (
    <div className="map-wrapper">
      <div className="map-content">
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={true}
          zoomControl={false}
          className="map-container"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="bottomright" />

          <CentralizarMapa position={position} />

          <Marker position={position}>
            <Popup>📍 Você está aqui!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}