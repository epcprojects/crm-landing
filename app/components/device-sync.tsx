"use client";

// Mockup section 6. An agent ticks off a next step on the phone and the
// manager's laptop updates at once. All names and times are sample data.

import { useEffect, useState, type CSSProperties } from "react";
import { Check as CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { useSeen } from "./reveal-root";

// 0 idle · 1 finger taps · 2 phone done + sync · 3 laptop updates + toast
// 4 toast leaves · -1 fading out before the loop restarts
const TIMELINE: [number, number][] = [
  [2200, 1],
  [2800, 2],
  [3700, 3],
  [8800, 4],
  [11000, -1],
  [11600, 0],
];
const LOOP_GAP = 500;

function Check({ className = "size-3" }: { className?: string }) {
  return <CheckIcon aria-hidden="true" weight="bold" className={className} />;
}

const rows = [
  { who: "A", text: "Confirm 4 pm visit with Usman", meta: "Ali · Due today", target: true },
  { who: "M", text: "Send the payment plan to Sara", meta: "Maha · Due today" },
  { who: "M", text: "Reply with the developer’s offer to Hina", meta: "Maha · Due today" },
  { who: "A", text: "Confirm Sunday’s visit with Bilal", meta: "Ali · Due Saturday" },
];

function Laptop({ step }: { step: number }) {
  const done = step >= 3 && step !== -1;
  const open = rows.length - (done ? 1 : 0);
  return (
    <div className="w-full">
      <div className="rounded-t-2xl border border-black/15 bg-[#1b1a26] p-2 pb-0 sm:p-2.5 sm:pb-0">
        <div className="relative overflow-hidden rounded-t-lg bg-white">
          <div className="flex items-center justify-between border-b border-black/[0.07] bg-[#f7f7fc] px-4 py-3">
            <p className="text-[13px] font-extrabold tracking-[-0.02em]">
              Endpoint<span className="text-brand">Leads</span>
              <span className="ml-3 font-bold text-ink/60">Team next steps</span>
            </p>
            <p
              key={open}
              className="pop-in rounded-full bg-brand/10 px-3 py-1 text-[12px] font-bold text-brand"
            >
              {open} open
            </p>
          </div>
          <ul
            className={`min-h-[300px] divide-y divide-black/[0.07] px-4 transition-opacity duration-500 sm:px-5 ${
              step === -1 ? "opacity-0" : "opacity-100"
            }`}
          >
            {rows.map((row) => {
              const ticked = row.target && done;
              return (
                <li key={row.text} className="flex items-start gap-3 py-3.5">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-500 ${
                      ticked
                        ? "border-[#2fb37a] bg-[#2fb37a] text-white"
                        : "border-brand/40 bg-white text-transparent"
                    }`}
                  >
                    <Check />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-[14px] font-bold leading-snug transition-colors duration-500 ${
                        ticked ? "text-ink/45 line-through" : ""
                      }`}
                    >
                      {row.text}
                    </span>
                    <span className="mt-0.5 block text-[12px] text-ink/60">
                      {ticked ? `${row.meta.split(" · ")[0]} · Done` : row.meta}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-[#e4e0ff] text-[12px] font-bold text-[#2f2496]"
                  >
                    {row.who}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* a toast when the phone changes something */}
          {step === 3 && (
            <div className="toast-in absolute bottom-3 right-3 flex items-center gap-2.5 rounded-xl border border-black/10 bg-white px-3.5 py-2.5">
              <span className="grid size-6 place-items-center rounded-full bg-[#2fb37a] text-white">
                <Check />
              </span>
              <span>
                <span className="block text-[13px] font-extrabold leading-tight">
                  Ali marked this done
                </span>
                <span className="block text-[12px] text-ink/60">
                  Confirm 4 pm visit · just now
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto h-2.5 w-[106%] -translate-x-[2.8%] rounded-b-2xl border border-black/15 bg-gradient-to-b from-[#d9d9e2] to-[#c1c1cc]" />
    </div>
  );
}

function Phone({ step }: { step: number }) {
  const done = step >= 2 && step !== -1;
  return (
    <div className="mx-auto w-[220px] rounded-[2rem] border border-black/20 bg-[#1b1a26] p-2">
      <div className="overflow-hidden rounded-[1.5rem] bg-white">
        <div className="flex items-center gap-2 border-b border-black/[0.07] px-3 py-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-[#e4e0ff] text-[12px] font-bold text-[#2f2496]">
            U
          </span>
          <div>
            <p className="text-[12px] font-extrabold leading-tight">Usman</p>
            <p className="text-[11px] text-ink/60">Plot, Block A · Ali</p>
          </div>
        </div>
        <div className="space-y-2.5 px-3 pb-3 pt-4">
          <div className="flex flex-col items-start">
            <p className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#f1f1f4] px-3 py-2 text-[12px] leading-snug">
              Should I leave to see the plot?
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="max-w-[88%] rounded-2xl rounded-tr-sm bg-brand px-3 py-2 text-[12px] leading-snug text-white">
              Confirmed. See you at 4 pm.
            </p>
          </div>

          <div
            key={done ? "done" : "open"}
            className={`${done ? "pop-in border-[#2fb37a]/35 bg-[#2fb37a]/[0.08]" : "border-brand/20 bg-brand/[0.05]"} rounded-lg border p-2.5`}
          >
            <p
              className={`flex items-center gap-1.5 font-label text-[11px] tracking-[0.14em] ${
                done ? "text-[#1d7a52]" : "text-brand"
              }`}
            >
              {done && <Check />}
              {done ? "DONE" : "NEXT STEP"}
            </p>
            <p className="mt-1 text-[12px] font-bold leading-snug">
              {done ? "Visit confirmed for 4 pm" : "Confirm 4 pm visit"}
            </p>
            <p className="text-[11px] text-ink/60">
              Ali · {done ? "Just now" : "Due today"}
            </p>
            {!done && (
              <span className="relative mt-2.5 flex h-9 items-center justify-center rounded-md bg-brand text-[12px] font-bold text-white">
                Mark as done
                {step === 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-1/2 size-0"
                  >
                    <span className="click-ripple" />
                    <span className="absolute -left-2.5 -top-2.5 size-5 rounded-full bg-ink/25" />
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DeviceSync() {
  const seen = useSeen();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setStep(4));
      return () => cancelAnimationFrame(raf);
    }
    const timers: number[] = [];
    const play = (offset: number) => {
      TIMELINE.forEach(([at, value]) =>
        timers.push(window.setTimeout(() => setStep(value), offset + at)),
      );
      const end = offset + TIMELINE[TIMELINE.length - 1][0];
      timers.push(window.setTimeout(() => play(LOOP_GAP - TIMELINE[0][0]), end));
    };
    play(0);
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [seen]);

  const syncing = step >= 2 && step !== -1;

  return (
    <div
      className="reveal mt-8 sm:mt-12 lg:mt-16"
      style={{ "--d": "0.2s" } as CSSProperties}
    >
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-0">
        <div className="w-full max-w-[640px] lg:flex-1">
          <Laptop step={step} />
        </div>

        {/* the link between them */}
        <div
          aria-hidden="true"
          className="relative flex h-14 w-full max-w-[640px] items-center justify-center lg:h-auto lg:w-28 lg:max-w-none lg:shrink-0"
        >
          <span className="absolute inset-x-1/2 top-0 h-full border-l-2 border-dashed border-brand/30 lg:inset-x-0 lg:top-1/2 lg:h-0 lg:border-l-0 lg:border-t-2" />
          <span
            className={`relative rounded-full border px-3 py-1.5 font-label text-xs tracking-[0.12em] transition-colors duration-500 ${
              syncing
                ? "border-brand bg-brand text-white"
                : "border-black/10 bg-white text-ink/60"
            }`}
          >
            {syncing ? "SYNCED" : "LIVE"}
          </span>
          {syncing && (
            <span
              key={step >= 3 ? "arrived" : "sending"}
              className="sync-dot absolute top-1/2 hidden size-3 rounded-full bg-brand lg:block"
            />
          )}
        </div>

        <div className="lg:shrink-0">
          <Phone step={step} />
        </div>
      </div>
    </div>
  );
}
