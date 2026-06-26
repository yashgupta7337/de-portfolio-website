"use client";

import { motion, useReducedMotion } from "framer-motion";

const W = 600;
const H = 260;
// Asymmetric padding leaves room for the y-axis labels (left) and the
// x-axis date labels (bottom) so nothing overflows the plot.
const PL = 46;
const PR = 16;
const PT = 14;
const PB = 26;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2024-03-15" → "Mar '24" without relying on Date (stable on server + client).
function fmtDate(s: string) {
  const [y, m] = s.split("-");
  const mi = Number(m) - 1;
  const mon = MONTHS[mi] ?? m;
  return y ? `${mon} '${y.slice(2)}` : s;
}

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

  const sx = (i: number) => PL + (i / (n - 1)) * (W - PL - PR);
  const sy = (v: number) => PT + (1 - (v - min) / (max - min)) * (H - PT - PB);

  const linePath = primary.map((v, i) => `${i ? "L" : "M"}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${sx(n - 1).toFixed(1)} ${H - PB} L${sx(0).toFixed(1)} ${H - PB} Z`;
  const overlayPath = overlay
    ? overlay.values
        .map((v, i) => (v == null ? null : `${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`))
        .filter(Boolean)
        .map((p, i) => `${i ? "L" : "M"}${p}`)
        .join(" ")
    : "";

  const zeroY = sy(0);
  const barW = Math.max(1.2, ((W - PL - PR) / n) * 0.66);

  // y-axis ticks (top → bottom)
  const yFmt = (v: number) =>
    mode === "returns"
      ? `${v > 0 ? "+" : ""}${v.toFixed(1)}%`
      : `$${v >= 100 ? Math.round(v) : v.toFixed(1)}`;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((g) => ({
    y: PT + g * (H - PT - PB),
    v: max - g * (max - min),
  }));

  // x-axis ticks — evenly spaced indices, de-duplicated
  const tCount = Math.min(5, n);
  const xIdx = Array.from(
    new Set(Array.from({ length: tCount }, (_, k) => Math.round((k / (tCount - 1)) * (n - 1))))
  );

  const legend =
    mode === "returns"
      ? [
          { label: "Gain", color: "#10b981" },
          { label: "Loss", color: "#f43f5e" },
        ]
      : [
          { label: "Close", color: accent },
          ...(overlay ? [{ label: overlay.label, color: "#f87171", dashed: true }] : []),
        ];

  return (
    <div>
      {/* legend */}
      <div className="mb-2 flex flex-wrap items-center justify-end gap-x-4 gap-y-1 px-1 text-[0.7rem] text-[var(--color-muted)]">
        {legend.map((l) => {
          const dashed = "dashed" in l && l.dashed;
          return (
            <span key={l.label} className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block rounded-full"
                style={{
                  width: 14,
                  height: dashed ? 0 : 4,
                  background: dashed ? "none" : l.color,
                  borderTop: dashed ? `2px dashed ${l.color}` : undefined,
                }}
              />
              {l.label}
            </span>
          );
        })}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Pipeline output chart">
        <defs>
          <linearGradient id="pg-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* horizontal gridlines + y-axis labels */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line
              x1={PL}
              x2={W - PR}
              y1={t.y}
              y2={t.y}
              stroke="var(--color-border)"
              strokeWidth="1"
            />
            <text
              x={PL - 8}
              y={t.y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="11"
              fill="var(--color-muted)"
              className="font-mono tabular-nums"
            >
              {yFmt(t.v)}
            </text>
          </g>
        ))}

        {/* x-axis labels */}
        {xIdx.map((i, k) => (
          <text
            key={i}
            x={sx(i)}
            y={H - PB + 16}
            textAnchor={k === 0 ? "start" : k === xIdx.length - 1 ? "end" : "middle"}
            fontSize="11"
            fill="var(--color-muted)"
            className="font-mono"
          >
            {fmtDate(x[i])}
          </text>
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
    </div>
  );
}
