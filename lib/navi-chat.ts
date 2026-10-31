
import { GoogleGenAI } from "@google/genai";

const NAVI_SYSTEM_PROMPT = `
Eres Navi 🦉, el búho consejero e Inteligencia Artificial oficial de "Unidas por un camino seguro".

Eres sabio, juvenil, inteligente, empático, cálido y CERO juzgón.

TU LEMA OFICIAL:
"¿Tienes una duda? Suéltala. Navi no te va a mirar raro."

TUS CAPACIDADES:

1. CONOCIMIENTO GENERAL Y TAREAS:
Puedes responder preguntas de ciencia, historia, matemáticas, tecnología, literatura, arte, idiomas, lógica, curiosidades, redacción y cualquier otro tema.

- Explica con precisión y claridad.
- Utiliza ejemplos entretenidos.
- Resuelve ejercicios paso a paso.
- Nunca digas que solo sabes sobre salud sexual.
- Si no sabes algo, reconócelo sin inventar.

2. SALUD SEXUAL Y REPRODUCTIVA:
- Proporciona información científica y respetuosa.
- Explica métodos anticonceptivos.
- Orienta sobre prevención del embarazo adolescente.
- Explica consentimiento, cambios corporales, ITS y derechos.
- Respeta la confidencialidad.
- No juzgues ni estigmatices.

3. PREVENCIÓN DE VIOLENCIA EN PERÚ:
Cuando la consulta sea sobre violencia, abuso o peligro:

- Orienta hacia la Línea 100 del MIMP.
- Informa sobre la Línea 113 Salud del MINSA.
- Explica la importancia de buscar atención médica inmediata.
- Informa sobre el kit de emergencia para víctimas de violencia sexual.
- Ofrece orientación respetuosa y empática.

No introduzcas información sobre violencia o emergencias cuando la pregunta trate de otro tema.

4. PERSONALIDAD:
- Sé cercano, optimista y respetuoso.
- Utiliza un lenguaje juvenil y amable.
- Usa emojis ocasionalmente.
- Organiza respuestas largas con Markdown.
- Adapta el nivel de detalle a la pregunta.
- Responde siempre a la pregunta real del usuario.

5. PRIVACIDAD:
- Nunca solicites contraseñas, DNI o direcciones exactas.
- Evita recopilar datos personales innecesarios.
- No prometas anonimato absoluto.
- No inventes servicios ni garantías legales.

6. IDIOMAS:
- Español.
- Quechua, cuando tus conocimientos lo permitan.
- Aimara, cuando tus conocimientos lo permitan.
- Inglés.
- Reconoce tus limitaciones de traducción cuando sea necesario.

Tu objetivo es ayudar, enseñar, orientar y acompañar de forma segura.
`;

type ChatTurn = {
  role: "user" | "model";
  content: string;
};

type ChatRequest = {
  message?: unknown;
  history?: unknown;
  language?: unknown;
};

// Sugerencias relacionadas con la pregunta
function generateSuggestedActions(
  userMsg: string,
  replyText: string
): string[] {
  const text = (userMsg + " " + replyText).toLowerCase();

  if (
    text.includes("pastilla") ||
    text.includes("aoe") ||
    text.includes("anticoncepción de emergencia")
  ) {
    return [
      "¿Tiene efectos secundarios la AOE?",
      "¿Dónde conseguirla gratis?",
      "¿Qué método regular me recomiendas?",
    ];
  }

  if (
    text.includes("condon") ||
    text.includes("condón") ||
    text.includes("preservativo")
  ) {
    return [
      "¿Cómo usarlo correctamente?",
      "¿Qué es la doble protección?",
      "¿Qué hacer si se rompe?",
    ];
  }

  if (
    text.includes("implante") ||
    text.includes("anticonceptiv") ||
    text.includes("diu")
  ) {
    return [
      "¿Qué métodos son más efectivos?",
      "¿Puedo solicitar orientación?",
      "¿Qué métodos ofrece el MINSA?",
    ];
  }

  if (
    text.includes("violencia") ||
    text.includes("abuso") ||
    text.includes("agresión")
  ) {
    return [
      "¿Cómo funciona el kit de emergencia?",
      "¿Qué ayuda ofrece la Línea 100?",
      "¿Dónde puedo buscar apoyo?",
    ];
  }

  if (
    text.includes("matemática") ||
    text.includes("matematica") ||
    text.includes("ejercicio") ||
    text.includes("calcula")
  ) {
    return [
      "Explícamelo paso a paso",
      "Dame otro ejercicio",
      "Muéstrame un método más sencillo",
    ];
  }

  if (
    text.includes("cerebro") ||
    text.includes("ciencia") ||
    text.includes("biología") ||
    text.includes("biologia")
  ) {
    return [
      "Explícamelo más fácilmente",
      "Dame un ejemplo",
      "Cuéntame una curiosidad científica",
    ];
  }

  if (
    text.includes("tarea") ||
    text.includes("historia") ||
    text.includes("resumen")
  ) {
    return [
      "Hazme un resumen",
      "¿Cuáles son las ideas principales?",
      "Dame un ejemplo práctico",
    ];
  }

  return [
    "Explícame más sobre esto",
    "Dame un ejemplo práctico",
    "¿Qué otra recomendación tienes?",
  ];
}

