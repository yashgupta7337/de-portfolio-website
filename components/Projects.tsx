import { projects } from "@/lib/content";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

function PipelineVisual({ flow }: { flow: string[] }) {
  return (
    <div className="panel-dark flex h-36 items-center justify-center gap-1.5 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10 px-3">
      {flow.map((node, i) => (
        <div key={node} className="flex items-center gap-1.5">
          <span className="rounded-lg border border-cyan-300/30 bg-black/30 px-2.5 py-1.5 font-mono text-[0.65rem] text-cyan-100 backdrop-blur">
            {node}
          </span>
          {i < flow.length - 1 && <span className="flow-line h-0.5 w-5" />}
        </div>
      ))}
    </div>
  );
}

function GanVisual({ flow }: { flow: string[] }) {
  return (
    <div className="panel-dark flex h-36 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-violet-500/10 via-transparent to-emerald-400/10 px-3 font-mono text-[0.7rem]">
      <span className="rounded-lg border border-violet-300/30 bg-black/30 px-2.5 py-1.5 text-violet-200">
        {flow[0]}
      </span>
      <span className="text-white/50">+</span>
      <span className="rounded-lg border border-blue-300/30 bg-black/30 px-2.5 py-1.5 text-blue-200">
        {flow[1]}
      </span>
      <span className="flow-line h-0.5 w-6" />
      <span className="rounded-lg border border-emerald-300/40 bg-emerald-500/10 px-2.5 py-1.5 font-semibold text-emerald-200">
        {flow[2]}
      </span>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHead kicker="04 — Projects" title="Things I've built for fun." />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="glass glass-hover flex h-full flex-col rounded-3xl p-5">
                {p.kind === "pipeline" ? (
                  <PipelineVisual flow={p.flow} />
                ) : (
                  <GanVisual flow={p.flow} />
                )}

                <div className="flex flex-1 flex-col p-2 pt-5">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    {p.body}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[var(--color-border)] bg-[var(--surface-1)] px-2.5 py-1 font-mono text-[0.65rem] text-[var(--fg-mute)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
