import { experience } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import ExperiencePoints from "./ExperiencePoints";

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
                      <div>
                        <h3 className="text-xl font-bold">{e.role}</h3>
                        <span className="grad-text text-base font-semibold">
                          {e.company}
                        </span>
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
