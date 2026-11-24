"use client";

// "How would you like to start?" Three routes, one panel at a time.
// Demo: the Calendly scheduler when NEXT_PUBLIC_CALENDLY_URL is set,
// otherwise a day/time request sent on WhatsApp.

import { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { siteConfig, whatsappLink } from "../site-config";

const routes = [
  { id: "demo", title: "See a demo for my office", line: "20 minutes, set up around how your team works.", meta: "You pick the time", popular: true },
  { id: "whatsapp", title: "Ask a quick question", line: "Pricing, setup, moving your clients in.", meta: `Reply in about ${siteConfig.replyTime} on WhatsApp`, popular: false },
  { id: "support", title: "I am already a client", line: "Help with your team’s account.", meta: "Reply the same working day", popular: false },
] as const;

type Route = (typeof routes)[number]["id"];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["Morning", "Afternoon", "Evening"];
const questions = [
  "How much does it cost for my team?",
  "Can you move our existing clients in?",
  "Does it work on my agents’ phones?",
  "Can I see a demo this week?",
];

const pill = (on: boolean) =>
  `min-h-12 rounded-xl px-3 text-[14px] font-bold transition-colors ${
    on ? "bg-brand text-white" : "border border-black/12 bg-white text-ink hover:border-brand/40"
  }`;

const field =
  "rounded-xl border border-black/15 bg-white px-3.5 text-[16px] font-medium text-ink outline-none focus:border-brand";

function DemoPanel() {
  const [day, setDay] = useState(1);
  const [time, setTime] = useState(0);

  if (siteConfig.calendlyUrl) {
    const src = `${siteConfig.calendlyUrl}${siteConfig.calendlyUrl.includes("?") ? "&" : "?"}hide_gdpr_banner=1`;
    return (
      <div className="flex flex-col gap-3">
        <p className="text-[18px] font-extrabold">Pick a time that suits you</p>
        <iframe
          title="Book a demo on Calendly"
          src={src}
          loading="lazy"
          className="h-[680px] w-full rounded-2xl border border-black/[0.08] bg-white"
        />
      </div>
    );
  }

  const message = `Hi Endpoint Leads, I would like a demo for my office. Best time for me: ${days[day]} ${times[time].toLowerCase()}.`;
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[18px] font-extrabold">When suits you best?</p>
      <fieldset>
        <legend className="mb-2.5 text-[14px] font-bold text-body">Day</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {days.map((label, i) => (
            <button key={label} type="button" aria-pressed={i === day} onClick={() => setDay(i)} className={pill(i === day)}>
              {label.slice(0, 3)}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2.5 text-[14px] font-bold text-body">Time</legend>
        <div className="grid grid-cols-3 gap-2">
          {times.map((label, i) => (
            <button key={label} type="button" aria-pressed={i === time} onClick={() => setTime(i)} className={pill(i === time)}>
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[15px] font-bold text-white transition-colors hover:bg-brand-hover"
      >
        Request {days[day]} {times[time].toLowerCase()}
      </a>
      <p className="text-[13px] text-ink/60">We confirm the exact time with you on WhatsApp.</p>
    </div>
  );
}

function QuestionPanel() {
  const [q, setQ] = useState(0);
  const message = `Hi Endpoint Leads! ${questions[q]}`;
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[14px] font-bold text-body">Pick a question, we&rsquo;ll open WhatsApp with it typed for you</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-pressed={i === q}
            onClick={() => setQ(i)}
            className={`min-h-11 rounded-full px-4 text-[14px] font-semibold transition-colors ${
              i === q ? "border-2 border-[#25a35a] bg-white text-[#1d7a52]" : "border border-black/12 bg-white text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 rounded-2xl bg-[#e9f6ee] p-4">
        <span className="text-[12px] font-bold text-[#1d7a52]">Preview of your message</span>
        <p className="max-w-[85%] self-end rounded-[14px_14px_3px_14px] bg-[#d4f2dc] px-3.5 py-2.5 text-[15px] leading-snug">{message}</p>
      </div>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#25a35a] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#1f8c4d]"
      >
        <WhatsappLogo aria-hidden="true" weight="fill" className="size-5" />
        Open WhatsApp
      </a>
    </div>
  );
}

function SupportPanel() {
  const [office, setOffice] = useState("");
  const [need, setNeed] = useState("");
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const message = ["Hi Endpoint Leads support.", office && `Office: ${office}`, need && `Need help with: ${need}`]
          .filter(Boolean)
          .join("\n");
        window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
      }}
    >
      <p className="text-[18px] font-extrabold">Help for your team&rsquo;s account</p>
      <label className="flex flex-col gap-1.5 text-[14px] font-bold">
        Your office name
        <input value={office} onChange={(e) => setOffice(e.target.value)} placeholder="e.g. Al-Noor Estates" className={`h-12 ${field}`} />
      </label>
      <label className="flex flex-col gap-1.5 text-[14px] font-bold">
        What do you need?
        <textarea value={need} onChange={(e) => setNeed(e.target.value)} rows={3} placeholder="Tell us what’s happening" className={`resize-none py-3 ${field}`} />
      </label>
      <button type="submit" className="min-h-13 rounded-full bg-ink px-6 text-[15px] font-bold text-white transition-colors hover:bg-ink/85">
        Send to support on WhatsApp
      </button>
    </form>
  );
}

export default function StartPicker() {
  const [route, setRoute] = useState<Route>("demo");
  return (
    <section id="start" aria-labelledby="start-heading" className="scroll-mt-24 bg-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">GET STARTED</p>
            <h2 id="start-heading" className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance">
              How would you like to start?
            </h2>
          </div>
          <div role="radiogroup" aria-label="How to start" className="flex flex-col gap-3">
            {routes.map((r) => {
              const on = r.id === route;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setRoute(r.id)}
                  className={`flex items-start gap-3.5 rounded-[22px] p-5 text-left transition-[border-color,background-color,box-shadow] ${
                    on
                      ? "border-2 border-brand bg-[#f6f5ff] shadow-[0_16px_32px_-20px_rgba(73,57,210,0.5)]"
                      : "border border-black/10 bg-white hover:border-brand/40"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-1 size-[18px] flex-none rounded-full ${on ? "border-[6px] border-brand bg-white" : "border-2 border-black/25"}`}
                  />
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="flex flex-wrap items-center gap-2 text-[17px] font-extrabold">
                      {r.title}
                      {r.popular && (
                        <span className="rounded-full bg-[#e4e0ff] px-2 py-0.5 text-[11px] font-extrabold text-[#2f2496]">Most picked</span>
                      )}
                    </span>
                    <span className="text-[14px] text-body">{r.line}</span>
                    <span className="text-[13px] font-bold text-ink/60">{r.meta}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div key={route} className="thread-in self-start rounded-[28px] border border-[#e7e7ef] bg-white p-6 shadow-[0_32px_64px_-48px_rgba(40,30,120,0.4)] sm:p-9">
          {route === "demo" && <DemoPanel />}
          {route === "whatsapp" && <QuestionPanel />}
          {route === "support" && <SupportPanel />}
        </div>
      </div>
    </section>
  );
}
