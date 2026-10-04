import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaRoute, FaLocationArrow } from "react-icons/fa";
import MapLibre, {
  Marker,
  Popup,
  Source,
  Layer,
  NavigationControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
import "../styles.css";
import SplashScreen from "../SplashScreen/SplashScreen";
import { useMonumentos } from "../../data/useMonumentos";

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
export default function Map({ destino }) {
  const { monumentos, marcarEncontrado } = useMonumentos();
  const [position, setPosition] = useState(null);
  const [initialCenter, setInitialCenter] = useState(null);
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeError, setRouteError] = useState(null);
  const [routeOpen, setRouteOpen] = useState(false);
  const [followGPS, setFollowGPS] = useState(false);
  const [userHeading, setUserHeading] = useState(null);
  const [splashFinished, setSplashFinished] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [openPopup, setOpenPopup] = useState(null);
  const [discoveredMonument, setDiscoveredMonument] = useState(null);
  const [locationNotice, setLocationNotice] = useState(null);

  // Guarda a última posição aceita para o cálculo do Filtro Anti-Drift
  const lastAcceptedPos = useRef(null);
  const fallbackRequested = useRef(false);
  const locationErrorLogged = useRef(false);
  const monumentosRef = useRef(monumentos);
  const marcarEncontradoRef = useRef(marcarEncontrado);
  const discoveredIds = useRef(new Set(
    monumentos
      .filter((monumento) => monumento.status === "encontrado")
      .map((monumento) => monumento.id)
  ));
  const mapRef = useRef(null);
  const routedOnce = useRef(null);

  monumentosRef.current = monumentos;
  marcarEncontradoRef.current = marcarEncontrado;

  useEffect(() => {
    if (!destino) {
      setRouteOpen(false);
    }
  }, [destino]);

  // Efeito de Geolocalização com Filtro Anti-Drift e Precisão
  useEffect(() => {
    if (!navigator.geolocation) {
      setInitialCenter([-9.6658, -35.7352]);
      setLocationNotice("Este navegador não oferece suporte à localização.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        const accuracy = location.coords.accuracy;
        const nextPos = [location.coords.latitude, location.coords.longitude];
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

        // 1. Primeira leitura (aceita sempre para carregar o mapa de imediato)
        if (!lastAcceptedPos.current) {
          setInitialCenter(nextPos);
          setPosition(nextPos);
          if (Number.isFinite(location.coords.heading)) {
            setUserHeading(location.coords.heading);
          }
          lastAcceptedPos.current = nextPos;
          return;
        }

        // 2. Filtro de Sinal ruim (ignora leituras com erro maior que 30 metros)
        if (accuracy > 30) {
          return;
        }

        // 3. Filtro Anti-Drift (só mexe o pino se você andou mais de 4 metros reais)
        const oldPosition = lastAcceptedPos.current;
        const metersMoved = distanceBetween(oldPosition, nextPos);

        if (metersMoved > 4) {
          setPosition(nextPos);
          if (Number.isFinite(location.coords.heading)) {
            setUserHeading(location.coords.heading);
          } else {
            setUserHeading(bearingBetween(oldPosition, nextPos));
          }
          lastAcceptedPos.current = nextPos;
        }
      },
      (error) => {
        if (!locationErrorLogged.current) {
          console.warn("Falha do provedor de localização:", {
            code: error.code,
            message: error.message,
          });
          locationErrorLogged.current = true;
        }

        if (error.code === 1) {
          setInitialCenter((current) => current || [-9.6658, -35.7352]);
          setLocationNotice("Acesso à localização negado. Permita a localização nas configurações do navegador e recarregue a página.");
          return;
        }

        if (fallbackRequested.current) return;
        fallbackRequested.current = true;
        setInitialCenter((current) => current || [-9.6658, -35.7352]);
        setLocationNotice("Sinal preciso indisponível. Tentando obter uma posição aproximada...");

        navigator.geolocation.getCurrentPosition(
          (fallbackLocation) => {
            const fallbackPosition = [
              fallbackLocation.coords.latitude,
              fallbackLocation.coords.longitude,
            ];

            setPosition(fallbackPosition);
            setInitialCenter(fallbackPosition);
            lastAcceptedPos.current = fallbackPosition;
            setLocationNotice(
              fallbackLocation.coords.accuracy > 30
                ? `Localização aproximada (margem estimada de ${Math.round(fallbackLocation.coords.accuracy)} m).`
                : null
            );

            const map = mapRef.current?.getMap();
            map?.easeTo({
              center: [fallbackPosition[1], fallbackPosition[0]],
              zoom: 16,
              duration: 500,
            });
          },
          (fallbackError) => {
            console.error("Erro ao tentar localização aproximada:", fallbackError);
            setInitialCenter((current) => current || [-9.6658, -35.7352]);
            setLocationNotice(
              fallbackError.code === 1
                ? "Acesso à localização negado. Permita a localização nas configurações do navegador e recarregue a página."
                : "Não foi possível determinar sua posição. Verifique a permissão de localização e tente novamente."
            );
          },
          { enableHighAccuracy: false, maximumAge: 60000, timeout: 20000 }
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 15000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

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

        setRoute(data.routes[0].geometry.coordinates);
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

    map.fitBounds(
      [
        [position[1], position[0]],
        [destino.lng, destino.lat],
      ],
      { padding: { top: 72, right: 72, bottom: 72, left: 72 }, duration: 700 }
    );
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
      {locationNotice && (
        <div className="location-status" role="status">
          {locationNotice}
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