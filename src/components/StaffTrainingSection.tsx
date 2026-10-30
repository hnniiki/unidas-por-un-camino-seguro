import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Volume2, 
  Sparkles, 
  FileText, 
  Scale, 
  HeartHandshake,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STAFF_TRAINING_MODULES } from '../data/mockData';
import { speechService } from '../utils/speech';

interface StaffTrainingSectionProps {
  darkMode: boolean;
  onAddXp?: (amount: number) => void;
}

export const StaffTrainingSection: React.FC<StaffTrainingSectionProps> = ({
  darkMode,
  onAddXp,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(STAFF_TRAINING_MODULES[0].id);
  const [testAnswers, setTestAnswers] = useState<{ [questionIdx: number]: number }>({});
  const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);
  const [testScore, setTestScore] = useState<number>(0);

  const selectedModule = STAFF_TRAINING_MODULES.find(m => m.id === selectedModuleId) || STAFF_TRAINING_MODULES[0];

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (isTestSubmitted) return;
    setTestAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    selectedModule.quiz.forEach((q, idx) => {
      if (testAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    setTestScore(score);
    setIsTestSubmitted(true);
    if (score === selectedModule.quiz.length) {
      if (onAddXp) onAddXp(80);
      confetti({ particleCount: 100, spread: 70 });
    }
  };

  const handleResetQuiz = () => {
    setTestAnswers({});
    setIsTestSubmitted(false);
    setTestScore(0);
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
              <GraduationCap className="w-4 h-4" />
              <span>Formación Continua Multidisciplinaria</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-plum dark:text-white">
              Capacitación para Personal de Salud, Docentes y Operadores Sociales
            </h2>
            <p className={`text-sm sm:text-base max-w-3xl leading-relaxed ${
              darkMode ? 'text-brand-cream/80' : 'text-[#5B4861]'
            }`}>
              Guías normativas, directrices clínicas y protocolos legales para brindar atención empática, confidencial y sin prejuicios a adolescentes.
            </p>
          </div>

          <button
            onClick={() => speechService.speak('Módulos de capacitación: Enfoque de derechos, atención libre de estigma y aplicación de la norma técnica del MINSA.')}
            className="p-3 rounded-xl bg-brand-lilac/30 hover:bg-brand-lilac/50 text-brand-plum dark:text-white transition border border-brand-lilac/60 flex items-center gap-2 flex-shrink-0"
            title="Escuchar resumen"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-bold">Escuchar Introducción</span>
          </button>
        </div>

        {/* Module Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-brand-lilac/20">
          {STAFF_TRAINING_MODULES.map((mod) => {
            const isSelected = mod.id === selectedModuleId;
            return (
              <button
                key={mod.id}
                id={`tab-training-mod-${mod.id}`}
                onClick={() => {
                  setSelectedModuleId(mod.id);
                  handleResetQuiz();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                    : 'bg-white dark:bg-[#351C37] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{mod.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Module Details */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-8 ${
        darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
      }`}>
        <div className="pb-4 border-b border-brand-lilac/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-slate dark:text-brand-soft">
              Público Destinatario: {selectedModule.targetRoles.join(', ')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-brand-plum dark:text-white mt-0.5">
              {selectedModule.title}
            </h3>
          </div>

          <span className="bg-brand-soft/30 text-brand-plum dark:text-brand-soft text-xs font-bold px-3 py-1 rounded-full border border-brand-lilac/30">
            Norma Técnica MINSA / Ley 30364
          </span>
        </div>

        {/* 4 Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedModule.guidelines.map((guide, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-brand-cream/60 dark:bg-[#2C152E] border border-brand-lilac/30 space-y-2"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-plum text-brand-soft font-black text-xs flex items-center justify-center">
                {idx + 1}
              </div>
              <h4 className="font-bold text-sm text-brand-plum dark:text-white">
                {guide.title}
              </h4>
              <p className="text-xs text-[#5B4861] dark:text-brand-cream/80 leading-relaxed">
                {guide.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Evaluation Quiz */}
        <div className="p-6 rounded-2xl bg-brand-soft/20 dark:bg-[#251227] border border-brand-lilac/40 space-y-6">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-brand-lilac/30">
            <h4 className="text-base font-black text-brand-plum dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Cuestionario de Evaluación y Certificación de Competencias
            </h4>
            <span className="text-xs font-bold text-brand-slate dark:text-brand-soft">
              {selectedModule.quiz.length} preguntas
            </span>
          </div>

          <div className="space-y-6">
            {selectedModule.quiz.map((q, qIdx) => {
              const selectedOpt = testAnswers[qIdx];

              return (
                <div key={qIdx} className="space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-brand-plum dark:text-white">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = 'bg-white dark:bg-[#351C37] text-[#2D1A30] dark:text-white border-brand-lilac/40 hover:bg-brand-soft/30';

                      if (isTestSubmitted) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-600';
                        } else if (isSelected && optIdx !== q.correctAnswer) {
                          btnStyle = 'bg-red-600 text-white font-bold border-red-600';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-brand-plum text-white font-bold border-brand-plum shadow-sm';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`p-3 rounded-xl text-xs text-left transition border ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isTestSubmitted && (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 text-xs text-emerald-900 dark:text-emerald-200">
                      <strong>Explicación:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-brand-lilac/30 flex items-center justify-between">
            {!isTestSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(testAnswers).length < selectedModule.quiz.length}
                className="bg-brand-plum hover:bg-brand-slate disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md"
              >
                Enviar Respuestas para Calificación
              </button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="text-xs font-black text-brand-plum dark:text-white">
                  Resultado: <strong>{testScore} de {selectedModule.quiz.length}</strong> respuestas correctas
                  {testScore === selectedModule.quiz.length && ' — ¡Excelente! Dominio normativo certificado.'}
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="bg-brand-lilac hover:bg-brand-slate text-brand-plum hover:text-white font-bold px-4 py-2 rounded-xl text-xs transition"
                >
                  Reintentar Test
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
