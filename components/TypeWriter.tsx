"use client";

import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "fast, reliable & cheap",
  "scalable & observable",
  "battle-tested & lean",
  "cost-efficient & real-time",
];

const TYPE_MS   = 52;
const DELETE_MS = 30;
const HOLD_MS   = 2200;
const GAP_MS    = 400;

export default function TypeWriter() {
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const [text, setText]         = useState(reduced.current ? PHRASES[0] : "");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced.current) return;

    const full = PHRASES[phraseIdx];

    // Typing
    if (!deleting && text.length < full.length) {
      const id = setTimeout(
        () => setText(full.slice(0, text.length + 1)),
        TYPE_MS
      );
      return () => clearTimeout(id);
    }

    // Hold at full phrase, then start deleting
    if (!deleting && text.length === full.length) {
      const id = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(id);
    }

    // Deleting
    if (deleting && text.length > 0) {
      const id = setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
      return () => clearTimeout(id);
    }

    // Done deleting — brief gap, then next phrase
    if (deleting && text.length === 0) {
      const id = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
      }, GAP_MS);
      return () => clearTimeout(id);
    }
  }, [text, phraseIdx, deleting]);

  if (reduced.current) {
    return <span className="grad-text">{PHRASES[0]}</span>;
  }

  return (
    <>
      <span className="grad-text">{text || "​"}</span>
      <span className="tw-cursor" aria-hidden>
        |
      </span>
    </>
  );
}
