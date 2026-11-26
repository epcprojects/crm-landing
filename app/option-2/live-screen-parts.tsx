// Small pieces shared by Option 2's scripted Projects and Users screens:
// button and banner styles, a banner count, project pills and a dropdown that
// the demo's pointer opens and picks from. Every name is sample data.

import type { ReactNode, Ref } from "react";
import { CaretDown, Check, MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";

export const banner = "rounded-2xl bg-[linear-gradient(110deg,#ede9fe_0%,#e3dbff_45%,#d3c6ff_100%)] p-3 sm:p-4";
// on phones both lists take the same height, so the Projects and Users cards match
export const tableCard = "flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#eaecf0] bg-white max-sm:min-h-[308px]";
export const ghostBtn = "inline-flex h-7 items-center gap-1.5 rounded-lg border bg-white px-2.5 text-[11px] font-medium text-[#344054] transition-colors";
export const primaryBtn = "inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-full bg-brand px-3 text-[11px] font-medium text-white";
export const th = "text-[9px] font-semibold uppercase tracking-[0.06em] text-[#667085]";

export const projectTone: Record<string, string> = {
  "Bahria Town (Plots)": "#0ba5ec",
  "Tower B (Sales)": "#12b76a",
  "City Rentals": "#0ba5ec",
  "Phase 7 Shops": "#12b76a",
  Construction: "#12b76a",
};

export const initialsOf = (name: string) =>
  name.replace(/[()]/g, "").split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

/** A count on a banner: coloured edge, label and number. */
export function BannerStat({ label, short, count, color, lit = false }: { label: string; /** a shorter label for phones */ short?: string; count: number; color: string; lit?: boolean }) {
  return (
    <span
      // on phones: label over number, so three fit on one line
      className={`relative inline-flex min-w-0 flex-col items-start rounded-lg border bg-white/90 py-1.5 pl-2.5 pr-2 text-[10px] leading-tight text-[#344054] transition-[box-shadow,border-color] duration-300 sm:flex-row sm:items-center sm:gap-2 sm:pl-3 sm:pr-2.5 sm:text-[11px] sm:leading-normal ${
        lit ? "border-[#7a5af8] shadow-[0_0_0_3px_rgba(122,90,248,0.18)]" : "border-white/60"
      }`}
    >
      <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-sm" style={{ backgroundColor: color }} />
      <span className="w-full truncate sm:w-auto">
        {short ? (
          <>
            <span className="sm:hidden">{short}</span>
            <span className="hidden sm:inline">{label}</span>
          </>
        ) : (
          label
        )}
      </span>
      <strong key={count} className="text-[13px] font-bold text-[#101828] animate-[demo-toast_300ms_ease-out] sm:text-[12px]">
        {count}
      </strong>
    </span>
  );
}

export function ProjectPill({ name }: { name: string }) {
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

/** A search box the demo types into; it keeps one width, typed into or not. */
export function SearchBox({ query, boxRef, clearRef, className = "" }: { query: string; boxRef: Ref<HTMLSpanElement>; clearRef: Ref<HTMLSpanElement>; className?: string }) {
  return (
    <span
      ref={boxRef}
      className={`inline-flex h-7 min-w-0 items-center gap-1.5 rounded-lg border bg-white px-2.5 text-[11px] transition-[border-color,box-shadow] ${
        query ? "border-[#7a5af8] text-[#101828] shadow-[0_0_0_3px_rgba(122,90,248,0.15)]" : "border-[#eaecf0] text-[#98a2b3]"
      } ${className}`}
    >
      <MagnifyingGlass className="size-3.5 flex-none" />
      <span className="min-w-0 flex-1 truncate">
        {query ? (
          <>
            {query}
            <span className="ml-px inline-block h-3 w-px animate-pulse bg-[#101828] align-middle" />
          </>
        ) : (
          "Search"
        )}
      </span>
      <span ref={clearRef} className={`grid size-4 flex-none place-items-center rounded-full bg-[#eaecf0] text-[#475467] ${query ? "" : "invisible"}`}>
        <X weight="bold" className="size-2.5" />
      </span>
    </span>
  );
}

/** A dropdown button and its menu; `hover` is the option the pointer is on. */
export function DemoSelect<T extends string>({
  label,
  options,
  value,
  open,
  hover,
  buttonRef,
  optionRef,
  render,
  className = "",
  align = "right",
}: {
  label: string;
  options: T[];
  value: T;
  open: boolean;
  hover: T | null;
  buttonRef: Ref<HTMLSpanElement>;
  optionRef: (o: T, el: HTMLSpanElement | null) => void;
  render?: (o: T) => ReactNode;
  className?: string;
  align?: "left" | "right";
}) {
  const on = open || value !== options[0];
  return (
    <span className={`relative ${className}`}>
      <span ref={buttonRef} className={`${ghostBtn} w-full justify-between ${on ? "border-[#7a5af8] text-[#5925dc]" : "border-[#d0d5dd]"}`}>
        <span className="truncate">{value === options[0] ? label : value}</span>
        <CaretDown weight="bold" className={`size-2.5 flex-none transition-transform ${open ? "rotate-180" : ""}`} />
      </span>
      <span
        className={`absolute top-full z-20 mt-1.5 flex w-40 flex-col rounded-xl border border-[#eaecf0] bg-white p-1 shadow-[0_16px_32px_-12px_rgba(16,24,40,0.3)] transition-[opacity,scale] duration-200 ${
          // on phones the button sits on the left edge, so the menu always opens to the right
          align === "right" ? "left-0 origin-top-left sm:left-auto sm:right-0 sm:origin-top-right" : "left-0 origin-top-left"
        } ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
      >
        {options.map((o) => (
          <span
            key={o}
            ref={(el) => optionRef(o, el)}
            className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-[11px] text-[#344054] transition-colors ${hover === o ? "bg-[#f4f3ff] text-[#5925dc]" : ""}`}
          >
            {render ? render(o) : o}
            {value === o && <Check weight="bold" className="size-3" />}
          </span>
        ))}
      </span>
    </span>
  );
}
