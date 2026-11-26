"use client";

// Option 2's own copy of the dashboard's leads screen, made to be "used" by a
// scripted cursor: it types into Search and the table narrows to that client,
// opens Filter and picks a stage so only those leads show, flips between
// Overview and Analytics, and clicks View All to bring every lead back.
// Notifications arrive on their own timer. The table has fixed columns so
// every row lines up. The shared dashboard screen (used on the home page) is
// left as it is. Every name and number is sample data.

import { useEffect, useRef, useState } from "react";
import {
  CalendarCheck,
  Check,
  DownloadSimple,
  MagnifyingGlass,
  PaperPlaneTilt,
  Phone,
  Plus,
  SlidersHorizontal,
  Trophy,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { Initials, StatCard, StatusPill, type StatusKey } from "../components/dashboard-parts";
import WhatsappIcon from "../components/whatsapp-icon";
import { DemoCursor, TimedToasts, TouchDot, fingertip, pointOn, prefersStill, useOnScreen, useSmallScreen, wait, type DemoToast, type Point, type Touch } from "./live-demo";

const leadStats: [StatusKey, number][] = [
  ["new", 36],
  ["contacted", 368],
  ["qualified", 9],
  ["visit", 91],
  ["quote", 202],
  ["nego", 43],
  ["hold", 289],
  ["token", 4],
  ["won", 12],
  ["lost", 754],
];

type Lead = { ref: string; title: string; project: string; contact: string; phone: string; agent: [string, string]; status: StatusKey };
const leads: Lead[] = [
  { ref: "EL-1847", title: "10 marla plot, G block", project: "Bahria Town (Plots)", contact: "Usman Tariq", phone: "0300 ••• 4521", agent: ["AR", "Ali Raza"], status: "new" },
  { ref: "EL-1846", title: "Shop for rent, F-10", project: "City Rentals", contact: "Sara Khan", phone: "0321 ••• 8830", agent: ["MK", "Maha Khan"], status: "new" },
  { ref: "EL-1845", title: "2 bed apartment on loan", project: "Tower B (Sales)", contact: "Bilal Ahmed", phone: "0333 ••• 1975", agent: ["ZA", "Zoya Ahmed"], status: "contacted" },
  { ref: "EL-1844", title: "Studio apartment for rent", project: "City Rentals", contact: "Hina Raza", phone: "0345 ••• 6602", agent: ["HS", "Hamza Sheikh"], status: "visit" },
  { ref: "EL-1843", title: "Corner shop, Phase 7", project: "Phase 7 Shops", contact: "Ayesha Malik", phone: "0312 ••• 2748", agent: ["AR", "Ali Raza"], status: "quote" },
];

// the stages offered in the Filter dropdown
const filterOptions: StatusKey[] = ["new", "contacted", "visit", "quote"];

const toasts: DemoToast[] = [
  { icon: <WhatsappIcon className="size-4" />, tone: "#12b76a", title: "New enquiry from WhatsApp", line: "Usman Tariq · 10 marla plot" },
  { icon: <CalendarCheck weight="fill" className="size-4" />, tone: "#7a5af8", title: "Site visit booked", line: "Hina Raza · Sat, 4:00 pm" },
  { icon: <PaperPlaneTilt weight="fill" className="size-4" />, tone: "#ee46bc", title: "Quotation opened", line: "Ayesha Malik · Phase 7 shop" },
  { icon: <Trophy weight="fill" className="size-4" />, tone: "#f79009", title: "Deal closed, well done!", line: "Ali Raza · 2 bed apartment" },
];

const projectTone: Record<string, string> = { "Bahria Town (Plots)": "#0ba5ec", "Tower B (Sales)": "#12b76a", "City Rentals": "#0ba5ec", "Phase 7 Shops": "#12b76a" };
const initialsOf = (name: string) =>
  name.replace(/[()]/g, "").split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function ProjectPill({ name }: { name: string }) {
  const tone = projectTone[name] ?? "#12b76a";
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#eaecf0] bg-white py-0.5 pl-0.5 pr-2 text-[10px] text-[#344054]">
      <span className="grid size-4 flex-none place-items-center rounded-full text-[7px] font-semibold" style={{ backgroundColor: `${tone}22`, color: tone }}>
        {initialsOf(name)}
      </span>
      <span className="truncate">{name}</span>
    </span>
  );
}

