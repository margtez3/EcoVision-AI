import { Router, Request, Response } from "express";
import multer from "multer";
import axios from "axios";
import { azureConfig } from "../config/azure.config";
import { classifyWaste } from "../data/knowledge";

const router = Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post("/analyze", upload.any(), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const file = files?.[0];

    if (!file) {
      return res.status(400).json({ error: "No se recibio ninguna imagen" });
    }

    const { key, endpoint } = azureConfig.vision;
    const url = `${endpoint}/vision/v3.2/analyze?visualFeatures=Tags`;

    const response = await axios.post(
      url,
      file.buffer,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/octet-stream",
        },
      }
    );

    const tags: string[] = response.data.tags
      .filter((tag: any) => tag.confidence > 0.7)
      .map((tag: any) => tag.name);

    console.log("Tags detectados:", tags);

    const result = classifyWaste(tags);

    return res.json(result);

  } catch (error: any) {
    console.error("Error al analizar imagen:", error.message);
    return res.status(500).json({ error: "Error al procesar la imagen" });
  }
});

export default router;