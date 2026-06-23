"use client";

import { motion } from "framer-motion";

const bars = [90, 62, 78, 45, 84, 70, 96, 58];

const logs = [
  { kind: "ok", text: "medallion · bronze → silver → gold synced" },
  { kind: "ok", text: "300GB DocumentDB → Aurora · 0 downtime" },
  { kind: "run", text: "dbt run · 124 models building…" },
];

function Node({
  badge,
  label,
  tone,
}: {
  badge: string;
  label: string;
  tone: "blue" | "cyan" | "emerald";
}) {
  const tones = {
    blue: "from-blue-500/30 to-blue-500/5 text-blue-200 border-blue-400/30",
    cyan: "from-cyan-400/30 to-cyan-400/5 text-cyan-100 border-cyan-300/30",
    emerald:
      "from-emerald-500/30 to-emerald-500/5 text-emerald-100 border-emerald-400/30",
  }[tone];
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`grid h-12 w-12 place-items-center rounded-2xl border bg-gradient-to-br ${tones} font-mono text-sm font-bold backdrop-blur`}
      >
        {badge}
      </div>
      <span className="text-[0.65rem] text-[var(--color-muted)]">{label}</span>
    </div>
  );
}

export default function Orchestrator() {
  return (
    <div className="relative">
      {/* glow behind */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.25),transparent_70%)] blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="panel-dark glass w-full rounded-[1.75rem] p-5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        {/* header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-mono text-sm font-semibold">
            <span className="live-dot" />
            Data Platform Orchestrator
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-medium text-emerald-300">
            All systems healthy
          </span>
        </div>

        {/* pipeline */}
        <div className="mb-5 flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-black/20 px-4 py-4">
          <Node badge="S3" label="Ingest" tone="blue" />
          <div className="flow-line mx-1 h-0.5 flex-1" />
          <Node badge="⚡" label="Spark / EMR" tone="cyan" />
          <div className="flow-line mx-1 h-0.5 flex-1" />
          <Node badge="CH" label="ClickHouse" tone="emerald" />
        </div>

        {/* stat tiles */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white/[0.03] p-3.5">
            <div className="text-[0.65rem] uppercase tracking-wider text-[var(--color-muted)]">
              Query SLA
            </div>
            <div className="mt-1 font-mono text-2xl font-bold">
              <span className="text-white/40 line-through decoration-rose-400/60">
                60s
              </span>{" "}
              <span className="grad-text">5s</span>
            </div>
            <div className="mt-0.5 text-[0.7rem] text-emerald-400">
              ↓ 12× faster
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--color-border)] bg-white/[0.03] p-3.5">
            <div className="text-[0.65rem] uppercase tracking-wider text-[var(--color-muted)]">
              Cost saved
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-white">
              40<span className="text-cyan-300">%</span>
            </div>
            <div className="mt-0.5 text-[0.7rem] text-emerald-400">
              ▼ Aurora spend
            </div>
          </div>
        </div>

        {/* chart */}
        <div className="mb-4 rounded-2xl border border-[var(--color-border)] bg-black/20 p-3.5">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="text-[var(--color-muted)]">Latency reduction</span>
            <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 font-mono text-[0.6rem] text-cyan-300">
              live
            </span>
          </div>
          <div className="flex h-20 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-blue-500/60 to-cyan-300"
                style={{
                  height: `${h}%`,
                  animation: `barpulse ${2.2 + (i % 4) * 0.3}s ease-in-out ${
                    i * 0.12
                  }s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* logs */}
        <div className="space-y-1.5 font-mono text-[0.72rem]">
          {logs.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }}
              className="flex items-center gap-2 text-[var(--color-muted)]"
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  l.kind === "ok" ? "bg-emerald-400" : "bg-cyan-400 animate-pulse"
                }`}
              />
              {l.text}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