// Preparar el historial para Gemini
function buildContents(history: unknown, message: string) {
  const turns: ChatTurn[] = Array.isArray(history)
    ? history.filter(
        (item): item is ChatTurn =>
          item !== null &&
          (item.role === "user" || item.role === "model") &&
          typeof item.content === "string" &&
          item.content.trim().length > 0
      ).slice(-20)
    : [];

  // Evitar duplicar la pregunta actual
  const lastTurn = turns[turns.length - 1];

  if (
    lastTurn?.role === "user" &&
    lastTurn.content.trim() === message
  ) {
    turns.pop();
  }

  const contents: {
    role: "user" | "model";
    parts: { text: string }[];
  }[] = [];

  for (const turn of turns) {
    if (contents.length === 0 && turn.role !== "user") {
      continue;
    }

    const previous = contents[contents.length - 1];

    if (previous?.role === turn.role) {
      previous.parts[0].text += "\n" + turn.content;
    } else {
      contents.push({
        role: turn.role,
        parts: [{ text: turn.content }],
      });
    }
  }

  const previous = contents[contents.length - 1];

  if (previous?.role === "user") {
    previous.parts[0].text += "\n" + message;
  } else {
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });
  }

  return contents;
}

// Función principal de Navi
export async function handleNaviChat(body: ChatRequest) {
  const message =
    typeof body?.message === "string"
      ? body.message.trim()
      : "";

  if (!message || message.length > 4000) {
    return {
      status: 400,
      data: {
        error: "El mensaje debe contener entre 1 y 4000 caracteres",
      },
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY no está configurada");

    return {
      status: 503,
      data: {
        reply:
          "🦉 Mi servicio de inteligencia artificial todavía no está configurado.",
        source: "configuration-error",
        suggestedActions: [],
      },
    };
  }

  const langMap: Record<string, string> = {
    es: "Español",
    en: "Inglés",
    qu: "Quechua (Runasimi)",
    ay: "Aimara",
  };

  const language =
    typeof body.language === "string" &&
    body.language in langMap
      ? body.language
      : "es";

  const langInstruction =
    language !== "es"
      ? `\nResponde cálidamente en ${langMap[language]}, manteniendo el rigor científico y la empatía.`
      : "";

  const ai = new GoogleGenAI({ apiKey });

  const contents = buildContents(body.history, message);

  // Modelos configurables
  
const models = [
  ...new Set([
    process.env.GEMINI_MODEL || "gemini-3.8-flash",
    "gemini-3.5-flash-lite",
  ]),
];


  for (const model of models) {
    try {
      console.log(`Navi intentando conectar con ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction:
            NAVI_SYSTEM_PROMPT + langInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text?.trim();

      if (!reply) {
        throw new Error("Gemini devolvió una respuesta vacía");
      }

      return {
        status: 200,
        data: {
          reply,
          source: model,
          suggestedActions: generateSuggestedActions(
            message,
            reply
          ),
        },
      };
    } catch (error) {
      console.error(`Fallo con el modelo ${model}:`, error);

      const status =
        (error as { status?: number })?.status;

      if (
        status === 429 ||
        status === 401 ||
        status === 403
      ) {
        break;
      }
    }
  }

  return {
    status: 503,
    data: {
      reply:
        "🦉 Ahora mismo tengo un problema de conexión con mi servicio de IA. Por favor, vuelve a intentarlo en unos minutos.",
      source: "connection-error",
      suggestedActions: ["Volver a intentar"],
    },
  };
}
