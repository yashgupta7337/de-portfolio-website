"use client";

import { motion, useReducedMotion } from "framer-motion";
import { impactStats } from "@/lib/content";
import Counter from "./Counter";
import Reveal from "./Reveal";

/** Green pyramid (triangle) that bobs a little in its improvement direction. */
function Pyramid({ dir, reduce }: { dir: "up" | "down"; reduce: boolean | null }) {
  const dy = dir === "up" ? -2.2 : 2.2;
  return (
    <motion.svg
      width="0.6em"
      height="0.6em"
      viewBox="0 0 16 16"
      aria-hidden
      className="shrink-0"
      style={{ filter: "drop-shadow(0 0 5px rgba(52,211,153,0.75))" }}
      animate={reduce ? undefined : { y: [0, dy, 0], x: [0, 0.4, 0] }}
      transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d={dir === "up" ? "M8 1.5 L14.5 14 H1.5 Z" : "M1.5 2 H14.5 L8 14.5 Z"}
        fill="#34d399"
      />
    </motion.svg>
  );
}

/** Descending trend line for "reduction" metrics (high → low = better). */
function TrendLine({ after, from, to }: { after: number; from: string; to: string }) {
  const y0 = 7; // start high
  const y1 = 7 + (1 - after) * 24; // end lower the bigger the cut
  const line = `M2 ${y0} C 38 ${y0}, 58 ${y1.toFixed(1)}, 98 ${y1.toFixed(1)}`;
  const area = `${line} L98 36 L2 36 Z`;
  const gid = `tl-${from}-${to}`.replace(/[^a-z0-9]/gi, "");
  return (
    <div className="mt-3 px-3">
      <svg viewBox="0 0 100 40" className="h-12 w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={`${gid}-s`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id={`${gid}-f`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.22)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill={`url(#${gid}-f)`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={`url(#${gid}-s)`}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="98"
          cy={y1}
          r="2.6"
          fill="#67e8f9"
          style={{ filter: "drop-shadow(0 0 4px rgba(34,211,238,0.9))" }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.85 }}
        />
      </svg>
      <div className="-mt-0.5 flex items-center justify-between font-mono text-[0.6rem]">
        <span className="text-rose-400/90 drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]">
          {from}
        </span>
        <span className="font-semibold text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]">
          {to}
        </span>
      </div>
    </div>
  );
}

/** Live, continuously scrolling line that stays high — depicts 100% uptime. */
function UptimeLine() {
  // Gentle ripple around a high baseline, period 50 so a -100 scroll loops seamlessly.
  const wave =
    "M0 11 Q 12.5 8 25 11 T 50 11 T 75 11 T 100 11 T 125 11 T 150 11 T 175 11 T 200 11";
  const fill = `${wave} L200 36 L0 36 Z`;
  // Leading dot sits exactly at the line's head (x=100). The wave value there
  // is 11 - 3·sin(4π·u) over one loop, sampled at 1/24 steps. Both this and the
  // scroll share the SVG clock, so the dot stays glued to the line head.
  const dotCy =
    "11;9.5;8.4;8;8.4;9.5;11;12.5;13.6;14;13.6;12.5;11;9.5;8.4;8;8.4;9.5;11;12.5;13.6;14;13.6;12.5;11";
  const keyTimes =
    "0;0.0417;0.0833;0.125;0.1667;0.2083;0.25;0.2917;0.3333;0.375;0.4167;0.4583;0.5;0.5417;0.5833;0.625;0.6667;0.7083;0.75;0.7917;0.8333;0.875;0.9167;0.9583;1";
  return (
    <div className="mt-3 px-3">
      <svg viewBox="0 0 100 40" className="h-12 w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="ut-f" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(52,211,153,0.28)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0)" />
          </linearGradient>
          <clipPath id="ut-clip">
            <rect x="0" y="0" width="100" height="40" />
          </clipPath>
        </defs>
        <g clipPath="url(#ut-clip)">
          <g>
            <path d={fill} fill="url(#ut-f)" />
            <path
              d={wave}
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 3px rgba(52,211,153,0.7))" }}
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; -100 0"
              dur="3.6s"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </g>
        </g>
        {/* leading dot — sits on the head of the line at the live edge */}
        <circle
          cx="100"
          r="2.6"
          fill="#ecfdf5"
          style={{ filter: "drop-shadow(0 0 5px rgba(52,211,153,0.95))" }}
        >
          <animate
            attributeName="cy"
            values={dotCy}
            keyTimes={keyTimes}
            dur="3.6s"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div className="-mt-0.5 flex items-center justify-between font-mono text-[0.6rem]">
        <span className="flex items-center gap-1 font-semibold text-emerald-300 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          100% uptime
        </span>
        <span className="text-[var(--color-muted)]">0 drops</span>
      </div>
    </div>
  );
}

export default function ImpactStats() {
  const reduce = useReducedMotion();
  return (
    <section id="impact" className="relative py-10">
      <div className="container-x">
        <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl border-0 bg-[var(--color-border)] md:grid-cols-4">
          {impactStats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="bg-[var(--color-ink-2)]/80 px-6 py-8 text-center backdrop-blur"
            >
              <div className="flex items-center justify-center gap-1.5 text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-tight">
                <Counter to={s.value} suffix={s.suffix} className="grad-text" />
                <Pyramid dir={s.dir} reduce={reduce} />
              </div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">
                {s.label}
              </div>
              {"live" in s && s.live ? (
                <UptimeLine />
              ) : (
                <TrendLine after={s.after} from={s.from} to={s.to} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
