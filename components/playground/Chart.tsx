"use client";

import { motion, useReducedMotion } from "framer-motion";

const W = 600;
const H = 260;
const PX = 10;
const PY = 16;

type Props = {
  x: string[];
  primary: number[];
  overlay: { label: string; values: (number | null)[] } | null;
  mode: "price" | "returns";
  accent: string;
  runKey: number;
};

export default function Chart({ x, primary, overlay, mode, accent, runKey }: Props) {
  const reduce = useReducedMotion();
  const n = primary.length;
  if (n < 2) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm text-[var(--color-muted)]">
        Not enough rows to plot — loosen a filter.
      </div>
    );
  }

  const all = [
    ...primary,
    ...(overlay ? overlay.values.filter((v): v is number => v != null) : []),
  ];
  let min = Math.min(...all);
  let max = Math.max(...all);
  if (mode === "returns") {
    const m = Math.max(Math.abs(min), Math.abs(max), 0.5);
    min = -m;
    max = m;
  }
  if (min === max) max = min + 1;

  const sx = (i: number) => PX + (i / (n - 1)) * (W - 2 * PX);
  const sy = (v: number) => PY + (1 - (v - min) / (max - min)) * (H - 2 * PY);

  const linePath = primary.map((v, i) => `${i ? "L" : "M"}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${sx(n - 1).toFixed(1)} ${H - PY} L${sx(0).toFixed(1)} ${H - PY} Z`;
  const overlayPath = overlay
    ? overlay.values
        .map((v, i) => (v == null ? null : `${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`))
        .filter(Boolean)
        .map((p, i) => `${i ? "L" : "M"}${p}`)
        .join(" ")
    : "";

  const zeroY = sy(0);
  const barW = Math.max(1.2, ((W - 2 * PX) / n) * 0.66);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Pipeline output chart">
      <defs>
        <linearGradient id="pg-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* gridlines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={PX} x2={W - PX} y1={PY + g * (H - 2 * PY)} y2={PY + g * (H - 2 * PY)} stroke="var(--color-border)" strokeWidth="1" />
      ))}

      {mode === "returns" ? (
        primary.map((v, i) => {
          const h = Math.abs(zeroY - sy(v));
          const y = v >= 0 ? sy(v) : zeroY;
          return (
            <motion.rect
              key={`${runKey}-${i}`}
              x={sx(i) - barW / 2}
              width={barW}
              y={y}
              height={Math.max(h, 0.5)}
              rx={0.8}
              fill={v >= 0 ? "#10b981" : "#f43f5e"}
              style={{ transformOrigin: `${sx(i)}px ${zeroY}px` }}
              initial={{ scaleY: 0, opacity: 0.4 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.004, 0.4), ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })
      ) : (
        <>
          <motion.path
            key={`a-${runKey}`}
            d={areaPath}
            fill="url(#pg-area)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.path
            key={`l-${runKey}`}
            d={linePath}
            fill="none"
            stroke={accent}
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
          {overlay && (
            <>
              <motion.path
                id="pg-ma-path"
                key={`o-${runKey}`}
                d={overlayPath}
                fill="none"
                stroke="#f87171"
                strokeOpacity="0.85"
                strokeWidth="1.8"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.25, ease: "easeInOut" }}
              />
              {/* data packets travelling along the moving-average curve */}
              {!reduce &&
                [0, 0.9, 1.8].map((begin, k) => (
                  <circle
                    key={`mp-${runKey}-${k}`}
                    r="2.4"
                    fill="#fee2e2"
                    style={{ filter: "drop-shadow(0 0 4px rgba(239,68,68,0.95))" }}
                  >
                    <animateMotion
                      dur="2.7s"
                      begin={`${begin}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath xlinkHref="#pg-ma-path" />
                    </animateMotion>
                  </circle>
                ))}
            </>
          )}
          <motion.circle
            key={`d-${runKey}`}
            cx={sx(n - 1)}
            cy={sy(primary[n - 1])}
            r="3.5"
            fill={accent}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.05, type: "spring", stiffness: 300 }}
          />
        </>
      )}
    </svg>
  );
}
