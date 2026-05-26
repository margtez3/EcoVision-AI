import { motion } from "framer-motion";

const steps = [
  "Detectando objeto…",
  "Clasificando material…",
  "Calculando impacto ambiental…",
  "Generando recomendación…",
];

export default function Loader() {
  return (
    <motion.div
      className="max-w-lg mx-auto px-6 py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 border-2 border-green-900/30 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-green-400 rounded-full animate-spin" />
        <div className="absolute inset-2 border-2 border-transparent border-t-green-600 rounded-full animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <motion.p
            key={step}
            className="font-mono text-[12px] text-green-700"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 + 0.2, duration: 0.3 }}
          >
            {step}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
