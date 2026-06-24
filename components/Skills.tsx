import { skills } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionHead kicker="05 — Stack" title="The tools I reach for." />

        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="glass glass-hover h-full rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--surface-1)] text-xl">
                    {s.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold leading-tight">{s.title}</h3>
                    <p className="mt-0.5 text-xs text-[var(--color-muted)]">{s.use}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {s.items.map((it) => (
                    <div key={it.name} className="group relative">
                      <div
                        title={it.name}
                        className="grid h-14 w-14 place-items-center rounded-2xl border border-slate-900/5 bg-[#f8fafc] p-2.5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(34,211,238,0.45)] hover:ring-2 hover:ring-cyan-400/60"
                      >
                        <img
                          src={`/logos/${it.logo}.svg`}
                          alt={it.name}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 max-w-[8rem] -translate-x-1/2 whitespace-normal break-words rounded-lg bg-[var(--color-fg)] px-2.5 py-1 text-center text-xs font-medium leading-tight text-[var(--color-ink)] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                      >
                        {it.name}
                      </span>
                    </div>
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
