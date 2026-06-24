"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const packetClass =
  "absolute h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]";
const packetTransition = (delay: number) => ({
  duration: 1.6,
  repeat: Infinity,
  ease: "easeInOut" as const,
  delay,
  times: [0, 0.15, 0.85, 1],
});

type Layer = {
  key: string;
  name: string;
  role: string;
  desc: string;
  tools: string[];
  disc: string; // gradient for the medallion disc
  ring: string; // active ring color
  text: string; // accent text color
};

const layers: Layer[] = [
  {
    key: "bronze",
    name: "Bronze",
    role: "Raw landing",
    desc: "Raw data lands exactly as it arrives — from S3 drops, DMS change-data-capture streams and source databases. Immutable, replayable, schema-on-read.",
    tools: ["S3", "DMS", "Glue"],
    disc: "from-amber-600 to-orange-800",
    ring: "ring-amber-400/70",
    text: "text-amber-300",
  },
  {
    key: "silver",
    name: "Silver",
    role: "Cleansed & conformed",
    desc: "Spark on EMR with Apache Hudi dedupes, conforms and upserts the raw feeds into governed, query-ready tables — with time-travel and incremental processing.",
    tools: ["Spark", "EMR", "Hudi"],
    disc: "from-slate-300 to-slate-500",
    ring: "ring-slate-200/70",
    text: "text-slate-200",
  },
  {
    key: "gold",
    name: "Gold",
    role: "Serving layer",
    desc: "Curated marts and rollups served from ClickHouse — the sub-5-second layer that powers dashboards, alerting and every downstream consumer.",
    tools: ["ClickHouse", "Airflow", "dbt"],
    disc: "from-yellow-300 to-amber-500",
    ring: "ring-yellow-300/80",
    text: "text-yellow-200",
  },
];

export default function Medallion() {
  const [active, setActive] = useState(2);
  const layer = layers[active];

  return (
    <section id="architecture" className="section">
      <div className="container-x">
        <SectionHead
          kicker="04 — Architecture"
          title={
            <>
              How a <span className="grad-text">medallion lakehouse</span> flows.
            </>
          }
        />

        <Reveal>
          <div className="panel-dark glass rounded-[1.75rem] p-5 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)] sm:p-7">
            {/* stage selector */}
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              {layers.map((l, i) => (
                <div
                  key={l.key}
                  className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                      active === i
                        ? "border-[var(--border-strong)] bg-white/[0.06]"
                        : "border-[var(--color-border)] bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${l.disc} font-mono text-xs font-bold text-black/70 shadow-md ring-2 transition ${
                        active === i ? l.ring : "ring-transparent"
                      }`}
                    >
                      {l.name[0]}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold">{l.name}</span>
                      <span className="block truncate text-[0.7rem] text-[var(--color-muted)]">
                        {l.role}
                      </span>
                    </span>
                  </button>
                  {i < layers.length - 1 && (
                    <>
                      {/* mobile vertical connector */}
                      <span className="relative flex h-4 w-0.5 shrink-0 sm:hidden">
                        <span className="flow-line-v absolute inset-0" />
                        <motion.span
                          className={`${packetClass} left-1/2 -translate-x-1/2`}
                          animate={{ top: ["-25%", "100%"], opacity: [0, 1, 1, 0] }}
                          transition={packetTransition(i * 0.45)}
                        />
                      </span>
                      {/* desktop horizontal connector */}
                      <span className="relative hidden h-0.5 w-6 shrink-0 sm:block">
                        <span className="flow-line absolute inset-0" />
                        <motion.span
                          className={`${packetClass} top-1/2 -translate-y-1/2`}
                          animate={{ left: ["-25%", "100%"], opacity: [0, 1, 1, 0] }}
                          transition={packetTransition(i * 0.45)}
                        />
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={layer.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 rounded-2xl border border-[var(--color-border)] bg-black/20 p-5"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${layer.text}`}>
                    {layer.name}
                  </span>
                  <span className="text-[var(--color-muted)]">·</span>
                  <span className="text-sm text-[var(--color-muted)]">
                    {layer.role}
                  </span>
                </div>
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[var(--fg-soft)]">
                  {layer.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {layer.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[var(--color-border)] bg-white/[0.04] px-2.5 py-1 font-mono text-[0.65rem] text-[var(--fg-soft)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
