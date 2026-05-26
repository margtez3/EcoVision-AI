import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImageIcon, X } from "lucide-react";

interface UploadBoxProps {
  onImageReady: (file: File, preview: string) => void;
  onAnalyze: () => void;
  preview: string | null;
  isLoading: boolean;
  onReset: () => void;
}

export default function UploadBox({
  onImageReady,
  onAnalyze,
  preview,
  isLoading,
  onReset,
}: UploadBoxProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      onImageReady(file, url);
      setDragActive(false);
    },
    [onImageReady],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".heic"] },
    maxFiles: 1,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  return (
    <div className="max-w-lg mx-auto px-6">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
              transition-all duration-200
              ${
                dragActive
                  ? "border-green-400 bg-green-950/30"
                  : "border-green-900/40 bg-[#111811] hover:border-green-700/60 hover:bg-green-950/10"
              }
            `}
          >
            <input {...getInputProps()} />
            <div className="w-14 h-14 rounded-2xl bg-green-950/60 border border-green-800/40 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-display font-bold text-base text-green-50 mb-1.5">
              Arrastra tu imagen aquí
            </h3>
            <p className="text-green-700 text-sm mb-5">
              o haz clic para seleccionar
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-400 text-green-950 font-semibold text-sm rounded-xl hover:bg-green-300 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              Seleccionar imagen
            </button>
            <div className="flex gap-2 justify-center mt-4 flex-wrap">
              {["JPG", "PNG", "WEBP", "HEIC"].map((f) => (
                <span
                  key={f}
                  className="font-mono text-[10px] text-green-800 border border-green-900/50 bg-green-950/30 px-2 py-0.5 rounded"
                >
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="bg-[#111811] border border-green-900/30 rounded-2xl overflow-hidden"
          >
            <div className="relative">
              <img
                src={preview}
                alt="Vista previa"
                className="w-full max-h-64 object-cover"
              />
              <button
                onClick={onReset}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <button
                onClick={onAnalyze}
                disabled={isLoading}
                className="w-full py-3.5 bg-green-400 text-green-950 font-display font-bold text-sm rounded-xl hover:bg-green-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? "Analizando…" : "⚡ Analizar imagen"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
