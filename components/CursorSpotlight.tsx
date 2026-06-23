"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;

    const root = document.documentElement;

    // Start off-screen so there's no visible flash before first move
    root.style.setProperty("--cursor-x", "-9999px");
    root.style.setProperty("--cursor-y", "-9999px");

    function onMove(e: MouseEvent) {
      root.style.setProperty("--cursor-x", e.clientX + "px");
      root.style.setProperty("--cursor-y", e.clientY + "px");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={divRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(520px circle at var(--cursor-x, -9999px) var(--cursor-y, -9999px), rgba(34,211,238,0.07) 0%, transparent 70%)",
        transition: "background 0.05s linear",
      }}
      className="cursor-spotlight"
    />
  );
}
