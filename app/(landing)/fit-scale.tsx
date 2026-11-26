"use client";

// Shows its content at a fixed desktop width, scaled down to fit the space it
// is given, so a whole dashboard screen stays in view instead of being cut
// off at the sides or the bottom. The box takes the scaled height. On phones
// the content is shown at its real width instead, using its own phone layout,
// so nothing is shrunk too small to read.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSmallScreen } from "./live-demo";

export default function FitScale({ width, children }: { width: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; height: number } | null>(null);
  const small = useSmallScreen();

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (small || !o || !i) return;
    const measure = () => {
      const scale = Math.min(1, o.clientWidth / width);
      setFit({ scale, height: i.offsetHeight * scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width, small]);

  if (small) return <div className="w-full">{children}</div>;

  return (
    <div ref={outer} className="w-full overflow-hidden" style={{ height: fit?.height }}>
      <div
        ref={inner}
        style={{ width, transform: `scale(${fit?.scale ?? 0})`, transformOrigin: "0 0", visibility: fit ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}
