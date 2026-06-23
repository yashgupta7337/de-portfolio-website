import { interests } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Interests() {
  return (
    <section id="interests" className="section">
      <div className="container-x">
        <SectionHead
          kicker="06 — Beyond the terminal"
          title="What I do when I'm not building pipelines."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="glass glass-hover flex h-full flex-col gap-3 rounded-2xl p-5">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-semibold text-[var(--color-fg)]">
                  {item.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
