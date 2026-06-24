"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Top" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "architecture", label: "Architecture" },
  { id: "skills", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "interests", label: "Interests" },
  { id: "contact", label: "Contact" },
];

export default function ScrollRail() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const activeIdx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <nav
      aria-label="Section progress"
      className="fixed left-2 top-1/2 z-40 -translate-y-1/2 sm:left-3"
    >
      <ul className="relative flex flex-col items-center gap-3.5">
        {/* track */}
        <span className="absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2 bg-[var(--color-border)]" />
        {SECTIONS.map((s, i) => {
          const isActive = i === activeIdx;
          const passed = i <= activeIdx;
          return (
            <li key={s.id} className="group relative z-10 flex items-center">
              <a
                href={`#${s.id}`}
                aria-label={s.label}
                aria-current={isActive ? "true" : undefined}
                className="block p-1"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-2.5 w-2.5 bg-cyan-300 shadow-[0_0_10px_3px_rgba(34,211,238,0.7)]"
                      : passed
                        ? "h-1.5 w-1.5 bg-cyan-400/50"
                        : "h-1.5 w-1.5 bg-[var(--fg-dim)]"
                  }`}
                />
              </a>
              {/* hover label (desktop) */}
              <span className="pointer-events-none absolute left-5 hidden whitespace-nowrap rounded-md bg-[var(--color-fg)] px-2 py-0.5 text-[0.6rem] font-semibold text-[var(--color-ink)] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 lg:block">
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
