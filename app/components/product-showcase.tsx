"use client";

// "See how it works": three tabs, one app window. The screens are drawn in
// HTML with sample data in the same style as the hero preview; there are no
// product screenshots in the project yet. When real screenshots arrive, swap
// each tab's `screen` for a next/image inside the same frame.

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  CaretRight,
  ChartLineUp,
  Check,
  Clock,
  IdentificationBadge,
  UsersThree,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

const nav = ["Dashboard", "Clients", "Conversations", "Next steps", "Agents"];

const chip = {
  visit: "bg-[#e4e0ff] text-[#2f2496]",
  talk: "bg-[#fff1de] text-[#9a4a00]",
  closed: "bg-[#e8f7ee] text-[#1d7a52]",
  fresh: "bg-[#eef0f4] text-[#4b4c58]",
};

function Avatar({ letter, tone = "bg-[#e4e0ff] text-[#2f2496]" }: { letter: string; tone?: string }) {
  return (
    <span className={`grid size-8 flex-none place-items-center rounded-full text-[12px] font-extrabold ${tone}`}>
      {letter}
    </span>
  );
}

/* ------------------------------ 1. clients ------------------------------ */

const clients = [
  { name: "Usman Tariq", stage: "Site visit", tone: chip.visit, owner: "Ali", active: true },
  { name: "Sara Khan", stage: "Negotiating", tone: chip.talk, owner: "Maha" },
  { name: "Bilal Ahmed", stage: "Closed", tone: chip.closed, owner: "Ali" },
  { name: "Hina Raza", stage: "New", tone: chip.fresh, owner: "Zoya" },
  { name: "Ayesha Malik", stage: "Site visit", tone: chip.visit, owner: "Hamza" },
];

