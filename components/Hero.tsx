"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import Orchestrator from "./Orchestrator";

const pills = [
  { name: "ClickHouse", logo: "clickhouse" },
  { name: "Spark", logo: "spark" },
  { name: "Airflow", logo: "airflow" },
  { name: "AWS", logo: "aws" },
  { name: "dbt", logo: "dbt" },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div>
          <motion.span
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--surface-1)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-muted)]"
          >
            <span className="live-dot" />
            {profile.role} · {profile.location}
          </motion.span>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-5 text-balance text-[clamp(2.4rem,6vw,4.25rem)] font-extrabold leading-[1.04] tracking-tight"
          >
            Building data platforms that are{" "}
            <span className="grad-text">fast, reliable &amp; cheap</span> to run.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-[var(--color-muted)]"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#experience"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-[var(--on-accent)] shadow-[0_12px_36px_-10px_rgba(34,211,238,0.6)] transition hover:brightness-110"
            >
              View my work
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-[var(--color-border)] px-6 py-3.5 text-sm font-semibold text-[var(--fg-soft)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-2.5"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
              Working across
            </span>
            {pills.map((p) => (
              <span
                key={p.name}
                title={p.name}
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-900/5 bg-[#f8fafc] p-1.5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={`/logos/${p.logo}.svg`}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </span>
            ))}
          </motion.div>
        </div>

        {/* visual */}
        <div className="lg:pl-4">
          <Orchestrator />
        </div>
      </div>

      {/* scroll hint */}
      <a
        href="#impact"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-[var(--border-strong)] p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-cyan-300"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </a>
    </section>
  );
}
