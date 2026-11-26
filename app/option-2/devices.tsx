"use client";

// "Work from anywhere" section: a Mobile / Web switch. Mobile shows the
// dashboard laid out for a phone, inside a phone frame; Web shows the full
// dashboard screen. Both sit on a soft sky panel.
//
// The switch has a black pill that slides between the two options, and the
// views swap with a soft fade and a small lift rather than a hard cut. No blur or
// zoom, so the text stays crisp while it moves.

import { useLayoutEffect, useRef, useState } from "react";
import { AppFrame } from "../components/dashboard-screens";
import MobileDashboard from "./mobile-dashboard";
import LiveLeadsScreen from "./live-leads-screen";

const views = [
  { id: "mobile", label: "Mobile app" },
  { id: "web", label: "Web app" },
];

// a gentle ease-out used by both the pill and the views
const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/** The classes for one view: shown in place, or faded, lowered and blurred. */
function viewState(on: boolean) {
  return on
    ? "translate-y-0 opacity-100"
    : "pointer-events-none invisible translate-y-2 opacity-0";
}

export default function Devices() {
  const [view, setView] = useState(1);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  // place the sliding pill under the chosen option (and on resize)
  useLayoutEffect(() => {
    const place = () => {
      const b = buttons.current[view];
      if (b) setPill({ left: b.offsetLeft, width: b.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [view]);

  // the hidden view waits for the shown one to start fading before it leaves,
  // and becomes invisible only after its fade, so the swap reads as one move
  const viewClass = `transition-[opacity,translate,visibility] duration-[400ms] ${ease} motion-reduce:transition-none [grid-area:1/1]`;

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#cfe2f5_0%,#eef4fa_60%,#f6f1ea_100%)] sm:rounded-[32px]">
      {/* both views share one grid cell, so the panel keeps the taller one's
          height whichever is shown */}
      <div className="grid">
        <div aria-hidden={view !== 0} className={`flex items-center justify-center px-3 pb-6 pt-20 sm:pb-8 sm:pt-24 ${viewClass} ${viewState(view === 0)}`}>
          {/* the phone, with someone using it */}
          <MobileDashboard active={view === 0} />
        </div>
        <div aria-hidden={view !== 1} className={`flex items-center px-3 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-24 ${viewClass} ${viewState(view === 1)}`}>
          <div className="w-full overflow-hidden rounded-[18px] border border-white/70 bg-white/60 p-1.5 shadow-[0_40px_80px_-40px_rgba(30,40,70,0.45)] backdrop-blur sm:rounded-[24px] sm:p-2.5">
            <div className="relative overflow-hidden rounded-[14px] border border-black/[0.05] bg-white sm:rounded-[18px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <AppFrame active="Dashboard" logo={<img src="/option-2/endpoint-mark.svg" alt="" className="size-7" />}>
                {/* someone working on the dashboard; notifications come in on a timer */}
                <LiveLeadsScreen active={view === 1} />
              </AppFrame>
            </div>
          </div>
        </div>
      </div>

      <div
        role="group"
        aria-label="Show the app on"
        className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 gap-1 rounded-full border border-white/70 bg-white/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_24px_-14px_rgba(25,55,100,0.35)] backdrop-blur-xl backdrop-saturate-150 sm:top-6"
      >
        {/* the black pill that slides to the chosen option */}
        <span
          aria-hidden="true"
          className={`absolute bottom-1 top-1 rounded-full bg-[#111113] shadow-[0_4px_10px_-4px_rgba(17,17,19,0.5)] transition-[left,width] duration-500 ${ease} motion-reduce:transition-none`}
          style={pill ? { left: pill.left, width: pill.width } : { opacity: 0 }}
        />
        {views.map((v, i) => (
          <button
            key={v.id}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            aria-pressed={i === view}
            onClick={() => setView(i)}
            className={`relative inline-flex h-10 items-center whitespace-nowrap rounded-full px-4 text-[14px] font-medium transition-colors duration-500 sm:px-5 ${
              i === view ? "text-white" : "text-[#111113] hover:bg-white/50"
            } ${!pill && i === view ? "bg-[#111113]" : ""}`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
