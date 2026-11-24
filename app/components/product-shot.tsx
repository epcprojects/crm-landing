"use client";

// The hero illustration: one clean app window with a client list, plus a
// WhatsApp message and a next-step note overlapping it. Drawn at a fixed size
// and scaled to fit, so it keeps its proportions on every screen.
// All names are sample data.

import { useLayoutEffect, useRef, useState } from "react";
import { Check, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

const W = 640;
const H = 470;

const rows = [
  { name: "Usman Tariq", stage: "Site visit", tone: "bg-[#e4e0ff] text-[#2f2496]", owner: "Ali", next: "Sat, 11:00", active: true },
  { name: "Sara Khan", stage: "Negotiating", tone: "bg-[#fff1de] text-[#9a4a00]", owner: "Maha", next: "Send price list" },
  { name: "Bilal Ahmed", stage: "Closed", tone: "bg-[#e8f7ee] text-[#1d7a52]", owner: "Ali", next: "Hand over keys" },
  { name: "Hina Raza", stage: "New", tone: "bg-[#eef0f4] text-[#4b4c58]", owner: "Zoya", next: "First call today" },
  { name: "Ayesha Malik", stage: "Site visit", tone: "bg-[#e4e0ff] text-[#2f2496]", owner: "Hamza", next: "Mon, 4:00" },
];

const nav = ["Dashboard", "Clients", "Conversations", "Next steps", "Agents"];

function Shot() {
  return (
    <div className="relative text-ink" style={{ width: W, height: H }}>
      <div className="absolute left-0 top-5 flex h-[420px] w-[600px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_40px_80px_-40px_rgba(40,30,120,0.45)]">
        <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-surface px-3.5 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2.5 text-[12px] font-bold text-body">
            Endpoint<span className="text-brand">Leads</span>
          </span>
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="flex w-[132px] flex-none flex-col gap-1 border-r border-black/[0.06] px-2.5 py-3 text-[12px] font-semibold text-body">
            {nav.map((item) => (
              <span
                key={item}
                className={`rounded-lg px-2.5 py-1.5 ${item === "Clients" ? "bg-[#efedff] text-brand" : ""}`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-4 py-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-extrabold">Clients</span>
              <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-white">
                + New client
              </span>
            </div>
            <div className="grid grid-cols-[1.3fr_1fr_0.9fr_1.2fr] gap-2 px-1 text-[10px] font-bold tracking-[0.08em] text-ink/50">
              <span>CLIENT</span>
              <span>STAGE</span>
              <span>OWNER</span>
              <span>NEXT STEP</span>
            </div>
            {rows.map((row) => (
              <div
                key={row.name}
                className={`grid grid-cols-[1.3fr_1fr_0.9fr_1.2fr] items-center gap-2 rounded-lg border-t border-black/[0.05] px-1 py-2 text-[12px] ${
                  row.active ? "bg-[#f7f6ff]" : ""
                }`}
              >
                <span className="font-bold">{row.name}</span>
                <span className={`justify-self-start rounded-full px-2 py-0.5 text-[11px] font-bold ${row.tone}`}>
                  {row.stage}
                </span>
                <span>{row.owner}</span>
                <span className="text-body">{row.next}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 flex w-[230px] flex-col gap-2 rounded-2xl border border-black/10 bg-white px-3.5 py-3 shadow-[0_20px_40px_-20px_rgba(40,30,120,0.45)]">
        <div className="flex items-center gap-2">
          <span className="grid size-6.5 place-items-center rounded-full bg-[#25a35a] text-white">
            <WhatsappLogo aria-hidden="true" weight="fill" className="size-4" />
          </span>
          <span className="text-[12px] font-extrabold">Usman · WhatsApp</span>
          <span className="ml-auto text-[10px] text-ink/50">2 min</span>
        </div>
        <p className="rounded-[10px_10px_10px_3px] bg-[#f1f1f4] px-2.5 py-2 text-[12px] leading-snug">
          Is the 10 marla plot still available?
        </p>
        <p className="self-end rounded-[10px_10px_3px_10px] bg-brand px-2.5 py-2 text-[12px] leading-snug text-white">
          Yes! Visit on Saturday?
        </p>
      </div>

      <div className="absolute bottom-0 left-[380px] flex items-center gap-2.5 rounded-xl bg-ink px-3.5 py-2.5 text-white shadow-[0_20px_40px_-20px_rgba(15,15,19,0.6)]">
        <span className="grid size-5.5 place-items-center rounded-full bg-[#28c840]">
          <Check aria-hidden="true" weight="bold" className="size-3" />
        </span>
        <span className="text-[12px] font-bold">Next step set: site visit Sat 11:00</span>
      </div>
    </div>
  );
}

/** `maxWidth` is how wide the shot may grow; it is drawn at 640 and scaled. */
export default function ProductShot({ maxWidth = W }: { maxWidth?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setScale(Math.min(maxWidth, el.clientWidth) / W);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [maxWidth]);

  return (
    <div ref={box} className="mx-auto w-full" style={{ maxWidth, height: H * scale }}>
      <div aria-hidden="true" style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <Shot />
      </div>
      <p className="sr-only">
        Illustration of the product: a client list with stages, owners and next
        steps, a WhatsApp message from a client, and a next step being set.
      </p>
    </div>
  );
}
