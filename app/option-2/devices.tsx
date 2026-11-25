"use client";

// "Work from anywhere" section: a Mobile / Web switch. Mobile shows the
// dashboard laid out for a phone, inside a phone frame; Web shows the full
// dashboard screen. Both sit on a soft sky panel.

import { useState } from "react";
import { AppFrame, LeadsScreen } from "../components/dashboard-screens";
import MobileDashboard from "./mobile-dashboard";

const views = [
  { id: "mobile", label: "Mobile app" },
  { id: "web", label: "Web app" },
];

export default function Devices() {
  const [view, setView] = useState(1);
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#cfe2f5_0%,#eef4fa_60%,#f6f1ea_100%)] sm:rounded-[32px]">
      {/* both views share one grid cell, so the panel keeps the taller one's
          height whichever is shown; the hidden one just fades out */}
      <div className="grid">
        <div
          aria-hidden={view !== 0}
          className={`flex items-center justify-center px-3 pb-6 pt-20 transition-opacity duration-300 [grid-area:1/1] sm:pb-8 sm:pt-24 ${view === 0 ? "opacity-100" : "invisible opacity-0"}`}
        >
          <MobileDashboard />
        </div>
        <div
          aria-hidden={view !== 1}
          className={`flex items-center px-3 pb-6 pt-20 transition-opacity duration-300 [grid-area:1/1] sm:px-8 sm:pb-8 sm:pt-24 ${view === 1 ? "opacity-100" : "invisible opacity-0"}`}
        >
          <div className="w-full overflow-hidden rounded-[18px] border border-white/70 bg-white/60 p-1.5 shadow-[0_40px_80px_-40px_rgba(30,40,70,0.45)] backdrop-blur sm:rounded-[24px] sm:p-2.5">
            <div className="overflow-hidden rounded-[14px] border border-black/[0.05] bg-white sm:rounded-[18px]">
              <AppFrame active="Dashboard" logo={<img src="/option-2/endpoint-mark.svg" alt="" className="size-7" />}>
                <LeadsScreen />
              </AppFrame>
            </div>
          </div>
        </div>
      </div>
      <div role="group" aria-label="Show the app on" className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 gap-1 rounded-full border border-white/70 bg-white/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_24px_-14px_rgba(25,55,100,0.35)] backdrop-blur-xl backdrop-saturate-150 sm:top-6">
        {views.map((v, i) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={i === view}
            onClick={() => setView(i)}
            className={`inline-flex h-10 items-center whitespace-nowrap rounded-full px-4 text-[14px] font-medium transition-colors sm:px-5 ${i === view ? "bg-[#111113] text-white shadow-[0_4px_10px_-4px_rgba(17,17,19,0.5)]" : "text-[#111113] hover:bg-white/50"}`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
