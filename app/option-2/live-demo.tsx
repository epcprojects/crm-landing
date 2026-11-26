"use client";

// Pieces for the "someone is using the app" demo on Option 2's device mockups:
// - DemoCursor: an arrow that glides between points and shows a click
// - TimedToasts: notifications that arrive on their own timer at a corner,
//   newest at the bottom, a few at a time (not tied to any click)
// - TouchDot and fingertip(): a fingertip that taps and swipes, used on phones
//   in place of the arrow
// Everything plays only while it is on screen and shown, and stays still for
// visitors who prefer reduced motion. Every name is sample data.

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";

export type DemoToast = { icon: ReactNode; tone: string; title: string; line: string };
export type Point = { x: number; y: number };

const glide = "transition-transform duration-[850ms] ease-[cubic-bezier(0.65,0,0.35,1)]";

/** True while `ref` is at least a third on screen. */
export function useOnScreen(ref: RefObject<HTMLElement | null>) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return on;
}

export function prefersStill() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The centre-ish point of `el`, relative to `root`, where a hand would tap. */
/** How much `root` is scaled on screen (1 unless it sits inside FitScale). */
export function scaleOf(root: HTMLElement) {
  return root.offsetWidth ? root.getBoundingClientRect().width / root.offsetWidth : 1;
}

export function pointOn(root: HTMLElement, el: HTMLElement | null): Point | null {
  if (!el) return null;
  const a = root.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  if (!r.width) return null;
  const k = scaleOf(root);
  return { x: (r.left - a.left + Math.min(r.width * 0.55, 56 * k)) / k, y: (r.top - a.top + r.height * 0.62) / k };
}

export function DemoCursor({ at, clicks, compact = false }: { at: Point | null; clicks: number; compact?: boolean }) {
  if (!at) return null;
  return (
    <div className={`pointer-events-none absolute left-0 top-0 z-30 ${glide}`} style={{ transform: `translate(${at.x}px, ${at.y}px)` }}>
      {/* the click ripple, replayed on every click */}
      <span
        key={clicks}
        className={`absolute -left-3 -top-3 rounded-full bg-[#4f46e5]/30 ${compact ? "size-6" : "size-7"} ${clicks ? "animate-[demo-click_600ms_ease-out_forwards]" : "opacity-0"}`}
      />
      <svg viewBox="0 0 24 24" className={`${compact ? "size-5" : "size-6"} drop-shadow-[0_3px_4px_rgba(17,17,19,0.35)]`}>
        <path d="M4 2.5 L19.5 13 L12.3 14.2 L15.9 21 L13 22.4 L9.5 15.6 L4.6 20.4 Z" fill="#111113" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Notifications that come in one by one on a timer. */
export function TimedToasts({
  running,
  items,
  compact = false,
  className = "bottom-4 right-4",
  every = 3600,
  max = 3,
}: {
  running: boolean;
  items: DemoToast[];
  compact?: boolean;
  className?: string;
  every?: number;
  max?: number;
}) {
  const [shown, setShown] = useState<(DemoToast & { key: number })[]>([]);
  useEffect(() => {
    if (!running || prefersStill()) return;
    let n = 0;
    const add = () => {
      const t = items[n % items.length];
      n += 1;
      const key = n;
      setShown((cur) => [...cur, { ...t, key }].slice(-max));
    };
    const first = window.setTimeout(add, 1800);
    const loop = window.setInterval(add, every);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(loop);
      setShown([]);
    };
  }, [running, items, every, max]);

  return (
    <div className={`pointer-events-none absolute z-20 flex flex-col items-end gap-2 ${className}`}>
      {shown.map((t) => (
        <div
          key={t.key}
          className={`flex items-center gap-2.5 rounded-2xl border border-black/[0.05] bg-white/95 shadow-[0_1px_2px_rgba(16,24,40,0.06),0_16px_32px_-14px_rgba(16,24,40,0.4)] backdrop-blur animate-[demo-toast_500ms_cubic-bezier(0.22,1,0.36,1)] ${
            compact ? "w-[184px] py-1.5 pl-1.5 pr-2.5" : "w-[260px] py-2 pl-2 pr-3.5"
          }`}
        >
          <span className={`grid flex-none place-items-center rounded-xl ${compact ? "size-7" : "size-9"}`} style={{ color: t.tone, backgroundColor: `color-mix(in srgb, ${t.tone} 14%, white)` }}>
            {t.icon}
          </span>
          <span className="min-w-0 leading-tight">
            <span className={`block truncate font-semibold text-[#101828] ${compact ? "text-[10.5px]" : "text-[12.5px]"}`}>{t.title}</span>
            <span className={`block truncate text-[#667085] ${compact ? "text-[9.5px]" : "text-[11px]"}`}>{t.line}</span>
          </span>
        </div>
      ))}
    </div>
  );
}


// ---- touch: a fingertip instead of an arrow, for phones ----------------------

/** Where the fingertip is, and whether it is pressing the screen. */
export type Touch = { x: number; y: number; down: boolean; drag?: boolean };

export const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** True on phone-sized screens, where the demos use a fingertip, not an arrow. */
export function useSmallScreen() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(max-width: 639px)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 639px)").matches,
    () => false,
  );
}

