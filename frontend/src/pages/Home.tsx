import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "../components/HeroSection";
import UploadBox from "../components/UploadBox";
import Loader from "../components/Loader";
import ResultCard from "../components/ResultCard";
import { analyzeImage, mockResult } from "../services/api.service";
import type { AnalysisResult, AppState } from "../types/analysis";

const USE_MOCK = true; // Cambia a false cuando el backend esté listo

export default function Home() {
  const [state, setState] = useState<AppState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageReady = (f: File, url: string) => {
    setFile(f);
    setPreview(url);
    setState("preview");
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setState("loading");
    try {
      const data = USE_MOCK
        ? await new Promise<AnalysisResult>((res) =>
            setTimeout(() => res(mockResult), 2200),
          )
        : await analyzeImage(file);
      setResult(data);
      setState("result");
    } catch {
      setState("error");
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setState("idle");
  };

  return (
    <main className="min-h-screen bg-[#0a0f0a]">
      <HeroSection />

      <AnimatePresence mode="wait">
        {state === "loading" ? (
          <Loader key="loader" />
        ) : state === "result" && result ? (
          <ResultCard key="result" result={result} onReset={handleReset} />
        ) : (
          <UploadBox
            key="upload"
            onImageReady={handleImageReady}
            onAnalyze={handleAnalyze}
            preview={preview}
            isLoading={state === "loading"}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>

      {state === "error" && (
        <div className="text-center py-8">
          <p className="text-red-400 text-sm mb-3">
            Error al analizar la imagen.
          </p>
          <button
            onClick={handleReset}
            className="text-green-400 text-sm underline"
          >
            Intentar de nuevo
          </button>
        </div>
      )}
    </main>
  );
}
