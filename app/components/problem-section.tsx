// Mockup section 2. Chat names, messages and times are sample data.

import type { CSSProperties } from "react";
import {
  ArrowDown,
  ChatCircleDots,
  ClockCountdown,
  Question,
  TrendDown,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import RevealRoot from "./reveal-root";
import WaitingTimer from "./waiting-timer";

function d(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

type Message = {
  from: "client" | "agent";
  text: string;
  time: string;
  at: number;
};

const chats: {
  name: string;
  lead: string;
  rotate: string;
  enter: number;
  waitMinutes: number;
  messages: Message[];
}[] = [
  {
    name: "Usman",
    lead: "Plot enquiry, Block A",
    rotate: "lg:-rotate-[1.5deg]",
    enter: 0.1,
    waitMinutes: 25,
    messages: [
      { from: "agent", text: "Location sent. Visit at 4 pm?", time: "3:20 pm", at: 0.3 },
      { from: "client", text: "It’s almost 4. Should I leave to see the plot?", time: "3:52 pm", at: 0.6 },
    ],
  },
  {
    name: "Sara",
    lead: "Apartment, Tower B",
    rotate: "lg:rotate-[1.5deg]",
    enter: 0.3,
    waitMinutes: 130,
    messages: [
      { from: "client", text: "Can you send me the payment plan?", time: "2:10 pm", at: 0.4 },
      { from: "agent", text: "Yes, sending it today.", time: "2:35 pm", at: 0.7 },
      { from: "client", text: "Any update on the plan?", time: "4:40 pm", at: 1.0 },
    ],
  },
];

const problems: { title: string; line: string; Icon: PhosphorIcon }[] = [
  {
    title: "Clients wait for answers",
    line: "A client asks a question and nobody is sure whose job it is to reply.",
    Icon: ChatCircleDots,
  },
  {
    title: "Nobody sees what’s next",
    line: "Follow-ups live in chats and in people’s heads, not in one place.",
    Icon: Question,
  },
  {
    title: "Deals quietly slip away",
    line: "Interested clients go cold, and the deal is lost before anyone notices.",
    Icon: TrendDown,
  },
];

function ChatCard({ chat }: { chat: (typeof chats)[number] }) {
  return (
    <div
      className={`reveal w-full max-w-[22rem] rounded-2xl border border-black/10 bg-white p-4 text-left ${chat.rotate}`}
      style={d(chat.enter)}
    >
      <div className="flex items-center gap-3 border-b border-black/[0.07] pb-3">
        <span className="grid size-9 place-items-center rounded-full bg-[#e4e0ff] text-[13px] font-bold text-[#2f2496]">
          {chat.name[0]}
        </span>
        <div>
          <p className="text-[15px] font-extrabold leading-tight">{chat.name}</p>
          <p className="text-[12px] text-ink/60">{chat.lead}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {chat.messages.map((message) => {
          const mine = message.from === "agent";
          return (
            <li
              key={message.text}
              className={`reveal flex flex-col ${mine ? "items-end" : "items-start"}`}
              style={d(message.at)}
            >
              <p
                className={`max-w-[88%] px-3.5 py-2 text-[13px] leading-snug ${
                  mine
                    ? "rounded-2xl rounded-tr-sm bg-brand text-white"
                    : "rounded-2xl rounded-tl-sm bg-[#f1f1f4] text-ink"
                }`}
              >
                {message.text}
              </p>
              <span className="mt-1 text-[11px] text-ink/55">{message.time}</span>
            </li>
          );
        })}
      </ul>

      <p
        className="reveal mt-4 flex items-center gap-2 rounded-lg bg-[#fff4e5] px-3 py-2 text-[13px] font-bold text-[#9a4a00]"
        style={d(chat.enter + 1.2)}
      >
        <ClockCountdown aria-hidden="true" weight="bold" className="size-4 shrink-0" />
        <span>
          No reply for <WaitingTimer
            to={chat.waitMinutes}
            delay={(chat.enter + 1.2) * 1000}
            duration={1100}
          />
        </span>
      </p>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-white via-white to-[#f8f7ff] pb-16 pt-6 text-ink sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28"
    >
      <RevealRoot
        className="problem-stage mx-auto w-full max-w-7xl px-5 sm:px-10"
        threshold={0.1}
      >
        <div className="text-center">
          <p className="font-label text-xs font-medium tracking-[0.2em] text-brand">
            THE PROBLEM
          </p>
          <h2
            id="problem-heading"
            className="mx-auto mt-5 max-w-[26ch] text-[clamp(2.05rem,4.4vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance"
          >
            <span className="block text-ink/90">Your office is busy.</span>
            <span className="block text-brand">
              But are your clients{" "}
              <span>moving forward?</span>
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[34rem] text-[17px] leading-[1.75] text-body sm:text-lg">
            Messages pile up, follow-ups slip, and nobody can say who is
            waiting on whom.
          </p>
        </div>

        {/* the warning */}
        <p
          className="reveal mx-auto mt-8 sm:mt-12 flex w-fit items-center gap-2.5 rounded-full border border-[#f0c48a] bg-[#fff4e5] px-4 py-2 text-[13px] font-bold text-[#9a4a00]"
          style={d(0.2)}
        >
          <span aria-hidden="true" className="relative flex size-2.5">
            <span className="warn-ping absolute inline-flex size-full rounded-full bg-[#e08a1e]" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[#e08a1e]" />
          </span>
          2 clients are waiting right now
        </p>

        {/* two conversations nobody has answered */}
        <div className="relative mt-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[44rem] max-w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(120,104,238,0.13),transparent)]"
          />
          <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
            {chats.map((chat) => (
              <ChatCard key={chat.name} chat={chat} />
            ))}
          </div>
        </div>
      </RevealRoot>

      {/* what it costs: reveals on its own as you scroll, never waits for the chats */}
      <RevealRoot
        className="mx-auto w-full max-w-7xl px-5 sm:px-10"
        threshold={0.1}
      >
        <ol className="mt-8 grid gap-6 sm:mt-16 lg:mt-28 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-black/10">
          {problems.map((problem, index) => (
            <li
              key={problem.title}
              className="reveal flex items-start gap-4 lg:flex-col lg:items-center lg:px-10 lg:text-center"
              style={d(index * 0.12)}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand/[0.09] text-brand sm:size-14">
                <problem.Icon
                  aria-hidden="true"
                  weight="bold"
                  className="icon-pop size-6 sm:size-7"
                  style={d(0.2 + index * 0.12)}
                />
              </span>
              <div>
                <h3 className="text-[18px] font-extrabold tracking-[-0.02em] sm:text-xl">
                  {problem.title}
                </h3>
                <p className="mt-1.5 max-w-[22rem] text-[15px] leading-6 text-body sm:mt-2.5 sm:text-base sm:leading-7">
                  {problem.line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* the closing line */}
        <div className="reveal mt-10 text-center sm:mt-16 lg:mt-28" style={d(0.4)}>
          <p className="mx-auto max-w-[24ch] text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-balance">
            Busy isn&rsquo;t the same as{" "}
            <span className="text-brand">moving forward.</span>
          </p>
          <a
            href="#client-file"
            className="group mt-6 inline-flex min-h-14 sm:mt-8 items-center justify-center gap-3 rounded-full border border-black/10 bg-white py-2 pl-7 pr-2.5 text-[16px] font-bold text-ink transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand active:translate-y-0"
          >
            See how Endpoint Leads fixes it
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-full bg-brand/10 text-brand transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <ArrowDown weight="bold" className="size-[18px]" />
            </span>
          </a>
        </div>
      </RevealRoot>
    </section>
  );
}
