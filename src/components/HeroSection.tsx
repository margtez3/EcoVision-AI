import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center gap-2 font-mono text-[11px] text-green-400 bg-green-950/50 border border-green-800/40 rounded-full px-4 py-1.5 mb-6 tracking-wider">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        Clasificación con IA
      </div>

      <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.08] tracking-[-2px] text-green-50 mb-4">
        Clasifica residuos con{" "}
        <em className="not-italic text-green-400">inteligencia artificial</em>
      </h1>

      <p className="text-green-700 text-[15px] leading-relaxed max-w-md mx-auto">
        Sube una imagen y descubre cómo reciclarla correctamente. Rápido,
        preciso y sin complicaciones.
      </p>
    </motion.section>
  );
}
