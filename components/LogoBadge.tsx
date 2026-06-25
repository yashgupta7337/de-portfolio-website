"use client";

import { useId } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * The "Y" monogram badge with a sparkle that cleanly traces its border.
 * Used in the nav and the footer. The orbit path matches the badge's
 * rounded-rect outline so the star hugs the boundary instead of crossing
 * over the logo.
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

  // Rounded-rect path along the full 36×36 viewBox edge (corner radius = rx).
  const r = rx;
  const path = `M${r},0 H${36 - r} A${r},${r} 0 0 1 36,${r} V${36 - r} A${r},${r} 0 0 1 ${36 - r},36 H${r} A${r},${r} 0 0 1 0,${36 - r} V${r} A${r},${r} 0 0 1 ${r},0 Z`;

  return (
    <span
      className={`relative grid place-items-center bg-gradient-to-br from-blue-500 to-emerald-500 font-mono font-extrabold text-white ${className}`}
    >
      Y
      {!reduce && (
        <svg
          viewBox="0 0 36 36"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <path id={orbitId} d={path} fill="none" />
          <g
            style={{ filter: "drop-shadow(0 0 3px rgba(125,230,255,0.95))" }}
          >
            {/* a glowing data packet tracing the border */}
            <circle r="1.7" fill="#eafdff">
              <animateMotion dur={dur} repeatCount="indefinite" calcMode="linear">
                <mpath xlinkHref={`#${orbitId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                keyTimes="0;0.5;1"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      )}
    </span>
  );
}
