import type { CSSProperties } from "react";
import DeviceSync from "./device-sync";
import RevealRoot from "./reveal-root";

const points = [
  {
    title: "On the desktop",
    line: "Managers see every client, agent and next step in one place.",
  },
  {
    title: "On the phone",
    line: "Agents reply and update clients between site visits.",
  },
  {
    title: "Always in sync",
    line: "Change something once and everyone sees it straight away.",
  },
];

export default function DevicesSection() {
  return (
    <section
      id="devices"
      aria-labelledby="devices-heading"
      className="relative scroll-mt-16 border-t border-black/10 bg-white py-20 text-ink sm:py-24 lg:py-28"
    >
      <RevealRoot
        className="mx-auto w-full max-w-7xl px-5 sm:px-10"
        threshold={0.2}
      >
        <div className="text-center">
          <p className="inline-flex items-center gap-3 font-label text-xs font-medium tracking-[0.2em] text-brand">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            DESKTOP AND MOBILE
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
          </p>
          <h2
            id="devices-heading"
            className="mx-auto mt-6 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-balance"
          >
            <span className="block">At the desk or on site.</span>
            <span className="block text-brand">Everyone sees the same thing.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-base leading-7 text-body sm:text-lg sm:leading-8">
            Use it on a computer or a phone. Every update shows up for the
            whole team.
          </p>
        </div>

        <DeviceSync />

        <ul className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-12">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="reveal lg:text-center"
              style={{ "--d": `${0.6 + index * 0.15}s` } as CSSProperties}
            >
              <p className="text-lg font-extrabold tracking-[-0.015em]">
                {point.title}
              </p>
              <p className="mt-2 text-base leading-7 text-body">{point.line}</p>
            </li>
          ))}
        </ul>
      </RevealRoot>
    </section>
  );
}
