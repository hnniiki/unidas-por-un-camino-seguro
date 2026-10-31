import { handleNaviChat } from "../lib/navi-chat.js";

export default async function handler(
  req: any,
  res: any
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const result = await handleNaviChat(req.body ?? {});

    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("API chat error:", error);

    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}
