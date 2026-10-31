
import React, { useState, useRef, useEffect } from "react";
import { NaviMascot } from "./NaviMascot";

import {
  X,
  Send,
  Sparkles,
  Trash2,
  Download,
  Volume2,
  VolumeX,
  ShieldAlert,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import type { ChatMessage, SupportedLanguage } from "../types";
import { speechService } from "../utils/speech";
import { notificationService } from "../utils/notifications";

interface ChatWithNaviModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onAddXp?: (amount: number) => void;
  currentLanguage?: SupportedLanguage;
}

interface NaviApiResponse {
  reply?: string;
  source?: string;
  error?: string;
  suggestedActions?: string[];
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-welcome",
    sender: "navi",
    text:
      '¡Hola! Soy Navi 🦉, tu asistente inteligente con IA de "Unidas por un camino seguro".\n\n' +
      "**¡Puedes preguntarme absolutamente cualquier cosa que necesites!** " +
      "Desde temas de salud sexual, métodos anticonceptivos, derechos y prevención, " +
      "hasta preguntas de ciencia, tareas del colegio, historia, tecnología, " +
      "consejos o cualquier curiosidad del día a día.\n\n" +
      "*¿Tienes una duda? Suéltala. ¡Navi no te va a juzgar ni mirar raro!*",
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    suggestedActions: [
      "¿Qué es la doble protección?",
      "Explícame cómo funciona el cerebro",
      "¿Puedo ir a la posta sin mis padres?",
    ],
  },
];

const TOPIC_PRESETS = [
  {
    id: "general",
    label: "🧠 Pregúntame lo que sea",
    prompt:
      "¡Hola Navi! ¿Puedes ayudarme a entender un tema y responder cualquier duda que tenga con tu IA?",
  },
  {
    id: "metodos",
    label: "🛡️ Anticonceptivos",
    prompt:
      "¿Cuáles son los métodos anticonceptivos más seguros y cuáles son gratuitos en la posta médica?",
  },
  {
    id: "emergencia",
    label: "⏱️ Pastilla 72h (AOE)",
    prompt:
      "¿Cómo se usa la pastilla del día después, cuánto tiempo tengo y dónde la consigo gratis?",
  },
  {
    id: "tareas",
    label: "📚 Tareas y Ciencias",
    prompt:
      "Ayúdame con una explicación clara y paso a paso para un trabajo del colegio.",
  },
  {
    id: "derechos",
    label: "⚖️ Mis Derechos y Postas",
    prompt:
      "¿Tengo derecho a recibir atención y anticonceptivos en la posta de salud de forma confidencial sin mis padres?",
  },
  {
    id: "consentimiento",
    label: "🛑 Consentimiento y Ayuda",
    prompt:
      "¿Qué es el consentimiento y qué debo hacer si me siento presionada o en peligro?",
  },
  {
    id: "familia",
    label: "👨‍👩‍👧 Hablar con Padres",
    prompt:
      "¿Cómo puedo hablar con mis papás sobre temas delicados sin sentir vergüenza?",
  },
];

