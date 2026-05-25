export interface AnalysisResult {
  object: string;
  category: "Reciclable" | "Orgánico" | "No reciclable" | "Peligroso";
  container: string;
  containerColor: "blue" | "green" | "gray" | "orange" | "red";
  degradation: string;
  material: string;
  confidence: number;
  recommendation: string;
  imageUrl?: string; // URL pública de la imagen en Azure
  fileName?: string; // Nombre del archivo en Azure
  analysisDate?: string; // Fecha del análisis
}

export type AppState = "idle" | "preview" | "loading" | "result" | "error";
