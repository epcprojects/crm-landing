"use client";

// Mockup section 4. A conversation plays on the left; each time an agent
// promises something, it lands on the "Next steps" list on the right.
// All names, messages and times are sample data.

import { useEffect, useState } from "react";
import { useSeen } from "./reveal-root";

// 0 empty · 1 Sara asks · 2 Maha typing · 3 Maha answers · 4 step 1 added
// 5 Sara asks again · 6 Maha typing · 7 Maha answers · 8 step 2 added
// 9 step 1 done · -1 fading out before the loop restarts
const DONE = 9;
const TIMELINE: [number, number][] = [
  [900, 1],
  [2200, 2],
  [3300, 3],
  [4100, 4],
  [6100, 5],
  [7300, 6],
  [8400, 7],
  [9200, 8],
  [11400, 9],
  [16500, -1],
  [17100, 0],
];
const LOOP_GAP = 600;

function Check({ className = "size-3" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function Bubble({
  mine,
  who,
  time,
  children,
}: {
  mine?: boolean;
  who: string;
  time: string;
  children: string;
}) {
  return (
    <div
      className={`msg-in flex shrink-0 flex-col ${
        mine ? "msg-in-mine items-end" : "items-start"
      }`}
    >
      <p
        className={`max-w-[85%] px-3.5 py-2 text-[14px] leading-snug ${
          mine
            ? "rounded-2xl rounded-tr-sm bg-brand text-white"
            : "rounded-2xl rounded-tl-sm bg-[#f1f1f4] text-ink"
        }`}
      >
        {children}
      </p>
      <span className="mt-1 text-[12px] text-ink/60">
        {who} · {time}
      </span>
    </div>
  );
}

function Typing() {
  return (
    <div className="msg-in msg-in-mine flex shrink-0 justify-end">
      <span
        role="status"
        aria-label="Typing"
        className="inline-flex items-center gap-1 rounded-2xl rounded-tr-sm bg-brand/15 px-3.5 py-3"
      >
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            aria-hidden="true"
            className="typing-dot size-1.5 rounded-full bg-ink/45"
            style={{ animationDelay: `${dot * 150}ms` }}
          />
        ))}
      </span>
    </div>
  );
}

// Appears under the message that created a next step.
function Added({ children }: { children: string }) {
  return (
    <div className="pop-in flex shrink-0 justify-end">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.07] px-3 py-1.5 text-[12px] font-bold text-brand">
        <Check />
        Next step added: {children}
      </span>
    </div>
  );
}

type Step = { text: string; meta: string; done?: boolean; fresh?: boolean };

function StepRow({ step }: { step: Step }) {
  return (
    <li
      className={`${step.fresh ? "step-in" : ""} flex items-start gap-3 py-3.5`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-500 ${
          step.done
            ? "border-[#2fb37a] bg-[#2fb37a] text-white"
            : "border-brand/40 bg-white text-transparent"
        }`}
      >
        <Check className="size-3" />
      </span>
      <span className="min-w-0">
        <span
          className={`block text-[15px] font-bold leading-snug transition-colors duration-500 ${
            step.done ? "text-ink/45 line-through" : ""
          }`}
        >
          {step.text}
        </span>
        <span className="mt-0.5 block text-[13px] text-ink/60">
          {step.done ? `${step.meta.split(" · ")[0]} · Done` : step.meta}
        </span>
      </span>
    </li>
  );
}

function WindowBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-black/[0.07] bg-[#f7f7fc] px-4 py-3">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          aria-hidden="true"
          className="size-2.5 rounded-full bg-black/15"
        />
      ))}
      <span className="ml-3 text-[13px] font-bold text-ink/70">{title}</span>
    </div>
  );
}

export default function ConversationDemo() {
  const seen = useSeen();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setStep(DONE));
      return () => cancelAnimationFrame(raf);
    }
    const timers: number[] = [];
    const play = (offset: number) => {
      TIMELINE.forEach(([at, value]) =>
        timers.push(window.setTimeout(() => setStep(value), offset + at)),
      );
      const end = offset + TIMELINE[TIMELINE.length - 1][0];
      timers.push(window.setTimeout(() => play(LOOP_GAP - TIMELINE[0][0]), end));
    };
    play(0);
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [seen]);

  const fading = step === -1;
  const typing = step === 2 || step === 6;

  const steps: Step[] = [
    ...(step >= 8
      ? [{ text: "Confirm Saturday 11 am viewing", meta: "Maha · Due Friday", fresh: true }]
      : []),
    ...(step >= 4
      ? [{ text: "Send the payment plan to Sara", meta: "Maha · Due today", done: step >= DONE, fresh: true }]
      : []),
    { text: "Reply with the developer’s offer to Hina", meta: "Maha · Due today" },
    { text: "Confirm Sunday’s visit with Bilal", meta: "Ali · Due Saturday" },
  ];
  const open = steps.filter((item) => !item.done).length;

  return (
    <div
      className="reveal mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8"
      style={{ "--d": "0.2s" } as React.CSSProperties}
    >
      {/* what was discussed */}
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        <WindowBar title="Conversation · Sara" />
        <div className="flex items-center gap-3 border-b border-black/[0.07] px-5 py-3">
          <span className="grid size-9 place-items-center rounded-full bg-[#e4e0ff] text-[13px] font-bold text-[#2f2496]">
            S
          </span>
          <div>
            <p className="text-[15px] font-extrabold leading-tight">Sara</p>
            <p className="text-[12px] text-ink/60">Apartment, Tower B · Owner Maha</p>
          </div>
        </div>
        <div
          className={`flex h-[420px] flex-col justify-end gap-3 overflow-hidden px-5 py-5 transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,transparent,black_14%)] ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {step >= 1 && (
            <Bubble who="Sara" time="2:10 pm">
              Can you send me the payment plan?
            </Bubble>
          )}
          {step >= 3 && (
            <Bubble mine who="Maha" time="2:35 pm">
              Yes, sending it today.
            </Bubble>
          )}
          {step >= 4 && <Added>Send the payment plan</Added>}
          {step >= 5 && (
            <Bubble who="Sara" time="3:05 pm">
              Great. Can we see the apartment on Saturday?
            </Bubble>
          )}
          {step >= 7 && (
            <Bubble mine who="Maha" time="3:12 pm">
              Saturday at 11 am works.
            </Bubble>
          )}
          {step >= 8 && <Added>Confirm Saturday viewing</Added>}
          {typing && <Typing />}
        </div>
      </div>

      {/* what happens next */}
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        <WindowBar title="Next steps" />
        <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-3">
          <p className="text-[15px] font-extrabold">Everything coming up</p>
          <p
            key={open}
            className="pop-in rounded-full bg-brand/10 px-3 py-1 text-[12px] font-bold text-brand"
          >
            {open} open
          </p>
        </div>
        <ul
          className={`min-h-[330px] divide-y divide-black/[0.07] px-5 transition-opacity duration-500 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {steps.map((item) => (
            <StepRow key={item.text} step={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
