"use client";

// The 60-second check: tick what sounds like your office, see a live result,
// then leave a WhatsApp number to open the talk-to-us sheet.
// Laid out as a centred list over bars of light: ticked lines lift into
// white pills, the rest stay quiet.

import { useState } from "react";
import { Check, Plus } from "@phosphor-icons/react/dist/ssr";
import { PhoneCapture } from "./contact";

const statements = [
  "Clients sometimes wait hours for a reply.",
  "Follow-ups live in agents’ heads or personal chats.",
  "I can’t see which agent is handling which client.",
  "Interested buyers go quiet and nobody notices.",
  "When an agent leaves, their clients go with them.",
  "I find out about problems only when a client complains.",
];

const tiers = [
  { max: 1, title: "Your office is in good shape.", line: "A short demo will show where you can save even more time.", cta: "Show me a quick demo", tone: "bg-[#e8f7ee] text-[#1d7a52]", bar: "bg-[#25a35a]" },
  { max: 3, title: "Some clients are slipping through.", line: "One place for every client and next step would close those gaps.", cta: "Get my free demo", tone: "bg-[#fff1de] text-[#9a4a00]", bar: "bg-[#e08a1e]" },
  { max: 6, title: "Your clients are leaking.", line: "This is exactly what Endpoint Leads was built for. Let’s talk today.", cta: "Talk to us today", tone: "bg-[#ffe9e6] text-[#b3261e]", bar: "bg-[#d93a2f]" },
];

export default function FitCheck() {
  const [ticked, setTicked] = useState<number[]>([0, 2]);
  const count = ticked.length;
  const tier = tiers.find((t) => count <= t.max) ?? tiers[2];

  return (
    <section id="check" aria-labelledby="check-heading" className="ds-bars scroll-mt-20 text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9 px-5 py-20 sm:px-10 sm:py-28">
        <div className="flex max-w-[40rem] flex-col items-start gap-4 text-left">
          <p className="eyebrow">60-second check</p>
          <h2 id="check-heading" className="text-[clamp(1.9rem,3.4vw,2.5rem)] leading-[1.3] text-balance">
            Is your office <span className="serif">losing clients?</span>
          </h2>
          <p className="text-[16px] text-ink">Tick everything that sounds like your office.</p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <ul className="flex w-full max-w-[620px] flex-col gap-1.5">
          {statements.map((text, i) => {
            const on = ticked.includes(i);
            return (
              <li key={text}>
                <label
                  className={`flex min-h-13 cursor-pointer items-center gap-3 rounded-full py-2 pl-2 pr-5 text-[15px] transition-all duration-200 sm:text-[16px] ${
                    on
                      ? "bg-white font-medium text-ink shadow-[0_0_0_1px_#a7e8c0,0_12px_28px_-18px_rgba(17,17,17,0.22)]"
                      : "text-ink/55 hover:text-ink"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => setTicked(on ? ticked.filter((x) => x !== i) : [...ticked, i])}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`grid size-9 flex-none place-items-center rounded-full ${
                      on ? "bg-gradient-to-b from-[#34d37a] to-[#16a34a] text-white" : "border border-[#e4e5ea] bg-white text-ink shadow-[0_4px_12px_-4px_rgba(21,21,27,0.18)]"
                    }`}
                  >
                    {on ? <Check weight="bold" className="size-4" /> : <Plus weight="bold" className="size-4" />}
                  </span>
                  {text}
                </label>
              </li>
            );
          })}
        </ul>

        <div className="flex w-full flex-col gap-5 rounded-[20px] border border-[#eceef4] bg-white p-6 text-left shadow-[0_30px_60px_-40px_rgba(60,45,170,0.6)] sm:p-8">
          <div aria-live="polite" className="flex flex-col gap-4">
            <span className={`self-start rounded-lg px-3 py-1 text-[13px] font-bold ${tier.tone}`}>
              {count} of {statements.length} ticked
            </span>
            <div className="h-2 overflow-hidden rounded-full bg-black/[0.07]">
              <div className={`h-full rounded-full transition-[width] duration-500 ${tier.bar}`} style={{ width: `${(count / statements.length) * 100}%` }} />
            </div>
            <p className="text-[24px] font-semibold leading-tight tracking-[-0.02em]">{tier.title}</p>
            <p className="text-[15px] leading-relaxed text-body">{tier.line}</p>
          </div>
          <PhoneCapture cta={tier.cta} tone="dark" />
          <p className="text-[13px] text-ink/60">We use your answers so the demo starts where it matters.</p>
        </div>
        </div>
      </div>
    </section>
  );
}
