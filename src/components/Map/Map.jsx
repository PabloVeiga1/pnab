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

// Corrige os ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Funções utilitárias de formatação
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

// Componente para controle de câmera (Centralizar)
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

// NOVO: Componente que anima o pino do mapa de forma fluida
function MarkerSuave({ position, children }) {
  const markerRef = useRef(null);
  const posAtual = useRef(position);
  const animacao = useRef(null);

  useEffect(() => {
    if (!markerRef.current || !position) return;
    const marker = markerRef.current;

    // Cancela a animação anterior se chegar uma nova coordenada no meio do caminho
    if (animacao.current) cancelAnimationFrame(animacao.current);

    const latOrigem = posAtual.current[0];
    const lngOrigem = posAtual.current[1];
    const latDestino = position[0];
    const lngDestino = position[1];

    const startTime = performance.now();
    const duration = 1000; // Tempo da animação: 1 segundo

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const lat = latOrigem + (latDestino - latOrigem) * progress;
      const lng = lngOrigem + (lngDestino - lngOrigem) * progress;

      // Atualiza direto no DOM do Leaflet para não travar o React
      marker.setLatLng([lat, lng]);
      posAtual.current = [lat, lng];

      if (progress < 1) {
        animacao.current = requestAnimationFrame(step);
      }
    };

    animacao.current = requestAnimationFrame(step);

    return () => {
      if (animacao.current) cancelAnimationFrame(animacao.current);
    };
  }, [position]);

  return (
    <Marker position={position} ref={markerRef}>
      {children}
    </Marker>
  );
}

// COMPONENTE PRINCIPAL
export default function Map({ destino }) {
  const [position, setPosition] = useState(null);
  const [initialCenter, setInitialCenter] = useState(null);
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeError, setRouteError] = useState(null);
  const [routeOpen, setRouteOpen] = useState(false);
  const [followGPS, setFollowGPS] = useState(false);

  useEffect(() => {
    if (!destino) {
      setRouteOpen(false);
    }
  }, [destino]);

  // Efeito de Geolocalização (Otimizado)
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Seu navegador não suporta geolocalização.");
      return;
    }

    let hasInitialPosition = false;

    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        const accuracy = location.coords.accuracy;
        const nextPos = [location.coords.latitude, location.coords.longitude];

        // Se for a primeira leitura, aceita sempre (para não travar no loading)
        if (!hasInitialPosition) {
          setInitialCenter(nextPos);
          setPosition(nextPos);
          hasInitialPosition = true;
          return;
        }

        // Se já abriu o mapa e vier uma leitura ruim, ignora
        if (accuracy > 30) {
          console.warn(`GPS instável ignorado. Precisão: ${accuracy}m`);
          return;
        }

        // Atualiza a posição normal
        setPosition(nextPos);
      },
      (error) => {
        console.error("Erro na geolocalização:", error);
        // Fallback: Se der erro, joga para Maceió (ou outra cidade) para não travar o app
        setInitialCenter((current) => current || [-9.6658, -35.7352]);
        alert("Não foi possível obter a sua localização exata.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 15000, // 15 segundos para dar tempo ao GPS de achar satélites
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []); // Array vazio garante que o watchPosition seja chamado apenas 1 vez na montagem

  // Efeito de Rota (OSRM)
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

  // Tela de Carregamento
  if (!initialCenter) {
    return (
      <div className="loading">
        <h2>Obtendo localização...</h2>
      </div>
    );
  }

  // Renderização Principal do Mapa
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

          {/* Pino suave do usuário */}
          {position && (
            <MarkerSuave position={position}>
              <Popup>📍 Você está aqui!</Popup>
            </MarkerSuave>
          )}

          {/* Destino e Rota */}
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