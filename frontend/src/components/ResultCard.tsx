import { motion } from "framer-motion";
import { Lightbulb, RotateCcw } from "lucide-react";
import type { AnalysisResult } from "../types/analysis";
import StatsCard from "./StatsCard";

const categoryStyles: Record<AnalysisResult["category"], string> = {
  Reciclable: "bg-green-950/60 text-green-400 border-green-800/50",
  Orgánico: "bg-lime-950/60 text-lime-400 border-lime-800/50",
  "No reciclable": "bg-gray-900/60 text-gray-400 border-gray-700/50",
  Peligroso: "bg-red-950/60 text-red-400 border-red-900/50",
};

const containerColorMap: Record<string, string> = {
  blue: "text-blue-400",
  green: "text-green-400",
  gray: "text-gray-400",
  orange: "text-orange-400",
  red: "text-red-400",
};

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResultCard({ result, onReset }: ResultCardProps) {
  return (
    <motion.div
      className="max-w-lg mx-auto px-6 pb-12"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p className="font-mono text-[11px] text-green-800 uppercase tracking-widest mb-4 flex items-center gap-3">
        Análisis de resultado
        <span className="flex-1 h-px bg-green-900/40" />
      </p>

      <div className="bg-[#111811] border border-green-900/30 rounded-2xl p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-900/40 to-blue-900/20 border border-green-800/30 flex items-center justify-center text-2xl flex-shrink-0">
            🍾
          </div>
          <div>
            <h4 className="font-display font-bold text-[15px] text-green-50 mb-1">
              {result.object}
            </h4>
            <span
              className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg border ${categoryStyles[result.category]}`}
            >
              {result.category === "Reciclable"
                ? "✅"
                : result.category === "Orgánico"
                  ? "🌿"
                  : result.category === "Peligroso"
                    ? "⚠️"
                    : "🗑️"}
              &nbsp;{result.category}
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <StatsCard
            label="Contenedor"
            value={`● ${result.container}`}
            accent={containerColorMap[result.containerColor]}
          />
          <StatsCard
            label="Degradación"
            value={result.degradation}
            accent="text-orange-400"
          />
          <StatsCard label="Material" value={result.material} />
          <StatsCard
            label="Confianza IA"
            value={`${result.confidence}%`}
            accent="text-green-400"
          />
        </div>

        {/* Recommendation */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-green-950/30 border border-green-900/30">
          <Lightbulb className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-green-200 leading-relaxed">
            {result.recommendation}
          </p>
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 bg-green-400 text-green-950 font-display font-bold text-sm rounded-xl hover:bg-green-300 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Analizar nueva imagen
      </button>
    </motion.div>
  );
}
