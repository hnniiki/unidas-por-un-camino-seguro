import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini client helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// System prompt for Navi
const NAVI_SYSTEM_PROMPT = `
Eres Navi 🦉, el búho consejero e Inteligencia Artificial oficial de "Unidas por un camino seguro". Eres sabio, juvenil, sumamente inteligente, empático, cálido y CERO juzgón.

TU LEMA OFICIAL:
"¿Tienes una duda? Suéltala. Navi no te va a mirar raro."

TUS CAPACIDADES:
Eres una Inteligencia Artificial completa y versátil. PUEDES RESPONDER A CUALQUIER PREGUNTA que el usuario te haga sobre cualquier tema:
1. CONOCIMIENTO GENERAL Y TAREAS (Ciencia, historia, matemáticas, tecnología, literatura, arte, idiomas, lógica, curiosidades, consejos prácticos, redacción, etc.):
   - Responde con brillantez, precisión, claridad didáctica, explicaciones paso a paso y ejemplos entretenidos.
   - NUNCA rechaces una pregunta diciendo que solo sabes de salud sexual. Tienes conocimientos universales y siempre ayudas de manera amigable.

2. SALUD SEXUAL Y REPRODUCTIVA, CUERPO, DERECHOS Y PREVENCIÓN DEL EMBARAZO ADOLESCENTE:
   - Adopta un tono respetuoso, empático, claro y con estricto rigor científico.
   - Explica métodos anticonceptivos modernos (preservativo de doble protección, implante subdérmico, DIU, pastillas, inyectables, AOE/pastilla de emergencia dentro de 72h).
   - Recuerda la confidencialidad y el derecho de los adolescentes a ser atendidos en Servicios de Salud Amigables del MINSA.
   - Jamás juzgues, culpes ni estigmatices a nadie.

3. PREVENCIÓN DE VIOLENCIA Y SITUACIONES DE EMERGENCIA (Perú):
   - Si detectas abuso, violencia sexual, coerción o menores de 15 años en riesgo:
     * Recuerda que las relaciones sexuales con menores de 14 años constituyen delito según el Código Penal peruano.
     * Orienta con cariño hacia los canales de auxilio gratuitos 24 horas:
       - Línea 100 (MIMP): Violencia familiar y sexual (gratuita 24/7).
       - Línea 113 Salud (MINSA) - Opción 3: Salud sexual, métodos y orientación médica.
       - Kit de Emergencia para Víctimas de Violencia Sexual: Gratuito en postas/hospitales dentro de las 72 horas (AOE, antirretrovirales VIH, prevención ITS).
       - SíseVe (MINEDU) - 0800-76-888: Acoso escolar.

4. TONO Y PERSONALIDAD:
   - Sé cercano, optimista, respetuoso, motivador y claro.
   - Usa formato markdown limpio (negritas, viñetas, enumeraciones) para que las respuestas sean fáciles y agradables de leer en pantallas móviles y computadoras.
   - Adapta el nivel de detalle a la pregunta del usuario.

5. PRIVACIDAD:
   - Nunca pidas datos privados sensibles (DNI, contraseñas, direcciones exactas).
`;

// In-memory store for anonymous questions & cases (for demonstration and persistence during session)
interface AnonymousQuestion {
  id: string;
  topic: string;
  question: string;
  createdAt: string;
  answered: boolean;
  specialistAnswer?: string;
  ageGroup?: string;
}

const anonymousQuestions: AnonymousQuestion[] = [
  {
    id: "aq-101",
    topic: "Anticoncepción",
    question: "¿Si voy a una posta médica a pedir anticonceptivos, tienen la obligación de llamar a mis papás?",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    answered: true,
    ageGroup: "14-17 años",
    specialistAnswer: "No. En el marco de la Norma Técnica de Salud para la Atención Integral de Salud de Adolescentes, tienes derecho a recibir orientación, consejería y métodos anticonceptivos de forma confidencial y gratuita en los Servicios de Salud Diferenciados / Amigables sin discriminación ni exigencia de acompañamiento que vulnere tu privacidad.",
  },
  {
    id: "aq-102",
    topic: "Mitos",
    question: "¿Es verdad que lavarse con vinagre o refresco después de tener relaciones evita el embarazo?",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    answered: true,
    ageGroup: "12-15 años",
    specialistAnswer: "¡Totalmente falso y peligroso! Las duchas con sustancias caseras NO previenen el embarazo (los espermatozoides viajan hacia el útero en segundos) y además causan quemaduras químicas, alteración de la flora vaginal y graves infecciones.",
  },
  {
    id: "aq-103",
    topic: "Consentimiento",
    question: "Mi pareja me insiste y se enoja si le digo que no quiero tener relaciones. ¿Eso es normal?",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    answered: true,
    ageGroup: "15-18 años",
    specialistAnswer: "No es normal ni aceptable. La insistencia, el chantaje emocional o la culpa ante un 'no' constituyen coerción y violencia psicológica/sexual. El consentimiento debe ser libre, voluntario, consciente y reversible en cualquier momento. Mereces una relación basada en el respeto absoluto.",
  }
];

