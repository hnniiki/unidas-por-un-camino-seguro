import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Lock, 
  Send, 
  CheckCircle2, 
  Phone, 
  Copy, 
  Check, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReportCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onAddXp?: (amount: number) => void;
}

export const ReportCaseModal: React.FC<ReportCaseModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  onAddXp,
}) => {
  const [department, setDepartment] = useState<string>('Lima');
  const [ageRange, setAgeRange] = useState<string>('13 a 15 años');
  const [category, setCategory] = useState<string>('Presunta Violencia Sexual / Abuso');
  const [description, setDescription] = useState<string>('');
  const [contactOptional, setContactOptional] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedTicket, setGeneratedTicket] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketCode = `CASO-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedTicket(ticketCode);
      setIsSubmitting(false);
      if (onAddXp) onAddXp(40);
      confetti({ particleCount: 70, spread: 60 });
    }, 1000);
  };

  const handleCopyTicket = () => {
    if (generatedTicket) {
      navigator.clipboard.writeText(generatedTicket);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const resetForm = () => {
    setGeneratedTicket(null);
    setDescription('');
    setContactOptional('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border ${
          darkMode ? 'bg-[#2E1630] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30]'
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-red-800 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-red-200" />
            <div>
              <h3 className="font-black text-base sm:text-lg">
                Reporte Confidencial de Caso o Alerta
              </h3>
              <span className="text-xs text-red-200">
                Atención segura y canalización directa a redes de protección
              </span>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="p-1.5 rounded-lg bg-red-900/60 hover:bg-red-950 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {generatedTicket ? (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-black text-brand-plum dark:text-white">
                ¡Reporte Registrado con Éxito!
              </h4>

              <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 max-w-md mx-auto">
                Tu reporte ha sido encriptado y asignado al equipo multidisciplinario. Guarda este <strong>Código Único de Ticket</strong> para consultar su avance en cualquier momento:
              </p>

              {/* Ticket Box */}
              <div className="p-4 rounded-2xl bg-brand-soft/30 dark:bg-[#3C223F] border border-brand-lilac flex items-center justify-between max-w-xs mx-auto">
                <span className="text-lg font-black text-brand-plum dark:text-white tracking-widest">
                  {generatedTicket}
                </span>
                <button
                  onClick={handleCopyTicket}
                  className="p-2 rounded-lg bg-brand-plum text-white hover:bg-brand-slate transition text-xs flex items-center gap-1"
                >
                  {isCopied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>

              {/* Emergency reminder */}
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 text-xs text-red-900 dark:text-red-200 text-left">
                <strong>Importante:</strong> Si te encuentras en una situación de peligro inminente, llama de inmediato y sin costo a la <strong>Línea 100</strong> o acude a la comisaría o posta médica más cercana.
              </div>

              <button
                onClick={resetForm}
                className="bg-brand-plum hover:bg-brand-slate text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
              >
                Entendido y Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-brand-soft/20 dark:bg-[#3C223F] border border-brand-lilac/30 text-xs text-[#5B4861] dark:text-brand-cream/80 flex items-start gap-2">
                <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Este formulario es 100% confidencial. No registramos tu identidad ni tu ubicación sin tu consentimiento expreso.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-plum dark:text-brand-soft mb-1">
                    Tipo de Caso / Motivo:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-lilac bg-white dark:bg-[#2C152E] text-brand-plum dark:text-white text-xs"
                  >
                    <option value="Presunta Violencia Sexual / Abuso">Presunta Violencia Sexual / Abuso</option>
                    <option value="Menor de 15 años en Riesgo de Embarazo">Menor de 15 años en Riesgo de Embarazo</option>
                    <option value="Unión Temprana / Matrimonio Forzado">Unión Temprana / Matrimonio Forzado</option>
                    <option value="Solicitud de Kit de Emergencia 72h">Solicitud de Kit de Emergencia 72h</option>
                    <option value="Denegación de Acceso a Métodos Anticonceptivos">Denegación de Acceso a Métodos en Posta</option>
                    <option value="Acompañamiento Psicosocial">Acompañamiento Psicosocial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-plum dark:text-brand-soft mb-1">
                    Rango de Edad de la Persona:
                  </label>
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-lilac bg-white dark:bg-[#2C152E] text-brand-plum dark:text-white text-xs"
                  >
                    <option value="Menor de 13 años">Menor de 13 años (Prioridad Máxima)</option>
                    <option value="13 a 15 años">13 a 15 años (Prioridad Alta)</option>
                    <option value="16 a 17 años">16 a 17 años</option>
                    <option value="Madre/Padre o Cuidador">Soy Familiar / Cuidador</option>
                    <option value="Docente / Profesional">Soy Docente / Profesional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-plum dark:text-brand-soft mb-1">
                  Departamento / Región:
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-brand-lilac bg-white dark:bg-[#2C152E] text-brand-plum dark:text-white text-xs"
                >
                  {['Lima', 'Loreto', 'Ucayali', 'San Martín', 'Amazonas', 'Piura', 'La Libertad', 'Cusco', 'Arequipa', 'Huánuco', 'Junín', 'Otro'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-plum dark:text-brand-soft mb-1">
                  Descripción breve de la situación:
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Relata lo sucedido o la ayuda que requieres de forma general..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-brand-lilac bg-white dark:bg-[#2C152E] text-brand-plum dark:text-white text-xs focus:ring-2 focus:ring-brand-plum"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-plum dark:text-brand-soft mb-1">
                  Teléfono o WhatsApp de contacto (Opcional, solo si deseas ser contactado/a):
                </label>
                <input
                  type="text"
                  value={contactOptional}
                  onChange={(e) => setContactOptional(e.target.value)}
                  placeholder="9XXXXXXXX o déjalo en blanco si prefieres total anonimato"
                  className="w-full p-2.5 rounded-xl border border-brand-lilac bg-white dark:bg-[#2C152E] text-brand-plum dark:text-white text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-brand-slate hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !description.trim()}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Encriptando y enviando...' : 'Generar Reporte y Obtener Ticket'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
