export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-green-900/30">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-base">
          ♻
        </div>
        <span className="font-display font-extrabold text-lg tracking-tight text-green-50">
          Eco<span className="text-green-400">Vision</span> AI
        </span>
      </div>
      <span className="font-mono text-[11px] text-green-400 border border-green-800/50 bg-green-950/40 px-3 py-1 rounded-full">
        MVP v0.1
      </span>
    </nav>
  );
}