// Route: API Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Unidas por un camino seguro", time: new Date().toISOString() });
});

// Helper to generate dynamic follow-up suggestions
function generateSuggestedActions(userMsg: string, replyText: string): string[] {
  const text = (userMsg + " " + replyText).toLowerCase();
  
  if (text.includes("pastilla") || text.includes("aoe") || text.includes("emergencia") || text.includes("72")) {
    return [
      "¿Tiene efectos secundarios la AOE?",
      "¿Dónde conseguirla gratis en MINSA?",
      "¿Qué método regular me recomiendas?"
    ];
  }
  if (text.includes("condon") || text.includes("preservativo") || text.includes("rompio")) {
    return [
      "¿Cómo usarlo correctamente?",
      "¿Qué es la doble protección?",
      "¿Qué hacer si se rompió hace horas?"
    ];
  }
  if (text.includes("implante") || text.includes("inyectable") || text.includes("metodo") || text.includes("anticonceptiv") || text.includes("diu")) {
    return [
      "¿El implante duele al ponerlo?",
      "¿Puedo pedirlo sin mis padres?",
      "¿Qué métodos son gratuitos en Perú?"
    ];
  }
  if (text.includes("violencia") || text.includes("abuso") || text.includes("tocaron") || text.includes("miedo") || text.includes("100")) {
    return [
      "¿Cómo funciona el Kit de 72 horas?",
      "¿Qué ayuda me da la Línea 100?",
      "¿A qué posta o CEM puedo ir?"
    ];
  }
  if (text.includes("padres") || text.includes("familia") || text.includes("mama") || text.includes("papa") || text.includes("hablar")) {
    return [
      "¿Cómo empezar a hablar sin pena?",
      "¿Qué hacer si mis padres se enojan?",
      "Guías de diálogo familiar"
    ];
  }
  if (text.includes("embaraz") || text.includes("retraso") || text.includes("prueba") || text.includes("sintoma")) {
    return [
      "¿Cuándo es confiable el test de orina?",
      "¿Qué es la Ley 29600 para colegios?",
      "Línea 113 opción 3 gratuita"
    ];
  }
  if (text.includes("matematica") || text.includes("formula") || text.includes("calcula") || text.includes("ejercicio") || text.includes("problema")) {
    return [
      "¿Puedes explicarme paso a paso?",
      "Dame otro ejemplo similar",
      "¿Cómo lo resuelvo de forma más rápida?"
    ];
  }
  if (text.includes("tarea") || text.includes("historia") || text.includes("ciencia") || text.includes("resumen") || text.includes("explica")) {
    return [
      "¿Puedes darme un resumen más corto?",
      "¿Cuáles son las ideas principales?",
      "Ponme un ejemplo práctico"
    ];
  }
  if (text.includes("programar") || text.includes("codigo") || text.includes("python") || text.includes("javascript") || text.includes("html")) {
    return [
      "¿Cómo funciona esta función?",
      "¿Puedes mostrarme un ejemplo de código?",
      "¿Cuáles son las mejores prácticas?"
    ];
  }

  return [
    "Explícame más sobre esto",
    "Dame un ejemplo práctico",
    "¿Qué otra recomendación tienes?"
  ];
}

