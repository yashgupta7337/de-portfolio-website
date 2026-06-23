"use client";

import { useEffect, useState } from "react";
import { profile, navLinks } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.5V23h-4V8z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled
            ? "nav-glass !px-4 py-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]"
            : "px-0 py-1"
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 font-mono text-base font-extrabold text-white shadow-lg">
            Y
          </span>
          <span className="text-[0.95rem] tracking-tight">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn profile"
            title="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] text-[var(--color-fg)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]"
          >
            <LinkedInIcon />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener"
            aria-label="GitHub profile"
            title="GitHub"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] text-[var(--color-fg)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]"
          >
            <GitHubIcon />
          </a>
          <ThemeToggle />
          <a
            href={profile.resume}
            download
            className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--fg-soft)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-[var(--on-accent)] shadow-[0_8px_24px_-8px_rgba(34,211,238,0.6)] transition hover:brightness-110"
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-[var(--color-border)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-5 bg-[var(--color-fg)] transition-all ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-[var(--color-fg)] transition-all ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-[var(--color-fg)] transition-all ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`container-x overflow-hidden transition-all duration-300 md:hidden ${
          open ? "mt-2 max-h-[28rem]" : "max-h-0"
        }`}
      >
        <nav className="glass flex flex-col rounded-2xl p-2">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-[var(--color-muted)] transition hover:bg-[var(--surface-1)] hover:text-[var(--color-fg)]"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-1 flex items-center gap-2 p-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn profile"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--color-border)] text-[var(--color-fg)]"
            >
              <LinkedInIcon />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub profile"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--color-border)] text-[var(--color-fg)]"
            >
              <GitHubIcon />
            </a>
            <ThemeToggle className="!h-11 !w-11 shrink-0" />
            <a
              href={profile.resume}
              download
              className="flex-1 rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-center text-sm font-medium"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2.5 text-center text-sm font-semibold text-[var(--on-accent)]"
            >
              Let&apos;s talk
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
