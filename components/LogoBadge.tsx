"use client";

import { useId } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * The "Y" monogram badge with a themed gradient border and a glowing data
 * packet tracing it. Used in the nav and the footer. The border path matches
 * the badge's rounded-rect outline so it hugs the boundary cleanly.
 */
export default function LogoBadge({
  className = "",
  rx = 12,
  dur = "5.5s",
}: {
  className?: string;
  rx?: number;
  dur?: string;
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/[:]/g, "");
  const orbitId = `orbit-${uid}`;
  const gradId = `badge-grad-${uid}`;

  // Rounded-rect path along the full 36×36 viewBox edge (corner radius = rx).
  const r = rx;
  const path = `M${r},0 H${36 - r} A${r},${r} 0 0 1 36,${r} V${36 - r} A${r},${r} 0 0 1 ${36 - r},36 H${r} A${r},${r} 0 0 1 0,${36 - r} V${r} A${r},${r} 0 0 1 ${r},0 Z`;

  return (
    <span
      className={`relative grid place-items-center bg-gradient-to-br from-blue-500 to-emerald-500 font-mono font-extrabold text-white ${className}`}
    >
      Y
      <svg
        viewBox="0 0 36 36"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        {/* themed gradient border, in the logo's blue → emerald palette */}
        <path
          id={orbitId}
          d={path}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.6"
          style={{ filter: "drop-shadow(0 0 2px rgba(56,189,248,0.6))" }}
        />
        {!reduce && (
          <g style={{ filter: "drop-shadow(0 0 3px rgba(180,245,255,0.95))" }}>
            {/* a glowing data packet moving along the border */}
            <circle r="1.7" fill="#f0fdff">
              <animateMotion dur={dur} repeatCount="indefinite" calcMode="linear">
                <mpath xlinkHref={`#${orbitId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0.55;1;0.55"
                keyTimes="0;0.5;1"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )}
      </svg>
    </span>
  );
}
