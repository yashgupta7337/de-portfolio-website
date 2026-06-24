import { education } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container-x">
        <SectionHead kicker="04 — Education" title="Where it started." />
        <Reveal>
          <div className="glass glass-hover flex flex-wrap items-center gap-5 rounded-3xl p-6 md:p-7">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--surface-1)] text-2xl">
              🎓
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-bold">{education.degree}</h3>
              <p className="text-sm text-[var(--color-muted)]">
                {education.school} · {education.location}
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--color-muted)]">
              {education.date}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
