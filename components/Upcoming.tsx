import { upcoming } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Upcoming() {
  return (
    <section id="upcoming" className="section pt-0">
      <div className="container-x">
        <SectionHead
          kicker="10 — What's next"
          title={
            <>
              More is <span className="grad-text">on the way</span>.
            </>
          }
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {upcoming.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="glass glass-hover flex h-full items-start gap-4 rounded-2xl p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--surface-1)] text-xl">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-bold text-[var(--color-fg)]">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-300">
                      <span className="live-dot" />
                      Coming soon
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
