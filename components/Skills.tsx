import { skills } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionHead kicker="03 — Stack" title="The tools I reach for." />

        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="glass glass-hover h-full rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--surface-1)] text-xl">
                    {s.icon}
                  </span>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-lg border border-[var(--color-border)] bg-[var(--surface-1)] px-3 py-1.5 font-mono text-xs text-[var(--fg-soft)] transition hover:border-cyan-400/40 hover:text-[var(--color-fg)]"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
