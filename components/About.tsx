import { aboutCards } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHead
          kicker="01 — About"
          title={
            <>
              Strong ownership in{" "}
              <span className="grad-text">lean engineering</span> environments.
            </>
          }
        />

        <Reveal>
          <p className="max-w-3xl text-pretty text-lg leading-relaxed text-[var(--fg-soft)]">
            I&apos;m a Data Engineer who likes the hard, unglamorous problems:
            migrations that can&apos;t drop a row, warehouses that need to answer
            in seconds instead of minutes, and cloud bills that need to come down
            without anyone noticing a regression.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {aboutCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="glass glass-hover h-full rounded-3xl p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--surface-1)] text-2xl">
                  {c.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
