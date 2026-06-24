"use client";

import { useState } from "react";

export default function ExperiencePoints({
  points,
  max = 3,
}: {
  points: string[];
  max?: number;
}) {
  const [open, setOpen] = useState(false);
  const collapsible = points.length > max;
  const shown = open || !collapsible ? points : points.slice(0, max);

  return (
    <>
      <ul className="mt-4 space-y-2.5">
        {shown.map((p, j) => (
          <li
            key={j}
            className="flex gap-3 text-sm leading-relaxed text-[var(--fg-soft)]"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      {collapsible && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--accent-text)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]"
        >
          {open ? "View less" : `View more (+${points.length - max})`}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );
}
