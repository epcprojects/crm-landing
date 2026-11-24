import { SealPercent } from "@phosphor-icons/react/dist/ssr";
import HeroActions from "./hero-actions";
import HeroStream from "./hero-stream";

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white pt-44 sm:pt-[152px]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 text-center sm:px-10">
        {/* the year-end offer as the small pill above the headline */}
        <p className="rise inline-flex max-w-full items-center gap-2 rounded-full border border-[#e3e4ea] bg-white py-1 pl-1.5 pr-3.5 text-left text-[14px] font-medium leading-snug text-ink shadow-[0_1px_2px_rgba(21,21,27,0.06)]">
          <span className="grid size-6 flex-none place-items-center rounded-md bg-gradient-to-b from-[#7667f5] to-[#4333cc] text-white">
            <SealPercent aria-hidden="true" weight="fill" className="size-4" />
          </span>
          <span>
            <strong className="font-semibold text-brand">Save 25%</strong> on your
            purchase before 31 December 2026.
          </span>
        </p>
        <h1
          id="hero-heading"
          className="mt-8 max-w-[920px] text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.2] text-balance"
        >
          <span className="line-mask">
            <span className="line-in text-ink">
              Manage your complete real estate business{" "}
              <span className="text-brand">from one place.</span>
            </span>
          </span>
        </h1>
        <p
          className="rise mt-6 max-w-[35rem] text-[17px] leading-[1.4] text-ink text-pretty sm:text-[18px]"
          style={{ animationDelay: "120ms" }}
        >
          A solution that gives you complete transparency and control over your
          real estate business, helping you scale your business in less time.
        </p>
        <div className="rise mt-8" style={{ animationDelay: "180ms" }}>
          <HeroActions />
        </div>
      </div>
      <HeroStream />
    </section>
  );
}
