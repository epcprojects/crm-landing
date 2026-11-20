// A calm skyline of towers under a soft wave. Decorative only.
// The towers grow up on load, a few windows light up, and the waves breathe.

import type { CSSProperties } from "react";

const towers: { x: number; w: number; h: number; shade: number }[] = [
  { x: 20, w: 46, h: 54, shade: 0.1 },
  { x: 74, w: 34, h: 82, shade: 0.14 },
  { x: 116, w: 58, h: 64, shade: 0.09 },
  { x: 182, w: 40, h: 98, shade: 0.16 },
  { x: 230, w: 52, h: 70, shade: 0.1 },
  { x: 292, w: 36, h: 50, shade: 0.08 },
  { x: 340, w: 60, h: 88, shade: 0.14 },
  { x: 410, w: 42, h: 62, shade: 0.1 },
  { x: 462, w: 54, h: 104, shade: 0.17 },
  { x: 526, w: 38, h: 66, shade: 0.09 },
  { x: 574, w: 56, h: 84, shade: 0.13 },
  { x: 640, w: 44, h: 58, shade: 0.09 },
  { x: 694, w: 36, h: 92, shade: 0.15 },
  { x: 740, w: 60, h: 68, shade: 0.1 },
  { x: 810, w: 42, h: 102, shade: 0.16 },
  { x: 862, w: 54, h: 60, shade: 0.09 },
  { x: 926, w: 36, h: 80, shade: 0.13 },
  { x: 972, w: 58, h: 56, shade: 0.09 },
  { x: 1040, w: 44, h: 96, shade: 0.16 },
  { x: 1094, w: 52, h: 66, shade: 0.1 },
  { x: 1156, w: 38, h: 84, shade: 0.14 },
  { x: 1204, w: 56, h: 52, shade: 0.08 },
  { x: 1270, w: 42, h: 90, shade: 0.15 },
  { x: 1322, w: 60, h: 64, shade: 0.1 },
  { x: 1392, w: 36, h: 76, shade: 0.12 },
];

// A few lit windows on the taller towers.
const windows = towers
  .map((tower, index) => ({ tower, index }))
  .filter(({ tower }) => tower.h >= 80)
  .flatMap(({ tower, index }) => [
    { x: tower.x + tower.w * 0.28, y: 160 - tower.h + 14, d: (index % 5) * 0.9 },
    { x: tower.x + tower.w * 0.58, y: 160 - tower.h + 30, d: ((index + 2) % 5) * 1.1 },
  ]);

export default function Skyline({
  dark = false,
  onView = false,
}: {
  // dark: lit towers on a night sky. onView: towers grow when the section is seen
  // (inside a RevealRoot) instead of on page load.
  dark?: boolean;
  onView?: boolean;
}) {
  const wave = dark ? "#0e0e12" : "#ffffff";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full sm:h-32 lg:h-40"
    >
      {towers.map((tower, index) => (
        <rect
          key={tower.x}
          className={onView ? "tower-seen" : "tower"}
          style={{ "--i": index } as CSSProperties}
          x={tower.x}
          y={160 - tower.h}
          width={tower.w}
          height={tower.h + 20}
          rx="2"
          fill={dark ? "#8e82f5" : "#4939d2"}
          fillOpacity={dark ? tower.shade * 1.8 : tower.shade}
        />
      ))}
      {windows.map((win) => (
        <rect
          key={`${win.x}-${win.y}`}
          className="win"
          style={{ "--d": `${win.d}s` } as CSSProperties}
          x={win.x}
          y={win.y}
          width="3"
          height="4"
          rx="1"
          fill={dark ? "#ffffff" : "#8e82f5"}
          opacity="0"
        />
      ))}
      <path
        className="wave-a"
        d="M0 128C180 96 330 150 560 132C800 112 960 70 1180 104C1300 122 1380 112 1440 98V190H0Z"
        fill={wave}
        fillOpacity="0.9"
      />
      <path
        className="wave-b"
        d="M0 148C200 120 360 168 600 150C820 134 1000 98 1220 128C1320 142 1390 136 1440 126V190H0Z"
        fill={wave}
      />
    </svg>
  );
}
