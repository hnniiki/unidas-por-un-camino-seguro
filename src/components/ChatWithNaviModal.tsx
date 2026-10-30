import React, { useState, useRef, useEffect } from 'react';
import { NaviMascot } from './NaviMascot';
import { 
  X, 
  Send, 
  Sparkles, 
  Trash2, 
  Download, 
  Volume2, 
  VolumeX, 
  Phone, 
  ShieldAlert, 
  Copy,
  Check,
  Bot,
  Info,
  ChevronRight,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { ChatMessage, SupportedLanguage } from '../types';
import { speechService } from '../utils/speech';
import { notificationService } from '../utils/notifications';

interface ChatWithNaviModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onAddXp?: (amount: number) => void;
  currentLanguage?: SupportedLanguage;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'navi',
    text: '¡Hola! Soy Navi 🦉, tu asistente inteligente con IA de "Unidas por un camino seguro".\n\n**¡Puedes preguntarme absolutamente cualquier cosa que necesites!** Desde temas de salud sexual, métodos anticonceptivos, derechos y prevención, hasta preguntas de ciencia, tareas del colegio, historia, tecnología, consejos o cualquier curiosidad del día a día.\n\n*¿Tienes una duda? Suéltala. ¡Navi no te va a juzgar ni mirar raro!*',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedActions: [
      '¿Qué es la doble protección?',
      'Explícame cómo funciona el cerebro',
      '¿Puedo ir a la posta sin mis padres?'
    ]
  }
];

const TOPIC_PRESETS = [
  {
    id: 'general',
    label: '🧠 Pregúntame lo que sea',
    prompt: '¡Hola Navi! ¿Puedes ayudarme a entender un tema y responder cualquier duda que tenga con tu IA?'
  },
  {
    id: 'metodos',
    label: '🛡️ Anticonceptivos',
    prompt: '¿Cuáles son los métodos anticonceptivos más seguros y cuáles son gratuitos en la posta médica?'
  },
  {
    id: 'emergencia',
    label: '⏱️ Pastilla 72h (AOE)',
    prompt: '¿Cómo se usa la pastilla del día después, cuánto tiempo tengo y dónde la consigo gratis?'
  },
  {
    id: 'tareas',
    label: '📚 Tareas y Ciencias',
    prompt: 'Ayúdame con una explicación clara y paso a paso para un trabajo del colegio.'
  },
  {
    id: 'derechos',
    label: '⚖️ Mis Derechos y Postas',
    prompt: '¿Tengo derecho a recibir atención y anticonceptivos en la posta de salud de forma confidencial sin mis padres?'
  },
  {
    id: 'consentimiento',
    label: '🛑 Consentimiento y Ayuda',
    prompt: '¿Qué es el consentimiento y qué debo hacer si me siento presionada o en peligro?'
  },
  {
    id: 'familia',
    label: '👨‍👩‍👧 Hablar con Padres',
    prompt: '¿Cómo puedo hablar con mis papás sobre temas delicados sin sentir vergüenza?'
  }
];

// Helper to render markdown text with bolding and lists
const RenderFormattedMessage: React.FC<{ text: string; isNavi: boolean; darkMode: boolean }> = ({ text, isNavi, darkMode }) => {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet line
        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ');
        const cleanContent = isBullet ? trimmed.replace(/^[-*•]\s+/, '') : trimmed;

        // Parse bold segments
        const parts = cleanContent.split(/(\*\*.*?\*\*)/g);

        const renderedContent = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className={isNavi ? 'font-bold text-[#4B2E4F] dark:text-[#E8C2B0]' : 'font-bold text-white'}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                isNavi ? 'bg-[#8B5E83] dark:bg-[#E8C2B0]' : 'bg-white'
              }`} />
              <span className="flex-1">{renderedContent}</span>
            </div>
          );
        }

        return <p key={idx}>{renderedContent}</p>;
      })}
    </div>
  );
};

export const ChatWithNaviModal: React.FC<ChatWithNaviModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  onAddXp,
  currentLanguage = 'es',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    const unsubscribe = speechService.subscribe((isSpeaking) => {
      if (!isSpeaking) {
        setPlayingAudioId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    try {
      // Importamos dinámicamente el SDK de Google Gen AI
      const { GoogleGenAI } = await import('@google/genai');
      
      // Inicializamos con la variable de entorno que guardamos en Vercel
      const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY });

      // Preparamos el historial para darle contexto a Navi
      const chatHistory = messages
        .filter(m => m.text && m.text.trim() !== '')
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      // Iniciamos el chat con el modelo gemini-2.5-flash y sus instrucciones de personalidad (System Instruction)
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: chatHistory.slice(-10),
        config: {
          systemInstruction: 'Eres Navi 🦉, una asistente virtual inteligente, empática y amigable para jóvenes en la plataforma "Unidas por un camino seguro". Respondes dudas sobre salud sexual, anticonceptivos, derechos, prevención de violencia (Línea 100, Línea 113 opción 3), pero también ayudas con tareas del colegio, ciencia, tecnología y cualquier duda cotidiana con un tono cálido, juvenil, sin juzgar y directo al grano en español.',
        }
      });

      // Enviamos el mensaje del usuario
      const result = await chat.sendMessage({ message: query });
      const botReply = result.text || 'Recuerda que siempre puedes acudir a tu centro de salud más cercano o llamar gratis a la Línea 113 opción 3.';

      const naviMsg: ChatMessage = {
        id: `navi-${Date.now()}`,
        sender: 'navi',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          '¿Dónde encontrar una posta amigable?',
          '¿Qué hago en una emergencia?',
          'Más información de derechos'
        ],
      };

      setMessages(prev => [...prev, naviMsg]);
      if (onAddXp) onAddXp(20);

      // Notificación nativa si la pestaña está en segundo plano
      if (document.hidden || !document.hasFocus()) {
        const cleanSnippet = botReply.replace(/[*#_`~[\]()]/g, '').slice(0, 120);
        notificationService.showNotification({
          id: naviMsg.id,
          title: '🦉 Navi respondió a tu consulta:',
          body: `${cleanSnippet}...`,
          tag: 'navi-chat-reply',
        });
      }

      if (autoSpeak) {
        setPlayingAudioId(naviMsg.id);
        speechService.speak(botReply);
      }
    } catch (err) {
      console.error('Error con la IA de Gemini:', err);
      // Fallback amigable en caso de algún imprevisto
      const fallbackMsg: ChatMessage = {
        id: `navi-err-${Date.now()}`,
        sender: 'navi',
        text: 'Estoy aquí para orientarte. Recuerda que ante dudas urgentes sobre anticoncepción, embarazo o violencia, puedes llamar gratis y de forma confidencial a la **Línea 113 (Opción 3)** de salud sexual o a la **Línea 100** del MIMP las 24 horas.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: ['Línea 100 de emergencia', 'Línea 113 opción 3', 'Kit de emergencia 72 horas'],
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };
};