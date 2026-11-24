"use client";

// The 60-second check: tick what sounds like your office, see a live result,
// then leave a WhatsApp number to open the talk-to-us sheet.

import { useState } from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";
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
  { max: 3, title: "Some clients are slipping through.", line: "One place for every client and next step would close those gaps.", cta: "Get my WhatsApp demo", tone: "bg-[#fff1de] text-[#9a4a00]", bar: "bg-[#e08a1e]" },
  { max: 6, title: "Your clients are leaking.", line: "This is exactly what Endpoint Leads was built for. Let’s talk today.", cta: "Talk to us today", tone: "bg-[#ffe9e6] text-[#b3261e]", bar: "bg-[#d93a2f]" },
];

export default function FitCheck() {
  const [ticked, setTicked] = useState<number[]>([0, 2]);
  const count = ticked.length;
  const tier = tiers.find((t) => count <= t.max) ?? tiers[2];

  return (
    <section id="check" aria-labelledby="check-heading" className="scroll-mt-24 bg-surface px-3 pb-4 sm:px-6 sm:pb-6">
      <div className="dark-panel mx-auto grid w-full max-w-[1360px] gap-10 rounded-[28px] px-5 py-14 text-white sm:rounded-[40px] sm:px-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <p className="eyebrow eyebrow-dark">60-SECOND CHECK</p>
            <h2 id="check-heading" className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance">
              Is your office losing clients?
            </h2>
            <p className="text-[16px] text-white/70">Tick everything that sounds like your office.</p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {statements.map((text, i) => {
              const on = ticked.includes(i);
              return (
                <li key={text}>
                  <label
                    className={`flex min-h-14 cursor-pointer items-center gap-3.5 rounded-2xl px-4 py-3 text-[15px] font-semibold transition-colors ${
                      on ? "bg-white/[0.12] ring-1 ring-accent/60" : "bg-white/[0.05] hover:bg-white/[0.08]"
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
                      className={`grid size-6 flex-none place-items-center rounded-md ${on ? "bg-accent text-night" : "border-2 border-white/30"}`}
                    >
                      {on && <Check weight="bold" className="size-3.5" />}
                    </span>
                    {text}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-5 self-start rounded-[28px] bg-white p-6 text-ink sm:p-8 lg:sticky lg:top-28">
          <div aria-live="polite" className="flex flex-col gap-4">
            <span className={`self-start rounded-full px-3 py-1 text-[13px] font-extrabold ${tier.tone}`}>
              {count} of {statements.length} ticked
            </span>
            <div className="h-2 overflow-hidden rounded-full bg-black/[0.07]">
              <div className={`h-full rounded-full transition-[width] duration-500 ${tier.bar}`} style={{ width: `${(count / statements.length) * 100}%` }} />
            </div>
            <p className="text-[26px] font-extrabold leading-tight tracking-[-0.02em]">{tier.title}</p>
            <p className="text-[15px] leading-relaxed text-body">{tier.line}</p>
          </div>
          <PhoneCapture cta={tier.cta} tone="dark" />
          <p className="text-[13px] text-ink/60">We use your answers so the demo starts where it matters.</p>
        </div>
      </div>
    </section>
  );
}
