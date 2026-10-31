
import React, { useEffect, useRef, useState } from "react";
import * as L from "leaflet";

import {
  X,
  MapPin,
  Navigation,
  Hospital,
  Loader2,
  ShieldCheck,
  ExternalLink,
  AlertCircle,
  Search,
  RefreshCw,
} from "lucide-react";

// ==========================================
// TIPOS
// ==========================================

interface ReportCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onAddXp?: (amount: number) => void;
}

interface HealthCenter {
  id: string;
  name: string;
  lat: number;
  lon: number;
  distance: number;
  address?: string;
}

interface OverpassElement {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: Record<string, string>;
}

// ==========================================
// CONFIGURACIÓN DEL MAPA
// ==========================================

const PERU_CENTER: L.LatLngExpression = [-9.19, -75.015];

const MAP_TILES =
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const OVERPASS_URL =
  "https://overpass.kumi.systems/api/interpreter";

// ==========================================
// CALCULAR DISTANCIA
// ==========================================

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (
    2 *
    R *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
}

// ==========================================
// BUSCAR CENTROS DE SALUD
// ==========================================

async function searchHealthCenters(
  latitude: number,
  longitude: number,
  radius: number,
  signal: AbortSignal
): Promise<HealthCenter[]> {
  const query = `
    [out:json][timeout:25];
    (
      nwr["amenity"~"^(hospital|clinic|doctors)$"]
        (around:${radius},${latitude},${longitude});

      nwr["healthcare"~"^(hospital|clinic|centre|doctor)$"]
        (around:${radius},${latitude},${longitude});
    );
    out center;
  `;

  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "Content-Type":
        "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams({ data: query }),
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Error consultando establecimientos: ${response.status}`
    );
  }

  const data: { elements?: OverpassElement[] } =
    await response.json();

  const centers: HealthCenter[] = [];
  const seen = new Set<string>();

  for (const item of data.elements ?? []) {
    const lat = item.lat ?? item.center?.lat;
    const lon = item.lon ?? item.center?.lon;

    if (
      typeof lat !== "number" ||
      typeof lon !== "number"
    ) {
      continue;
    }

    const id = `${item.type}-${item.id}`;

    if (seen.has(id)) continue;

    seen.add(id);

    const tags = item.tags ?? {};

    const address =
      tags["addr:full"] ||
      [
        tags["addr:street"],
        tags["addr:housenumber"],
        tags["addr:city"],
      ]
        .filter(Boolean)
        .join(", ");

    centers.push({
      id,
      name:
        tags.name ||
        tags["name:es"] ||
        "Establecimiento de salud",

      lat,
      lon,

      distance: calculateDistance(
        latitude,
        longitude,
        lat,
        lon
      ),

      address: address || undefined,
    });
  }

  return centers.sort(
    (a, b) => a.distance - b.distance
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export const ReportCaseModal: React.FC<
  ReportCaseModalProps
> = ({ isOpen, onClose, darkMode }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<L.Map | null>(null);

  const markersRef =
    useRef<L.LayerGroup | null>(null);

  const requestRef =
    useRef<AbortController | null>(null);

  const searchIdRef = useRef(0);

  const openRef = useRef(isOpen);

  const [loading, setLoading] = useState(false);

  const [centers, setCenters] = useState<HealthCenter[]>([]);

  const [selected, setSelected] =
    useState<HealthCenter | null>(null);

  const [error, setError] = useState("");

  const [hasSearched, setHasSearched] =
    useState(false);

  openRef.current = isOpen;

  // ========================================
  // INICIALIZAR MAPA
  // ========================================

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    });

    map.setView(PERU_CENTER, 5);

    L.tileLayer(MAP_TILES, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    markersRef.current = L.layerGroup().addTo(map);

    const resizeTimer = window.setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      window.clearTimeout(resizeTimer);

      searchIdRef.current += 1;

      requestRef.current?.abort();
      requestRef.current = null;

      map.remove();

      mapRef.current = null;
      markersRef.current = null;
    };
  }, [isOpen]);

  // ========================================
  // MOSTRAR CENTROS EN MAPA
  // ========================================

  const showCentersOnMap = (
    latitude: number,
    longitude: number,
    results: HealthCenter[]
  ) => {
    const map = mapRef.current;
    const markers = markersRef.current;

    if (!map || !markers) return;

    markers.clearLayers();

    // Ubicación de la persona
    L.circleMarker([latitude, longitude], {
      radius: 10,
      color: "#ffffff",
      weight: 3,
      fillColor: "#2563eb",
      fillOpacity: 1,
    })
      .bindTooltip("Tu ubicación aproximada")
      .addTo(markers);

    // Centros médicos encontrados
    results.forEach((center, index) => {
      const marker = L.circleMarker(
        [center.lat, center.lon],
        {
          radius: index === 0 ? 11 : 8,
          color: "#ffffff",
          weight: 2,
          fillColor:
            index === 0 ? "#16a34a" : "#7c3aed",
          fillOpacity: 1,
        }
      );

      marker.bindTooltip(center.name);

      marker.on("click", () => {
        setSelected(center);
      });

      marker.addTo(markers);
    });

    if (results.length > 0) {
      const nearest = results[0];

      const bounds = L.latLngBounds([
        [latitude, longitude],
        [nearest.lat, nearest.lon],
      ]);

      map.fitBounds(bounds.pad(0.5), {
        maxZoom: 15,
      });
    } else {
      map.setView([latitude, longitude], 13);
    }
  };

  // ========================================
  // UBICACIÓN Y BÚSQUEDA
  // ========================================

  const findNearby = () => {
    if (loading) return;

    setLoading(true);
    setError("");
    setCenters([]);
    setSelected(null);
    setHasSearched(false);

    if (!navigator.geolocation) {
      setError(
        "Tu navegador no permite obtener tu ubicación."
      );

      setLoading(false);
      return;
    }

    const currentSearchId = ++searchIdRef.current;

    requestRef.current?.abort();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (
          !openRef.current ||
          currentSearchId !== searchIdRef.current
        ) {
          return;
        }

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const controller = new AbortController();

        requestRef.current = controller;

        try {
          // Buscar primero en un radio de 10 km
          let results = await searchHealthCenters(
            latitude,
            longitude,
            10000,
            controller.signal
          );

          // Si no hay resultados, ampliar a 30 km
          if (results.length === 0) {
            results = await searchHealthCenters(
              latitude,
              longitude,
              30000,
              controller.signal
            );
          }

          if (
            !openRef.current ||
            currentSearchId !== searchIdRef.current
          ) {
            return;
          }

          const nearby = results.slice(0, 15);

          setCenters(nearby);

          setSelected(nearby[0] ?? null);

          setHasSearched(true);

          showCentersOnMap(
            latitude,
            longitude,
            nearby
          );

          if (nearby.length === 0) {
            setError(
              "No encontramos establecimientos registrados en un radio de 30 km. Esto no significa que no existan centros de salud en tu zona."
            );
          }
        } catch (err) {
          if (controller.signal.aborted) return;

          console.error("Error del mapa:", err);

          if (
            openRef.current &&
            currentSearchId === searchIdRef.current
          ) {
            setError(
              "No fue posible consultar los centros de salud. Intenta nuevamente o utiliza Google Maps."
            );

            setHasSearched(true);
          }
        } finally {
          if (
            openRef.current &&
            currentSearchId === searchIdRef.current
          ) {
            setLoading(false);
          }

          if (requestRef.current === controller) {
            requestRef.current = null;
          }
        }
      },

      (geoError) => {
        if (
          !openRef.current ||
          currentSearchId !== searchIdRef.current
        ) {
          return;
        }

        setLoading(false);

        if (geoError.code === 1) {
          setError(
            "No autorizaste el acceso a tu ubicación. Puedes explorar el mapa manualmente."
          );
        } else {
          setError(
            "No pudimos determinar tu ubicación. Revisa la configuración de GPS y vuelve a intentarlo."
          );
        }
      },

      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  };

  // ========================================
  // SELECCIONAR ESTABLECIMIENTO
  // ========================================

  const focusCenter = (center: HealthCenter) => {
    setSelected(center);

    mapRef.current?.setView(
      [center.lat, center.lon],
      16
    );
  };

  // ========================================
  // ABRIR INDICACIONES EN GOOGLE MAPS
  // ========================================

  const openDirections = (center: HealthCenter) => {
    const url =
      "https://www.google.com/maps/dir/?api=1" +
      `&destination=${center.lat},${center.lon}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-4xl max-h-[94vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border ${
          darkMode
            ? "bg-[#241226] border-[#5B3E60] text-white"
            : "bg-white border-[#E5D7DE] text-[#2D1A30]"
        }`}
      >
        {/* ENCABEZADO */}
        <div className="bg-[#4B2E4F] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/15 p-2 rounded-xl">
              <Hospital className="w-6 h-6" />
            </div>

            <div>
              <h2 className="font-black text-base sm:text-xl">
                Centros de Salud del Perú
              </h2>

              <p className="text-xs text-white/80">
                Encuentra atención médica cerca de ti
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar mapa"
            className="p-2 rounded-lg hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* AVISO DE PRIVACIDAD */}
          <div
            className={`p-3 rounded-xl flex items-start gap-2 text-xs ${
              darkMode
                ? "bg-[#3B1F3D] text-white/90"
                : "bg-purple-50 text-[#4B2E4F]"
            }`}
          >
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />

            <p>
              Tu ubicación se solicitará únicamente
              cuando presiones el botón de búsqueda.
              No guardamos tu ubicación en este componente.
              Para encontrar establecimientos cercanos,
              tus coordenadas se enviarán a un servicio
              externo de mapas.
            </p>
          </div>

          {/* BOTÓN DE BÚSQUEDA */}
          <button
            type="button"
            onClick={findNearby}
            disabled={loading}
            className="w-full bg-[#4B2E4F] hover:bg-[#3B1F3D] disabled:opacity-60 text-white font-bold p-3 rounded-xl flex items-center justify-center gap-2 transition"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Navigation className="w-5 h-5" />
            )}

            {loading
              ? "Buscando centros de salud..."
              : "Buscar centros cerca de mí"}
          </button>

          {/* MENSAJE DE ERROR */}
          {error && (
            <div className="bg-amber-50 text-amber-900 border border-amber-200 rounded-xl p-3 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* MAPA DEL PERÚ */}
          <div className="relative rounded-2xl overflow-hidden border border-purple-200 shadow-sm">
            <div
              ref={mapContainerRef}
              className="w-full h-[340px] sm:h-[440px] z-0"
              aria-label="Mapa interactivo del Perú"
            />
          </div>

          {/* LEYENDA */}
          <div className="flex flex-wrap gap-4 text-xs opacity-80">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              Tu ubicación
            </span>

            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-600" />
              Más cercano encontrado
            </span>

            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-600" />
              Otros centros
            </span>
          </div>

          {/* ESTABLECIMIENTO SELECCIONADO */}
          {selected && (
            <div
              className={`rounded-2xl p-4 border ${
                darkMode
                  ? "bg-[#321734] border-[#5B3E60]"
                  : "bg-purple-50 border-purple-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Hospital className="w-6 h-6 text-green-700" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-green-600">
                    {centers[0]?.id === selected.id
                      ? "Más cercano entre los registrados"
                      : "Centro seleccionado"}
                  </p>

                  <h3 className="font-bold text-base">
                    {selected.name}
                  </h3>

                  <p className="text-sm opacity-80 mt-1">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    Aproximadamente{" "}
                    {selected.distance.toFixed(2)} km
                  </p>

                  {selected.address && (
                    <p className="text-xs opacity-70 mt-1">
                      {selected.address}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => openDirections(selected)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Cómo llegar
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* LISTA DE CENTROS */}
          {centers.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Search className="w-4 h-4" />
                Centros encontrados ({centers.length})
              </h3>

              <div className="max-h-52 overflow-y-auto space-y-2">
                {centers.map((center) => (
                  <button
                    key={center.id}
                    type="button"
                    onClick={() => focusCenter(center)}
                    className={`w-full text-left p-3 border rounded-xl flex items-center gap-3 transition ${
                      selected?.id === center.id
                        ? "border-purple-500 bg-purple-50 text-[#4B2E4F]"
                        : darkMode
                        ? "border-[#5B3E60] bg-[#321734] text-white"
                        : "border-gray-200 hover:bg-purple-50"
                    }`}
                  >
                    <Hospital className="w-5 h-5 text-purple-500 flex-shrink-0" />

                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold">
                        {center.name}
                      </span>

                      <span className="block text-xs opacity-70">
                        {center.distance.toFixed(2)} km
                      </span>
                    </span>

                    <MapPin className="w-4 h-4 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MENSAJE INICIAL */}
          {!loading && !hasSearched && !error && (
            <p className="text-center text-sm opacity-70">
              Explora el mapa del Perú o presiona
              "Buscar centros cerca de mí" para
              encontrar establecimientos de salud.
            </p>
          )}

          {/* REINTENTAR */}
          {hasSearched && (
            <button
              type="button"
              onClick={findNearby}
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-300"
            >
              <RefreshCw className="w-4 h-4" />
              Actualizar búsqueda
            </button>
          )}

          {/* BÚSQUEDA ALTERNATIVA */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=centros+de+salud+Peru"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-300 underline"
          >
            Buscar centros de salud en Google Maps
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* INFORMACIÓN */}
          <p className="text-[11px] text-center opacity-60">
            Datos colaborativos de OpenStreetMap.
            Los establecimientos pueden estar incompletos
            o desactualizados. Las distancias se calculan
            en línea recta, no por carretera.
            Confirma la disponibilidad y los servicios
            antes de acudir.
          </p>
        </div>
      </div>
    </div>
  );
};
