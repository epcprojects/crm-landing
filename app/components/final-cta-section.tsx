// Mockup section 8: the closing call to action, on a dark night skyline.

import type { CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "../site-config";
import RevealRoot from "./reveal-root";
import Skyline from "./skyline";

function d(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

const reassurance = [
  "A short, free meeting",
  "Shown with your own team in mind",
  "Pricing and setup explained",
];

export default function FinalCtaSection() {
  return (
    <section
      id="demo"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-0 overflow-hidden bg-night text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[60rem] max-w-none -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(120,104,238,0.38),transparent)]"
      />
      <RevealRoot
        className="relative mx-auto w-full max-w-7xl px-5 pb-40 pt-16 text-center sm:px-10 sm:pb-56 sm:pt-28 lg:pb-64 lg:pt-32"
        threshold={0.3}
      >
        <p
          className="reveal inline-flex items-center gap-3 font-label text-xs font-medium tracking-[0.2em] text-accent"
          style={d(0)}
        >
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          READY WHEN YOU ARE
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
        </p>
        <h2
          id="cta-heading"
          className="reveal mx-auto mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-balance"
          style={d(0.15)}
        >
          See every client, every conversation, every next step.{" "}
          <span className="text-accent">In one place.</span>
        </h2>
        <p
          className="reveal mx-auto mt-6 max-w-[34rem] text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
          style={d(0.3)}
        >
          Book a free meeting and we will show you how Endpoint Leads fits your
          real estate team.
        </p>

        <div className="reveal mt-9" style={d(0.45)}>
          <a
            href={siteConfig.demoHref}
            className="cta-glow group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-9 text-[16px] font-bold text-ink transition-colors hover:bg-[#ece9ff]"
          >
            Book a free meeting
            <span
              aria-hidden="true"
              className="text-brand transition-transform group-hover:translate-x-0.5"
            >
              <ArrowRight weight="bold" className="size-[18px]" />
            </span>
          </a>
        </div>

        <ul
          className="reveal mt-8 flex flex-col items-center gap-x-8 gap-y-2.5 text-sm font-semibold text-white/75 sm:flex-row sm:justify-center"
          style={d(0.6)}
        >
          {reassurance.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>

        <Skyline dark onView />
      </RevealRoot>
    </section>
  );
}
