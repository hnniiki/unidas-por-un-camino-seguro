import React, { useState } from 'react';
import { 
  FileSearch, 
  ShieldAlert, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MapPin, 
  PlusCircle, 
  Search, 
  Lock,
  FileText,
  Activity,
  Send
} from 'lucide-react';
import { INITIAL_REPORTED_CASES } from '../data/mockData';
import { ReportedCase } from '../types';

interface CaseTrackingAndAlertsProps {
  darkMode: boolean;
  onOpenReportModal: () => void;
}

export const CaseTrackingAndAlerts: React.FC<CaseTrackingAndAlertsProps> = ({
  darkMode,
  onOpenReportModal,
}) => {
  const [cases, setCases] = useState<ReportedCase[]>(INITIAL_REPORTED_CASES);
  const [searchTicket, setSearchTicket] = useState<string>('');
  const [searchedCase, setSearchedCase] = useState<ReportedCase | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'tracking' | 'authority_alerts' | 'analytics'>('tracking');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = cases.find(c => c.ticketCode.toUpperCase() === searchTicket.trim().toUpperCase());
    setSearchedCase(found || null);
  };

  // Status Badge Helper
  const getStatusBadge = (status: ReportedCase['status']) => {
    switch (status) {
      case 'recibido':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Recibido</span>;
      case 'evaluacion':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">En Evaluación</span>;
      case 'derivado_cem':
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Derivado al CEM</span>;
      case 'derivado_salud':
        return <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Derivado a Salud (MINSA)</span>;
      case 'acompanamiento':
        return <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Acompañamiento Activo</span>;
      case 'resuelto':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Resuelto con Éxito</span>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border ${
        darkMode ? 'bg-[#3C223F] border-brand-slate text-white' : 'bg-white border-brand-soft shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-brand-soft/50 text-brand-plum px-3 py-1 rounded-full text-xs font-bold">
              <Activity className="w-4 h-4" />
              <span>Monitoreo Seguro & Respuesta Multidisciplinaria</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-plum dark:text-white">
              Sistema de Seguimiento de Casos, Alertas y Panel Estadístico
            </h2>
            <p className={`text-sm sm:text-base max-w-3xl leading-relaxed ${
              darkMode ? 'text-brand-cream/80' : 'text-[#5B4861]'
            }`}>
              Consulta el estado en tiempo real de tu reporte con tu Código Único de Ticket confidencial o accede al panel de análisis de efectividad en la atención de casos.
            </p>
          </div>

          <button
            onClick={onOpenReportModal}
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg transition flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Reportar Nuevo Caso</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-brand-lilac/20">
          <button
            id="tab-view-tracking"
            onClick={() => setViewMode('tracking')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              viewMode === 'tracking'
                ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            <span>Consultar Ticket Confidencial</span>
          </button>

          <button
            id="tab-view-alerts"
            onClick={() => setViewMode('authority_alerts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              viewMode === 'authority_alerts'
                ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span>Panel de Alertas en Tiempo Real</span>
          </button>

          <button
            id="tab-view-analytics"
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              viewMode === 'analytics'
                ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Análisis Estadístico y Tendencias</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CONSULTAR TICKET */}
      {viewMode === 'tracking' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
        }`}>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-black text-brand-plum dark:text-white">
              Ingresa tu Código de Ticket Confidencial
            </h3>
            <p className="text-xs text-[#5B4861] dark:text-brand-cream/80">
              Ejemplo: <strong>CASO-84920</strong> o <strong>CASO-71204</strong>. No necesitas ingresar ningún nombre ni dato privado.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={searchTicket}
                onChange={(e) => setSearchTicket(e.target.value)}
                placeholder="CASO-84920..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-brand-lilac bg-white dark:bg-[#2C152E] text-brand-plum dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-plum uppercase"
              />
              <button
                type="submit"
                className="bg-brand-plum hover:bg-brand-slate text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </button>
            </form>
          </div>

          {/* Search Result */}
          {hasSearched && (
            <div className="mt-8 pt-6 border-t border-brand-lilac/20 max-w-3xl mx-auto">
              {searchedCase ? (
                <div className="p-6 rounded-2xl bg-brand-cream/70 dark:bg-[#2C152E] border border-brand-lilac/40 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-brand-lilac/30">
                    <div>
                      <span className="text-[11px] font-black uppercase text-brand-slate dark:text-brand-soft">
                        Ticket: {searchedCase.ticketCode}
                      </span>
                      <h4 className="text-base font-black text-brand-plum dark:text-white mt-0.5">
                        {searchedCase.descriptionSummary}
                      </h4>
                    </div>
                    <div>
                      {getStatusBadge(searchedCase.status)}
                    </div>
                  </div>

                  {/* Case Timeline */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-black uppercase tracking-wider text-brand-plum dark:text-brand-soft flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Bitácora de Seguimiento en Tiempo Real:
                    </h5>
                    <div className="space-y-3 pl-2 border-l-2 border-brand-lilac">
                      {searchedCase.timeline.map((step, idx) => (
                        <div key={idx} className="relative pl-4">
                          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-brand-plum border-2 border-white" />
                          <div className="flex items-center gap-2 text-[11px] font-bold text-brand-slate dark:text-brand-soft">
                            <span>{step.timestamp}</span>
                            <span>•</span>
                            <span className="text-brand-plum dark:text-white">{step.stage}</span>
                          </div>
                          <p className="text-xs text-[#5B4861] dark:text-brand-cream/80 mt-0.5">
                            {step.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-brand-slate dark:text-brand-soft space-y-2">
                  <Lock className="w-8 h-8 mx-auto opacity-50" />
                  <p className="text-sm font-bold">No se encontró ningún caso con ese código.</p>
                  <p className="text-xs">Verifica el código o prueba con: <strong>CASO-84920</strong>.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: ALERTAS EN TIEMPO REAL (AUTORIDADES Y TRABAJO SOCIAL) */}
      {viewMode === 'authority_alerts' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
        }`}>
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-brand-lilac/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <h3 className="text-xl font-black text-brand-plum dark:text-white">
                  Panel de Alertas Tempranas para Autoridades y Apoyo Social
                </h3>
              </div>
              <p className="text-xs text-[#5B4861] dark:text-brand-cream/70 mt-0.5">
                Vista autorizada para articulación con CEM, Línea 100, Fiscalías de Familia y MINSA.
              </p>
            </div>
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full">
              {cases.filter(c => c.priority === 'critica').length} Casos Críticos Activos
            </span>
          </div>

          <div className="space-y-3 mt-6">
            {cases.map((c) => (
              <div
                key={c.id}
                className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition ${
                  c.priority === 'critica'
                    ? 'bg-red-50/70 dark:bg-red-950/20 border-red-300 dark:border-red-800/40'
                    : 'bg-brand-cream/50 dark:bg-[#2C152E] border-brand-lilac/30'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-brand-plum dark:text-white">
                      {c.ticketCode}
                    </span>
                    <span className="text-[10px] text-brand-slate dark:text-brand-soft">
                      • {c.date} • {c.department} • ({c.ageRange})
                    </span>
                    {c.priority === 'critica' && (
                      <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                        Alerta Crítica
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#4B2E4F] dark:text-brand-cream font-medium">
                    {c.descriptionSummary}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {getStatusBadge(c.status)}
                  <button
                    onClick={() => {
                      setSearchTicket(c.ticketCode);
                      setSearchedCase(c);
                      setHasSearched(true);
                      setViewMode('tracking');
                    }}
                    className="bg-brand-plum hover:bg-brand-slate text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                  >
                    Ver Bitácora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: ANÁLISIS ESTADÍSTICO */}
      {viewMode === 'analytics' && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
        }`}>
          <div className="pb-4 border-b border-brand-lilac/20">
            <h3 className="text-xl font-black text-brand-plum dark:text-white">
              Panel de Análisis Estadístico y Tendencias en la Atención
            </h3>
            <p className="text-xs text-[#5B4861] dark:text-brand-cream/70">
              Datos consolidados de atención, tiempos de respuesta y efectividad en la aplicación de protocolos.
            </p>
          </div>

          {/* Metric KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-brand-soft/20 border border-brand-lilac/30 space-y-1">
              <span className="text-[10px] font-bold uppercase text-brand-slate dark:text-brand-soft">
                Tasa de Efectividad en Derivación
              </span>
              <div className="text-2xl font-black text-brand-plum dark:text-white flex items-center gap-1">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                94.8%
              </div>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                +4.2% respecto al trimestre anterior
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-soft/20 border border-brand-lilac/30 space-y-1">
              <span className="text-[10px] font-bold uppercase text-brand-slate dark:text-brand-soft">
                Tiempo Promedio Respuesta Kit 72h
              </span>
              <div className="text-2xl font-black text-brand-plum dark:text-white flex items-center gap-1">
                <Clock className="w-5 h-5 text-amber-500" />
                2.4 horas
              </div>
              <p className="text-[10px] text-brand-slate dark:text-brand-soft">
                Dentro de la ventana médica crítica
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-soft/20 border border-brand-lilac/30 space-y-1">
              <span className="text-[10px] font-bold uppercase text-brand-slate dark:text-brand-soft">
                Orientaciones en Salud Diferenciada
              </span>
              <div className="text-2xl font-black text-brand-plum dark:text-white flex items-center gap-1">
                <Users className="w-5 h-5 text-brand-lilac" />
                12,450
              </div>
              <p className="text-[10px] text-brand-slate dark:text-brand-soft">
                Adolescentes informados este año
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-soft/20 border border-brand-lilac/30 space-y-1">
              <span className="text-[10px] font-bold uppercase text-brand-slate dark:text-brand-soft">
                Acceso a Métodos LARC Post-Evento
              </span>
              <div className="text-2xl font-black text-brand-plum dark:text-white flex items-center gap-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                88.2%
              </div>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                Prevención de 2do y 3er embarazo
              </p>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Distribution by age */}
            <div className="p-5 rounded-2xl bg-brand-cream/60 dark:bg-[#2C152E] border border-brand-lilac/40 space-y-3">
              <h4 className="text-xs font-black uppercase text-brand-plum dark:text-brand-soft">
                Distribución por Rango de Edad en Consultas y Casos
              </h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>10 a 12 años (Pubertad / Alertas tempranas)</span>
                    <span>14%</span>
                  </div>
                  <div className="w-full bg-brand-lilac/30 rounded-full h-2">
                    <div className="bg-brand-plum h-2 rounded-full" style={{ width: '14%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>13 a 15 años (Mayor foco de vulnerabilidad)</span>
                    <span>48%</span>
                  </div>
                  <div className="w-full bg-brand-lilac/30 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '48%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>16 a 17 años (Anticoncepción y proyecto de vida)</span>
                    <span>38%</span>
                  </div>
                  <div className="w-full bg-brand-lilac/30 rounded-full h-2">
                    <div className="bg-brand-slate h-2 rounded-full" style={{ width: '38%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Topics Breakdown */}
            <div className="p-5 rounded-2xl bg-brand-cream/60 dark:bg-[#2C152E] border border-brand-lilac/40 space-y-3">
              <h4 className="text-xs font-black uppercase text-brand-plum dark:text-brand-soft">
                Temas Más Solicitados en Servicios Amigables
              </h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Doble Protección (Condón + Implante LARC)</span>
                    <span>52%</span>
                  </div>
                  <div className="w-full bg-brand-lilac/30 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '52%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Consejería en Consentimiento y Relaciones Sanas</span>
                    <span>26%</span>
                  </div>
                  <div className="w-full bg-brand-lilac/30 rounded-full h-2">
                    <div className="bg-brand-lilac h-2 rounded-full" style={{ width: '26%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Rutas de Denuncia y Protección frente a Abuso</span>
                    <span>22%</span>
                  </div>
                  <div className="w-full bg-brand-lilac/30 rounded-full h-2">
                    <div className="bg-purple-700 h-2 rounded-full" style={{ width: '22%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
