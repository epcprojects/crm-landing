"use client";

// A floating offer ticket at the bottom centre of Option 2: the year-end
// "Save 25%" offer, a live countdown to 31 December 2026 and a button that
// opens the demo popup. It slides up once the hero has scrolled away, slides
// back down at the hero, and steps aside while the footer is on screen.

import { useEffect, useState } from "react";
import { ArrowRight, SealPercent } from "@phosphor-icons/react/dist/ssr";
import { useContact } from "../components/contact";

// the offer ends at the close of 31 December 2026, Pakistan time
const ENDS = new Date("2026-12-31T23:59:59+05:00").getTime();

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, ENDS - Date.now()));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);
  if (left === null) return null;
  const s = Math.floor(left / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, over: left === 0 };
}

/** One digit that rolls up into place whenever it changes. */
function Digit({ d }: { d: string }) {
  return (
    <span className="relative inline-block h-[20px] w-[0.6em] overflow-hidden">
      <span key={d} className="absolute inset-0 grid place-items-center motion-safe:animate-[digit-roll_420ms_cubic-bezier(0.22,1,0.36,1)]">
        {d}
      </span>
    </span>
  );
}

/** One square of the countdown, the same height as the badge and the button:
 *  the number with its label inside, lifting a little on hover. */
function Tile({ value, label, i, progress }: { value: number; label: string; i: number; progress?: number }) {
  const v = String(value).padStart(2, "0");
  return (
    <span
      style={{ transitionDelay: `${i * 35}ms` }}
      className={`relative flex size-[52px] flex-col items-center justify-center gap-0.5 overflow-hidden rounded-2xl bg-[#f4f5f7] transition-[translate,background-color] duration-300 ${ease} group-hover/timer:-translate-y-0.5 group-hover/timer:bg-[#effaf3]`}
    >
      <span className="flex text-[18px] font-semibold leading-none tabular-nums text-[#111113]">
        {v.split("").map((d, k) => (
          <Digit key={k} d={d} />
        ))}
      </span>
      <span className="text-[9px] font-semibold uppercase leading-none tracking-[0.1em] text-[#8a8a93] transition-colors duration-300 group-hover/timer:text-[#16a34a]">
        {label}
      </span>
      {/* the seconds fill up across the minute */}
      {progress !== undefined && (
        <span className="absolute inset-x-2.5 bottom-1 h-[2px] overflow-hidden rounded-full bg-black/[0.06]">
          <span className="block h-full rounded-full bg-[#16a34a] transition-[width] duration-1000 ease-linear" style={{ width: `${progress * 100}%` }} />
        </span>
      )}
    </span>
  );
}

export default function FloatingDock() {
  const { openSheet } = useContact();
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const time = useCountdown();

  useEffect(() => {
    const hero = document.querySelector("main section");
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPastHero(!e.isIntersecting);
        if (e.target === footer) setAtFooter(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  // once the offer has ended there is nothing to show
  const show = pastHero && !atFooter && !time?.over;

  return (
    <div
      aria-hidden={!show}
      className={`pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center pl-3 pr-[4.5rem] transition-[opacity,translate] duration-500 ${ease} motion-reduce:transition-none lg:bottom-6 lg:px-3 ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div
        tabIndex={-1}
        className={`relative flex items-center gap-3 rounded-[24px] border border-black/[0.06] bg-white/95 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_6px_rgba(15,26,46,0.08),0_18px_40px_-12px_rgba(15,26,46,0.35),0_40px_80px_-24px_rgba(15,26,46,0.45)] lg:gap-4 backdrop-blur-xl ${
          show ? "pointer-events-auto" : ""
        }`}
      >
        {/* the offer badge, gently swinging */}
        <span className="grid size-11 flex-none place-items-center rounded-2xl max-[359px]:hidden lg:size-[52px] bg-gradient-to-b from-[#34d37a] to-[#16a34a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_18px_-8px_rgba(22,163,74,0.7)] motion-safe:animate-[pw-wiggle_3s_ease-in-out_infinite]">
          <SealPercent weight="fill" className="size-6 lg:size-7" />
        </span>

        <span className="flex min-w-0 flex-col gap-0.5 lg:pr-1">
          <span className="whitespace-nowrap text-[13px] font-semibold leading-tight text-[#111113] lg:text-[15px]">
            <span className="text-[#16a34a]">Save 25%</span><span className="hidden lg:inline"> on your plan</span>
          </span>
          <span className="whitespace-nowrap text-[12px] font-medium leading-tight text-[#6b6b73] lg:text-[13px]">
            <span className="lg:hidden">Ends in {time ? `${time.d} days` : "…"}</span>
            <span className="hidden lg:inline">Offer ends 31 December 2026</span>
          </span>
        </span>

        {/* the live countdown, set off by thin dividers */}
        <span className="hidden h-8 w-px flex-none bg-black/[0.08] lg:block" />
        <span className="group/timer hidden cursor-default items-center gap-1.5 lg:flex" role="timer" aria-label="Time left on the offer">
          {time ? (
            <>
              <Tile i={0} value={time.d} label="days" />
              <Tile i={1} value={time.h} label="hrs" />
              <Tile i={2} value={time.m} label="min" />
              <Tile i={3} value={time.s} label="sec" progress={(60 - time.s) / 60} />
            </>
          ) : (
            <span className="h-[52px] w-[226px]" />
          )}
        </span>
        <span className="hidden h-8 w-px flex-none bg-black/[0.08] lg:block" />

        <button
          type="button"
          tabIndex={show ? 0 : -1}
          onClick={() => openSheet("", "")}
          className="group inline-flex h-11 flex-none items-center gap-2 whitespace-nowrap rounded-2xl bg-[#111113] pl-4 pr-1.5 text-[14px] shadow-[0_10px_20px_-10px_rgba(17,17,19,0.7)] lg:h-[52px] lg:gap-3 lg:pl-5 lg:text-[15.5px] font-medium text-white transition-colors hover:bg-[#2a2a2e]"
        >
          <span className="hidden lg:inline">Claim my demo</span>
          <span className="lg:hidden">Claim</span>
          <span className="grid size-8 place-items-center rounded-xl bg-white/15 lg:size-10 transition-transform group-hover:translate-x-0.5">
            <ArrowRight weight="bold" className="size-3.5" />
          </span>
        </button>
      </div>
    </div>
  );
}