/** A soft fingertip that shows only while it presses: a tap, or a drag. */
export function TouchDot({ t }: { t: Touch | null }) {
  if (!t) return null;
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 z-30 -ml-4 -mt-4 size-8 rounded-full border-2 border-white/90 bg-[#101828]/20 shadow-[0_2px_10px_rgba(16,24,40,0.28)] backdrop-blur-[1px] ${
        t.drag ? "transition-[transform,opacity,scale] duration-[650ms] ease-in-out" : "transition-[opacity,scale] duration-150"
      } ${t.down ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
    />
  );
}

/**
 * The moves a fingertip can make inside `root`: a tap on an element, or a
 * swipe that scrolls `scroller`. `alive` stops a move once the demo is gone.
 */
export function fingertip(root: HTMLElement, set: (t: Touch | null) => void, alive: () => boolean) {
  const centre = (el: HTMLElement | null) => {
    if (!el) return null;
    const a = root.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (!r.width) return null;
    const k = scaleOf(root);
    return { x: (r.left - a.left + r.width / 2) / k, y: (r.top - a.top + r.height / 2) / k };
  };
  return {
    async tap(el: HTMLElement | null) {
      const p = centre(el);
      if (!p || !alive()) return;
      set({ ...p, down: false });
      await wait(60);
      set({ ...p, down: true });
      await wait(220);
      set({ ...p, down: false });
      await wait(260);
    },
    /** drag from y1 to y2 (fractions of the root's height) while scrolling to `top` */
    async swipe(scroller: HTMLElement | null, y1: number, y2: number, top: number) {
      if (!scroller || !alive()) return;
      const x = root.clientWidth * 0.62;
      const h = root.clientHeight;
      set({ x, y: h * y1, down: false });
      await wait(60);
      set({ x, y: h * y1, down: true });
      await wait(140);
      set({ x, y: h * y2, down: true, drag: true });
      scroller.scrollTo({ top, behavior: "smooth" });
      await wait(680);
      set({ x, y: h * y2, down: false });
      await wait(300);
    },
  };
}

// ---- one hand for a whole screen: an arrow on computers, a fingertip on phones

/**
 * The pointer for a scripted screen. `make(box, alive)` gives `go(el)` (move to
 * an element) and `click()` (click or tap it); `layer` draws the arrow or the
 * fingertip and belongs inside the screen's `relative` root.
 */
export function useHand() {
  const [at, setAt] = useState<Point | null>(null);
  const [clicks, setClicks] = useState(0);
  const [touch, setTouch] = useState<Touch | null>(null);
  const small = useSmallScreen();

  const make = useCallback(
    (box: HTMLElement, alive: () => boolean) => {
      const finger = fingertip(box, setTouch, alive);
      let target: HTMLElement | null = null;
      return {
        start() {
          if (!small) setAt({ x: box.offsetWidth * 0.55, y: box.offsetHeight * 0.55 });
        },
        async go(el: HTMLElement | null | undefined, pause = 900) {
          if (!alive()) return;
          target = el ?? null;
          if (small) return wait(pause * 0.5);
          const p = pointOn(box, target);
          if (p) setAt(p);
          await wait(pause);
        },
        async click() {
          if (!alive()) return;
          if (small) return finger.tap(target);
          setClicks((c) => c + 1);
          await wait(250);
        },
      };
    },
    [small],
  );

  const reset = useCallback(() => {
    setAt(null);
    setTouch(null);
  }, []);

  const layer = (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
      <DemoCursor at={at} clicks={clicks} />
      <TouchDot t={touch} />
    </div>
  );
  return { small, make, reset, layer };
}

/**
 * Timed notifications for a panel: they play while the panel is on screen and
 * sit at full size in its corner, even when the screen inside is scaled down.
 */
export function PanelToasts({ items, className = "bottom-4 right-4" }: { items: DemoToast[]; className?: string }) {
  const layer = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(layer);
  return (
    <div ref={layer} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      <TimedToasts
        running={onScreen}
        items={items}
        max={2}
        className={`${className} max-sm:origin-bottom-right max-sm:scale-[0.85] max-sm:[&>*:nth-last-child(n+2)]:hidden`}
      />
    </div>
  );
}
