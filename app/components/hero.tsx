import { siteConfig } from "../site-config";
import DeviceMockup from "./device-mockup";
import Skyline from "./skyline";

const chips = ["Client management", "Agent conversations", "Deal visibility"];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-wash relative overflow-hidden pb-28 pt-28 text-ink sm:pb-36 sm:pt-32 lg:pb-44 lg:pt-36"
    >
      <Skyline />
      <div className="relative z-10 mx-auto grid w-full max-w-[1360px] items-center gap-14 px-4 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
        <div>
          <p className="rise flex items-center gap-3 font-label text-xs font-medium tracking-[0.18em] text-brand">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            REAL ESTATE CLIENT &amp; AGENT MANAGEMENT
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-[clamp(2.4rem,4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em]"
          >
            {["Every client.", "Every conversation.", "Every next step."].map(
              (line, index) => (
                <span key={line} className="line-mask">
                  <span
                    className="line-in"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ),
            )}
            <span className="line-mask">
              <span className="line-in" style={{ animationDelay: "210ms" }}>
                <span className="underline-draw text-brand">In one place.</span>
              </span>
            </span>
          </h1>

          <p
            className="rise mt-7 max-w-[34rem] text-base leading-7 text-body sm:text-lg sm:leading-8"
            style={{ animationDelay: "120ms" }}
          >
            Manage your real estate clients and agents from one workspace. See
            who spoke to each client, what was discussed, and what needs
            attention next&mdash;without chasing updates.
          </p>

          <div
            className="rise mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href={siteConfig.demoHref}
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brand px-8 text-[15px] font-bold text-white transition-colors hover:bg-brand-hover"
            >
              Book a free meeting
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-brand/30 bg-white/70 px-8 text-[15px] font-bold text-brand transition-colors hover:border-brand hover:bg-white"
            >
              See how it works
            </a>
          </div>

          <ul
            className="rise mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink/75"
            style={{ animationDelay: "240ms" }}
          >
            {chips.map((chip) => (
              <li key={chip} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-accent"
                />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div id="product" className="scroll-mt-28">
          <DeviceMockup />
        </div>
      </div>
    </section>
  );
}
