"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const steps = [
  {
    n: "01",
    title: "Talk",
    line: "A short call or WhatsApp chat about how your office works today.",
  },
  {
    n: "02",
    title: "Set up",
    line: "We add your team and help move your existing clients in.",
  },
  {
    n: "03",
    title: "Run",
    line: "Your agents work every client from one place, on desktop or phone.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="scroll-mt-20 overflow-hidden bg-night text-white"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-28">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-accent">
            How it works
          </p>
          <h2
            id="how-heading"
            className="mt-5 max-w-[34rem] text-[clamp(2.2rem,4.5vw,4.25rem)] leading-[1.02] tracking-[-0.05em] text-balance"
          >
            From first call to running in days.
          </h2>
          <a
            href="#start"
            className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 text-[14px] font-bold text-night transition-colors hover:bg-surface"
          >
            Book a demo
            <ArrowRight
              aria-hidden="true"
              weight="bold"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="relative">
          <ol className="relative space-y-4">
            {steps.map((step, index) => {
              const selected = active === index;
              return (
                <li key={step.n}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    className={`grid w-full grid-cols-[58px_1fr] items-center gap-4 rounded-[24px] border p-4 text-left transition-[transform,background-color,border-color,color,opacity] duration-500 ease-out motion-reduce:transition-none sm:p-5 ${
                      selected
                        ? "translate-x-2 border-white bg-white text-night shadow-2xl"
                        : "border-white/10 bg-white/[0.045] text-white opacity-[0.65] hover:opacity-100"
                    }`}
                  >
                    <span
                      className={`relative z-10 grid size-11 place-items-center rounded-full border text-[13px] font-bold transition-[transform,background-color,border-color,color] duration-500 motion-reduce:transition-none ${
                        selected
                          ? "scale-105 border-brand bg-brand text-white"
                          : "border-white/15 bg-night text-accent"
                      }`}
                    >
                      {step.n}
                    </span>
                    <span className="py-2">
                      <strong className="block text-[22px] font-semibold tracking-[-0.025em]">
                        {step.title}
                      </strong>
                      <span
                        className={`mt-1.5 block max-w-[30rem] text-[14px] leading-relaxed transition-colors duration-500 sm:text-[15px] ${
                          selected ? "text-body" : "text-white/60"
                        }`}
                      >
                        {step.line}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
