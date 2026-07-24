import { useEffect, useRef, useState } from "react";
import { FaRoute, FaLocationArrow } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
  Polyline,
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

function formatDistance(meters) {
  if (meters == null) return "-";
  if (meters >= 1000) return `${(meters / 1000).toFixed(2)} km`;
  return `${Math.round(meters)} m`;
}

function formatDuration(seconds) {
  if (seconds == null) return "-";
  const s = Math.round(seconds);
  if (s >= 3600) {
    const h = Math.floor(s / 3600);
    const m = Math.round((s % 3600) / 60);
    return `${h} h ${m} min`;
  }
  if (s >= 60) {
    const m = Math.round(s / 60);
    return `${m} min`;
  }
  return `${s} s`;
}

function CentralizarMapa({ userPosition, destino, follow }) {
  const map = useMap();
  const initialPositionSet = useRef(false);
  const routedOnce = useRef(null);

  useEffect(() => {
    if (!userPosition) return;

    if (follow) {
      map.setView(userPosition, 16);
      return;
    }

    if (initialPositionSet.current) return;
    map.setView(userPosition, 16);
    initialPositionSet.current = true;
  }, [userPosition, follow, map]);

  useEffect(() => {
    if (!userPosition || !destino || follow) return;
    if (routedOnce.current === destino.id) return;

    const bounds = L.latLngBounds([
      userPosition,
      [destino.lat, destino.lng],
    ]);
    map.fitBounds(bounds, { padding: [60, 60] });
    routedOnce.current = destino.id;
  }, [userPosition, destino, follow, map]);

  useEffect(() => {
    if (!destino) {
      routedOnce.current = null;
    }
  }, [destino]);

  return null;
}

export default function Map({ destino }) {
  const [position, setPosition] = useState(null);
  const [initialCenter, setInitialCenter] = useState(null);
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeError, setRouteError] = useState(null);
  const [routeOpen, setRouteOpen] = useState(false);
  const [followGPS, setFollowGPS] = useState(false);

  useEffect(() => {
    if (!position || initialCenter) return;
    setInitialCenter(position);
  }, [position, initialCenter]);

  useEffect(() => {
    if (!destino) {
      setRouteOpen(false);
    }
  }, [destino]);

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

  useEffect(() => {
    if (!destino || !position) {
      setRoute(null);
      setRouteInfo(null);
      setRouteError(null);
      return;
    }

    const controller = new AbortController();
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${position[1]},${position[0]};${destino.lng},${destino.lat}?overview=full&geometries=geojson`;

    fetch(osrmUrl, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== "Ok" || !data.routes?.length) {
          throw new Error("Rota não encontrada");
        }

        const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRoute(coords);
        setRouteInfo({
          distance: data.routes[0].distance,
          duration: data.routes[0].duration,
        });
        setRouteError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error(error);
        setRoute(null);
        setRouteInfo(null);
        setRouteError("Não foi possível traçar a rota. Tente novamente.");
      });

    return () => controller.abort();
  }, [destino, position]);

  if (!initialCenter) {
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
          center={initialCenter}
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

          <CentralizarMapa userPosition={position} destino={destino} follow={followGPS} />

          <Marker position={position}>
            <Popup>📍 Você está aqui!</Popup>
          </Marker>

          {destino && (
            <>
              <Marker position={[destino.lat, destino.lng]}>
                <Popup>{destino.nome}</Popup>
              </Marker>
              {route && (
                <Polyline
                  positions={route}
                  pathOptions={{ color: "#1e88e5", weight: 5, opacity: 0.8 }}
                />
              )}
            </>
          )}
        </MapContainer>
      </div>

      {destino && (
        <button
          className={`follow-toggle-button ${followGPS ? "follow-toggle-button--active" : ""}`}
          onClick={() => setFollowGPS((active) => !active)}
          aria-label={followGPS ? "Desativar seguir GPS" : "Ativar seguir GPS"}
          aria-pressed={followGPS}
        >
          <FaLocationArrow />
        </button>
      )}

      {destino && (
        <button
          className="route-toggle-button"
          onClick={() => setRouteOpen((open) => !open)}
          aria-label="Abrir informações da rota"
          aria-expanded={routeOpen}
        >
          <FaRoute />
        </button>
      )}

      {destino && (
        <div className={`route-card ${routeOpen ? "route-card--open" : ""}`}>
          <strong>Rota até:</strong> {destino.nome}
          {routeInfo ? (
            <>
              <div>Distância: {formatDistance(routeInfo.distance)}</div>
              <div>Tempo: {formatDuration(routeInfo.duration)}</div>
            </>
          ) : (
            <div>Carregando rota...</div>
          )}
        </div>
      )}

      {routeError && <div className="route-error">{routeError}</div>}
    </div>
  );
}