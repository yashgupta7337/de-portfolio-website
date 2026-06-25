export function BarChartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="12" width="4.2" height="8" rx="1.2" fill="#3b82f6" />
      <rect x="9.9" y="6" width="4.2" height="14" rx="1.2" fill="#22d3ee" />
      <rect x="16.8" y="9" width="4.2" height="11" rx="1.2" fill="#10b981" />
    </svg>
  );
}
