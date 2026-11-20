// Mockup section 7: how it works, then the questions people ask.

import type { CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "../site-config";
import Faq from "./faq";
import RevealRoot from "./reveal-root";

function d(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

const steps = [
  {
    title: "Add your clients",
    line: "Bring in every enquiry and give each client an owner.",
    chip: "Usman · Plot, Block A · Owner Ali",
  },
  {
    title: "Keep every conversation together",
    line: "Agents reply and add notes on the client’s own file.",
    chip: "Ali: Visit at 4 pm?",
  },
  {
    title: "Always know what’s next",
    line: "Every client has a next step and a date, and you can see how each agent is doing.",
    chip: "Next step · Due today",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative scroll-mt-16 border-t border-black/10 bg-surface py-12 text-ink sm:py-24 lg:py-28"
    >
      <RevealRoot
        className="mx-auto w-full max-w-7xl px-5 sm:px-10"
        threshold={0.15}
      >
        {/* how it works */}
        <div className="text-center">
          <p className="inline-flex items-center gap-3 font-label text-xs font-medium tracking-[0.2em] text-brand">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            HOW IT WORKS
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
          </p>
          <h2
            id="how-heading"
            className="mx-auto mt-6 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-balance"
          >
            <span className="block">Simple to start.</span>
            <span className="block text-brand">Clear from day one.</span>
          </h2>
        </div>

        <ol className="relative mt-8 grid gap-7 sm:mt-14 sm:gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {/* the line that connects the steps */}
          <span
            aria-hidden="true"
            className="line-grow absolute left-[16.6%] right-[16.6%] top-6 hidden h-px bg-brand/30 lg:block"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-5 left-5 top-5 w-px bg-brand/25 lg:hidden"
          />
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="reveal relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              style={d(0.3 + index * 0.35)}
            >
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-brand text-[15px] font-extrabold text-white ring-4 ring-surface sm:size-12 sm:text-[17px] sm:ring-8">
                {index + 1}
              </span>
              <div className="lg:mt-6">
                <h3 className="text-[18px] font-extrabold tracking-[-0.015em] sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[22rem] text-[15px] leading-6 text-body sm:mt-2 sm:text-base sm:leading-7 lg:mx-auto">
                  {step.line}
                </p>
                <p className="mt-3 inline-flex rounded-full border border-brand/20 bg-white px-3 py-1 text-[12px] font-bold text-brand sm:mt-4 sm:px-3.5 sm:py-1.5 sm:text-[13px]">
                  {step.chip}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* questions */}
        <div className="mt-12 grid gap-8 sm:mt-24 sm:gap-10 lg:mt-32 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="reveal" style={d(0.4)}>
            <p className="flex items-center gap-3 font-label text-xs font-medium tracking-[0.2em] text-brand">
              <span aria-hidden="true" className="h-px w-8 bg-brand" />
              FAQ
            </p>
            <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance">
              Questions, answered.
            </h2>
            <p className="mt-3 max-w-[22rem] text-[15px] leading-6 text-body sm:mt-4 sm:text-base sm:leading-7">
              Something else on your mind? Ask us in a free meeting.
            </p>
            <a
              href={siteConfig.demoHref}
              className="group mt-5 inline-flex min-h-12 sm:mt-6 items-center gap-2.5 rounded-full border border-brand/30 bg-white px-6 text-[15px] font-bold text-brand transition-colors hover:border-brand"
            >
              Book a free meeting
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <ArrowRight weight="bold" className="size-[18px]" />
              </span>
            </a>
          </div>
          <div className="reveal" style={d(0.55)}>
            <Faq />
          </div>
        </div>
      </RevealRoot>
    </section>
  );
}
