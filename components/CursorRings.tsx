"use client";

import { useEffect, useRef } from "react";

const RING_THROTTLE = 100; // ms between ring spawns
const RING_DURATION = 650; // ms — must match CSS animation duration
const MAX_RINGS     = 8;

export default function CursorRings() {
  const rootRef  = useRef<HTMLDivElement>(null);
  const lastTime = useRef(0);
  const rings    = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if ("ontouchstart" in window) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = rootRef.current;
    if (!root) return;

    function spawnRing(x: number, y: number) {
      const now = Date.now();
      if (now - lastTime.current < RING_THROTTLE) return;
      lastTime.current = now;

      // Cap active rings
      if (rings.current.length >= MAX_RINGS) {
        const old = rings.current.shift();
        old?.remove();
      }

      const span = document.createElement("span");
      span.className = "cursor-ring";
      span.style.left = x - 32 + "px";
      span.style.top  = y - 32 + "px";
      root!.appendChild(span);
      rings.current.push(span);

      setTimeout(() => {
        span.remove();
        rings.current = rings.current.filter((r) => r !== span);
      }, RING_DURATION);
    }

    function onMove(e: MouseEvent) {
      spawnRing(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}