// Route: Chat with Navi (Gemini API with fallback)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], language = "es" } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "El mensaje es requerido" });
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const langMap: Record<string, string> = {
          qu: "Quechua (Runasimi)",
          ay: "Aimara",
          en: "Inglés (English)",
          es: "Español"
        };
        const langName = langMap[language] || language;
        const langInstruction = language && language !== "es" 
          ? `\n\nIMPORTANTE: El usuario se comunica en ${langName}. Responde cálidamente en ${langName} manteniendo rigor científico y empatía.` 
          : "";

        // Build valid alternating conversation turns for Gemini
        const rawHistory = Array.isArray(history) ? history : [];
        
        // Exclude empty messages
        const validTurns = rawHistory.filter(
          (h: { role: string; content: string }) => h && h.content && typeof h.content === "string" && h.content.trim() !== ""
        );

        // Remove trailing user turn if it matches the current message
        if (validTurns.length > 0 && 
            validTurns[validTurns.length - 1].role === "user" && 
            validTurns[validTurns.length - 1].content.trim() === message.trim()) {
          validTurns.pop();
        }

        // Gemini contents array must start with role 'user' and alternate 'user' -> 'model'
        const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];
        let expectedRole: "user" | "model" = "user";

        for (const turn of validTurns.slice(-8)) {
          const role = turn.role === "user" ? "user" : "model";
          
          if (contents.length === 0) {
            // First item in contents must be 'user'
            if (role === "user") {
              contents.push({ role: "user", parts: [{ text: turn.content }] });
              expectedRole = "model";
            }
          } else {
            if (role === expectedRole) {
              contents.push({ role, parts: [{ text: turn.content }] });
              expectedRole = expectedRole === "user" ? "model" : "user";
            }
          }
        }

        // Finally, add the current user message
        contents.push({
          role: "user",
          parts: [{ text: message }]
        });

        let response;
        let usedModel = "gemini-1.5-flash";

        try {
          response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents,
            config: {
              systemInstruction: NAVI_SYSTEM_PROMPT + langInstruction,
              temperature: 0.7,
            },
          });
        } catch (modelErr) {
          console.warn("Retrying with gemini-1.5-flash...", modelErr);
          usedModel = "gemini-1.5-flash";
          response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents,
            config: {
              systemInstruction: NAVI_SYSTEM_PROMPT + langInstruction,
              temperature: 0.7,
            },
          });
        }

        const replyText = response.text?.trim() || "¡Hola! Estoy aquí para escucharte y orientarte con toda confianza.";
        const suggestedActions = generateSuggestedActions(message, replyText);
        
        return res.json({ 
          reply: replyText, 
          source: usedModel,
          suggestedActions
        });
      } catch (geminiError) {
        console.error("Gemini call error:", geminiError);
        // Fallback to local expert engine
      }
    }

    // Fallback response engine for Navi
    const lower = message.toLowerCase();
    let reply = "";

    if (lower.includes("hola") || lower.includes("buenos") || lower.includes("hey") || lower.includes("que tal")) {
      reply = "¡Hola! Soy Navi, tu búho consejero de confianza 🦉. Recuerda: ¿Tienes una duda? Suéltala. Navi no te va a mirar raro. Puedes preguntarme sobre anticoncepción, mitos, consentimiento, cambios corporales, tus derechos o a dónde acudir.";
    } else if (lower.includes("anticonceptiv") || lower.includes("pastilla") || lower.includes("condon") || lower.includes("preservativo") || lower.includes("implante") || lower.includes("diu")) {
      reply = "🛡️ **Métodos Anticonceptivos Seguros y Gratuitos:**\n\n- **Preservativo (Condón)**: Es el único método de doble protección (previene el embarazo no planificado y te protege contra ITS como el VIH).\n- **Métodos de Larga Duración (LARC)**: Como el implante subdérmico (varita en el brazo, 3 o 5 años) o la T de Cobre/SIU, altamente efectivos y reversibles.\n- **Pastillas e Inyectables**: Requieren constancia periódica.\n\nRecuerda que en el Perú puedes solicitar orientación y métodos de forma gratuita y confidencial en cualquier establecimiento de salud público (Línea 113 opción 3).";
    } else if (lower.includes("emergencia") || lower.includes("aoe") || lower.includes("del dia despues") || lower.includes("día siguiente")) {
      reply = "⏱️ **Pastilla del Día Siguiente (AOE - Anticoncepción Oral de Emergencia):**\n\n- Es un método de **urgencia**, no de uso regular.\n- Debe tomarse lo más pronto posible (idealmente en las primeras 24h, con eficacia hasta las 72h tras la relación sin protección o falla del condón).\n- Es gratuita en todos los centros de salud del MINSA y no genera aborto: actúa evitando o retrasando la ovulación.";
    } else if (lower.includes("violencia") || lower.includes("oblig") || lower.includes("abuso") || lower.includes("tocaron") || lower.includes("fuerza") || lower.includes("amenaz")) {
      reply = "🚨 **No estás solo/a. Lo que sientes importa y tu seguridad es lo primero:**\n\nNadie tiene derecho a tocarte, presionarte o lastimarte. Si has pasado por una situación de violencia o agresión sexual:\n\n1. **Llama de inmediato a la Línea 100 (MIMP)**: Gratuita, confidencial y disponible 24/7.\n2. **Kit de Emergencia para Violencia Sexual**: Si ocurrió dentro de las últimas 72 horas, acude a cualquier posta o hospital para recibir atención médica inmediata, AOE, profilaxis para VIH/ITS y atención psicológica sin costo.\n3. **Denuncia**: En comisarías, CEM (Centro Emergencia Mujer) o Fiscalía de Familia.\n\nTu testimonio es confidencial y tienes derecho a protección integral.";
    } else if (lower.includes("menor de 15") || lower.includes("14 años") || lower.includes("13 años") || lower.includes("12 años") || lower.includes("matrimonio")) {
      reply = "⚖️ **Protección de Niñas y Adolescentes:**\n\nEn la legislación peruana y tratados internacionales, cualquier relación sexual con menores de 14 años es considerada violación sexual legalmente. Además, el matrimonio infantil y las uniones tempranas forzadas están prohibidas por ley. Tienes derecho a la educación, a tu integridad y a un proyecto de vida libre de violencia.";
    } else if (lower.includes("embaraz") || lower.includes("retraso") || lower.includes("sintoma") || lower.includes("test")) {
      reply = "🌸 **Sobre la Posibilidad de Embarazo:**\n\nUn retraso menstrual puede deberse a múltiples factores (estrés, cambios hormonales, etc.), pero si tuviste relaciones sexuales sin protección, lo más recomendable es:\n1. Realizarte una prueba de embarazo en orina (a partir de 7-10 días de retraso) o en sangre en un laboratorio/posta.\n2. Acudir a un Servicio de Salud Amigable del MINSA para recibir consejería confidencial, cálida y sin juzgamientos.\n3. Recuerda que la Línea 113 opción 3 te brinda orientación médica telefónica gratuita 24h.";
    } else {
      reply = `Gracias por tu pregunta. En "Unidas por un camino seguro" queremos darte información científica, clara y sin tabúes.\n\nRespecto a lo que mencionas, es fundamental que tomes decisiones informadas sobre tu cuerpo y tu futuro. Recuerda que ante dudas médicas o situaciones delicadas, la Línea 113 Salud (Opción 3) y la Línea 100 están disponibles las 24 horas de manera gratuita y anónima. ¿Te gustaría que profundicemos en algún aspecto específico?`;
    }

    const fallbackSuggestions = generateSuggestedActions(message, reply);
    return res.json({ 
      reply, 
      source: "knowledge-base",
      suggestedActions: fallbackSuggestions 
    });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Error al procesar la respuesta del chatbot" });
  }
});

// Route: Get anonymous questions
app.get("/api/anonymous-questions", (req, res) => {
  res.json({ questions: anonymousQuestions });
});

// Route: Post new anonymous question
app.post("/api/anonymous-questions", (req, res) => {
  const { topic, question, ageGroup } = req.body;
  if (!question || question.trim().length < 5) {
    return res.status(400).json({ error: "La pregunta debe tener al menos 5 caracteres" });
  }

  const newQuestion: AnonymousQuestion = {
    id: `aq-${Date.now()}`,
    topic: topic || "Duda General",
    question: question.trim(),
    createdAt: new Date().toISOString(),
    answered: true,
    ageGroup: ageGroup || "Adolescente",
    specialistAnswer: "¡Hola! Tu pregunta ha sido recibida por nuestro equipo de especialistas. Recuerda que no estás solo/a. Si es una duda urgente, puedes consultar a Navi en el chat o llamar gratis al 113 opción 3.",
  };

  anonymousQuestions.unshift(newQuestion);
  res.json({ success: true, question: newQuestion });
});

// Start Server & Integrate Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
