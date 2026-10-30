import React, { useState, useEffect } from 'react';
import { SafetyPoint, CitizenReportInput } from '../types/citizenMap';
import { INITIAL_SAFETY_POINTS } from '../data/citizenMapData';
import { 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  Filter, 
  Search, 
  CheckCircle, 
  ThumbsUp, 
  Eye, 
  Flame, 
  Lock, 
  Phone, 
  Clock, 
  Compass, 
  Layers,
  Sparkles,
  Info,
  Building2,
  Navigation2
} from 'lucide-react';

interface CitizenMapProps {
  darkMode: boolean;
  onOpenChat?: () => void;
  onAddXp?: (amount: number) => void;
}

const LOCAL_STORAGE_POINTS_KEY = 'unidas_citizen_safety_points';

export const CitizenMapAndReports: React.FC<CitizenMapProps> = ({
  darkMode,
  onOpenChat,
  onAddXp
}) => {
  const [points, setPoints] = useState<SafetyPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<SafetyPoint | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'safe_point' | 'risk_point'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'map' | 'heatmap' | 'list'>('map');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [upvotedPoints, setUpvotedPoints] = useState<Record<string, boolean>>({});
  const [reportSuccessMessage, setReportSuccessMessage] = useState<string | null>(null);

  // Form State for Citizen Report
  const [newReport, setNewReport] = useState<CitizenReportInput>({
    title: '',
    category: 'risk_point',
    type: 'acoso_callejero',
    latitude: -12.0833,
    longitude: -77.0345,
    city: 'Lima',
    department: 'Lima',
    address: '',
    description: '',
    severity: 'media',
    anonymous: true,
    reporterAlias: 'Joven Vigilante'
  });

  // Load points from local storage or initial dataset
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_POINTS_KEY);
      if (stored) {
        setPoints(JSON.parse(stored));
      } else {
        setPoints(INITIAL_SAFETY_POINTS);
        localStorage.setItem(LOCAL_STORAGE_POINTS_KEY, JSON.stringify(INITIAL_SAFETY_POINTS));
      }
    } catch (e) {
      setPoints(INITIAL_SAFETY_POINTS);
    }
  }, []);

  const savePoints = (updated: SafetyPoint[]) => {
    setPoints(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_POINTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save safety points to localStorage', e);
    }
  };

  const handleUpvote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (upvotedPoints[id]) return;

    const updated = points.map(p => {
      if (p.id === id) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    });

    savePoints(updated);
    setUpvotedPoints(prev => ({ ...prev, [id]: true }));
    if (onAddXp) onAddXp(15);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.title.trim() || !newReport.description.trim()) return;

    // Slight random offset around selected city center for visualization
    const randomOffsetLat = (Math.random() - 0.5) * 0.02;
    const randomOffsetLng = (Math.random() - 0.5) * 0.02;

    const cityCoords: Record<string, { lat: number; lng: number }> = {
      'Lima': { lat: -12.065, lng: -77.038 },
      'Cusco': { lat: -13.525, lng: -71.975 },
      'Arequipa': { lat: -16.405, lng: -71.535 },
      'Huamanga': { lat: -13.160, lng: -74.220 },
      'Huancayo': { lat: -12.065, lng: -75.205 },
    };

    const baseCoord = cityCoords[newReport.city] || { lat: -12.065, lng: -77.038 };

    const newSafetyPoint: SafetyPoint = {
      id: `report-${Date.now()}`,
      title: newReport.title,
      category: newReport.category,
      type: newReport.type as any,
      latitude: baseCoord.lat + randomOffsetLat,
      longitude: baseCoord.lng + randomOffsetLng,
      city: newReport.city,
      department: newReport.department,
      address: newReport.address || 'Ubicación reportada por la comunidad',
      description: newReport.description,
      verified: false,
      upvotes: 1,
      reportsCount: 1,
      severity: newReport.severity,
      tags: [newReport.category === 'safe_point' ? 'Punto Amigo' : 'Riesgo Reportado', newReport.city, 'Alerta Comunitaria'],
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newSafetyPoint, ...points];
    savePoints(updated);
    setSelectedPoint(newSafetyPoint);
    setIsReportModalOpen(false);
    setReportSuccessMessage('¡Reporte comunitario registrado con éxito de forma 100% anónima! Ganaste +30 XP.');
    if (onAddXp) onAddXp(30);

    setTimeout(() => {
      setReportSuccessMessage(null);
    }, 5000);

    // Reset form
    setNewReport({
      title: '',
      category: 'risk_point',
      type: 'acoso_callejero',
      latitude: -12.0833,
      longitude: -77.0345,
      city: 'Lima',
      department: 'Lima',
      address: '',
      description: '',
      severity: 'media',
      anonymous: true,
      reporterAlias: 'Joven Vigilante'
    });
  };

  // Filtered Points
  const filteredPoints = points.filter(p => {
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const matchesCity = selectedCity === 'all' || p.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesCity && matchesSearch;
  });

  const safePointsCount = points.filter(p => p.category === 'safe_point').length;
  const riskPointsCount = points.filter(p => p.category === 'risk_point').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border relative overflow-hidden ${
        darkMode ? 'bg-[#3C223F] border-[#6D4C72] text-white' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#4B2E4F] text-amber-300 dark:bg-[#5B3760] px-3 py-1 rounded-full text-xs font-black shadow-xs">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Mapa Interactivo de Puntos Seguros & Reportes Ciudadanos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F3D] dark:text-white">
              Puntos Seguros & Alertas de Riesgo Comunitario
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 max-w-3xl leading-relaxed">
              Explora en tiempo real las postas amigables del MINSA, Centros Emergencia Mujer (CEM), comisarías con atención especializada y reporta zonas con falta de alumbrado o acoso callejero de forma <strong>100% anónima</strong> para proteger a las adolescentes de tu comunidad.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap flex-shrink-0">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-[#4B2E4F] hover:bg-[#5B3760] text-amber-300 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Reporte Anónimo (+30 XP)</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-200/60 dark:border-stone-700/60">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-emerald-800 dark:text-emerald-300">{safePointsCount}</div>
              <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">Puntos Seguros Oficiales</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-rose-800 dark:text-rose-300">{riskPointsCount}</div>
              <div className="text-[11px] font-bold text-rose-700 dark:text-rose-400">Alertas de Riesgo Reportadas</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4B2E4F] text-amber-300 flex items-center justify-center font-bold text-sm">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-purple-900 dark:text-purple-200">5 Regiones</div>
              <div className="text-[11px] font-bold text-purple-700 dark:text-purple-400">Lima, Cusco, Arequipa, etc.</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-sm">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-amber-900 dark:text-amber-200">100% Seguro</div>
              <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400">Sin datos personales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {reportSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-sm flex items-center gap-3 shadow-lg animate-bounce">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{reportSuccessMessage}</span>
        </div>
      )}

      {/* Controls: Search, Filters & View Toggle */}
      <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-[#351C37] border-[#5B3E60]' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Category Filter */}
          <div className="inline-flex rounded-xl p-1 bg-stone-100 dark:bg-[#251027] border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-[#4B2E4F] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              Todos ({points.length})
            </button>
            <button
              onClick={() => setFilterCategory('safe_point')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                filterCategory === 'safe_point'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Seguros ({safePointsCount})</span>
            </button>
            <button
              onClick={() => setFilterCategory('risk_point')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                filterCategory === 'risk_point'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-700 dark:text-rose-400 hover:text-rose-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Riesgo ({riskPointsCount})</span>
            </button>
          </div>

          {/* City Selector */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-stone-50 dark:bg-[#251027] text-stone-900 dark:text-stone-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#4B2E4F]"
          >
            <option value="all">📍 Todas las Ciudades</option>
            <option value="Lima">🇵🇪 Lima</option>
            <option value="Cusco">🏔️ Cusco</option>
            <option value="Arequipa">🌋 Arequipa</option>
            <option value="Huamanga">🌾 Ayacucho (Huamanga)</option>
            <option value="Huancayo">🌄 Junín (Huancayo)</option>
          </select>
        </div>

        {/* Search input & View Selector */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar posta, CEM, calle, riesgo..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-stone-50 dark:bg-[#251027] text-stone-900 dark:text-white text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4B2E4F]"
            />
          </div>

          <div className="inline-flex rounded-xl p-1 bg-stone-100 dark:bg-[#251027] border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => setViewMode('map')}
              title="Vista de Mapa Visual"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === 'map' ? 'bg-[#4B2E4F] text-amber-300' : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mapa</span>
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              title="Mapa de Calor de Riesgo e Incidencia"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === 'heatmap' ? 'bg-[#4B2E4F] text-amber-300' : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Calor</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="Vista de Lista Detallada"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === 'list' ? 'bg-[#4B2E4F] text-amber-300' : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lista</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Map & Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Interactive Visual Map / Heatmap (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`rounded-3xl border overflow-hidden relative shadow-sm ${
            darkMode ? 'bg-[#251027] border-[#5B3E60]' : 'bg-stone-900 border-stone-300'
          }`}>
            
            {/* Interactive Vector Stage (Simulated Geographic Radar & Grid Map) */}
            <div className="relative w-full h-[450px] sm:h-[500px] overflow-hidden bg-gradient-to-b from-stone-950 via-[#1C1220] to-[#2D1630]">
              
              {/* Map Grid and Radar Background Lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#CFC3DE_1px,transparent_1px)] [background-size:24px_24px]"></div>
              
              {/* Regional Outline Simulation */}
              <div className="absolute inset-x-8 top-10 bottom-10 border border-purple-500/20 rounded-3xl pointer-events-none flex items-center justify-center">
                <div className="text-purple-400/20 text-4xl sm:text-6xl font-black uppercase tracking-widest select-none pointer-events-none">
                  ZONA {selectedCity.toUpperCase()}
                </div>
              </div>

              {/* Heatmap Overlay effect if active */}
              {viewMode === 'heatmap' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-rose-600/30 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-amber-500/25 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                </div>
              )}

              {/* Header Floating Map Tools */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="bg-stone-900/80 backdrop-blur-md text-amber-300 text-[11px] font-black px-3 py-1.5 rounded-full border border-stone-700 flex items-center gap-1.5 shadow-md">
                  <Navigation2 className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                  <span>GPS Activo: {selectedCity === 'all' ? 'Región Andina' : selectedCity}</span>
                </span>
              </div>

              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <div className="bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-700 text-[10px] text-stone-300 flex items-center gap-2">
                  <span className="flex items-center gap-1 font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Punto Seguro
                  </span>
                  <span className="flex items-center gap-1 font-bold text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span> Zona Riesgo
                  </span>
                </div>
              </div>

              {/* Interactive Point Pins scattered intelligently */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-wrap items-center justify-around">
                {filteredPoints.map((point, idx) => {
                  const isSafe = point.category === 'safe_point';
                  const isSelected = selectedPoint?.id === point.id;
                  
                  // Calculate dynamic visual placement coordinates
                  const topPercent = 20 + ((idx * 17) % 65);
                  const leftPercent = 15 + ((idx * 23) % 70);

                  return (
                    <button
                      key={point.id}
                      onClick={() => setSelectedPoint(point)}
                      style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 transform group z-10 cursor-pointer ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                      }`}
                    >
                      <div className="relative flex flex-col items-center">
                        {/* Ripple Effect */}
                        <div className={`absolute -inset-2 rounded-full opacity-75 animate-ping ${
                          isSafe ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}></div>

                        {/* Main Pin Badge */}
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center font-black text-xs shadow-xl border-2 transition-transform ${
                          isSafe 
                            ? 'bg-emerald-600 border-white text-white' 
                            : 'bg-rose-600 border-white text-white'
                        } ${isSelected ? 'ring-4 ring-amber-300 scale-110' : ''}`}>
                          {isSafe ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        </div>

                        {/* Title pill tooltip */}
                        <div className={`mt-1 px-2 py-0.5 rounded-md text-[9px] font-black whitespace-nowrap shadow-md transition-opacity pointer-events-none ${
                          isSelected 
                            ? 'bg-amber-300 text-stone-950 opacity-100' 
                            : 'bg-stone-900/90 text-white opacity-0 group-hover:opacity-100'
                        }`}>
                          {point.title.length > 20 ? point.title.slice(0, 20) + '...' : point.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Instructions / Heatmap Legend */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between bg-stone-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-800 text-xs">
                <span className="text-stone-300 text-[11px] font-medium flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                  <span>Haz clic en cualquier pin para ver detalles, rutas y teléfono de auxilio.</span>
                </span>
                <span className="text-amber-300 text-[11px] font-bold">
                  {filteredPoints.length} puntos encontrados
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Details Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedPoint ? (
            <div className={`p-6 rounded-3xl border space-y-5 shadow-sm transition-all duration-300 ${
              selectedPoint.category === 'safe_point'
                ? darkMode ? 'bg-[#351C37] border-emerald-600/50' : 'bg-emerald-50/40 border-emerald-200'
                : darkMode ? 'bg-[#351C37] border-rose-600/50' : 'bg-rose-50/40 border-rose-200'
            }`}>
              
              {/* Category Badge & Actions */}
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  selectedPoint.category === 'safe_point'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}>
                  {selectedPoint.category === 'safe_point' ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>PUNTO SEGURO VALIDADO</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>ALERTA COMUNITARIA</span>
                    </>
                  )}
                </span>

                <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
                  📍 {selectedPoint.city}, {selectedPoint.department}
                </span>
              </div>

              {/* Title & Address */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white leading-snug">
                  {selectedPoint.title}
                </h3>
                <p className="text-xs font-bold text-stone-600 dark:text-stone-300 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#4B2E4F] dark:text-amber-300 flex-shrink-0" />
                  <span>{selectedPoint.address}</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed bg-white/60 dark:bg-stone-900/50 p-3.5 rounded-2xl border border-stone-200/50 dark:border-stone-700/50">
                {selectedPoint.description}
              </p>

              {/* Services Offered or Key Tips */}
              {selectedPoint.servicesOffered && selectedPoint.servicesOffered.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase text-[#4B2E4F] dark:text-amber-300 block">
                    ✨ Servicios Gratuitos Disponibles:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPoint.servicesOffered.map((serv, sIdx) => (
                      <span key={sIdx} className="bg-[#4B2E4F]/10 dark:bg-[#5B3760] text-[#3B1F3D] dark:text-amber-200 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        ✓ {serv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedPoint.schedule && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-700/60">
                    <Clock className="w-4 h-4 text-[#4B2E4F] dark:text-amber-300 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-stone-800 dark:text-stone-200 text-[10px]">Horario:</div>
                      <div className="text-stone-600 dark:text-stone-400 text-[11px]">{selectedPoint.schedule}</div>
                    </div>
                  </div>
                )}

                {selectedPoint.phone && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-700/60">
                    <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-stone-800 dark:text-stone-200 text-[10px]">Contacto:</div>
                      <a href={`tel:${selectedPoint.phone}`} className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline text-[11px]">
                        {selectedPoint.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Upvote & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200/70 dark:border-stone-700/70 gap-2">
                <button
                  onClick={(e) => handleUpvote(selectedPoint.id, e)}
                  className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer ${
                    upvotedPoints[selectedPoint.id]
                      ? 'bg-amber-400 text-stone-950 font-black'
                      : 'bg-white dark:bg-stone-800 hover:bg-amber-100 text-stone-800 dark:text-white border border-stone-300 dark:border-stone-600'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{selectedPoint.upvotes} {upvotedPoints[selectedPoint.id] ? '¡Validado!' : 'Validar reporte'}</span>
                </button>

                {onOpenChat && (
                  <button
                    onClick={onOpenChat}
                    className="px-4 py-2 rounded-xl bg-[#4B2E4F] hover:bg-[#5B3760] text-amber-300 text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Preguntarle a Navi</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className={`p-8 rounded-3xl border text-center space-y-4 ${
              darkMode ? 'bg-[#351C37] border-[#5B3E60]' : 'bg-white border-stone-200 shadow-sm'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-[#4B2E4F]/10 dark:bg-[#4B2E4F] text-[#4B2E4F] dark:text-amber-300 flex items-center justify-center mx-auto">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="font-black text-lg text-stone-900 dark:text-white">
                Selecciona un punto en el mapa
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 max-w-xs mx-auto leading-relaxed">
                Toca cualquier ícono del radar o filtra por tu ciudad para consultar servicios amigables, kits de 72 horas y zonas de alerta ciudadana.
              </p>
              <button
                onClick={() => setSelectedPoint(filteredPoints[0])}
                className="px-4 py-2 rounded-xl bg-[#4B2E4F] text-amber-300 font-bold text-xs hover:bg-[#5B3760] transition cursor-pointer"
              >
                Ver primer punto seguro
              </button>
            </div>
          )}

          {/* List of Other Nearby Locations */}
          <div className={`p-4 rounded-2xl border space-y-3 max-h-[220px] overflow-y-auto ${
            darkMode ? 'bg-[#251027] border-[#5B3E60]' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className="text-[11px] font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
              Puntos Destacados en {selectedCity === 'all' ? 'la Región' : selectedCity}:
            </span>
            <div className="space-y-1.5">
              {filteredPoints.slice(0, 5).map(pt => (
                <div
                  key={pt.id}
                  onClick={() => setSelectedPoint(pt)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between gap-2 transition ${
                    selectedPoint?.id === pt.id
                      ? 'bg-[#4B2E4F] text-white border-[#4B2E4F]'
                      : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-[#4B2E4F]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {pt.category === 'safe_point' ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    )}
                    <span className="font-bold truncate">{pt.title}</span>
                  </div>
                  <span className="text-[10px] font-semibold opacity-75 flex-shrink-0">
                    {pt.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Modal to Create Anonymous Citizen Report */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className={`w-full max-w-xl rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-[#351C37] border-[#6D4C72] text-white' : 'bg-white border-stone-200 text-[#2D1A30]'
          }`}>
            
            <div className="flex items-center justify-between border-b pb-4 border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg">Reporte Ciudadano Anónimo</h3>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">Protegemos tu identidad al 100%</span>
                </div>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4">
              
              {/* Category */}
              <div>
                <label className="block text-xs font-black uppercase text-stone-700 dark:text-stone-300 mb-1.5">
                  Tipo de Reporte:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewReport({ ...newReport, category: 'risk_point', severity: 'alta' })}
                    className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                      newReport.category === 'risk_point'
                        ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                        : 'bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>Zona de Riesgo / Acoso</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewReport({ ...newReport, category: 'safe_point', severity: 'seguro' })}
                    className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                      newReport.category === 'safe_point'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                        : 'bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                    <span>Punto Seguro / Posta Amiga</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-black text-stone-700 dark:text-stone-300 mb-1">
                  Título Breve del Lugar o Situación:
                </label>
                <input
                  type="text"
                  required
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                  placeholder="Ej: Pasaje sin luz cerca al colegio San Martín"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#4B2E4F]"
                />
              </div>

              {/* City and Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-stone-700 dark:text-stone-300 mb-1">
                    Ciudad / Región:
                  </label>
                  <select
                    value={newReport.city}
                    onChange={(e) => setNewReport({ ...newReport, city: e.target.value, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-bold"
                  >
                    <option value="Lima">Lima</option>
                    <option value="Cusco">Cusco</option>
                    <option value="Arequipa">Arequipa</option>
                    <option value="Huamanga">Ayacucho (Huamanga)</option>
                    <option value="Huancayo">Junín (Huancayo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-stone-700 dark:text-stone-300 mb-1">
                    Dirección o Referencia:
                  </label>
                  <input
                    type="text"
                    required
                    value={newReport.address}
                    onChange={(e) => setNewReport({ ...newReport, address: e.target.value })}
                    placeholder="Ej: Cruce Av. Principal con Jr. Lima"
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black text-stone-700 dark:text-stone-300 mb-1">
                  Descripción Detallada de la Alerta:
                </label>
                <textarea
                  rows={3}
                  required
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  placeholder="Describe qué ocurre, horas de mayor riesgo, falta de policías o si es una posta que brinda buena atención..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-semibold resize-none"
                />
              </div>

              {/* Confidentiality Reminder */}
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2">
                <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Tu privacidad es absoluta:</strong> No almacenamos tu dirección IP, nombre real ni número de teléfono. Tu reporte ayuda a visibilizar necesidades de patrullaje e iluminación.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-stone-600 dark:text-stone-300 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4B2E4F] hover:bg-[#5B3760] text-amber-300 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publicar Reporte Anónimo (+30 XP)</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
