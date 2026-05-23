//LOGICA DEL API SERVICE PARA FRONTEND ------------import axios from 'axios'
import axios from "axios";
import type { AnalysisResult } from "../types/analysis";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post<AnalysisResult>(
    `${API_BASE}/analyze`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
}

// Mock mientras el backend no exista
export const mockResult: AnalysisResult = {
  object: "Botella de plástico PET",
  category: "Reciclable",
  container: "Azul",
  containerColor: "blue",
  degradation: "450 años",
  material: "PET #1",
  confidence: 94,
  recommendation:
    "Lavar antes de reciclar y retirar la tapa. Depositar en contenedor azul sin aplastar para facilitar selección.",
};
