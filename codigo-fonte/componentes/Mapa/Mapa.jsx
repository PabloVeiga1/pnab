import { useCallback, useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaRoute, FaLocationArrow } from "react-icons/fa";
import MapLibre, {
  Marker,
  Popup,
  Source,
  Layer,
  NavigationControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Mapa.css";
import "../estilos.css";
import SplashScreen from "../TelaDeAbertura/TelaDeAbertura";
import { useMonumentos } from "../../dados/usarMonumentos";

const MAP_STYLE = {
  version: 8,
  sources: {
    openstreetmap: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "openstreetmap",
      type: "raster",
      source: "openstreetmap",
    },
  ],
};

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

function distanceBetween(from, to) {
  const radians = (degrees) => degrees * Math.PI / 180;
  const [fromLat, fromLng] = from.map(radians);
  const [toLat, toLng] = to.map(radians);
  const latitudeDelta = toLat - fromLat;
  const longitudeDelta = toLng - fromLng;
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(fromLat) * Math.cos(toLat) * Math.sin(longitudeDelta / 2) ** 2;

  return 6371000 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function bearingBetween(from, to) {
  const radians = (degrees) => degrees * Math.PI / 180;
  const [fromLat, fromLng] = from.map(radians);
  const [toLat, toLng] = to.map(radians);
  const longitudeDelta = toLng - fromLng;
  const y = Math.sin(longitudeDelta) * Math.cos(toLat);
  const x = Math.cos(fromLat) * Math.sin(toLat)
    - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(longitudeDelta);

  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

function readLastKnownPosition() {
  try {
    const savedPosition = JSON.parse(sessionStorage.getItem("cb_last_known_position"));
    return Array.isArray(savedPosition)
      && savedPosition.length === 2
      && savedPosition.every(Number.isFinite)
      ? savedPosition
      : null;
  } catch {
    return null;
  }
}

// Componente que anima o pino do mapa de forma fluida
function MarkerSuave({ position, children }) {
  const [animatedPosition, setAnimatedPosition] = useState(position);
  const posAtual = useRef(position);
  const animacao = useRef(null);

  useEffect(() => {
    if (!position) return;

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

      posAtual.current = [lat, lng];
      setAnimatedPosition([lat, lng]);

      if (progress < 1) {
        animacao.current = requestAnimationFrame(step);
      }
    };

    animacao.current = requestAnimationFrame(step);

    return () => {
      if (animacao.current) cancelAnimationFrame(animacao.current);
    };
  }, [position]);

  return <Marker longitude={animatedPosition[1]} latitude={animatedPosition[0]} anchor="center">{children}</Marker>;
}

// COMPONENTE PRINCIPAL
export default function Map({ destino, destinationSelection, onLocationStatusChange }) {
  const { monumentos, marcarEncontrado } = useMonumentos();
  const [position, setPosition] = useState(readLastKnownPosition);
  const [initialCenter, setInitialCenter] = useState(() => (
    readLastKnownPosition()
    || (navigator.geolocation ? null : [-9.6658, -35.7352])
  ));
  const [routeState, setRouteState] = useState(null);
  const [routeOpenForSelection, setRouteOpenForSelection] = useState(null);
  const routeOpen = Boolean(destino && routeOpenForSelection === destinationSelection);
  const [followGPS, setFollowGPS] = useState(false);
  const [userHeading, setUserHeading] = useState(null);
  const [splashFinished, setSplashFinished] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [openPopup, setOpenPopup] = useState(null);
  const [discoveredMonument, setDiscoveredMonument] = useState(null);
  const [locationNotice, setLocationNotice] = useState(() => (
    readLastKnownPosition()
      ? "GPS indisponível. Mostrando a última posição conhecida nesta aba."
      : navigator.geolocation
        ? null
        : "Este navegador não oferece suporte à localização."
  ));

  // Guarda a última posição aceita para o cálculo do Filtro Anti-Drift
  const lastAcceptedPos = useRef(position);
  const positionRef = useRef(position);
  const fallbackRequested = useRef(false);
  const locationErrorLogged = useRef(false);
  const acceptLocationRef = useRef(null);
  const monumentosRef = useRef(monumentos);
  const marcarEncontradoRef = useRef(marcarEncontrado);
  const discoveredIds = useRef(new Set(
    monumentos
      .filter((monumento) => monumento.status === "encontrado")
      .map((monumento) => monumento.id)
  ));
  const mapRef = useRef(null);
  const routedOnce = useRef(null);

  const acceptLocation = useCallback((location, recenter = false) => {
    const accuracy = location.coords.accuracy;
    const nextPos = [location.coords.latitude, location.coords.longitude];
    onLocationStatusChange?.(accuracy <= 30 ? "active" : "approximate");

    try {
      sessionStorage.setItem("cb_last_known_position", JSON.stringify(nextPos));
    } catch {
      // A localização atual continua disponível mesmo se o armazenamento estiver bloqueado.
    }

    setLocationNotice(
      accuracy > 30
        ? `Localização aproximada (margem estimada de ${Math.round(accuracy)} m).`
        : null
    );

    if (accuracy <= 30) {
      const nearbyMonument = monumentosRef.current.find((monumento) => (
        monumento.status !== "encontrado"
        && !discoveredIds.current.has(monumento.id)
        && distanceBetween(nextPos, [monumento.lat, monumento.lng]) <= 20
      ));

      if (nearbyMonument) {
        discoveredIds.current.add(nearbyMonument.id);
        marcarEncontradoRef.current(nearbyMonument.id);
        setDiscoveredMonument(nearbyMonument);
      }
    }

    const oldPosition = lastAcceptedPos.current;
    const movedMeters = oldPosition ? distanceBetween(oldPosition, nextPos) : Infinity;

    if (accuracy > 30 || !oldPosition || movedMeters > 4 || recenter) {
      setPosition(nextPos);
      setInitialCenter((current) => current || nextPos);

      if (Number.isFinite(location.coords.heading)) {
        setUserHeading(location.coords.heading);
      } else if (oldPosition && accuracy <= 30) {
        setUserHeading(bearingBetween(oldPosition, nextPos));
      }

      lastAcceptedPos.current = nextPos;
    }

    if (recenter) {
      mapRef.current?.getMap()?.easeTo({
        center: [nextPos[1], nextPos[0]],
        zoom: 16,
        duration: 500,
      });
    }
  }, [onLocationStatusChange]);

  useEffect(() => {
    monumentosRef.current = monumentos;
    positionRef.current = position;
    marcarEncontradoRef.current = marcarEncontrado;
    acceptLocationRef.current = acceptLocation;
  }, [monumentos, position, marcarEncontrado, acceptLocation]);

  const showFallbackCenter = useCallback((message) => {
    setInitialCenter((current) => current || [-9.6658, -35.7352]);
    setLocationNotice(message);
  }, []);

  const handleApproximateLocationError = useCallback((error) => {
    console.error("Erro ao tentar localização aproximada:", error);
    onLocationStatusChange?.("unavailable");
    showFallbackCenter(positionRef.current
      ? "Não foi possível atualizar o GPS. Mostrando a última posição conhecida nesta aba."
      : error.code === 1
        ? "Acesso à localização negado. Permita a localização nas configurações do navegador e recarregue a página."
        : "Não foi possível determinar sua posição. Verifique a permissão de localização e tente novamente."
    );
  }, [onLocationStatusChange, showFallbackCenter]);

  const handleLocationError = useCallback((error) => {
    if (!locationErrorLogged.current) {
      console.warn("Falha do provedor de localização:", {
        code: error.code,
        message: error.message,
      });
      locationErrorLogged.current = true;
    }

    if (error.code === 1) {
      onLocationStatusChange?.("unavailable");
      showFallbackCenter(positionRef.current
        ? "Acesso à localização negado. Mostrando a última posição conhecida nesta aba."
        : "Acesso à localização negado. Permita a localização nas configurações do navegador e recarregue a página."
      );
      return;
    }

    if (fallbackRequested.current) {
      onLocationStatusChange?.("unavailable");
      return;
    }

    fallbackRequested.current = true;
    onLocationStatusChange?.("searching");
    showFallbackCenter(positionRef.current
      ? "GPS indisponível. Mostrando a última posição conhecida nesta aba enquanto tento atualizar."
      : "Sinal preciso indisponível. Tentando obter uma posição aproximada..."
    );

    navigator.geolocation.getCurrentPosition(
      (fallbackLocation) => acceptLocationRef.current(fallbackLocation, true),
      handleApproximateLocationError,
      { enableHighAccuracy: false, maximumAge: 60000, timeout: 20000 }
    );
  }, [handleApproximateLocationError, onLocationStatusChange, showFallbackCenter]);

  const retryLocation = () => {
    if (!navigator.geolocation) {
      onLocationStatusChange?.("unavailable");
      setLocationNotice("Este navegador não oferece suporte à localização.");
      return;
    }

    locationErrorLogged.current = false;
    onLocationStatusChange?.("searching");
    setLocationNotice("Solicitando uma nova leitura do GPS...");
    navigator.geolocation.getCurrentPosition(
      (location) => acceptLocationRef.current(location, true),
      (error) => {
        if (!locationErrorLogged.current) {
          console.warn("Falha ao atualizar a localização:", {
            code: error.code,
            message: error.message,
          });
          locationErrorLogged.current = true;
        }
        onLocationStatusChange?.("unavailable");

        setLocationNotice(error.code === 1
          ? "Acesso à localização negado. Permita a localização nas configurações do navegador."
          : positionRef.current
            ? "Não foi possível atualizar o GPS. Mostrando a última posição conhecida nesta aba."
            : "Não foi possível obter uma posição. Verifique o GPS e tente novamente."
        );
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 30000 }
    );
  };

  // Efeito de Geolocalização com Filtro Anti-Drift e Precisão
  useEffect(() => {
    if (!navigator.geolocation) {
      onLocationStatusChange?.("unavailable");
      return;
    }

    onLocationStatusChange?.("searching");
    const watchId = navigator.geolocation.watchPosition(
      (location) => acceptLocationRef.current(location),
      handleLocationError,
      {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 15000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [handleLocationError, onLocationStatusChange]);

  const routeKey = destino && position
    ? `${destino.id}:${position[0]}:${position[1]}`
    : null;
  const activeRouteState = routeKey && routeState?.key === routeKey
    ? routeState
    : null;
  const route = activeRouteState?.route ?? null;
  const routeInfo = activeRouteState?.info ?? null;
  const routeError = activeRouteState?.error ?? null;

  // Efeito de Rota (OSRM)
  useEffect(() => {
    if (!destino || !position) return;

    const controller = new AbortController();
    const requestKey = `${destino.id}:${position[0]}:${position[1]}`;
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${position[1]},${position[0]};${destino.lng},${destino.lat}?overview=full&geometries=geojson`;

    fetch(osrmUrl, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== "Ok" || !data.routes?.length) {
          throw new Error("Rota não encontrada");
        }

        setRouteState({
          key: requestKey,
          route: data.routes[0].geometry.coordinates,
          info: {
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
          },
          error: null,
        });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error(error);
        setRouteState({
          key: requestKey,
          route: null,
          info: null,
          error: "Não foi possível traçar a rota. Tente novamente.",
        });
      });

    return () => controller.abort();
  }, [destino, position]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!mapReady || !map || !position || !followGPS) return;

    map.easeTo({
      center: [position[1], position[0]],
      zoom: 16,
      bearing: userHeading ?? map.getBearing(),
      duration: 500,
    });
  }, [position, followGPS, userHeading, mapReady]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!mapReady || !map || !position || !destino || followGPS) return;
    if (routedOnce.current === destino.id) return;

    map.easeTo({
      center: [destino.lng, destino.lat],
      zoom: 16,
      duration: 700,
    });
    routedOnce.current = destino.id;
  }, [position, destino, followGPS, mapReady]);

  useEffect(() => {
    if (!destino) routedOnce.current = null;
  }, [destino]);

  const routeGeoJSON = route
    ? {
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: route },
      }
    : null;

  // Tela de Carregamento inicial (Caminho de Bronze)
  if (!initialCenter || !splashFinished) {
    return (
      <SplashScreen
        text="Carregando..."
        onFinish={() => setSplashFinished(true)}
      />
    );
  }

  // Renderização Principal do Mapa
  return (
    <div className="map-wrapper">
      <div className="map-content">
        <MapLibre
          ref={mapRef}
          initialViewState={{
            longitude: initialCenter[1],
            latitude: initialCenter[0],
            zoom: 16,
          }}
          mapStyle={MAP_STYLE}
          maxZoom={19}
          dragRotate
          touchZoomRotate
          touchPitch={false}
          className="map-container"
          onLoad={() => setMapReady(true)}
        >
          <NavigationControl position="top-right" showZoom={false} showCompass />

          {/* Pino suave do usuário */}
          {position && (
            <MarkerSuave position={position}>
              <button
                type="button"
                className="user-location-marker"
                aria-label="Mostrar sua localização"
                onClick={() => setOpenPopup("user")}
              >
                <FaLocationArrow />
              </button>
            </MarkerSuave>
          )}

          {/* Destino e Rota */}
          {destino && (
            <>
              <Marker longitude={destino.lng} latitude={destino.lat} anchor="bottom">
                <button
                  type="button"
                  className="destination-marker"
                  aria-label={`Mostrar destino ${destino.nome}`}
                  onClick={() => setOpenPopup("destination")}
                >
                  <FaMapMarkerAlt />
                </button>
              </Marker>
              {openPopup === "destination" && (
                <Popup
                  longitude={destino.lng}
                  latitude={destino.lat}
                  anchor="bottom"
                  onClose={() => setOpenPopup(null)}
                >
                  {destino.nome}
                </Popup>
              )}
            </>
          )}
          {position && openPopup === "user" && (
            <Popup
              longitude={position[1]}
              latitude={position[0]}
              onClose={() => setOpenPopup(null)}
            >
              Você está aqui!
            </Popup>
          )}
          {routeGeoJSON && (
            <Source id="route" type="geojson" data={routeGeoJSON}>
              <Layer
                id="route-line"
                type="line"
                layout={{ "line-cap": "round", "line-join": "round" }}
                paint={{ "line-color": "#a81d84", "line-width": 5, "line-opacity": 0.85 }}
              />
            </Source>
          )}
        </MapLibre>
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
          onClick={() => setRouteOpenForSelection(routeOpen ? null : destinationSelection)}
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
      {locationNotice && (
        <div className="location-status" role="status">
          <span>{locationNotice}</span>
          <button type="button" onClick={retryLocation}>
            Atualizar localização
          </button>
        </div>
      )}

      {discoveredMonument && (
        <div className="discovery-backdrop">
          <section
            className="discovery-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="discovery-title"
          >
            <span className="discovery-icon" aria-hidden="true">✓</span>
            <h2 id="discovery-title">
              Você encontrou a estátua de {discoveredMonument.nome}!
            </h2>
            <p>Esta homenagem foi adicionada às suas descobertas.</p>
            <button type="button" onClick={() => setDiscoveredMonument(null)}>
              Continuar explorando
            </button>
          </section>
        </div>
      )}
    </div>
  );
}