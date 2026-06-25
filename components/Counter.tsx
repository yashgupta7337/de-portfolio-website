"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function Counter({
  to,
  suffix = "",
  duration = 1600,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  // Reserve the final width with an invisible ghost (kept in normal flow so it
  // defines the baseline/size) and overlay the animating value, so the count-up
  // doesn't reflow and shake adjacent elements.
  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className={`invisible ${className ?? ""}`} aria-hidden>
        {to}
        {suffix}
      </span>
      <span className={`absolute inset-0 text-center ${className ?? ""}`}>
        {value}
        {suffix}
      </span>
    </span>
  );
}
