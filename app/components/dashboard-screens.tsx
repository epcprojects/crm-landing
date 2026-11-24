// Three screens drawn after the Endpoint Leads dashboard: the leads overview,
// the users list and the projects list, inside the app's own frame with its
// dark side rail. The layout and components follow the real product; every
// name, number, email and count is sample data, never a real client's.

import type { ReactNode } from "react";
import {
  AddressBook,
  Bell,
  Buildings,
  CheckCircle,
  DotsThreeVertical,
  DownloadSimple,
  Funnel,
  House,
  MagnifyingGlass,
  Phone,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  SquaresFour,
  Users,
  UsersThree,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Initials, StatCard, StatusPill, statuses, type StatusKey } from "./dashboard-parts";

/* -------------------------------- frame --------------------------------- */

const rail = [
  { label: "Dashboard", icon: House },
  { label: "Contacts", icon: AddressBook },
  { label: "All Leads", icon: Funnel },
  { label: "Projects", icon: SquaresFour },
  { label: "Users", icon: Users },
  { label: "Roles", icon: ShieldCheck },
  { label: "Notification", icon: Bell },
];

export function AppFrame({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[470px] flex-1 gap-2 bg-[#f2f4f7] p-2">
      {/* the side rail, as in the app: logo in a white circle, icon over label,
          the current page on a lighter tile, a red count on Notification and
          the signed-in user's initials at the bottom */}
      <div className="hidden w-[84px] flex-none flex-col items-center gap-3 rounded-[12px] bg-[#0f0a22] px-1.5 pb-4 pt-4 lg:flex">
        <span className="grid size-10 flex-none place-items-center rounded-full bg-white text-brand">
          <Buildings weight="fill" className="size-5" />
        </span>
        <span className="flex w-full flex-col gap-0.5">
          {rail.map((item) => {
            const Icon = item.icon;
            const on = item.label === active;
            return (
              <span
                key={item.label}
                className={`flex w-full flex-col items-center gap-1 rounded-lg py-2 text-[10px] leading-none ${
                  on ? "bg-white/10 text-white" : "text-[#d0d5dd]"
                }`}
              >
                <span className="relative">
                  <Icon weight={on ? "fill" : "regular"} className="size-[19px]" />
                  {item.label === "Notification" && (
                    <span className="absolute -right-3 -top-2 rounded-full bg-[#f04438] px-1 py-px text-[7px] font-semibold leading-none text-white">
                      99+
                    </span>
                  )}
                </span>
                {item.label}
              </span>
            );
          })}
        </span>
        <span className="mt-auto grid size-10 flex-none place-items-center rounded-full bg-[#3a3650] text-[11px] font-semibold text-white">
          SA
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">{children}</div>
    </div>
  );
}

const banner = "rounded-2xl bg-[linear-gradient(110deg,#ede9fe_0%,#e3dbff_45%,#d3c6ff_100%)] p-3 sm:p-4";
const tableCard = "flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#eaecf0] bg-white";
const ghostBtn =
  "inline-flex h-7 items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-2.5 text-[11px] font-medium text-[#344054]";
const primaryBtn =
  "inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-full bg-brand px-3 text-[11px] font-medium text-white";
const th = "text-[9px] font-semibold uppercase tracking-[0.06em] text-[#667085]";

function Search({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex h-7 items-center gap-1.5 rounded-lg border border-[#eaecf0] bg-white px-2.5 text-[11px] text-[#98a2b3] ${className}`}>
      <MagnifyingGlass className="size-3.5" /> Search
    </span>
  );
}

/** A count on a banner: coloured edge, label and number. */
function BannerStat({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <span className="relative inline-flex items-center gap-2 rounded-lg border border-white/60 bg-white/90 py-1.5 pl-3 pr-2.5 text-[11px] text-[#344054]">
      <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-sm" style={{ backgroundColor: color }} />
      {label}
      <strong className="text-[12px] font-bold text-[#101828]">{count}</strong>
    </span>
  );
}

const projectTone: Record<string, string> = {
  "Bahria Town (Plots)": "#0ba5ec",
  "Tower B (Sales)": "#12b76a",
  "City Rentals": "#0ba5ec",
  "Phase 7 Shops": "#12b76a",
  Construction: "#12b76a",
};
const initialsOf = (name: string) =>
  name
    .replace(/[()]/g, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function ProjectPill({ name }: { name: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#eaecf0] bg-white py-0.5 pl-0.5 pr-2 text-[10px] text-[#344054]">
      <span
        className="grid size-4 flex-none place-items-center rounded-full text-[7px] font-semibold"
        style={{ backgroundColor: `${projectTone[name] ?? "#12b76a"}22`, color: projectTone[name] ?? "#12b76a" }}
      >
        {initialsOf(name)}
      </span>
      <span className="truncate">{name}</span>
    </span>
  );
}

/* ------------------------------ 1. leads -------------------------------- */

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

const leads: { ref: string; title: string; project: string; contact: string; phone: string; agent: [string, string]; status: StatusKey }[] = [
  { ref: "EL-1847", title: "10 marla plot, G block", project: "Bahria Town (Plots)", contact: "Usman Tariq", phone: "0300 ••• 4521", agent: ["AR", "Ali Raza"], status: "new" },
  { ref: "EL-1846", title: "Shop for rent, F-10", project: "City Rentals", contact: "Sara Khan", phone: "0321 ••• 8830", agent: ["MK", "Maha Khan"], status: "new" },
  { ref: "EL-1845", title: "2 bed apartment on loan", project: "Tower B (Sales)", contact: "Bilal Ahmed", phone: "0333 ••• 1975", agent: ["ZA", "Zoya Ahmed"], status: "contacted" },
  { ref: "EL-1844", title: "Studio apartment for rent", project: "City Rentals", contact: "Hina Raza", phone: "0345 ••• 6602", agent: ["HS", "Hamza Sheikh"], status: "visit" },
  { ref: "EL-1843", title: "Corner shop, Phase 7", project: "Phase 7 Shops", contact: "Ayesha Malik", phone: "0312 ••• 2748", agent: ["AR", "Ali Raza"], status: "quote" },
];

const leadCols = "grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[0.6fr_1.5fr_1.4fr_auto] lg:grid-cols-[0.6fr_1.4fr_1.4fr_1.2fr_1.2fr_auto]";

export function LeadsScreen() {
  return (
    <>
      <div className={`${banner} flex flex-col gap-3`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[17px] font-semibold tracking-[-0.01em] text-[#101828] sm:text-[19px]">Good Day, Super admin</p>
            <p className="text-[11px] text-[#475467]">Here&rsquo;s a quick overview of your leads and projects</p>
          </div>
          <div className="flex flex-none items-center gap-2">
            <span className="hidden rounded-lg bg-white/50 p-0.5 text-[11px] font-medium text-[#475467] sm:inline-flex">
              <span className="rounded-md bg-white px-2.5 py-1 text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.1)]">Overview</span>
              <span className="px-2.5 py-1">Analytics</span>
            </span>
            <span className={primaryBtn}>
              <Plus weight="bold" className="size-3" /> New Lead
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 xl:grid-cols-5">
          {leadStats.map(([status, count], i) => (
            <StatCard key={status} status={status} count={count} className={i > 5 ? "hidden sm:flex" : ""} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 px-1">
        <p className="text-[13px] font-semibold text-[#101828]">Recent Leads</p>
        <span className="rounded-md border border-[#eaecf0] bg-white px-1.5 text-[10px] text-[#475467]">20</span>
        <Search className="hidden w-36 sm:inline-flex" />
        <span className="ml-auto hidden items-center gap-1.5 md:flex">
          <span className={ghostBtn}>
            <DownloadSimple className="size-3.5" /> Export Leads
          </span>
          <span className={ghostBtn}>
            <SlidersHorizontal className="size-3.5" /> Filter
          </span>
          <span className={ghostBtn}>View All</span>
        </span>
      </div>

      <div className={tableCard}>
        <div className={`${leadCols} border-b border-[#eaecf0] bg-[#f9fafb] px-3 py-2 ${th}`}>
          <span className="hidden sm:block">Ref. No</span>
          <span>Title</span>
          <span className="hidden sm:block">Project</span>
          <span className="hidden lg:block">Contact</span>
          <span className="hidden lg:block">Agent</span>
          <span>Status</span>
        </div>
        {leads.map((l) => (
          <div key={l.ref} className={`${leadCols} border-b border-[#f2f4f7] px-3 py-2 text-[11px] text-[#344054] last:border-0`}>
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
                <WhatsappLogo weight="fill" className="size-3 text-[#25a35a]" />
              </span>
            </span>
            <span className="hidden min-w-0 items-center gap-1.5 lg:flex">
              <Initials text={l.agent[0]} size="size-6" />
              <span className="truncate">{l.agent[1]}</span>
            </span>
            <StatusPill status={l.status} short={l.status === "visit" ? "Visit Scheduled" : undefined} />
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------ 2. users -------------------------------- */

const users: { name: string; email: string; tone: string; role: "Agents" | "VIEWER"; projects: string[] }[] = [
  { name: "Ali Raza", email: "ali.raza@example.com", tone: "bg-[#e0f2fe] text-[#026aa2]", role: "Agents", projects: ["Bahria Town (Plots)", "Phase 7 Shops"] },
  { name: "Maha Khan", email: "maha.khan@example.com", tone: "bg-[#fce7f6] text-[#c11574]", role: "Agents", projects: ["City Rentals"] },
  { name: "Zoya Ahmed", email: "zoya.ahmed@example.com", tone: "bg-[#d1fadf] text-[#067647]", role: "Agents", projects: ["Tower B (Sales)", "City Rentals"] },
  { name: "Hamza Sheikh", email: "hamza.sheikh@example.com", tone: "bg-[#fef0c7] text-[#b54708]", role: "Agents", projects: ["City Rentals", "Phase 7 Shops"] },
  { name: "Sana Iqbal", email: "sana.iqbal@example.com", tone: "bg-[#ebe9fe] text-[#5925dc]", role: "VIEWER", projects: ["Bahria Town (Plots)", "Tower B (Sales)"] },
  { name: "Omar Farooq", email: "omar.farooq@example.com", tone: "bg-[#e0f2fe] text-[#026aa2]", role: "Agents", projects: ["Construction"] },
];

const userCols = "grid grid-cols-[1.4fr_auto] items-center gap-3 sm:grid-cols-[1.5fr_0.6fr_auto] lg:grid-cols-[1.5fr_0.6fr_2fr_auto]";

export function UsersScreen() {
  return (
    <>
      <div className={`${banner} flex flex-wrap items-center gap-3`}>
        <span className="grid size-9 flex-none place-items-center rounded-full bg-white text-[#344054] shadow-[0_1px_3px_rgba(16,24,40,0.15)]">
          <UsersThree weight="fill" className="size-4.5" />
        </span>
        <p className="mr-auto text-[18px] text-[#101828]">Users</p>
        <span className="flex flex-wrap gap-1.5">
          <BannerStat label="Total Users" count={12} color="#f04438" />
          <BannerStat label="Active Users" count={11} color="#f79009" />
          <BannerStat label="Pending Invites" count={1} color="#12b76a" />
          <span className="hidden sm:inline-flex">
            <BannerStat label="External Users" count={0} color="#7a5af8" />
          </span>
        </span>
      </div>

      <div className={tableCard}>
        <div className="flex items-center gap-2 border-b border-[#eaecf0] px-3 py-2">
          <Search className="w-36" />
          <span className="ml-auto hidden items-center gap-1.5 md:flex">
            {["All Invitations", "All Roles", "All Projects"].map((f) => (
              <span key={f} className={`${ghostBtn} w-28 justify-between`}>
                {f} <span className="text-[#98a2b3]">⌄</span>
              </span>
            ))}
          </span>
          <span className={`${primaryBtn} ml-auto md:ml-0`}>
            <Plus weight="bold" className="size-3" /> Add User
          </span>
        </div>
        <div className={`${userCols} border-b border-[#eaecf0] bg-[#f9fafb] px-3 py-2 ${th}`}>
          <span>User</span>
          <span className="hidden sm:block">Role</span>
          <span className="hidden lg:block">Assigned Projects</span>
          <span>Invitation Status</span>
        </div>
        {users.map((u) => (
          <div key={u.email} className={`${userCols} border-b border-[#f2f4f7] px-3 py-2 text-[11px] last:border-0`}>
            <span className="flex min-w-0 items-center gap-2">
              <Initials text={initialsOf(u.name)} tone={u.tone} size="size-7" />
              <span className="min-w-0">
                <span className="block truncate font-medium text-[#101828]">{u.name}</span>
                <span className="block truncate text-[10px] text-[#667085]">{u.email}</span>
              </span>
            </span>
            <span className="hidden sm:block">
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  u.role === "VIEWER" ? "border-[#99f6e0] bg-[#f0fdf9] text-[#107569]" : "border-[#d9d6fe] bg-[#f4f3ff] text-[#5925dc]"
                }`}
              >
                {u.role}
              </span>
            </span>
            <span className="hidden min-w-0 flex-wrap gap-1 lg:flex">
              {u.projects.map((p) => (
                <ProjectPill key={p} name={p} />
              ))}
            </span>
            <span className="flex items-center gap-2 text-[10px]">
              <span className="hidden items-center gap-1 text-[#12b76a] sm:flex">
                <CheckCircle className="size-3.5" /> Invite Accepted
              </span>
              <span className="rounded-full border border-[#abefc6] bg-[#ecfdf3] px-2 py-0.5 font-medium text-[#067647]">Active</span>
              <DotsThreeVertical weight="bold" className="size-3.5 text-[#98a2b3]" />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ----------------------------- 3. projects ------------------------------ */

const projects: { name: string; type: string; total: number; breakdown: [StatusKey, number][] }[] = [
  { name: "Bahria Town (Plots)", type: "Sales", total: 294, breakdown: [["new", 7], ["contacted", 23], ["visit", 17], ["quote", 26], ["hold", 64], ["won", 4], ["lost", 147]] },
  { name: "Tower B (Sales)", type: "Sales", total: 448, breakdown: [["new", 2], ["contacted", 17], ["visit", 49], ["quote", 100], ["token", 3], ["won", 6], ["lost", 178]] },
  { name: "City Rentals", type: "Rental", total: 635, breakdown: [["new", 24], ["contacted", 198], ["visit", 11], ["quote", 36], ["nego", 13], ["won", 2]] },
  { name: "Phase 7 Shops", type: "Sales", total: 67, breakdown: [["contacted", 1], ["qualified", 2], ["quote", 14], ["hold", 3], ["lost", 46]] },
  { name: "Construction", type: "Development", total: 10, breakdown: [["contacted", 2], ["visit", 2], ["quote", 3], ["hold", 3]] },
];

const shortLabel: Partial<Record<StatusKey, string>> = { visit: "Visit / Meeting", nego: "Negotiation" };
const projectCols = "grid grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[1.1fr_0.5fr_2.6fr]";

export function ProjectsScreen() {
  return (
    <>
      <div className={`${banner} flex flex-wrap items-center gap-3`}>
        <span className="grid size-9 flex-none place-items-center rounded-full bg-white text-[#344054] shadow-[0_1px_3px_rgba(16,24,40,0.15)]">
          <Buildings weight="fill" className="size-4.5" />
        </span>
        <p className="mr-auto text-[18px] text-[#101828]">Projects</p>
        <span className="flex flex-wrap gap-1.5">
          <BannerStat label="Total Projects" count={5} color="#f04438" />
          <BannerStat label="Active Projects" count={5} color="#f79009" />
          <BannerStat label="Total Leads" count={1454} color="#12b76a" />
        </span>
      </div>

      <div className={tableCard}>
        <div className="flex items-center justify-between gap-2 border-b border-[#eaecf0] px-3 py-2">
          <Search className="w-40" />
          <span className={primaryBtn}>
            <Plus weight="bold" className="size-3" /> New Project
          </span>
        </div>
        <div className={`${projectCols} border-b border-[#eaecf0] bg-[#f9fafb] px-3 py-2 ${th}`}>
          <span>Project</span>
          <span>Total Leads</span>
          <span className="hidden lg:block">Status Breakdown</span>
        </div>
        {projects.map((p) => (
          <div key={p.name} className={`${projectCols} border-b border-[#f2f4f7] px-3 py-2 text-[11px] last:border-0`}>
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="grid size-8 flex-none place-items-center rounded-full text-[9px] font-semibold text-white"
                style={{ backgroundColor: projectTone[p.name] }}
              >
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
            <span className="col-span-2 flex flex-wrap gap-1 lg:col-span-1">
              {p.breakdown.map(([status, count]) => (
                <span
                  key={status}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#eaecf0] bg-white px-1.5 py-0.5 text-[10px] text-[#344054]"
                >
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: statuses[status].color }} />
                  {shortLabel[status] ?? statuses[status].label}
                  <strong className="font-semibold text-[#101828]">{count}</strong>
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
