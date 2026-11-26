"use client";

// Option 2's "reach us" form: every question on one premium card instead of
// six steps. A glass frame with a soft sky edge, the team's faces up top,
// fields with icons and a black gradient button. Sending it opens WhatsApp
// with the answers typed in, the same as the home page's step form.

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Buildings, CheckCircle, EnvelopeSimple, Phone, User } from "@phosphor-icons/react/dist/ssr";
import { whatsappLink } from "../site-config";

const teamSizes = ["2–10", "11–25", "25–50", "50+"];

const input =
  "h-12 w-full rounded-2xl border border-black/[0.06] bg-[#f7f8fa] pl-11 pr-4 text-[14px] text-[#111113] transition-[border-color,background-color] placeholder:text-[#111113]/35 hover:border-black/[0.1] focus:border-[#111113] focus:bg-white focus:outline-none focus-visible:outline-none";

function Field({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-[12.5px] font-medium text-[#3d3d44]">
      {label}
      <span className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8a93]">{icon}</span>
        {children}
      </span>
    </label>
  );
}

export default function ReachUsForm() {
  const [a, setA] = useState({ businessName: "", teamSize: "2–10", challenge: "", fullName: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof a, v: string) => {
    setA((cur) => ({ ...cur, [k]: v }));
    setSent(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Hi Endpoint Leads, I would like a free demo.",
      "",
      `Real estate business: ${a.businessName.trim()}`,
      `People handling enquiries: ${a.teamSize}`,
      `Biggest challenge: ${a.challenge.trim()}`,
      "",
      `Full name: ${a.fullName.trim()}`,
      `Phone number: ${a.phone.trim()}`,
      `Email address: ${a.email.trim()}`,
    ].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    // a soft sky-to-white edge around a frosted frame
    <div className="rounded-[30px] bg-[linear-gradient(160deg,rgba(255,255,255,0.95)_0%,rgba(190,218,246,0.9)_45%,rgba(255,255,255,0.7)_100%)] p-[1.5px] shadow-[0_40px_80px_-44px_rgba(25,55,100,0.28),0_16px_32px_-28px_rgba(25,55,100,0.18)]">
      <div className="rounded-[28.5px] bg-white/55 p-2 backdrop-blur-xl">
        <form
          id="demo-enquiry"
          onSubmit={submit}
          className="reach-form flex scroll-mt-28 flex-col gap-5 rounded-[22px] bg-white p-5 shadow-[0_1px_2px_rgba(17,17,19,0.06)] sm:p-7 [@media(min-width:1024px)_and_(max-height:820px)]:!gap-4 [@media(min-width:1024px)_and_(max-height:820px)]:!p-6"
        >
          {/* header: who you will talk to */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div>
                <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.025em] text-[#111113]">Book your free demo</h2>
                <p className="mt-1 text-[13.5px] text-[#5b5b63]">A real person from our team will set it up with you.</p>
              </div>
            </div>
            <span className="flex-none whitespace-nowrap rounded-full border border-[#c7ecd6] bg-[#effaf3] px-2.5 py-1 text-[11px] font-semibold text-[#1d7a52]">
              Free · 20 min
            </span>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Business name" icon={<Buildings className="size-[18px]" />}>
              <input required autoComplete="organization" value={a.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="Skyline Estates" className={input} />
            </Field>
            <Field label="Full name" icon={<User className="size-[18px]" />}>
              <input required autoComplete="name" value={a.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Your name" className={input} />
            </Field>
            <Field label="Phone number" icon={<Phone className="size-[18px]" />}>
              <input required type="tel" inputMode="tel" autoComplete="tel" value={a.phone} onChange={(e) => set("phone", e.target.value)} placeholder="03xx xxxxxxx" className={input} />
            </Field>
            <Field label="Email address" icon={<EnvelopeSimple className="size-[18px]" />}>
              <input required type="email" inputMode="email" autoComplete="email" value={a.email} onChange={(e) => set("email", e.target.value)} placeholder="you@office.com" className={input} />
            </Field>
          </div>

          <fieldset className="flex flex-col gap-1.5">
            <legend className="mb-1.5 text-[12.5px] font-medium text-[#3d3d44]">People handling client enquiries</legend>
            <div className="grid grid-cols-4 gap-1 rounded-2xl border border-black/[0.06] bg-[#f7f8fa] p-1">
              {teamSizes.map((size) => (
                <label key={size} className="relative">
                  <input type="radio" name="teamSize" value={size} required checked={a.teamSize === size} onChange={(e) => set("teamSize", e.target.value)} className="peer sr-only" />
                  <span className="flex h-10 cursor-pointer items-center justify-center rounded-xl text-[13px] font-medium text-[#3d3d44] transition-all hover:text-[#111113] peer-checked:bg-white peer-checked:text-[#111113] peer-checked:shadow-[0_1px_2px_rgba(17,17,19,0.08),0_6px_14px_-8px_rgba(17,17,19,0.35)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-1.5 text-[12.5px] font-medium text-[#3d3d44]">
            Biggest challenge <span className="sr-only">(optional)</span>
            <textarea
              rows={3}
              value={a.challenge}
              onChange={(e) => set("challenge", e.target.value)}
              placeholder="Follow-ups get missed, agents reply late…"
              className="w-full resize-none rounded-2xl [@media(min-width:1024px)_and_(max-height:820px)]:!h-[64px] border border-black/[0.06] bg-[#f7f8fa] px-4 py-3 text-[14px] text-[#111113] transition-[border-color,background-color] placeholder:text-[#111113]/35 hover:border-black/[0.1] focus:border-[#111113] focus:bg-white focus:outline-none focus-visible:outline-none"
            />
          </label>

          {/* the team who will call you back, beside the button */}
          <div className="mt-1 flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
            <span className="flex flex-none items-center justify-center gap-2.5 sm:justify-start">
              <span className="group/av flex -space-x-3 transition-all duration-300 hover:-space-x-1">
                {["maha", "ali", "hamza"].map((p, i) => (
                  <Image key={p} src={`/avatars/${p}.webp`} alt="" width={44} height={44} className="av-pop size-11 rounded-full object-cover ring-[3px] ring-white transition-transform duration-300 group-hover/av:-translate-y-0.5" style={{ animationDelay: `${i * 120}ms, ${0.9 + i * 0.4}s` }} />
                ))}
              </span>
            </span>
            <button
              type="submit"
              className="group inline-flex h-[52px] flex-none items-center gap-4 whitespace-nowrap rounded-full bg-gradient-to-b from-[#3a3a44] to-[#0a0a0d] pl-5 pr-1.5 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_28px_-14px_rgba(10,10,13,0.75)] transition-[filter] hover:brightness-125"
            >
              {sent ? (
                <span className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="size-4" /> Opened in WhatsApp
                </span>
              ) : (
                "Book my demo"
              )}
              <span className="grid size-10 place-items-center rounded-full bg-white/12 transition-transform group-hover:translate-x-0.5">
                <ArrowRight weight="bold" className="size-4" />
              </span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
