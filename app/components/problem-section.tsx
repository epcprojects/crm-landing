// The problems as a card grid: a centred label and heading, three upright
// cards (text on top, picture underneath) and two wide cards (text left,
// picture right). The pictures are not icons or illustrations: each is
// built from the dashboard's own components (lead rows, status counts,
// status pills, breakdown chips). Every name and number is sample data.

import type { ReactNode } from "react";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { Initials, StatCard, StatusPill, statuses, type StatusKey } from "./dashboard-parts";

const card =
  "overflow-hidden rounded-[24px] border border-black/[0.06] bg-[linear-gradient(180deg,#fdfdfd_0%,#f5f5f5_100%)]";
const floating =
  "rounded-2xl border border-black/[0.05] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_44px_-26px_rgba(16,24,40,0.35)]";

function Text({ title, line }: { title: string; line: string }) {
  return (
    <div>
      <h3 className="text-[22px] font-normal leading-tight tracking-[-0.02em] text-ink sm:text-[24px]">{title}</h3>
      <p className="mt-3 max-w-[17rem] text-[15px] leading-snug text-body">{line}</p>
    </div>
  );
}

/* ------------------------------- pictures ------------------------------- */

function LeadRow({ title, agent, wait }: { title: string; agent: string; wait: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-3.5">
      <Initials text={agent} size="size-8" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-[#101828]">{title}</span>
        <span className="mt-1 flex items-center gap-1 whitespace-nowrap text-[11px] font-medium text-[#b42318]">
          <Clock weight="bold" className="size-3 flex-none" /> No reply for {wait}
        </span>
      </span>
      <StatusPill status="new" short="New" />
    </div>
  );
}

/** A stack of lead cards: new enquiries nobody has answered. */
function WaitingLeads() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] pt-9">
      <div className={`${floating} absolute inset-x-9 top-0 h-14 opacity-50`} />
      <div className={`${floating} absolute inset-x-5 top-3.5 h-14 opacity-80`} />
      <div className={`${floating} relative`}>
        <LeadRow title="10 marla plot, G block" agent="AR" wait="2 h 10 min" />
      </div>
    </div>
  );
}

/** Two tilted status counts, one over the other. */
function TiltedCounts({ back, front }: { back: [StatusKey, number]; front: [StatusKey, number] }) {
  const big = "!rounded-2xl !border-black/[0.06] !bg-white !py-4 !pl-4 !pr-4 !text-[13px] shadow-[0_24px_40px_-26px_rgba(16,24,40,0.45)]";
  return (
    <div className="relative mx-auto h-[130px] w-full max-w-[280px]">
      <div className="absolute inset-x-5 top-0 -rotate-3">
        <StatCard status={back[0]} count={back[1]} className={`${big} opacity-70`} />
      </div>
      <div className="absolute inset-x-0 top-12 rotate-2">
        <StatCard status={front[0]} count={front[1]} className={big} />
      </div>
    </div>
  );
}

/** A lead whose status has stopped moving: a progress track that stalls. */
function QuietLead() {
  const steps: { key: StatusKey; short?: string }[] = [
    { key: "contacted" },
    { key: "quote" },
    { key: "nego", short: "Negotiation" },
  ];
  return (
    <div className={`${floating} mx-auto flex w-full max-w-[300px] flex-col gap-4 p-4`}>
      <div className="flex items-center gap-3">
        <Initials text="ZA" size="size-9" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold text-[#101828]">2 bed apartment on loan</span>
          <span className="block text-[12px] text-[#667085]">Status updated 18 days ago</span>
        </span>
      </div>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {steps.map((step) => (
          <span key={step.key} className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: statuses[step.key].color }} />
        ))}
        <span className="h-1.5 flex-1 rounded-full bg-[#eaecf0]" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <StatusPill status="nego" short="Negotiation" />
        <span className="flex items-center gap-1 text-[11px] font-medium text-[#b42318]">
          <Clock weight="bold" className="size-3" /> Stuck
        </span>
      </div>
    </div>
  );
}

