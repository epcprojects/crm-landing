"use client";

// Mockup section 5. A team leaderboard: who is closing, who is losing deals,
// who is slow to reply. All names and numbers are sample data.

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useSeen } from "./reveal-root";

type Period = "week" | "month";
type Stats = { assigned: number; closed: number; lost: number; reply: number };

const agents: { name: string; week: Stats; month: Stats }[] = [
  { name: "Maha", week: { assigned: 11, closed: 6, lost: 1, reply: 9 }, month: { assigned: 44, closed: 24, lost: 5, reply: 7 } },
  { name: "Ali", week: { assigned: 14, closed: 5, lost: 2, reply: 12 }, month: { assigned: 52, closed: 29, lost: 6, reply: 16 } },
  { name: "Zoya", week: { assigned: 12, closed: 4, lost: 2, reply: 18 }, month: { assigned: 48, closed: 20, lost: 9, reply: 20 } },
  { name: "Hamza", week: { assigned: 9, closed: 2, lost: 4, reply: 41 }, month: { assigned: 37, closed: 11, lost: 12, reply: 38 } },
];

const SLOW_MINUTES = 30;

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const seen = useSeen();
  const [shown, setShown] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const from = current.current;
    const finish = () => {
      current.current = value;
      setShown(value);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / 900));
      const next = Math.round(from + (value - from) * (1 - Math.pow(1 - t, 3)));
      current.current = next;
      setShown(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value, delay]);

  return <span className="tabular-nums">{shown}</span>;
}

export default function AgentPerformance() {
  const seen = useSeen();
  const [period, setPeriod] = useState<Period>("week");

  const rows = agents
    .map((agent) => ({ name: agent.name, ...agent[period] }))
    .sort((a, b) => b.closed - a.closed);

  const totalClosed = rows.reduce((sum, row) => sum + row.closed, 0);
  const totalLost = rows.reduce((sum, row) => sum + row.lost, 0);
  const totalAssigned = rows.reduce((sum, row) => sum + row.assigned, 0);
  const avgReply = Math.round(
    rows.reduce((sum, row) => sum + row.reply * row.assigned, 0) / totalAssigned,
  );

  const summary = [
    { value: totalClosed, unit: "", label: "deals closed" },
    { value: totalLost, unit: "", label: "deals lost" },
    { value: avgReply, unit: "min", label: "average first reply" },
  ];

  return (
    <div
      className="reveal mt-8 sm:mt-12 lg:mt-14"
      style={{ "--d": "0.2s" } as CSSProperties}
    >
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        {/* window bar and period */}
        <div className="flex items-center justify-between gap-3 border-b border-black/[0.07] bg-[#f7f7fc] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                aria-hidden="true"
                className="hidden size-2.5 rounded-full bg-black/15 sm:block"
              />
            ))}
            <span className="text-[13px] font-bold text-ink/70 sm:ml-3">
              Agent performance
            </span>
          </div>
          <div
            role="group"
            aria-label="Choose a period"
            className="flex rounded-full bg-black/[0.05] p-1"
          >
            {(
              [
                ["week", "This week"],
                ["month", "This month"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={period === value}
                onClick={() => setPeriod(value)}
                className={`min-h-9 rounded-full px-3 text-[12px] font-bold transition-colors sm:px-4 sm:text-[13px] ${
                  period === value
                    ? "bg-white text-ink"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* the three numbers */}
        <dl className="grid grid-cols-3 divide-x divide-black/[0.07] border-b border-black/[0.07]">
          {summary.map((item, index) => (
            <div
              key={item.label}
              className="flex flex-col-reverse justify-end px-3 py-4 sm:px-8 sm:py-8"
            >
              <dt className="mt-1.5 text-[13px] leading-snug text-body sm:text-[15px]">
                {item.label}
              </dt>
              <dd
                className={`text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-none tracking-[-0.04em] ${
                  index === 1 ? "text-[#b45a00]" : ""
                }`}
              >
                <AnimatedNumber value={item.value} delay={index * 150} />
                {item.unit && (
                  <span className="ml-1.5 text-[0.34em] font-bold tracking-normal text-ink/60">
                    {item.unit}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* the agents, best closer first */}
        <ul>
          {rows.map((row, index) => {
            const rate = Math.round((row.closed / row.assigned) * 100);
            const slow = row.reply > SLOW_MINUTES;
            const weak = slow || rate < 30;
            return (
              <li
                key={row.name}
                className={`grid items-center gap-x-6 gap-y-2.5 border-b border-black/[0.07] px-4 py-4 last:border-b-0 sm:px-8 sm:py-5 lg:grid-cols-[10rem_minmax(0,1fr)_14rem] ${
                  weak ? "bg-[#fff8ee]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid size-9 place-items-center rounded-full text-[14px] font-bold sm:size-10 ${
                      weak ? "bg-[#ffe3bd] text-[#8a4300]" : "bg-[#e4e0ff] text-[#2f2496]"
                    }`}
                  >
                    {row.name[0]}
                  </span>
                  <div>
                    <p className="text-[16px] font-extrabold leading-tight">{row.name}</p>
                    <p
                      className={`mt-0.5 text-[12px] font-bold ${
                        weak ? "text-[#9a4a00]" : "text-[#1d7a52]"
                      }`}
                    >
                      {weak ? (slow ? "Slow to reply" : "Needs attention") : "Closing well"}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="h-3 overflow-hidden rounded-full bg-black/[0.07]">
                    <div
                      className={`h-full rounded-full transition-[width] duration-[900ms] ease-out ${
                        weak ? "bg-[#e08a1e]" : "bg-brand"
                      }`}
                      style={{
                        width: seen ? `${rate}%` : "0%",
                        transitionDelay: `${300 + index * 120}ms`,
                      }}
                    />
                  </div>
                  <p className="mt-1.5 text-[13px] text-ink/65">
                    <span className="font-bold text-ink">{row.closed}</span> of{" "}
                    {row.assigned} closed · {rate}%
                  </p>
                </div>

                <div className="flex gap-6 text-left lg:grid lg:grid-cols-2 lg:gap-4 lg:text-right">
                  <p className="flex items-baseline gap-1.5 lg:block">
                    <span className="text-[12px] text-ink/60 lg:block">Lost</span>
                    <span className="text-[16px] font-extrabold">{row.lost}</span>
                  </p>
                  <p className="flex items-baseline gap-1.5 lg:block">
                    <span className="text-[12px] text-ink/60 lg:block">First reply</span>
                    <span
                      className={`text-[15px] font-extrabold lg:text-[16px] ${
                        slow ? "text-[#b45a00]" : ""
                      }`}
                    >
                      {row.reply} min
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
