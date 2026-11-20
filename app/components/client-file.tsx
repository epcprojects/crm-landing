"use client";

// Mockup section 3. An app window you can open clients in. A cursor shows how
// until the visitor clicks for themselves. All names, times and messages are sample data.

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useSeen } from "./reveal-root";

type Message = { who: string; mine: boolean; text: string; time: string };

type Client = {
  id: string;
  name: string;
  interest: string;
  status: string;
  tone: string;
  city: string;
  source: string;
  owner: string;
  thread: Message[];
  history: [string, string][];
  next: { text: string; due: string };
};

const clients: Client[] = [
  {
    id: "usman",
    name: "Usman",
    interest: "Plot, Block A",
    status: "Follow-up due",
    tone: "bg-[#e4e0ff] text-[#2f2496]",
    city: "Islamabad",
    source: "Ad",
    owner: "Ali",
    thread: [
      { who: "Ali", mine: true, text: "Location sent. Visit at 4 pm?", time: "3:20 pm" },
      { who: "Usman", mine: false, text: "It’s almost 4. Should I leave to see the plot?", time: "3:52 pm" },
      { who: "Ali", mine: true, text: "Checking with the site team now.", time: "3:55 pm" },
    ],
    history: [
      ["Lead created", "Mon, 10:12 am"],
      ["Assigned to Ali", "Mon, 10:15 am"],
      ["Visit proposed", "Today, 3:20 pm"],
    ],
    next: { text: "Confirm the 4 pm visit", due: "Due today" },
  },
  {
    id: "sara",
    name: "Sara",
    interest: "Apartment, Tower B",
    status: "Viewing booked",
    tone: "bg-[#eceef6] text-[#3a4262]",
    city: "Rawalpindi",
    source: "Ad",
    owner: "Maha",
    thread: [
      { who: "Sara", mine: false, text: "Can you send me the payment plan?", time: "2:10 pm" },
      { who: "Maha", mine: true, text: "Yes, sending it today.", time: "2:35 pm" },
      { who: "Maha", mine: true, text: "Plan sent. Shall we book a viewing?", time: "3:05 pm" },
    ],
    history: [
      ["Lead created", "Tue, 9:40 am"],
      ["Assigned to Maha", "Tue, 9:44 am"],
      ["Payment plan sent", "Today, 3:05 pm"],
    ],
    next: { text: "Confirm Saturday’s viewing", due: "Due Friday" },
  },
  {
    id: "bilal",
    name: "Bilal",
    interest: "Flat, Block C",
    status: "New enquiry",
    tone: "bg-[#efeff1] text-[#5d5f6b]",
    city: "Islamabad",
    source: "Referral",
    owner: "Ali",
    thread: [
      { who: "Bilal", mine: false, text: "Can I come to see the flat on Sunday?", time: "11:05 am" },
      { who: "Ali", mine: true, text: "Let me check the availability.", time: "11:30 am" },
      { who: "Ali", mine: true, text: "Sunday works. 12 noon?", time: "11:42 am" },
    ],
    history: [
      ["Lead created", "Today, 11:02 am"],
      ["Assigned to Ali", "Today, 11:04 am"],
      ["Availability checked", "Today, 11:30 am"],
    ],
    next: { text: "Send the location to Bilal", due: "Due Saturday" },
  },
  {
    id: "hina",
    name: "Hina",
    interest: "Shop, Phase 2",
    status: "Negotiating",
    tone: "bg-[#e4e0ff] text-[#2f2496]",
    city: "Lahore",
    source: "Walk-in",
    owner: "Maha",
    thread: [
      { who: "Hina", mine: false, text: "Is the shop price negotiable?", time: "9:40 am" },
      { who: "Maha", mine: true, text: "I’ll check with the developer.", time: "10:05 am" },
      { who: "Hina", mine: false, text: "Okay, please let me know today.", time: "10:20 am" },
    ],
    history: [
      ["Lead created", "Mon, 4:30 pm"],
      ["Assigned to Maha", "Mon, 4:32 pm"],
      ["Price question received", "Today, 9:40 am"],
    ],
    next: { text: "Reply with the developer’s offer", due: "Due today" },
  },
];

const initials = (name: string) => name[0];

function Marker({ n }: { n: number }) {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand font-label text-xs font-medium text-white">
      {n}
    </span>
  );
}

function Pointer() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="#0f0f13"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M5 3l14 8-6 1.8L9.8 19z" />
    </svg>
  );
}

