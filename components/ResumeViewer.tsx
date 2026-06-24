"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const RESUME_EVENT = "resume:open";
const url = `/${profile.resume}`;

type ResumeButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export function ResumeButton({ className, children }: ResumeButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(RESUME_EVENT))}
    >
      {children}
    </button>
  );
}

export default function ResumeViewer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(RESUME_EVENT, onOpen);
    return () => window.removeEventListener(RESUME_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-5 py-3.5">
          <h2 className="text-sm font-semibold tracking-tight text-[var(--color-fg)]">
            Resume
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener"
              className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--fg-soft)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]"
            >
              Open in new tab
            </a>
            <a
              href={url}
              download
              className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--fg-soft)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]"
            >
              Download
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close resume viewer"
              className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--color-border)] text-[var(--color-fg)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative flex-1">
          <iframe src={url} className="h-full w-full" title="Resume" />
          <p className="absolute inset-x-0 bottom-0 bg-[var(--surface-2)] px-4 py-2 text-center text-xs text-[var(--color-muted)] backdrop-blur-sm">
            Can&apos;t see the PDF?{" "}
            <a
              href={url}
              target="_blank"
              rel="noopener"
              className="font-medium text-cyan-300 underline-offset-2 hover:underline"
            >
              Open in a new tab
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
