"use client";

// Live-HTML illustration of the product on a laptop and a phone.
// Every name, message and time is sample data.
//
// The phone plays one short story on a loop: Usman asks if he should leave,
// Ali checks, then confirms. When Ali confirms, the next step is ticked off
// and Usman's status updates on the laptop too.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// 0 empty · 1 Usman asks · 2 Ali typing · 3 Ali checks · 4 Ali typing
// 5 Ali confirms · 6 next step done · -1 fading out before the loop restarts
const DONE = 6;
const TIMELINE: [number, number][] = [
  [1400, 1],
  [2700, 2],
  [4000, 3],
  [5300, 4],
  [6600, 5],
  [7500, DONE],
  [13000, -1],
  [13550, 0],
];
const LOOP_GAP = 900;

function Icon({ d, className = "size-4" }: { d: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`${className} shrink-0`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const nav: { label: string; d: string; active?: boolean }[] = [
  { label: "Dashboard", d: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" },
  { label: "Clients", d: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5M17 4.5a3.5 3.5 0 0 1 0 6.6M18 14.8c2.2.6 3.5 2.4 3.5 5.2", active: true },
  { label: "Conversations", d: "M4 5h16v11H9l-5 4z" },
  { label: "Tasks", d: "M5 12l4 4 10-10" },
  { label: "Deals", d: "M3 8h18v11H3zM8 8V5h8v3" },
  { label: "Agents", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-4 4-6 8-6s8 2 8 6" },
];

const clients = [
  { name: "Usman", lead: "Plot enquiry, Block A", status: "Follow-up due", tone: "bg-[#e4e0ff] text-[#2f2496]", active: true },
  { name: "Sara", lead: "Apartment, Tower B", status: "Viewing booked", tone: "bg-[#eceef6] text-[#3a4262]" },
  { name: "Bilal", lead: "Flat viewing, Block C", status: "New enquiry", tone: "bg-[#efeff1] text-[#5d5f6b]" },
  { name: "Hina", lead: "Shop, Phase 2", status: "Negotiating", tone: "bg-[#e4e0ff] text-[#2f2496]" },
];

function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

function Bubble({
  mine,
  time,
  children,
}: {
  mine?: boolean;
  time: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`msg-in flex flex-col ${
        mine ? "msg-in-mine items-end" : "items-start"
      }`}
    >
      <p
        className={`max-w-[88%] px-3 py-2 text-[12px] leading-snug ${
          mine
            ? "rounded-2xl rounded-tr-sm bg-brand text-white"
            : "rounded-2xl rounded-tl-sm bg-[#f1f1f4] text-ink"
        }`}
      >
        {children}
      </p>
      <span className="mt-1 text-[11px] text-ink/55">{time}</span>
    </div>
  );
}

function Typing({ mine }: { mine?: boolean }) {
  return (
    <div className={`msg-in flex ${mine ? "msg-in-mine justify-end" : ""}`}>
      <span
        className={`inline-flex items-center gap-1 rounded-2xl px-3 py-2.5 ${
          mine ? "rounded-tr-sm bg-brand/15" : "rounded-tl-sm bg-[#f1f1f4]"
        }`}
        role="status"
        aria-label="Typing"
      >
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            aria-hidden="true"
            className="typing-dot size-1.5 rounded-full bg-ink/45"
            style={{ animationDelay: `${dot * 150}ms` }}
          />
        ))}
      </span>
    </div>
  );
}

function Avatar({ letter, className = "size-8" }: { letter: string; className?: string }) {
  return (
    <span
      className={`${className} grid shrink-0 place-items-center rounded-full bg-[#e4e0ff] text-[12px] font-bold text-[#2f2496]`}
    >
      {letter}
    </span>
  );
}

function Check({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

// The next-step card changes once Ali has confirmed.
function NextStep({ done, compact }: { done: boolean; compact?: boolean }) {
  return (
    <div
      key={done ? "done" : "open"}
      className={`${done ? "pop-in border-[#2fb37a]/35 bg-[#2fb37a]/[0.08]" : "border-brand/20 bg-brand/[0.05]"} rounded-lg border ${
        compact ? "p-2.5" : "p-3"
      }`}
    >
      <p
        className={`flex items-center gap-1.5 font-label text-[11px] tracking-[0.14em] ${
          done ? "text-[#1d7a52]" : "text-brand"
        }`}
      >
        {done && <Check className="size-3" />}
        {done ? "DONE" : "NEXT STEP"}
      </p>
      <p
        className={`mt-1 font-bold leading-snug ${
          compact ? "text-[12px]" : "text-[13px]"
        }`}
      >
        {done ? "Visit confirmed for 4 pm" : "Confirm 4 pm visit"}
      </p>
      <p className={`mt-0.5 text-ink/60 ${compact ? "text-[11px]" : "text-[12px]"}`}>
        Ali · {done ? "Just now" : "Due today"}
      </p>
    </div>
  );
}

function Laptop({ done }: { done: boolean }) {
  return (
    <div className="mx-auto w-full">
      {/* screen */}
      <div className="rounded-t-2xl border border-black/15 bg-[#1b1a26] p-2 pb-0 sm:p-2.5 sm:pb-0">
        <div className="overflow-hidden rounded-t-lg bg-white">
          <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] xl:grid-cols-[8.5rem_13rem_minmax(0,1fr)]">
            {/* sidebar */}
            <div className="border-r border-black/[0.07] bg-[#f7f7fc] p-3">
              <p className="px-1 text-[13px] font-extrabold tracking-[-0.02em]">
                Endpoint<span className="text-brand">Leads</span>
              </p>
              <ul className="mt-4 space-y-0.5">
                {nav.map((item, index) => (
                  <li
                    key={item.label}
                    style={stagger(index)}
                    className={`seq-in flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] font-semibold ${
                      item.active ? "bg-brand/10 text-brand" : "text-ink/65"
                    }`}
                  >
                    <Icon d={item.d} className="size-3.5" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* client list */}
            <div className="hidden border-r border-black/[0.07] p-3 xl:block">
              <p className="text-[13px] font-extrabold">Clients</p>
              <p className="mt-2 rounded-md bg-[#f3f3f7] px-2.5 py-1.5 text-[12px] text-ink/55">
                Search clients
              </p>
              <ul className="mt-3 space-y-1">
                {clients.map((client, index) => {
                  const confirmed = client.active && done;
                  return (
                    <li
                      key={client.name}
                      style={stagger(index + 3)}
                      className={`seq-in flex items-start gap-2 rounded-lg p-2 transition-colors duration-500 ${
                        client.active ? "bg-brand/[0.06]" : ""
                      }`}
                    >
                      <Avatar letter={client.name[0]} className="size-7" />
                      <span className="min-w-0">
                        <span className="block text-[12px] font-bold leading-tight">
                          {client.name}
                        </span>
                        <span className="block truncate text-[11px] text-ink/60">
                          {client.lead}
                        </span>
                        <span
                          key={confirmed ? "confirmed" : "base"}
                          className={`${confirmed ? "pop-in" : ""} mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            confirmed
                              ? "bg-[#2fb37a]/15 text-[#1d7a52]"
                              : client.tone
                          }`}
                        >
                          {confirmed && <Check className="size-2.5" />}
                          {confirmed ? "Visit confirmed" : client.status}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* the selected client */}
            <div className="min-w-0 p-3 sm:p-4 md:pr-24">
              <div className="seq-in flex items-center gap-2.5" style={stagger(3)}>
                <Avatar letter="U" />
                <div className="min-w-0">
                  <p className="text-[13px] font-extrabold leading-tight">Usman</p>
                  <p className="truncate text-[11px] text-ink/60">
                    Islamabad · Source: Ad
                  </p>
                </div>
              </div>

              <dl className="mt-4 divide-y divide-black/[0.07] text-[12px]">
                {[
                  ["Interested in", "Plot, Block A"],
                  ["Owner", "Ali"],
                  ["Last message", done ? "Today, 3:57 pm" : "Today, 3:52 pm"],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    style={stagger(index + 4)}
                    className="seq-in py-2"
                  >
                    <dt className="text-[11px] text-ink/60">{label}</dt>
                    <dd
                      key={value}
                      className={`font-bold ${
                        label === "Last message" && done ? "pop-in" : ""
                      }`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="seq-in mt-3" style={stagger(7)}>
                <NextStep done={done} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* base */}
      <div className="mx-auto h-2.5 w-[106%] -translate-x-[2.8%] rounded-b-2xl border border-black/15 bg-gradient-to-b from-[#d9d9e2] to-[#c1c1cc]" />
    </div>
  );
}

function Phone({ step }: { step: number }) {
  const done = step >= DONE;
  return (
    <div className="mx-auto w-[212px] rounded-[2rem] border border-black/20 bg-[#1b1a26] p-2">
      <div className="overflow-hidden rounded-[1.5rem] bg-white">
        <div className="flex items-center gap-2 border-b border-black/[0.07] px-3 py-2.5">
          <Avatar letter="U" className="size-7" />
          <div className="min-w-0">
            <p className="text-[12px] font-extrabold leading-tight">Usman</p>
            <p className="flex items-center gap-1 text-[11px] text-ink/60">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#2fb37a]" />
              Online
            </p>
          </div>
        </div>

        {/* messages: fixed height so the phone never jumps */}
        <div
          className={`flex h-[250px] flex-col justify-end gap-2.5 overflow-hidden px-3 py-3 transition-opacity duration-500 ${
            step === -1 ? "opacity-0" : "opacity-100"
          }`}
        >
          {step >= 1 && <Bubble time="3:52 pm">Should I leave to see the plot?</Bubble>}
          {step === 2 && <Typing mine />}
          {step >= 3 && (
            <Bubble mine time="3:55 pm">
              Checking with the site team.
            </Bubble>
          )}
          {step === 4 && <Typing mine />}
          {step >= 5 && (
            <Bubble mine time="3:57 pm">
              Confirmed. See you at 4 pm.
            </Bubble>
          )}
        </div>

        <div className="px-3 pb-2.5">
          <NextStep done={done && step !== -1} compact />
        </div>
        <div className="mx-3 mb-3 rounded-full bg-[#f3f3f7] px-3 py-2 text-[12px] text-ink/55">
          Write a reply
        </div>
      </div>
    </div>
  );
}

export default function DeviceMockup() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  // The story loop.
  useEffect(() => {
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setStep(DONE));
      return () => cancelAnimationFrame(raf);
    }

    const timers: number[] = [];
    const play = (offset: number) => {
      TIMELINE.forEach(([at, value]) => {
        timers.push(window.setTimeout(() => setStep(value), offset + at));
      });
      const end = offset + TIMELINE[TIMELINE.length - 1][0];
      timers.push(window.setTimeout(() => play(LOOP_GAP - TIMELINE[0][0]), end));
    };
    play(0);
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  // Pointer and scroll parallax.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let raf = 0;
    let mx = 0;
    let my = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--sy", String(Math.min(window.scrollY, 700)));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (event: PointerEvent) => {
      mx = (event.clientX / window.innerWidth - 0.5) * 2;
      my = (event.clientY / window.innerHeight - 0.5) * 2;
      queue();
    };

    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const done = step >= DONE;

  return (
    <div
      ref={root}
      className="relative mx-auto w-full max-w-[680px] pb-4 lg:max-w-none lg:pb-10"
    >
      {/* phone alone on small screens, laptop and phone together from md */}
      <div className="device-rise hidden md:block md:pr-28">
        <div className="parallax-laptop">
          <Laptop done={done && step !== -1} />
        </div>
      </div>
      <div className="phone-in md:absolute md:bottom-0 md:right-0 md:w-[212px]">
        <div className="parallax-phone">
          <div className="phone-float">
            <Phone step={step} />
          </div>
        </div>
      </div>
    </div>
  );
}
