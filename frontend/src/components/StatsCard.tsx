interface StatsCardProps {
  label: string;
  value: string;
  accent?: string;
}

export default function StatsCard({ label, value, accent }: StatsCardProps) {
  return (
    <div className="bg-white/[0.02] border border-green-900/30 rounded-xl p-3">
      <p className="font-mono text-[10px] text-green-800 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className={`text-sm font-medium text-green-50 ${accent || ""}`}>
        {value}
      </p>
    </div>
  );
}
