"use client";

// "See how it works": three tabs, one app window. The screens are drawn in
// HTML after the real Endpoint Leads dashboard (see dashboard-screens.tsx),
// with sample data only.

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CaretRight, Funnel, SquaresFour, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { AppFrame, LeadsScreen, ProjectsScreen, UsersScreen } from "./dashboard-screens";
import OpenContact from "./open-contact";

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
    icon: Funnel,
    line: "Every lead, its project, contact, agent and status on one dashboard.",
    active: "Dashboard",
    tile: "from-[#5b9bff] to-[#1f5fd6]",
    points: [
      ["Every status, counted", "From new lead to closed, see how many sit at each stage."],
      ["Recent leads", "The newest enquiries with their project, contact and agent."],
      ["Call or WhatsApp", "Reach a contact straight from the lead."],
    ],
    alt: "The dashboard: a count for each lead status, and a table of recent leads with project, contact, agent and status.",
    screen: <LeadsScreen />,
  },
  {
    id: "agents",
    label: "Agent Management",
    icon: UsersThree,
    line: "Add your agents, give each a role and choose which projects they work on.",
    active: "Users",
    tile: "from-[#ff7aa8] to-[#d6336c]",
    points: [
      ["Roles", "Agents work their leads; viewers can only look."],
      ["Assigned projects", "Each person sees only the projects you give them."],
      ["Invitations", "Invite by email and see who has joined."],
    ],
    alt: "The users screen: each user with their role, assigned projects and invitation status.",
    screen: <UsersScreen />,
  },
  {
    id: "analytics",
    label: "Business Analytics",
    icon: SquaresFour,
    line: "Every project with its total leads and a count for each status.",
    active: "Projects",
    tile: "from-[#34d6c3] to-[#0e8f80]",
    points: [
      ["Project by project", "Compare sales, rental and development projects."],
      ["Status breakdown", "See where each project's leads are stuck."],
      ["Won and lost", "Closed deals counted for every project."],
    ],
    alt: "The projects screen: each project with its total leads and a count for each lead status.",
    screen: <ProjectsScreen />,
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
            See how it works for your <span className="serif !text-[#e3dfff]">real estate business.</span>
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
              <OpenContact className="mt-2 inline-flex h-[42px] items-center gap-1.5 self-start bg-brand px-4 text-[16px] font-medium text-white transition-colors hover:bg-brand-hover">
                Book your free demo
                <CaretRight aria-hidden="true" weight="bold" className="size-3.5" />
              </OpenContact>
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
                <div key={`screen-${tab.id}`} aria-hidden="true" className="thread-in flex flex-1 flex-col">
                  <AppFrame active={tab.active}>{tab.screen}</AppFrame>
                </div>
                <p className="sr-only">{tab.alt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
