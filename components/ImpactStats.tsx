"use client";

import { impactStats } from "@/lib/content";
import Counter from "./Counter";
import Reveal from "./Reveal";

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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
