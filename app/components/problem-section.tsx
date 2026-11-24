// The problems as a card grid: a centred label and heading, three upright
// cards (text on top, picture underneath) and two wide cards (text left,
// picture right). The pictures are not icons or illustrations: each is
// built from the dashboard's own components (lead rows, status counts,
// status pills, breakdown chips). Every name and number is sample data.

import type { ReactNode } from "react";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { Initials, StatCard, StatusPill, statuses, type StatusKey } from "./dashboard-parts";

const card =
  "overflow-hidden rounded-[24px] border border-[#ececf1] bg-[linear-gradient(180deg,#fbfbfd_0%,#f3f3f7_100%)]";
const floating = "rounded-2xl border border-[#eaecf0] bg-white shadow-[0_20px_40px_-24px_rgba(16,24,40,0.4)]";

function Text({ title, line }: { title: string; line: string }) {
  return (
    <div>
      <h3 className="text-[22px] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[24px]">{title}</h3>
      <p className="mt-2 max-w-[17rem] text-[15px] leading-relaxed text-body">{line}</p>
    </div>
  );
}

/* ------------------------------- pictures ------------------------------- */

function LeadRow({ title, agent, wait }: { title: string; agent: string; wait: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-3.5">
      <Initials text={agent} size="size-8" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-[#101828]">{title}</span>
        <span className="mt-0.5 flex items-center gap-1 whitespace-nowrap text-[11px] text-[#b42318]">
          <Clock weight="bold" className="size-3 flex-none" /> No reply for {wait}
        </span>
      </span>
      <StatusPill status="new" />
    </div>
  );
}

/** Two stacked lead cards: new enquiries nobody has answered. */
function WaitingLeads() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] pt-7">
      <div className={`${floating} absolute inset-x-5 top-0 h-16 opacity-70`} />
      <div className={`${floating} relative`}>
        <LeadRow title="10 marla plot, G block" agent="AR" wait="2 h 10 min" />
      </div>
    </div>
  );
}

/** Two tilted status counts, one over the other. */
function TiltedCounts({ back, front }: { back: [StatusKey, number]; front: [StatusKey, number] }) {
  const big = "!rounded-2xl !border-[#eaecf0] !bg-white !py-4 !pl-4 !pr-3.5 !text-[13px] shadow-[0_20px_40px_-24px_rgba(16,24,40,0.4)]";
  return (
    <div className="relative mx-auto h-[130px] w-full max-w-[280px]">
      <div className="absolute inset-x-6 top-0 -rotate-6">
        <StatCard status={back[0]} count={back[1]} className={`${big} opacity-80`} />
      </div>
      <div className="absolute inset-x-0 top-12 rotate-3">
        <StatCard status={front[0]} count={front[1]} className={big} />
      </div>
    </div>
  );
}

/** A lead whose status has stopped moving. */
function QuietLead() {
  const steps: StatusKey[] = ["contacted", "quote", "nego"];
  return (
    <div className={`${floating} mx-auto flex w-full max-w-[300px] flex-col gap-3 p-4`}>
      <div className="flex items-center gap-3">
        <Initials text="ZA" size="size-9" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-medium text-[#101828]">2 bed apartment on loan</span>
          <span className="block text-[12px] text-[#667085]">Status updated 18 days ago</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {steps.map((s) => (
          <StatusPill key={s} status={s} short={s === "nego" ? "Negotiation" : undefined} />
        ))}
        <StatusPill status="lost" />
      </div>
    </div>
  );
}

/** Agents with the status breakdown of their leads, as on the Projects page. */
function AgentBreakdown() {
  const rows: { initials: string; name: string; tone: string; counts: [StatusKey, number][] }[] = [
    { initials: "MK", name: "Maha Khan", tone: "bg-[#fce7f6] text-[#c11574]", counts: [["won", 7], ["hold", 3]] },
    { initials: "AR", name: "Ali Raza", tone: "bg-[#e0f2fe] text-[#026aa2]", counts: [["won", 4], ["hold", 6]] },
    { initials: "HS", name: "Hamza Sheikh", tone: "bg-[#fef0c7] text-[#b54708]", counts: [["won", 1], ["hold", 14]] },
  ];
  return (
    <ul className={`${floating} flex w-full max-w-[300px] flex-col`}>
      {rows.map((r) => (
        <li key={r.name} className="flex items-center gap-2.5 border-b border-[#f2f4f7] px-3.5 py-3 text-[13px] last:border-0">
          <Initials text={r.initials} tone={r.tone} size="size-8" />
          <span className="mr-auto truncate font-medium text-[#101828]">{r.name}</span>
          <span className="flex flex-none gap-1.5">
            {r.counts.map(([status, count]) => (
              <span key={status} className="inline-flex items-center gap-1 rounded-md border border-[#eaecf0] px-1.5 py-1 text-[11px] text-[#344054]">
                <span className="size-1.5 rounded-full" style={{ backgroundColor: statuses[status].color }} />
                {status === "won" ? "Won" : "Hold"}
                <strong className="font-semibold text-[#101828]">{count}</strong>
              </span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Four status counts, as in the panel at the top of the dashboard. */
function StageCounts() {
  const items: [StatusKey, number][] = [
    ["new", 36],
    ["contacted", 368],
    ["quote", 202],
    ["lost", 754],
  ];
  return (
    <div className="flex w-full max-w-[300px] flex-col gap-1.5">
      {items.map(([status, count]) => (
        <StatCard
          key={status}
          status={status}
          count={count}
          className="!rounded-xl !border-[#eaecf0] !bg-white !py-2.5 !text-[12px] shadow-[0_16px_32px_-22px_rgba(16,24,40,0.4)]"
        />
      ))}
    </div>
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
            Your office is busy. Are your clients moving forward?
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
