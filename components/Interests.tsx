import { interests } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Interests() {
  return (
    <section id="interests" className="section">
      <div className="container-x">
        <SectionHead
          kicker="08 — Beyond the terminal"
          title="What I do when I'm not building pipelines."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {interests.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="glass glass-hover flex items-start gap-3 rounded-2xl px-4 py-3.5">
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--color-border)] ${
                    item.logo ? "bg-white p-1.5" : "bg-[var(--surface-1)] text-lg"
                  }`}
                >
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    item.icon
                  )}
                </span>
                <p className="min-w-0 text-sm">
                  <span className="font-semibold text-[var(--color-fg)]">
                    {item.title}
                  </span>
                  <span className="text-[var(--color-muted)]"> — {item.body}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