const banner = "rounded-2xl bg-[linear-gradient(110deg,#ede9fe_0%,#e3dbff_45%,#d3c6ff_100%)] p-3 sm:p-4";
const ghostBtn = "inline-flex h-7 items-center gap-1.5 rounded-lg border bg-white px-2.5 text-[11px] font-medium text-[#344054] transition-colors";
// fixed columns, so every row lines up with the header
const cols =
  "grid grid-cols-[minmax(0,1fr)_112px] items-center gap-3 sm:grid-cols-[64px_minmax(0,1.5fr)_minmax(0,1.3fr)_112px] lg:grid-cols-[64px_minmax(0,1.4fr)_minmax(0,1.3fr)_minmax(0,1.15fr)_minmax(0,1.1fr)_112px]";

export default function LiveLeadsScreen({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(root);
  const running = active && onScreen;

  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<StatusKey | null>(null);
  const [menu, setMenu] = useState(false);
  const [hoverOption, setHoverOption] = useState<StatusKey | null>(null);
  const [tab, setTab] = useState<"Overview" | "Analytics">("Overview");
  const [at, setAt] = useState<Point | null>(null);
  const [clicks, setClicks] = useState(0);
  const [touch, setTouch] = useState<Touch | null>(null);
  // on phones a fingertip taps the buttons instead of an arrow clicking them
  const small = useSmallScreen();

  const searchRef = useRef<HTMLSpanElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const viewAllRef = useRef<HTMLSpanElement>(null);
  const analyticsRef = useRef<HTMLSpanElement>(null);
  const overviewRef = useRef<HTMLSpanElement>(null);
  const optionRefs = useRef<Partial<Record<StatusKey, HTMLSpanElement | null>>>({});

  // the script: search, reset, filter, reset, switch tabs, repeat
  useEffect(() => {
    const box = root.current;
    if (!box || !running || prefersStill()) return;
    let stop = false;
    const finger = fingertip(box, setTouch, () => !stop);
    let target: HTMLElement | null = null;
    const go = async (el: HTMLElement | null | undefined, pause = 900) => {
      if (stop) return;
      target = el ?? null;
      if (small) {
        await wait(pause * 0.5);
        return;
      }
      const p = pointOn(box, target);
      if (p) setAt(p);
      await wait(pause);
    };
    const click = async () => {
      if (stop) return;
      if (small) return finger.tap(target);
      setClicks((c) => c + 1);
      await wait(250);
    };
    const reset = async () => {
      await go(viewAllRef.current);
      await click();
      setQuery("");
      setStage(null);
      await wait(1100);
    };

    (async () => {
      if (!small) setAt({ x: box.clientWidth * 0.55, y: box.clientHeight * 0.55 });
      await wait(700);
      while (!stop) {
        // 1. search for a client, letter by letter
        await go(searchRef.current);
        await click();
        for (const ch of "Sara") {
          if (stop) return;
          setQuery((q) => q + ch);
          await wait(170);
        }
        await wait(1500);
        await reset();

        // 2. filter by a stage from the dropdown
        await go(filterRef.current);
        await click();
        setMenu(true);
        await wait(450);
        for (const s of ["contacted", "visit"] as StatusKey[]) {
          await go(optionRefs.current[s], 550);
          setHoverOption(s);
        }
        await click();
        setStage("visit");
        setMenu(false);
        setHoverOption(null);
        await wait(1700);
        await reset();

        // 3. flip to Analytics and back
        await go(analyticsRef.current);
        await click();
        setTab("Analytics");
        await wait(1300);
        await go(overviewRef.current, 700);
        await click();
        setTab("Overview");
        await wait(900);
      }
    })();

    return () => {
      stop = true;
      setQuery("");
      setStage(null);
      setMenu(false);
      setHoverOption(null);
      setTab("Overview");
      setAt(null);
      setTouch(null);
    };
  }, [running, small]);

  const rows = leads.filter(
    (l) => (!query || l.contact.toLowerCase().includes(query.toLowerCase())) && (!stage || l.status === stage),
  );

  return (
    <div ref={root} className="relative flex min-w-0 flex-1 flex-col gap-2">
      <div className={`${banner} flex flex-col gap-3`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[17px] font-semibold tracking-[-0.01em] text-[#101828] sm:text-[19px]">
              Good Day, Super admin <span aria-hidden="true">☀️</span>
            </p>
            {/* both lines share one cell, so switching tabs never changes the height */}
            <p className="grid text-[11px] text-[#475467]">
              <span className={`[grid-area:1/1] ${tab === "Overview" ? "" : "invisible"}`}>Here’s a quick overview of your leads and projects</span>
              <span className={`[grid-area:1/1] ${tab === "Analytics" ? "" : "invisible"}`}>Leads this month, by stage and by agent</span>
            </p>
          </div>
          <div className="flex flex-none items-center gap-2">
            <span className="hidden rounded-lg bg-white/50 p-0.5 text-[11px] font-medium text-[#475467] sm:inline-flex">
              {(["Overview", "Analytics"] as const).map((t) => (
                <span
                  key={t}
                  ref={t === "Overview" ? overviewRef : analyticsRef}
                  className={`rounded-md px-2.5 py-1 transition-colors duration-300 ${tab === t ? "bg-white text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.1)]" : ""}`}
                >
                  {t}
                </span>
              ))}
            </span>
            <span className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-full bg-brand px-3 text-[11px] font-medium text-white">
              <Plus weight="bold" className="size-3" /> New Lead
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 xl:grid-cols-5">
          {leadStats.map(([status, count], i) => (
            <StatCard
              key={status}
              status={status}
              count={count}
              className={`${i > 5 ? "hidden sm:flex" : ""} transition-[opacity,box-shadow] duration-300 ${stage && stage !== status ? "opacity-45" : ""} ${stage === status ? "ring-2 ring-[#7a5af8]/50" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center gap-2 px-1">
        <p className="text-[13px] font-semibold text-[#101828]">Recent Leads</p>
        <span className="rounded-md border border-[#eaecf0] bg-white px-1.5 text-[10px] text-[#475467]">{rows.length === leads.length ? 20 : rows.length}</span>
        {/* on phones the search and buttons drop to their own row */}
        <span aria-hidden="true" className="basis-full max-sm:order-1 sm:hidden" />
        {/* search, typed into by the cursor */}
        <span
          ref={searchRef}
          className={`inline-flex h-7 min-w-0 items-center gap-1.5 rounded-lg border bg-white px-2.5 text-[11px] transition-colors max-sm:order-2 max-sm:flex-1 sm:w-36 ${
            query ? "border-[#7a5af8] text-[#101828] shadow-[0_0_0_3px_rgba(122,90,248,0.15)]" : "border-[#eaecf0] text-[#98a2b3]"
          }`}
        >
          <MagnifyingGlass className="size-3.5 flex-none" />
          {query ? (
            <>
              {query}
              <span className="-ml-1 h-3.5 w-px animate-pulse bg-[#101828]" />
            </>
          ) : (
            "Search"
          )}
        </span>
        {/* the chosen stage, as a removable chip */}
        {stage && (
          <span className="hidden items-center gap-1 rounded-full border border-[#d9d6fe] bg-[#f4f3ff] py-0.5 pl-2 pr-1 text-[10px] font-medium text-[#5925dc] animate-[demo-toast_300ms_ease-out] sm:inline-flex">
            Visit Scheduled <X weight="bold" className="size-2.5" />
          </span>
        )}
        <span className="flex items-center gap-1.5 max-sm:order-3 sm:ml-auto">
          <span className={`${ghostBtn} border-[#d0d5dd]`}>
            <DownloadSimple className="size-3.5" /> Export Leads
          </span>
          <span className="relative">
            <span ref={filterRef} className={`${ghostBtn} ${menu || stage ? "border-[#7a5af8] text-[#5925dc]" : "border-[#d0d5dd]"}`}>
              <SlidersHorizontal className="size-3.5" /> Filter
            </span>
            {/* the dropdown the cursor picks from */}
            <span
              className={`absolute right-0 top-full z-20 mt-1.5 flex w-44 origin-top-right flex-col rounded-xl border border-[#eaecf0] bg-white p-1 shadow-[0_16px_32px_-12px_rgba(16,24,40,0.3)] transition-[opacity,scale] duration-200 ${
                menu ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <span className="px-2 pb-1 pt-1.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#667085]">Filter by stage</span>
              {filterOptions.map((s) => (
                <span
                  key={s}
                  ref={(el) => {
                    optionRefs.current[s] = el;
                  }}
                  className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-[11px] text-[#344054] transition-colors ${hoverOption === s ? "bg-[#f4f3ff] text-[#5925dc]" : ""}`}
                >
                  <StatusPill status={s} short={s === "visit" ? "Visit Scheduled" : undefined} />
                  {stage === s && <Check weight="bold" className="size-3" />}
                </span>
              ))}
            </span>
          </span>
          <span ref={viewAllRef} className={`${ghostBtn} border-[#d0d5dd]`}>
            View All
          </span>
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#eaecf0] bg-white">
        <div className={`${cols} border-b border-[#eaecf0] bg-[#f9fafb] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#667085]`}>
          <span className="hidden sm:block">Ref. No</span>
          <span>Title</span>
          <span className="hidden sm:block">Project</span>
          <span className="hidden lg:block">Contact</span>
          <span className="hidden lg:block">Agent</span>
          <span className="text-right">Status</span>
        </div>
        {/* every lead keeps its row: the ones hidden by the search or filter
            stay below as blank space, so the card never changes height */}
        {[...rows, ...leads.filter((l) => !rows.includes(l))].map((l) => (
          <div
            key={l.ref}
            aria-hidden={!rows.includes(l)}
            className={`${cols} border-b border-[#f2f4f7] px-3 py-2 text-[11px] text-[#344054] last:border-0 ${rows.includes(l) ? "animate-[demo-toast_300ms_ease-out]" : "invisible"}`}
          >
            <span className="hidden text-[#475467] sm:block">{l.ref}</span>
            <span className="min-w-0 truncate font-medium text-[#101828]">{l.title}</span>
            <span className="hidden min-w-0 sm:block">
              <ProjectPill name={l.project} />
            </span>
            <span className="hidden min-w-0 lg:block">
              <span className="block truncate text-[#101828]">{l.contact}</span>
              <span className="flex items-center gap-1.5 text-[10px] text-[#667085]">
                {l.phone}
                <Phone className="size-3" />
                <WhatsappIcon className="size-3" />
              </span>
            </span>
            <span className="hidden min-w-0 items-center gap-1.5 lg:flex">
              <Initials text={l.agent[0]} size="size-6" />
              <span className="truncate">{l.agent[1]}</span>
            </span>
            <span className="flex justify-end">
              <StatusPill status={l.status} short={l.status === "visit" ? "Visit Scheduled" : undefined} />
            </span>
          </div>
        ))}
      </div>

      {/* the cursor, and notifications that arrive on their own */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
        <DemoCursor at={at} clicks={clicks} />
        <TouchDot t={touch} />
      </div>
      <TimedToasts
        running={running}
        items={toasts}
        max={2}
        className="bottom-2 right-2 max-sm:origin-bottom-right max-sm:scale-[0.8] max-sm:[&>*:nth-last-child(n+2)]:hidden"
      />
    </div>
  );
}
