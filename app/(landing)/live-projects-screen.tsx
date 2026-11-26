"use client";

// Option 2's projects screen, used by a scripted pointer (an arrow on
// computers, a fingertip on phones): it searches for a project, filters by
// type from a dropdown, and taps a stage so that stage stands out in every
// project. Rows that are filtered out keep their space, so the card never
// changes height. The shared dashboard screen (home page) is left as it is.
// Every name and number is sample data.

import { useEffect, useRef, useState } from "react";
import { Buildings, Plus } from "@phosphor-icons/react/dist/ssr";
import { statuses, type StatusKey } from "../components/dashboard-parts";
import { prefersStill, useHand, useOnScreen, wait } from "./live-demo";
import { BannerStat, DemoSelect, SearchBox, banner, initialsOf, primaryBtn, projectTone, tableCard, th } from "./live-screen-parts";

type Kind = "All Types" | "Sales" | "Rental" | "Development";
const kinds: Kind[] = ["All Types", "Sales", "Rental", "Development"];

const projects: { name: string; type: Kind; total: number; breakdown: [StatusKey, number][] }[] = [
  { name: "Bahria Town (Plots)", type: "Sales", total: 294, breakdown: [["new", 7], ["contacted", 23], ["visit", 17], ["quote", 26], ["hold", 64], ["won", 4], ["lost", 147]] },
  { name: "Tower B (Sales)", type: "Sales", total: 448, breakdown: [["new", 2], ["contacted", 17], ["visit", 49], ["quote", 100], ["token", 3], ["won", 6], ["lost", 178]] },
  { name: "City Rentals", type: "Rental", total: 635, breakdown: [["new", 24], ["contacted", 198], ["visit", 11], ["quote", 36], ["nego", 13], ["won", 2]] },
  { name: "Phase 7 Shops", type: "Sales", total: 67, breakdown: [["contacted", 1], ["qualified", 2], ["quote", 14], ["hold", 3], ["lost", 46]] },
  { name: "Construction", type: "Development", total: 10, breakdown: [["contacted", 2], ["visit", 2], ["quote", 3], ["hold", 3]] },
];

const shortLabel: Partial<Record<StatusKey, string>> = { visit: "Visit / Meeting", nego: "Negotiation" };
const cols = "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[minmax(0,1.1fr)_96px_minmax(0,2.6fr)]";

