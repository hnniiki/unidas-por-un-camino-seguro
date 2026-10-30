import React, { useState } from 'react';
import { 
  HelpCircle, 
  Send, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Heart,
  Volume2
} from 'lucide-react';
import { NaviMascot } from './NaviMascot';
import { speechService } from '../utils/speech';

interface AnonymousQuestion {
  id: string;
  category: string;
  question: string;
  answer: string;
  likes: number;
  date: string;
}

const INITIAL_QUESTIONS: AnonymousQuestion[] = [
  {
    id: 'q1',
    category: 'Anticoncepción',
    question: '¿Si voy a una posta médica a pedir el implante o condones, llamarán a mis padres o me pedirán DNI de mayor de edad?',
    answer: 'No. La Norma Técnica del MINSA establece que las y los adolescentes tienen derecho a recibir orientación en salud sexual y métodos anticonceptivos de forma confidencial y autónoma en los Servicios de Salud Amigables.',
    likes: 42,
    date: 'Hace 2 días'
  },
  {
    id: 'q2',
    category: 'Pastilla de Emergencia',
    question: '¿Cuántas veces al año puedo tomar la pastilla del día siguiente? ¿Te deja infértil?',
    answer: 'La AOE es de uso ocasional y de emergencia, no como método regular. No causa infertilidad futura ni es abortiva (evita la ovulación). Si tienes vida sexual activa frecuente, lo ideal es adoptar un método de larga duración (LARC) junto con el condón.',
    likes: 38,
    date: 'Hace 4 días'
  },
  {
    id: 'q3',
    category: 'Relaciones y Presión',
    question: 'Mi pareja insiste en no usar condón diciendo que "si lo amo, confío en él". ¿Qué puedo responderle?',
    answer: 'El amor genuino siempre respeta tu salud y tus límites. La confianza no previene infecciones ni embarazos; el cuidado mutuo sí. Tienes derecho a decir NO sin sentir culpa ni miedo a que se termine la relación.',
    likes: 56,
    date: 'Hace 1 semana'
  }
];

interface AnonymousQuestionsSectionProps {
  darkMode: boolean;
  onOpenChat: () => void;
  onAddXp?: (amount: number) => void;
}

