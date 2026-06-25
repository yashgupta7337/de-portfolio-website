"use client";

import { motion } from "framer-motion";
import { impactStats } from "@/lib/content";
import Counter from "./Counter";
import Reveal from "./Reveal";

function MiniBars({
  before,
  after,
  from,
  to,
}: {
  before: number;
  after: number;
  from: string;
  to: string;
}) {
  return (
    <div className="mt-4 flex items-end justify-center gap-2.5">
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-9 items-end">
          <motion.span
            className="w-3 origin-bottom rounded-t bg-[var(--border-strong)]"
            style={{ height: `${Math.max(before * 100, 4)}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="font-mono text-[0.6rem] text-rose-400/90">
          {from}
        </span>
      </div>

      <span className="mb-4 text-[var(--color-muted)]">→</span>

      <div className="flex flex-col items-center gap-1">
        <div className="flex h-9 items-end">
          <motion.span
            className="w-3 origin-bottom rounded-t bg-gradient-to-t from-blue-500 to-cyan-300"
            style={{ height: `${Math.max(after * 100, 4)}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="font-mono text-[0.6rem] font-semibold text-cyan-300">
          {to}
        </span>
      </div>
    </div>
  );
}

export default function ImpactStats() {
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
              <div className="font-mono text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-tight">
                <Counter to={s.value} suffix={s.suffix} className="grad-text" />
              </div>
              <div className="mt-1.5 text-sm text-[var(--color-muted)]">
                {s.label}
              </div>
              <MiniBars before={s.before} after={s.after} from={s.from} to={s.to} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
