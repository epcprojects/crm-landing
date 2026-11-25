"use client";

// A wrapper that adds the "is-in" class when it is about 30% on screen and
// removes it when it has left the screen, so the animation replays on every
// visit, from above or below. Children marked with fx, fx-pop or fx-fade (see globals.css) animate
// when it is added.

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function Reveal({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3) {
          el.classList.add("is-in");
        } else if (entry.intersectionRatio === 0) {
          // fully out of view: reset, so it plays again on the next visit
          el.classList.remove("is-in");
        }
      },
      { threshold: [0, 0.3] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fx-root ${className}`} style={style}>
      {children}
    </div>
  );
}