export default function LiveProjectsScreen() {
  const root = useRef<HTMLDivElement>(null);
  const running = useOnScreen(root);
  const { make, reset, layer } = useHand();

  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<Kind>("All Types");
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState<Kind | null>(null);
  const [lit, setLit] = useState<StatusKey | null>(null);

  const searchRef = useRef<HTMLSpanElement>(null);
  const clearRef = useRef<HTMLSpanElement>(null);
  const kindRef = useRef<HTMLSpanElement>(null);
  const optionRefs = useRef<Partial<Record<Kind, HTMLSpanElement | null>>>({});
  const chipRef = useRef<HTMLSpanElement>(null);

  // the script: search, filter by type, light up one stage, repeat
  useEffect(() => {
    const box = root.current;
    if (!box || !running || prefersStill()) return;
    let stop = false;
    const hand = make(box, () => !stop);

    const pick = async (k: Kind) => {
      await hand.go(kindRef.current);
      await hand.click();
      if (stop) return;
      setMenu(true);
      await wait(450);
      await hand.go(optionRefs.current[k], 600);
      setHover(k);
      await hand.click();
      if (stop) return;
      setKind(k);
      setMenu(false);
      setHover(null);
    };

    (async () => {
      hand.start();
      await wait(800);
      while (!stop) {
        // 1. search for a project, letter by letter, then clear it
        await hand.go(searchRef.current);
        await hand.click();
        for (const ch of "City") {
          if (stop) return;
          setQuery((q) => q + ch);
          await wait(180);
        }
        await wait(1500);
        await hand.go(clearRef.current, 700);
        await hand.click();
        setQuery("");
        await wait(900);

        // 2. show only the sales projects, then all types again
        await pick("Sales");
        await wait(1800);
        await pick("All Types");
        await wait(900);

        // 3. tap a stage so it stands out in every project, then tap it off
        await hand.go(chipRef.current);
        await hand.click();
        if (stop) return;
        setLit("contacted");
        await wait(2000);
        await hand.click();
        setLit(null);
        await wait(900);
      }
    })();

    return () => {
      stop = true;
      setQuery("");
      setKind("All Types");
      setMenu(false);
      setHover(null);
      setLit(null);
      reset();
    };
  }, [running, make, reset]);

  const rows = projects.filter((p) => (!query || p.name.toLowerCase().includes(query.toLowerCase())) && (kind === "All Types" || p.type === kind));
  // every project keeps its row; the hidden ones stay below as blank space
  const ordered = [...rows, ...projects.filter((p) => !rows.includes(p))];

  return (
    <div ref={root} className="relative flex min-w-0 flex-1 flex-col gap-2">
      <div className={`${banner} flex flex-wrap items-center gap-3`}>
        <span className="grid size-9 flex-none place-items-center rounded-full bg-white text-[#344054] shadow-[0_1px_3px_rgba(16,24,40,0.15)]">
          <Buildings weight="fill" className="size-4.5" />
        </span>
        <p className="mr-auto text-[18px] text-[#101828]">Projects</p>
        <span className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:flex-wrap">
          <BannerStat label="Total Projects" short="Projects" count={5} color="#f04438" />
          <BannerStat label="Active Projects" short="Active" count={5} color="#f79009" />
          <BannerStat label="Total Leads" short="Leads" count={1454} color="#12b76a" />
        </span>
      </div>

      <div className={tableCard}>
        <div className="relative z-10 flex flex-wrap items-center gap-2 border-b border-[#eaecf0] px-3 py-2">
          <SearchBox query={query} boxRef={searchRef} clearRef={clearRef} className="w-full sm:w-40" />
          <DemoSelect
            label="All Types"
            options={kinds}
            value={kind}
            open={menu}
            hover={hover}
            buttonRef={kindRef}
            optionRef={(o, el) => {
              optionRefs.current[o] = el;
            }}
            className="w-[104px] flex-none sm:ml-auto"
          />
          <span className={`${primaryBtn} max-sm:ml-auto`}>
            <Plus weight="bold" className="size-3" />
            <span className="sm:hidden">New</span>
            <span className="hidden sm:inline">New Project</span>
          </span>
        </div>
        <div className={`${cols} border-b border-[#eaecf0] bg-[#f9fafb] px-3 py-2 ${th}`}>
          <span>Project</span>
          <span>Total Leads</span>
          <span className="hidden lg:block">Status Breakdown</span>
        </div>
        {ordered.map((p, i) => {
          const shown = rows.includes(p);
          return (
            <div
              key={p.name}
              aria-hidden={!shown}
              className={`${cols} border-b border-[#f2f4f7] px-3 py-2 text-[11px] last:border-0 ${shown ? "animate-[demo-toast_300ms_ease-out]" : "invisible"} ${i >= 2 ? "max-sm:hidden" : ""}`}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="grid size-8 flex-none place-items-center rounded-full text-[9px] font-semibold text-white" style={{ backgroundColor: projectTone[p.name] }}>
                  {initialsOf(p.name)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium text-[#101828]">{p.name}</span>
                  <span className="block text-[10px] text-[#667085]">{p.type}</span>
                </span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap text-[10px] text-[#475467]">
                <span className="hidden sm:inline">Total Leads</span>
                <span className="rounded-full bg-[#d1fadf] px-1.5 py-0.5 font-semibold text-[#067647]">{p.total}</span>
              </span>
              {/* on phones only the first two stages show, so rows stay short */}
              <span className="col-span-2 flex flex-wrap gap-1 max-sm:[&>*:nth-child(n+3)]:hidden lg:col-span-1">
                {p.breakdown.map(([status, count]) => (
                  <span
                    key={status}
                    ref={status === "contacted" && shown && i === 0 ? chipRef : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 text-[10px] text-[#344054] transition-[opacity,border-color,background-color] duration-300 ${
                      lit === status ? "border-[#7a5af8] bg-[#f4f3ff]" : "border-[#eaecf0] bg-white"
                    } ${lit && lit !== status ? "opacity-35" : ""}`}
                  >
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: statuses[status].color }} />
                    {shortLabel[status] ?? statuses[status].label}
                    <strong className="font-semibold text-[#101828]">{count}</strong>
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>

      {/* the arrow on computers, the fingertip on phones */}
      {layer}
    </div>
  );
}
