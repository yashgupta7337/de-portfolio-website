import { experience } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import ExperiencePoints from "./ExperiencePoints";
import Counter from "./Counter";

const monogramAccent = {
  emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-400/30 text-emerald-200",
  violet: "from-violet-500/20 to-violet-500/5 border-violet-400/30 text-violet-200",
  blue: "from-blue-500/20 to-blue-500/5 border-blue-400/30 text-blue-200",
} as const;

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHead kicker="02 — Experience" title="Where I've shipped." />

        <div className="relative">
          {/* vertical line */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-blue-500/60 via-cyan-400/40 to-transparent md:left-[9px]" />

          <div className="space-y-7">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.08}>
                <div className="relative pl-9 md:pl-12">
                  {/* marker */}
                  <span className="absolute left-0 top-2 grid h-4 w-4 place-items-center rounded-full border-2 border-cyan-300 bg-[var(--color-ink)] md:h-[18px] md:w-[18px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  </span>

                  <div className="glass glass-hover rounded-3xl p-6 md:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border bg-gradient-to-br font-mono text-sm font-extrabold ${monogramAccent[e.accent]}`}
                        >
                          {e.monogram}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold">{e.role}</h3>
                          <span className="grad-text text-base font-semibold">
                            {e.company}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-[var(--fg-mute)]">{e.location}</div>
                        <div className="font-mono text-xs text-[var(--color-muted)]">
                          {e.date}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm italic text-[var(--color-muted)]">
                      {e.blurb}
                    </p>

                    {e.metrics && (
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {e.metrics.map((m) => (
                          <span
                            key={m.label}
                            className="inline-flex items-baseline gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--surface-1)] px-3 py-1.5"
                          >
                            <Counter
                              to={m.value}
                              suffix={m.suffix}
                              className="grad-text font-mono text-base font-extrabold"
                            />
                            <span className="text-xs text-[var(--color-muted)]">
                              {m.label}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}

                    <ExperiencePoints points={e.points} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