/** Agents with the status breakdown of their leads, as on the Projects page. */
function AgentBreakdown() {
  const rows: { initials: string; name: string; tone: string; won: number; hold: number }[] = [
    { initials: "MK", name: "Maha Khan", tone: "bg-[#fce7f6] text-[#c11574]", won: 7, hold: 3 },
    { initials: "AR", name: "Ali Raza", tone: "bg-[#e0f2fe] text-[#026aa2]", won: 4, hold: 6 },
    { initials: "HS", name: "Hamza Sheikh", tone: "bg-[#fef0c7] text-[#b54708]", won: 1, hold: 14 },
  ];
  return (
    <ul className={`${floating} flex w-full max-w-[320px] flex-col`}>
      {rows.map((r) => {
        const total = r.won + r.hold;
        return (
          <li key={r.name} className="flex flex-col gap-2 border-b border-black/[0.05] px-4 py-3 last:border-0">
            <div className="flex items-center gap-2.5 text-[13px]">
              <Initials text={r.initials} tone={r.tone} size="size-8" />
              <span className="mr-auto truncate font-semibold text-[#101828]">{r.name}</span>
              <span className="flex flex-none items-center gap-1 text-[11px] text-[#667085]">
                <span className="size-1.5 rounded-full" style={{ backgroundColor: statuses.won.color }} />
                <strong className="font-semibold text-[#101828]">{r.won}</strong>
                <span className="ml-1 size-1.5 rounded-full" style={{ backgroundColor: statuses.hold.color }} />
                <strong className="font-semibold text-[#101828]">{r.hold}</strong>
              </span>
            </div>
            <div className="flex h-1.5 overflow-hidden rounded-full bg-[#f2f4f7]">
              <span style={{ width: `${(r.won / total) * 100}%`, backgroundColor: statuses.won.color }} />
              <span style={{ width: `${(r.hold / total) * 100}%`, backgroundColor: statuses.hold.color }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Status counts as in the dashboard panel, each with a bar for its share. */
function StageCounts() {
  const items: [StatusKey, number][] = [
    ["new", 36],
    ["contacted", 368],
    ["quote", 202],
    ["lost", 754],
  ];
  const max = Math.max(...items.map(([, count]) => count));
  return (
    <ul className={`${floating} flex w-full max-w-[320px] flex-col`}>
      {items.map(([status, count]) => {
        const s = statuses[status];
        const Icon = s.icon;
        return (
          <li key={status} className="flex flex-col gap-1.5 border-b border-black/[0.05] px-4 py-2.5 last:border-0">
            <div className="flex items-center gap-2 text-[12px] text-[#344054]">
              <Icon weight="regular" className="size-3.5 flex-none" style={{ color: s.color }} />
              <span className="mr-auto truncate">{s.label}</span>
              <span className="font-bold text-[#101828]">{count}</span>
            </div>
            <span className="h-1 overflow-hidden rounded-full bg-[#f2f4f7]">
              <span className="block h-full rounded-full" style={{ width: `${Math.max(6, (count / max) * 100)}%`, backgroundColor: s.color }} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* --------------------------------- cards -------------------------------- */

function Wide({ title, line, children }: { title: string; line: string; children: ReactNode }) {
  return (
    <li className={`${card} grid items-center gap-6 p-7 sm:grid-cols-[0.9fr_1.1fr] sm:p-8 lg:col-span-3`}>
      <Text title={title} line={line} />
      <div aria-hidden="true" className="flex sm:justify-end">
        {children}
      </div>
    </li>
  );
}

function Upright({ title, line, children }: { title: string; line: string; children: ReactNode }) {
  return (
    <li className={`${card} flex min-h-[360px] flex-col p-7 sm:p-8 lg:col-span-2`}>
      <Text title={title} line={line} />
      <div aria-hidden="true" className="mt-auto pt-10">
        {children}
      </div>
    </li>
  );
}

export default function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="scroll-mt-20 bg-white">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-12 px-5 py-16 sm:gap-16 sm:px-10 sm:py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="rounded-full border border-[#e6e6e6] bg-white px-3.5 py-1.5 text-[13px] text-ink shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <span className="sr-only">THE PROBLEM</span>
            <span aria-hidden="true">The problem</span>
          </p>
          <h2
            id="problem-heading"
            className="max-w-[40rem] text-[clamp(2rem,4vw,3rem)] !font-medium leading-[1.15] text-balance"
          >
            Your office is busy. Are your clients <span className="serif">moving forward?</span>
          </h2>
        </div>

        <ul className="grid gap-4 lg:grid-cols-6">
          <Upright title="Clients wait for answers" line="Nobody is sure whose job it is to reply.">
            <WaitingLeads />
          </Upright>
          <Upright title="Follow-ups live in heads" line="Next steps are scattered across chats and memory.">
            <TiltedCounts back={["visit", 91]} front={["hold", 289]} />
          </Upright>
          <Upright title="Deals go quiet" line="Interested buyers go cold before anyone notices.">
            <QuietLead />
          </Upright>
          <Wide title="No view of your agents" line="You can’t see who is closing and who needs help.">
            <AgentBreakdown />
          </Wide>
          <Wide title="No picture of your pipeline" line="You can’t tell how many leads sit at each stage.">
            <StageCounts />
          </Wide>
        </ul>
      </div>
    </section>
  );
}
