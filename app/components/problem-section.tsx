// Mockup section 2. Chat names, messages and times are sample data.

import type { CSSProperties } from "react";
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
      { from: "agent", text: "Location sent. Visit at 4 pm?", time: "3:20 pm", at: 0.5 },
      { from: "client", text: "It’s almost 4. Should I leave to see the plot?", time: "3:52 pm", at: 1.1 },
    ],
  },
  {
    name: "Sara",
    lead: "Apartment, Tower B",
    rotate: "lg:rotate-[1.5deg]",
    enter: 0.3,
    waitMinutes: 130,
    messages: [
      { from: "client", text: "Can you send me the payment plan?", time: "2:10 pm", at: 0.7 },
      { from: "agent", text: "Yes, sending it today.", time: "2:35 pm", at: 1.2 },
      { from: "client", text: "Any update on the plan?", time: "4:40 pm", at: 1.7 },
    ],
  },
];

const problems: { title: string; line: string; path: string }[] = [
  {
    title: "Clients wait for answers",
    line: "A client asks a question and nobody is sure whose job it is to reply.",
    path: "M4 5h16v11H9l-5 4zM8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01",
  },
  {
    title: "Nobody sees what’s next",
    line: "Follow-ups live in chats and in people’s heads, not in one place.",
    path: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.6 9.2a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1.1.9-1.1 1.7M12 16.6h.01",
  },
  {
    title: "Deals quietly slip away",
    line: "Interested clients go cold, and the deal is lost before anyone notices.",
    path: "M3 7l6 6 4-4 8 8M21 11v6h-6",
  },
];

function Clock() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path className="clock-hand" d="M12 12V7.5" />
    </svg>
  );
}

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
        style={d(chat.enter + 2.2)}
      >
        <Clock />
        <span>
          No reply for <WaitingTimer to={chat.waitMinutes} delay={(chat.enter + 2.2) * 1000} />
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
      className="relative scroll-mt-16 bg-white pb-24 pt-8 text-ink sm:pb-28 lg:pb-32"
    >
      <RevealRoot className="problem-stage mx-auto w-full max-w-[1120px] px-4 sm:px-8">
        <div className="text-center">
          <p className="inline-flex items-center gap-3 font-label text-xs font-medium tracking-[0.2em] text-brand">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            THE PROBLEM
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
          </p>
          <h2
            id="problem-heading"
            className="mx-auto mt-6 max-w-[26ch] text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-balance"
          >
            <span className="block">Your office is busy.</span>
            <span className="block text-brand">
              But are your clients moving forward?
            </span>
          </h2>
        </div>

        {/* the warning */}
        <p
          className="reveal mx-auto mt-10 flex w-fit items-center gap-2.5 rounded-full border border-[#f0c48a] bg-[#fff4e5] px-4 py-2 text-[13px] font-bold text-[#9a4a00]"
          style={d(4.9)}
        >
          <span aria-hidden="true" className="relative flex size-2.5">
            <span className="warn-ping absolute inline-flex size-full rounded-full bg-[#e08a1e]" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[#e08a1e]" />
          </span>
          2 clients are waiting right now
        </p>

        {/* two conversations nobody has answered */}
        <div className="mt-6 flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
          {chats.map((chat) => (
            <ChatCard key={chat.name} chat={chat} />
          ))}
        </div>

        {/* what it costs */}
        <ol className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-12">
          {problems.map((problem, index) => (
            <li
              key={problem.title}
              className="reveal flex gap-4 lg:flex-col lg:items-center lg:text-center"
              style={d(5.4 + index * 0.25)}
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand/[0.08] text-brand">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="draw size-7"
                  style={d(5.6 + index * 0.25)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={problem.path} pathLength={1} />
                </svg>
              </span>
              <div>
                <h3 className="text-xl font-extrabold tracking-[-0.015em]">
                  {problem.title}
                </h3>
                <p className="mt-2 max-w-[22rem] text-base leading-7 text-body">
                  {problem.line}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* the closing line */}
        <div className="reveal mt-16 text-center lg:mt-20" style={d(6.4)}>
          <p className="mx-auto max-w-[26ch] text-[clamp(1.5rem,2.8vw,2.2rem)] font-extrabold leading-tight tracking-[-0.02em] text-balance">
            Busy isn&rsquo;t the same as{" "}
            <span className="text-brand">moving forward.</span>
          </p>
          <a
            href="#client-file"
            className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] font-semibold text-ink/90 transition-colors hover:text-ink"
          >
            See how Endpoint Leads fixes it
            <span
              aria-hidden="true"
              className="text-brand transition-transform group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
        </div>
      </RevealRoot>
    </section>
  );
}
