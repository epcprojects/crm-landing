// Six benefits as a stack of large cards beside a sticky heading. Each card has
// an icon, a title and one line, then a picture of the real product: small
// pieces built from the dashboard's own components. Every name, number and
// message shown is sample data.

import type { ReactNode } from "react";
import {
  BellRinging,
  ChartLineUp,
  ChatsCircle,
  CheckCircle,
  Circle,
  DeviceMobile,
  IdentificationCard,
  Phone,
  UsersThree,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import StackList from "./stack-list";
import { Initials, StatCard, StatusPill, statuses, type StatusKey } from "./dashboard-parts";

const panel =
  "rounded-2xl border border-black/[0.05] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_44px_-28px_rgba(16,24,40,0.3)]";

/* ------------------------------- pictures ------------------------------- */

/** A client thread: who said what, with an agent reply. */
function Conversation() {
  const messages: { from: "client" | "agent"; who: string; text: string; time: string }[] = [
    { from: "client", who: "Usman", text: "Is the 10 marla plot still available?", time: "10:02" },
    { from: "agent", who: "Ali", text: "Yes. I can show it on Saturday at 4 pm.", time: "10:09" },
    { from: "client", who: "Usman", text: "Perfect, please send the location.", time: "10:11" },
  ];
  return (
    <div className={`${panel} mx-auto flex w-full max-w-[420px] flex-col gap-3 p-4`}>
      <div className="flex items-center gap-2.5 border-b border-black/[0.05] pb-3">
        <Initials text="UT" size="size-8" />
        <span className="mr-auto text-[13px] font-semibold text-[#101828]">Usman Tariq</span>
        <WhatsappLogo weight="fill" className="size-4 text-[#25d366]" />
      </div>
      {messages.map((m, i) => (
        <div key={m.time} style={{ "--i": i * 2 } as React.CSSProperties} className={`fx flex flex-col gap-1 ${m.from === "agent" ? "items-end" : "items-start"}`}>
          <span
            className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
              m.from === "agent" ? "rounded-br-md bg-brand text-white" : "rounded-bl-md bg-[#f2f4f7] text-[#101828]"
            }`}
          >
            {m.text}
          </span>
          <span className="px-1 text-[11px] text-[#98a2b3]">
            {m.who} · {m.time}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Next steps, each with an owner and a date; the late one stands out. */
function FollowUps() {
  const rows: { title: string; owner: string; due: string; late?: boolean; done?: boolean }[] = [
    { title: "Send quotation to Sara Khan", owner: "MK", due: "Overdue · 2 days", late: true },
    { title: "Call back about Phase 7 shop", owner: "AR", due: "Today · 4:00 pm" },
    { title: "Site visit, 2 bed apartment", owner: "HS", due: "Sat · 11:00 am" },
    { title: "Share payment plan", owner: "AR", due: "Done", done: true },
  ];
  return (
    <ul className={`${panel} mx-auto flex w-full max-w-[420px] flex-col`}>
      {rows.map((r, i) => (
        <li key={r.title} style={{ "--i": i } as React.CSSProperties} className="fx flex items-center gap-3 border-b border-black/[0.05] px-4 py-3 last:border-0">
          {r.done ? (
            <CheckCircle weight="fill" className="size-5 flex-none text-[#12b76a]" />
          ) : (
            <Circle weight="bold" className={`size-5 flex-none ${r.late ? "text-[#f04438]" : "text-[#d0d5dd]"}`} />
          )}
          <span className="min-w-0 flex-1">
            <span className={`block truncate text-[13px] font-medium ${r.done ? "text-[#98a2b3] line-through" : "text-[#101828]"}`}>{r.title}</span>
            <span className={`block text-[11px] ${r.late ? "font-semibold text-[#b42318]" : "text-[#667085]"}`}>{r.due}</span>
          </span>
          <Initials text={r.owner} size="size-7" />
        </li>
      ))}
    </ul>
  );
}

/** Agents, how many leads they closed and how fast they reply. */
function AgentTable() {
  const rows = [
    { initials: "MK", name: "Maha Khan", won: 12, reply: "6 min", tone: "bg-[#fce7f6] text-[#c11574]", pct: 86 },
    { initials: "AR", name: "Ali Raza", won: 9, reply: "11 min", tone: "bg-[#e0f2fe] text-[#026aa2]", pct: 64 },
    { initials: "HS", name: "Hamza Sheikh", won: 3, reply: "1 h 20 min", tone: "bg-[#fef0c7] text-[#b54708]", pct: 22 },
  ];
  return (
    <div className={`${panel} mx-auto w-full max-w-[420px]`}>
      <div className="grid grid-cols-[1fr_52px_72px] gap-3 border-b border-black/[0.05] px-4 py-2.5 text-[11px] font-medium text-[#667085]">
        <span>Agent</span>
        <span className="text-right">Won</span>
        <span className="text-right">Replies in</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.name} style={{ "--i": i } as React.CSSProperties} className="fx flex flex-col gap-2 border-b border-black/[0.05] px-4 py-3 last:border-0">
          <div className="grid grid-cols-[1fr_52px_72px] items-center gap-3 text-[13px]">
            <span className="flex min-w-0 items-center gap-2.5">
              <Initials text={r.initials} tone={r.tone} size="size-8" />
              <span className="truncate font-semibold text-[#101828]">{r.name}</span>
            </span>
            <strong className="text-right font-semibold text-[#101828]">{r.won}</strong>
            <span className="text-right text-[12px] text-[#667085]">{r.reply}</span>
          </div>
          <span className="h-1 overflow-hidden rounded-full bg-[#f2f4f7]">
            <span className="fx-fill block h-full rounded-full bg-brand" style={{ width: `${r.pct}%`, "--i": i + 2 } as React.CSSProperties} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Leads per week as bars, with the headline numbers above. */
function Performance() {
  const bars = [38, 52, 44, 66, 58, 82, 74];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className={`${panel} mx-auto flex w-full max-w-[420px] flex-col gap-4 p-4`}>
      <div className="grid grid-cols-3 gap-2 text-[11px] text-[#667085]">
        {[
          ["Leads", "368"],
          ["Closed", "12"],
          ["Reply time", "9 min"],
        ].map(([label, value]) => (
          <span key={label} className="fx flex flex-col rounded-xl bg-[#f7f7f9] px-3 py-2">
            {label}
            <strong className="text-[16px] font-semibold text-[#101828]">{value}</strong>
          </span>
        ))}
      </div>
      <div className="flex h-[96px] items-end gap-2.5">
        {bars.map((h, i) => (
          <span key={i} className="flex h-full flex-1 flex-col items-center gap-1.5">
            <span className="flex w-full flex-1 items-end">
              <span
                className={`fx-bar w-full rounded-md ${i === 5 ? "bg-brand" : "bg-[#e0dcff]"}`}
                style={{ height: `${h}%`, "--i": i + 3 } as React.CSSProperties}
              />
            </span>
            <span className="text-[10px] text-[#98a2b3]">{days[i]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** One client file: contact, status and the latest notes. */
function ClientFile() {
  const notes = [
    ["Today", "Wants a 10 marla plot, budget 2.5 cr"],
    ["Mon", "Visited G block, liked corner plots"],
  ];
  return (
    <div className={`${panel} mx-auto flex w-full max-w-[420px] flex-col gap-3 p-4`}>
      <div className="flex items-center gap-3">
        <Initials text="UT" size="size-10" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold text-[#101828]">Usman Tariq</span>
          <span className="flex items-center gap-1 text-[12px] text-[#667085]">
            <Phone weight="bold" className="size-3" /> 0300 ••• 4521
          </span>
        </span>
        <StatusPill status="quote" />
      </div>
      <ul className="flex flex-col gap-2 border-t border-black/[0.05] pt-3">
        {notes.map(([when, text], i) => (
          <li key={when} style={{ "--i": i + 1 } as React.CSSProperties} className="fx flex gap-3 text-[12px]">
            <span className="w-10 flex-none text-[#98a2b3]">{when}</span>
            <span className="text-[#344054]">{text}</span>
          </li>
        ))}
      </ul>
      <span className="text-[11px] text-[#667085]">Handled by Ali Raza and Maha Khan</span>
    </div>
  );
}

/** The same lead list on a phone. */
function Phones() {
  const items: { title: string; status: StatusKey }[] = [
    { title: "10 marla plot, G block", status: "new" },
    { title: "Shop for rent, F-10", status: "contacted" },
    { title: "Studio apartment for rent", status: "visit" },
  ];
  return (
    <div className="mx-auto flex w-[230px] flex-col gap-2 rounded-[30px] border-[6px] border-[#1d2939] bg-[#f7f7f9] p-3 shadow-[0_28px_50px_-28px_rgba(16,24,40,0.6)]">
      <span className="mx-auto h-1 w-10 rounded-full bg-[#d0d5dd]" />
      <p className="px-1 text-[12px] font-semibold text-[#101828]">Recent leads</p>
      {items.map((item, i) => (
        <div key={item.title} style={{ "--i": i } as React.CSSProperties} className="fx flex flex-col gap-1.5 rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
          <span className="truncate text-[12px] font-medium text-[#101828]">{item.title}</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: statuses[item.status].color }} />
            <span className="text-[10px] text-[#667085]">{statuses[item.status].label}</span>
          </span>
        </div>
      ))}
      <StatCard status="won" count={12} className="!rounded-xl !border-transparent !bg-white" />
    </div>
  );
}

/* --------------------------------- cards -------------------------------- */

const perks: {
  icon: typeof ChatsCircle;
  title: string;
  line: string;
  picture: () => ReactNode;
  bg: string;
  tone: string;
}[] = [
  {
    icon: ChatsCircle,
    title: "All conversations in one place",
    line: "Open any client and read what was said, who said it and what was promised.",
    picture: () => <Conversation />,
    bg: "radial-gradient(90% 85% at 0% 100%,#4f6bff 0%,rgba(255,255,255,0) 68%),radial-gradient(80% 75% at 100% 0%,#6fc6ff 0%,rgba(255,255,255,0) 70%),linear-gradient(165deg,#f4f5ff 0%,#dfe4ff 100%)",
    tone: "#4f46e5",
  },
  {
    icon: BellRinging,
    title: "Never miss a client follow-up",
    line: "Every next step has an owner and a date, and late ones stand out.",
    picture: () => <FollowUps />,
    bg: "radial-gradient(90% 85% at 0% 100%,#3b82f6 0%,rgba(255,255,255,0) 68%),radial-gradient(80% 75% at 100% 0%,#5cc8ff 0%,rgba(255,255,255,0) 70%),linear-gradient(165deg,#f4f5ff 0%,#dbe9ff 100%)",
    tone: "#ea6a1a",
  },
  {
    icon: UsersThree,
    title: "Complete visibility into your agents",
    line: "See who is closing and who is slow to reply.",
    picture: () => <AgentTable />,
    bg: "radial-gradient(90% 85% at 0% 100%,#6a5cf7 0%,rgba(255,255,255,0) 68%),radial-gradient(80% 75% at 100% 0%,#7ab8ff 0%,rgba(255,255,255,0) 70%),linear-gradient(165deg,#f4f5ff 0%,#e4e0ff 100%)",
    tone: "#0f9d6e",
  },
  {
    icon: ChartLineUp,
    title: "Understand business performance",
    line: "Leads, closed deals and reply times in one view.",
    picture: () => <Performance />,
    bg: "radial-gradient(90% 85% at 0% 100%,#2f8cf5 0%,rgba(255,255,255,0) 68%),radial-gradient(80% 75% at 100% 0%,#86d9ff 0%,rgba(255,255,255,0) 70%),linear-gradient(165deg,#f4f5ff 0%,#d9ecff 100%)",
    tone: "#1d6ff2",
  },
  {
    icon: IdentificationCard,
    title: "Keep client information centralized",
    line: "One file per client, not one chat per agent.",
    picture: () => <ClientFile />,
    bg: "radial-gradient(90% 85% at 0% 100%,#7a6bff 0%,rgba(255,255,255,0) 68%),radial-gradient(80% 75% at 100% 0%,#66c3ff 0%,rgba(255,255,255,0) 70%),linear-gradient(165deg,#f4f5ff 0%,#e2dfff 100%)",
    tone: "#e0386a",
  },
  {
    icon: DeviceMobile,
    title: "Manage your business from anywhere",
    line: "The same clients and next steps at your desk or on a phone. Nothing to install.",
    picture: () => <Phones />,
    bg: "radial-gradient(90% 85% at 0% 100%,#5a77ff 0%,rgba(255,255,255,0) 68%),radial-gradient(80% 75% at 100% 0%,#9fb4ff 0%,rgba(255,255,255,0) 70%),linear-gradient(165deg,#f4f5ff 0%,#dde3ff 100%)",
    tone: "#7a3cf0",
  },
];

export default function FeatureBento() {
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="scroll-mt-20 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col gap-5 self-start lg:sticky lg:top-28">
          <p className="eyebrow">WHY ENDPOINT LEADS</p>
          <h2 id="benefits-heading" className="text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.15] text-balance">
            Everything your office needs, <span className="serif">without the chasing.</span>
          </h2>
        </div>

        <StackList className="flex flex-col gap-5">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <li
                key={perk.title}
                style={{ top: `calc(6.5rem + ${index * 14}px)` }}
                className="stack-card relative flex flex-col gap-5 overflow-hidden rounded-[28px] border border-black/[0.07] bg-white p-3 shadow-[0_24px_48px_-36px_rgba(16,24,40,0.35)]"
              >
                <div aria-hidden="true" className="relative flex min-h-[391px] items-center justify-center rounded-[20px] px-6 py-10 sm:px-14" style={{ background: perk.bg }}>
                  <div className="w-full">{perk.picture()}</div>
                </div>
                <div className="flex min-h-[66px] items-start gap-4 px-3 pb-1 sm:px-4">
                  <span
                    style={{ color: perk.tone, backgroundColor: `color-mix(in srgb, ${perk.tone} 12%, white)` }}
                    className="grid size-10 flex-none place-items-center rounded-xl"
                  >
                    <Icon aria-hidden="true" weight="duotone" className="size-5" />
                  </span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <h3 className="text-[20px] font-normal leading-snug tracking-[-0.015em] text-ink sm:text-[22px]">{perk.title}</h3>
                    <p className="text-[15px] leading-snug text-body">{perk.line}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </StackList>
      </div>
    </section>
  );
}
