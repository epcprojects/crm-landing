"use client";

// A number that counts up from zero each time it scrolls into view, whether
// the visitor arrives from above or below. It resets as soon as it is mostly
// out of view, so coming back to it always replays the count from zero.

import { useEffect, useRef, useState } from "react";

export default function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    let frame = 0;
    let played = false; // counted since it last left the screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5 && !played) {
          played = true;
          cancelAnimationFrame(frame);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        } else if (entry.intersectionRatio < 0.2) {
          // mostly out of view: reset so it counts again on the next visit
          played = false;
          cancelAnimationFrame(frame);
          setValue(0);
        }
      },
      { threshold: [0, 0.2, 0.5] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return <span ref={ref}>{value.toLocaleString("en-US")}</span>;
}