function ClientsScreen() {
  return (
    <div className="grid min-h-0 flex-1 md:grid-cols-[230px_1fr]">
      <ul className="hidden flex-col gap-1 border-r border-black/[0.06] p-3 md:flex">
        {clients.map((c) => (
          <li
            key={c.name}
            className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 ${c.active ? "bg-[#f2f0ff]" : ""}`}
          >
            <Avatar letter={c.name[0]} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-bold">{c.name}</span>
              <span className="block text-[11px] text-body">Owner {c.owner}</span>
            </span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${c.tone}`}>{c.stage}</span>
          </li>
        ))}
      </ul>
      <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Avatar letter="U" />
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-extrabold">Usman Tariq</p>
            <p className="text-[12px] text-body">10 marla plot · Bahria Town</p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${chip.visit}`}>Site visit</span>
        </div>
        <dl className="grid grid-cols-3 gap-2 text-[12px]">
          {[
            ["Assigned agent", "Ali"],
            ["Source", "WhatsApp"],
            ["Last contact", "2 min ago"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-surface px-3 py-2">
              <dt className="text-[10px] font-bold tracking-[0.06em] text-ink/50">{k.toUpperCase()}</dt>
              <dd className="mt-0.5 font-bold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="grid gap-3 lg:grid-cols-[1.25fr_1fr]">
          <div className="flex flex-col gap-2 rounded-2xl border border-black/[0.07] p-3.5">
            <p className="flex items-center gap-1.5 text-[11px] font-extrabold">
              <span className="grid size-5 place-items-center rounded-full bg-[#25a35a] text-white">
                <WhatsappLogo weight="fill" className="size-3" />
              </span>
              Conversation
            </p>
            <p className="max-w-[85%] rounded-[12px_12px_12px_3px] bg-[#f1f1f4] px-3 py-2 text-[12px] leading-snug">
              Is the 10 marla plot still available?
            </p>
            <p className="max-w-[85%] self-end rounded-[12px_12px_3px_12px] bg-brand px-3 py-2 text-[12px] leading-snug text-white">
              Yes! Visit on Saturday?
            </p>
            <p className="max-w-[85%] rounded-[12px_12px_12px_3px] bg-[#f1f1f4] px-3 py-2 text-[12px] leading-snug">
              Saturday 11 works for me.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-black/[0.07] p-3.5">
            <p className="text-[11px] font-extrabold">Follow-ups</p>
            {[
              { t: "Send location pin", done: true },
              { t: "Site visit · Sat 11:00", done: false },
              { t: "Share payment plan", done: false },
            ].map((s) => (
              <p key={s.t} className="flex items-center gap-2 text-[12px]">
                <span
                  className={`grid size-4 flex-none place-items-center rounded ${
                    s.done ? "bg-brand text-white" : "border-2 border-black/20"
                  }`}
                >
                  {s.done && <Check weight="bold" className="size-2.5" />}
                </span>
                <span className={s.done ? "text-ink/50 line-through" : "font-semibold"}>{s.t}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ 2. agents ------------------------------- */

const agents = [
  { name: "Maha", clients: 18, closed: 7, rate: 39, reply: "9 min", late: 0 },
  { name: "Ali", clients: 22, closed: 6, rate: 27, reply: "12 min", late: 1 },
  { name: "Zoya", clients: 14, closed: 3, rate: 21, reply: "18 min", late: 2 },
  { name: "Hamza", clients: 16, closed: 2, rate: 13, reply: "41 min", late: 4 },
];

function AgentsScreen() {
  return (
    <div className="grid min-h-0 flex-1 gap-4 p-4 sm:p-5 lg:grid-cols-[1.7fr_1fr]">
      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-[15px] font-extrabold">Agents · this month</p>
        <div className="grid grid-cols-[1.2fr_1.6fr_0.8fr] gap-2 px-1 text-[10px] font-bold tracking-[0.08em] text-ink/50 sm:grid-cols-[1.2fr_0.7fr_1.6fr_0.8fr_0.8fr]">
          <span>AGENT</span>
          <span className="hidden sm:block">CLIENTS</span>
          <span>CLOSED</span>
          <span>FIRST REPLY</span>
          <span className="hidden sm:block">OVERDUE</span>
        </div>
        {agents.map((a) => (
          <div
            key={a.name}
            className="grid grid-cols-[1.2fr_1.6fr_0.8fr] items-center gap-2 rounded-xl border-t border-black/[0.05] px-1 py-2.5 text-[12px] sm:grid-cols-[1.2fr_0.7fr_1.6fr_0.8fr_0.8fr]"
          >
            <span className="flex items-center gap-2 font-bold">
              <Avatar letter={a.name[0]} />
              {a.name}
            </span>
            <span className="hidden sm:block">{a.clients}</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                <span className="block h-full rounded-full bg-brand" style={{ width: `${a.rate * 2}%` }} />
              </span>
              <span className="w-9 flex-none font-bold">{a.closed}</span>
            </span>
            <span className={a.late > 2 ? "font-bold text-[#b3261e]" : ""}>{a.reply}</span>
            <span className="hidden sm:block">
              {a.late ? (
                <span className="rounded-md bg-[#ffe0db] px-1.5 py-0.5 text-[11px] font-bold text-[#b3261e]">
                  {a.late} late
                </span>
              ) : (
                <span className="text-ink/50">None</span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="hidden flex-col gap-2.5 rounded-2xl bg-surface p-4 lg:flex">
        <p className="text-[11px] font-extrabold tracking-[0.06em] text-ink/60">RECENT ACTIVITY</p>
        {[
          ["A", "Ali replied to Usman Tariq", "2 min ago"],
          ["M", "Maha closed Bilal Ahmed", "1 h ago"],
          ["Z", "Zoya set a site visit for Hina", "3 h ago"],
          ["H", "Hamza missed a follow-up", "Yesterday"],
        ].map(([l, t, when]) => (
          <p key={t} className="flex items-start gap-2.5 text-[12px] leading-snug">
            <Avatar letter={l} />
            <span>
              <span className="block font-semibold">{t}</span>
              <span className="flex items-center gap-1 text-[11px] text-body">
                <Clock weight="bold" className="size-3" /> {when}
              </span>
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- 3. analytics ----------------------------- */

const stats = [
  ["Open leads", "48"],
  ["Closed this month", "18"],
  ["Avg. first reply", "17 min"],
  ["Overdue follow-ups", "7"],
];
const stages = [
  ["New", 14],
  ["Site visit", 11],
  ["Negotiating", 9],
  ["Closed", 18],
] as const;
const weeks = [3, 5, 4, 6];

function AnalyticsScreen() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-black/[0.07] px-3.5 py-3">
            <p className="text-[11px] font-semibold text-body">{label}</p>
            <p className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid flex-1 gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] p-4">
          <p className="text-[12px] font-extrabold">Leads by stage</p>
          {stages.map(([label, n]) => (
            <p key={label} className="grid grid-cols-[84px_1fr_24px] items-center gap-2 text-[12px]">
              <span className="text-body">{label}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-black/[0.05]">
                <span className="block h-full rounded-full bg-brand" style={{ width: `${(n / 18) * 100}%` }} />
              </span>
              <span className="text-right font-bold">{n}</span>
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] p-4">
          <p className="text-[12px] font-extrabold">Deals closed per week</p>
          <div className="flex flex-1 items-end gap-3 pt-2">
            {weeks.map((n, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[11px] font-bold">{n}</span>
                <span
                  className={`w-full rounded-t-md ${i === weeks.length - 1 ? "bg-brand" : "bg-[#cfc9fb]"}`}
                  style={{ height: `${n * 16}px` }}
                />
                <span className="text-[10px] text-body">Week {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- section ------------------------------- */

const tabs: {
  id: string;
  label: string;
  icon: typeof UsersThree;
  line: string;
  active: string;
  tile: string;
  points: [string, string][];
  alt: string;
  screen: ReactNode;
}[] = [
  {
    id: "clients",
    label: "Client Management",
    icon: UsersThree,
    line: "Every client's details, conversation, assigned agent and follow-ups on one screen.",
    active: "Clients",
    tile: "from-[#8274f7] to-[#4333cc]",
    points: [
      ["One file per client", "Details, assigned agent and source in one place."],
      ["The whole conversation", "Read what was said and what was promised."],
      ["Follow-ups with dates", "Every next step has an owner and a due time."],
    ],
    alt: "The client screen: a client list, and one client's details, conversation and follow-ups.",
    screen: <ClientsScreen />,
  },
  {
    id: "agents",
    label: "Agent Management",
    icon: IdentificationBadge,
    line: "See each agent's clients, closed deals, reply speed and missed follow-ups without asking for updates.",
    active: "Agents",
    tile: "from-[#3fcf8e] to-[#17834d]",
    points: [
      ["Closed deals per agent", "See who is closing this month."],
      ["First reply time", "Spot slow replies before clients go cold."],
      ["Overdue follow-ups", "Late next steps are flagged by agent."],
    ],
    alt: "The agents screen: each agent's clients, closed deals, first reply time and overdue follow-ups, with recent activity.",
    screen: <AgentsScreen />,
  },
  {
    id: "analytics",
    label: "Business Analytics",
    icon: ChartLineUp,
    line: "Open leads, closed deals and reply times for the whole business, at a glance.",
    active: "Dashboard",
    tile: "from-[#ffc24a] to-[#e08a1e]",
    points: [
      ["Totals at a glance", "Open leads, closed deals and reply time."],
      ["Leads by stage", "See where clients sit in the pipeline."],
      ["Week by week", "Track deals closed over the month."],
    ],
    alt: "The dashboard: four totals, leads by stage and deals closed per week.",
    screen: <AnalyticsScreen />,
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];
  const TabIcon = tab.icon;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: (active + 1) % tabs.length,
      ArrowLeft: (active - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <section
      id="platform"
      aria-labelledby="platform-heading"
      className="relative scroll-mt-16 overflow-hidden bg-[linear-gradient(180deg,#f1efff_0,#f1efff_760px,#ffffff_1180px)]"
    >
      {/* the brand shape: a narrow neck under the hero beam that opens into a dome */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
        className="absolute left-1/2 top-0 h-[760px] w-[max(1440px,100vw)] -translate-x-1/2"
      >
        <defs>
          <linearGradient id="dome" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4333cc" />
            <stop offset="0.3" stopColor="#5343de" />
            <stop offset="0.58" stopColor="#8a7ef6" />
            <stop offset="0.84" stopColor="#d9d4ff" />
            <stop offset="1" stopColor="#f1efff" />
          </linearGradient>
        </defs>
        <path
          d="M712 0 H728 V40 C728 130 860 198 1150 240 C1290 260 1390 292 1440 324 V760 H0 V324 C50 292 150 260 290 240 C580 198 712 130 712 40 Z"
          fill="url(#dome)"
        />
      </svg>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-16 pt-44 sm:px-10 sm:pb-24 sm:pt-[232px]">
        <div className="flex max-w-[40rem] flex-col items-center gap-4 text-center text-white">
          <h2 id="platform-heading" className="text-[clamp(2.1rem,4vw,3rem)] leading-[1.3] text-balance">
            See how it works for your real estate business.
          </h2>
          <p className="max-w-[33rem] text-[17px] leading-[1.4] text-white text-pretty sm:text-[18px]">
            Manage your clients, monitor your agents, and understand your
            business performance from one unified platform.
          </p>
        </div>

        {/* the tab bar: one white tray, each tab with its coloured tile and its name */}
        <div
          role="tablist"
          aria-label="Parts of the platform"
          onKeyDown={onKeyDown}
          className="mt-12 grid w-full max-w-[720px] grid-cols-3 gap-1.5 rounded-[24px] bg-white p-2 shadow-[0_24px_48px_-24px_rgba(40,30,120,0.6)] sm:mt-14"
        >
          {tabs.map((item, index) => {
            const on = index === active;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  buttons.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`platform-tab-${item.id}`}
                aria-selected={on}
                aria-controls="platform-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(index)}
                className={`group flex flex-col items-center gap-2 rounded-[18px] px-2 py-3 text-center text-[13px] font-semibold leading-tight transition-colors duration-200 sm:flex-row sm:gap-3 sm:px-3.5 sm:py-2.5 sm:text-left sm:text-[15px] ${
                  on ? "bg-[#f2f0ff] text-ink shadow-[inset_0_0_0_1px_rgba(102,87,240,0.28)]" : "text-body hover:bg-[#f6f6fa] hover:text-ink"
                }`}
              >
                <span
                  className={`grid size-11 flex-none place-items-center rounded-[13px] bg-gradient-to-b text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.45),0_8px_16px_-8px_rgba(21,21,27,0.5)] transition-transform duration-200 motion-reduce:transition-none ${item.tile} ${
                    on ? "" : "opacity-90 group-hover:-translate-y-0.5"
                  }`}
                >
                  <Icon aria-hidden="true" weight="fill" className="size-6" />
                </span>
                {item.label}
              </button>
            );
          })}
        </div>

        {/* one card: text and button on the left, the screen on the right, three points along the bottom */}
        <div
          id="platform-panel"
          role="tabpanel"
          aria-labelledby={`platform-tab-${tab.id}`}
          className="mt-10 w-full overflow-hidden rounded-[24px] border border-[#e6e8f0] bg-[#f8f9fd] sm:mt-12"
        >
          <div className="grid lg:grid-cols-[0.34fr_1fr]">
            <div key={`line-${tab.id}`} className="thread-in flex flex-col gap-4 p-6 sm:p-10 lg:py-16 lg:pl-16 lg:pr-6">
              <span className={`grid size-12 place-items-center rounded-[14px] bg-gradient-to-b text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.45)] ${tab.tile}`}>
                <TabIcon aria-hidden="true" weight="fill" className="size-7" />
              </span>
              <p className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.02em]">{tab.label}</p>
              <p className="text-[17px] leading-[1.45] text-ink/80">{tab.line}</p>
              <a
                href="#start"
                className="mt-2 inline-flex h-[42px] items-center gap-1.5 self-start bg-brand px-4 text-[16px] font-medium text-white transition-colors hover:bg-brand-hover"
              >
                Book your free demo
                <CaretRight aria-hidden="true" weight="bold" className="size-3.5" />
              </a>
            </div>
            {/* the app window runs off the right edge of the card */}
            <div className="pl-5 sm:pl-10 lg:pl-4 lg:pt-10">
              <div className="flex h-full flex-col overflow-hidden rounded-tl-[16px] border-l border-t border-[#e3e5ee] bg-white text-left text-ink shadow-[0_30px_60px_-40px_rgba(40,30,120,0.45)]">
                <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-black/[0.06] bg-surface px-3.5 py-2.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2.5 text-[12px] font-bold text-body">
                    Endpoint<span className="text-brand">Leads</span>
                  </span>
                </div>
                <div className="flex min-h-[420px] flex-1">
                  <div
                    aria-hidden="true"
                    className="hidden w-[150px] flex-none flex-col gap-1 border-r border-black/[0.06] px-2.5 py-3 text-[12px] font-semibold text-body lg:flex"
                  >
                    {nav.map((item) => (
                      <span
                        key={item}
                        className={`rounded-lg px-2.5 py-1.5 transition-colors ${
                          item === tab.active ? "bg-[#efedff] text-brand" : ""
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div key={`screen-${tab.id}`} aria-hidden="true" className="thread-in flex min-w-0 flex-1 flex-col">
                    {tab.screen}
                  </div>
                  <p className="sr-only">{tab.alt}</p>
                </div>
              </div>
            </div>
          </div>
          <ul key={`points-${tab.id}`} className="thread-in grid gap-6 border-t border-[#e6e8f0] bg-white p-6 sm:grid-cols-3 sm:p-10 lg:px-16">
            {tab.points.map(([title, line]) => (
              <li key={title}>
                <p className="text-[16px] font-semibold tracking-[-0.01em]">{title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-body">{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
