"use client";

import { useEffect, useRef } from "react";

// ─── Ring particle (circle outline that pulses and repels from cursor) ──────────
interface Ring {
  x: number;
  y: number;
  baseR: number;   // resting radius (px)
  r: number;       // current radius
  phase: number;   // sine-wave phase offset
  speed: number;   // pulse speed (rad/s)
  alpha: number;   // base opacity 0.1–0.9
  isGreen: boolean; // green or violet
  ox: number;      // repulsion offset x
  oy: number;      // repulsion offset y
}

const REPEL_DIST  = 160;
const REPEL_FORCE = 0.08;
const SPRING      = 0.06;   // spring back to origin
const DAMPEN      = 0.82;

const GREEN  = "rgba(52,168,83,";    // Google Antigravity green
const VIOLET = "rgba(139,92,246,";   // violet

function makeRings(W: number, H: number, count: number): Ring[] {
  const rows = 25;
  const rings: Ring[] = [];
  const rowH = H / rows;

  for (let i = 0; i < count; i++) {
    const row = Math.floor((i / count) * rows);
    rings.push({
      x:      Math.random() * W,
      y:      rowH * row + Math.random() * rowH,
      baseR:  2 + Math.random() * 3.5,
      r:      2,
      phase:  Math.random() * Math.PI * 2,
      speed:  0.4 + Math.random() * 0.7,
      alpha:  0.1 + Math.random() * 0.8,
      isGreen: Math.random() > 0.48,
      ox: 0,
      oy: 0,
    });
  }
  return rings;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    let rings: Ring[] = [];
    let mx = -9999, my = -9999;
    let rafId = 0;
    let t = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width  = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = W < 768 ? 50 : 80;
      rings = makeRings(W, H, count);
    }

    function frame() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.016;

      for (const ring of rings) {
        // Cursor repulsion
        const dxC = ring.x - mx, dyC = ring.y - my;
        const distC = Math.sqrt(dxC * dxC + dyC * dyC);
        let fx = 0, fy = 0;
        if (distC < REPEL_DIST && distC > 0) {
          const strength = (1 - distC / REPEL_DIST) * REPEL_FORCE;
          fx = (dxC / distC) * strength;
          fy = (dyC / distC) * strength;
        }

        // Spring back + dampen
        ring.ox = (ring.ox + fx - ring.ox * SPRING) * DAMPEN;
        ring.oy = (ring.oy + fy - ring.oy * SPRING) * DAMPEN;

        // Pulse radius
        const pulse = 1 + 0.35 * Math.sin(t * ring.speed + ring.phase);
        // Repulsion near cursor also inflates radius
        const repelR = distC < REPEL_DIST ? (1 - distC / REPEL_DIST) * 6 : 0;
        ring.r = ring.baseR * pulse + repelR;

        const drawX = ring.x + ring.ox;
        const drawY = ring.y + ring.oy;

        ctx!.beginPath();
        ctx!.arc(drawX, drawY, Math.max(0.5, ring.r), 0, Math.PI * 2);
        const color = ring.isGreen ? GREEN : VIOLET;
        ctx!.strokeStyle = color + ring.alpha + ")";
        ctx!.lineWidth = 0.8 + ring.alpha * 0.6;
        ctx!.stroke();
      }

      rafId = requestAnimationFrame(frame);
    }

    function onMouse(e: MouseEvent) { mx = e.clientX; my = e.clientY; }
    function onLeave()              { mx = -9999; my = -9999; }

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    resize();

    if (!reduced) {
      window.addEventListener("mousemove", onMouse, { passive: true });
      window.addEventListener("mouseleave", onLeave);
      frame();
    } else {
      // Single static frame only
      t = 1;
      frame();
      cancelAnimationFrame(rafId);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
