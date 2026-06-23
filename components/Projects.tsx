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
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                        className="shrink-0 rounded-lg border border-[var(--color-border)] bg-[var(--surface-1)] p-2 text-[var(--color-muted)] transition hover:border-cyan-400/40 hover:text-[var(--color-fg)]"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
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
