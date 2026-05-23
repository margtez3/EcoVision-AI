export interface AnalysisResult {
  object: string;
  category: "Reciclable" | "Orgánico" | "No reciclable" | "Peligroso";
  container: string;
  containerColor: "blue" | "green" | "gray" | "orange" | "red";
  degradation: string;
  material: string;
  confidence: number;
  recommendation: string;
}

export type AppState = "idle" | "preview" | "loading" | "result" | "error";
