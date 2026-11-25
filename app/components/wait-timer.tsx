"use client";

// A clock that keeps counting up, for the "client is waiting" widget.
// Starts at the given number of seconds and adds one every second.

import { useEffect, useState } from "react";

function format(total: number) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function WaitTimer({ start }: { start: number }) {
  const [seconds, setSeconds] = useState(start);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{format(seconds)}</span>;
}