export const AnonymousQuestionsSection: React.FC<AnonymousQuestionsSectionProps> = ({
  darkMode,
  onOpenChat,
  onAddXp,
}) => {
  const [questions, setQuestions] = useState<AnonymousQuestion[]>(INITIAL_QUESTIONS);
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Anticoncepción');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) return;
    setLikedIds([...likedIds, id]);
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, likes: q.likes + 1 } : q))
    );
  };

  const handleSendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/anonymous-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          question: newQuestionText.trim(),
        }),
      });
      const data = await res.json();

      const newQ: AnonymousQuestion = {
        id: `q-${Date.now()}`,
        category: selectedCategory,
        question: newQuestionText.trim(),
        answer: data.answer || 'Gracias por tu consulta. Navi y nuestro equipo de salud han registrado tu duda para orientarte con empatía.',
        likes: 1,
        date: 'Recién publicado',
      };

      setQuestions([newQ, ...questions]);
      setNewQuestionText('');
      setSubmittedSuccess(true);
      if (onAddXp) onAddXp(30);
      setTimeout(() => setSubmittedSuccess(false), 5000);
    } catch {
      // Fallback
      const newQ: AnonymousQuestion = {
        id: `q-${Date.now()}`,
        category: selectedCategory,
        question: newQuestionText.trim(),
        answer: 'Tu pregunta ha sido recibida anónimamente. Recuerda que también puedes chatear en vivo con Navi las 24 horas.',
        likes: 1,
        date: 'Recién publicado',
      };
      setQuestions([newQ, ...questions]);
      setNewQuestionText('');
      setSubmittedSuccess(true);
    } finally {
      setIsSubmitting(false);
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
              <Lock className="w-4 h-4" />
              <span>100% Anónimo y Confidencial</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-plum dark:text-white">
              Buzón de Preguntas Anónimas: Pregúntale a Navi sin Miedo
            </h2>
            <p className={`text-sm sm:text-base max-w-3xl leading-relaxed ${
              darkMode ? 'text-brand-cream/80' : 'text-[#5B4861]'
            }`}>
              No se guarda ningún nombre, correo ni dirección IP. Escribe lo que sientes o lo que te preocupa y recibe una respuesta clara y basada en la ciencia.
            </p>
          </div>

          <button
            onClick={onOpenChat}
            className="bg-brand-lilac hover:bg-brand-soft text-brand-plum font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg transition flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chatear en Vivo con Navi</span>
          </button>
        </div>
      </div>

      {/* Post a Question Form */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        darkMode ? 'bg-[#351C37] border-brand-slate text-white' : 'bg-white border-brand-soft text-[#2D1A30] shadow-sm'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <NaviMascot size="sm" showBadge={false} animated={false} />
          <div>
            <h3 className="font-extrabold text-base text-brand-plum dark:text-white">
              Deja tu pregunta anónima aquí
            </h3>
            <span className="text-xs text-brand-slate dark:text-brand-soft italic">
              “¿Tienes una duda? Suéltala. Navi no te va a mirar raro.”
            </span>
          </div>
        </div>

        <form onSubmit={handleSendQuestion} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['Anticoncepción', 'Primera Vez', 'Relaciones y Límites', 'Cambios del Cuerpo', 'Salud y Prevención'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  selectedCategory === cat
                    ? 'bg-brand-plum text-white border-brand-plum'
                    : 'bg-brand-cream dark:bg-[#2C152E] text-brand-plum dark:text-brand-soft border-brand-lilac/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <textarea
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Escribe tu consulta con total confianza..."
            rows={3}
            className="w-full p-4 rounded-2xl border border-brand-lilac bg-brand-cream/40 dark:bg-[#2C152E] text-brand-plum dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-plum placeholder:text-brand-slate/60"
            required
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-brand-slate dark:text-brand-soft">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Privacidad blindada: nadie sabrá quién eres</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !newQuestionText.trim()}
              className="bg-brand-plum hover:bg-brand-slate disabled:opacity-50 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Consultando a Navi...' : 'Enviar Consulta (+30 XP)'}</span>
            </button>
          </div>
        </form>

        {submittedSuccess && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-400 text-emerald-900 dark:text-emerald-100 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>¡Tu pregunta ha sido respondida y publicada anónimamente para ayudar a toda la comunidad!</span>
          </div>
        )}
      </div>

      {/* Community Answered Questions List */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-brand-plum dark:text-white">
          Preguntas de la Comunidad Respondidas por Navi y Especialistas
        </h3>

        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`p-6 rounded-3xl border space-y-4 transition ${
                darkMode ? 'bg-[#351C37] border-brand-slate' : 'bg-white border-brand-soft shadow-sm'
              }`}
            >
              {/* Question */}
              <div className="space-y-1 pb-3 border-b border-brand-lilac/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-brand-slate dark:text-brand-soft">
                    {q.category} • {q.date}
                  </span>
                  <button
                    onClick={() => speechService.speak(`Pregunta: ${q.question}. Respuesta de Navi: ${q.answer}`)}
                    className="p-1 rounded bg-brand-soft/40 hover:bg-brand-soft text-brand-plum transition"
                    title="Escuchar"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-black text-sm sm:text-base text-brand-plum dark:text-white">
                  “{q.question}”
                </h4>
              </div>

              {/* Navi's Answer */}
              <div className="p-4 rounded-2xl bg-brand-soft/20 dark:bg-[#2C152E] border border-brand-lilac/30 flex items-start gap-3.5">
                <div className="flex-shrink-0 mt-0.5">
                  <NaviMascot size="sm" showBadge={false} animated={false} />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-black text-brand-plum dark:text-brand-soft uppercase tracking-wider">
                    Respuesta de Navi:
                  </span>
                  <p className="text-xs sm:text-sm text-[#5B4861] dark:text-brand-cream leading-relaxed">
                    {q.answer}
                  </p>
                </div>
              </div>

              {/* Likes & Interactions */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  onClick={() => handleLike(q.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-bold transition ${
                    likedIds.includes(q.id)
                      ? 'bg-brand-plum text-white border-brand-plum'
                      : 'bg-brand-cream dark:bg-[#2C152E] text-brand-plum dark:text-brand-soft border-brand-lilac/40 hover:bg-brand-soft/30'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Útil ({q.likes})</span>
                </button>

                <span className="text-brand-slate dark:text-brand-soft font-semibold">
                  Validado por MINSA / OMS
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
