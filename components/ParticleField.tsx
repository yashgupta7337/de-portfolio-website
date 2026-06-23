"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const CONNECT_DIST = 120;
const REPEL_DIST   = 160;
const REPEL_FORCE  = 0.55;

function makeParticle(w: number, h: number): Particle {
  const speed = 0.3 + Math.random() * 0.45;
  const angle = Math.random() * Math.PI * 2;
  return {
    x:  Math.random() * w,
    y:  Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r:  1.5 + Math.random() * 1.2,
  };
}

function getColors(isLight: boolean) {
  return isLight
    ? { dot: "rgba(37,99,235,0.28)",  line: "rgba(37,99,235,0.07)"  }
    : { dot: "rgba(34,211,238,0.35)", line: "rgba(34,211,238,0.08)" };
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
    let particles: Particle[] = [];
    let mx = -9999, my = -9999;
    let rafId = 0;
    let isLight = document.documentElement.classList.contains("light");

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width  = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = W < 768 ? 55 : 90;
      particles = Array.from({ length: count }, () => makeParticle(W, H));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      const colors = getColors(isLight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_DIST && dist > 0) {
          const force = (REPEL_DIST - dist) / REPEL_DIST * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Dampen to prevent runaway speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.8) { p.vx *= 1.8 / speed; p.vy *= 1.8 / speed; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Draw dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = colors.dot;
        ctx!.fill();

        // Draw connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const lx = p.x - q.x, ly = p.y - q.y;
          const d = Math.sqrt(lx * lx + ly * ly);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.6;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            // Blend alpha into the base line color
            const base = isLight ? `rgba(37,99,235,` : `rgba(34,211,238,`;
            ctx!.strokeStyle = base + (alpha * 0.18) + ")";
            ctx!.lineWidth = 0.7;
            ctx!.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    function onMouse(e: MouseEvent) { mx = e.clientX; my = e.clientY; }
    function onLeave()              { mx = -9999; my = -9999; }

    // Watch theme changes
    const mo = new MutationObserver(() => {
      isLight = document.documentElement.classList.contains("light");
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    resize();

    if (!reduced) {
      document.addEventListener("mousemove", onMouse, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      draw();
    } else {
      // Static single frame for reduced-motion
      draw();
      cancelAnimationFrame(rafId);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
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
