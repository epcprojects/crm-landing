// Small product moments that fill the empty space on both sides of the
// centred hero (wide screens only). Read top-left to bottom-right they tell
// one story: an enquiry arrives, gets an owner, the team talks, next steps
// get done, a late one is caught, a deal closes. All names are sample data.

import type { ReactNode } from "react";
import { Check, Clock } from "@phosphor-icons/react/dist/ssr";
import WhatsappIcon from "./whatsapp-icon";

type Spot = {
  pos: string; // absolute position inside the hero wrapper
  tilt: string; // rotate class
  delay: number; // entrance delay, ms
  float: string; // float animation variant
  children: ReactNode;
};

const card =
  "w-[230px] rounded-2xl border border-black/[0.07] bg-white p-3.5 text-left text-ink shadow-[0_24px_48px_-24px_rgba(40,30,120,0.35)]";

function Avatar({ letter, tone = "bg-[#e4e0ff] text-[#2f2496]" }: { letter: string; tone?: string }) {
  return <span className={`grid size-8 flex-none place-items-center rounded-full text-[12px] font-extrabold ${tone}`}>{letter}</span>;
}

const spots: Spot[] = [
  {
    pos: "left-0 top-6",
    tilt: "-rotate-3",
    delay: 250,
    float: "side-float-a",
    children: (
      <div className={card}>
        <div className="flex items-center gap-2">
          <WhatsappIcon className="size-7" />
          <span className="text-[12px] font-extrabold">Hina Raza</span>
          <span className="ml-auto rounded-full bg-[#e8f7ee] px-2 py-0.5 text-[10px] font-extrabold text-[#1d7a52]">New</span>
        </div>
        <p className="mt-2.5 rounded-[12px_12px_12px_3px] bg-[#f1f1f4] px-3 py-2 text-[12px] leading-snug">
          Price for a 5 marla house in Bahria Town?
        </p>
      </div>
    ),
  },
  {
    pos: "left-10 top-[250px]",
    tilt: "rotate-2",
    delay: 400,
    float: "side-float-b",
    children: (
      <div className={card}>
        <p className="text-[10px] font-extrabold tracking-[0.1em] text-ink/50">NEW ENQUIRY</p>
        <div className="mt-2 flex items-center gap-2.5">
          <Avatar letter="Z" tone="bg-[#fff1de] text-[#9a4a00]" />
          <div className="min-w-0">
            <p className="text-[13px] font-extrabold">Assigned to Zoya</p>
            <p className="flex items-center gap-1 text-[11px] text-ink/60">
              <Clock weight="bold" className="size-3" /> Reply due in 15 min
            </p>
          </div>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
          <div className="h-full w-1/3 rounded-full bg-brand" />
        </div>
      </div>
    ),
  },
  {
    pos: "-left-10 bottom-[110px]",
    tilt: "-rotate-2",
    delay: 550,
    float: "side-float-a",
    children: (
      <div className={`${card} border-[#ffd5cf]`}>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#ffe0db] px-2 py-1 text-[10px] font-extrabold text-[#b3261e]">2 days late</span>
          <span className="text-[11px] text-ink/60">Owner Hamza</span>
        </div>
        <p className="mt-2 text-[13px] font-extrabold">Call back about the price</p>
        <p className="text-[11px] text-ink/60">Hina Raza</p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-lg border border-black/12 px-2.5 py-1.5 text-[11px] font-bold">Give to Maha</span>
          <span className="rounded-lg bg-brand px-2.5 py-1.5 text-[11px] font-bold text-white">Done</span>
        </div>
      </div>
    ),
  },
  {
    pos: "right-0 top-10",
    tilt: "rotate-3",
    delay: 300,
    float: "side-float-b",
    children: (
      <div className={`${card} bg-[repeating-linear-gradient(135deg,#fffaf2_0_12px,#fff6ea_12px_24px)]`}>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-extrabold">Sara Khan · team chat</span>
          <span className="rounded-full bg-[#fff1de] px-2 py-0.5 text-[10px] font-extrabold text-[#9a4a00]">Staff only</span>
        </div>
        <div className="mt-2.5 flex items-start gap-2">
          <Avatar letter="M" />
          <p className="rounded-[12px_12px_12px_3px] bg-white px-3 py-2 text-[12px] leading-snug shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <span className="font-bold text-brand">@Ali</span> can we hold the 3rd floor till Friday?
          </p>
        </div>
      </div>
    ),
  },
  {
    pos: "right-10 top-[270px]",
    tilt: "-rotate-2",
    delay: 450,
    float: "side-float-a",
    children: (
      <div className={card}>
        <p className="text-[10px] font-extrabold tracking-[0.1em] text-ink/50">NEXT STEPS · TODAY</p>
        <ul className="mt-2 flex flex-col gap-1.5 text-[12px]">
          {[
            { t: "Send payment plan", done: true },
            { t: "Confirm site visit", done: true },
            { t: "First call with Zain", done: false },
          ].map((s) => (
            <li key={s.t} className="flex items-center gap-2">
              <span className={`grid size-4 flex-none place-items-center rounded ${s.done ? "bg-brand text-white" : "border-2 border-black/20"}`}>
                {s.done && <Check weight="bold" className="size-2.5" />}
              </span>
              <span className={s.done ? "text-ink/50 line-through" : "font-semibold"}>{s.t}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    pos: "-right-10 top-[44%]",
    tilt: "rotate-2",
    delay: 600,
    float: "side-float-b",
    children: (
      <div className={card}>
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 flex-none place-items-center rounded-full bg-[#e8f7ee] text-[#1d7a52]">
            <Check weight="bold" className="size-4.5" />
          </span>
          <div>
            <p className="text-[13px] font-extrabold">Deal closed</p>
            <p className="text-[11px] text-ink/60">Bilal Ahmed · Tower B</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between rounded-xl bg-surface px-2.5 py-2">
          <span className="text-[11px] text-ink/60">Closed by</span>
          <span className="flex items-center gap-1.5 text-[11px] font-bold">
            <Avatar letter="A" /> Ali
          </span>
        </div>
      </div>
    ),
  },
];

// Two groups. "text" cards sit in the empty space beside the headline and the
// number field. "stage" cards hang over the edges of the dashboard panel, so
// they are placed relative to that panel and move with it.
const groups = { text: [0, 1, 3, 4], stage: [2, 5] } as const;

export default function HeroSideCards({ group }: { group: keyof typeof groups }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden xl:block ${
        group === "text" ? "inset-x-5 top-0 sm:inset-x-10" : "inset-0"
      }`}
    >
      {groups[group].map((i) => {
        const s = spots[i];
        return (
          <div key={i} className={`rise absolute ${s.pos}`} style={{ animationDelay: `${s.delay}ms` }}>
            <div className={s.float}>
              <div className={s.tilt}>{s.children}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
