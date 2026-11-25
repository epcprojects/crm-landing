"use client";

// A closing call to action before the FAQ: one wide card on a soft haze of
// lilac, mint, peach and sky over a blurred office photo. Copy and three points on the left, a short
// "book your demo" form on the right that opens the talk-to-us sheet.

import { useState } from "react";
import { CalendarCheck, CaretDown, Check, Clock } from "@phosphor-icons/react/dist/ssr";
import { useContact } from "./contact";

const points = [
  "Your own team and clients, set up in the demo",
  "Where follow-ups slip today, and how to catch them",
  "How agents, owners and clients each see their part",
];

const field =
  "min-h-12 w-full rounded-xl border border-black/[0.06] bg-[#f5f5f7] px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-[#c9c2ff] focus:bg-white";

export default function DemoCtaCard() {
  const { openSheet } = useContact();
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");

  return (
    <section aria-labelledby="demo-cta-heading" className="bg-white px-3 pt-10 sm:px-5 sm:pt-16">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[28px] border border-black/[0.04] sm:rounded-[36px]">
        {/* four soft hazes */}
        {/* a soft office photo (AI-made, public/demo-cta-bg.webp), blurred, under a
            white wash that is strongest on the left where the text sits */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/demo-cta-bg.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 size-full scale-110 object-cover blur-[10px]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.72)_50%,rgba(255,255,255,0.45)_100%)]" />
        <div aria-hidden="true" className="absolute -left-24 -top-24 size-[460px] rounded-full bg-[#ddd6ff] opacity-40 blur-[90px]" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-16 size-[420px] rounded-full bg-[#d4f5e2] opacity-40 blur-[90px]" />
        <div aria-hidden="true" className="absolute -bottom-24 right-[18%] size-[480px] rounded-full bg-[#ffe0cc] opacity-40 blur-[100px]" />
        <div aria-hidden="true" className="absolute -right-24 -top-28 size-[420px] rounded-full bg-[#d6ecff] opacity-40 blur-[90px]" />

        <div className="relative grid items-center gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:px-16">
          <div className="flex flex-col gap-6">
            <h2 id="demo-cta-heading" className="text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-balance">
              Book your free <span className="serif">demo.</span>
            </h2>
            <p className="max-w-[30rem] text-[17px] leading-relaxed text-body">
              Tell us about your office and we&rsquo;ll walk you through Endpoint Leads
              with your own team and clients in mind.
            </p>
            <ul className="flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-[15px] text-ink">
                  <span aria-hidden="true" className="grid size-6 flex-none place-items-center rounded-full bg-gradient-to-b from-[#3a3a44] to-[#0a0a0d] text-white">
                    <Check weight="bold" className="size-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="inline-flex self-start overflow-hidden rounded-full border border-black/[0.06] bg-white text-[13px] shadow-[0_10px_24px_-16px_rgba(21,21,27,0.3)]">
              <span className="inline-flex items-center gap-1.5 bg-[#1d7a52] px-3 py-1.5 font-semibold text-white">
                <Clock aria-hidden="true" weight="bold" className="size-3.5" />
                About 20 min
              </span>
              <span className="px-3 py-1.5 text-body">No pressure and no slides</span>
            </p>
          </div>

          <div className="relative">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                openSheet("", email.trim());
              }}
              className="flex flex-col gap-4 rounded-[24px] border border-black/[0.05] bg-white p-6 shadow-[0_30px_60px_-36px_rgba(21,21,27,0.4)] sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 whitespace-nowrap text-[19px] font-semibold tracking-[-0.01em] text-ink">
                  <CalendarCheck aria-hidden="true" weight="duotone" className="size-6 text-[#f97316]" />
                  Your free demo
                </p>
                <span className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full bg-[#f2f4f7] px-2.5 py-1 text-[12px] font-medium text-body">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-[#12b76a]" /> Free · 20 min
                </span>
              </div>
              <label className="flex flex-col gap-1.5 text-[13px] text-body">
                Office name
                <input value={office} onChange={(e) => setOffice(e.target.value)} placeholder="e.g. Skyline Estates" autoComplete="organization" className={field} />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] text-body">
                Work email
                <input
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@youroffice.com"
                  className={field}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] text-body">
                Team size
                <span className="relative">
                  <select value={team} onChange={(e) => setTeam(e.target.value)} className={`${field} appearance-none pr-10 ${team ? "" : "text-ink/45"}`}>
                    <option value="" disabled>
                      Choose your team size
                    </option>
                    <option>Just me</option>
                    <option>2 to 5 agents</option>
                    <option>6 to 15 agents</option>
                    <option>More than 15 agents</option>
                  </select>
                  <CaretDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink/50" />
                </span>
              </label>
              <button
                type="submit"
                className="mt-1 inline-flex h-12 items-center justify-center bg-brand px-5 text-[16px] font-medium text-white"
              >
                Book my demo
              </button>
              <p className="text-center text-[12px] text-ink/50">We only use this to set up your demo.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
