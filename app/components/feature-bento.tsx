// Six benefits in an uneven grid. Each card pairs one short claim with a
// small piece of product UI (sample data), so no two cards look alike.
// The last, full-width card is the desktop-and-phone picture.

import type { ReactNode } from "react";
import { Check, Clock, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

function Avatar({ letter, tone = "bg-[#e4e0ff] text-[#2f2496]" }: { letter: string; tone?: string }) {
  return (
    <span className={`grid size-8 flex-none place-items-center rounded-full text-[12px] font-extrabold ${tone}`}>
      {letter}
    </span>
  );
}

const panel = "rounded-2xl border border-black/[0.07] bg-white";

function Card({
  title,
  line,
  className = "",
  children,
}: {
  title: string;
  line: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <li className={`flex flex-col overflow-hidden rounded-[28px] border border-[#e7e7ef] bg-[#f8f8fc] ${className}`}>
      <div aria-hidden="true" className="flex flex-1 items-center justify-center px-5 pt-6 text-ink sm:px-7 sm:pt-7">
        {children}
      </div>
      <div className="flex flex-col gap-2 p-6 sm:p-7">
        <h3 className="text-[22px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[24px]">{title}</h3>
        <p className="max-w-[30rem] text-[15px] leading-relaxed text-body sm:text-[16px]">{line}</p>
      </div>
    </li>
  );
}

/* ------------------------------- visuals -------------------------------- */

function Conversations() {
  const threads = [
    { n: "Usman Tariq", m: "Saturday 11 works for me.", t: "2 min", on: true, unread: 0 },
    { n: "Sara Khan", m: "Can you send the payment plan?", t: "25 min", on: false, unread: 2 },
    { n: "Hina Raza", m: "Price for a 5 marla house?", t: "1 h", on: false, unread: 1 },
  ];
  return (
    <div className={`grid w-full max-w-[560px] overflow-hidden sm:grid-cols-[1fr_1.1fr] ${panel}`}>
      <ul className="flex flex-col border-black/[0.06] p-2 sm:border-r">
        {threads.map((c) => (
          <li key={c.n} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 ${c.on ? "bg-[#f2f0ff]" : ""}`}>
            <Avatar letter={c.n[0]} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2 text-[13px] font-bold">
                {c.n} <span className="text-[10px] font-medium text-ink/50">{c.t}</span>
              </span>
              <span className="block truncate text-[11px] text-body">{c.m}</span>
            </span>
            {c.unread > 0 && (
              <span className="grid size-4.5 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                {c.unread}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="hidden flex-col gap-2 p-3.5 sm:flex">
        <p className="flex items-center gap-1.5 text-[11px] font-extrabold">
          <span className="grid size-5 place-items-center rounded-full bg-[#25a35a] text-white">
            <WhatsappLogo weight="fill" className="size-3" />
          </span>
          Usman · handled by Ali
        </p>
        <p className="max-w-[88%] rounded-[12px_12px_12px_3px] bg-[#f1f1f4] px-3 py-2 text-[12px] leading-snug">
          Is the 10 marla plot still available?
        </p>
        <p className="max-w-[88%] self-end rounded-[12px_12px_3px_12px] bg-brand px-3 py-2 text-[12px] leading-snug text-white">
          Yes! Visit on Saturday?
        </p>
        <p className="max-w-[88%] rounded-[12px_12px_12px_3px] bg-[#f1f1f4] px-3 py-2 text-[12px] leading-snug">
          Saturday 11 works for me.
        </p>
      </div>
    </div>
  );
}

function FollowUps() {
  const steps = [
    { t: "Send payment plan", who: "Maha", done: true },
    { t: "Confirm site visit", who: "Ali", done: false },
    { t: "Call back about price", who: "Hamza", late: true },
  ];
  return (
    <ul className={`flex w-full max-w-[300px] flex-col gap-2.5 p-4 ${panel}`}>
      {steps.map((s) => (
        <li key={s.t} className="flex items-center gap-2.5 text-[13px]">
          <span
            className={`grid size-4.5 flex-none place-items-center rounded ${
              s.done ? "bg-brand text-white" : "border-2 border-black/20"
            }`}
          >
            {s.done && <Check weight="bold" className="size-3" />}
          </span>
          <span className={`flex-1 ${s.done ? "text-ink/50 line-through" : "font-semibold"}`}>{s.t}</span>
          {s.late ? (
            <span className="rounded-md bg-[#ffe0db] px-1.5 py-0.5 text-[10px] font-extrabold text-[#b3261e]">2 days late</span>
          ) : (
            <span className="text-[11px] text-body">{s.who}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function AgentBars() {
  const rows = [
    ["Maha", 78, "9 min"],
    ["Ali", 54, "12 min"],
    ["Hamza", 26, "41 min"],
  ] as const;
  return (
    <ul className={`flex w-full max-w-[300px] flex-col gap-3 p-4 ${panel}`}>
      {rows.map(([name, width, reply]) => (
        <li key={name} className="flex items-center gap-2.5 text-[12px]">
          <Avatar letter={name[0]} />
          <span className="flex-1">
            <span className="flex justify-between font-bold">
              {name}
              <span className="flex items-center gap-1 font-medium text-body">
                <Clock weight="bold" className="size-3" /> {reply}
              </span>
            </span>
            <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
              <span className="block h-full rounded-full bg-brand" style={{ width: `${width}%` }} />
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Performance() {
  const weeks = [3, 5, 4, 6];
  return (
    <div className={`flex w-full max-w-[300px] items-end gap-4 p-4 ${panel}`}>
      <div className="flex-none">
        <p className="text-[11px] font-semibold text-body">Closed this month</p>
        <p className="text-[32px] font-extrabold leading-none tracking-[-0.03em]">18</p>
      </div>
      <div className="flex flex-1 items-end gap-2">
        {weeks.map((n, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-md ${i === weeks.length - 1 ? "bg-brand" : "bg-[#cfc9fb]"}`}
            style={{ height: `${n * 12}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function ClientFile() {
  return (
    <div className={`flex w-full max-w-[300px] flex-col gap-3 p-4 ${panel}`}>
      <div className="flex items-center gap-2.5">
        <Avatar letter="S" tone="bg-[#fff1de] text-[#9a4a00]" />
        <div className="flex-1">
          <p className="text-[13px] font-extrabold">Sara Khan</p>
          <p className="text-[11px] text-body">Apartment · Tower B</p>
        </div>
        <span className="rounded-full bg-[#fff1de] px-2 py-0.5 text-[10px] font-extrabold text-[#9a4a00]">Negotiating</span>
      </div>
      <dl className="grid grid-cols-2 gap-2 text-[12px]">
        {[
          ["Agent", "Maha"],
          ["Next step", "Send price list"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-surface px-3 py-2">
            <dt className="text-[10px] font-bold tracking-[0.06em] text-ink/50">{k.toUpperCase()}</dt>
            <dd className="mt-0.5 font-bold">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** A desktop window with a phone overlapping its corner. */
function Devices() {
  const rows = [
    ["Usman Tariq", "Site visit · Sat 11:00", "Ali"],
    ["Sara Khan", "Send price list", "Maha"],
    ["Hina Raza", "First call today", "Zoya"],
    ["Bilal Ahmed", "Hand over keys", "Ali"],
  ];
  return (
    <div className="relative w-full max-w-[560px] pb-10 pr-8 sm:pr-16">
      <div className={`overflow-hidden shadow-[0_32px_64px_-40px_rgba(40,30,120,0.45)] ${panel}`}>
        <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-surface px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] font-bold text-body">Next steps · today</span>
        </div>
        <ul className="flex flex-col px-3.5 py-2">
          {rows.map(([n, step, who]) => (
            <li key={n} className="grid grid-cols-[1fr_1.3fr_auto] items-center gap-2 border-b border-black/[0.05] py-2.5 text-[12px] last:border-0">
              <span className="font-bold">{n}</span>
              <span className="text-body">{step}</span>
              <span className="pr-16 font-semibold sm:pr-20">{who}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 right-0 w-[136px] rounded-[26px] border-[5px] border-ink bg-white p-2.5 shadow-[0_24px_48px_-24px_rgba(15,15,19,0.55)] sm:w-[156px]">
        <span className="mx-auto mb-2 block h-1.5 w-10 rounded-full bg-ink" />
        <p className="text-[11px] font-extrabold">Usman Tariq</p>
        <p className="mt-1.5 rounded-[10px_10px_10px_3px] bg-[#f1f1f4] px-2 py-1.5 text-[10px] leading-snug">
          Saturday 11 works for me.
        </p>
        <p className="ml-auto mt-1.5 w-fit rounded-[10px_10px_3px_10px] bg-brand px-2 py-1.5 text-[10px] leading-snug text-white">
          See you there!
        </p>
        <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#e8f7ee] px-2 py-1.5 text-[10px] font-bold text-[#1d7a52]">
          <Check weight="bold" className="size-3" /> Visit set · Sat 11:00
        </p>
      </div>
    </div>
  );
}

/* -------------------------------- section ------------------------------- */

export default function FeatureBento() {
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="scroll-mt-24 border-t border-black/[0.06] bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24">
        <div className="flex max-w-[44rem] flex-col gap-4">
          <p className="eyebrow">WHY ENDPOINT LEADS</p>
          <h2
            id="benefits-heading"
            className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance"
          >
            Everything your office needs,{" "}
            <span className="text-ink/45">without the chasing.</span>
          </h2>
        </div>

        <ul className="grid gap-4 sm:gap-5 lg:grid-cols-6">
          <Card
            className="lg:col-span-4"
            title="All conversations in one place"
            line="Open any client and read what was said, who said it and what was promised."
          >
            <Conversations />
          </Card>
          <Card
            className="lg:col-span-2"
            title="Never miss a client follow-up"
            line="Every next step has an owner and a date, and late ones stand out."
          >
            <FollowUps />
          </Card>
          <Card
            className="lg:col-span-2"
            title="Complete visibility into your agents"
            line="See who is closing and who is slow to reply."
          >
            <AgentBars />
          </Card>
          <Card
            className="lg:col-span-2"
            title="Understand business performance"
            line="Leads, closed deals and reply times in one view."
          >
            <Performance />
          </Card>
          <Card
            className="lg:col-span-2"
            title="Keep client information centralized"
            line="One file per client, not one chat per agent."
          >
            <ClientFile />
          </Card>
          <li className="grid items-center gap-2 overflow-hidden rounded-[28px] border border-[#e7e7ef] bg-[#f2f0ff] lg:col-span-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-3 p-6 sm:p-10">
              <p className="eyebrow">DESKTOP AND MOBILE</p>
              <h3 className="text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-balance">
                Manage your business from anywhere.
              </h3>
              <p className="max-w-[26rem] text-[16px] leading-relaxed text-body">
                At the desk or on a site visit, you and your agents see the
                same clients and the same next steps. It runs in the browser
                on a phone, with nothing to install.
              </p>
            </div>
            <div aria-hidden="true" className="flex justify-center px-5 pb-8 text-ink sm:px-10 lg:py-10">
              <Devices />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