export default function ClientFile() {
  const seen = useSeen();
  const [selected, setSelected] = useState(0);
  const [auto, setAuto] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false });
  const [clicks, setClicks] = useState(0);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);

  // The cursor opens a different client every few seconds until the visitor takes over.
  useEffect(() => {
    if (!seen || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) =>
      timers.push(window.setTimeout(fn, ms));
    let index = 0;

    const step = () => {
      index = (index + 1) % clients.length;
      const row = rows.current[index];
      if (row) {
        setCursor({
          x: row.offsetLeft + row.offsetWidth * 0.62,
          y: row.offsetTop + row.offsetHeight / 2,
          on: true,
        });
      }
      later(() => {
        setClicks((count) => count + 1);
        setSelected(index);
      }, 900);
      later(step, 5600);
    };
    later(step, 2400);

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [seen, auto]);

  const open = (index: number) => {
    setAuto(false);
    setCursor((current) => ({ ...current, on: false }));
    setSelected(index);
  };

  const client = clients[selected];

  return (
    <div
      className="reveal mt-12 lg:mt-14"
      style={{ "--d": "0.2s" } as CSSProperties}
    >
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-black/[0.07] bg-[#f7f7fc] px-4 py-3">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              aria-hidden="true"
              className="size-2.5 rounded-full bg-black/15"
            />
          ))}
          <span className="ml-3 text-[13px] font-bold text-ink/70">Clients</span>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
          {/* the list */}
          <div className="relative border-b border-black/[0.07] lg:border-b-0 lg:border-r">
            <div
              role="group"
              aria-label="Choose a client to open"
              className="relative flex gap-1 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible lg:p-3"
            >
              {clients.map((item, index) => {
                const active = index === selected;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      rows.current[index] = node;
                    }}
                    type="button"
                    aria-pressed={active}
                    onClick={() => open(index)}
                    className={`flex min-h-11 shrink-0 items-center gap-3 rounded-xl p-2.5 text-left transition-colors ${
                      active ? "bg-brand/[0.08]" : "hover:bg-black/[0.03]"
                    }`}
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full text-[13px] font-bold ${
                        active ? "bg-brand text-white" : "bg-[#e4e0ff] text-[#2f2496]"
                      } transition-colors`}
                    >
                      {initials(item.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-extrabold leading-tight">
                        {item.name}
                      </span>
                      <span className="hidden truncate text-[12px] text-ink/60 lg:block">
                        {item.interest}
                      </span>
                    </span>
                  </button>
                );
              })}

              {/* the demo cursor */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
                style={{
                  transform: `translate(${cursor.x}px, ${cursor.y}px)`,
                  opacity: cursor.on ? 1 : 0,
                  transition:
                    "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease",
                }}
              >
                <span key={clicks} className="click-ripple" />
                <Pointer />
              </span>
            </div>
          </div>

          {/* the file */}
          <div key={client.id} className="min-w-0 p-5 sm:p-7">
            {/* 1 the client */}
            <div className="flex flex-wrap items-start gap-4">
              <span className="thread-in grid size-14 shrink-0 place-items-center rounded-full bg-[#e4e0ff] text-xl font-extrabold text-[#2f2496]">
                {initials(client.name)}
              </span>
              <div className="thread-in min-w-0 flex-1" style={{ animationDelay: "60ms" }}>
                <p className="flex items-center gap-2 font-label text-xs tracking-[0.16em] text-brand">
                  <Marker n={1} />
                  THE CLIENT
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-extrabold tracking-[-0.02em]">
                    {client.name}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-[12px] font-bold ${client.tone}`}
                  >
                    {client.status}
                  </span>
                </div>
              </div>
            </div>

            <dl
              className="thread-in mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-black/[0.07] py-4 sm:grid-cols-4"
              style={{ animationDelay: "120ms" }}
            >
              {[
                ["Interested in", client.interest],
                ["City", client.city],
                ["Source", client.source],
                ["Owner", client.owner],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[12px] text-ink/60">{label}</dt>
                  <dd className="mt-0.5 text-[15px] font-bold">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-10">
              {/* 2 the conversation */}
              <div>
                <p className="flex items-center gap-2 font-label text-xs tracking-[0.16em] text-brand">
                  <Marker n={2} />
                  THE CONVERSATION
                </p>
                <ul className="mt-4 space-y-3">
                  {client.thread.map((message, index) => (
                    <li
                      key={message.text}
                      className={`thread-in flex flex-col ${
                        message.mine ? "items-end" : "items-start"
                      }`}
                      style={{ animationDelay: `${200 + index * 140}ms` }}
                    >
                      <p
                        className={`max-w-[85%] px-3.5 py-2 text-[14px] leading-snug ${
                          message.mine
                            ? "rounded-2xl rounded-tr-sm bg-brand text-white"
                            : "rounded-2xl rounded-tl-sm bg-[#f1f1f4] text-ink"
                        }`}
                      >
                        {message.text}
                      </p>
                      <span className="mt-1 text-[12px] text-ink/60">
                        {message.who} · {message.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3 the next step, and what happened so far */}
              <div>
                <p className="flex items-center gap-2 font-label text-xs tracking-[0.16em] text-brand">
                  <Marker n={3} />
                  THE NEXT STEP
                </p>
                <div
                  className="thread-in mt-4 rounded-xl border border-brand/20 bg-brand/[0.05] p-4"
                  style={{ animationDelay: "420ms" }}
                >
                  <p className="text-[15px] font-extrabold leading-snug">
                    {client.next.text}
                  </p>
                  <p className="mt-1.5 text-[13px] text-ink/65">
                    {client.owner} · {client.next.due}
                  </p>
                </div>

                <ol className="mt-5 space-y-3 border-l border-black/10 pl-4">
                  {client.history.map(([event, when], index) => (
                    <li
                      key={event}
                      className="thread-in relative"
                      style={{ animationDelay: `${520 + index * 100}ms` }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-[1.3rem] top-1.5 size-2 rounded-full bg-brand/60"
                      />
                      <p className="text-[13px] font-bold">{event}</p>
                      <p className="text-[12px] text-ink/60">{when}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
