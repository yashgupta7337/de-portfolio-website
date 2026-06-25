import { caseStudies } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const accentMap = {
  cyan: {
    chip: "border-cyan-300/30 bg-cyan-400/10 text-cyan-200",
    to: "text-cyan-300",
    glow: "from-cyan-400/15",
  },
  emerald: {
    chip: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    to: "text-emerald-300",
    glow: "from-emerald-400/15",
  },
  violet: {
    chip: "border-violet-300/30 bg-violet-500/10 text-violet-200",
    to: "text-violet-300",
    glow: "from-violet-400/15",
  },
} as const;

export default function CaseStudies() {
  return (
    <section id="work" className="section">
      <div className="container-x">
        <SectionHead
          kicker="03 — Selected work"
          title={
            <>
              The migrations behind the <span className="grad-text">numbers</span>.
            </>
          }
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((c, i) => {
            const a = accentMap[c.accent];
            return (
              <Reveal key={c.title} delay={i * 0.1}>
                <article className="glass glass-hover relative flex h-full flex-col overflow-hidden rounded-3xl p-6">
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-2xl`}
                  />

                  <span
                    className={`inline-flex w-fit items-center rounded-full border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-wider ${a.chip}`}
                  >
                    {c.tag}
                  </span>

                  <h3 className="mt-4 text-lg font-bold leading-snug">{c.title}</h3>

                  {/* before → after metric */}
                  <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--surface-1)] p-3.5">
                    <span className="font-mono text-lg font-bold text-rose-400">
                      {c.metric.from}
                    </span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 text-[var(--color-muted)]"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={`font-mono text-2xl font-extrabold ${a.to}`}>
                      {c.metric.to}
                    </span>
                    <span className="ml-auto text-right text-[0.7rem] leading-tight text-[var(--color-muted)]">
                      {c.metric.delta}
                      <br />
                      {c.metric.label}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--fg-soft)]">
                    {c.problem}
                  </p>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    {c.approach}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[var(--color-border)] bg-[var(--surface-1)] px-2.5 py-1 font-mono text-[0.65rem] text-[var(--fg-mute)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
