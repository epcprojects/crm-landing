"use client";

// Mockup section 3. An app window you can open clients in. A cursor shows how
// until the visitor clicks for themselves. All names, times and messages are sample data.

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Briefcase,
  Buildings,
  CalendarPlus,
  CaretRight,
  ChartBar,
  ChatCircle,
  Check,
  Clock,
  Cursor,
  GearSix,
  ListChecks,
  MagnifyingGlass,
  MapPin,
  Megaphone,
  PaperPlaneRight,
  Phone,
  SquaresFour,
  UserCircle,
  Users,
} from "@phosphor-icons/react/dist/ssr";
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

// What the client list shows beside each name.
const listMeta: Record<string, { time: string; unread?: number }> = {
  usman: { time: "3:55 pm", unread: 1 },
  sara: { time: "3:05 pm" },
  bilal: { time: "11:42 am", unread: 2 },
  hina: { time: "10:20 am", unread: 1 },
};

const rail = [SquaresFour, Users, ChatCircle, ListChecks, Briefcase, ChartBar];
const tabs: [string, string?][] = [
  ["Conversation", "3"],
  ["Activity"],
  ["Notes"],
  ["Files"],
];

// A small numbered pin that ties a part of the screen to the points below it.
function Marker({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-6 shrink-0 place-items-center rounded-full bg-brand font-label text-xs font-medium text-white ring-4 ring-white ${className}`}
    >
      {n}
    </span>
  );
}

function Pointer() {
  return <Cursor aria-hidden="true" weight="fill" className="size-6 text-ink" />;
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
      className="reveal mt-8 sm:mt-12 lg:mt-14"
      style={{ "--d": "0.2s" } as CSSProperties}
    >
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_44px_80px_-36px_rgba(40,30,120,0.38)]">
        {/* window bar */}
        <div className="relative flex items-center gap-2 border-b border-black/[0.07] bg-[#f7f7fc] px-4 py-2.5 sm:py-3">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              aria-hidden="true"
              className="size-2.5 rounded-full bg-black/15"
            />
          ))}
          <span className="absolute left-1/2 -translate-x-1/2 text-[13px] font-bold text-ink/60">
            Endpoint<span className="text-brand">Leads</span>
          </span>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[4.5rem_17rem_minmax(0,1fr)]">
          {/* app rail */}
          <div className="hidden flex-col items-center gap-1.5 border-r border-black/[0.07] bg-[#f7f7fc] py-4 lg:flex">
            <span className="mb-3 grid size-9 place-items-center rounded-xl bg-brand text-[15px] font-extrabold text-white">
              E
            </span>
            {rail.map((RailIcon, index) => (
              <span
                key={index}
                className={`grid size-10 place-items-center rounded-xl ${
                  index === 1 ? "bg-brand/10 text-brand" : "text-ink/50"
                }`}
              >
                <RailIcon
                  aria-hidden="true"
                  weight={index === 1 ? "fill" : "regular"}
                  className="size-5"
                />
              </span>
            ))}
            <span className="mt-auto grid size-10 place-items-center rounded-xl text-ink/50">
              <GearSix aria-hidden="true" className="size-5" />
            </span>
          </div>

          {/* the list */}
          <div className="relative border-b border-black/[0.07] lg:border-b-0 lg:border-r">
            <div className="hidden items-center justify-between px-5 pb-1 pt-5 lg:flex">
              <p className="text-[17px] font-extrabold tracking-[-0.02em]">Clients</p>
              <span className="rounded-full bg-black/[0.06] px-2.5 py-0.5 text-[12px] font-bold text-ink/65">
                28
              </span>
            </div>
            <div className="hidden px-5 pb-2 pt-2 lg:block">
              <div className="flex items-center gap-2 rounded-lg bg-[#f3f3f7] px-3 py-2 text-[13px] text-ink/50">
                <MagnifyingGlass aria-hidden="true" className="size-4 shrink-0" />
                Search clients
              </div>
            </div>
            <div
              role="group"
              aria-label="Choose a client to open"
              className="relative flex gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible lg:px-3 lg:pb-4 lg:pt-1"
            >
              {clients.map((item, index) => {
                const active = index === selected;
                const meta = listMeta[item.id];
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      rows.current[index] = node;
                    }}
                    type="button"
                    aria-pressed={active}
                    onClick={() => open(index)}
                    className={`flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl p-2 text-left transition-colors sm:gap-3 sm:p-2.5 ${
                      active ? "bg-brand/[0.08]" : "hover:bg-black/[0.03]"
                    }`}
                  >
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-bold transition-colors sm:size-10 sm:text-[14px] ${
                        active
                          ? "bg-brand text-white"
                          : "bg-[#e4e0ff] text-[#2f2496]"
                      }`}
                    >
                      {initials(item.name)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[14px] font-extrabold leading-tight">
                          {item.name}
                        </span>
                        <span className="hidden text-[11px] text-ink/55 lg:block">
                          {meta.time}
                        </span>
                      </span>
                      <span className="mt-0.5 hidden items-center justify-between gap-2 lg:flex">
                        <span className="truncate text-[12px] text-ink/60">
                          {item.interest}
                        </span>
                        {meta.unread && (
                          <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                            {meta.unread}
                          </span>
                        )}
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
          <div key={client.id} className="min-w-0">
            {/* top bar */}
            <div className="thread-in hidden items-center justify-between gap-3 border-b border-black/[0.07] px-5 py-3 sm:flex sm:px-7">
              <p className="flex items-center gap-1.5 text-[13px] text-ink/60">
                Clients
                <CaretRight aria-hidden="true" weight="bold" className="size-3" />
                <span className="font-bold text-ink">{client.name}</span>
              </p>
              <div className="flex items-center gap-2">
                {[Phone, ChatCircle].map((ActionIcon, index) => (
                  <span
                    key={index}
                    className="hidden size-9 place-items-center rounded-lg border border-black/10 text-ink/65 sm:grid"
                  >
                    <ActionIcon aria-hidden="true" className="size-[18px]" />
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[13px] font-bold text-white">
                  <CalendarPlus aria-hidden="true" weight="bold" className="size-4" />
                  Schedule visit
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-7">
              {/* 1 the client */}
              <div className="relative">
                <Marker n={1} className="absolute right-0 top-0" />
                <div
                  className="thread-in flex items-center gap-4"
                  style={{ animationDelay: "60ms" }}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#e4e0ff] text-[18px] font-extrabold text-[#2f2496] sm:size-16 sm:text-[22px]">
                    {initials(client.name)}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[22px] font-extrabold leading-none tracking-[-0.025em] sm:text-[26px]">
                        {client.name}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-[12px] font-bold ${client.tone}`}
                      >
                        {client.status}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] text-ink/60">
                      {client.city} · Owner {client.owner}
                    </p>
                  </div>
                </div>

                <dl
                  className="thread-in mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-4 sm:gap-4"
                  style={{ animationDelay: "120ms" }}
                >
                  {(
                    [
                      [Buildings, "Interested in", client.interest],
                      [MapPin, "City", client.city],
                      [Megaphone, "Source", client.source],
                      [UserCircle, "Owner", client.owner],
                    ] as const
                  ).map(([FactIcon, label, value]) => (
                    <div
                      key={label}
                      className="flex items-center gap-2.5 rounded-xl bg-[#f7f7fc] px-3 py-2.5 sm:gap-3 sm:px-3.5 sm:py-3"
                    >
                      <FactIcon
                        aria-hidden="true"
                        className="size-[18px] shrink-0 text-brand sm:size-5"
                      />
                      <div className="min-w-0">
                        <dt className="text-[11px] text-ink/55">{label}</dt>
                        <dd className="text-[13px] font-bold leading-snug sm:text-[14px]">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* tabs */}
              <div className="mt-5 flex gap-5 overflow-x-auto border-b border-black/[0.08] text-[14px] font-bold [scrollbar-width:none] sm:mt-6 sm:gap-6 [&::-webkit-scrollbar]:hidden">
                {tabs.map(([label, count], index) => (
                  <span
                    key={label}
                    className={`-mb-px flex shrink-0 items-center gap-2 border-b-2 pb-2.5 sm:pb-3 ${
                      index === 0
                        ? "border-brand text-ink"
                        : "border-transparent text-ink/50"
                    }`}
                  >
                    {label}
                    {count && (
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] text-brand">
                        {count}
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-8">
                {/* 2 the conversation */}
                <div className="relative rounded-2xl bg-[#f6f5fc] p-3 sm:p-5">
                  <Marker n={2} className="absolute -right-2 -top-2" />
                  <p className="mx-auto w-fit rounded-full bg-white px-3 py-1 text-[11px] font-bold text-ink/55">
                    Today
                  </p>
                  <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
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
                              ? "rounded-[18px] rounded-br-md bg-brand text-white"
                              : "rounded-[18px] rounded-bl-md bg-white text-ink"
                          }`}
                        >
                          {message.text}
                        </p>
                        <span className="mt-1 px-1 text-[12px] text-ink/60">
                          {message.who} · {message.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[13px] text-ink/50 sm:mt-4 sm:px-3.5 sm:py-2.5">
                    <span className="flex-1">Write a reply…</span>
                    <span className="grid size-8 place-items-center rounded-full bg-brand text-white">
                      <PaperPlaneRight
                        aria-hidden="true"
                        weight="fill"
                        className="size-4"
                      />
                    </span>
                  </div>
                </div>

                {/* 3 the next step, and what happened so far */}
                <div>
                  <div
                    className="thread-in relative rounded-2xl border border-brand/20 bg-brand/[0.05] p-4"
                    style={{ animationDelay: "420ms" }}
                  >
                    <Marker n={3} className="absolute -right-2 -top-2" />
                    <p className="font-label text-[11px] tracking-[0.14em] text-brand">
                      NEXT STEP
                    </p>
                    <p className="mt-2 flex items-start gap-2.5 text-[15px] font-extrabold leading-snug">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 size-5 shrink-0 rounded-full border-2 border-brand/40 bg-white"
                      />
                      {client.next.text}
                    </p>
                    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-ink/65">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="grid size-5 place-items-center rounded-full bg-[#e4e0ff] text-[10px] font-bold text-[#2f2496]">
                          {client.owner[0]}
                        </span>
                        {client.owner}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 font-bold text-[#9a4a00]">
                        <Clock aria-hidden="true" weight="bold" className="size-3.5" />
                        {client.next.due}
                      </span>
                    </p>
                    <span className="mt-4 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-brand text-[13px] font-bold text-white">
                      <Check aria-hidden="true" weight="bold" className="size-4" />
                      Mark as done
                    </span>
                  </div>

                  <ol className="mt-5 hidden space-y-3.5 border-l border-black/10 pl-4 sm:block">
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
    </div>
  );
}