const RenderFormattedMessage: React.FC<{
  text: string;
  isNavi: boolean;
  darkMode: boolean;
}> = ({ text, isNavi }) => {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        const isBullet =
          trimmed.startsWith("- ") ||
          trimmed.startsWith("* ") ||
          trimmed.startsWith("• ");

        const cleanContent = isBullet
          ? trimmed.replace(/^[-*•]\s+/, "")
          : trimmed;

        const parts = cleanContent.split(/(\*\*.*?\*\*)/g);

        const renderedContent = parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong
                key={pIdx}
                className={
                  isNavi
                    ? "font-bold text-[#4B2E4F] dark:text-[#E8C2B0]"
                    : "font-bold text-white"
                }
              >
                {part.slice(2, -2)}
              </strong>
            );
          }

          return part;
        });

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  isNavi
                    ? "bg-[#8B5E83] dark:bg-[#E8C2B0]"
                    : "bg-white"
                }`}
              />
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
  currentLanguage = "es",
}) => {
  const [messages, setMessages] =
    useState<ChatMessage[]>(INITIAL_MESSAGES);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);

  const [copiedId, setCopiedId] =
    useState<string | null>(null);

  const [playingAudioId, setPlayingAudioId] =
    useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendingRef = useRef(false);
  const messagesRef = useRef<ChatMessage[]>(INITIAL_MESSAGES);
  const requestRef = useRef<AbortController | null>(null);
  const chatVersionRef = useRef(0);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
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

  useEffect(() => {
    return () => {
      requestRef.current?.abort();
      speechService.stop();
    };
  }, []);

  // Enviar preguntas a nuestra API segura
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? inputText).trim();

    if (!query || sendingRef.current) return;

    sendingRef.current = true;

    const previousMessages = messagesRef.current;
    const requestVersion = chatVersionRef.current;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...previousMessages, userMsg];

    messagesRef.current = updatedMessages;
    setMessages(updatedMessages);
    setInputText("");
    setIsTyping(true);

    const controller = new AbortController();
    requestRef.current = controller;

    try {
      // Excluir bienvenida y mensajes de error del historial
      const chatHistory = previousMessages
        .filter(
          (m) =>
            m.id !== "msg-welcome" &&
            !m.id.startsWith("navi-err-") &&
            m.text.trim() !== ""
        )
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          content: m.text,
        }))
        .slice(-20);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          history: chatHistory,
          language: currentLanguage,
        }),
        signal: controller.signal,
      });

      const data: NaviApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.reply ||
            data.error ||
            `Error del servidor: ${response.status}`
        );
      }

      if (!data.reply?.trim()) {
        throw new Error("Navi recibió una respuesta vacía");
      }

      if (
        controller.signal.aborted ||
        requestVersion !== chatVersionRef.current
      ) {
        return;
      }

      const botReply = data.reply.trim();

      const naviMsg: ChatMessage = {
        id: `navi-${Date.now()}`,
        sender: "navi",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        suggestedActions: Array.isArray(data.suggestedActions)
          ? data.suggestedActions
          : [
              "Explícame más sobre esto",
              "Dame un ejemplo práctico",
              "¿Qué otra recomendación tienes?",
            ],
      };

      setMessages((prev) => {
        const next = [...prev, naviMsg];
        messagesRef.current = next;
        return next;
      });

      if (onAddXp) {
        onAddXp(20);
      }

      if (document.hidden || !document.hasFocus()) {
        const cleanSnippet = botReply
          .replace(/[*#_`~[\]()]/g, "")
          .slice(0, 120);

        notificationService.showNotification({
          id: naviMsg.id,
          title: "🦉 Navi respondió a tu consulta:",
          body: `${cleanSnippet}...`,
          tag: "navi-chat-reply",
        });
      }

      if (autoSpeak) {
        setPlayingAudioId(naviMsg.id);
        speechService.speak(botReply);
      }
    } catch (error) {
      if (controller.signal.aborted) return;

      if (requestVersion !== chatVersionRef.current) return;

      console.error("Error de conexión con Navi:", error);

      const fallbackText =
        "🦉 Estoy teniendo un problema de conexión con mi servicio de inteligencia artificial. " +
        "Por favor, vuelve a intentar tu pregunta en unos momentos.";

      const fallbackMsg: ChatMessage = {
        id: `navi-err-${Date.now()}`,
        sender: "navi",
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        suggestedActions: ["Volver a intentar"],
      };

      setMessages((prev) => {
        const next = [...prev, fallbackMsg];
        messagesRef.current = next;
        return next;
      });
    } finally {
      if (requestVersion === chatVersionRef.current) {
        sendingRef.current = false;
        setIsTyping(false);
      }

      if (requestRef.current === controller) {
        requestRef.current = null;
      }
    }
  };

  const handleClearHistory = () => {
    chatVersionRef.current += 1;
    requestRef.current?.abort();
    requestRef.current = null;
    sendingRef.current = false;
    setIsTyping(false);

    speechService.stop();
    setPlayingAudioId(null);

    messagesRef.current = INITIAL_MESSAGES;
    setMessages(INITIAL_MESSAGES);
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Error al copiar mensaje:", error);
    }
  };

  const handleToggleSpeakMessage = (
    msgId: string,
    text: string
  ) => {
    if (playingAudioId === msgId) {
      speechService.stop();
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(msgId);
      speechService.speak(text);
    }
  };

  const handleExportChat = () => {
    const textContent = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${
            m.sender === "navi" ? "Navi (Asistente IA)" : "Tú"
          }:\n${m.text}`
      )
      .join("\n\n---\n\n");

    const blob = new Blob([textContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `orientacion_navi_ia_${new Date()
      .toISOString()
      .slice(0, 10)}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-2xl h-[94vh] sm:h-[88vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border ${
          darkMode
            ? "bg-[#241226] border-[#5B3E60] text-white"
            : "bg-white border-[#E5D7DE] text-[#2D1A30]"
        }`}
      >
        {/* ENCABEZADO */}
        <div className="p-3.5 sm:p-4 bg-[#4B2E4F] text-white flex items-center justify-between border-b border-[#5B3E60] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <NaviMascot
                size="sm"
                showBadge={false}
                animated={true}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#4B2E4F] rounded-full animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                  Navi
                </h3>

                <span className="inline-flex items-center gap-1 text-[10px] bg-gradient-to-r from-amber-400 to-amber-200 text-[#3B1F3D] font-black px-2 py-0.5 rounded-full shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#4B2E4F]" />
                  Gemini AI
                </span>

                <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" />
                  Chat privado
                </span>
              </div>

              <span className="text-[11px] text-[#F9F5F8]/85 italic block">
                “¿Tienes una duda? Suéltala. Navi no te va a juzgar ni mirar raro.”
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* VOZ AUTOMÁTICA */}
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`p-2 rounded-lg text-xs transition ${
                autoSpeak
                  ? "bg-amber-400 text-[#3B1F3D] font-bold shadow-xs"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              title={
                autoSpeak
                  ? "Lectura por voz activada"
                  : "Activar lectura automática"
              }
              aria-label="Alternar lectura por voz"
            >
              {autoSpeak ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* DESCARGAR */}
            <button
              onClick={handleExportChat}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs transition"
              title="Descargar conversación"
              aria-label="Descargar chat"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* BORRAR */}
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs transition"
              title="Borrar historial de chat"
              aria-label="Borrar chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* CERRAR */}
            <button
              onClick={() => {
                speechService.stop();
                setPlayingAudioId(null);
                onClose();
              }}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-red-500 text-xs transition ml-1"
              title="Cerrar ventana de chat"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BARRA DE EMERGENCIA */}
        <div className="bg-red-950/90 text-red-100 text-[11px] px-3.5 py-1.5 flex items-center justify-between border-b border-red-500/30 flex-shrink-0">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span>
              ¿Peligro o agresión? Llama gratis 24/7 a la{" "}
              <strong>Línea 100</strong>. Orientación de salud:{" "}
              <strong>113</strong>.
            </span>
          </div>

          <a
            href="tel:100"
            className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded-md font-bold text-xs transition shadow-xs"
          >
            Llamar 100
          </a>
        </div>

        {/* TEMAS RÁPIDOS */}
        <div className="px-3 py-2 bg-stone-50/90 dark:bg-[#1E0D20] border-b border-stone-200/80 dark:border-[#4B2E4F]/60 overflow-x-auto flex gap-1.5 flex-shrink-0 scrollbar-none">
          {TOPIC_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSendMessage(preset.prompt)}
              disabled={isTyping}
              className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-[#321734] text-[#4B2E4F] dark:text-[#E8C2B0] border border-stone-200 dark:border-[#5B3E60] hover:border-[#4B2E4F] hover:bg-[#FAF6F8] dark:hover:bg-[#432046] transition shadow-2xs disabled:opacity-50"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* HISTORIAL DEL CHAT */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-[#FAF6F8]/60 dark:bg-[#1A0A1C]">
          {messages.map((msg) => {
            const isNavi = msg.sender === "navi";
            const isPlaying = playingAudioId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[92%] sm:max-w-[85%] ${
                  isNavi
                    ? "mr-auto"
                    : "ml-auto flex-row-reverse"
                }`}
              >
                {isNavi && (
                  <div className="flex-shrink-0 mt-0.5">
                    <NaviMascot
                      size="sm"
                      showBadge={false}
                      animated={false}
                    />
                  </div>
                )}

                <div className="space-y-1 w-full">
                  <div
                    className={`p-3.5 rounded-2xl shadow-xs transition ${
                      isNavi
                        ? "bg-white dark:bg-[#2C152E] text-[#2D1A30] dark:text-stone-100 border border-[#E5D7DE] dark:border-[#5B3E60] rounded-tl-none"
                        : "bg-[#4B2E4F] text-white rounded-tr-none"
                    }`}
                  >
                    <RenderFormattedMessage
                      text={msg.text}
                      isNavi={isNavi}
                      darkMode={darkMode}
                    />

                    {/* SUGERENCIAS */}
                    {isNavi &&
                      msg.suggestedActions &&
                      msg.suggestedActions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-stone-200/70 dark:border-[#4B2E4F]/60 flex flex-wrap gap-1.5">
                          <span className="text-[10px] font-bold text-stone-400 w-full mb-0.5">
                            Sugerencias relacionadas:
                          </span>

                          {msg.suggestedActions.map((act, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                handleSendMessage(
                                  act === "Volver a intentar"
                                    ? [...messages]
                                        .reverse()
                                        .find(
                                          (m) =>
                                            m.sender === "user"
                                        )?.text || act
                                    : act
                                )
                              }
                              disabled={isTyping}
                              className="bg-[#FAF6F8] dark:bg-[#3B1F3D] text-[#4B2E4F] dark:text-[#E8C2B0] text-[11px] font-medium px-2.5 py-1 rounded-lg hover:bg-[#EEDFE6] dark:hover:bg-[#4E2750] transition border border-[#DEC9D4] dark:border-[#6B4B70] flex items-center gap-1 shadow-2xs disabled:opacity-50"
                            >
                              <span>{act}</span>
                              <ChevronRight className="w-3 h-3 opacity-60" />
                            </button>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* HORA Y ACCIONES */}
                  <div
                    className={`flex items-center gap-2 text-[10px] text-stone-400 ${
                      isNavi
                        ? "pl-1"
                        : "justify-end pr-1"
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {isNavi && (
                      <div className="flex items-center gap-1.5 ml-1">
                        <button
                          onClick={() =>
                            handleToggleSpeakMessage(
                              msg.id,
                              msg.text
                            )
                          }
                          className={`p-1 rounded transition flex items-center gap-1 ${
                            isPlaying
                              ? "text-amber-500 font-bold animate-pulse"
                              : "hover:text-[#4B2E4F] dark:hover:text-white"
                          }`}
                          title={
                            isPlaying
                              ? "Detener voz"
                              : "Escuchar respuesta de Navi"
                          }
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>
                            {isPlaying
                              ? "Hablando..."
                              : "Escuchar"}
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            handleCopy(msg.id, msg.text)
                          }
                          className="p-1 rounded hover:text-[#4B2E4F] dark:hover:text-white transition flex items-center gap-1"
                          title="Copiar texto"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500 font-bold">
                                Copiado
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* INDICADOR DE ESCRITURA */}
          {isTyping && (
            <div className="flex items-center gap-2.5 text-xs text-stone-500 dark:text-stone-300 animate-fadeIn">
              <NaviMascot
                size="sm"
                showBadge={false}
                animated={true}
              />

              <div className="bg-white dark:bg-[#2C152E] px-3.5 py-2 rounded-2xl rounded-tl-none border border-stone-200 dark:border-[#5B3E60] flex items-center gap-2 shadow-2xs">
                <span className="w-1.5 h-1.5 bg-[#4B2E4F] dark:bg-[#E8C2B0] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-[#4B2E4F] dark:bg-[#E8C2B0] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-[#4B2E4F] dark:bg-[#E8C2B0] rounded-full animate-bounce" />

                <span className="text-[11px] font-medium ml-1 text-stone-600 dark:text-stone-300">
                  Navi está analizando tu consulta con IA...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* CAMPO PARA ESCRIBIR */}
        <div className="p-3 bg-white dark:bg-[#241226] border-t border-stone-200 dark:border-[#5B3E60] flex items-center gap-2 flex-shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.repeat) {
                handleSendMessage();
              }
            }}
            disabled={isTyping}
            maxLength={4000}
            placeholder="Pregúntale lo que sea a Navi (salud, tareas, dudas, consejos, ciencia)..."
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-[#5B3E60] bg-stone-50 dark:bg-[#1A0A1C] text-[#2D1A30] dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2E4F] placeholder:text-stone-400 disabled:opacity-60"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="bg-[#4B2E4F] hover:bg-[#3B1F3D] disabled:opacity-40 text-white px-3.5 py-2.5 rounded-xl transition shadow-sm flex items-center justify-center flex-shrink-0 gap-1.5 font-bold text-xs"
            title="Enviar mensaje"
          >
            <span className="hidden sm:inline">Enviar</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
