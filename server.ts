
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { handleNaviChat } from "./lib/navi-chat";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "10mb" }));

// Preguntas anónimas
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
    specialistAnswer: "¡Totalmente falso y peligroso! Las duchas con sustancias caseras NO previenen el embarazo y además pueden causar irritación y alterar la flora vaginal.",
  },
  {
    id: "aq-103",
    topic: "Consentimiento",
    question: "Mi pareja me insiste y se enoja si le digo que no quiero tener relaciones. ¿Eso es normal?",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    answered: true,
    ageGroup: "15-18 años",
    specialistAnswer: "No es normal ni aceptable. La insistencia, el chantaje emocional o la culpa ante un 'no' constituyen coerción. El consentimiento debe ser libre, voluntario y reversible en cualquier momento.",
  },
];

// Estado de la API
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Unidas por un camino seguro",
    time: new Date().toISOString(),
  });
});

// Chat de Navi con Gemini
app.post("/api/chat", async (req, res) => {
  try {
    const result = await handleNaviChat(req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      error: "Error al procesar la respuesta del chatbot",
    });
  }
});

// Obtener preguntas anónimas
app.get("/api/anonymous-questions", (_req, res) => {
  res.json({ questions: anonymousQuestions });
});

// Registrar preguntas anónimas
app.post("/api/anonymous-questions", (req, res) => {
  const { topic, question, ageGroup } = req.body ?? {};

  if (
    typeof question !== "string" ||
    question.trim().length < 5
  ) {
    return res.status(400).json({
      error: "La pregunta debe tener al menos 5 caracteres",
    });
  }

  const newQuestion: AnonymousQuestion = {
    id: `aq-${Date.now()}`,
    topic: topic || "Duda General",
    question: question.trim(),
    createdAt: new Date().toISOString(),
    answered: true,
    ageGroup: ageGroup || "Adolescente",
    specialistAnswer:
      "¡Hola! Tu pregunta ha sido recibida por nuestro equipo de especialistas. Si es una duda urgente, puedes consultar a Navi en el chat o llamar a los servicios de orientación correspondientes.",
  };

  anonymousQuestions.unshift(newQuestion);

  return res.json({
    success: true,
    question: newQuestion,
  });
});

// Iniciar servidor y conectar Vite
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

    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
