import { profile } from "@/lib/content";
import Reveal from "./Reveal";
import { ResumeButton } from "./ResumeViewer";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] p-8 text-center md:p-14">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.25),transparent_70%)] blur-2xl" />

            <span className="kicker">05 — Contact</span>
            <h2 className="mx-auto mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold leading-tight tracking-tight">
              Let&apos;s build something <span className="grad-text">reliable</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--color-muted)]">
              Open to data engineering roles &amp; interesting platform problems.
              The fastest way to reach me is email.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-w-0 max-w-full items-center gap-2 break-all rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-[var(--on-accent)] shadow-[0_12px_36px_-10px_rgba(34,211,238,0.6)] transition hover:brightness-110"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path
                    d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {profile.email}
              </a>
              <ResumeButton className="rounded-xl border border-[var(--color-border)] px-6 py-3.5 text-sm font-semibold text-[var(--fg-soft)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]">
                View resume
              </ResumeButton>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[var(--color-muted)]">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener"
                className="transition hover:text-cyan-300"
              >
                LinkedIn
              </a>
              <span className="opacity-40">·</span>
              <a
                href={`tel:${profile.phoneHref}`}
                className="transition hover:text-cyan-300"
              >
                {profile.phone}
              </a>
              <span className="opacity-40">·</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
