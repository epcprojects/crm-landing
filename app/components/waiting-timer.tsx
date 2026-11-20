"use client";

import { useEffect, useState } from "react";
import { useSeen } from "./reveal-root";

// "No reply for 25 min": counts up once the block is in view, so the wait
// is felt. The minutes are sample data.

function format(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export default function WaitingTimer({
  to,
  delay,
  duration = 2200,
}: {
  to: number;
  delay: number;
  duration?: number;
}) {
  const seen = useSeen();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, delay, duration]);

  return <span className="tabular-nums">{format(value)}</span>;
}
