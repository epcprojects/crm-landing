"use client";

// The Endpoint Leads dashboard as it looks on a phone, inside a phone frame:
// greeting banner, status counts two by two, recent leads as cards and the
// bottom tab bar. While it is shown, a fingertip uses it the way a person
// would: swipes the list up and down, searches for a client, and filters by
// stage from a bottom sheet. Notifications drop in from the top on their own
// timer. The phone never changes size. Every name and number is sample data.

import { useEffect, useRef, useState } from "react";
import {
  BatteryFull,
  Bell,
  CalendarCheck,
  CellSignalFull,
  ChatCircleDots,
  CheckCircle,
  Funnel,
  House,
  List,
  MagnifyingGlass,
  Phone,
  Plus,
  SlidersHorizontal,
  SquaresFour,
  Users,
  WifiHigh,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { StatusPill, statuses, type StatusKey } from "../components/dashboard-parts";
import WhatsappIcon from "../components/whatsapp-icon";
import { TimedToasts, TouchDot, fingertip, prefersStill, useOnScreen, wait, type DemoToast, type Touch } from "./live-demo";

// short labels so they fit two to a row on a phone
const stats: [StatusKey, number, string][] = [
  ["new", 36, "New"],
  ["contacted", 368, "Contacted"],
  ["visit", 91, "Visits"],
  ["quote", 202, "Quotes"],
  ["won", 12, "Won"],
  ["hold", 289, "On hold"],
];

type Lead = { title: string; project: string; contact: string; agent: string; status: StatusKey; short?: string };
const leads: Lead[] = [
  { title: "10 marla plot, G block", project: "Bahria Town (Plots)", contact: "Usman Tariq", agent: "AR", status: "new" },
  { title: "Shop for rent, F-10", project: "City Rentals", contact: "Sara Khan", agent: "MK", status: "new" },
  { title: "2 bed apartment on loan", project: "Tower B (Sales)", contact: "Bilal Ahmed", agent: "ZA", status: "contacted" },
  { title: "Studio apartment for rent", project: "City Rentals", contact: "Hina Raza", agent: "HS", status: "visit", short: "Visit Scheduled" },
  { title: "Corner shop, Phase 7", project: "Phase 7 Shops", contact: "Ayesha Malik", agent: "AR", status: "quote", short: "Quotation Sent" },
  { title: "1 kanal house, Sector E", project: "Bahria Town (Plots)", contact: "Faisal Iqbal", agent: "MK", status: "visit", short: "Visit Scheduled" },
];

// the stages in the filter sheet
const sheetOptions: [StatusKey, string][] = [
  ["new", "New Lead"],
  ["contacted", "Contacted"],
  ["visit", "Visit Scheduled"],
  ["quote", "Quotation Sent"],
];

const toasts: DemoToast[] = [
  { icon: <WhatsappIcon className="size-3.5" />, tone: "#12b76a", title: "New enquiry", line: "Usman Tariq · just now" },
  { icon: <ChatCircleDots weight="fill" className="size-3.5" />, tone: "#2e90fa", title: "Client replied", line: "Sara Khan · Shop for rent" },
  { icon: <CalendarCheck weight="fill" className="size-3.5" />, tone: "#7a5af8", title: "Site visit booked", line: "Bilal Ahmed · Sun, 11 am" },
  { icon: <CheckCircle weight="fill" className="size-3.5" />, tone: "#f79009", title: "Follow-up done", line: "Hina Raza · on time" },
];

const tabs = [
  { label: "Home", icon: House, on: true },
  { label: "Leads", icon: Funnel },
  { label: "Projects", icon: SquaresFour },
  { label: "Users", icon: Users },
];

export default function MobileDashboard({ active = true }: { active?: boolean }) {
  const screen = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLSpanElement>(null);
  const clearRef = useRef<HTMLSpanElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const optionRefs = useRef<Partial<Record<StatusKey, HTMLSpanElement | null>>>({});

  const onScreen = useOnScreen(screen);
  const running = active && onScreen;

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [stage, setStage] = useState<StatusKey | null>(null);
  const [sheet, setSheet] = useState(false);
  const [picked, setPicked] = useState<StatusKey | null>(null);
  const [touch, setTouch] = useState<Touch | null>(null);

  // the script: swipe through the list, search, filter, and start again
  useEffect(() => {
    const root = screen.current;
    const sc = scroller.current;
    if (!root || !sc || !running || prefersStill()) return;
    let stop = false;
    const finger = fingertip(root, setTouch, () => !stop);

    (async () => {
      await wait(900);
      while (!stop) {
        // 1. swipe up to read the leads, then back down
        await finger.swipe(sc, 0.78, 0.4, sc.scrollHeight - sc.clientHeight);
        await wait(1100);
        await finger.swipe(sc, 0.4, 0.78, 0);
        await wait(700);

        // 2. search for a client, letter by letter, then clear it
        await finger.tap(searchRef.current);
        if (stop) return;
        setSearching(true);
        for (const ch of "Sara") {
          await wait(190);
          if (stop) return;
          setQuery((q) => q + ch);
        }
        await wait(1700);
        await finger.tap(clearRef.current);
        if (stop) return;
        setQuery("");
        setSearching(false);
        await wait(900);

        // 3. filter by a stage from the bottom sheet, then remove the filter
        await finger.tap(filterRef.current);
        if (stop) return;
        setSheet(true);
        await wait(700);
        setPicked("visit");
        await finger.tap(optionRefs.current.visit ?? null);
        if (stop) return;
        setStage("visit");
        await wait(250);
        setSheet(false);
        setPicked(null);
        await wait(1900);
        await finger.tap(chipRef.current);
        if (stop) return;
        setStage(null);
        await wait(1200);
      }
    })();

    return () => {
      stop = true;
      setTouch(null);
      setQuery("");
      setSearching(false);
      setStage(null);
      setSheet(false);
      setPicked(null);
      sc.scrollTo({ top: 0 });
    };
  }, [running]);

  const shown = leads.filter((l) => (!query || l.contact.toLowerCase().includes(query.toLowerCase())) && (!stage || l.status === stage));

  return (
    // phone frame
    <div className="relative mx-auto w-[300px] max-w-[calc(100%-6px)]">
      <span aria-hidden="true" className="absolute -left-[3px] top-[110px] h-7 w-[3px] rounded-l-sm bg-[#2b2b31]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[160px] h-12 w-[3px] rounded-l-sm bg-[#2b2b31]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[180px] h-16 w-[3px] rounded-r-sm bg-[#2b2b31]" />
      <div className="rounded-[50px] bg-gradient-to-b from-[#3a3a42] via-[#1c1c21] to-[#2c2c33] p-[3px] shadow-[0_50px_100px_-40px_rgba(25,40,80,0.6)]">
        <div className="rounded-[47px] bg-[#0b0b0e] p-[9px]">
          <div ref={screen} className="relative flex h-[600px] flex-col overflow-hidden rounded-[38px] bg-[#f2f4f7] text-[#101828]">
            {/* status bar */}
            <div className="relative flex h-11 flex-none items-center justify-between bg-white px-7 text-[12px] font-semibold">
              <span>9:41</span>
              <span className="absolute left-1/2 top-2 h-[24px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
              <span className="flex items-center gap-1">
                <CellSignalFull weight="fill" className="size-3.5" />
                <WifiHigh weight="bold" className="size-3.5" />
                <BatteryFull weight="fill" className="size-4" />
              </span>
            </div>

            {/* app bar */}
            <div className="flex flex-none items-center justify-between bg-white px-4 pb-2.5 pt-1">
              <List className="size-5 text-[#344054]" />
              <span className="grid size-8 place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgba(16,24,40,0.08)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/option-2/endpoint-mark.svg" alt="Endpoint Leads" className="size-5" />
              </span>
              <span className="relative">
                <Bell className="size-5 text-[#344054]" />
                <span className="absolute -right-2 -top-1.5 rounded-full bg-[#f04438] px-1 text-[7px] font-semibold leading-[12px] text-white">99+</span>
              </span>
            </div>

            {/* the scrolling page */}
            <div ref={scroller} className="no-scrollbar flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden p-2.5">
              {/* greeting banner with the counts */}
              <div className="flex flex-none flex-col gap-2 rounded-2xl bg-[linear-gradient(110deg,#ede9fe_0%,#e3dbff_45%,#d3c6ff_100%)] p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold leading-tight">Good Day, Super admin ☀️</p>
                    <p className="text-[10px] text-[#475467]">Your leads at a glance</p>
                  </div>
                  <span className="inline-flex h-6 flex-none items-center gap-0.5 rounded-full bg-brand px-2 text-[10px] font-medium text-white">
                    <Plus weight="bold" className="size-2.5" /> Lead
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {stats.map(([status, count, label]) => {
                    const st = statuses[status];
                    const Icon = st.icon;
                    return (
                      <div
                        key={status}
                        className={`relative flex min-w-0 items-center gap-1.5 rounded-lg border border-white/60 bg-white/90 py-1.5 pl-2.5 pr-2 text-[10px] text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-opacity duration-300 ${
                          stage && stage !== status ? "opacity-45" : ""
                        }`}
                      >
                        <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-sm" style={{ backgroundColor: st.color }} />
                        <Icon className="size-3 flex-none" style={{ color: st.color }} />
                        <span className="min-w-0 flex-1 truncate">{label}</span>
                        <span className="text-[11px] font-bold text-[#101828]">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* recent leads, with search and filter */}
              <div className="flex flex-none items-center gap-1.5 px-0.5">
                <p className="mr-auto text-[12px] font-semibold">Recent Leads</p>
                {/* the search keeps one width, typed into or not */}
                <span
                  ref={searchRef}
                  className={`inline-flex h-6 w-[92px] items-center gap-1 rounded-lg border bg-white px-2 text-[10px] transition-[border-color,box-shadow] ${
                    searching ? "border-[#7a5af8] text-[#101828] shadow-[0_0_0_3px_rgba(122,90,248,0.15)]" : "border-[#eaecf0] text-[#98a2b3]"
                  }`}
                >
                  <MagnifyingGlass className="size-3 flex-none" />
                  <span className="min-w-0 flex-1 truncate">
                    {searching ? (
                      <>
                        {query}
                        <span className="ml-px inline-block h-2.5 w-px animate-pulse bg-[#101828] align-middle" />
                      </>
                    ) : (
                      "Search"
                    )}
                  </span>
                  <span ref={clearRef} className={`grid size-3.5 flex-none place-items-center rounded-full bg-[#eaecf0] text-[#475467] ${query ? "" : "invisible"}`}>
                    <X weight="bold" className="size-2" />
                  </span>
                </span>
                <span
                  ref={filterRef}
                  className={`grid size-6 flex-none place-items-center rounded-lg border bg-white transition-colors ${
                    sheet || stage ? "border-[#7a5af8] text-[#5925dc]" : "border-[#eaecf0] text-[#475467]"
                  }`}
                >
                  <SlidersHorizontal className="size-3" />
                </span>
              </div>

              {/* the chosen stage, tapped to remove it */}
              {stage && (
                <div className="flex flex-none items-center gap-1.5 px-0.5 text-[10px] text-[#475467] animate-[demo-toast_300ms_ease-out]">
                  Showing
                  <span ref={chipRef} className="inline-flex items-center gap-1 rounded-full border border-[#d9d6fe] bg-[#f4f3ff] py-0.5 pl-2 pr-1 font-medium text-[#5925dc]">
                    {sheetOptions.find(([k]) => k === stage)?.[1]}
                    <X weight="bold" className="size-2.5" />
                  </span>
                </div>
              )}

              <ul className="flex flex-col gap-1.5">
                {shown.map((l) => (
                  <li key={l.title} className="flex flex-none flex-col gap-1.5 rounded-xl border border-[#eaecf0] bg-white p-2.5 animate-[demo-toast_300ms_ease-out]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold">{l.title}</p>
                        <p className="truncate text-[9.5px] text-[#667085]">{l.project}</p>
                      </div>
                      <StatusPill status={l.status} short={l.short} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#475467]">
                      <span className="flex items-center gap-1.5">
                        <span className="grid size-5 place-items-center rounded-full bg-[#f2f4f7] text-[8px] font-semibold">{l.agent}</span>
                        {l.contact}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="size-3" />
                        <WhatsappIcon className="size-3" />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* bottom tab bar and home bar */}
            <div className="relative z-10 flex-none border-t border-[#eaecf0] bg-white px-3 pt-1.5">
              <div className="flex justify-between">
                {tabs.map((t) => {
                  const Icon = t.icon;
                  return (
                    <span key={t.label} className={`flex flex-1 flex-col items-center gap-0.5 py-1 text-[9px] ${t.on ? "font-semibold text-brand" : "text-[#667085]"}`}>
                      <Icon weight={t.on ? "fill" : "regular"} className="size-[18px]" />
                      {t.label}
                    </span>
                  );
                })}
              </div>
              <div className="flex h-5 items-center justify-center">
                <span className="h-1 w-24 rounded-full bg-[#101828]" />
              </div>
            </div>

            {/* the filter sheet, sliding up from the bottom */}
            <div aria-hidden="true" className={`absolute inset-0 z-20 bg-[#101828]/25 transition-opacity duration-300 ${sheet ? "opacity-100" : "pointer-events-none opacity-0"}`} />
            <div
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 z-20 flex flex-col gap-1 rounded-t-[22px] bg-white px-3 pb-7 pt-2 shadow-[0_-12px_30px_-12px_rgba(16,24,40,0.3)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                sheet ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <span className="mx-auto mb-1.5 h-1 w-9 rounded-full bg-[#d0d5dd]" />
              <p className="px-1 pb-1 text-[12px] font-semibold">Filter by stage</p>
              {sheetOptions.map(([k, label]) => (
                <span
                  key={k}
                  ref={(el) => {
                    optionRefs.current[k] = el;
                  }}
                  className={`flex items-center justify-between rounded-xl px-2 py-2 transition-colors ${picked === k ? "bg-[#f4f3ff]" : ""}`}
                >
                  <StatusPill status={k} short={label} />
                  <span className={`grid size-4 place-items-center rounded-full border-2 ${picked === k ? "border-[#7a5af8]" : "border-[#d0d5dd]"}`}>
                    {picked === k && <span className="size-1.5 rounded-full bg-[#7a5af8]" />}
                  </span>
                </span>
              ))}
            </div>

            {/* notifications drop in from the top, one at a time, like on a phone */}
            <TimedToasts running={running} items={toasts} compact max={1} every={4200} className="left-1/2 top-[50px] -translate-x-1/2" />

            {/* the fingertip */}
            <TouchDot t={touch} />
          </div>
        </div>
      </div>
    </div>
  );
}
