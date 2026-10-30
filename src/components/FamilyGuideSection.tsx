import React, { useState } from 'react';
import { 
  Users, 
  MessageCircleHeart, 
  Heart, 
  Compass, 
  Scale, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Lightbulb, 
  Sparkles, 
  Volume2,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { AGE_GUIDES } from '../data/mockData';
import { speechService } from '../utils/speech';

interface FamilyGuideSectionProps {
  darkMode: boolean;
  onAddXp?: (amount: number) => void;
}

export const FamilyGuideSection: React.FC<FamilyGuideSectionProps> = ({
  darkMode,
  onAddXp,
}) => {
  const [selectedAgeId, setSelectedAgeId] = useState<string>('age-13-15');
  const [readAges, setReadAges] = useState<string[]>([]);

  const selectedGuide = AGE_GUIDES.find(g => g.id === selectedAgeId) || AGE_GUIDES[0];

  const handleSelectAge = (id: string) => {
    setSelectedAgeId(id);
    if (!readAges.includes(id)) {
      const nextRead = [...readAges, id];
      setReadAges(nextRead);
      if (onAddXp) onAddXp(20);
    }
  };

  const handleReadGuide = (guideText: string) => {
    speechService.speak(guideText);
  };

  return (
    <div className="space-y-12">
      
      {/* Header Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border ${
        darkMode ? 'bg-[#3C223F] border-brand-slate text-white' : 'bg-white border-brand-soft shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-brand-soft/50 text-brand-plum px-3 py-1 rounded-full text-xs font-bold">
              <Users className="w-4 h-4" />
              <span>Rol Protector de Madres, Padres y Cuidadores</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-plum dark:text-white">
              Guía Familiar: Diálogo Abierto, Confianza y Proyecto de Vida
            </h2>
            <p className={`text-sm sm:text-base max-w-3xl leading-relaxed ${
              darkMode ? 'text-brand-cream/80' : 'text-[#5B4861]'
            }`}>
              El hogar es el primer espacio de protección. Hablar con claridad, afecto y respeto sobre la sexualidad previene riesgos y fortalece la autonomía de tus hijos.
            </p>
          </div>

          <button
            onClick={() => handleReadGuide('Guía para familias: Los 4 pilares fundamentales son la comunicación abierta, el vínculo afectivo, el proyecto de vida y el reconocimiento de derechos.')}
            className="p-3 rounded-xl bg-brand-lilac/30 hover:bg-brand-lilac/50 text-brand-plum dark:text-white transition border border-brand-lilac/60 flex items-center gap-2 flex-shrink-0"
            title="Escuchar resumen de la sección"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-bold">Escuchar Guía</span>
          </button>
        </div>
      </div>

      {/* 1. Mensajes Centrales para las Familias (4 Pilares) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-plum dark:text-brand-soft" />
          <h3 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white">
            1. Los 4 Mensajes Centrales para las Familias
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Pilar 1: Comunicación es clave */}
          <div className={`p-6 rounded-2xl border transition-all ${
            darkMode ? 'bg-[#351C37] border-brand-slate' : 'bg-white border-brand-soft shadow-sm'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-plum text-brand-soft flex items-center justify-center flex-shrink-0 shadow-sm">
                <MessageCircleHeart className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black text-brand-plum dark:text-white">
                  La comunicación es clave
                </h4>
                <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
                  Fomentar diálogos honestos, sin tabúes ni juicios en el hogar. 
                  <strong className="text-brand-plum dark:text-brand-soft block mt-1">
                    Recalcar que hablar de sexualidad NO incentiva el inicio de la vida sexual, sino que aclara dudas y promueve decisiones responsables.
                  </strong>
                </p>
                <div className="bg-brand-soft/20 text-brand-plum dark:text-brand-soft p-2.5 rounded-lg text-xs font-semibold mt-2 border border-brand-lilac/30">
                  💡 Tip: Responde a sus preguntas con naturalidad. Si no sabes una respuesta, busquen la información juntos en fuentes médicas oficiales.
                </div>
              </div>
            </div>
          </div>

          {/* Pilar 2: Vínculo afectivo y confianza */}
          <div className={`p-6 rounded-2xl border transition-all ${
            darkMode ? 'bg-[#351C37] border-brand-slate' : 'bg-white border-brand-soft shadow-sm'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-slate text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Heart className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black text-brand-plum dark:text-white">
                  Vínculo afectivo y confianza
                </h4>
                <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
                  Un entorno familiar basado en el respeto, el afecto incondicional y la escucha activa es el escudo protector más fuerte para que tus hijos se sientan seguros al acudir a ti ante cualquier duda o problema.
                </p>
                <div className="bg-brand-soft/20 text-brand-plum dark:text-brand-soft p-2.5 rounded-lg text-xs font-semibold mt-2 border border-brand-lilac/30">
                  💡 Tip: Evita el castigo o la humillación cuando confiesen un temor. La empatía fomenta la sinceridad.
                </div>
              </div>
            </div>
          </div>

          {/* Pilar 3: Proyecto de vida */}
          <div className={`p-6 rounded-2xl border transition-all ${
            darkMode ? 'bg-[#351C37] border-brand-slate' : 'bg-white border-brand-soft shadow-sm'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-lilac text-brand-plum flex items-center justify-center flex-shrink-0 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black text-brand-plum dark:text-white">
                  Proyecto de vida
                </h4>
                <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
                  Apoya y motiva a tus hijos en la construcción de sus metas personales, artísticas, deportivas y profesionales. 
                  <strong className="text-brand-plum dark:text-brand-soft block mt-1">
                    Un adolescente con un proyecto de vida claro tiene mayores herramientas y motivación interna para postergar el inicio sexual y prevenir riesgos.
                  </strong>
                </p>
                <div className="bg-brand-soft/20 text-brand-plum dark:text-brand-soft p-2.5 rounded-lg text-xs font-semibold mt-2 border border-brand-lilac/30">
                  💡 Tip: Conversa con regularidad sobre sus sueños y planes a 5 años. Hazles sentir capaces de alcanzar grandes metas.
                </div>
              </div>
            </div>
          </div>

          {/* Pilar 4: Derechos, no solo riesgos */}
          <div className={`p-6 rounded-2xl border transition-all ${
            darkMode ? 'bg-[#351C37] border-brand-slate' : 'bg-white border-brand-soft shadow-sm'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#674A6F] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Scale className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black text-brand-plum dark:text-white">
                  Derechos, no solo riesgos
                </h4>
                <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
                  Las y los adolescentes tienen derechos sexuales y reproductivos garantizados por ley, lo que incluye el acceso autónomo, gratuito y confidencial a orientación médica y métodos de anticoncepción en los establecimientos de salud.
                </p>
                <div className="bg-brand-soft/20 text-brand-plum dark:text-brand-soft p-2.5 rounded-lg text-xs font-semibold mt-2 border border-brand-lilac/30">
                  💡 Tip: Conocer sus derechos no les quita protección familiar; al contrario, les enseña a exigir respeto a su cuerpo y a denunciar abusos.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Módulo: "Cómo hablar con mis hijos/as" por Edades */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white">
              2. Módulo Interactivo: "Cómo hablar con mis hijos/as" según su edad
            </h3>
            <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/70">
              Selecciona una etapa de crecimiento para ver consejos prácticos, cambios físicos, temas emocionales y frases de inicio:
            </p>
          </div>

          {/* Age Selection Buttons */}
          <div className="flex flex-wrap gap-2">
            {AGE_GUIDES.map((guide) => {
              const isSelected = guide.id === selectedAgeId;
              const isRead = readAges.includes(guide.id);
              return (
                <button
                  key={guide.id}
                  id={`btn-age-${guide.id}`}
                  onClick={() => handleSelectAge(guide.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                      : 'bg-white dark:bg-[#351C37] text-[#4B2E4F] dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
                  }`}
                >
                  <span>{guide.ageRange.split('(')[0]}</span>
                  {isRead && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Age Content Card */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 pb-4 border-b border-brand-lilac/20">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-slate dark:text-brand-soft">
                {selectedGuide.ageRange}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white mt-0.5">
                {selectedGuide.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream/80 mt-1 max-w-3xl">
                {selectedGuide.summary}
              </p>
            </div>

            <button
              onClick={() => handleReadGuide(`${selectedGuide.title}. ${selectedGuide.summary}`)}
              className="p-2 rounded-lg bg-brand-soft/40 hover:bg-brand-soft text-brand-plum transition text-xs font-bold flex items-center gap-1 flex-shrink-0"
              title="Escuchar guía de esta edad"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar etapa</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            
            {/* Col 1: Cambios físicos */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-sm text-brand-plum dark:text-brand-soft flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-lilac" />
                Cambios Físicos & Biológicos
              </h5>
              <ul className="space-y-2 text-xs leading-relaxed text-[#5B4861] dark:text-brand-cream/90">
                {selectedGuide.physicalChanges.map((change, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-slate dark:text-brand-soft font-bold">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Emociones y Relaciones */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-sm text-brand-plum dark:text-brand-soft flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-slate" />
                Desarrollo Emocional & Social
              </h5>
              <ul className="space-y-2 text-xs leading-relaxed text-[#5B4861] dark:text-brand-cream/90">
                {selectedGuide.emotionalAspects.map((aspect, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-slate dark:text-brand-soft font-bold">•</span>
                    <span>{aspect}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Prevención y Límites */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-sm text-brand-plum dark:text-brand-soft flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-plum" />
                Prevención de Riesgos & Cuidados
              </h5>
              <ul className="space-y-2 text-xs leading-relaxed text-[#5B4861] dark:text-brand-cream/90">
                {selectedGuide.risksPrevention.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-plum dark:text-brand-soft font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Conversation Starters Box */}
          <div className="mt-6 p-4 rounded-2xl bg-brand-cream dark:bg-[#2C152E] border border-brand-lilac/40 space-y-2">
            <h5 className="text-xs font-black text-brand-plum dark:text-brand-soft uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Frases para Iniciar la Conversación en Casa:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {selectedGuide.conversationStarters.map((starter, i) => (
                <div key={i} className="bg-white dark:bg-[#3C223F] p-3 rounded-xl border border-brand-soft dark:border-brand-slate text-xs italic font-medium text-brand-plum dark:text-brand-cream">
                  “{starter}”
                </div>
              ))}
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
              <h5 className="font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-2 uppercase">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Lo que SÍ ayuda:
              </h5>
              <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                {selectedGuide.dosAndDonts.do.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40">
              <h5 className="font-bold text-xs text-red-800 dark:text-red-300 flex items-center gap-1.5 mb-2 uppercase">
                <XCircle className="w-4 h-4 text-red-600" />
                Lo que debemos EVITAR:
              </h5>
              <ul className="space-y-1.5 text-xs text-red-950 dark:text-red-200">
                {selectedGuide.dosAndDonts.dont.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Módulo: "Paternidad y Maternidad Responsable" */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-slate text-white flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-brand-plum dark:text-white">
              3. Paternidad y Maternidad Responsable: Corresponsabilidad de los Varones
            </h3>
            <p className="text-xs text-[#5B4861] dark:text-brand-cream/70">
              Rompiendo el mito de que el embarazo y los cuidados son solo un "asunto de mujeres"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-brand-soft/20 dark:bg-[#3C223F] border border-brand-lilac/30 space-y-2">
            <h4 className="font-bold text-sm text-brand-plum dark:text-brand-soft">
              Prevención Compartida
            </h4>
            <p className="text-xs text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
              Los varones adolescentes deben ser educados en el uso correcto y consistente del preservativo, la comprensión del consentimiento mutuo y el rechazo a cualquier forma de presión o machismo.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-soft/20 dark:bg-[#3C223F] border border-brand-lilac/30 space-y-2">
            <h4 className="font-bold text-sm text-brand-plum dark:text-brand-soft">
              Crianza y Cuidado Activo
            </h4>
            <p className="text-xs text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
              La crianza de un hijo no es una 'ayuda', sino un deber y derecho afectivo, económico y legal ineludible. La pensión de alimentos y el cuidado cotidiano corresponden por igual a ambos progenitores.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-brand-soft/20 dark:bg-[#3C223F] border border-brand-lilac/30 space-y-2">
            <h4 className="font-bold text-sm text-brand-plum dark:text-brand-soft">
              Continuidad Educativa
            </h4>
            <p className="text-xs text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
              Las familias y escuelas deben apoyar a las adolescentes gestantes y madres para que continúen y culminen sus estudios escolares y superiores, evitando el abandono educativo.
            </p>
          </div>
        </div>

        {/* International & Regional Program References */}
        <div className="mt-6 pt-4 border-t border-brand-lilac/20 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5B4861] dark:text-brand-cream/80">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-plum dark:text-brand-soft flex-shrink-0" />
            <span>
              Metodologías basadas en programas validados: <strong>"Educando en Familia" (Ecuador)</strong> y <strong>"Escuelas de Valores" (Nicaragua)</strong>, adaptadas para la realidad peruana y regional (MINEDU / MINSA).
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
