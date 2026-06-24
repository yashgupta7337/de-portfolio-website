import type { Metadata } from "next";
import Link from "next/link";
import Playground from "@/components/playground/Playground";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Pipeline Playground — Yash Gupta",
  description:
    "Build a data pipeline block by block and run it live in your browser over sample stock data — with an auto-generated SQL query.",
};

export default function PlaygroundPage() {
  return (
    <main className="container-x py-8 sm:py-10">
      <header className="mb-8 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-3.5 py-2 text-sm text-[var(--fg-soft)] transition hover:border-cyan-400/50 hover:bg-[var(--surface-1)]"
        >
          ← Portfolio
        </Link>
        <ThemeToggle />
      </header>

      <span className="kicker">Live · runs in your browser</span>
      <h1 className="mt-3 text-[clamp(1.9rem,5vw,3rem)] font-extrabold leading-tight tracking-tight">
        Stock <span className="grad-text">Pipeline Playground</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-[var(--color-muted)]">
        Drag blocks to build a data pipeline over sample market data, reorder the
        stages, and hit run — everything executes client-side and the equivalent
        SQL is generated live.
      </p>

      <div className="mt-10">
        <Playground />
      </div>

      <p className="mt-10 text-center text-xs text-[var(--color-muted)]">
        Sample data is synthetic. Built with Next.js + Framer Motion.
      </p>
    </main>
  );
}
