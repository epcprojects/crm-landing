// The Endpoint Leads dashboard as it looks on a phone, inside a phone frame:
// greeting banner, status counts two by two, recent leads as cards and the
// bottom tab bar. Built from the same parts as the web dashboard; every name
// and number is sample data.

import {
  BatteryFull,
  Bell,
  CellSignalFull,
  Funnel,
  House,
  List,
  MagnifyingGlass,
  Phone,
  Plus,
  SquaresFour,
  Users,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import { StatusPill, statuses, type StatusKey } from "../components/dashboard-parts";
import WhatsappIcon from "../components/whatsapp-icon";

// short labels so they fit two to a row on a phone
const stats: [StatusKey, number, string][] = [
  ["new", 36, "New"],
  ["contacted", 368, "Contacted"],
  ["visit", 91, "Visits"],
  ["quote", 202, "Quotes"],
  ["won", 12, "Won"],
  ["hold", 289, "On hold"],
];

const leads: { title: string; project: string; contact: string; agent: string; status: StatusKey; short?: string }[] = [
  { title: "10 marla plot, G block", project: "Bahria Town (Plots)", contact: "Usman Tariq", agent: "AR", status: "new" },
  { title: "Shop for rent, F-10", project: "City Rentals", contact: "Sara Khan", agent: "MK", status: "new" },
  { title: "2 bed apartment on loan", project: "Tower B (Sales)", contact: "Bilal Ahmed", agent: "ZA", status: "contacted" },
  { title: "Studio apartment for rent", project: "City Rentals", contact: "Hina Raza", agent: "HS", status: "visit", short: "Visit Scheduled" },
];

const tabs = [
  { label: "Home", icon: House, on: true },
  { label: "Leads", icon: Funnel },
  { label: "Projects", icon: SquaresFour },
  { label: "Users", icon: Users },
];

export default function MobileDashboard() {
  return (
    // phone frame
    <div className="relative mx-auto w-[300px] max-w-[calc(100%-6px)]">
      <span aria-hidden="true" className="absolute -left-[3px] top-[110px] h-7 w-[3px] rounded-l-sm bg-[#2b2b31]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[160px] h-12 w-[3px] rounded-l-sm bg-[#2b2b31]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[180px] h-16 w-[3px] rounded-r-sm bg-[#2b2b31]" />
      <div className="rounded-[50px] bg-gradient-to-b from-[#3a3a42] via-[#1c1c21] to-[#2c2c33] p-[3px] shadow-[0_50px_100px_-40px_rgba(25,40,80,0.6)]">
        <div className="rounded-[47px] bg-[#0b0b0e] p-[9px]">
          <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[38px] bg-[#f2f4f7] text-[#101828]">
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
                <img src="/option-2/endpoint-mark.svg" alt="Endpoint Leads" className="size-5" />
              </span>
              <span className="relative">
                <Bell className="size-5 text-[#344054]" />
                <span className="absolute -right-2 -top-1.5 rounded-full bg-[#f04438] px-1 text-[7px] font-semibold leading-[12px] text-white">99+</span>
              </span>
            </div>

            <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden p-2.5">
              {/* greeting banner with the counts */}
              <div className="flex flex-col gap-2 rounded-2xl bg-[linear-gradient(110deg,#ede9fe_0%,#e3dbff_45%,#d3c6ff_100%)] p-3">
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
                      <div key={status} className="relative flex min-w-0 items-center gap-1.5 rounded-lg border border-white/60 bg-white/90 py-1.5 pl-2.5 pr-2 text-[10px] text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                        <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-sm" style={{ backgroundColor: st.color }} />
                        <Icon className="size-3 flex-none" style={{ color: st.color }} />
                        <span className="min-w-0 flex-1 truncate">{label}</span>
                        <span className="text-[11px] font-bold text-[#101828]">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* recent leads */}
              <div className="flex items-center justify-between px-0.5">
                <p className="text-[12px] font-semibold">Recent Leads</p>
                <span className="inline-flex h-6 items-center gap-1 rounded-lg border border-[#eaecf0] bg-white px-2 text-[10px] text-[#98a2b3]">
                  <MagnifyingGlass className="size-3" /> Search
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {leads.map((l) => (
                  <li key={l.title} className="flex flex-col gap-1.5 rounded-xl border border-[#eaecf0] bg-white p-2.5">
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
            <div className="flex-none border-t border-[#eaecf0] bg-white px-3 pt-1.5">
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
          </div>
        </div>
      </div>
    </div>
  );
}
